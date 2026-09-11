const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const packageJson = require(path.resolve(__dirname, '..', 'package.json'));
const reporterPath = [
  path.resolve(__dirname, '..', 'playwright_tests', 'common', 'reporters', 'ci-evidence.reporter.cjs'),
  path.resolve(__dirname, '..', 'playwright_tests_new', 'common', 'reporters', 'ci-evidence.reporter.cjs'),
].find(fs.existsSync);

test('writes secret-safe flaky evidence with system-load statistics', () => {
  assert.ok(reporterPath, 'CI evidence reporter was not found');
  const Reporter = require(reporterPath);
  const outputFolder = fs.mkdtempSync(path.join(os.tmpdir(), 'xui-ci-evidence-'));
  const reporter = new Reporter({
    outputFolder,
    repository: packageJson.name,
    suite: 'contract-test',
    env: { BUILD_NUMBER: '42', JOB_NAME: 'XUI/example' },
    now: () => new Date('2026-09-11T09:00:02.000Z'),
    sampleIntervalMs: 60_000,
    loadMetadata: { effectiveCpuCount: 4, memoryLimitBytes: 8_000_000_000 },
    sample: (elapsedMs) => ({ elapsedMs, cpuPercent: 25, memoryUsedPercent: 50, load1PerCore: 0.5 }),
  });
  const testCase = {
    id: 'case-1',
    title: 'loads a case',
    titlePath: () => ['loads a case'],
    location: { file: path.join(process.cwd(), 'playwright_tests', 'case.spec.ts'), line: 12, column: 3 },
    retries: 2,
    repeatEachIndex: 0,
    expectedStatus: 'passed',
    outcome: () => 'flaky',
    parent: { project: () => ({ name: 'chromium' }) },
  };
  reporter.onBegin({ workers: 2, shard: null }, { allTests: () => [testCase] });
  reporter.onTestEnd(testCase, {
    status: 'failed',
    retry: 0,
    duration: 1_000,
    startTime: new Date('2026-09-11T09:00:00.000Z'),
    errors: [{ message: 'Expected Jane Doe but received another claimant' }],
    steps: [],
    attachments: [
      {
        name: 'node-api-calls.json',
        body: Buffer.from(
          JSON.stringify([
            {
              method: 'GET',
              url: 'https://ccd-data-store-api.aat.platform.hmcts.net/cases/1712345678901234?token=secret',
              status: 504,
              durationMs: 31_000,
              request: { headers: { authorization: 'Bearer secret' } },
            },
          ])
        ),
      },
    ],
  });
  reporter.onTestEnd(testCase, {
    status: 'passed',
    retry: 1,
    duration: 500,
    startTime: new Date('2026-09-11T09:00:01.000Z'),
    errors: [],
    steps: [],
    attachments: [],
  });
  reporter.onEnd({ status: 'passed', startTime: new Date('2026-09-11T09:00:00.000Z'), duration: 2_000 });

  const evidence = JSON.parse(fs.readFileSync(path.join(outputFolder, 'xui-ci-evidence.json'), 'utf8'));
  const expectedHash = evidence.document.content_sha256;
  delete evidence.document.content_sha256;
  assert.equal(expectedHash, crypto.createHash('sha256').update(JSON.stringify(evidence)).digest('hex'));
  assert.equal(evidence.document.producer.version, '2');
  assert.equal(evidence.run.outcome, 'PASSED_WITH_FLAKES');
  assert.equal(evidence.exceptional_tests[0].attempts.length, 2);
  const network = evidence.exceptional_tests[0].attempts[0].signals.find((signal) => signal.type === 'network');
  assert.equal(network.host, 'ccd-data-store-api.aat.platform.hmcts.net');
  assert.equal(network.path, '/cases/:id');
  assert.equal(evidence.system_load.summary.cpu_percent.average, 25);
  assert.equal(evidence.system_load.summary.memory_percent.average, 50);
  const serialized = JSON.stringify(evidence);
  assert.doesNotMatch(serialized, /Jane Doe|authorization|Bearer secret|token=secret/);
});

test('keeps the observed pass separate from an incomplete collection', () => {
  assert.ok(reporterPath, 'CI evidence reporter was not found');
  const Reporter = require(reporterPath);
  const outputFolder = fs.mkdtempSync(path.join(os.tmpdir(), 'xui-ci-evidence-'));
  const reporter = new Reporter({
    outputFolder,
    repository: packageJson.name,
    suite: 'contract-test',
    now: () => new Date('2026-09-11T09:00:02.000Z'),
    loadMetadata: { effectiveCpuCount: 4, memoryLimitBytes: 8_000_000_000 },
    sample: (elapsedMs) => ({ elapsedMs, cpuPercent: 25, memoryUsedPercent: 50, load1PerCore: 0.5 }),
  });
  const completed = {
    id: 'completed',
    title: 'completed test',
    titlePath: () => ['completed test'],
    location: { file: path.join(process.cwd(), 'playwright_tests', 'completed.spec.ts'), line: 12, column: 3 },
    retries: 0,
    repeatEachIndex: 0,
    expectedStatus: 'passed',
    parent: { project: () => ({ name: 'chromium' }) },
  };
  const missing = { ...completed, id: 'missing', title: 'missing test' };
  reporter.onBegin({ workers: 2, shard: null }, { allTests: () => [completed, missing] });
  reporter.onTestEnd(completed, {
    status: 'passed',
    retry: 0,
    duration: 100,
    startTime: new Date('2026-09-11T09:00:00.000Z'),
    errors: [],
    steps: [],
    attachments: [],
  });
  reporter.onEnd({ status: 'passed' });

  const evidence = JSON.parse(fs.readFileSync(path.join(outputFolder, 'xui-ci-evidence.json'), 'utf8'));
  assert.equal(evidence.run.outcome, 'CLEAN_PASS');
  assert.equal(evidence.run.collection_outcome, 'PARTIAL');
  assert.equal(evidence.run.discovered_tests, 2);
});

