/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test. */
/* global require, __dirname */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const { test } = require('node:test');
const { buildSmokeEnvironment } = require('./run-playwright-smoke.cjs');

test('smoke uses a distinct report filename while retaining explicit overrides and suite directories', () => {
  const root = path.join(__dirname, '..');
  const source = fs.readFileSync(path.join(root, 'playwright.config.ts'), 'utf8');
  const resolver = source.slice(source.indexOf('const resolveOdhinIndexFilename ='), source.indexOf('const resolveBranchName ='));
  const resolve = vm.runInNewContext(
    ts.transpileModule(`${resolver}\nresolveOdhinIndexFilename;`, { compilerOptions: { target: ts.ScriptTarget.ES2020 } })
      .outputText,
    { resolveOdhinOutputFolder: (env) => env.PLAYWRIGHT_REPORT_FOLDER }
  );
  const env = buildSmokeEnvironment({ CI: 'true' });
  assert.equal(env.PLAYWRIGHT_REPORT_FOLDER, 'functional-output/tests/playwright-smoke/odhin-report');
  assert.equal(env.PLAYWRIGHT_OUTPUT_DIR, 'functional-output/tests/playwright-smoke/test-results');
  assert.equal(env.PLAYWRIGHT_REPORT_INDEX_FILENAME, 'xui-playwright-smoke.html');
  assert.equal(resolve({ PLAYWRIGHT_REPORT_FOLDER: env.PLAYWRIGHT_REPORT_FOLDER }), 'xui-playwright-smoke.html');
  assert.equal(resolve({ PLAYWRIGHT_REPORT_FOLDER: 'playwright-e2e' }), 'xui-playwright-e2e.html');
  assert.equal(resolve(buildSmokeEnvironment({ PLAYWRIGHT_REPORT_INDEX_FILENAME: 'custom.html' })), 'custom.html');
  assert.equal(buildSmokeEnvironment({}).PLAYWRIGHT_REPORT_INDEX_FILENAME, 'xui-playwright-smoke.html');
  const pipeline = fs.readFileSync(path.join(root, 'Jenkinsfile_CNP'), 'utf8');
  assert.equal(
    (
      pipeline.match(
        /reportDir\s*:\s*"functional-output\/tests\/playwright-smoke\/odhin-report\/",\s*reportFiles\s*:\s*'xui-playwright-smoke.html'/g
      ) ?? []
    ).length,
    3
  );
});
