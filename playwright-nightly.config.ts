import { defineConfig, devices } from '@playwright/test';

import { cpus, totalmem } from 'node:os';
import { version as appVersion } from './package.json';
import { resolveWorkerCount } from './playwright-config-utils';

type EnvMap = NodeJS.ProcessEnv;

const defaultBaseUrl = 'https://manage-case.aat.platform.hmcts.net';

const resolveHeadlessMode = (env: EnvMap = process.env) => env.HEAD !== 'true';
const resolveBaseUrl = (env: EnvMap = process.env) => env.TEST_URL || defaultBaseUrl;
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

const resolveAgentHardware = () => {
  const cpuCores = cpus()?.length ?? 'unknown';
  const totalRamGiB = Math.round((totalmem() / 1024 ** 3) * 10) / 10;
  return `agent_cpu_cores=${cpuCores} | agent_ram_gib=${totalRamGiB}`;
};

const buildConfig = (env: EnvMap = process.env) => {
  const headlessMode = resolveHeadlessMode(env);
  const baseUrl = resolveBaseUrl(env);
  const workerCount = resolveWorkerCount(env);
  const targetEnv = env.TEST_TYPE ?? resolveEnvironmentFromUrl(baseUrl);
  const runContext = env.CI ? 'ci' : 'local-run';
  const testEnvironment = `${targetEnv} | ${runContext} | workers=${workerCount} | ${resolveAgentHardware()}`;

  return defineConfig({
    testDir: 'playwright_tests_new/E2E',
    testMatch: ['**/test/**/*.spec.ts'],
    testIgnore: ['**/test/smoke/smokeTest.spec.ts'],
    use: {
      baseURL: baseUrl,
    },
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!env.CI,
    /* Retry on CI only */
    retries: env.CI ? 1 : 0,

    timeout: 300_000, // 5 minutes per test maximum as on first nightly run tests were taking too long
    expect: {
      timeout: 120_000, // Same reason as above
    },
    reportSlowTests: null,

    /* Control the number of parallel test workers. */
    workers: workerCount,
    globalSetup: require.resolve('./playwright_tests_new/common/playwright.global.setup.ts'),

    reporter: [
      [env.CI ? 'dot' : 'list'],
      [
        'odhin-reports-playwright',
        {
          outputFolder: 'functional-output/tests/playwright-e2e/odhin-report',
          indexFilename: 'xui-playwright-e2e.html',
          title: 'RPX XUI Playwright',
          testEnvironment,
          project: env.PLAYWRIGHT_REPORT_PROJECT ?? 'RPX XUI Webapp',
          release: env.PLAYWRIGHT_REPORT_RELEASE ?? `${appVersion} | branch=${env.GIT_BRANCH ?? 'local'}`,
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
};

const config = buildConfig(process.env);

(config as { __test__?: unknown }).__test__ = {
  buildConfig,
  resolveWorkerCount,
};

module.exports = config;
