import { test, expect } from '@playwright/test';

import { loadConfig, resolveConfigModule, type EnvMap, type TestableConfigModule } from './utils/playwrightConfigUtils';
import * as playwrightConfigUtils from '../../playwright-config-utils';

const { resolveTagFilters } = playwrightConfigUtils;

let configModule: TestableConfigModule;

const buildConfig = (env: EnvMap) => configModule.__test__.buildConfig(env);
const resolveWorkerCount = (env: EnvMap) => configModule.__test__.resolveWorkerCount(env);
const resolveApiTagFilters = (env: EnvMap) => configModule.__test__.resolveApiTagFilters(env);
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
  });

  test('resolveWorkerCount covers configured, CI, and default', async () => {
    const configured = resolveWorkerCount({ FUNCTIONAL_TESTS_WORKERS: '4', CI: undefined });
    expect(configured).toBe(4);

    const configuredInCi = resolveWorkerCount({ FUNCTIONAL_TESTS_WORKERS: '2', CI: 'true' });
    expect(configuredInCi).toBe(2);

    const ciCount = resolveWorkerCount({ FUNCTIONAL_TESTS_WORKERS: undefined, CI: 'true' });
    expect(ciCount).toBe(8);

    const defaultCount = resolveWorkerCount({ FUNCTIONAL_TESTS_WORKERS: undefined, CI: undefined });
    expect(defaultCount).toBeGreaterThanOrEqual(1);
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
    const config = buildConfig({
      CI: 'true',
      PLAYWRIGHT_REPORT_FOLDER: 'custom-report',
      PLAYWRIGHT_REPORT_PROJECT: 'Custom Project',
      PLAYWRIGHT_REPORT_RELEASE: 'Custom Release',
      TEST_URL: 'https://example.test',
      TEST_TYPE: undefined,
      HEAD: 'true',
    });
    expect(config.workers).toBe(8);
    expect(config.use.baseURL).toBe('https://example.test');
    expect(config.reporter[0][0]).toBe('dot');
    const [, odhinOptions] = getReporterTuple(config.reporter, 'odhin-reports-playwright');
    expect(odhinOptions?.outputFolder).toBe('custom-report');
    expect(odhinOptions?.project).toBe('Custom Project');
    expect(odhinOptions?.release).toBe('Custom Release');
    expect(odhinOptions?.testEnvironment).toContain('ci');
    expect(config.projects[0].use.headless).toBe(false);

    const nodeApiProject = config.projects.find((p) => p.name === 'node-api');
    expect(nodeApiProject).toBeDefined();
    expect(nodeApiProject?.workers).toBe(4);
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
    const [, odhinOptions] = getReporterTuple(config.reporter, 'odhin-reports-playwright');
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
    const [, odhinOptions] = getReporterTuple(config.reporter, 'odhin-reports-playwright');
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

  test('node-api rejects unknown include tags from environment', () => {
    expect(() =>
      buildConfig({
        API_PW_INCLUDE_TAGS: '@svc-does-not-exist',
        CI: undefined,
      })
    ).toThrow(/unknown tag/i);
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
});
