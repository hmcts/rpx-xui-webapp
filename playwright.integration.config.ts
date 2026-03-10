import { defineConfig, devices } from '@playwright/test';
import { version as appVersion } from './package.json';
import {
  resolveAgentHardwareLabel,
  resolveDefaultReporter,
  resolveTagFilters,
  resolveWorkerCount as resolveSharedWorkerCount,
} from './playwright-config-utils';

type EnvMap = NodeJS.ProcessEnv;

const defaultBaseUrl = 'https://manage-case.aat.platform.hmcts.net';
const defaultLiveTimerIntervalMs = '30000';
const defaultIntegrationTagFilterConfigPath = 'playwright_tests_new/integration/tag-filter.json';

const resolveWorkerCount = (env: EnvMap = process.env): number => {
  return resolveSharedWorkerCount({
    env,
    envVarNames: ['PW_INTEGRATION_WORKERS', 'FUNCTIONAL_TESTS_WORKERS'],
  });
};

const resolveIntegrationTagFilters = (env: EnvMap = process.env) =>
  resolveTagFilters({
    env,
    includeTagsEnvVar: 'INTEGRATION_PW_INCLUDE_TAGS',
    excludedTagsEnvVar: 'INTEGRATION_PW_EXCLUDED_TAGS_OVERRIDE',
    configPathEnvVar: 'INTEGRATION_PW_TAG_FILTER_CONFIG',
    defaultConfigPath: defaultIntegrationTagFilterConfigPath,
    suiteTag: '@integration',
  });

const resolveFlag = (rawValue: string | undefined, defaultValue: boolean): boolean => {
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

const resolveAgentHardware = (): string => {
  return resolveAgentHardwareLabel();
};

const resolveOdhinTestOutput = (env: EnvMap = process.env): boolean | 'only-on-failure' => {
  const configured = (env.PW_ODHIN_TEST_OUTPUT ?? 'only-on-failure').trim().toLowerCase();
  if (configured === 'true') {
    return true;
  }
  if (configured === 'false') {
    return false;
  }
  return 'only-on-failure';
};

const buildConfig = (env: EnvMap = process.env) => {
  const headlessMode = env.HEAD !== 'true';
  const odhinOutputFolder = env.PLAYWRIGHT_REPORT_FOLDER ?? 'functional-output/tests/playwright-integration/odhin-report';
  const baseUrl = env.TEST_URL || defaultBaseUrl;
  const workerCount = resolveWorkerCount(env);
  const integrationTagFilters = resolveIntegrationTagFilters(env);
  const enableOdhinReporter = resolveFlag(env.PW_INTEGRATION_ODHIN, true);

  // Local runs: enable periodic progress logs by default so long-running workers are visible.
  if (!env.CI && env.PW_LIVE_TEST_TIMER === undefined) {
    process.env.PW_LIVE_TEST_TIMER = '1';
  }
  if (!env.CI && env.PW_LIVE_TEST_TIMER_INTERVAL_MS === undefined) {
    process.env.PW_LIVE_TEST_TIMER_INTERVAL_MS = defaultLiveTimerIntervalMs;
  }

  const targetEnv = env.TEST_TYPE ?? resolveEnvironmentFromUrl(baseUrl);
  const runContext = env.CI ? 'ci' : 'local-run';
  const testEnvironment = `${targetEnv} | ${runContext} | workers=${workerCount} | ${resolveAgentHardware()}`;
  const reporter: [string, unknown?][] = [[resolveDefaultReporter(env)]];

  if (enableOdhinReporter) {
    reporter.push([
      './playwright_tests_new/common/reporters/odhin-progress.reporter.cjs',
      {
        enabled: true,
        intervalMs: Number.parseInt(env.PW_ODHIN_PROGRESS_INTERVAL_MS ?? '5000', 10) || 5000,
      },
    ]);
    reporter.push([
      './playwright_tests_new/common/reporters/odhin-adaptive.reporter.cjs',
      {
        outputFolder: odhinOutputFolder,
        indexFilename: 'xui-playwright-integration.html',
        title: 'RPX XUI Playwright Integration',
        testEnvironment,
        project: env.PLAYWRIGHT_REPORT_PROJECT ?? 'RPX XUI Webapp',
        release: env.PLAYWRIGHT_REPORT_RELEASE ?? `${appVersion} | branch=${env.GIT_BRANCH ?? 'local'}`,
        startServer: false,
        consoleLog: true,
        consoleError: true,
        testOutput: resolveOdhinTestOutput(env),
      },
    ]);
  }

  return defineConfig({
    testDir: 'playwright_tests_new/integration',
    testMatch: ['**/test/**/*.spec.ts'],
    retries: env.CI ? 1 : 0,
    timeout: 120_000,
    expect: { timeout: 45_000 },
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
};

const config = buildConfig(process.env);

(config as { __test__?: unknown }).__test__ = {
  buildConfig,
  resolveWorkerCount,
};

export default config;
