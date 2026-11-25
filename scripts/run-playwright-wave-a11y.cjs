#!/usr/bin/env node
/* global module, process, require */
/* eslint-disable @typescript-eslint/no-require-imports */

const WAVE_A11Y_OUTPUT_DIR = 'functional-output/tests/playwright-wave-a11y/test-results';

function configureWaveA11yEnvironment(sourceEnv = process.env) {
  sourceEnv.A11Y_ENGINES = sourceEnv.A11Y_ENGINES || 'wave-like';
  sourceEnv.PLAYWRIGHT_A11Y_ENGINES = sourceEnv.PLAYWRIGHT_A11Y_ENGINES || sourceEnv.A11Y_ENGINES;
  sourceEnv.PLAYWRIGHT_INCLUDE_WAVE_A11Y = 'true';
  sourceEnv.PLAYWRIGHT_OUTPUT_DIR = sourceEnv.PLAYWRIGHT_OUTPUT_DIR || WAVE_A11Y_OUTPUT_DIR;
  sourceEnv.PLAYWRIGHT_JUNIT_OUTPUT =
    sourceEnv.PLAYWRIGHT_JUNIT_OUTPUT || 'functional-output/tests/playwright-wave-a11y/playwright-wave-a11y-junit.xml';
  sourceEnv.PLAYWRIGHT_REPORT_FOLDER =
    sourceEnv.PLAYWRIGHT_REPORT_FOLDER || 'functional-output/tests/playwright-wave-a11y/odhin-report';
  sourceEnv.PLAYWRIGHT_REPORT_INDEX_FILENAME = sourceEnv.PLAYWRIGHT_REPORT_INDEX_FILENAME || 'xui-playwright-wave-a11y.html';
  sourceEnv.PLAYWRIGHT_REPORT_PROJECT = sourceEnv.PLAYWRIGHT_REPORT_PROJECT || 'RPX XUI Webapp - WAVE-like Accessibility';
  sourceEnv.PW_ODHIN_TITLE = sourceEnv.PW_ODHIN_TITLE || 'RPX-XUI-WEBAPP WAVE-like Accessibility';
  sourceEnv.FUNCTIONAL_TESTS_WORKERS = sourceEnv.PW_WAVE_A11Y_WORKERS || sourceEnv.FUNCTIONAL_TESTS_WORKERS || '6';
  return sourceEnv;
}

if (require.main === module) {
  configureWaveA11yEnvironment();
  require('./run-playwright-accessibility.cjs').runAccessibility();
}

module.exports = { configureWaveA11yEnvironment };
