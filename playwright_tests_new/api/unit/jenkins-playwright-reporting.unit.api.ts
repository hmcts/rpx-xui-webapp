import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const source = fs.readFileSync(path.join(repositoryRoot, 'Jenkinsfile_CNP'), 'utf8');
const nightlySource = fs.readFileSync(path.join(repositoryRoot, 'Jenkinsfile_nightly'), 'utf8');

test.describe('Jenkins Playwright report publication', { tag: '@svc-internal' }, () => {
  test('keeps an integration configuration failure in the published report directory', () => {
    expect(source).toContain('runner-failure.txt');
    expect(source).toContain('Integration session configuration did not complete before Playwright started.');
    expect(source).toContain('steps.sh "mkdir -p \'${runConfig.reportDir}\'"');
  });

  test('creates an E2E report fallback in both the parallel lane and Preview cleanup', () => {
    const fallbacks = source.match(
      /ensureHtmlReportForPublishing\(\s*'functional-output\/tests\/playwright-e2e\/odhin-report',\s*'xui-playwright-e2e\.html',\s*'PREVIEW Playwright E2E'/g
    );
    expect(fallbacks).toHaveLength(2);
    expect(source).toContain("reportName           : 'PREVIEW Playwright E2E'");
  });

  test('keeps seven E2E workers while bounding concurrent direct CCD case setup', () => {
    expect(source.match(/"FUNCTIONAL_TESTS_WORKERS=7"/g)).toHaveLength(2);
    expect(source.match(/"PW_E2E_CCD_SETUP_CONCURRENCY=1"/g)).toHaveLength(2);
    expect(nightlySource).toContain("'FUNCTIONAL_TESTS_WORKERS=7'");
    expect(nightlySource).toContain("'PW_E2E_CCD_SETUP_CONCURRENCY=1'");
  });
});
