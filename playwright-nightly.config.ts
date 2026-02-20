import { defineConfig, devices } from '@playwright/test';

import { execSync } from 'node:child_process';
import { cpus } from 'node:os';
import { version as appVersion } from './package.json';

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

const resolveBranchName = (): string => {
  const envBranch =
    process.env.PLAYWRIGHT_REPORT_BRANCH ||
    process.env.GIT_BRANCH ||
    process.env.BRANCH_NAME ||
    process.env.GITHUB_REF_NAME ||
    process.env.GITHUB_HEAD_REF ||
    process.env.BUILD_SOURCEBRANCHNAME;
  if (envBranch) {
    return envBranch.replace(/^refs\/heads\//, '').trim();
  }
  try {
    const gitBranch = execSync('git rev-parse --abbrev-ref HEAD', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .trim()
      .replace(/^refs\/heads\//, '');
    if (gitBranch && gitBranch !== 'HEAD') {
      return gitBranch;
    }
  } catch {
    // Fall back to local label when branch cannot be resolved.
  }
  return 'local';
};
const workerCount = resolveWorkerCount();
const reportBranch = resolveBranchName();
const targetEnv = process.env.TEST_TYPE ?? resolveEnvironmentFromUrl(baseUrl);
const runContext = process.env.CI ? 'ci' : 'local-run';
const testEnvironment = `${targetEnv} | ${runContext} | workers=${workerCount}`;
const odhinOutputFolder = process.env.PLAYWRIGHT_REPORT_FOLDER ?? 'functional-output/tests/playwright-e2e/odhin-report';
process.env.PLAYWRIGHT_REPORT_FOLDER = process.env.PLAYWRIGHT_REPORT_FOLDER ?? odhinOutputFolder;

module.exports = defineConfig({
  testDir: './playwright_tests/E2E',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry failed tests twice in all environments */
  retries: 2, // Set the number of retries for all projects

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
        outputFolder: odhinOutputFolder,
        indexFilename: 'xui-playwright.html',
        title: 'RPX XUI Playwright',
        testEnvironment,
        project: process.env.PLAYWRIGHT_REPORT_PROJECT ?? 'RPX XUI Webapp',
        release: process.env.PLAYWRIGHT_REPORT_RELEASE ?? `${appVersion} | branch=${reportBranch}`,
        startServer: false,
        consoleLog: true,
        consoleError: true,
        testOutput: 'only-on-failure',
      },
    ],
    ['./playwright_tests_new/common/reporters/odhin-postprocess.reporter.cjs'],
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
        video: 'off',
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
