import { expect, test } from '@playwright/test';
import childProcess from 'node:child_process';
import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { PassThrough } from 'node:stream';

const require = createRequire(import.meta.url);

interface PressureSignals {
  cpuSaturated: boolean;
  loadSaturated: boolean;
  memoryPressure: boolean;
  memoryPressureThresholdPercent: number;
  cpuSaturatedSamplePercent: number;
}

interface Summary {
  cpu: { max: number };
  memory: { average: number };
  workers: string;
  timelineEvents?: Array<{ label: string; type: string; inRange: boolean }>;
}

const loadMonitor = require('../../../scripts/playwright-load-monitor.js') as {
  buildLoadProfileHtml: (summary: Summary, samples: unknown[]) => string;
  buildInlineSvgChart: (samples: unknown[], timelineEvents?: unknown[]) => string;
  buildPressureSignals: (samples: unknown[]) => PressureSignals;
  buildRecommendation: (signals: { cpuSaturated: boolean; loadSaturated: boolean; memoryPressure: boolean }) => string;
  buildSummary: (metadata: Record<string, unknown>, samples: unknown[], exitCode: number, timelineEvents?: unknown[]) => Summary;
  parseArgs: (argv: string[]) => {
    options: {
      outputFolder: string;
      reportFolder: string;
      sampleIntervalMs: number;
      childIdleTimeoutMs: number;
      childCloseGraceMs: number;
      childTerminateGraceMs: number;
      label: string;
      eventsFile: string;
      stopFile: string;
    };
    commandArgs: string[];
  };
  __test__: {
    isCiLikeEnvironment: (env: Record<string, string | undefined>) => boolean;
    runMonitoredCommand: (commandArgs: string[], options: Record<string, unknown>) => Promise<number>;
    runUntilStopFile: (options: Record<string, unknown>) => Promise<number>;
  };
};

