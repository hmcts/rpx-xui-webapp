#!/usr/bin/env node

const { spawnSync } = require('node:child_process');
const { enhanceGeneratedReport } = require('../playwright_tests_new/common/reporters/odhin-report-enhancer.cjs');

const extraArgs = process.argv.slice(2);
if (extraArgs[0] === '--') {
  extraArgs.shift();
}

const env = {
  ...process.env,
  A11Y_ENGINES: process.env.A11Y_ENGINES || 'wave-like',
  PLAYWRIGHT_A11Y_ENGINES: process.env.PLAYWRIGHT_A11Y_ENGINES || process.env.A11Y_ENGINES || 'wave-like',
  PLAYWRIGHT_INCLUDE_A11Y: 'true',
  PLAYWRIGHT_INCLUDE_WAVE_A11Y: 'true',
  E2E_PW_INCLUDE_TAGS: process.env.E2E_PW_INCLUDE_TAGS || '@wave-a11y',
  PLAYWRIGHT_TAGS: process.env.PLAYWRIGHT_TAGS || '@wave-a11y',
  PLAYWRIGHT_JUNIT_OUTPUT:
    process.env.PLAYWRIGHT_JUNIT_OUTPUT || 'functional-output/tests/playwright-wave-a11y/playwright-wave-a11y-junit.xml',
  PLAYWRIGHT_REPORT_FOLDER: process.env.PLAYWRIGHT_REPORT_FOLDER || 'functional-output/tests/playwright-wave-a11y/odhin-report',
  PLAYWRIGHT_REPORT_INDEX_FILENAME: process.env.PLAYWRIGHT_REPORT_INDEX_FILENAME || 'xui-playwright-wave-a11y.html',
  PLAYWRIGHT_REPORT_PROJECT: process.env.PLAYWRIGHT_REPORT_PROJECT || 'RPX XUI Webapp - WAVE-like Accessibility',
  PW_ODHIN_TITLE: process.env.PW_ODHIN_TITLE || 'RPX-XUI-WEBAPP WAVE-like Accessibility',
  FUNCTIONAL_TESTS_WORKERS: process.env.PW_WAVE_A11Y_WORKERS || process.env.FUNCTIONAL_TESTS_WORKERS || '6',
  PW_A11Y_EXPECT_TIMEOUT_MS: process.env.PW_A11Y_EXPECT_TIMEOUT_MS || '7000',
  PW_A11Y_TEST_TIMEOUT_MS: process.env.PW_A11Y_TEST_TIMEOUT_MS || '60000',
  PW_ODHIN_TRIM_FAILED_ARTIFACTS: process.env.PW_ODHIN_TRIM_FAILED_ARTIFACTS || 'true',
  PW_ODHIN_FINALIZATION_TIMEOUT_MS: process.env.PW_ODHIN_FINALIZATION_TIMEOUT_MS || '30000',
  PLAYWRIGHT_DISABLE_GENERIC_FAILURE_ARTIFACTS: 'true',
};

const run = (command, args) => spawnSync(command, args, { env, stdio: 'inherit' });

const result = run('npx', [
  'playwright',
  'test',
  '--config=playwright.e2e.config.ts',
  '--grep',
  '@wave-a11y',
  ...extraArgs,
  '--retries=0',
]);

try {
  enhanceGeneratedReport(env.PLAYWRIGHT_REPORT_FOLDER, []);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`[wave-a11y-report] Unable to enhance generated Odhín report: ${message}\n`);
}

process.exit(result.status ?? 1);
