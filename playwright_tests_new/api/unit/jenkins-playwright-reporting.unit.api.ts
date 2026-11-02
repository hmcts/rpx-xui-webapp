import { expect, test } from '@playwright/test';
import childProcess from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const source = fs.readFileSync(path.join(repositoryRoot, 'Jenkinsfile_CNP'), 'utf8');
const nightlySource = fs.readFileSync(path.join(repositoryRoot, 'Jenkinsfile_nightly'), 'utf8');
const diagnosticCollector = path.join(repositoryRoot, 'scripts/collect-playwright-diagnostics.cjs');
const diagnosticSource = fs.readFileSync(diagnosticCollector, 'utf8');

function createFile(filePath: string, contents = 'diagnostic'): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, contents);
}

function runDiagnosticCollector(root: string, buildId: string): void {
  childProcess.execFileSync(
    process.execPath,
    [
      diagnosticCollector,
      '--tests-root',
      path.join(root, 'functional-output/tests'),
      '--output-dir',
      path.join(root, 'functional-output/tests/playwright-diagnostics/failure-data'),
    ],
    {
      cwd: repositoryRoot,
      env: { ...process.env, DIAGNOSTIC_BUILD_ID: buildId },
      stdio: 'pipe',
    }
  );
}

function readDiagnosticManifest(root: string): string {
  return fs.readFileSync(
    path.join(root, 'functional-output/tests/playwright-diagnostics/failure-data/diagnostic-manifest.txt'),
    'utf8'
  );
}

