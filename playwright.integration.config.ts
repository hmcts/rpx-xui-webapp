import { defineConfig, devices } from '@playwright/test';
import { execSync } from 'node:child_process';
import { cpus } from 'node:os';
import { version as appVersion } from './package.json';
export default (() => {
  const headlessMode = process.env.HEAD !== 'true';
  const odhinOutputFolder = process.env.PLAYWRIGHT_REPORT_FOLDER ?? 'functional-output/tests/playwright-integration/odhin-report';
  const baseUrl = process.env.TEST_URL || 'https://manage-case.aat.platform.hmcts.net';

  const resolveEnvironmentFromUrl = (url) => {
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

  const resolveBranchName = () => {
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
  const targetEnv = process.env.TEST_TYPE ?? resolveEnvironmentFromUrl(baseUrl);
  const runContext = process.env.CI ? 'ci' : 'local-run';
  const testEnvironment = `${targetEnv} | ${runContext} | workers=${workerCount}`;
  const reportBranch = resolveBranchName();

  return defineConfig({
    testDir: 'playwright_tests_new/integration',
    testMatch: ['**/test/**/*.spec.ts'],
    retries: 2,
    timeout: 120_000,
    expect: { timeout: 45_000 },
    workers: workerCount,
    reporter: [
      [process.env.CI ? 'dot' : 'list'],
      ['./playwright_tests_new/common/reporters/flake-gate.reporter.cjs'],
      [
        'odhin-reports-playwright',
        {
          outputFolder: odhinOutputFolder,
          indexFilename: 'xui-playwright.html',
          title: 'RPX XUI Playwright Integration',
          testEnvironment,
          project: process.env.PLAYWRIGHT_REPORT_PROJECT ?? 'RPX XUI Webapp',
          release: process.env.PLAYWRIGHT_REPORT_RELEASE ?? `${appVersion} | branch=${reportBranch}`,
          startServer: false,
          consoleLog: true,
          consoleError: true,
          testOutput: 'only-on-failure',
        },
      ],
    ],
    globalSetup: new URL('./playwright_tests_new/common/playwright.global.setup.ts', import.meta.url).pathname,
    use: {
      baseURL: baseUrl,
      trace: 'on-first-retry',
      screenshot: 'only-on-failure',
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
