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

function expectInterruptedOutcomesToBypassFailure(jenkinsfile: string, expectedFailureOutcomes: number): void {
  const failureOutcomes = [
    ...jenkinsfile.matchAll(/(?:outcome = runnerCompleted \? 'completed' : |(?:apiOutcome|e2eOutcome) = )'test-failure'/g),
  ];

  expect(failureOutcomes).toHaveLength(expectedFailureOutcomes);
  for (const failureOutcome of failureOutcomes) {
    const failurePosition = failureOutcome.index ?? -1;
    const catchPosition = jenkinsfile.lastIndexOf('catch (Exception e) {', failurePosition);
    const catchBlock = jenkinsfile.slice(catchPosition, failurePosition);

    expect(catchPosition).toBeGreaterThanOrEqual(0);
    expect(catchBlock).toContain('FlowInterruptedException');
    expect(catchBlock).toContain('hudson.AbortException');
  }
}

test.describe('Jenkins Playwright report publication', { tag: '@svc-internal' }, () => {
  test('keeps an integration configuration failure in the published report directory', () => {
    for (const jenkinsfile of [source, nightlySource]) {
      expect(jenkinsfile).toContain('runner-failure.txt');
      expect(jenkinsfile).toContain('Integration session configuration did not complete before Playwright started.');
      expect(jenkinsfile).toContain('steps.sh "mkdir -p \'${runConfig.reportDir}\'"');
    }
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

  test('keeps report diagnostics and JUnit output lane-local', () => {
    expect(source).toContain("suiteResultsDir = 'functional-output/tests/playwright-integration/test-results'");
    expect(source).toContain('outputDir = runConfigs.size() == 1 ? suiteResultsDir : "${runConfig.reportDir}/test-results"');
    expect(source).toContain('PLAYWRIGHT_OUTPUT_DIR=${outputDir}');
    expect(source).toContain('PLAYWRIGHT_JUNIT_OUTPUT=${junitFile}');
    expect(source).toContain('PW_ODHIN_ENSURE_OUTCOME=${outcome}');
    expect(source).toContain("outcome = runnerCompleted ? 'completed' : 'test-failure'");
    expect(source).toContain('test-results/perfetto*.json');
    expect(source).toContain('test-results/**/failure-data.json');
    expect(source).toContain('test-results/**/trace.zip');
    expect(source).toContain('test-results/**/*.png');
    expect(source).toContain('test-results/**/*.jpg');
    expect(source).toContain('test-results/**/*.jpeg');
    expect(source).toContain('functional-output/tests/playwright-*/odhin-report/**/*');
    expect(source).toContain('def publishPlaywrightAccessibilityJUnit = {');
    expect(source).toContain('if (!fileExists(playwrightAccessibilityJunitFile))');
    expect(source.match(/publishPlaywrightAccessibilityJUnit\(\)/g)).toHaveLength(2);
    expect(nightlySource).toContain("suiteResultsDir = 'functional-output/tests/playwright-integration/test-results'");
    expect(nightlySource).toContain(
      'outputDir = runConfigs.size() == 1 ? suiteResultsDir : "${runConfig.reportDir}/test-results"'
    );
    expect(nightlySource).toContain('PLAYWRIGHT_OUTPUT_DIR=${outputDir}');
    expect(nightlySource).toContain('PW_ODHIN_ENSURE_OUTCOME=${outcome}');
    expect(nightlySource).toContain("outcome = runnerCompleted ? 'completed' : 'test-failure'");
    expect(nightlySource).toContain('def publishPlaywrightAccessibilityJUnit = {');
    expect(nightlySource).toContain('functional-output/tests/playwright-*/odhin-report/**/*');
    expect(nightlySource).toContain('test-results/**/trace.zip');
    expect(nightlySource).toContain('if (!fileExists(playwrightAccessibilityJunitFile))');
    expect(nightlySource).toContain('skipMarkingBuildUnstable: true, testResults: playwrightAccessibilityJunitFile');
    expect(nightlySource.match(/publishPlaywrightAccessibilityJUnit\(\)/g)).toHaveLength(1);
  });

  test('preserves interrupted outcomes before creating fallback failure reports', () => {
    expectInterruptedOutcomesToBypassFailure(source, 5);
    expectInterruptedOutcomesToBypassFailure(nightlySource, 3);
  });

  test('keeps interruption handling ahead of failure classification', () => {
    for (const jenkinsfile of [source, nightlySource]) {
      for (const match of jenkinsfile.matchAll(/outcome = runnerCompleted \? 'completed' : 'test-failure'/g)) {
        const outcomeIndex = match.index ?? -1;
        const catchBlock = jenkinsfile.slice(jenkinsfile.lastIndexOf('catch (Exception e) {', outcomeIndex), outcomeIndex);
        expect(catchBlock).toContain('FlowInterruptedException');
        expect(catchBlock).toContain('hudson.AbortException');
      }
    }
  });

  test('clears the smoke report directory before Playwright starts', () => {
    const smokeRunner = fs.readFileSync(path.join(repositoryRoot, 'scripts/run-playwright-smoke.cjs'), 'utf8');
    expect(smokeRunner).toContain('fs.rmSync(reportDir, { recursive: true, force: true });');
  });

  test('reports best-effort session reuse when CI has no explicit policy', () => {
    const output = childProcess.execFileSync(process.execPath, ['scripts/playwright-session-preflight.cjs'], {
      cwd: repositoryRoot,
      encoding: 'utf8',
      env: { CI: 'true' },
    });

    expect(output).toContain('[playwright-preflight] validation=best-effort');
  });

  test('does not let a missing JUnit file replace the Playwright runner outcome', () => {
    for (const jenkinsfile of [source, nightlySource]) {
      expect(jenkinsfile).toContain('def publishPlaywrightJUnit = { String junitFile, String outcome ->');
      expect(jenkinsfile).toContain('if (!fileExists(junitFile))');
      expect(jenkinsfile).toContain("if (outcome == 'completed')");
      expect(jenkinsfile).toContain('preserving the runner result');
      expect(jenkinsfile).not.toContain(
        "junit allowEmptyResults: false, testResults: 'functional-output/tests/api_functional/odhin-report/playwright-junit.xml'"
      );
      expect(jenkinsfile).not.toContain(
        "junit allowEmptyResults: false, testResults: 'functional-output/tests/playwright-e2e/odhin-report/playwright-junit.xml'"
      );
    }
  });

  test('keeps seven E2E workers while bounding concurrent direct CCD case setup', () => {
    expect(source.match(/"FUNCTIONAL_TESTS_WORKERS=7"/g)).toHaveLength(2);
    expect(source.match(/"PW_E2E_CCD_SETUP_CONCURRENCY=1"/g)).toHaveLength(2);
    expect(nightlySource).toContain("'FUNCTIONAL_TESTS_WORKERS=7'");
    expect(nightlySource).toContain("'PW_E2E_CCD_SETUP_CONCURRENCY=1'");
  });
});
