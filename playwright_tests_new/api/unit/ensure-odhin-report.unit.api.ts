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
  });

  test('parses Jenkins CLI arguments', () => {
    expect(
      ensureReport.parseArgs([
        '--report-dir',
        'functional-output/tests/playwright-integration/odhin-report/aat-workers-6',
        '--report-file',
        'xui-playwright-integration.html',
        '--suite-name',
        'AAT Playwright Integration Test (6 workers)',
      ])
    ).toEqual({
      reportDir: 'functional-output/tests/playwright-integration/odhin-report/aat-workers-6',
      reportFile: 'xui-playwright-integration.html',
      suiteName: 'AAT Playwright Integration Test (6 workers)',
    });
  });
});
