import { expect, test } from '@playwright/test';
import { createRequire } from 'node:module';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const require = createRequire(import.meta.url);
const CapacityReporter = require('../../../scripts/playwright-capacity-reporter.cjs');
const capacityBenchmark = require('../../../scripts/playwright-capacity-benchmark.cjs');

function result(workerIndex: number, startMs: number, duration: number, retry = 0, status = 'passed') {
  return {
    workerIndex,
    parallelIndex: workerIndex,
    startTime: new Date(startMs),
    duration,
    retry,
    status,
    annotations: [{ type: 'identity-lease-wait', description: 'waited_ms=125 timeout_ms=300000' }],
    steps: [
      { category: 'hook', title: 'Before Hooks', duration: 15 },
      { category: 'test.step', title: 'journey', duration: 50 },
      { category: 'hook', title: 'After Hooks', duration: 5 },
    ],
  };
}

test('capacity reporter measures actual overlap, phases and retry outcomes without test names', async () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'capacity-reporter-'));
  const output = path.join(dir, 'capacity.json');
  const reporter = new CapacityReporter({ outputFile: output });
  const start = Date.parse('2026-11-23T00:00:00.000Z');
  const first = { id: 'private-test-id', annotations: [] };
  const second = { id: 'another-test-id', annotations: [] };
  try {
    reporter.onBegin();
    reporter.onTestEnd(first, result(3, start, 100, 0, 'failed'));
    reporter.onTestEnd(second, result(4, start + 50, 100));
    reporter.onTestEnd(first, result(5, start + 150, 90, 1));
    await reporter.onEnd({ status: 'passed' });

    const raw = readFileSync(output, 'utf8');
    const summary = JSON.parse(raw);
    expect(summary).toMatchObject({
      attempts: 3,
      tests: 2,
      passed: 2,
      failed: 0,
      flaky: 1,
      retriedAttempts: 1,
      observedWorkerProcesses: 3,
      peakActiveTests: 2,
      beforeHooksMs: 45,
      afterHooksMs: 15,
      identityWaitObservedMs: 375,
      identityWaitSamples: 3,
      runStatus: 'passed',
    });
    expect(summary.testBodyMs).toBe(230);
    expect(raw).not.toContain('private-test-id');
    expect(raw).not.toContain('journey');
    expect(raw).not.toContain('timeout_ms=300000');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('capacity reporter fails closed on a missing output path', async () => {
  const reporter = new CapacityReporter({ outputFile: '' });
  reporter.onBegin();
  await expect(reporter.onEnd({ status: 'passed' })).rejects.toThrow('PW_CAPACITY_REPORT');
});

test('benchmark runs the same suite sequentially at 4, 8 and 12 workers and retains a failed run', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'capacity-benchmark-'));
  const originalPerfetto = process.env.PW_ENABLE_PERFETTO;
  delete process.env.PW_ENABLE_PERFETTO;
  const calls: Array<{ args: string[]; reportPath: string }> = [];
  const spawn = (_binary: string, args: string[], options: { env: Record<string, string> }) => {
    calls.push({ args, reportPath: options.env.PW_CAPACITY_REPORT });
    mkdirSync(path.dirname(options.env.PW_CAPACITY_REPORT), { recursive: true });
    writeFileSync(
      options.env.PW_CAPACITY_REPORT,
      JSON.stringify({
        kind: 'playwright-capacity-attempt-summary',
        runStatus: 'passed',
        firstTestStartedAtMs: 100,
        lastTestEndedAtMs: 900,
        attempts: 2,
        tests: 2,
        passed: 2,
        failed: 0,
        skipped: 0,
        observedWorkerProcesses: 1,
        observedParallelSlots: 1,
        peakActiveTests: 1,
        beforeHooksMs: 10,
        afterHooksMs: 10,
        testBodyMs: 100,
        identityWaitObservedMs: 0,
        identityWaitSamples: 0,
      })
    );
    const loadFolder = args[args.indexOf('--output-folder') + 1];
    mkdirSync(loadFolder, { recursive: true });
    writeFileSync(
      path.join(loadFolder, 'summary.json'),
      JSON.stringify({ pressureSignals: { cpuSaturated: false }, durationMs: 1000, exitCode: 0 })
    );
    const runDir = path.dirname(options.env.PW_CAPACITY_REPORT);
    mkdirSync(path.join(runDir, 'odhin-report'));
    mkdirSync(path.join(runDir, 'test-results'));
    writeFileSync(path.join(runDir, 'odhin-report', 'report.html'), '<html>report</html>');
    writeFileSync(path.join(runDir, 'junit.xml'), '<testsuites/>');
    if (options.env.PW_ENABLE_PERFETTO !== 'false') writeFileSync(path.join(runDir, 'perfetto.json'), '{}');
    return { status: calls.length === 2 ? 1 : 0 };
  };

  try {
    const report = capacityBenchmark.benchmark(
      {
        config: 'playwright.config.ts',
        project: 'node-api',
        suite: 'playwright_tests_new/api/unit',
        output: path.join(dir, 'new'),
        repeats: 1,
      },
      spawn,
      () => 1000
    );

    expect(report.runs.map((run: { workers: number; exitCode: number }) => [run.workers, run.exitCode])).toEqual([
      [4, 0],
      [8, 1],
      [12, 0],
    ]);
    expect(report.comparable).toBe(false);
    expect(report.sourceStable).toBe(true);
    expect(report.runs.map((run: { complete: boolean }) => run.complete)).toEqual([true, false, true]);
    expect(calls.map((call) => call.reportPath)).toHaveLength(3);
    expect(new Set(calls.map((call) => call.reportPath)).size).toBe(3);
    for (const [index, call] of calls.entries()) {
      expect(call.args).toContain(`--workers=${[4, 8, 12][index]}`);
      expect(call.args).toContain('playwright_tests_new/api/unit');
      expect(call.args).toContain('--retries=0');
      expect(call.args.some((arg) => arg.startsWith('--add-reporter='))).toBe(true);
    }
    expect(JSON.parse(readFileSync(path.join(dir, 'new', 'comparison.json'), 'utf8')).runs[1].exitCode).toBe(1);
    expect(() => capacityBenchmark.benchmark({ output: path.join(dir, 'new'), repeats: 1 }, spawn)).toThrow(
      'Output directory already exists'
    );
    process.env.PW_ENABLE_PERFETTO = 'false';
    const withoutPerfetto = capacityBenchmark.benchmark(
      {
        config: 'playwright.config.ts',
        project: 'node-api',
        suite: 'playwright_tests_new/api/unit',
        output: path.join(dir, 'without-perfetto'),
        repeats: 1,
      },
      spawn,
      () => 1000
    );
    expect(withoutPerfetto.comparable).toBe(true);
    expect(withoutPerfetto.runs[0].artifacts).not.toHaveProperty('perfetto');
  } finally {
    if (originalPerfetto === undefined) delete process.env.PW_ENABLE_PERFETTO;
    else process.env.PW_ENABLE_PERFETTO = originalPerfetto;
    rmSync(dir, { recursive: true, force: true });
  }
});

