module.exports = (() => {
  const { defineConfig, devices } = require('@playwright/test');
  const os = require('os');
  const { version: appVersion } = require('./package.json');
  const { resolveDefaultReporter, resolveTagFilters } = require('./playwright-config-utils');

  const headlessMode = process.env.HEAD !== 'true';
  const odhinOutputFolder = process.env.PLAYWRIGHT_REPORT_FOLDER ?? 'functional-output/tests/playwright-integration/odhin-report';
  const baseUrl = process.env.TEST_URL || 'https://manage-case.aat.platform.hmcts.net';
  const integrationTagFilters = resolveTagFilters({
    includeTagsEnvVar: 'INTEGRATION_PW_INCLUDE_TAGS',
    excludedTagsEnvVar: 'INTEGRATION_PW_EXCLUDED_TAGS_OVERRIDE',
    configPathEnvVar: 'INTEGRATION_PW_TAG_FILTER_CONFIG',
    defaultConfigPath: 'playwright_tests_new/integration/tag-filter.json',
    suiteTag: '@integration',
  });
  const defaultLiveTimerIntervalMs = '30000';
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
  const resolveWorkerCount = () => {
    const configured = process.env.FUNCTIONAL_TESTS_WORKERS;
    if (configured) {
      const parsed = Number.parseInt(configured, 10);
      if (Number.isFinite(parsed) && parsed > 0) {
        return parsed;
      }
    }
    if (process.env.CI) {
      return 8;
    }
    const logical = os.cpus()?.length ?? 1;
    const approxPhysical = logical <= 2 ? 1 : Math.max(1, Math.round(logical / 2));
    const suggested = Math.min(8, Math.max(2, approxPhysical));
    return suggested;
  };
  const workerCount = resolveWorkerCount();
  const resolveFlag = (rawValue, defaultValue) => {
    if (rawValue === undefined) {
      return defaultValue;
    }
    const normalized = String(rawValue).trim().toLowerCase();
    if (['1', 'true', 'yes', 'on'].includes(normalized)) {
      return true;
    }
    if (['0', 'false', 'no', 'off'].includes(normalized)) {
      return false;
    }
    return defaultValue;
  };
  const enableOdhinReporter = resolveFlag(process.env.PW_INTEGRATION_ODHIN, true);
  const resolveAgentHardware = () => {
    try {
      const cpuCores = os.cpus()?.length ?? 'unknown';
      const totalRamGiB = Math.round((os.totalmem() / 1024 ** 3) * 10) / 10;
      return `agent_cpu_cores=${cpuCores} | agent_ram_gib=${totalRamGiB}`;
    } catch {
      return 'agent_cpu_cores=unknown | agent_ram_gib=unknown';
    }
  };
  const resolveOdhinTestOutput = () => {
    const configured = (process.env.PW_ODHIN_TEST_OUTPUT ?? 'only-on-failure').trim().toLowerCase();
    if (configured === 'true') {
      return true;
    }
    if (configured === 'false') {
      return false;
    }
    return 'only-on-failure';
  };

  // Local runs: enable periodic progress logs by default so long-running workers are visible.
  if (!process.env.CI && process.env.PW_LIVE_TEST_TIMER === undefined) {
    process.env.PW_LIVE_TEST_TIMER = '1';
  }
  if (!process.env.CI && process.env.PW_LIVE_TEST_TIMER_INTERVAL_MS === undefined) {
    process.env.PW_LIVE_TEST_TIMER_INTERVAL_MS = defaultLiveTimerIntervalMs;
  }

  const targetEnv = process.env.TEST_TYPE ?? resolveEnvironmentFromUrl(baseUrl);
  const runContext = process.env.CI ? 'ci' : 'local-run';
  const testEnvironment = `${targetEnv} | ${runContext} | workers=${workerCount} | ${resolveAgentHardware()}`;
  const reporter: [string, unknown?][] = [[resolveDefaultReporter(process.env)]];
  if (enableOdhinReporter) {
    reporter.push([
      './playwright_tests_new/common/reporters/odhin-progress.reporter.cjs',
      {
        enabled: true,
        intervalMs: Number.parseInt(process.env.PW_ODHIN_PROGRESS_INTERVAL_MS ?? '5000', 10) || 5000,
      },
    ]);
    reporter.push([
      './playwright_tests_new/common/reporters/odhin-adaptive.reporter.cjs',
      {
        outputFolder: odhinOutputFolder,
        indexFilename: 'xui-playwright-integration.html',
        title: 'RPX XUI Playwright Integration',
        testEnvironment,
        project: process.env.PLAYWRIGHT_REPORT_PROJECT ?? 'RPX XUI Webapp',
        release: process.env.PLAYWRIGHT_REPORT_RELEASE ?? `${appVersion} | branch=${process.env.GIT_BRANCH ?? 'local'}`,
        startServer: false,
        consoleLog: true,
        consoleError: true,
        testOutput: resolveOdhinTestOutput(),
      },
    ]);
  }

  return defineConfig({
    testDir: 'playwright_tests_new/integration',
    testMatch: ['**/test/**/*.spec.ts'],
    retries: process.env.CI ? 1 : 0,
    timeout: 120_000,
    expect: {
      timeout: 60_000,
    },
    workers: workerCount,
    reporter,
    globalSetup: require.resolve('./playwright_tests_new/common/playwright.global.setup.ts'),
    use: {
      baseURL: baseUrl,
      trace: 'on-first-retry',
      screenshot: {
        mode: 'only-on-failure',
        fullPage: true,
      },
      video: 'off',
      timezoneId: 'Europe/London',
      headless: headlessMode,
    },
    projects: [
      {
        name: 'chromium',
        grep: integrationTagFilters.grep,
        grepInvert: integrationTagFilters.grepInvert,
        use: {
          ...devices['Desktop Chrome'],
          channel: 'chrome',
        },
      },
    ],
  });
})();
