import { defineConfig, devices } from '@playwright/test';
import { execSync } from 'node:child_process';
import { cpus, totalmem } from 'node:os';
import { version as appVersion } from './package.json';
import {
  logResolvedTagFilters,
  parseNonNegativeInt,
  resolveDefaultReporter,
  resolveTagFilters,
  resolveWorkerCount,
} from './playwright-config-utils';

type EnvMap = NodeJS.ProcessEnv;

const resolveOdhinIndexFilename = (env: EnvMap = process.env): string =>
  env.PLAYWRIGHT_REPORT_INDEX_FILENAME?.trim() || 'xui-playwright-e2e.html';

const resolveOdhinTitle = (env: EnvMap = process.env): string => {
  const configured = env.PW_ODHIN_TITLE?.trim();
  if (configured) {
    return configured;
  }
  return env.PLAYWRIGHT_INCLUDE_A11Y === 'true' ? 'RPX-XUI-WEBAPP Accessibility' : 'RPX-XUI-WEBAPP Playwright E2E';
};

const buildConfig = (env: EnvMap = process.env) => {
  const temporaryProbePattern = '**/_tmp_*.spec.ts';
  const headlessMode = env.HEAD !== 'true';
  const odhinOutputFolder = env.PLAYWRIGHT_REPORT_FOLDER ?? 'functional-output/tests/playwright-e2e/odhin-report';
  const baseUrl = env.TEST_URL || 'https://manage-case.aat.platform.hmcts.net';
  const e2eTagFilters = resolveTagFilters({
    env,
    includeTagsEnvVar: 'E2E_PW_INCLUDE_TAGS',
    excludedTagsEnvVar: 'E2E_PW_EXCLUDED_TAGS_OVERRIDE',
    configPathEnvVar: 'E2E_PW_TAG_FILTER_CONFIG',
    defaultConfigPath: 'playwright_tests_new/E2E/tag-filter.json',
    suiteTag: '@e2e',
    globalExcludedTagsEnvVar: 'PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS',
    ignoreGlobalExcludesEnvVar: 'PLAYWRIGHT_IGNORE_GLOBAL_EXCLUDES',
    globalExcludedTagsPattern: /^@e2e(?:-.+)?$/,
  });
  logResolvedTagFilters('E2E', e2eTagFilters, env);

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
  const isAccessibilityRun = env.PLAYWRIGHT_INCLUDE_A11Y === 'true';
  const prewarmAccessibilitySession = isAccessibilityRun && env.PW_A11Y_PREWARM_SESSION !== 'false';
  const testTimeoutMs = isAccessibilityRun ? (parsePositiveInt(env.PW_A11Y_TEST_TIMEOUT_MS) ?? 60_000) : 180_000;
  const expectTimeoutMs = isAccessibilityRun ? (parsePositiveInt(env.PW_A11Y_EXPECT_TIMEOUT_MS) ?? 7_000) : 60_000;

  const resolveEnvironmentFromUrl = (url: string) => {
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
  const resolveAgentHardware = () => {
    const cpuCores = cpus()?.length ?? 'unknown';
    const totalRamGiB = Math.round((totalmem() / 1024 ** 3) * 10) / 10;
    return `agent_cpu_cores=${cpuCores} | agent_ram_gib=${totalRamGiB}`;
  };
  const targetEnv = env.TEST_TYPE ?? resolveEnvironmentFromUrl(baseUrl);
  const runContext = env.CI ? 'ci' : 'local-run';
  const testEnvironment = `${targetEnv} | ${runContext} | workers=${workerCount} | ${resolveAgentHardware()}`;
  const reportBranch = resolveBranchName();

  return defineConfig({
    testDir: 'playwright_tests_new/E2E',
    testMatch: ['**/test/**/*.spec.ts'],
    testIgnore:
      env.PLAYWRIGHT_INCLUDE_A11Y === 'true'
        ? [temporaryProbePattern, '**/test/smoke/smokeTest.spec.ts']
        : [temporaryProbePattern, '**/test/smoke/smokeTest.spec.ts', '**/*.a11y.spec.ts'],
    ...(prewarmAccessibilitySession ? { globalSetup: './playwright_tests_new/E2E/setup/a11ySession.global-setup.ts' } : {}),
    fullyParallel: true,
    retries,
    timeout: testTimeoutMs,
    expect: {
      timeout: expectTimeoutMs,
    },
    ...(globalTimeoutMs ? { globalTimeout: globalTimeoutMs } : {}),
    workers: workerCount,
    reporter: [
      [resolveDefaultReporter(env)],
      ['./playwright_tests_new/common/reporters/flake-gate.reporter.cjs'],
      [
        './playwright_tests_new/common/reporters/odhin-adaptive.reporter.cjs',
        {
          outputFolder: odhinOutputFolder,
          indexFilename: resolveOdhinIndexFilename(env),
          title: resolveOdhinTitle(env),
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
  resolveOdhinIndexFilename,
  resolveOdhinTitle,
  resolveWorkerCount,
};

export default config;
