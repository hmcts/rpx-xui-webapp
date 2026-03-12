/* global __dirname, require, process, URL, module */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { defineConfig, devices } = require('@playwright/test');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { readFileSync } = require('node:fs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { cpus, totalmem } = require('node:os');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('node:path');

const temporaryProbePattern = '**/_tmp_*.spec.ts';
const searchCasePattern = '**/test/searchCase/**/*.spec.ts';
const defaultBaseUrl = 'https://manage-case.aat.platform.hmcts.net';
const defaultLiveTimerIntervalMs = '30000';
const defaultOdhinOutputFolder = 'functional-output/tests/playwright-integration/odhin-report';
const appVersion = (() => {
  try {
    return JSON.parse(readFileSync(path.join(__dirname, 'package.json'), 'utf8')).version ?? 'unknown';
  } catch {
    return 'unknown';
  }
})();

const resolveDefaultReporter = (env = process.env) => {
  const configured = env.PLAYWRIGHT_DEFAULT_REPORTER?.trim();
  if (configured && ['dot', 'list', 'line'].includes(configured)) {
    return configured;
  }
  return env.CI ? 'dot' : 'list';
};

const resolveWorkerCount = (env = process.env) => {
  const configured = env.FUNCTIONAL_TESTS_WORKERS?.trim();
  if (configured) {
    const parsed = Number.parseInt(configured, 10);
    if (Number.isFinite(parsed) && parsed > 0) {
      return parsed;
    }
  }

  if (env.CI) {
    return 8;
  }

  const logical = cpus()?.length ?? 1;
  const approxPhysical = logical <= 2 ? 1 : Math.max(1, Math.round(logical / 2));
  return Math.min(8, Math.max(2, approxPhysical));
};

const resolveBrowserChannel = (env = process.env) => {
  const configured = env.PLAYWRIGHT_BROWSER_CHANNEL;
  if (configured === undefined) {
    return 'chrome';
  }
  const normalized = configured.trim();
  return normalized.length > 0 ? normalized : undefined;
};

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

const resolveAgentHardware = () => {
  try {
    const cpuCores = cpus()?.length ?? 'unknown';
    const totalRamGiB = Math.round((totalmem() / 1024 ** 3) * 10) / 10;
    return `agent_cpu_cores=${cpuCores} | agent_ram_gib=${totalRamGiB}`;
  } catch {
    return 'agent_cpu_cores=unknown | agent_ram_gib=unknown';
  }
};

const resolveOdhinTestOutput = (env = process.env) => {
  const configured = (env.PW_ODHIN_TEST_OUTPUT ?? 'only-on-failure').trim().toLowerCase();
  if (configured === 'true') {
    return true;
  }
  if (configured === 'false') {
    return false;
  }
  return 'only-on-failure';
};

const resolveOdhinLightweight = (env = process.env) => resolveFlag(env.PW_ODHIN_LIGHTWEIGHT, !env.CI);

const resolveOdhinConsoleCapture = (env = process.env) => ({
  consoleLog: resolveFlag(env.PW_ODHIN_CONSOLE_LOG, Boolean(env.CI)),
  consoleError: resolveFlag(env.PW_ODHIN_CONSOLE_ERROR, Boolean(env.CI)),
});

const resolveOdhinProfile = (env = process.env) => resolveFlag(env.PW_ODHIN_PROFILE, true);

const resolveOdhinRuntimeHookTimeoutMs = (env = process.env) => {
  const raw = env.PW_ODHIN_RUNTIME_HOOK_TIMEOUT_MS;
  if (raw !== undefined) {
    const parsed = Number.parseInt(raw, 10);
    if (Number.isFinite(parsed) && parsed >= 0) {
      return parsed;
    }
  }
  return env.CI ? 0 : 15000;
};

const resolveOdhinHardTimeoutMs = (env = process.env) => {
  const raw = env.PW_ODHIN_PROGRESS_HARD_TIMEOUT_MS;
  if (raw !== undefined) {
    const parsed = Number.parseInt(raw, 10);
    if (Number.isFinite(parsed) && parsed >= 0) {
      return parsed;
    }
  }
  return env.CI ? 0 : 30000;
};

const resolveOdhinTimeoutExitCode = (env = process.env) => {
  const raw = env.PW_ODHIN_PROGRESS_TIMEOUT_EXIT_CODE;
  if (raw !== undefined) {
    const parsed = Number.parseInt(raw, 10);
    if (Number.isFinite(parsed) && parsed >= 0) {
      return parsed;
    }
  }
  return 1;
};

const buildConfig = (env = process.env) => {
  const headlessMode = env.HEAD !== 'true';
  const odhinOutputFolder = env.PLAYWRIGHT_REPORT_FOLDER ?? defaultOdhinOutputFolder;
  const baseUrl = env.TEST_URL || defaultBaseUrl;
  const workerCount = resolveWorkerCount(env);
  const browserChannel = resolveBrowserChannel(env);
  const enableOdhinReporter = resolveFlag(env.PW_INTEGRATION_ODHIN, true);
  const targetEnv = env.TEST_TYPE ?? resolveEnvironmentFromUrl(baseUrl);
  const runContext = env.CI ? 'ci' : 'local-run';
  const testEnvironment = `${targetEnv} | ${runContext} | workers=${workerCount} | ${resolveAgentHardware()}`;
  const reporter = [[resolveDefaultReporter(env)]];
  const { consoleLog, consoleError } = resolveOdhinConsoleCapture(env);

  if (!env.CI && env.PW_LIVE_TEST_TIMER === undefined) {
    env.PW_LIVE_TEST_TIMER = '1';
  }
  if (!env.CI && env.PW_LIVE_TEST_TIMER_INTERVAL_MS === undefined) {
    env.PW_LIVE_TEST_TIMER_INTERVAL_MS = defaultLiveTimerIntervalMs;
  }

  if (enableOdhinReporter) {
    reporter.push([
      './playwright_tests_new/common/reporters/odhin-progress.reporter.cjs',
      {
        enabled: true,
        graceMs: Number.parseInt(env.PW_ODHIN_PROGRESS_GRACE_MS ?? '1500', 10) || 1500,
        intervalMs: Number.parseInt(env.PW_ODHIN_PROGRESS_INTERVAL_MS ?? '5000', 10) || 5000,
        hardTimeoutMs: resolveOdhinHardTimeoutMs(env),
        timeoutExitCode: resolveOdhinTimeoutExitCode(env),
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
        consoleLog,
        consoleError,
        testOutput: resolveOdhinTestOutput(env),
        lightweight: resolveOdhinLightweight(env),
        profile: resolveOdhinProfile(env),
        runtimeHookTimeoutMs: resolveOdhinRuntimeHookTimeoutMs(env),
      },
    ]);
  }

  return defineConfig({
    testDir: 'playwright_tests_new/integration',
    testMatch: ['**/test/**/*.spec.ts'],
    testIgnore: [temporaryProbePattern],
    retries: 2,
    timeout: 120_000,
    expect: { timeout: 60_000 },
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
        name: 'chromium-search-case',
        testMatch: [searchCasePattern],
        use: {
          ...devices['Desktop Chrome'],
          ...(browserChannel ? { channel: browserChannel } : {}),
        },
      },
      {
        name: 'chromium',
        testIgnore: [searchCasePattern],
        use: {
          ...devices['Desktop Chrome'],
          ...(browserChannel ? { channel: browserChannel } : {}),
        },
      },
    ],
  });
};

module.exports = {
  buildConfig,
  resolveFlag,
  resolveBrowserChannel,
  resolveEnvironmentFromUrl,
  resolveWorkerCount,
  resolveOdhinTestOutput,
  resolveOdhinLightweight,
  resolveOdhinConsoleCapture,
  resolveOdhinProfile,
  resolveOdhinRuntimeHookTimeoutMs,
  resolveOdhinHardTimeoutMs,
  resolveOdhinTimeoutExitCode,
};