function diagnosticArchiveBlock(jenkinsfile: string): string {
  const start = jenkinsfile.indexOf('def archivePlaywrightDiagnostics = {');
  const end = jenkinsfile.indexOf('\n}\n\ndef playwrightIntegrationReportFile', start);
  return jenkinsfile.slice(start, end);
}

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
    expect(source).toContain('node scripts/collect-playwright-diagnostics.cjs');
    expect(source).not.toContain('find test-results -type f');
    expect(source).toContain("suiteResultsDir = 'functional-output/tests/playwright-integration/test-results'");
    expect(source).toContain('outputDir = runConfigs.size() == 1 ? suiteResultsDir : "${runConfig.reportDir}/test-results"');
    expect(source).toContain('PLAYWRIGHT_OUTPUT_DIR=${outputDir}');
    expect(source).toContain('PLAYWRIGHT_JUNIT_OUTPUT=${junitFile}');
    expect(source).toContain('PW_ODHIN_ENSURE_OUTCOME=${outcome}');
    expect(source).toContain("outcome = runnerCompleted ? 'completed' : 'test-failure'");
    expect(source).toContain('test-results/perfetto*.json');
    expect(source).toContain('test-results/**/failure-data.json');
    expect(source).toContain('test-results/**/failure-context.json');
    expect(diagnosticSource).toContain('diagnostic-manifest.txt');
    expect(diagnosticSource).toContain("const status = count > 0 ? 'present' : 'none-captured';");
    expect(source).toContain('test-results/**/trace.zip');
    expect(source).toContain('test-results/**/*.png');
    expect(source).toContain('test-results/**/*.jpg');
    expect(source).toContain('test-results/**/*.jpeg');
    expect(source).toContain('functional-output/tests/playwright-*/odhin-report/**/*');
    expect(source).toContain('def publishPlaywrightAccessibilityJUnit = {');
    expect(source).toContain('if (!fileExists(playwrightAccessibilityJunitFile))');
    expect(source.match(/publishPlaywrightAccessibilityJUnit\(\)/g)).toHaveLength(2);
    expect(nightlySource).toContain("suiteResultsDir = 'functional-output/tests/playwright-integration/test-results'");
    expect(nightlySource).toContain('node scripts/collect-playwright-diagnostics.cjs');
    expect(nightlySource).not.toContain('find test-results -type f');
    expect(nightlySource).toContain(
      'outputDir = runConfigs.size() == 1 ? suiteResultsDir : "${runConfig.reportDir}/test-results"'
    );
    expect(nightlySource).toContain('PLAYWRIGHT_OUTPUT_DIR=${outputDir}');
    expect(nightlySource).toContain('PW_ODHIN_ENSURE_OUTCOME=${outcome}');
    expect(nightlySource).toContain("outcome = runnerCompleted ? 'completed' : 'test-failure'");
    expect(nightlySource).toContain('def publishPlaywrightAccessibilityJUnit = {');
    expect(nightlySource).toContain('functional-output/tests/playwright-*/odhin-report/**/*');
    expect(nightlySource).toContain('test-results/**/trace.zip');
    expect(nightlySource).toContain('test-results/**/failure-context.json');
    expect(nightlySource).toContain('if (!fileExists(playwrightAccessibilityJunitFile))');
    expect(nightlySource).toContain('skipMarkingBuildUnstable: true, testResults: playwrightAccessibilityJunitFile');
    expect(nightlySource.match(/publishPlaywrightAccessibilityJUnit\(\)/g)).toHaveLength(1);

    for (const jenkinsfile of [source, nightlySource]) {
      const archiveBlock = diagnosticArchiveBlock(jenkinsfile);
      expect(archiveBlock).toContain('node scripts/collect-playwright-diagnostics.cjs');
      expect(archiveBlock).not.toContain('set +e');
      expect(archiveBlock).not.toContain('exit 0');
    }
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

  test('reproduces the old root-only diagnostic scan missing lane-local output', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'diagnostic-root-scan-'));
    const laneFile = path.join(root, 'functional-output/tests/playwright-e2e/test-results/test/failure-context.json');
    createFile(laneFile);

    try {
      const oldScan = childProcess.execFileSync(
        'sh',
        ['-c', "if [ -d test-results ]; then find test-results -type f -name 'failure-context.json'; fi"],
        { cwd: root, encoding: 'utf8' }
      );

      expect(oldScan).toBe('');
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  test('collects nested lane diagnostics and excludes video files', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'diagnostic-lanes-'));
    const testsRoot = path.join(root, 'functional-output/tests');
    const e2eResults = path.join(testsRoot, 'playwright-e2e/test-results/document-upload');
    const integrationResults = path.join(
      testsRoot,
      'playwright-integration/odhin-report/aat-workers-7/test-results/document-upload'
    );
    createFile(path.join(e2eResults, 'failure-data.json'));
    createFile(path.join(e2eResults, 'failure-context.json'));
    createFile(path.join(e2eResults, 'trace.zip'));
    createFile(path.join(e2eResults, 'failure.png'));
    createFile(path.join(integrationResults, 'failure-data.json'));
    createFile(path.join(integrationResults, 'failure.jpg'));
    createFile(path.join(integrationResults, 'failure.jpeg'));
    createFile(path.join(integrationResults, 'failure.webm'));
    createFile(path.join(testsRoot, 'playwright-diagnostics/failure-data/stale.json'));
    createFile(path.join(testsRoot, 'playwright-diagnostics/old-run/test-results/stale/failure-data.json'));

    try {
      runDiagnosticCollector(root, 'build-1');

      const manifest = readDiagnosticManifest(root);
      const outputDir = path.join(testsRoot, 'playwright-diagnostics/failure-data');
      const copiedFiles = fs.readdirSync(outputDir);

      expect(manifest).toContain('diagnostic_status=present');
      expect(manifest).toContain('diagnostic_count=7');
      expect(manifest).toContain('failure_data_count=2');
      expect(manifest).toContain('failure_context_count=1');
      expect(manifest).toContain('trace_count=1');
      expect(manifest).toContain('screenshot_count=3');
      expect(copiedFiles.some((file) => file.includes('playwright-e2e') && file.includes('failure-data.json__'))).toBe(true);
      expect(copiedFiles.some((file) => file.includes('aat-workers-7') && file.includes('failure-data.json__'))).toBe(true);
      expect(copiedFiles.some((file) => file.endsWith('.webm'))).toBe(false);
      expect(copiedFiles).not.toContain('stale.json');
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  test('keeps structured diagnostics unique when readable path names collide', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'diagnostic-name-collision-'));
    const testsRoot = path.join(root, 'functional-output/tests');
    const firstFile = path.join(testsRoot, 'a b/test-results/failure-data.json');
    const secondFile = path.join(testsRoot, 'a/b/test-results/failure-data.json');
    const outputDir = path.join(testsRoot, 'playwright-diagnostics/failure-data');
    createFile(firstFile, 'first diagnostic');
    createFile(secondFile, 'second diagnostic');

    try {
      runDiagnosticCollector(root, 'build-collision');

      const copiedFiles = fs.readdirSync(outputDir).filter((file) => file !== 'diagnostic-manifest.txt');
      const copiedContents = new Set(copiedFiles.map((file) => fs.readFileSync(path.join(outputDir, file), 'utf8')));

      expect(copiedFiles).toHaveLength(2);
      expect(new Set(copiedFiles).size).toBe(2);
      expect(copiedFiles.every((file) => file.includes('failure-data.json__'))).toBe(true);
      expect(copiedContents).toEqual(new Set(['first diagnostic', 'second diagnostic']));
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  test('clears stale diagnostics for a new build and retains diagnostics for repeated calls in one build', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'diagnostic-builds-'));
    const testsRoot = path.join(root, 'functional-output/tests');
    const firstFile = path.join(testsRoot, 'playwright-e2e/test-results/first/failure-context.json');
    const secondFile = path.join(testsRoot, 'playwright-accessibility/test-results/second/failure-context.json');
    const outputDir = path.join(testsRoot, 'playwright-diagnostics/failure-data');
    createFile(firstFile);

    try {
      runDiagnosticCollector(root, 'build-1');
      createFile(secondFile);
      runDiagnosticCollector(root, 'build-1');

      let copiedFiles = fs.readdirSync(outputDir);
      expect(copiedFiles.filter((file) => file.includes('failure-context.json__'))).toHaveLength(2);
      expect(readDiagnosticManifest(root)).toContain('diagnostic_count=2');

      fs.rmSync(firstFile);
      fs.rmSync(secondFile);
      runDiagnosticCollector(root, 'build-2');

      copiedFiles = fs.readdirSync(outputDir);
      expect(readDiagnosticManifest(root)).toContain('diagnostic_status=none-captured');
      expect(copiedFiles.filter((file) => file.includes('failure-context.json__'))).toHaveLength(0);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });
});
