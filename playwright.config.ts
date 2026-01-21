import { defineConfig, devices } from '@playwright/test';

const { cpus } = require('node:os');
const { version: appVersion } = require('./package.json');

type EnvMap = NodeJS.ProcessEnv;

const defaultBaseUrl = 'https://manage-case.aat.platform.hmcts.net';

export const axeTestEnabled = process.env.ENABLE_AXE_TESTS === 'true';

const resolveBaseUrl = (env: EnvMap = process.env) => env.TEST_URL || defaultBaseUrl;

const resolveHeadlessMode = (env: EnvMap = process.env) => env.HEAD !== 'true';

const resolveOdhinOutputFolder = (env: EnvMap = process.env) =>
  env.PLAYWRIGHT_REPORT_FOLDER ?? 'functional-output/tests/playwright-e2e/odhin-report';

const resolveWorkerCount = (env: EnvMap = process.env) => {
  // CI should always run with 8 workers for predictable parallelism.
  // (Playwright CLI flags can still override this, but our config default is fixed.)
  if (env.CI) {
    return 8;
  }

  const configured = env.FUNCTIONAL_TESTS_WORKERS;
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

const buildConfig = (env: EnvMap = process.env) => {
  const workerCount = resolveWorkerCount(env);
  const headlessMode = resolveHeadlessMode(env);
  const odhinOutputFolder = resolveOdhinOutputFolder(env);

  return defineConfig({
    use: {
      baseURL: resolveBaseUrl(env)
    },
    testDir: '.',
    testMatch: [
      'playwright_tests/**/*.test.ts',
      'playwright_tests_new/E2E/**/*.spec.ts',
      'playwright_tests_new/integration/**/*.spec.ts'
    ],
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!env.CI,
    /* Retry on CI only */
    retries: 1, // Set the number of retries for all projects

    timeout: 3 * 60 * 1000,
    expect: {
      timeout: 1 * 60 * 1000
    },
    reportSlowTests: null,

    /* Control the number of parallel test workers. */
    workers: workerCount,

    reporter: [
      [env.CI ? 'dot' : 'list'],
      ['odhin-reports-playwright', {
        outputFolder: odhinOutputFolder,
        indexFilename: 'xui-playwright.html',
        title: 'RPX XUI Playwright',
        testEnvironment: `${env.TEST_TYPE ?? (env.CI ? 'ci' : 'local')} | workers=${workerCount}`,
        project: env.PLAYWRIGHT_REPORT_PROJECT ?? 'RPX XUI Webapp',
        release: env.PLAYWRIGHT_REPORT_RELEASE ?? `${appVersion} | branch=${env.GIT_BRANCH ?? 'local'}`,
        startServer: false,
        consoleLog: true,
        consoleError: true,
        testOutput: 'only-on-failure'
      }]
    ],

    projects: [
      {
        name: 'chromium',
        testIgnore: [
          'playwright_tests_new/api/**',
          'playwright_tests_new/E2E/test/smoke/smokeTest.spec.ts'
        ],
        use: {
          baseURL: resolveBaseUrl(env),
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
        name: 'smoke',
        testMatch: ['playwright_tests_new/E2E/test/smoke/smokeTest.spec.ts'],
        use: {
          baseURL: resolveBaseUrl(env),
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
        testMatch: ['playwright_tests_new/api/**/*.api.ts'],
        fullyParallel: true,
        workers: env.CI ? 8 : Math.min(8, cpus()?.length ?? 4),
        retries: 0,
        timeout: 60 * 1000,
        expect: {
          timeout: 10 * 1000
        },
        use: {
          headless: true,
          screenshot: 'off',
          video: 'off',
          trace: 'off'
        }
      }
    ]
  });
};

const config = buildConfig(process.env);

(config as { __test__?: unknown }).__test__ = {
  resolveBaseUrl,
  resolveWorkerCount,
  buildConfig
};

module.exports = config;
