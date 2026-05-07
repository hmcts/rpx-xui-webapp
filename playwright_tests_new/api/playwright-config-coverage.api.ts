import { test, expect } from '@playwright/test';
import { createRequire } from 'node:module';

import {
  loadConfig,
  loadConfigAt,
  resolveConfigModule,
  type EnvMap,
  type TestableConfigModule,
} from './utils/playwrightConfigUtils';
import * as playwrightConfigUtils from '../../playwright-config-utils';

const require = createRequire(import.meta.url);
const integrationConfigSupport = require('../../playwright.integration.config.support.cjs') as {
  resolveOdhinConsoleCapture: (env: EnvMap) => { consoleLog: boolean; consoleError: boolean };
  resolveOdhinForceExitOnCompletion: (env: EnvMap) => boolean;
  resolveOdhinHardTimeoutMs: (env: EnvMap) => number;
  resolveOdhinLightweight: (env: EnvMap) => boolean;
  resolveOdhinRuntimeHookTimeoutMs: (env: EnvMap) => number;
};
const smokeRunner = require('../../scripts/run-playwright-smoke.cjs') as {
  buildSmokePlaywrightArgs: (env: EnvMap, extraArgs?: string[]) => string[];
};

const { resolveTagFilters } = playwrightConfigUtils;
const {
  resolveOdhinConsoleCapture,
  resolveOdhinForceExitOnCompletion,
  resolveOdhinHardTimeoutMs,
  resolveOdhinLightweight,
  resolveOdhinRuntimeHookTimeoutMs,
} = integrationConfigSupport;

let configModule: TestableConfigModule;
let integrationConfigModule: TestableConfigModule;
let nightlyConfigModule: TestableConfigModule;

const buildConfig = (env: EnvMap) => configModule.__test__.buildConfig(env);
const resolveWorkerCount = (env: EnvMap) => configModule.__test__.resolveWorkerCount(env);
const resolveApiProjectWorkerCount = (env: EnvMap) =>
  (
    configModule.__test__ as TestableConfigModule['__test__'] & { resolveApiProjectWorkerCount: (env: EnvMap) => number }
  ).resolveApiProjectWorkerCount(env);
const resolveApiTagFilters = (env: EnvMap) =>
  (
    configModule.__test__ as TestableConfigModule['__test__'] & { resolveApiTagFilters: (env: EnvMap) => unknown }
  ).resolveApiTagFilters(env) as {
    excludedTags: string[];
    globalExcludedTags: string[];
    ignoredGlobalExcludedTags: string[];
    grep?: RegExp;
    grepInvert?: RegExp;
  };
const resolveE2eTagFilters = (env: EnvMap) =>
  (
    configModule.__test__ as TestableConfigModule['__test__'] & { resolveE2eTagFilters: (env: EnvMap) => unknown }
  ).resolveE2eTagFilters(env) as {
    excludedTags: string[];
    globalExcludedTags: string[];
    ignoredGlobalExcludedTags: string[];
    grep?: RegExp;
    grepInvert?: RegExp;
  };

const buildIntegrationConfig = (env: EnvMap) =>
  integrationConfigModule.__test__.buildConfig(env) as {
    reporter: [string, Record<string, unknown> | undefined][];
    projects: Array<{ name: string; workers?: number; grep?: RegExp; grepInvert?: RegExp; use?: { channel?: string } }>;
  };

const resolveIntegrationTagFilters = (env: EnvMap) =>
  (
    integrationConfigModule.__test__ as TestableConfigModule['__test__'] & {
      resolveIntegrationTagFilters: (env: EnvMap) => { excludedTags: string[]; grep?: RegExp; grepInvert?: RegExp };
    }
  ).resolveIntegrationTagFilters(env);
const resolveIntegrationWorkerCount = (env: EnvMap) =>
  (
    integrationConfigModule.__test__ as TestableConfigModule['__test__'] & {
      resolveWorkerCount: (env: EnvMap) => number;
    }
  ).resolveWorkerCount(env);
