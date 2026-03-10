import { defineConfig } from '@playwright/test';
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
const defaultApiTagFilterConfigPath = 'playwright_tests_new/api/service-tag-filter.json';

const resolveBaseUrl = (env: EnvMap = process.env) => env.TEST_URL || defaultBaseUrl;

const resolveWorkerCount = (env: EnvMap = process.env) =>
  resolveSharedWorkerCount({
    env,
    envVarNames: ['PW_API_WORKERS', 'FUNCTIONAL_TESTS_WORKERS'],
    max: 4,
  });

const resolveApiRetries = (env: EnvMap = process.env) =>
  parseNonNegativeInt(env.PW_API_RETRIES) ?? parseNonNegativeInt(env.PW_E2E_RETRIES) ?? 2;

const resolveEnvironmentFromUrl = (baseUrl: string): string => {
  try {
    const hostname = new URL(baseUrl).hostname.toLowerCase();
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

const resolveBranchName = (env: EnvMap = process.env): string => {
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

const resolveTestEnvironmentLabel = (env: EnvMap, workerCount: number): string => {
  const targetEnv = env.TEST_TYPE ?? resolveEnvironmentFromUrl(resolveBaseUrl(env));
  const runContext = env.CI ? 'ci' : 'local-run';
  return `${targetEnv} | ${runContext} | workers=${workerCount} | ${resolveAgentHardwareLabel()}`;
};

const resolveApiTagFilters = (env: EnvMap = process.env) =>
  resolveTagFilters({
    env,
    includeTagsEnvVar: 'API_PW_INCLUDE_TAGS',
    excludedTagsEnvVar: 'API_PW_EXCLUDED_TAGS_OVERRIDE',
    configPathEnvVar: 'API_PW_TAG_FILTER_CONFIG',
    defaultConfigPath: defaultApiTagFilterConfigPath,
    suiteTag: '@api',
  });

const buildConfig = (env: EnvMap = process.env) => {
  const workerCount = resolveWorkerCount(env);
  const apiTagFilters = resolveApiTagFilters(env);
  const reportBranch = resolveBranchName(env);

  return defineConfig({
    use: {
      baseURL: resolveBaseUrl(env),
    },
    testDir: 'playwright_tests_new/api',
    testMatch: ['**/*.api.ts'],
    fullyParallel: true,
    forbidOnly: !!env.CI,
    retries: resolveApiRetries(env),
    timeout: 60_000,
    expect: {
      timeout: 10_000,
    },
    reportSlowTests: null,
    workers: workerCount,
    reporter: [
      [resolveDefaultReporter(env)],
      ['./playwright_tests_new/common/reporters/flake-gate.reporter.cjs'],
      [
        'odhin-reports-playwright',
        {
          outputFolder: env.PLAYWRIGHT_REPORT_FOLDER ?? 'functional-output/tests/playwright-api/odhin-report',
          indexFilename: env.PLAYWRIGHT_REPORT_INDEX_FILENAME ?? 'xui-playwright-api.html',
          title: 'RPX XUI Playwright API',
          testEnvironment: resolveTestEnvironmentLabel(env, workerCount),
          project: env.PLAYWRIGHT_REPORT_PROJECT ?? 'RPX XUI Webapp - API',
          release: env.PLAYWRIGHT_REPORT_RELEASE ?? `${appVersion} | branch=${reportBranch}`,
          startServer: false,
          consoleLog: true,
          consoleError: true,
          testOutput: 'only-on-failure',
        },
      ],
    ],
    projects: [
      {
        name: 'node-api',
        grep: apiTagFilters.grep,
        grepInvert: apiTagFilters.grepInvert,
        use: {
          headless: true,
          screenshot: 'off',
          video: 'off',
          trace: 'off',
        },
      },
    ],
  });
};

const config = buildConfig(process.env);

(config as { __test__?: unknown }).__test__ = {
  buildConfig,
  resolveApiRetries,
  resolveApiTagFilters,
  resolveWorkerCount,
};

export default config;
