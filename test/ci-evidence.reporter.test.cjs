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
