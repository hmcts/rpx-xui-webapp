/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS script. */
/* global require, __dirname */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');
const { writeIntegrationReportIndex } = require('./write-integration-report-index.cjs');

test('landing links only requested profiles and reports missing evidence honestly', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'integration-index-'));
  try {
    fs.mkdirSync(path.join(root, 'preview-workers-7', 'test-results'), { recursive: true });
    fs.writeFileSync(path.join(root, 'preview-workers-7', 'report.html'), 'report');
    fs.writeFileSync(path.join(root, 'preview-workers-7', 'test-results', 'perfetto.json'), '{}');
    fs.mkdirSync(path.join(root, 'stale-workers-3'));
    writeIntegrationReportIndex(root, 'report.html', ['preview-workers-7', 'preview-workers-4-shard-1-2']);
    const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
    assert.match(html, /href="preview-workers-7\/report.html"/);
    assert.match(html, /href="preview-workers-7\/test-results\/perfetto.json"/);
    assert.match(html, /preview-workers-4-shard-1-2/);
    assert.match(html, /Report unavailable/);
    assert.match(html, /Perfetto unavailable/);
    assert.doesNotMatch(html, /stale-workers/);
    assert.throws(() => writeIntegrationReportIndex(root, 'report.html', ['../escape']));
    assert.equal(fs.readFileSync(path.join(root, 'preview-workers-7', 'report.html'), 'utf8'), 'report');
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('both Jenkins matrices publish one guarded landing report and retain isolated profile outputs', () => {
  for (const filename of ['Jenkinsfile_CNP', 'Jenkinsfile_nightly']) {
    const source = fs.readFileSync(path.join(__dirname, '..', filename), 'utf8');
    const start = source.indexOf('def runPlaywrightIntegrationProfileMatrix =');
    const matrix = source.slice(start, source.indexOf('\n}\n', start) + 2);
    assert.equal((matrix.match(/publishHTML\(/g) ?? []).length, 2, filename);
    assert.match(matrix, /if \(runConfigs\.size\(\) == 1\)/);
    assert.match(matrix, /runConfigs\[0\]\.reportDir = reportRoot/);
    assert.match(matrix, /reportDir\s*:\s*reportRoot/);
    assert.match(matrix, /reportFiles\s*:\s*'index\.html'/);
    assert.match(matrix, /reportDir\s*:\s*"\$\{reportRoot\}\//);
    assert.match(matrix, /PLAYWRIGHT_REPORT_FOLDER=\$\{runConfig\.reportDir\}/);
    assert.match(matrix, /suiteResultsDir = 'functional-output\/tests\/playwright-integration\/test-results'/);
    assert.match(matrix, /outputDir = runConfigs\.size\(\) == 1 \? suiteResultsDir : "\$\{runConfig\.reportDir\}\/test-results"/);
    assert.match(matrix, /PLAYWRIGHT_OUTPUT_DIR=\$\{outputDir\}/);
    assert.match(matrix, /junit allowEmptyResults: false, testResults: junitFile/);
    assert.match(matrix, /dir\(runConfig\.reportDir\) \{ deleteDir\(\) \}/);
    assert.match(matrix, /catch \(Exception originalFailure\) \{\s*matrixFailure = originalFailure\s*throw originalFailure/);
    assert.match(matrix, /finally \{\s*try \{/);
    assert.match(matrix, /catch \(Exception reportingFailure\)/);
    assert.match(matrix, /matrixFailure == null && reportingFailure instanceof/);
    assert.match(matrix, /failures << message/);
    assert.match(matrix, /if \(failures\) \{\s*error\(/);
  }
});
