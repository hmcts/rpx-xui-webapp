module.exports = (() => {
  const { defineConfig, devices } = require('@playwright/test');
  const { version: appVersion } = require('./package.json');
  const { cpus } = require('node:os');

  const headlessMode = process.env.HEAD !== 'true';
  const odhinOutputFolder = process.env.PLAYWRIGHT_REPORT_FOLDER ?? 'functional-output/tests/playwright-e2e/odhin-report';

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

  return defineConfig({
  testDir: 'playwright_tests_new/E2E',
  testMatch: ['**/test/**/*.spec.ts'],
  testIgnore: ['**/test/smoke/smokeTest.spec.ts'],
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  timeout: 3 * 60 * 1000,
  expect: {
    timeout: 1 * 60 * 1000,
  },
  workers: workerCount,
  reporter: [
    [process.env.CI ? 'dot' : 'list'],
    [
      'odhin-reports-playwright',
      {
        outputFolder: odhinOutputFolder,
        indexFilename: 'xui-playwright.html',
        title: 'RPX XUI Playwright E2E',
        testEnvironment: `${process.env.TEST_TYPE ?? (process.env.CI ? 'ci' : 'local')} | workers=${workerCount}`,
        project: process.env.PLAYWRIGHT_REPORT_PROJECT ?? 'RPX XUI Webapp - E2E',
        release: process.env.PLAYWRIGHT_REPORT_RELEASE ?? `${appVersion} | branch=${process.env.GIT_BRANCH ?? 'local'}`,
        startServer: false,
        consoleLog: true,
        consoleError: true,
        testOutput: 'only-on-failure',
      },
    ],
  ],
  use: {
    baseURL: process.env.TEST_URL || 'https://manage-case.aat.platform.hmcts.net',
    trace: 'retain-on-failure',
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true,
    },
    video: 'retain-on-failure',
    headless: headlessMode,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
  ],
  });
})();
