#!/usr/bin/env node
const { execFileSync, spawnSync } = require('node:child_process');
const { createHash } = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const WORKERS = [4, 8, 12];

function parseArgs(argv) {
  const values = {};
  for (let index = 0; index < argv.length; index += 2) {
    const key = argv[index];
    const value = argv[index + 1];
    if (!['--config', '--project', '--suite', '--output', '--repeats'].includes(key) || !value) {
      throw new Error(
        'Usage: playwright-capacity-benchmark --config <file> --project <name> --suite <path> --output <new-dir> [--repeats <n>]'
      );
    }
    values[key.slice(2)] = value;
  }
  if (!values.config || !values.project || !values.suite || !values.output) {
    throw new Error('Config, project, suite and output are required for a same-suite comparison.');
  }
  const repeats = Number(values.repeats ?? 2);
  if (!Number.isInteger(repeats) || repeats < 1 || repeats > 10) throw new Error('Repeats must be an integer from 1 to 10.');
  return { ...values, repeats, output: path.resolve(values.output) };
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

function sourceSnapshot() {
  const git = (args) => execFileSync('git', args, { cwd: root });
  const revision = git(['rev-parse', 'HEAD']).toString().trim();
  const hash = createHash('sha256')
    .update(revision)
    .update(git(['diff', '--binary', 'HEAD', '--']));
  const untracked = git(['ls-files', '--others', '--exclude-standard', '-z']).toString().split('\0').filter(Boolean);
  for (const file of untracked.sort()) {
    if (path.basename(file).startsWith('.env')) continue;
    if (!/^(?:playwright_tests_new\/|scripts\/|playwright[^/]*\.config\.|package\.json$|yarn\.lock$)/.test(file)) continue;
    hash
      .update(file)
      .update('\0')
      .update(fs.readFileSync(path.join(root, file)));
  }
  return {
    revision,
    workingTreeDirty: Boolean(git(['status', '--porcelain']).length),
    fingerprint: hash.digest('hex'),
  };
}

function runComplete(run) {
  const capacity = run.capacity;
  const load = run.loadProfile;
  const finite = (value) => Number.isFinite(value) && value >= 0;
  return (
    run.exitCode === 0 &&
    capacity?.kind === 'playwright-capacity-attempt-summary' &&
    capacity.runStatus === 'passed' &&
    Number.isInteger(capacity.tests) &&
    capacity.tests > 0 &&
    Number.isInteger(capacity.attempts) &&
    capacity.attempts >= capacity.tests &&
    capacity.passed + capacity.failed + capacity.skipped === capacity.tests &&
    capacity.failed === 0 &&
    capacity.skipped === 0 &&
    Number.isInteger(capacity.peakActiveTests) &&
    capacity.peakActiveTests > 0 &&
    capacity.peakActiveTests <= run.workers &&
    Number.isInteger(capacity.observedWorkerProcesses) &&
    capacity.observedWorkerProcesses > 0 &&
    Number.isInteger(capacity.observedParallelSlots) &&
    capacity.observedParallelSlots > 0 &&
    finite(capacity.firstTestStartedAtMs) &&
    finite(capacity.lastTestEndedAtMs) &&
    capacity.lastTestEndedAtMs >= capacity.firstTestStartedAtMs &&
    finite(capacity.beforeHooksMs) &&
    finite(capacity.afterHooksMs) &&
    finite(capacity.testBodyMs) &&
    finite(capacity.identityWaitObservedMs) &&
    Number.isInteger(capacity.identityWaitSamples) &&
    capacity.identityWaitSamples >= 0 &&
    load?.exitCode === 0 &&
    finite(load.durationMs) &&
    load.pressureSignals &&
    typeof load.pressureSignals === 'object'
  );
}

function benchmark(options, spawn = spawnSync, clock = Date.now, snapshot = sourceSnapshot) {
  if (fs.existsSync(options.output)) throw new Error(`Output directory already exists: ${options.output}`);
  fs.mkdirSync(options.output, { recursive: true });
  const source = snapshot();
  const report = {
    kind: 'playwright-capacity-comparison',
    source,
    sourceStable: true,
    config: options.config,
    project: options.project,
    suite: options.suite,
    requestedWorkers: WORKERS,
    repeats: options.repeats,
    runs: [],
  };
  const reportFile = path.join(options.output, 'comparison.json');

  outer: for (const workers of WORKERS) {
    for (let repeat = 1; repeat <= options.repeats; repeat += 1) {
      const runDir = path.join(options.output, `${workers}-workers-${repeat}`);
      fs.mkdirSync(runDir);
      const capacityFile = path.join(runDir, 'capacity.json');
      const monitorDir = path.join(runDir, 'load-profile');
      const playwrightArgs = [
        'test',
        options.suite,
        `--config=${options.config}`,
        `--project=${options.project}`,
        `--workers=${workers}`,
        '--retries=0',
        `--output=${path.join(runDir, 'test-results')}`,
        `--add-reporter=${path.join(__dirname, 'playwright-capacity-reporter.cjs')}`,
      ];
      const startedAtMs = clock();
      const child = spawn(
        process.execPath,
        [
          path.join(__dirname, 'playwright-load-monitor.js'),
          '--output-folder',
          monitorDir,
          '--report-folder',
          path.join(runDir, 'odhin-report'),
          '--label',
          `${workers} workers / repeat ${repeat}`,
          '--',
          process.execPath,
          require.resolve('@playwright/test/cli'),
          ...playwrightArgs,
        ],
        {
          cwd: root,
          stdio: 'inherit',
          env: {
            ...process.env,
            FUNCTIONAL_TESTS_WORKERS: String(workers),
            PW_CAPACITY_REPORT: capacityFile,
            PLAYWRIGHT_REPORT_FOLDER: path.join(runDir, 'odhin-report'),
            PLAYWRIGHT_OUTPUT_DIR: path.join(runDir, 'test-results'),
            PLAYWRIGHT_JUNIT_OUTPUT: path.join(runDir, 'junit.xml'),
            PLAYWRIGHT_PERFETTO_OUTPUT_FILE: path.join(runDir, 'perfetto.json'),
          },
        }
      );
      const finishedAtMs = clock();
      const capacity = readJson(capacityFile);
      const loadProfile = readJson(path.join(monitorDir, 'summary.json'));
      const exitCode = child.status ?? 1;
      const run = {
        workers,
        repeat,
        exitCode,
        wallMs: Math.max(0, finishedAtMs - startedAtMs),
        startupMs: capacity?.firstTestStartedAtMs == null ? null : Math.max(0, capacity.firstTestStartedAtMs - startedAtMs),
        executionWindowMs:
          capacity?.lastTestEndedAtMs == null || capacity.firstTestStartedAtMs == null
            ? null
            : Math.max(0, capacity.lastTestEndedAtMs - capacity.firstTestStartedAtMs),
        postExecutionMs: capacity?.lastTestEndedAtMs == null ? null : Math.max(0, finishedAtMs - capacity.lastTestEndedAtMs),
        capacity,
        hostPressure: loadProfile?.pressureSignals ?? null,
        loadProfileExitCode: loadProfile?.exitCode ?? null,
        artifacts: {
          capacity: `${workers}-workers-${repeat}/capacity.json`,
          loadProfile: `${workers}-workers-${repeat}/load-profile/summary.json`,
          odhin: `${workers}-workers-${repeat}/odhin-report`,
        },
      };
      run.complete = Boolean(runComplete({ ...run, loadProfile }));
      report.runs.push(run);
      report.sourceStable = snapshot().fingerprint === source.fingerprint;
      fs.writeFileSync(reportFile, `${JSON.stringify(report, null, 2)}\n`, { mode: 0o600 });
      if (!report.sourceStable) break outer;
    }
  }
  report.comparable =
    report.sourceStable &&
    report.runs.length === WORKERS.length * options.repeats &&
    report.runs.every((run) => run.complete) &&
    new Set(report.runs.map((run) => run.capacity.tests)).size === 1;
  fs.writeFileSync(reportFile, `${JSON.stringify(report, null, 2)}\n`, { mode: 0o600 });
  return report;
}

if (require.main === module) {
  try {
    const report = benchmark(parseArgs(process.argv.slice(2)));
    if (!report.comparable) process.exitCode = 1;
  } catch (error) {
    console.error(`[capacity-benchmark] ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { parseArgs, benchmark, runComplete, sourceSnapshot };
