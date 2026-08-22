import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const ensureReport = require('../../../scripts/ensure-odhin-report.js') as {
  ensureOdhinReport: (options: { reportDir: string; reportFile?: string; suiteName?: string }) => {
    created: boolean;
    reportPath: string;
  };
  parseArgs: (argv: string[]) => { reportDir: string; reportFile: string; suiteName: string };
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
    });

    expect(result.created).toBe(true);
    const html = fs.readFileSync(result.reportPath, 'utf8');
    expect(html).toContain('AAT Playwright Integration Test');
    expect(html).toContain('Odhín HTML report was not generated before Jenkins publishing.');
    expect(html).toContain('xui-playwright-integration.html');
    expect(html).toContain('The Playwright command failed or was interrupted');
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

  test('parses Jenkins CLI arguments', () => {
    expect(
      ensureReport.parseArgs([
        '--report-dir',
        'functional-output/tests/playwright-integration/odhin-report/aat-workers-7',
        '--report-file',
        'xui-playwright-integration.html',
        '--suite-name',
        'AAT Playwright Integration Test (7 workers)',
      ])
    ).toEqual({
      reportDir: 'functional-output/tests/playwright-integration/odhin-report/aat-workers-7',
      reportFile: 'xui-playwright-integration.html',
      suiteName: 'AAT Playwright Integration Test (7 workers)',
    });
  });
});
