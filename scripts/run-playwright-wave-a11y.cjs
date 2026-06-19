#!/usr/bin/env node

process.env.A11Y_ENGINES = process.env.A11Y_ENGINES || 'wave-like';
process.env.PLAYWRIGHT_A11Y_ENGINES = process.env.PLAYWRIGHT_A11Y_ENGINES || process.env.A11Y_ENGINES;
process.env.PLAYWRIGHT_INCLUDE_WAVE_A11Y = 'true';
process.env.PLAYWRIGHT_JUNIT_OUTPUT =
  process.env.PLAYWRIGHT_JUNIT_OUTPUT || 'functional-output/tests/playwright-wave-a11y/playwright-wave-a11y-junit.xml';
process.env.PLAYWRIGHT_REPORT_FOLDER =
  process.env.PLAYWRIGHT_REPORT_FOLDER || 'functional-output/tests/playwright-wave-a11y/odhin-report';
process.env.PLAYWRIGHT_REPORT_INDEX_FILENAME = process.env.PLAYWRIGHT_REPORT_INDEX_FILENAME || 'xui-playwright-wave-a11y.html';
process.env.PLAYWRIGHT_REPORT_PROJECT = process.env.PLAYWRIGHT_REPORT_PROJECT || 'RPX XUI Webapp - WAVE-like Accessibility';
process.env.PW_ODHIN_TITLE = process.env.PW_ODHIN_TITLE || 'RPX-XUI-WEBAPP WAVE-like Accessibility';
process.env.FUNCTIONAL_TESTS_WORKERS = process.env.PW_WAVE_A11Y_WORKERS || process.env.FUNCTIONAL_TESTS_WORKERS || '6';

require('./run-playwright-accessibility.cjs');
