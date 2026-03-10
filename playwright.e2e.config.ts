import { defineConfig, devices } from '@playwright/test';
import { execSync } from 'node:child_process';
import { version as appVersion } from './package.json';
import {
  parseNonNegativeInt,
  resolveAgentHardwareLabel,
  resolveDefaultReporter,
  resolveTagFilters,
  resolveWorkerCount as resolveSharedWorkerCount,
} from './playwright-config-utils';

type EnvMap = NodeJS.ProcessEnv;

const defaultBaseUrl = 'https://manage-case.aat.platform.hmcts.net';
const defaultE2ETagFilterConfigPath = 'playwright_tests_new/E2E/tag-filter.json';

const resolveWorkerCount = (env: EnvMap = process.env): number => {
  return resolveSharedWorkerCount({
    env,
    envVarNames: ['PW_E2E_WORKERS', 'FUNCTIONAL_TESTS_WORKERS'],
  });
};

const resolveE2ETagFilters = (env: EnvMap = process.env) =>
  resolveTagFilters({
    env,
    includeTagsEnvVar: 'E2E_PW_INCLUDE_TAGS',
    excludedTagsEnvVar: 'E2E_PW_EXCLUDED_TAGS_OVERRIDE',
    configPathEnvVar: 'E2E_PW_TAG_FILTER_CONFIG',
    defaultConfigPath: defaultE2ETagFilterConfigPath,
    suiteTag: '@e2e',
  });

const buildConfig = (env: EnvMap = process.env) => {
  const headlessMode = env.HEAD !== 'true';
  const odhinOutputFolder = env.PLAYWRIGHT_REPORT_FOLDER ?? 'functional-output/tests/playwright-e2e/odhin-report';
  const baseUrl = env.TEST_URL || defaultBaseUrl;

  const parsePositiveInt = (raw: string | undefined): number | undefined => {
    if (!raw) {
      return undefined;
    }
    const parsed = Number.parseInt(raw, 10);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return undefined;
    }
    return parsed;
  };

  const retries = parseNonNegativeInt(env.PW_E2E_RETRIES) ?? 2;
  const globalTimeoutMs = parsePositiveInt(env.PW_E2E_GLOBAL_TIMEOUT_MS);
  const e2eTagFilters = resolveE2ETagFilters(env);

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
      env.PLAYWRIGHT_REPORT_BRANCH ||
      env.GIT_BRANCH ||
      env.BRANCH_NAME ||
      env.GITHUB_REF_NAME ||
      env.GITHUB_HEAD_REF ||
      env.BUILD_SOURCEBRANCHNAME;
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

  const workerCount = resolveWorkerCount(env);
  const targetEnv = env.TEST_TYPE ?? resolveEnvironmentFromUrl(baseUrl);
  const runContext = env.CI ? 'ci' : 'local-run';
  const testEnvironment = `${targetEnv} | ${runContext} | workers=${workerCount} | ${resolveAgentHardwareLabel()}`;
  const reportBranch = resolveBranchName();

  return defineConfig({
    testDir: 'playwright_tests_new/E2E',
    testMatch: ['**/test/**/*.spec.ts'],
    testIgnore: ['**/test/smoke/smokeTest.spec.ts'],
    fullyParallel: true,
    retries,
    timeout: 180_000,
    expect: {
      timeout: 60_000,
    },
    ...(globalTimeoutMs ? { globalTimeout: globalTimeoutMs } : {}),
    workers: workerCount,
    reporter: [
      [resolveDefaultReporter(env)],
      ['./playwright_tests_new/common/reporters/flake-gate.reporter.cjs'],
      [
        'odhin-reports-playwright',
        {
          outputFolder: odhinOutputFolder,
          indexFilename: 'xui-playwright-e2e.html',
          title: 'RPX-XUI-WEBAPP Playwright E2E',
          testEnvironment,
          project: env.PLAYWRIGHT_REPORT_PROJECT ?? 'RPX XUI Webapp - E2E',
          release: env.PLAYWRIGHT_REPORT_RELEASE ?? `${appVersion} | branch=${reportBranch}`,
          startServer: false,
          consoleLog: true,
          consoleError: true,
          testOutput: 'only-on-failure',
        },
      ],
    ],
    use: {
      baseURL: baseUrl,
      trace: 'retain-on-failure',
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
        grep: e2eTagFilters.grep,
        grepInvert: e2eTagFilters.grepInvert,
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
