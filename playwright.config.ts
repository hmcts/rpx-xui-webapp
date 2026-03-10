import { defineConfig, devices } from '@playwright/test';
import { execSync } from 'node:child_process';
import { version as appVersion } from './package.json';
import {
  buildTagRegex,
  resolveAgentHardwareLabel,
  resolveDefaultReporter,
  resolveWorkerCount as resolveSharedWorkerCount,
  resolveTagFilters,
} from './playwright-config-utils';

type EnvMap = NodeJS.ProcessEnv;

const defaultBaseUrl = 'https://manage-case.aat.platform.hmcts.net';
const defaultE2ETagFilterConfigPath = 'playwright_tests_new/E2E/tag-filter.json';
const defaultIntegrationTagFilterConfigPath = 'playwright_tests_new/integration/tag-filter.json';

export const axeTestEnabled = process.env.ENABLE_AXE_TESTS === 'true';

const resolveBaseUrl = (env: EnvMap = process.env) => env.TEST_URL || defaultBaseUrl;

const resolveHeadlessMode = (env: EnvMap = process.env) => env.HEAD !== 'true';

const resolveOdhinOutputFolder = (env: EnvMap = process.env) =>
  env.PLAYWRIGHT_REPORT_FOLDER ?? 'functional-output/tests/playwright-e2e/odhin-report';

const resolveOdhinIndexFilename = (env: EnvMap = process.env): string => {
  const configured = env.PLAYWRIGHT_REPORT_INDEX_FILENAME?.trim();
  if (configured) {
    return configured;
  }
  const outputFolder = resolveOdhinOutputFolder(env).toLowerCase();
  if (outputFolder.includes('playwright-api') || outputFolder.includes('api_functional')) {
    return 'xui-playwright-api.html';
  }
  if (outputFolder.includes('playwright-integration')) {
    return 'xui-playwright-integration.html';
  }
  return 'xui-playwright-e2e.html';
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

const resolveWorkerCount = (env: EnvMap = process.env) => {
  return resolveSharedWorkerCount({ env });
};

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

const resolveTestEnvironmentLabel = (env: EnvMap, workerCount: number): string => {
  const targetEnv = env.TEST_TYPE ?? resolveEnvironmentFromUrl(resolveBaseUrl(env));
  const runContext = env.CI ? 'ci' : 'local-run';
  return `${targetEnv} | ${runContext} | workers=${workerCount} | ${resolveAgentHardwareLabel()}`;
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

const resolveIntegrationTagFilters = (env: EnvMap = process.env) =>
  resolveTagFilters({
    env,
    includeTagsEnvVar: 'INTEGRATION_PW_INCLUDE_TAGS',
    excludedTagsEnvVar: 'INTEGRATION_PW_EXCLUDED_TAGS_OVERRIDE',
    configPathEnvVar: 'INTEGRATION_PW_TAG_FILTER_CONFIG',
    defaultConfigPath: defaultIntegrationTagFilterConfigPath,
    suiteTag: '@integration',
  });

const dedupeTags = (...tagGroups: string[][]): string[] => Array.from(new Set(tagGroups.flat()));

const resolveChromiumTagFilters = (env: EnvMap = process.env) => {
  const e2eTagFilters = resolveE2ETagFilters(env);
  const integrationTagFilters = resolveIntegrationTagFilters(env);
  const includeTags = dedupeTags(e2eTagFilters.includeTags, integrationTagFilters.includeTags);
  const excludedTags = dedupeTags(e2eTagFilters.excludedTags, integrationTagFilters.excludedTags);

  return {
    includeTags,
    excludedTags,
    grep: buildTagRegex(includeTags),
    grepInvert: buildTagRegex(excludedTags),
  };
};

const buildConfig = (env: EnvMap = process.env) => {
  const workerCount = resolveWorkerCount(env);
  const headlessMode = resolveHeadlessMode(env);
  const odhinOutputFolder = resolveOdhinOutputFolder(env);
  const reportBranch = resolveBranchName(env);
  const chromiumTagFilters = resolveChromiumTagFilters(env);

  return defineConfig({
    use: {
      baseURL: resolveBaseUrl(env),
    },
    testDir: '.',
    testMatch: [
      'playwright_tests/**/*.test.ts',
      'playwright_tests_new/E2E/**/*.spec.ts',
      'playwright_tests_new/integration/**/*.spec.ts',
    ],
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!env.CI,
    /* Retry failed tests twice in all environments */
    retries: 2, // Set the number of retries for all projects

    timeout: 180_000,
    expect: {
      timeout: 60_000,
    },
    reportSlowTests: null,

    /* Control the number of parallel test workers. */
    workers: workerCount,

    reporter: [
      [resolveDefaultReporter(env)],
      ['./playwright_tests_new/common/reporters/flake-gate.reporter.cjs'],
      [
        'odhin-reports-playwright',
        {
          outputFolder: odhinOutputFolder,
          indexFilename: resolveOdhinIndexFilename(env),
          title: 'RPX XUI Playwright',
          testEnvironment: resolveTestEnvironmentLabel(env, workerCount),
          project: env.PLAYWRIGHT_REPORT_PROJECT ?? 'RPX XUI Webapp',
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
        name: 'chromium',
        testIgnore: ['playwright_tests_new/api/**', 'playwright_tests_new/E2E/test/smoke/smokeTest.spec.ts'],
        grep: chromiumTagFilters.grep,
        grepInvert: chromiumTagFilters.grepInvert,
        use: {
          baseURL: resolveBaseUrl(env),
          ...devices['Desktop Chrome'],
          channel: 'chrome',
          headless: headlessMode,
          trace: 'retain-on-failure',
          screenshot: {
            mode: 'only-on-failure',
            fullPage: true,
          },
          video: 'off',
        },
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
  resolveBaseUrl,
  resolveWorkerCount,
  resolveBranchName,
  resolveE2ETagFilters,
  resolveIntegrationTagFilters,
  resolveChromiumTagFilters,
  resolveDefaultReporter,
  buildConfig,
};

export default config;
