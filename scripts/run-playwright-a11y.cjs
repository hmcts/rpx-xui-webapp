#!/usr/bin/env node
/* global module, process, require */
/* eslint-disable @typescript-eslint/no-require-imports */

const A11Y_OUTPUT_DIR = 'functional-output/tests/playwright-a11y/test-results';

function configureA11yEnvironment(sourceEnv = process.env) {
  sourceEnv.A11Y_ENGINES = sourceEnv.A11Y_ENGINES || 'axe';
  sourceEnv.PLAYWRIGHT_A11Y_ENGINES = sourceEnv.PLAYWRIGHT_A11Y_ENGINES || sourceEnv.A11Y_ENGINES;
  sourceEnv.PLAYWRIGHT_OUTPUT_DIR = sourceEnv.PLAYWRIGHT_OUTPUT_DIR || A11Y_OUTPUT_DIR;
  sourceEnv.PLAYWRIGHT_JUNIT_OUTPUT =
    sourceEnv.PLAYWRIGHT_JUNIT_OUTPUT || 'functional-output/tests/playwright-a11y/playwright-a11y-junit.xml';
  sourceEnv.PLAYWRIGHT_REPORT_FOLDER =
    sourceEnv.PLAYWRIGHT_REPORT_FOLDER || 'functional-output/tests/playwright-a11y/odhin-report';
  sourceEnv.PLAYWRIGHT_REPORT_INDEX_FILENAME = sourceEnv.PLAYWRIGHT_REPORT_INDEX_FILENAME || 'xui-playwright-a11y.html';
  sourceEnv.PW_ODHIN_TITLE = sourceEnv.PW_ODHIN_TITLE || 'RPX-XUI-WEBAPP Accessibility';
  sourceEnv.FUNCTIONAL_TESTS_WORKERS = sourceEnv.PW_A11Y_WORKERS || sourceEnv.FUNCTIONAL_TESTS_WORKERS || '6';
  return sourceEnv;
}

if (require.main === module) {
  configureA11yEnvironment();
  require('./run-playwright-accessibility.cjs').runAccessibility();
}

module.exports = { configureA11yEnvironment };