test('does not retain transport-error prose', () => {
  assert.ok(reporterPath, 'CI evidence reporter was not found');
  const Reporter = require(reporterPath);
  const projected = Reporter.__test__.projectApiEntries([
    {
      method: 'GET',
      url: 'https://service.test/health',
      error: 'request failed for https://service.test/health?session=secret-value',
    },
    {
      method: 'GET',
      url: 'https://service.test/health',
      error: 'UND_ERR_SECRET_VALUE',
    },
  ]);

  assert.equal(
    projected.every((entry) => !Object.hasOwn(entry, 'transport_error')),
    true
  );
  assert.doesNotMatch(JSON.stringify(projected), /secret-value/);
});

test('uses fractional cgroup CPU usage for scoped CPU telemetry', () => {
  assert.ok(reporterPath, 'CI evidence reporter was not found');
  const Reporter = require(reporterPath);
  const usage = [0, 500_000_000];
  const clocks = [0n, 1_000_000_000n];
  const sampler = Reporter.__test__.createSystemSampler(
    { effectiveCpuCount: 0.5, logicalCpuCount: 2, memoryLimitBytes: 100, memoryLimitSource: 'host' },
    () => ({ idle: 0, all: 0 }),
    () => 2,
    () => usage.shift(),
    () => clocks.shift()
  );

  sampler(0);
  const sample = sampler(1000);

  assert.equal(sample.cpuPercent, 100);
  assert.equal(sample.load1PerCore, 1);
});

test('does not write evidence for an accessibility suite', () => {
  assert.ok(reporterPath, 'CI evidence reporter was not found');
  const Reporter = require(reporterPath);
  const outputFolder = fs.mkdtempSync(path.join(os.tmpdir(), 'xui-ci-evidence-'));
  const reporter = new Reporter({ outputFolder, repository: packageJson.name, suite: 'a11y' });
  reporter.onBegin({}, { allTests: () => [] });
  reporter.onEnd({ status: 'passed' });
  assert.equal(fs.existsSync(path.join(outputFolder, 'xui-ci-evidence.json')), false);

  const projectOutputFolder = fs.mkdtempSync(path.join(os.tmpdir(), 'xui-ci-evidence-'));
  const projectReporter = new Reporter({ outputFolder: projectOutputFolder, repository: packageJson.name, suite: 'e2e' });
  const projectTest = {
    id: 'a11y-project',
    title: 'normal journey',
    titlePath: () => ['normal journey'],
    location: { file: 'test.spec.js' },
    parent: { project: () => ({ name: 'accessibility-chromium' }) },
  };
  projectReporter.onBegin({}, { allTests: () => [projectTest] });
  projectReporter.onTestEnd(projectTest, { status: 'passed', retry: 0, duration: 1, errors: [], steps: [], attachments: [] });
  projectReporter.onEnd({ status: 'passed' });
  assert.equal(fs.existsSync(path.join(projectOutputFolder, 'xui-ci-evidence.json')), false);
});

test('marks the accessibility command as an excluded evidence suite', () => {
  const config = fs.readFileSync(path.join(__dirname, '..', 'playwright.e2e.config.ts'), 'utf8');
  assert.match(config, /PLAYWRIGHT_INCLUDE_A11Y === 'true' \? 'accessibility' : 'e2e'/);
});

test('classifies smoke output and smoke projects as the smoke suite', () => {
  assert.ok(reporterPath, 'CI evidence reporter was not found');
  const Reporter = require(reporterPath);
  const outputFolder = fs.mkdtempSync(path.join(os.tmpdir(), 'playwright-smoke-'));
  const smokeReporter = new Reporter({ outputFolder, repository: packageJson.name });
  smokeReporter.onBegin({}, { allTests: () => [] });
  smokeReporter.onEnd({ status: 'passed' });
  assert.equal(JSON.parse(fs.readFileSync(path.join(outputFolder, 'xui-ci-evidence.json'), 'utf8')).run.suite, 'smoke');

  const projectOutputFolder = fs.mkdtempSync(path.join(os.tmpdir(), 'xui-ci-evidence-'));
  const projectReporter = new Reporter({ outputFolder: projectOutputFolder, repository: packageJson.name, suite: 'e2e' });
  const projectTest = {
    id: 'cross-browser-smoke',
    title: 'normal journey',
    titlePath: () => ['normal journey'],
    location: { file: 'test.spec.js' },
    parent: { project: () => ({ name: 'cross-browser-smoke' }) },
  };
  projectReporter.onBegin({}, { allTests: () => [projectTest] });
  projectReporter.onTestEnd(projectTest, { status: 'passed', retry: 0, duration: 1, errors: [], steps: [], attachments: [] });
  projectReporter.onEnd({ status: 'passed' });
  assert.equal(JSON.parse(fs.readFileSync(path.join(projectOutputFolder, 'xui-ci-evidence.json'), 'utf8')).run.suite, 'smoke');
});