const buildNightlyConfig = (env: EnvMap) =>
  nightlyConfigModule.__test__.buildConfig(env) as {
    reporter: [string, Record<string, unknown> | undefined][];
    use: { baseURL: string };
    projects: Array<{ name: string; grep?: RegExp; grepInvert?: RegExp; use?: { headless?: boolean } }>;
  };

const getReporterTuple = (reporter: unknown, name: string): [string, Record<string, unknown> | undefined] => {
  if (!Array.isArray(reporter)) {
    throw new TypeError('Unexpected reporter config shape');
  }
  const match = reporter.find((entry) => Array.isArray(entry) && entry[0] === name);
  if (!match || !Array.isArray(match)) {
    throw new TypeError(`Reporter "${name}" not found`);
  }
  const [, options] = match as [string, Record<string, unknown> | undefined];
  return [name, options];
};

test.describe.configure({ mode: 'serial' });

test.describe('Playwright config coverage', { tag: '@svc-internal' }, () => {
  test.beforeAll(async () => {
    configModule = await loadConfig();
    integrationConfigModule = await loadConfigAt('playwright.integration.config.ts');
    nightlyConfigModule = await loadConfigAt('playwright-nightly.config.ts');
  });

  test('resolveWorkerCount covers configured, CI, and default', async () => {
    const configured = resolveWorkerCount({ FUNCTIONAL_TESTS_WORKERS: '4', CI: undefined });
    expect(configured).toBe(4);

    const configuredInCi = resolveWorkerCount({ FUNCTIONAL_TESTS_WORKERS: '2', CI: 'true' });
    expect(configuredInCi).toBe(2);

    const ciCount = resolveWorkerCount({ FUNCTIONAL_TESTS_WORKERS: undefined, CI: 'true' });
    expect(ciCount).toBe(2);

    const defaultCount = resolveWorkerCount({ FUNCTIONAL_TESTS_WORKERS: undefined, CI: undefined });
    expect(defaultCount).toBe(2);

    const defaultApiCount = resolveApiProjectWorkerCount({ FUNCTIONAL_TESTS_WORKERS: undefined, CI: undefined });
    expect(defaultApiCount).toBe(4);
  });

  test('resolveConfigModule prefers __test__ and default exports', () => {
    const withTest = resolveConfigModule({
      __test__: {
        buildConfig: () => ({}),
        resolveWorkerCount: () => 1,
      },
      default: { name: 'default' },
    });
    expect(withTest.__test__).toBeDefined();

    const withDefault = resolveConfigModule({ default: { name: 'default' } });
    expect(withDefault.name).toBe('default');

    const plain = resolveConfigModule({ name: 'plain' });
    expect(plain.name).toBe('plain');
  });

  test('config uses CI overrides and env reporters', async () => {
    const expectedWorkers = resolveWorkerCount({
      CI: 'true',
      PLAYWRIGHT_REPORT_FOLDER: 'custom-report',
      PLAYWRIGHT_REPORT_PROJECT: 'Custom Project',
      PLAYWRIGHT_REPORT_RELEASE: 'Custom Release',
      TEST_URL: 'https://example.test',
      TEST_TYPE: undefined,
      HEAD: 'true',
    });
    const config = buildConfig({
      CI: 'true',
      PLAYWRIGHT_REPORT_FOLDER: 'custom-report',
      PLAYWRIGHT_REPORT_PROJECT: 'Custom Project',
      PLAYWRIGHT_REPORT_RELEASE: 'Custom Release',
      TEST_URL: 'https://example.test',
      TEST_TYPE: undefined,
      HEAD: 'true',
    });
    expect(config.workers).toBe(expectedWorkers);
    expect(config.use.baseURL).toBe('https://example.test');
    expect(config.reporter[0][0]).toBe('dot');
    const [, odhinOptions] = getReporterTuple(
      config.reporter,
      './playwright_tests_new/common/reporters/odhin-adaptive.reporter.cjs'
    );
    expect(odhinOptions?.outputFolder).toBe('custom-report');
    expect(odhinOptions?.project).toBe('Custom Project');
    expect(odhinOptions?.release).toBe('Custom Release');
    expect(odhinOptions?.testEnvironment).toContain('ci');
    expect(config.projects[0].use.headless).toBe(false);

    const nodeApiProject = config.projects.find((p) => p.name === 'node-api');
    expect(nodeApiProject).toBeDefined();
    expect(nodeApiProject?.workers).toBe(resolveApiProjectWorkerCount({ CI: 'true' }));
  });

  test('config honors FUNCTIONAL_TESTS_WORKERS override in CI for all Playwright suites', async () => {
    const config = buildConfig({
      CI: 'true',
      FUNCTIONAL_TESTS_WORKERS: '2',
      TEST_URL: 'https://example.test',
    });
    expect(config.workers).toBe(2);
    const nodeApiProject = config.projects.find((p) => p.name === 'node-api');
    expect(nodeApiProject).toBeDefined();
    expect(nodeApiProject?.workers).toBe(2);
  });

  test('config defaults to local reporter values', async () => {
    const config = buildConfig({
      CI: undefined,
      PLAYWRIGHT_REPORT_FOLDER: undefined,
      PLAYWRIGHT_REPORT_PROJECT: undefined,
      PLAYWRIGHT_REPORT_RELEASE: undefined,
      GIT_BRANCH: undefined,
      TEST_URL: undefined,
      TEST_TYPE: undefined,
      HEAD: undefined,
    });
    expect(config.reporter[0][0]).toBe('list');
    const [, odhinOptions] = getReporterTuple(
      config.reporter,
      './playwright_tests_new/common/reporters/odhin-adaptive.reporter.cjs'
    );
    expect(odhinOptions?.outputFolder).toContain('playwright-e2e/odhin-report');
    expect(odhinOptions?.project).toBe('RPX XUI Webapp');
    expect(odhinOptions?.release).toContain('branch=');
    expect(odhinOptions?.testEnvironment).toContain('aat');
    expect(odhinOptions?.testEnvironment).toContain('local-run');
    expect(config.use.baseURL).toContain('manage-case');
  });

  test('config uses branch from environment when provided', async () => {
    const config = buildConfig({
      CI: undefined,
      PLAYWRIGHT_REPORT_FOLDER: undefined,
      PLAYWRIGHT_REPORT_PROJECT: undefined,
      PLAYWRIGHT_REPORT_RELEASE: undefined,
      PLAYWRIGHT_REPORT_BRANCH: undefined,
      GIT_BRANCH: 'feat/EXUI-3618-case-search-e2e',
      TEST_URL: undefined,
      TEST_TYPE: undefined,
      HEAD: undefined,
    });
    const [, odhinOptions] = getReporterTuple(
      config.reporter,
      './playwright_tests_new/common/reporters/odhin-adaptive.reporter.cjs'
    );
    expect(odhinOptions?.release).toContain('branch=feat/EXUI-3618-case-search-e2e');
  });

  test('node-api resolves include and exclude service tags from environment', () => {
    const config = buildConfig({
      API_PW_INCLUDE_TAGS: 'svc-auth,@svc-ccd',
      API_PW_EXCLUDED_TAGS_OVERRIDE: '@svc-work-allocation',
      CI: undefined,
    });
    const nodeApiProject = config.projects.find((project) => project.name === 'node-api') as
      | { grep?: RegExp; grepInvert?: RegExp }
      | undefined;
    expect(nodeApiProject).toBeDefined();
    expect(nodeApiProject?.grep).toBeInstanceOf(RegExp);
    expect(nodeApiProject?.grep?.test('@svc-auth')).toBe(true);
    expect(nodeApiProject?.grep?.test('@svc-ccd')).toBe(true);
    expect(nodeApiProject?.grepInvert).toBeInstanceOf(RegExp);
    expect(nodeApiProject?.grepInvert?.test('@svc-work-allocation')).toBe(true);
  });

  test('node-api clears file defaults with @none but keeps explicit env excludes', () => {
    const filters = resolveApiTagFilters({
      API_PW_EXCLUDED_TAGS_OVERRIDE: '@none,@svc-work-allocation',
      CI: undefined,
    });

    expect(filters.excludedTags).toEqual(['@svc-work-allocation']);
    expect(filters.grepInvert).toBeInstanceOf(RegExp);
    expect(filters.grepInvert?.test('@svc-work-allocation')).toBe(true);
    expect(filters.grepInvert?.test('@wa-action')).toBe(false);
  });

  test('node-api adds suite-scoped global exclusions to repo defaults', () => {
    const filters = resolveApiTagFilters({
      PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS: '@svc-work-allocation,@e2e-search-case,@integration-manage-tasks',
      CI: undefined,
    });

    expect(filters.excludedTags).toEqual(['@wa-action', '@svc-work-allocation']);
    expect(filters.globalExcludedTags).toEqual(['@svc-work-allocation']);
    expect(filters.ignoredGlobalExcludedTags).toEqual(['@e2e-search-case', '@integration-manage-tasks']);
    expect(filters.grepInvert).toBeInstanceOf(RegExp);
    expect(filters.grepInvert?.test('@wa-action')).toBe(true);
    expect(filters.grepInvert?.test('@svc-work-allocation')).toBe(true);
    expect(filters.grepInvert?.test('@e2e-search-case')).toBe(false);
  });

  test('node-api keeps suite overrides replacement-style while adding global exclusions', () => {
    const filters = resolveApiTagFilters({
      API_PW_EXCLUDED_TAGS_OVERRIDE: '@svc-ccd',
      PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS: '@svc-auth',
      CI: undefined,
    });

    expect(filters.excludedTags).toEqual(['@svc-ccd', '@svc-auth']);
    expect(filters.grepInvert?.test('@svc-ccd')).toBe(true);
    expect(filters.grepInvert?.test('@svc-auth')).toBe(true);
    expect(filters.grepInvert?.test('@wa-action')).toBe(false);
  });

  test('node-api ignores the global exclusion layer when explicitly bypassed', () => {
    const filters = resolveApiTagFilters({
      PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS: '@svc-work-allocation',
      PLAYWRIGHT_IGNORE_GLOBAL_EXCLUDES: 'true',
      CI: undefined,
    });

    expect(filters.excludedTags).toEqual(['@wa-action']);
    expect(filters.globalExcludedTags).toEqual([]);
    expect(filters.ignoredGlobalExcludedTags).toEqual(['@svc-work-allocation']);
    expect(filters.grepInvert?.test('@svc-work-allocation')).toBe(false);
  });

  test('node-api treats @none as the global Key Vault no-op sentinel', () => {
    const filters = resolveApiTagFilters({
      PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS: '@none',
      CI: undefined,
    });

    expect(filters.excludedTags).toEqual(['@wa-action']);
    expect(filters.globalExcludedTags).toEqual([]);
    expect(filters.ignoredGlobalExcludedTags).toEqual([]);
  });

  test('node-api rejects unknown include tags from environment', () => {
    expect(() =>
      buildConfig({
        API_PW_INCLUDE_TAGS: '@svc-does-not-exist',
        CI: undefined,
      })
    ).toThrow(/unknown tag/i);
  });

  test('node-api rejects unknown in-scope global exclusions', () => {
    expect(() =>
      resolveApiTagFilters({
        PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS: '@svc-does-not-exist',
        CI: undefined,
      })
    ).toThrow(/PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS contains unknown tag/i);
  });

  test('shared tag filter helper keeps explicit excludes when @none is combined with E2E tags', () => {
    const filters = resolveTagFilters({
      env: {
        E2E_PW_EXCLUDED_TAGS_OVERRIDE: '@none,@e2e-search-case',
      },
      includeTagsEnvVar: 'E2E_PW_INCLUDE_TAGS',
      excludedTagsEnvVar: 'E2E_PW_EXCLUDED_TAGS_OVERRIDE',
      configPathEnvVar: 'E2E_PW_TAG_FILTER_CONFIG',
      defaultConfigPath: 'playwright_tests_new/E2E/tag-filter.json',
      suiteTag: '@e2e',
    });

    expect(filters.excludedTags).toEqual(['@e2e-search-case']);
    expect(filters.grepInvert).toBeInstanceOf(RegExp);
    expect(filters.grepInvert?.test('@e2e-search-case')).toBe(true);
  });

  test('E2E tag defaults enable every configured non-smoke feature by default', () => {
    const filters = resolveTagFilters({
      env: {},
      includeTagsEnvVar: 'E2E_PW_INCLUDE_TAGS',
      excludedTagsEnvVar: 'E2E_PW_EXCLUDED_TAGS_OVERRIDE',
      configPathEnvVar: 'E2E_PW_TAG_FILTER_CONFIG',
      defaultConfigPath: 'playwright_tests_new/E2E/tag-filter.json',
      suiteTag: '@e2e',
    });

    expect(filters.excludedTags).toEqual([]);
    expect(filters.grepInvert).toBeUndefined();
    expect(filters.availableTags).toEqual(
      expect.arrayContaining([
        '@e2e-case-file-view',
        '@e2e-case-flags',
        '@e2e-create-case',
        '@e2e-document-upload',
        '@e2e-document-upload-v1',
        '@e2e-manage-tasks',
        '@e2e-media-viewer',
        '@e2e-search-case',
        '@e2e-update-case',
      ])
    );
  });

  test('shared tag filter helper treats suite plus feature includes as feature-only selection', () => {
    const filters = resolveTagFilters({
      env: {
        E2E_PW_INCLUDE_TAGS: '@e2e @e2e-search-case',
      },
      includeTagsEnvVar: 'E2E_PW_INCLUDE_TAGS',
      excludedTagsEnvVar: 'E2E_PW_EXCLUDED_TAGS_OVERRIDE',
      configPathEnvVar: 'E2E_PW_TAG_FILTER_CONFIG',
      defaultConfigPath: 'playwright_tests_new/E2E/tag-filter.json',
      suiteTag: '@e2e',
    });

    expect(filters.includeTags).toEqual(['@e2e-search-case']);
    expect(filters.grep).toBeInstanceOf(RegExp);
    expect(filters.grep?.test('@e2e-search-case')).toBe(true);
    expect(filters.grep?.test('@e2e-manage-tasks')).toBe(false);
  });

  test('shared tag filter helper rejects suite-plus-feature includes that are fully excluded after normalization', () => {
    expect(() =>
      resolveTagFilters({
        env: {
          E2E_PW_INCLUDE_TAGS: '@e2e @e2e-search-case',
          E2E_PW_EXCLUDED_TAGS_OVERRIDE: '@none,@e2e-search-case',
        },
        includeTagsEnvVar: 'E2E_PW_INCLUDE_TAGS',
        excludedTagsEnvVar: 'E2E_PW_EXCLUDED_TAGS_OVERRIDE',
        configPathEnvVar: 'E2E_PW_TAG_FILTER_CONFIG',
        defaultConfigPath: 'playwright_tests_new/E2E/tag-filter.json',
        suiteTag: '@e2e',
      })
    ).toThrow(/leave no tagged functional tests/i);
  });

  test('shared tag filter helper applies only suite-scoped global exclusions', () => {
    const filters = resolveTagFilters({
      env: {
        E2E_PW_EXCLUDED_TAGS_OVERRIDE: '@none',
        PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS: '@svc-work-allocation @e2e-search-case @integration-manage-tasks',
      },
      includeTagsEnvVar: 'E2E_PW_INCLUDE_TAGS',
      excludedTagsEnvVar: 'E2E_PW_EXCLUDED_TAGS_OVERRIDE',
      configPathEnvVar: 'E2E_PW_TAG_FILTER_CONFIG',
      defaultConfigPath: 'playwright_tests_new/E2E/tag-filter.json',
      suiteTag: '@e2e',
      globalExcludedTagsEnvVar: 'PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS',
      ignoreGlobalExcludesEnvVar: 'PLAYWRIGHT_IGNORE_GLOBAL_EXCLUDES',
      globalExcludedTagsPattern: /^@e2e(?:-.+)?$/,
    });

    expect(filters.excludedTags).toEqual(['@e2e-search-case']);
    expect(filters.globalExcludedTags).toEqual(['@e2e-search-case']);
    expect(filters.ignoredGlobalExcludedTags).toEqual(['@svc-work-allocation', '@integration-manage-tasks']);
    expect(filters.grepInvert?.test('@e2e-search-case')).toBe(true);
    expect(filters.grepInvert?.test('@svc-work-allocation')).toBe(false);
  });

  test('root smoke project applies E2E-scoped global exclusions', () => {
    const config = buildConfig({
      PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS: '@e2e-smoke @svc-work-allocation',
      CI: undefined,
    }) as {
      projects: Array<{ name: string; grepInvert?: RegExp }>;
    };
    const smokeProject = config.projects.find((project) => project.name === 'smoke');
    const filters = resolveE2eTagFilters({
      PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS: '@e2e-smoke @svc-work-allocation',
      CI: undefined,
    });

    expect(smokeProject).toBeDefined();
    expect(smokeProject?.grepInvert).toBeInstanceOf(RegExp);
    expect(smokeProject?.grepInvert?.test('@e2e-smoke')).toBe(true);
    expect(smokeProject?.grepInvert?.test('@svc-work-allocation')).toBe(false);
    expect(filters.globalExcludedTags).toEqual(['@e2e-smoke']);
    expect(filters.ignoredGlobalExcludedTags).toEqual(['@svc-work-allocation']);
  });

  test('root smoke project honours the global exclusion bypass', () => {
    const config = buildConfig({
      PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS: '@e2e-smoke',
      PLAYWRIGHT_IGNORE_GLOBAL_EXCLUDES: 'true',
      CI: undefined,
    }) as {
      projects: Array<{ name: string; grepInvert?: RegExp }>;
    };
    const smokeProject = config.projects.find((project) => project.name === 'smoke');
    const filters = resolveE2eTagFilters({
      PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS: '@e2e-smoke',
      PLAYWRIGHT_IGNORE_GLOBAL_EXCLUDES: 'true',
      CI: undefined,
    });

    expect(smokeProject).toBeDefined();
    expect(smokeProject?.grepInvert?.test('@e2e-smoke')).not.toBe(true);
    expect(filters.globalExcludedTags).toEqual([]);
    expect(filters.ignoredGlobalExcludedTags).toEqual(['@e2e-smoke']);
  });

  test('smoke runner allows empty runs only for the global smoke exclusion layer', () => {
    expect(
      smokeRunner.buildSmokePlaywrightArgs({
        PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS: '@e2e-smoke @svc-work-allocation',
        CI: undefined,
      })
    ).toEqual(['test', '--project=smoke', '--pass-with-no-tests', '--reporter=list']);

    expect(
      smokeRunner.buildSmokePlaywrightArgs({
        PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS: 'e2e-smoke',
        PLAYWRIGHT_IGNORE_GLOBAL_EXCLUDES: 'true',
        CI: undefined,
      })
    ).toEqual(['test', '--project=smoke']);

    expect(
      smokeRunner.buildSmokePlaywrightArgs(
        {
          PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS: '@e2e-smoke',
          CI: undefined,
        },
        ['--reporter=null', '--list']
      )
    ).toEqual(['test', '--project=smoke', '--reporter=null', '--list', '--pass-with-no-tests']);
  });

  test('integration config keeps Odhin enabled locally with lightweight defaults', async () => {
    const config = buildIntegrationConfig({
      CI: undefined,
      PW_INTEGRATION_ODHIN: undefined,
      PW_ODHIN_LIGHTWEIGHT: undefined,
      PW_ODHIN_CONSOLE_LOG: undefined,
      PW_ODHIN_CONSOLE_ERROR: undefined,
      PW_ODHIN_PROFILE: undefined,
      TEST_URL: undefined,
      TEST_TYPE: undefined,
      HEAD: undefined,
    });

    const [, progressOptions] = getReporterTuple(
      config.reporter,
      './playwright_tests_new/common/reporters/odhin-progress.reporter.cjs'
    );
    const [, odhinOptions] = getReporterTuple(
      config.reporter,
      './playwright_tests_new/common/reporters/odhin-adaptive.reporter.cjs'
    );

    expect(progressOptions?.hardTimeoutMs).toBe(resolveOdhinHardTimeoutMs({ CI: undefined }));
    expect(progressOptions?.forceExitOnCompletion).toBe(resolveOdhinForceExitOnCompletion({ CI: undefined }));
    expect(progressOptions?.timeoutExitCode).toBe(1);
    expect(odhinOptions?.lightweight).toBe(resolveOdhinLightweight({ CI: undefined }));
    expect(odhinOptions?.consoleLog).toBe(resolveOdhinConsoleCapture({ CI: undefined }).consoleLog);
    expect(odhinOptions?.consoleError).toBe(resolveOdhinConsoleCapture({ CI: undefined }).consoleError);
    expect(odhinOptions?.profile).toBe(true);
    expect(odhinOptions?.runtimeHookTimeoutMs).toBe(resolveOdhinRuntimeHookTimeoutMs({ CI: undefined }));
    expect(config.expect.timeout).toBe(60_000);
    expect(config.use.timezoneId).toBe('Europe/London');
    expect(config.projects).toHaveLength(1);
    expect(config.projects[0]?.name).toBe('chromium');
    expect(config.projects[0]?.workers).toBeUndefined();
  });

  test('integration config applies shared tag filters to the integration project', async () => {
    const config = buildIntegrationConfig({
      INTEGRATION_PW_INCLUDE_TAGS: '@integration-search-case',
      INTEGRATION_PW_EXCLUDED_TAGS_OVERRIDE: '@none',
      CI: undefined,
    });

    expect(config.projects).toHaveLength(1);
    expect(config.projects[0]?.grep).toBeInstanceOf(RegExp);
    expect(config.projects[0]?.grep?.test('@integration-search-case')).toBe(true);
    expect(config.projects[0]?.grep?.test('@integration-manage-tasks')).toBe(false);

    const filters = resolveIntegrationTagFilters({
      INTEGRATION_PW_EXCLUDED_TAGS_OVERRIDE: '@none,@integration-manage-tasks',
      CI: undefined,
    });
    expect(filters.excludedTags).toEqual(['@integration-manage-tasks']);
    expect(filters.grepInvert?.test('@integration-manage-tasks')).toBe(true);
  });

  test('integration config applies only integration-scoped global exclusions', async () => {
    const filters = resolveIntegrationTagFilters({
      PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS: '@svc-work-allocation,@e2e-search-case,@integration-manage-tasks',
      CI: undefined,
    });

    expect(filters.excludedTags).toEqual(['@integration-manage-tasks']);
    expect(filters.grepInvert?.test('@integration-manage-tasks')).toBe(true);
    expect(filters.grepInvert?.test('@e2e-search-case')).toBe(false);
  });

  test('integration config exposes the documented resolveWorkerCount test helper', async () => {
    expect(resolveIntegrationWorkerCount({ FUNCTIONAL_TESTS_WORKERS: '3', CI: undefined })).toBe(3);
    expect(resolveIntegrationWorkerCount({ FUNCTIONAL_TESTS_WORKERS: undefined, CI: 'true' })).toBe(4);
  });

  test('integration config allows local browser channel override for reproducible reruns', async () => {
    const withDefaultChannel = buildIntegrationConfig({
      CI: undefined,
      PLAYWRIGHT_BROWSER_CHANNEL: undefined,
      TEST_URL: undefined,
      TEST_TYPE: undefined,
      HEAD: undefined,
    });
    const withBundledChromium = buildIntegrationConfig({
      CI: undefined,
      PLAYWRIGHT_BROWSER_CHANNEL: '',
      TEST_URL: undefined,
      TEST_TYPE: undefined,
      HEAD: undefined,
    });

    expect(withDefaultChannel.projects.find((project) => project.name === 'chromium')?.use?.channel).toBe('chrome');
    expect(withBundledChromium.projects.find((project) => project.name === 'chromium')?.use?.channel).toBeUndefined();
  });

  test('nightly config keeps a root baseURL so cross-browser relative navigation stays valid', async () => {
    const config = buildNightlyConfig({
      CI: 'true',
      TEST_URL: 'https://example.test',
      HEAD: 'true',
    });

    expect(config.use.baseURL).toBe('https://example.test');
    expect(config.reporter[0][0]).toBe('dot');
    const [, odhinOptions] = getReporterTuple(
      config.reporter,
      './playwright_tests_new/common/reporters/odhin-adaptive.reporter.cjs'
    );
    expect(odhinOptions?.outputFolder).toContain('playwright-e2e/odhin-report');
    expect(config.projects.find((project) => project.name === 'firefox')?.use?.headless).toBe(false);
    expect(config.projects.find((project) => project.name === 'webkit')?.use?.headless).toBe(false);
  });

  test('nightly cross-browser config applies E2E-scoped global exclusions', async () => {
    const config = buildNightlyConfig({
      CI: 'true',
      TEST_URL: 'https://example.test',
      PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS: '@svc-work-allocation @e2e-search-case',
    });

    expect(config.projects.find((project) => project.name === 'firefox')?.grepInvert?.test('@e2e-search-case')).toBe(true);
    expect(config.projects.find((project) => project.name === 'webkit')?.grepInvert?.test('@e2e-search-case')).toBe(true);
    expect(config.projects.find((project) => project.name === 'firefox')?.grepInvert?.test('@svc-work-allocation')).toBe(false);
  });

  test('integration config avoids forced Odhin timeout in CI', async () => {
    const config = buildIntegrationConfig({
      CI: 'true',
      PW_INTEGRATION_ODHIN: undefined,
      PW_ODHIN_LIGHTWEIGHT: undefined,
      PW_ODHIN_CONSOLE_LOG: undefined,
      PW_ODHIN_CONSOLE_ERROR: undefined,
      PW_ODHIN_PROFILE: undefined,
      TEST_URL: undefined,
      TEST_TYPE: undefined,
      HEAD: undefined,
    });

    const [, progressOptions] = getReporterTuple(
      config.reporter,
      './playwright_tests_new/common/reporters/odhin-progress.reporter.cjs'
    );
    const [, odhinOptions] = getReporterTuple(
      config.reporter,
      './playwright_tests_new/common/reporters/odhin-adaptive.reporter.cjs'
    );

    expect(progressOptions?.hardTimeoutMs).toBe(resolveOdhinHardTimeoutMs({ CI: 'true' }));
    expect(progressOptions?.forceExitOnCompletion).toBe(resolveOdhinForceExitOnCompletion({ CI: 'true' }));
    expect(odhinOptions?.lightweight).toBe(resolveOdhinLightweight({ CI: 'true' }));
    expect(odhinOptions?.consoleLog).toBe(resolveOdhinConsoleCapture({ CI: 'true' }).consoleLog);
    expect(odhinOptions?.consoleError).toBe(resolveOdhinConsoleCapture({ CI: 'true' }).consoleError);
    expect(odhinOptions?.runtimeHookTimeoutMs).toBe(resolveOdhinRuntimeHookTimeoutMs({ CI: 'true' }));
  });
});
