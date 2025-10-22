import { defineConfig, devices } from '@playwright/test';

const { cpus } = require('os');
const { version: appVersion } = require('./package.json');

const headlessMode = process.env.HEAD !== 'true';
export const axeTestEnabled = process.env.ENABLE_AXE_TESTS === 'true';

const resolveWorkerCount = () => {
  const configured = process.env.FUNCTIONAL_TESTS_WORKERS;
  if (configured) {
    return parseInt(configured, 10);
  }
  if (process.env.CI) {
    return 1;
  }
  const logical = cpus()?.length ?? 1;
  const approxPhysical = logical <= 2 ? 1 : Math.max(1, Math.round(logical / 2));
  const suggested = Math.min(8, Math.max(2, approxPhysical));
  return suggested;
};
const workerCount = resolveWorkerCount();

module.exports = defineConfig({
  testDir: './playwright_tests/E2E',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 3, // Set the number of retries for all projects

  timeout: 5 * 60 * 1000, // 5 minutes per test maximum as on first nightly run tests were taking too long
  expect: {
    timeout: 2 * 60 * 1000 // Same reason as above
  },
  reportSlowTests: null,

  /* Opt out of parallel tests on CI. */
  workers: workerCount,

  reporter: [
    [process.env.CI ? 'dot' : 'list'],
    ['odhin-reports-playwright', {
      outputFolder: 'functional-output/tests/playwright-e2e/odhin-report',
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
      use: { ...devices['Desktop Chrome'],
        headless: headlessMode,
        trace: 'on-first-retry'
      }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'],
        screenshot: 'only-on-failure',
        headless: headlessMode,
        trace: 'off'
      }
    },
    {
      name: 'webkit',
      use: {
        screenshot: 'only-on-failure',
        headless: headlessMode,
        trace: 'off'
      }
    }
    // {
    //   name: 'MicrosoftEdge',
    //   use: { ...devices['Desktop Edge'],
    //     channel: 'msedge',
    //     screenshot: 'only-on-failure',
    //     headless: headlessMode,
    //     trace: 'off'
    //   }
    // }
  ]
});