test.describe('Playwright load monitor script', { tag: '@svc-internal' }, () => {
  test('parses wrapper options and preserves Playwright command arguments', () => {
    const parsed = loadMonitor.parseArgs([
      '--sample-interval-ms',
      '1000',
      '--child-idle-timeout-ms',
      '2500',
      '--child-close-grace-ms',
      '1500',
      '--child-terminate-grace-ms',
      '500',
      '--report-folder',
      'custom-report',
      '--output-folder',
      'custom-load',
      '--label',
      'workers-10',
      '--',
      'yarn',
      'test:playwright:integration',
      '--workers=10',
      '--shard=1/2',
    ]);

    expect(parsed.options).toMatchObject({
      sampleIntervalMs: 1000,
      childIdleTimeoutMs: 2500,
      childCloseGraceMs: 1500,
      childTerminateGraceMs: 500,
      reportFolder: 'custom-report',
      outputFolder: 'custom-load',
      label: 'workers-10',
    });
    expect(parsed.commandArgs).toEqual(['yarn', 'test:playwright:integration', '--workers=10', '--shard=1/2']);
  });

  test('uses the last report folder option for the wrapped Playwright command', () => {
    const parsed = loadMonitor.parseArgs([
      '--report-folder',
      'functional-output/tests/api_functional/odhin-report',
      '--report-folder',
      'functional-output/tests/playwright-api/odhin-report',
      '--',
      'yarn',
      'test:api:pw:raw',
    ]);

    expect(parsed.options.reportFolder).toBe('functional-output/tests/playwright-api/odhin-report');
    expect(parsed.commandArgs).toEqual(['yarn', 'test:api:pw:raw']);
  });

  test('treats options-only invocation as monitor-only mode', () => {
    const parsed = loadMonitor.parseArgs([
      '--output-folder',
      'functional-output/tests/playwright-integration/load-profile/preview',
      '--label',
      'PREVIEW Playwright System Load',
      '--events-file',
      'functional-output/tests/playwright-integration/load-profile/preview-stage-events.jsonl',
      '--stop-file',
      'functional-output/tests/playwright-integration/load-profile/preview/stop',
    ]);

    expect(parsed.options).toMatchObject({
      outputFolder: 'functional-output/tests/playwright-integration/load-profile/preview',
      label: 'PREVIEW Playwright System Load',
      eventsFile: 'functional-output/tests/playwright-integration/load-profile/preview-stage-events.jsonl',
      stopFile: 'functional-output/tests/playwright-integration/load-profile/preview/stop',
    });
    expect(parsed.commandArgs).toEqual([]);
  });

  test('ignores retired Odhín load-profile environment controls', () => {
    withTemporaryEnv(
      {
        PW_LOAD_PROFILE_INJECT_ODHIN: 'true',
        PW_LOAD_PROFILE_ODHIN_TAB: 'false',
      },
      () => {
        const parsed = loadMonitor.parseArgs(['--', 'yarn', 'test:playwright:integration']);

        expect(parsed.options).not.toHaveProperty('injectOdhin');
        expect(parsed.options).not.toHaveProperty('odhinTab');
        expect(loadMonitor).not.toHaveProperty('injectLoadProfileIntoOdhin');
      }
    );
  });

  test('parses timeline event and stop-file controls', () => {
    const parsed = loadMonitor.parseArgs([
      '--events-file',
      'functional-output/stage-events.jsonl',
      '--stop-file',
      'functional-output/load-profile.stop',
      '--',
      'yarn',
      'test:playwright:integration',
    ]);

    expect(parsed.options.eventsFile).toBe('functional-output/stage-events.jsonl');
    expect(parsed.options.stopFile).toBe('functional-output/load-profile.stop');
    expect(parsed.commandArgs).toEqual(['yarn', 'test:playwright:integration']);
  });

  test('treats Jenkins build metadata as CI for watchdog defaults', () => {
    expect(loadMonitor.__test__.isCiLikeEnvironment({})).toBe(false);
    expect(loadMonitor.__test__.isCiLikeEnvironment({ CI: 'true' })).toBe(true);
    expect(loadMonitor.__test__.isCiLikeEnvironment({ JENKINS_URL: 'https://build.hmcts.net' })).toBe(true);
    expect(loadMonitor.__test__.isCiLikeEnvironment({ BUILD_NUMBER: '40' })).toBe(true);
  });

  test('builds pressure signals and recommendations from sampled load', () => {
    const samples = [
      sample({ cpuPercent: 91, load1PerCore: 1.8, memoryUsedPercent: 62 }),
      sample({ cpuPercent: 92, load1PerCore: 1.7, memoryUsedPercent: 63 }),
      sample({ cpuPercent: 25, load1PerCore: 0.4, memoryUsedPercent: 61 }),
    ];

    const signals = loadMonitor.buildPressureSignals(samples);

    expect(signals.cpuSaturated).toBe(true);
    expect(signals.loadSaturated).toBe(true);
    expect(signals.memoryPressure).toBe(false);
    expect(signals.cpuSaturatedSamplePercent).toBe(66.67);
    expect(loadMonitor.buildRecommendation(signals)).toContain('CPU/load saturation');
  });

  test('uses a stricter host-memory pressure threshold than cgroup memory pressure', () => {
    const hostSignals = loadMonitor.buildPressureSignals([
      sample({ memoryUsedPercent: 99, memoryPressureThresholdPercent: 99.5 }),
      sample({ memoryUsedPercent: 99, memoryPressureThresholdPercent: 99.5 }),
    ]);
    const cgroupSignals = loadMonitor.buildPressureSignals([
      sample({ memoryUsedPercent: 90, memoryPressureThresholdPercent: 85 }),
      sample({ memoryUsedPercent: 90, memoryPressureThresholdPercent: 85 }),
    ]);

    expect(hostSignals.memoryPressure).toBe(false);
    expect(hostSignals.memoryPressureThresholdPercent).toBe(99.5);
    expect(cgroupSignals.memoryPressure).toBe(true);
    expect(cgroupSignals.memoryPressureThresholdPercent).toBe(85);
  });

  test('summarizes samples and renders an inline standalone chart', () => {
    const startEpochMs = Date.now() - 10_000;
    const summary = loadMonitor.buildSummary(
      {
        command: ['yarn', 'test:playwright:integration', '--workers=10'],
        startEpochMs,
        sampleIntervalMs: 1000,
        effectiveCpuCount: 8,
        totalMemoryBytes: 16 * 1024 ** 3,
        workers: '10',
        shard: '',
      },
      [
        sample({ elapsedMs: 0, cpuPercent: 10, load1PerCore: 0.5, memoryUsedPercent: 40 }),
        sample({ elapsedMs: 5000, cpuPercent: 70, load1PerCore: 0.9, memoryUsedPercent: 55 }),
        sample({ elapsedMs: 10000, cpuPercent: 90, load1PerCore: 1.6, memoryUsedPercent: 70 }),
      ],
      0,
      [{ label: 'API', type: 'start', epochMs: startEpochMs + 5000 }]
    );

    expect(summary.cpu.max).toBe(90);
    expect(summary.memory.average).toBe(55);
    expect(summary.workers).toBe('10');
    expect(summary.timelineEvents).toEqual(
      expect.arrayContaining([expect.objectContaining({ label: 'API', type: 'start', inRange: true })])
    );
    expect(loadMonitor.buildInlineSvgChart([sample({ cpuPercent: 10 })], summary.timelineEvents)).toContain('API start');
  });

  test('renders timeline marker labels in a prominent band above the plot', () => {
    const startEpochMs = Date.now() - 2000;
    const summary = loadMonitor.buildSummary(
      {
        command: ['jenkins-functional-stages'],
        startEpochMs,
        sampleIntervalMs: 1000,
        effectiveCpuCount: 4,
        totalMemoryBytes: 8 * 1024 ** 3,
        workers: 'config-default',
        shard: '',
      },
      [
        sample({ elapsedMs: 0, cpuPercent: 10, load1PerCore: 0.2, memoryUsedPercent: 40 }),
        sample({ elapsedMs: 2000, cpuPercent: 30, load1PerCore: 0.3, memoryUsedPercent: 45 }),
      ],
      0,
      [
        { label: 'Integration', type: 'start', epochMs: startEpochMs + 500 },
        { label: 'Integration', type: 'finish', epochMs: startEpochMs + 1500 },
      ]
    );

    const html = loadMonitor.buildLoadProfileHtml(summary, [
      sample({ elapsedMs: 0, cpuPercent: 10, load1PerCore: 0.2, memoryUsedPercent: 40 }),
      sample({ elapsedMs: 2000, cpuPercent: 30, load1PerCore: 0.3, memoryUsedPercent: 45 }),
    ]);

    expect(html).toContain('class="stage-timeline"');
    expect(html).toContain('CI stage timeline');
    expect(html).toContain('Integration');
    expect(html).toContain('start 0m 0s');
    expect(html).toContain('end 0m 1s');
  });

  test('renders finish timeline markers as end labels', () => {
    const chart = loadMonitor.buildInlineSvgChart(
      [
        sample({ elapsedMs: 0, cpuPercent: 10, load1PerCore: 0.2, memoryUsedPercent: 40 }),
        sample({ elapsedMs: 1000, cpuPercent: 30, load1PerCore: 0.3, memoryUsedPercent: 45 }),
      ],
      [{ label: 'API', type: 'finish', elapsedMs: 1000, inRange: true }]
    );

    expect(chart).toContain('API end');
    expect(chart).not.toContain('API finish');
  });

  test('renders the load profile as a standalone HTML report without Odhín tab markup', () => {
    const startEpochMs = Date.now() - 1000;
    const summary = loadMonitor.buildSummary(
      {
        command: ['jenkins-functional-stages'],
        startEpochMs,
        sampleIntervalMs: 1000,
        effectiveCpuCount: 4,
        totalMemoryBytes: 8 * 1024 ** 3,
        workers: 'config-default',
        shard: '',
      },
      [sample({ cpuPercent: 20, load1PerCore: 0.2, memoryUsedPercent: 30 })],
      0,
      [
        { label: 'API', type: 'start', epochMs: startEpochMs },
        { label: 'API', type: 'finish', epochMs: startEpochMs + 1000 },
      ]
    );

    const html = loadMonitor.buildLoadProfileHtml(summary, [sample({ cpuPercent: 20 })]);

    expect(html).toContain('<title>Playwright load profile</title>');
    expect(html).toContain('class="stage-timeline"');
    expect(html).toContain('API');
    expect(html).not.toContain('TabSystemLoad');
    expect(html).not.toContain('openMainTab');
    expect(html).not.toContain('odhin-system-load');
  });

  test('writes timeline event JSONL records for Jenkins stage markers', () => {
    const outputFolder = fs.mkdtempSync(path.join(os.tmpdir(), 'load-profile-events-'));
    const eventsFile = path.join(outputFolder, 'stage-events.jsonl');

    childProcess.execFileSync('node', [path.join(process.cwd(), 'scripts/playwright-load-event.js'), eventsFile, 'API', 'start']);

    const [line] = fs.readFileSync(eventsFile, 'utf8').trim().split('\n');
    const event = JSON.parse(line);
    expect(event).toMatchObject({ label: 'API', type: 'start', source: 'jenkins' });
    expect(Number.isFinite(event.epochMs)).toBe(true);
  });

  test('can profile a Jenkins stage until a stop file is created', async () => {
    const outputFolder = fs.mkdtempSync(path.join(os.tmpdir(), 'load-profile-stop-file-'));
    const stopFile = path.join(outputFolder, 'stop');

    const runPromise = loadMonitor.__test__.runUntilStopFile({
      outputFolder,
      reportFolder: outputFolder,
      sampleIntervalMs: 5,
      childIdleTimeoutMs: 0,
      childCloseGraceMs: 0,
      childTerminateGraceMs: 20,
      label: 'jenkins-stage',
      eventsFile: '',
      stopFile,
    });

    setTimeout(() => fs.writeFileSync(stopFile, 'stop\n'), 20);

    await expect(runPromise).resolves.toBe(0);

    const summary = JSON.parse(fs.readFileSync(path.join(outputFolder, 'summary.json'), 'utf8'));
    expect(summary.command).toEqual(['jenkins-functional-stages']);
    expect(summary.label).toBe('jenkins-stage');
    expect(fs.existsSync(path.join(outputFolder, 'load-profile.html'))).toBe(true);
  });

  test('terminates a silent child command after the configured idle watchdog expires', async () => {
    const outputFolder = fs.mkdtempSync(path.join(os.tmpdir(), 'load-profile-child-timeout-'));
    const child = new EventEmitter() as EventEmitter & {
      stdout: PassThrough;
      stderr: PassThrough;
      kill: (signal: string) => boolean;
    };
    const signals: string[] = [];
    const spawnOptions: Array<{ detached?: boolean; stdio?: unknown }> = [];
    child.stdout = new PassThrough();
    child.stderr = new PassThrough();
    child.kill = (signal: string) => {
      signals.push(signal);
      return true;
    };
    const stderrWrites: string[] = [];
    const originalError = console.error;
    console.error = (message?: unknown) => {
      stderrWrites.push(String(message));
    };

    try {
      const exitCode = await loadMonitor.__test__.runMonitoredCommand(['node', 'silent-child.js'], {
        outputFolder,
        reportFolder: outputFolder,
        sampleIntervalMs: 5,
        childIdleTimeoutMs: 20,
        childCloseGraceMs: 0,
        childTerminateGraceMs: 20,
        label: 'silent-child',
        eventsFile: '',
        spawnProcess: (_command: string, _args: string[], options: { detached?: boolean; stdio?: unknown }) => {
          spawnOptions.push(options);
          return child;
        },
      });

      expect(exitCode).toBe(1);
    } finally {
      console.error = originalError;
    }

    expect(signals).toEqual(['SIGTERM', 'SIGKILL']);
    expect(spawnOptions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          detached: process.platform !== 'win32',
          stdio: ['inherit', 'pipe', 'pipe'],
        }),
      ])
    );
    expect(stderrWrites.some((entry) => entry.includes('produced no output'))).toBe(true);
    expect(fs.existsSync(path.join(outputFolder, 'summary.json'))).toBe(true);
  });

  test('keeps the child watchdog alive while the command continues to emit output', async () => {
    const outputFolder = fs.mkdtempSync(path.join(os.tmpdir(), 'load-profile-child-active-'));
    const child = new EventEmitter() as EventEmitter & {
      stdout: PassThrough;
      stderr: PassThrough;
      kill: (signal: string) => boolean;
    };
    const signals: string[] = [];
    child.stdout = new PassThrough();
    child.stderr = new PassThrough();
    child.kill = (signal: string) => {
      signals.push(signal);
      return true;
    };
    const originalWrite = process.stdout.write.bind(process.stdout);
    process.stdout.write = (() => true) as typeof process.stdout.write;

    try {
      const runPromise = loadMonitor.__test__.runMonitoredCommand(['node', 'active-child.js'], {
        outputFolder,
        reportFolder: outputFolder,
        sampleIntervalMs: 5,
        childIdleTimeoutMs: 20,
        childCloseGraceMs: 0,
        childTerminateGraceMs: 20,
        label: 'active-child',
        eventsFile: '',
        spawnProcess: () => child,
      });

      setTimeout(() => child.stdout.emit('data', Buffer.from('tick 1\n')), 10);
      setTimeout(() => child.stdout.emit('data', Buffer.from('tick 2\n')), 25);
      setTimeout(() => child.emit('close', 0, null), 35);

      await expect(runPromise).resolves.toBe(0);
    } finally {
      process.stdout.write = originalWrite;
    }

    expect(signals).toEqual([]);
    expect(fs.existsSync(path.join(outputFolder, 'summary.json'))).toBe(true);
  });

  test('continues after child exit when stdio close never arrives', async () => {
    const outputFolder = fs.mkdtempSync(path.join(os.tmpdir(), 'load-profile-child-exit-'));
    const child = new EventEmitter() as EventEmitter & {
      stdout: PassThrough;
      stderr: PassThrough;
      kill: (signal: string) => boolean;
    };
    child.stdout = new PassThrough();
    child.stderr = new PassThrough();
    child.kill = () => true;
    const stderrWrites: string[] = [];
    const originalError = console.error;
    console.error = (message?: unknown) => {
      stderrWrites.push(String(message));
    };

    try {
      const runPromise = loadMonitor.__test__.runMonitoredCommand(['node', 'exit-no-close.js'], {
        outputFolder,
        reportFolder: outputFolder,
        sampleIntervalMs: 5,
        childIdleTimeoutMs: 0,
        childCloseGraceMs: 20,
        childTerminateGraceMs: 20,
        label: 'exit-no-close',
        eventsFile: '',
        spawnProcess: () => child,
      });

      child.emit('exit', 0, null);

      await expect(runPromise).resolves.toBe(0);
    } finally {
      console.error = originalError;
    }

    expect(stderrWrites.some((entry) => entry.includes('stdio did not close'))).toBe(true);
    expect(fs.existsSync(path.join(outputFolder, 'summary.json'))).toBe(true);
  });
});

function sample(overrides: Record<string, unknown>) {
  return {
    timestamp: new Date().toISOString(),
    elapsedMs: 0,
    cpuPercent: 0,
    load1: 0,
    load5: 0,
    load15: 0,
    load1PerCore: 0,
    memoryUsedPercent: 0,
    memoryUsedBytes: 0,
    memoryTotalBytes: 1024,
    processCounts: {
      node: 1,
      chrome: 0,
      playwright: 0,
      total: 10,
    },
    ...overrides,
  };
}

function withTemporaryEnv(overrides: Record<string, string | undefined>, callback: () => void) {
  const originalValues = new Map<string, string | undefined>();
  for (const [key, value] of Object.entries(overrides)) {
    originalValues.set(key, process.env[key]);
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }

  try {
    callback();
  } finally {
    for (const [key, value] of originalValues) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
}