test('benchmark rejects truncated summaries, skipped tests and source changes between trials', () => {
  expect(
    capacityBenchmark.runComplete({
      workers: 4,
      exitCode: 0,
      capacity: { runStatus: 'passed', firstTestStartedAtMs: 100, lastTestEndedAtMs: 900 },
      loadProfile: { exitCode: 0, durationMs: 1000, pressureSignals: {} },
    })
  ).toBe(false);

  expect(
    capacityBenchmark.runComplete({
      workers: 4,
      exitCode: 0,
      capacity: {
        kind: 'playwright-capacity-attempt-summary',
        runStatus: 'passed',
        tests: 2,
        attempts: 2,
        passed: 1,
        failed: 0,
        skipped: 1,
        peakActiveTests: 1,
        observedWorkerProcesses: 1,
        observedParallelSlots: 1,
        firstTestStartedAtMs: 100,
        lastTestEndedAtMs: 900,
        beforeHooksMs: 0,
        afterHooksMs: 0,
        testBodyMs: 800,
        identityWaitObservedMs: 0,
        identityWaitSamples: 0,
      },
      loadProfile: { exitCode: 0, durationMs: 1000, pressureSignals: {} },
    })
  ).toBe(false);

  const dir = mkdtempSync(path.join(tmpdir(), 'capacity-source-drift-'));
  let snapshots = 0;
  try {
    const report = capacityBenchmark.benchmark(
      {
        config: 'playwright.config.ts',
        project: 'node-api',
        suite: 'playwright_tests_new/api/unit',
        output: path.join(dir, 'new'),
        repeats: 1,
      },
      () => ({ status: 0 }),
      () => 1000,
      () => ({ revision: 'same-head', fingerprint: ++snapshots === 1 ? 'before' : 'after', workingTreeDirty: true })
    );
    expect(report.runs).toHaveLength(1);
    expect(report.sourceStable).toBe(false);
    expect(report.comparable).toBe(false);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('benchmark does not mark a run complete when its reporter artifacts are missing', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'capacity-missing-artifacts-'));
  try {
    const run = {
      workers: 4,
      exitCode: 0,
      capacity: {
        kind: 'playwright-capacity-attempt-summary',
        runStatus: 'passed',
        tests: 1,
        attempts: 1,
        passed: 1,
        failed: 0,
        skipped: 0,
        peakActiveTests: 1,
        observedWorkerProcesses: 1,
        observedParallelSlots: 1,
        firstTestStartedAtMs: 100,
        lastTestEndedAtMs: 200,
        beforeHooksMs: 0,
        afterHooksMs: 0,
        testBodyMs: 100,
        identityWaitObservedMs: 0,
        identityWaitSamples: 0,
      },
      loadProfile: { exitCode: 0, durationMs: 100, pressureSignals: {} },
    };
    expect(capacityBenchmark.runComplete(run, dir)).toBe(false);
    mkdirSync(path.join(dir, 'load-profile'));
    mkdirSync(path.join(dir, 'odhin-report'));
    writeFileSync(path.join(dir, 'capacity.json'), '{}');
    writeFileSync(path.join(dir, 'load-profile', 'summary.json'), '{}');
    writeFileSync(path.join(dir, 'junit.xml'), '<testsuites/>');
    writeFileSync(path.join(dir, 'perfetto.json'), '{}');
    writeFileSync(path.join(dir, 'odhin-report', 'report.html'), '<html>report</html>');
    expect(capacityBenchmark.runComplete(run, dir)).toBe(false);
    mkdirSync(path.join(dir, 'test-results'));
    expect(capacityBenchmark.runComplete(run, dir)).toBe(true);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
