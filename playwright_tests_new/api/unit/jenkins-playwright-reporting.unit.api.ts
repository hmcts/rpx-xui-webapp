import { expect, test } from '@playwright/test';
import childProcess from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const source = fs.readFileSync(path.join(repositoryRoot, 'Jenkinsfile_CNP'), 'utf8');
const nightlySource = fs.readFileSync(path.join(repositoryRoot, 'Jenkinsfile_nightly'), 'utf8');

function fallbackCount(jenkinsfile: string, suiteName: string): number {
  return (jenkinsfile.match(new RegExp(`ensureHtmlReportForPublishing\\(\\s*'[^']+',\\s*'[^']+',\\s*'${suiteName}'`, 'g')) ?? [])
    .length;
}

function assertPostRunFallback(jenkinsfile: string, stage: string, runnerCommand: string, suiteName: string): void {
  const fallback = new RegExp(`ensureHtmlReportForPublishing\\(\\s*'[^']+',\\s*'[^']+',\\s*'${suiteName}'`, 'g').exec(
    jenkinsfile
  );
  const fallbackIndex = fallback?.index ?? -1;
  const stageIndex = jenkinsfile.lastIndexOf(stage, fallbackIndex);
  const runnerIndex = jenkinsfile.indexOf(runnerCommand, stageIndex);
  const publishIndex = jenkinsfile.indexOf(`reportName           : '${suiteName}'`, fallbackIndex);

  expect(stageIndex).toBeGreaterThanOrEqual(0);
  expect(runnerIndex).toBeGreaterThan(stageIndex);
  expect(runnerIndex).toBeLessThan(fallbackIndex);
  expect(publishIndex).toBeGreaterThan(fallbackIndex);
}

test.describe('Jenkins Playwright report publication', { tag: '@svc-internal' }, () => {
  test('keeps an integration configuration failure in the published report directory', () => {
    expect(source).toContain('runner-failure.txt');
    expect(source).toContain('Integration session configuration did not complete before Playwright started.');
    expect(source).toContain('steps.sh "mkdir -p \'${runConfig.reportDir}\'"');
  });

  test('creates each API and E2E fallback only in its post-run lane', () => {
    const previewCleanup = source.slice(
      source.indexOf("afterAlways('smoketest:preview')"),
      source.indexOf("stage('Preview Functional Tests")
    );
    expect(previewCleanup).not.toContain('ensureHtmlReportForPublishing');
    expect(fallbackCount(source, 'PREVIEW Playwright E2E')).toBe(1);
    expect(fallbackCount(source, 'PREVIEW API Functional Test')).toBe(1);
    expect(fallbackCount(source, 'AAT Playwright E2E')).toBe(1);
    expect(fallbackCount(source, 'AAT API Functional Test')).toBe(1);
    expect(fallbackCount(nightlySource, 'Nightly Playwright E2E Cross Browser')).toBe(1);
    expect(fallbackCount(nightlySource, 'Nightly API Functional Test')).toBe(1);
    assertPostRunFallback(source, "stage('API Tests')", "yarnBuilder.yarn('test:api:pw:raw')", 'PREVIEW API Functional Test');
    assertPostRunFallback(
      source,
      "stage('Playwright E2E')",
      "yarnBuilder.yarn('test:playwrightE2E:raw')",
      'PREVIEW Playwright E2E'
    );
    assertPostRunFallback(source, "stage('API Tests')", "yarnBuilder.yarn('test:api:pw:raw')", 'AAT API Functional Test');
    assertPostRunFallback(source, "stage('Playwright E2E')", "yarnBuilder.yarn('test:playwrightE2E:raw')", 'AAT Playwright E2E');
    assertPostRunFallback(
      nightlySource,
      "stage('API Tests')",
      "yarnBuilder.yarn('test:api:pw:coverage:raw')",
      'Nightly API Functional Test'
    );
    assertPostRunFallback(
      nightlySource,
      "stage('Playwright E2E Cross Browser')",
      "yarnBuilder.yarn('test:crossbrowser:raw')",
      'Nightly Playwright E2E Cross Browser'
    );
    expect(source).toContain("reportName           : 'PREVIEW Playwright E2E'");
  });

  test('reports best-effort session reuse when CI has no explicit policy', () => {
    const output = childProcess.execFileSync(process.execPath, ['scripts/playwright-session-preflight.cjs'], {
      cwd: repositoryRoot,
      encoding: 'utf8',
      env: { CI: 'true' },
    });

    expect(output).toContain('[playwright-preflight] validation=best-effort');
  });

  test('keeps seven E2E workers while bounding concurrent direct CCD case setup', () => {
    expect(source.match(/"FUNCTIONAL_TESTS_WORKERS=7"/g)).toHaveLength(2);
    expect(source.match(/"PW_E2E_CCD_SETUP_CONCURRENCY=1"/g)).toHaveLength(2);
    expect(nightlySource).toContain("'FUNCTIONAL_TESTS_WORKERS=7'");
    expect(nightlySource).toContain("'PW_E2E_CCD_SETUP_CONCURRENCY=1'");
  });
});
