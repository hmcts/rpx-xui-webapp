/* global require, process, __dirname */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');
const { parse } = require('node-html-parser');
const minimatch = require('minimatch');
const { enhanceGeneratedReport } = require('../playwright_tests_new/common/reporters/odhin-report-enhancer.cjs');
const { publishApiCoverage } = require('./publish-api-coverage.cjs');
const { writeIntegrationReportIndex } = require('./write-integration-report-index.cjs');

const shell = '<html><body><div class="tab"><button class="main-tablinks">Tests</button></div></body></html>';
test('final suite HTML links exact Jenkins artifacts and coverage survives HTML publication', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'jenkins-artifact-links-'));
  const cwd = process.cwd();
  const previous = {
    BUILD_URL: process.env.BUILD_URL,
    PLAYWRIGHT_PERFETTO_ARTIFACT_BASE_URL: process.env.PLAYWRIGHT_PERFETTO_ARTIFACT_BASE_URL,
  };
  const build = 'https://jenkins.example/job/xui/42/';
  try {
    process.chdir(root);
    process.env.BUILD_URL = build;
    delete process.env.PLAYWRIGHT_PERFETTO_ARTIFACT_BASE_URL;
    for (const suite of ['api', 'integration', 'e2e', 'smoke']) {
      const suiteDir = `functional-output/tests/playwright-${suite}`;
      const reportDir = `${suiteDir}/odhin-report${suite === 'integration' ? '/preview-workers-7' : ''}`;
      const resultsDir = suite === 'integration' ? `${reportDir}/test-results` : `${suiteDir}/test-results`;
      fs.mkdirSync(reportDir, { recursive: true });
      fs.mkdirSync(resultsDir, { recursive: true });
      const reportFile = `${reportDir}/xui-playwright-${suite}.html`;
      fs.writeFileSync(reportFile, shell);
      fs.writeFileSync(`${resultsDir}/perfetto.json`, '{}');
      enhanceGeneratedReport(reportDir, []);
      const html = parse(fs.readFileSync(reportFile, 'utf8'));
      assert(html.querySelector('.main-tablinks[onclick*="TabPerfetto"]'), suite);
      const href = html.querySelector('#TabPerfetto a').getAttribute('href');
      assert.equal(href, `${build}artifact/${resultsDir}/perfetto.json`);
      assert(fs.existsSync(new URL(href).pathname.split('/artifact/')[1]));
      for (const pipeline of ['Jenkinsfile_CNP', 'Jenkinsfile_nightly']) {
        const source = fs.readFileSync(path.join(__dirname, '..', pipeline), 'utf8');
        const globs = [...source.matchAll(/artifacts: '([^']*perfetto[^']*)'/g)].flatMap((m) => m[1].split(','));
        assert(
          globs.some((glob) => minimatch(`${resultsDir}/perfetto.json`, glob)),
          `${pipeline}: ${suite}`
        );
      }
      if (suite === 'integration') {
        const landingRoot = `${suiteDir}/odhin-report`;
        writeIntegrationReportIndex(landingRoot, 'xui-playwright-integration.html', ['preview-workers-7']);
        const landing = parse(fs.readFileSync(`${landingRoot}/index.html`, 'utf8'));
        for (const link of landing.querySelectorAll('a')) {
          assert(fs.existsSync(path.join(landingRoot, link.getAttribute('href'))));
        }
      }
      if (suite === 'api') {
        fs.mkdirSync('coverage', { recursive: true });
        fs.writeFileSync('coverage/index.html', '<a href="base.css">coverage totals</a>');
        fs.writeFileSync('coverage/base.css', 'body {}');
        publishApiCoverage(reportDir, 'coverage');
        publishApiCoverage(reportDir, 'coverage');
        const final = parse(fs.readFileSync(reportFile, 'utf8'));
        assert.equal(final.querySelectorAll('#TabCoverage').length, 1);
        assert.equal(final.querySelector('#TabPerfetto a').getAttribute('href'), href);
        const coverageLink = final.querySelector('#TabCoverage a').getAttribute('href');
        assert.equal(coverageLink, 'coverage/index.html');
        assert(fs.existsSync(path.join(reportDir, coverageLink)));
        assert(fs.existsSync(path.join(reportDir, 'coverage/base.css')));
      }
    }
    assert.throws(() => publishApiCoverage('missing-report', 'coverage'), /missing/);
  } finally {
    process.chdir(cwd);
    for (const [name, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
    fs.rmSync(root, { recursive: true, force: true });
  }
});
