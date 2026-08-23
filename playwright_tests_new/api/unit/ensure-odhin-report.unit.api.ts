import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const ensureReport = require('../../../scripts/ensure-odhin-report.js') as {
  collectDiagnostics: (reportDir: string) => string[];
  ensureOdhinReport: (options: { reportDir: string; reportFile?: string; suiteName?: string; outcome?: string }) => {
    created: boolean;
    reportPath: string;
  };
  parseArgs: (argv: string[]) => { reportDir: string; reportFile: string; suiteName: string; outcome: string };
};

test.describe('ensure Odhín report script', { tag: '@svc-internal' }, () => {
  test('preserves an existing generated report', () => {
    const reportDir = fs.mkdtempSync(path.join(os.tmpdir(), 'existing-odhin-report-'));
    const reportPath = path.join(reportDir, 'xui-playwright-integration.html');
    fs.writeFileSync(reportPath, '<html><body>real report</body></html>');

    const result = ensureReport.ensureOdhinReport({
      reportDir,
      reportFile: 'xui-playwright-integration.html',
      suiteName: 'Integration',
    });

    expect(result).toEqual({ created: false, reportPath });
    expect(fs.readFileSync(reportPath, 'utf8')).toContain('real report');
  });

  test('creates a fallback report when Odhín did not write HTML', () => {
    const reportDir = fs.mkdtempSync(path.join(os.tmpdir(), 'missing-odhin-report-'));

    const result = ensureReport.ensureOdhinReport({
      reportDir,
      reportFile: 'xui-playwright-integration.html',
      suiteName: 'AAT Playwright Integration Test',
      outcome: 'completed',
    });

    expect(result.created).toBe(true);
    const html = fs.readFileSync(result.reportPath, 'utf8');
    expect(html).toContain('AAT Playwright Integration Test');
    expect(html).toContain('Odhín HTML report was not generated before Jenkins publishing.');
    expect(html).toContain('xui-playwright-integration.html');
    expect(html).toContain('The Playwright command completed but the Odhín reporter did not write');
    expect(html).not.toContain('Playwright integration command');
  });

  test('explains a lane-local pre-Playwright configuration failure without exposing marker content', () => {
    const reportDir = fs.mkdtempSync(path.join(os.tmpdir(), 'odhin-runner-failure-'));
    fs.writeFileSync(path.join(reportDir, 'runner-failure.txt'), 'do not publish this marker content');

    const result = ensureReport.ensureOdhinReport({ reportDir, suiteName: 'Integration' });
    const html = fs.readFileSync(result.reportPath, 'utf8');

    expect(html).toContain(`${reportDir}/runner-failure.txt`);
    expect(html).toContain('Integration session configuration did not complete before Playwright started.');
    expect(html).not.toContain('do not publish this marker content');
  });

  test('does not include integration-only diagnostics in another report lane', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'odhin-lane-local-'));
    const reportDir = path.join(root, 'playwright-e2e', 'odhin-report');
    const staleIntegrationDir = path.join(root, 'functional-output/tests/playwright-integration/load-profile');
    fs.mkdirSync(reportDir, { recursive: true });
    fs.mkdirSync(staleIntegrationDir, { recursive: true });
    fs.writeFileSync(path.join(reportDir, 'failure-data.json'), '{}');
    fs.mkdirSync(path.join(reportDir, 'test-results', 'failure'), { recursive: true });
    fs.writeFileSync(path.join(reportDir, 'test-results', 'failure', 'test-failed-1.png'), 'screenshot');
    fs.writeFileSync(path.join(reportDir, 'test-results', 'failure', 'trace.zip'), 'trace');
    fs.writeFileSync(path.join(staleIntegrationDir, 'load-profile.html'), '<html>stale integration profile</html>');

    const originalCwd = process.cwd();
    try {
      process.chdir(root);
      const diagnostics = ensureReport.collectDiagnostics(reportDir);
      expect(diagnostics).toContain(`${reportDir}/failure-data.json`);
      expect(diagnostics).toContain(`${reportDir}/test-results/failure/test-failed-1.png`);
      expect(diagnostics).toContain(`${reportDir}/test-results/failure/trace.zip`);
      expect(diagnostics.join('\n')).not.toContain('playwright-integration/load-profile');
    } finally {
      process.chdir(originalCwd);
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  test('parses Jenkins CLI arguments', () => {
    expect(
      ensureReport.parseArgs([
        '--report-dir',
        'functional-output/tests/playwright-integration/odhin-report/aat-workers-7',
        '--report-file',
        'xui-playwright-integration.html',
        '--suite-name',
        'AAT Playwright Integration Test (7 workers)',
        '--outcome',
        'test-failure',
      ])
    ).toEqual({
      reportDir: 'functional-output/tests/playwright-integration/odhin-report/aat-workers-7',
      reportFile: 'xui-playwright-integration.html',
      suiteName: 'AAT Playwright Integration Test (7 workers)',
      outcome: 'test-failure',
    });
  });
});
