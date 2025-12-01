const { defineConfig, devices } = require('@playwright/test');
const { version: appVersion } = require('./package.json');
const { cpus } = require('os');

const headlessMode = process.env.HEAD !== 'true';
const odhinOutputFolder =
  process.env.PLAYWRIGHT_REPORT_FOLDER ?? 'functional-output/tests/playwright-integration/odhin-report';
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
  testDir: 'playwright_tests_new/integration',
  testMatch: ['**/test/**/*.spec.ts'],
  retries: process.env.CI ? 1 : 0,
  timeout: 120_000,
  expect: { timeout: 30_000 },
  workers: process.env.CI ? 2 : undefined,
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
  globalSetup: require.resolve('./playwright_tests_new/integration/playwright.global.setup.ts'),
  globalTeardown: require.resolve('./playwright_tests_new/integration/playwright.global.teardown.ts'),
  use: {
    baseURL: process.env.TEST_URL || "https://manage-case.aat.platform.hmcts.net",
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: headlessMode
  },
  projects: [
    {
      name: 'chromium',
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
    }
  ]
});
