#!/usr/bin/env node

const { spawnSync } = require('node:child_process');
const { enhanceGeneratedReport } = require('../playwright_tests_new/common/reporters/odhin-report-enhancer.cjs');

const extraArgs = process.argv.slice(2);
if (extraArgs[0] === '--') {
  extraArgs.shift();
}

const isListOnlyRun = extraArgs.includes('--list');

const env = {
  ...process.env,
  PLAYWRIGHT_INCLUDE_A11Y: 'true',
  PLAYWRIGHT_JUNIT_OUTPUT:
    process.env.PLAYWRIGHT_JUNIT_OUTPUT || 'functional-output/tests/playwright-a11y/playwright-a11y-junit.xml',
  PLAYWRIGHT_REPORT_FOLDER: process.env.PLAYWRIGHT_REPORT_FOLDER || 'functional-output/tests/playwright-a11y/odhin-report',
  PLAYWRIGHT_REPORT_INDEX_FILENAME: process.env.PLAYWRIGHT_REPORT_INDEX_FILENAME || 'xui-playwright-a11y.html',
  PW_ODHIN_TITLE: process.env.PW_ODHIN_TITLE || 'RPX-XUI-WEBAPP Accessibility',
  FUNCTIONAL_TESTS_WORKERS: process.env.PW_A11Y_WORKERS || '6',
  PW_A11Y_EXPECT_TIMEOUT_MS: process.env.PW_A11Y_EXPECT_TIMEOUT_MS || '7000',
  PW_A11Y_TEST_TIMEOUT_MS: process.env.PW_A11Y_TEST_TIMEOUT_MS || '60000',
  PW_A11Y_PREWARM_SESSION: isListOnlyRun ? 'false' : process.env.PW_A11Y_PREWARM_SESSION || 'true',
  PW_ODHIN_TRIM_FAILED_ARTIFACTS: process.env.PW_ODHIN_TRIM_FAILED_ARTIFACTS || 'true',
  PW_ODHIN_FINALIZATION_TIMEOUT_MS: process.env.PW_ODHIN_FINALIZATION_TIMEOUT_MS || '30000',
};

const run = (command, args) => spawnSync(command, args, { env, stdio: 'inherit' });

const result = run('npx', [
  'playwright',
  'test',
  '--config=playwright.e2e.config.ts',
  '--grep',
  '@a11y',
  ...extraArgs,
  '--retries=0',
]);

try {
  enhanceGeneratedReport(env.PLAYWRIGHT_REPORT_FOLDER, []);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`[a11y-report] Unable to enhance generated Odhín report: ${message}\n`);
}

process.exit(result.status ?? 1);
