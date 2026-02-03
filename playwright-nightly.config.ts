import { defineConfig, devices } from '@playwright/test';

import { cpus } from 'node:os';
import { version as appVersion } from './package.json';

const headlessMode = process.env.HEAD !== 'true';
export const axeTestEnabled = process.env.ENABLE_AXE_TESTS === 'true';

const resolveWorkerCount = () => {
  const configured = process.env.FUNCTIONAL_TESTS_WORKERS;
  if (process.env.CI) {
    return 8;
  }
  if (configured) {
    const parsed = Number.parseInt(configured, 10);
    if (Number.isFinite(parsed) && parsed > 0) {
      return parsed;
    }
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
  retries: 1, // Set the number of retries for all projects

  timeout: 5 * 60 * 1000, // 5 minutes per test maximum as on first nightly run tests were taking too long
  expect: {
    timeout: 2 * 60 * 1000, // Same reason as above
  },
  reportSlowTests: null,

  /* Control the number of parallel test workers. */
  workers: workerCount,
  globalSetup: require.resolve('./playwright_tests_new/common/playwright.global.setup.ts'),

  reporter: [
    [process.env.CI ? 'dot' : 'list'],
    [
      'odhin-reports-playwright',
      {
        outputFolder: 'functional-output/tests/playwright-e2e/odhin-report',
        indexFilename: 'xui-playwright.html',
        title: 'RPX XUI Playwright',
        testEnvironment: `${process.env.TEST_TYPE ?? (process.env.CI ? 'ci' : 'local')} | workers=${workerCount}`,
        project: process.env.PLAYWRIGHT_REPORT_PROJECT ?? 'RPX XUI Webapp',
        release: process.env.PLAYWRIGHT_REPORT_RELEASE ?? `${appVersion} | branch=${process.env.GIT_BRANCH ?? 'local'}`,
        startServer: false,
        consoleLog: true,
        consoleError: true,
        testOutput: 'only-on-failure',
      },
    ],
  ],

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: headlessMode,
        trace: 'on-first-retry',
        screenshot: {
          mode: 'only-on-failure',
          fullPage: true,
        },
        video: 'retain-on-failure',
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        headless: headlessMode,
        trace: 'on-first-retry',
        screenshot: {
          mode: 'only-on-failure',
          fullPage: true,
        },
        video: 'retain-on-failure',
      },
    },
    {
      name: 'webkit',
      use: {
        headless: headlessMode,
        trace: 'on-first-retry',
        screenshot: {
          mode: 'only-on-failure',
          fullPage: true,
        },
        video: 'retain-on-failure',
      },
    },
    // {
    //   name: 'MicrosoftEdge',
    //   use: { ...devices['Desktop Edge'],
    //     channel: 'msedge',
    //     screenshot: 'only-on-failure',
    //     headless: headlessMode,
    //     trace: 'off'
    //   }
    // }
  ],
});
