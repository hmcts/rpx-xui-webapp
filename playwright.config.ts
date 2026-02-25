import { defineConfig, devices } from '@playwright/test';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { cpus } from 'node:os';
import * as path from 'node:path';
import { version as appVersion } from './package.json';
import { parseNonNegativeInt, resolveDefaultReporter } from './playwright-config-utils';

type EnvMap = NodeJS.ProcessEnv;

const defaultBaseUrl = 'https://manage-case.aat.platform.hmcts.net';
const defaultApiTagFilterConfigPath = 'playwright_tests_new/api/service-tag-filter.json';

type ApiTagFilterConfig = {
  excludedTags?: string[];
};

type ApiTagFilters = {
  includeTags: string[];
  excludedTags: string[];
  grep?: RegExp;
  grepInvert?: RegExp;
  excludedTagsSource: 'file' | 'env';
  configPath: string;
};

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

const resolveTestEnvironmentLabel = (env: EnvMap, workerCount: number): string => {
  const targetEnv = env.TEST_TYPE ?? resolveEnvironmentFromUrl(resolveBaseUrl(env));
  const runContext = env.CI ? 'ci' : 'local-run';
  return `${targetEnv} | ${runContext} | workers=${workerCount}`;
};

const ensureTagPrefix = (value: string): string => {
  const normalized = value.trim();
  if (!normalized) {
    return '';
  }
  return normalized.startsWith('@') ? normalized : `@${normalized}`;
};

const splitTagInput = (raw?: string): string[] => {
  if (!raw) {
    return [];
  }
  const seen = new Set<string>();
  const tags: string[] = [];
  for (const token of raw.split(/[\s,]+/)) {
    const tag = ensureTagPrefix(token);
    if (!tag || seen.has(tag)) {
      continue;
    }
    seen.add(tag);
    tags.push(tag);
  }
  return tags;
};

const escapeRegex = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`); // NOSONAR typescript:S5852 — replaceAll requires ES2021; tsconfig targets ES2020

const buildTagRegex = (tags: string[]): RegExp | undefined => {
  if (!tags.length) {
    return undefined;
  }
  return new RegExp(`(${tags.map(escapeRegex).join('|')})`);
};

const resolveApiTagFilterConfigPath = (env: EnvMap): string => {
  const configuredPath = env.API_PW_TAG_FILTER_CONFIG?.trim();
  const candidatePath = configuredPath && configuredPath.length > 0 ? configuredPath : defaultApiTagFilterConfigPath;
  return path.isAbsolute(candidatePath) ? candidatePath : path.resolve(process.cwd(), candidatePath);
};

const readApiTagFilterConfig = (configPath: string): ApiTagFilterConfig => {
  try {
    const raw = readFileSync(configPath, 'utf8');
    const parsed = JSON.parse(raw) as ApiTagFilterConfig;
    if (!parsed || typeof parsed !== 'object') {
      throw new TypeError('Config must be a JSON object');
    }
    if (parsed.excludedTags !== undefined && !Array.isArray(parsed.excludedTags)) {
      throw new TypeError('excludedTags must be an array');
    }
    return parsed;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to read API tag filter config at "${configPath}": ${message}`);
  }
};

const resolveApiTagFilters = (env: EnvMap = process.env): ApiTagFilters => {
  const includeTags = splitTagInput(env.API_PW_INCLUDE_TAGS);
  const overrideExcludedTags = splitTagInput(env.API_PW_EXCLUDED_TAGS_OVERRIDE);
  const configPath = resolveApiTagFilterConfigPath(env);
  const configuredExcludedTags = splitTagInput(readApiTagFilterConfig(configPath).excludedTags?.join(','));
  const excludedTags = overrideExcludedTags.length > 0 ? overrideExcludedTags : configuredExcludedTags;

  return {
    includeTags,
    excludedTags,
    grep: buildTagRegex(includeTags),
    grepInvert: buildTagRegex(excludedTags),
    excludedTagsSource: overrideExcludedTags.length > 0 ? 'env' : 'file',
    configPath,
  };
};

const buildConfig = (env: EnvMap = process.env) => {
  const workerCount = resolveWorkerCount(env);
  const headlessMode = resolveHeadlessMode(env);
  const odhinOutputFolder = resolveOdhinOutputFolder(env);
  const reportBranch = resolveBranchName(env);
  const apiTagFilters = resolveApiTagFilters(env);
  const apiRetries = resolveApiRetries(env);

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

    timeout: 3 * 60 * 1000,
    expect: {
      timeout: 1 * 60 * 1000,
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
      {
        name: 'node-api',
        testMatch: ['playwright_tests_new/api/**/*.api.ts'],
        grep: apiTagFilters.grep,
        grepInvert: apiTagFilters.grepInvert,
        fullyParallel: true,
        workers: env.CI ? 4 : Math.max(1, Math.min(8, cpus()?.length ?? 4)),
        retries: apiRetries,
        timeout: 60 * 1000,
        expect: {
          timeout: 10 * 1000,
        },
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
  resolveBaseUrl,
  resolveWorkerCount,
  resolveBranchName,
  splitTagInput,
  resolveApiTagFilters,
  resolveApiRetries,
  resolveDefaultReporter,
  buildConfig,
};

export default config;
