import { defineConfig, devices } from '@playwright/test';

const { cpus } = require('os');
const { version: appVersion } = require('./package.json');

const headlessMode = process.env.HEAD !== 'true';
export const axeTestEnabled = process.env.ENABLE_AXE_TESTS === 'true';
const odhinOutputFolder =
  process.env.PLAYWRIGHT_REPORT_FOLDER ?? 'functional-output/tests/playwright-e2e/odhin-report';

const resolveWorkerCount = () => {
  const configured = process.env.FUNCTIONAL_TESTS_WORKERS;
  if (configured) {
    return parseInt(configured, 10);
  }
  if (process.env.CI) {
    return 1;
  }
  return 10;
};
const workerCount = resolveWorkerCount();

module.exports = defineConfig({
  testDir: '.',
  testMatch: [
    'playwright_tests/**/*.test.ts',
    'playwright_tests_new/**/*.spec.ts',
  ],
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 3, // Set the number of retries for all projects

  timeout: 3 * 60 * 1000,
  expect: {
    timeout: 1 * 60 * 1000
  },
  reportSlowTests: null,

  /* Opt out of parallel tests on CI. */
  workers: workerCount,

  reporter: [
    [process.env.CI ? 'dot' : 'list'],
    ['odhin-reports-playwright', {
      outputFolder: odhinOutputFolder,
      indexFilename: 'xui-playwright.html',
      title: 'RPX XUI Playwright',
      testEnvironment: `${process.env.TEST_TYPE ?? (process.env.CI ? 'ci' : 'local')} | workers=${workerCount}`,
      project: process.env.PLAYWRIGHT_REPORT_PROJECT ?? 'RPX XUI Webapp',
      release: process.env.PLAYWRIGHT_REPORT_RELEASE ?? `${appVersion} | branch=${process.env.GIT_BRANCH ?? 'local'}`,
      startServer: false,
      consoleLog: true,
      consoleError: true,
      testOutput: 'only-on-failure'
    }]
  ],

  projects: [
    {
      name: 'chromium',
      testIgnore: ['playwright_tests_new/api/**'],
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        headless: headlessMode,
        trace: 'retain-on-failure',
        screenshot: {
          mode: 'only-on-failure',
          fullPage: true
        },
        video: 'retain-on-failure'
      }
    },
    {
      name: 'node-api',
      testMatch: ['playwright_tests_new/api/**/*.api.ts', 'playwright_tests_new/api/**/*.spec.ts'],
      workers: process.env.CI ? 1 : 30,
      use: {
        headless: true,
        screenshot: 'off',
        video: 'off',
        trace: 'off'
      }
    }
  ]
});
