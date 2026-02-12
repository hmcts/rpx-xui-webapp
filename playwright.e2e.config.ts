module.exports = (() => {
  const { defineConfig, devices } = require('@playwright/test');
  const { version: appVersion } = require('./package.json');
  const { execSync } = require('node:child_process');
  const { cpus } = require('node:os');

  const headlessMode = process.env.HEAD !== 'true';
  const odhinOutputFolder = process.env.PLAYWRIGHT_REPORT_FOLDER ?? 'functional-output/tests/playwright-e2e/odhin-report';
  process.env.PLAYWRIGHT_REPORT_FOLDER = process.env.PLAYWRIGHT_REPORT_FOLDER ?? odhinOutputFolder;
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
    testDir: 'playwright_tests_new/E2E',
    testMatch: ['**/test/**/*.spec.ts'],
    testIgnore: ['**/test/smoke/smokeTest.spec.ts'],
    fullyParallel: true,
    retries: 2,
    timeout: 3 * 60 * 1000,
    expect: {
      timeout: 1 * 60 * 1000,
    },
    workers: workerCount,
    reporter: [
      [process.env.CI ? 'dot' : 'list'],
      ['./playwright_tests_new/common/reporters/flake-gate.reporter.cjs'],
      [
        'odhin-reports-playwright',
        {
          outputFolder: odhinOutputFolder,
          indexFilename: 'xui-playwright.html',
          title: 'RPX XUI Playwright E2E',
          testEnvironment,
          project: process.env.PLAYWRIGHT_REPORT_PROJECT ?? 'RPX XUI Webapp - E2E',
          release: process.env.PLAYWRIGHT_REPORT_RELEASE ?? `${appVersion} | branch=${reportBranch}`,
          startServer: false,
          consoleLog: true,
          consoleError: true,
          testOutput: 'only-on-failure',
        },
      ],
      ['./playwright_tests_new/common/reporters/odhin-postprocess.reporter.cjs'],
    ],
    use: {
      baseURL: baseUrl,
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
