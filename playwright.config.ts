import { defineConfig, devices } from '@playwright/test';

const { cpus } = require('os');
const { version: appVersion } = require('./package.json');

const headlessMode = process.env.HEAD !== 'true';
export const axeTestEnabled = process.env.ENABLE_AXE_TESTS === 'true';
const odhinOutputFolder =
  process.env.PLAYWRIGHT_REPORT_FOLDER ?? 'functional-output/tests/playwright-e2e/odhin-report';

const parseWorkerCount = (value?: string) => {
  const parsed = value ? Number.parseInt(value, 10) : Number.NaN;
  return Number.isFinite(parsed) ? parsed : undefined;
};

const resolveWorkerCount = (ciDefault: number, localDefault: number) => {
  const configured = parseWorkerCount(process.env.FUNCTIONAL_TESTS_WORKERS);
  return configured ?? (process.env.CI ? ciDefault : localDefault);
};
const workerCount = resolveWorkerCount(1, 10);
const nodeApiWorkerCount = resolveWorkerCount(8, 8);
const reporterWorkerCount = parseWorkerCount(process.env.FUNCTIONAL_TESTS_WORKERS) ?? workerCount;

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
      testEnvironment: `${process.env.TEST_TYPE ?? (process.env.CI ? 'ci' : 'local')} | workers=${reporterWorkerCount}`,
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
      workers: nodeApiWorkerCount,
      use: {
        headless: true,
        screenshot: 'off',
        video: 'off',
        trace: 'off'
      }
    }
  ]
});
