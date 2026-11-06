import { expect, test } from '@playwright/test';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { checkCriticalScenarios, runCriticalScenarioReceipt } = require('../../common/critical-scenario-receipt.cjs');
const required = [
  {
    project: 'chromium',
    spec: 'playwright_tests_new/E2E/test/download.spec.ts',
    title: 'Download journeys › downloads selected document',
  },
];
const invocation = { repositoryRoot: '/repo', startedAt: 1_000, finishedAt: 3_000, exitCode: 0 };
const validReport = {
  config: { rootDir: '/repo/playwright_tests_new/E2E' },
  stats: { startTime: new Date(1_500).toISOString(), duration: 500 },
  errors: [],
  suites: [
    {
      specs: [],
      suites: [
        {
          title: 'Download journeys',
          specs: [
            {
              file: 'test/download.spec.ts',
              title: 'downloads selected document',
              tests: [
                {
                  projectName: 'chromium',
                  expectedStatus: 'passed',
                  status: 'expected',
                  results: [{ status: 'passed', retry: 0 }],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

test.describe('critical scenario execution receipt', { tag: '@svc-internal' }, () => {
  test('required browser identities match current Playwright discovery', () => {
    const manifest = require('../../common/document-download-required-scenarios.json');
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'document-scenario-discovery-'));
    try {
      for (const [config, lanes] of [
        ['playwright.e2e.config.ts', ['e2e-capability', 'e2e-downloads', 'e2e-authorization']],
        ['playwright-nightly.config.ts', ['nightly-e2e']],
      ] as const) {
        const output = path.join(directory, `${config}.json`);
        const startedAt = Date.now();
        execFileSync(
          process.execPath,
          [
            'node_modules/@playwright/test/cli.js',
            'test',
            `--config=${config}`,
            '--list',
            '--reporter=json',
            'playwright_tests_new/E2E/test/mediaViewer',
            'playwright_tests_new/E2E/test/caseFileView/caseFileView.spec.ts',
          ],
          {
            env: {
              ...process.env,
              PLAYWRIGHT_JSON_OUTPUT_FILE: output,
              E2E_PW_INCLUDE_TAGS: '@e2e',
              E2E_PW_EXCLUDED_TAGS_OVERRIDE: '@none',
              PLAYWRIGHT_IGNORE_GLOBAL_EXCLUDES: 'true',
            },
            stdio: 'pipe',
          }
        );
        const receipt = checkCriticalScenarios(
          JSON.parse(fs.readFileSync(output, 'utf8')),
          lanes.flatMap((lane) => manifest[lane]),
          {
            startedAt,
            finishedAt: Date.now(),
            repositoryRoot: process.cwd(),
            exitCode: 0,
          }
        );
        // Listing proves identities exist, not that their browser journeys passed.
        expect(receipt.scenarios.filter(({ status }: { status: string }) => ['absent', 'ambiguous'].includes(status))).toEqual(
          []
        );
      }
    } finally {
      fs.rmSync(directory, { recursive: true, force: true });
    }
  });

  test('matches project, repository-relative spec and stable title through nested suites', () => {
    const receipt = checkCriticalScenarios(validReport, required, invocation);
    expect(receipt.passed).toBe(true);
    expect(receipt.scenarios[0]).toMatchObject({ ...required[0], status: 'passed', attempts: [{ status: 'passed', retry: 0 }] });
  });

  test('a mixed passed and missing list cannot earn a passing receipt', () => {
    const receipt = checkCriticalScenarios(
      validReport,
      [...required, { ...required[0], title: 'reloads selected document' }],
      invocation
    );
    expect(receipt.passed).toBe(false);
    expect(receipt.scenarios.map(({ status }: { status: string }) => status)).toEqual(['passed', 'absent']);
  });

  for (const field of ['project', 'spec', 'title'] as const) {
    test(`does not match a different ${field}`, () => {
      expect(checkCriticalScenarios(validReport, [{ ...required[0], [field]: 'wrong' }], invocation).passed).toBe(false);
    });
  }

  for (const status of ['skipped', 'interrupted', 'failed', 'timedOut']) {
    test(`does not accept ${status} execution`, () => {
      const report = structuredClone(validReport);
      report.suites[0].suites[0].specs[0].tests[0].results[0].status = status;
      expect(checkCriticalScenarios(report, required, invocation).passed).toBe(false);
    });
  }

  test('expected failure, unexpected pass and no attempt are not passing', () => {
    for (const fault of ['expected-failure', 'unexpected-pass', 'no-attempt']) {
      const report = structuredClone(validReport);
      const candidate = report.suites[0].suites[0].specs[0].tests[0];
      if (fault === 'expected-failure') candidate.expectedStatus = 'failed';
      if (fault === 'unexpected-pass') candidate.status = 'unexpected';
      if (fault === 'no-attempt') candidate.results = [];
      expect(checkCriticalScenarios(report, required, invocation).passed).toBe(false);
    }
  });

  test('preserves failed attempts when a retry recovers', () => {
    const report = structuredClone(validReport);
    const candidate = report.suites[0].suites[0].specs[0].tests[0];
    candidate.status = 'flaky';
    candidate.results = [
      { status: 'failed', retry: 0 },
      { status: 'passed', retry: 1 },
    ];
    const receipt = checkCriticalScenarios(report, required, invocation);
    expect(receipt.passed).toBe(true);
    expect(receipt.scenarios[0]).toMatchObject({ status: 'passed-on-retry', attempts: candidate.results });
  });

  test('runner errors and nonzero exit cannot be hidden by passing scenarios', () => {
    expect(checkCriticalScenarios({ ...validReport, errors: [{ message: 'worker crash' }] }, required, invocation).passed).toBe(
      false
    );
    expect(checkCriticalScenarios(validReport, required, { ...invocation, exitCode: 7 }).passed).toBe(false);
  });

  test('rejects stale, future, malformed and ambiguous reports and empty lists', () => {
    expect(() => checkCriticalScenarios(validReport, required, { ...invocation, startedAt: 2_500 })).toThrow(/invocation/);
    expect(() => checkCriticalScenarios(validReport, required, { ...invocation, finishedAt: 1_600 })).toThrow(/invocation/);
    expect(() => checkCriticalScenarios({}, required, invocation)).toThrow(/Invalid/);
    expect(() => checkCriticalScenarios(validReport, [], invocation)).toThrow(/nonempty/);
    expect(() => checkCriticalScenarios(validReport, [...required, ...required], invocation)).toThrow(/Duplicate/);
    expect(
      checkCriticalScenarios({ ...validReport, suites: [...validReport.suites, ...validReport.suites] }, required, invocation)
        .scenarios[0].status
    ).toBe('ambiguous');
  });

  test('runs an argv command with a fresh report and refuses reuse', () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'critical-scenario-receipt-'));
    const reportPath = path.join(directory, 'report.json');
    const manifestPath = path.join(directory, 'required.json');
    fs.writeFileSync(manifestPath, JSON.stringify({ unit: required }));
    const source = `const fs = require('node:fs'); const report = ${JSON.stringify(validReport)};
      report.config.rootDir = process.cwd() + '/playwright_tests_new/E2E';
      report.stats.startTime = new Date().toISOString(); report.stats.duration = 0;
      fs.writeFileSync(process.env.PLAYWRIGHT_JSON_OUTPUT_FILE, JSON.stringify(report));`;
    try {
      const receipt = runCriticalScenarioReceipt(reportPath, manifestPath, 'unit', [process.execPath, '-e', source]);
      expect(receipt.passed).toBe(true);
      expect(JSON.parse(fs.readFileSync(`${reportPath}.receipt.json`, 'utf8')).reportSha256).toMatch(/^[a-f0-9]{64}$/);
      expect(() => runCriticalScenarioReceipt(reportPath, manifestPath, 'unit', [process.execPath, '-e', source])).toThrow(
        /existing report/
      );
    } finally {
      fs.rmSync(directory, { recursive: true, force: true });
    }
  });
});
