#!/usr/bin/env node
/* global module, process, require */
/* eslint-disable @typescript-eslint/no-require-imports */

const { spawnSync } = require('node:child_process');
const { enhanceGeneratedReport } = require('../playwright_tests_new/common/reporters/odhin-report-enhancer.cjs');

const DEFAULT_OUTPUT_DIR = 'functional-output/tests/playwright-accessibility/test-results';

function normaliseExtraArgs(args) {
  const extraArgs = [...args];
  if (extraArgs[0] === '--') {
    extraArgs.shift();
  }
  return extraArgs;
}

function buildAccessibilityEnvironment(sourceEnv = process.env, args = process.argv.slice(2)) {
  const extraArgs = normaliseExtraArgs(args);
  const isListOnlyRun = extraArgs.includes('--list');

  return {
    ...sourceEnv,
    A11Y_ENGINES: sourceEnv.A11Y_ENGINES || sourceEnv.PLAYWRIGHT_A11Y_ENGINES || 'all',
    PLAYWRIGHT_A11Y_ENGINES: sourceEnv.PLAYWRIGHT_A11Y_ENGINES || sourceEnv.A11Y_ENGINES || 'all',
    PLAYWRIGHT_INCLUDE_A11Y: 'true',
    PLAYWRIGHT_INCLUDE_WAVE_A11Y: 'true',
    E2E_PW_INCLUDE_TAGS: sourceEnv.E2E_PW_INCLUDE_TAGS || '@accessibility',
    PLAYWRIGHT_TAGS: sourceEnv.PLAYWRIGHT_TAGS || '@accessibility',
    PLAYWRIGHT_OUTPUT_DIR: sourceEnv.PLAYWRIGHT_OUTPUT_DIR || DEFAULT_OUTPUT_DIR,
    PLAYWRIGHT_JUNIT_OUTPUT:
      sourceEnv.PLAYWRIGHT_JUNIT_OUTPUT || 'functional-output/tests/playwright-accessibility/playwright-accessibility-junit.xml',
    PLAYWRIGHT_REPORT_FOLDER:
      sourceEnv.PLAYWRIGHT_REPORT_FOLDER || 'functional-output/tests/playwright-accessibility/odhin-report',
    PLAYWRIGHT_REPORT_INDEX_FILENAME: sourceEnv.PLAYWRIGHT_REPORT_INDEX_FILENAME || 'xui-playwright-accessibility.html',
    PLAYWRIGHT_REPORT_PROJECT: sourceEnv.PLAYWRIGHT_REPORT_PROJECT || 'RPX XUI Webapp - Accessibility',
    PW_ODHIN_TITLE: sourceEnv.PW_ODHIN_TITLE || 'RPX-XUI-WEBAPP Accessibility',
    FUNCTIONAL_TESTS_WORKERS: sourceEnv.PW_ACCESSIBILITY_WORKERS || sourceEnv.FUNCTIONAL_TESTS_WORKERS || '6',
    PW_A11Y_EXPECT_TIMEOUT_MS: sourceEnv.PW_A11Y_EXPECT_TIMEOUT_MS || '7000',
    PW_A11Y_TEST_TIMEOUT_MS: sourceEnv.PW_A11Y_TEST_TIMEOUT_MS || '60000',
    PW_A11Y_PREWARM_SESSION: isListOnlyRun ? 'false' : sourceEnv.PW_A11Y_PREWARM_SESSION || 'true',
    PW_ODHIN_TRIM_FAILED_ARTIFACTS: sourceEnv.PW_ODHIN_TRIM_FAILED_ARTIFACTS || 'true',
    PW_ODHIN_FINALIZATION_TIMEOUT_MS: sourceEnv.PW_ODHIN_FINALIZATION_TIMEOUT_MS || '30000',
    PLAYWRIGHT_DISABLE_GENERIC_FAILURE_ARTIFACTS: 'true',
  };
}

function runAccessibility(args = process.argv.slice(2), sourceEnv = process.env) {
  const extraArgs = normaliseExtraArgs(args);
  const env = buildAccessibilityEnvironment(sourceEnv, args);
  const strictMode = ['1', 'true', 'yes', 'on'].includes((env.A11Y_STRICT || '').trim().toLowerCase());
  const result = spawnSync(
    'npx',
    ['playwright', 'test', '--config=playwright.e2e.config.ts', '--grep', '@accessibility', ...extraArgs, '--retries=0'],
    { env, stdio: 'inherit' }
  );

  try {
    enhanceGeneratedReport(env.PLAYWRIGHT_REPORT_FOLDER, []);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(`[accessibility-report] Unable to enhance generated Odhín report: ${message}\n`);
  }

  const status = result.status ?? 1;
  if (status !== 0 && !strictMode) {
    process.stderr.write(
      `[accessibility-report] Accessibility pack completed with status ${status}; A11Y_STRICT is off so the run is report-only.\n`
    );
    process.exit(0);
  }

  process.exit(status);
}

if (require.main === module) {
  runAccessibility();
}

module.exports = { buildAccessibilityEnvironment, runAccessibility };
