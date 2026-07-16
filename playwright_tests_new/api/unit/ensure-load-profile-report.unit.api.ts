import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const ensureReport = require('../../../scripts/ensure-load-profile-report.js') as {
  ensureLoadProfileReport: (options: { reportDir: string; reportFile?: string; reportName?: string }) => {
    created: boolean;
    reportPath: string;
  };
  ensureLoadProfileReportAfterWait: (options: {
    reportDir: string;
    reportFile?: string;
    reportName?: string;
    waitMs?: number;
  }) => Promise<{ created: boolean; reportPath: string }>;
  parseArgs: (argv: string[]) => { reportDir: string; reportFile: string; reportName: string; waitMs: number };
};

test.describe('ensure load profile report script', { tag: '@svc-internal' }, () => {
  test('preserves an existing generated load profile report', () => {
    const reportDir = fs.mkdtempSync(path.join(os.tmpdir(), 'existing-load-profile-'));
    const reportPath = path.join(reportDir, 'load-profile.html');
    fs.writeFileSync(reportPath, '<html><body>real load report</body></html>');

    const result = ensureReport.ensureLoadProfileReport({
      reportDir,
      reportFile: 'load-profile.html',
      reportName: 'PREVIEW Playwright System Load',
    });

    expect(result).toEqual({ created: false, reportPath });
    expect(fs.readFileSync(reportPath, 'utf8')).toContain('real load report');
  });

  test('creates a fallback report when the monitor did not write HTML', () => {
    const reportDir = fs.mkdtempSync(path.join(os.tmpdir(), 'missing-load-profile-'));
    fs.writeFileSync(path.join(reportDir, 'monitor.log'), '[load-profile] monitor was interrupted');

    const result = ensureReport.ensureLoadProfileReport({
      reportDir,
      reportFile: 'load-profile.html',
      reportName: 'PREVIEW Playwright System Load',
    });

    expect(result.created).toBe(true);
    const html = fs.readFileSync(result.reportPath, 'utf8');
    expect(html).toContain('PREVIEW Playwright System Load');
    expect(html).toContain('System load profile was not generated before Jenkins publishing.');
    expect(html).toContain('[load-profile] monitor was interrupted');
  });

  test('distinguishes an empty monitor log from a missing log', () => {
    const reportDir = fs.mkdtempSync(path.join(os.tmpdir(), 'empty-load-profile-log-'));
    fs.writeFileSync(path.join(reportDir, 'monitor.log'), '');

    const result = ensureReport.ensureLoadProfileReport({
      reportDir,
      reportFile: 'load-profile.html',
      reportName: 'PREVIEW CI System Load',
    });

    const html = fs.readFileSync(result.reportPath, 'utf8');
    expect(html).toContain('monitor.log was empty.');
    expect(html).not.toContain('No monitor.log was present.');
  });

  test('waits for a real report instead of creating a fallback immediately', async () => {
    const reportDir = fs.mkdtempSync(path.join(os.tmpdir(), 'delayed-load-profile-'));
    const reportPath = path.join(reportDir, 'load-profile.html');
    const writeReport = setTimeout(() => fs.writeFileSync(reportPath, '<html><body>delayed real report</body></html>'), 50);

    try {
      const result = await ensureReport.ensureLoadProfileReportAfterWait({
        reportDir,
        reportFile: 'load-profile.html',
        reportName: 'PREVIEW CI System Load',
        waitMs: 1_000,
      });

      expect(result).toEqual({ created: false, reportPath });
      expect(fs.readFileSync(reportPath, 'utf8')).toContain('delayed real report');
    } finally {
      clearTimeout(writeReport);
    }
  });

  test('parses Jenkins CLI arguments', () => {
    expect(
      ensureReport.parseArgs([
        '--report-dir',
        'functional-output/tests/playwright-integration/load-profile/preview',
        '--report-file',
        'load-profile.html',
        '--report-name',
        'PREVIEW Playwright System Load',
        '--wait-ms',
        '30000',
      ])
    ).toEqual({
      reportDir: 'functional-output/tests/playwright-integration/load-profile/preview',
      reportFile: 'load-profile.html',
      reportName: 'PREVIEW Playwright System Load',
      waitMs: 30_000,
    });
  });
});
