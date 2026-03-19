import { defineConfig, devices } from '@playwright/test';

import { cpus, totalmem } from 'node:os';
import { version as appVersion } from './package.json';
import { resolveWorkerCount } from './playwright-config-utils';

const headlessMode = process.env.HEAD !== 'true';
const baseUrl = process.env.TEST_URL || 'https://manage-case.aat.platform.hmcts.net';
export const axeTestEnabled = process.env.ENABLE_AXE_TESTS === 'true';

const resolveEnvironmentFromUrl = (url: string): string => {
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'local';
    }
    if (hostname.includes('.aat.')) {
      return 'aat';
    }
    if (hostname.includes('.ithc.')) {
      return 'ithc';
    }
    if (hostname.includes('.demo.')) {
      return 'demo';
    }
    if (hostname.includes('.perftest.')) {
      return 'perftest';
    }
    return hostname;
  } catch {
    return 'unknown';
  }
};

const workerCount = resolveWorkerCount(process.env);
const resolveAgentHardware = () => {
  const cpuCores = cpus()?.length ?? 'unknown';
  const totalRamGiB = Math.round((totalmem() / 1024 ** 3) * 10) / 10;
  return `agent_cpu_cores=${cpuCores} | agent_ram_gib=${totalRamGiB}`;
};
const targetEnv = process.env.TEST_TYPE ?? resolveEnvironmentFromUrl(baseUrl);
const runContext = process.env.CI ? 'ci' : 'local-run';
const testEnvironment = `${targetEnv} | ${runContext} | workers=${workerCount} | ${resolveAgentHardware()}`;

module.exports = defineConfig({
  testDir: 'playwright_tests_new/E2E',
  testMatch: ['**/test/**/*.spec.ts'],
  testIgnore: ['**/test/smoke/smokeTest.spec.ts'],
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,

  timeout: 300_000, // 5 minutes per test maximum as on first nightly run tests were taking too long
  expect: {
    timeout: 120_000, // Same reason as above
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
        indexFilename: 'xui-playwright-e2e.html',
        title: 'RPX XUI Playwright',
        testEnvironment,
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
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        headless: headlessMode,
        trace: 'on-first-retry',
        screenshot: {
          mode: 'only-on-failure',
          fullPage: true,
        },
        video: 'off',
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
        video: 'off',
      },
    },
  ],
});
