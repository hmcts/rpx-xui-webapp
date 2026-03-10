import { test, expect } from '@playwright/test';
import { availableParallelism, cpus } from 'node:os';

import { loadConfig, resolveConfigModule, type EnvMap, type TestableConfigModule } from './utils/playwrightConfigUtils';

let configModule: TestableConfigModule;

const buildConfig = (env: EnvMap) => configModule.__test__.buildConfig(env);
const resolveWorkerCount = (env: EnvMap) => configModule.__test__.resolveWorkerCount(env);
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

const resolveExpectedDefaultWorkerCount = () => {
  const cpuCount = typeof availableParallelism === 'function' ? availableParallelism() : (cpus()?.length ?? 1);
  return Math.min(4, Math.max(1, Math.floor(cpuCount / 2)));
};

test.describe('Playwright API config coverage', { tag: ['@api', '@svc-internal'] }, () => {
  test.beforeAll(async () => {
    configModule = await loadConfig('playwright.api.config.ts');
  });

  test('resolveWorkerCount covers configured, CI, and default', async () => {
    const configured = resolveWorkerCount({ FUNCTIONAL_TESTS_WORKERS: '4', CI: 'true' });
    expect(configured).toBe(4);

    const ciCount = resolveWorkerCount({ FUNCTIONAL_TESTS_WORKERS: undefined, CI: 'true' });
    expect(ciCount).toBe(resolveExpectedDefaultWorkerCount());

    const defaultCount = resolveWorkerCount({ FUNCTIONAL_TESTS_WORKERS: undefined, CI: undefined });
    expect(defaultCount).toBe(resolveExpectedDefaultWorkerCount());
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

  test('config uses API-specific overrides and env reporters', async () => {
    const config = buildConfig({
      CI: 'true',
      FUNCTIONAL_TESTS_WORKERS: '5',
      PW_API_WORKERS: '3',
      PLAYWRIGHT_REPORT_FOLDER: 'custom-report',
      PLAYWRIGHT_REPORT_PROJECT: 'Custom Project',
      PLAYWRIGHT_REPORT_RELEASE: 'Custom Release',
      TEST_URL: 'https://example.test',
      TEST_TYPE: undefined,
    }) as {
      workers?: number;
      use?: { baseURL?: string };
      reporter: unknown[];
      projects?: Array<{ name: string; grep?: RegExp; grepInvert?: RegExp }>;
    };

    expect(config.workers).toBe(3);
    expect(config.use?.baseURL).toBe('https://example.test');
    expect(config.reporter[0][0]).toBe('dot');
    const [, odhinOptions] = getReporterTuple(config.reporter, 'odhin-reports-playwright');
    expect(odhinOptions?.outputFolder).toBe('custom-report');
    expect(odhinOptions?.project).toBe('Custom Project');
    expect(odhinOptions?.release).toBe('Custom Release');
    expect(odhinOptions?.testEnvironment).toContain('ci');
    const nodeApiProject = config.projects?.find((project) => project.name === 'node-api');
    expect(nodeApiProject).toBeDefined();
  });

  test('API config ignores UI tag-filter env when resolving node-api', async () => {
    expect(() =>
      buildConfig({
        API_PW_INCLUDE_TAGS: '@svc-auth',
        E2E_PW_TAG_FILTER_CONFIG: '/definitely/missing-e2e-tag-filter.json',
      })
    ).not.toThrow();
  });

  test('node-api resolves include tags and clears file excludes with @none', () => {
    const config = buildConfig({
      API_PW_INCLUDE_TAGS: 'svc-auth,@svc-ccd',
      API_PW_EXCLUDED_TAGS_OVERRIDE: '@none',
      CI: undefined,
    }) as { projects?: Array<{ name: string; grep?: RegExp; grepInvert?: RegExp }> };
    const nodeApiProject = config.projects?.find((project) => project.name === 'node-api');
    expect(nodeApiProject).toBeDefined();
    expect(nodeApiProject?.grep).toBeInstanceOf(RegExp);
    expect(nodeApiProject?.grep?.test('@svc-auth')).toBe(true);
    expect(nodeApiProject?.grep?.test('@svc-ccd')).toBe(true);
    expect(nodeApiProject?.grepInvert).toBeUndefined();
  });

  test('node-api rejects suite-wide api tag exclusion by default', () => {
    expect(() =>
      buildConfig({
        API_PW_EXCLUDED_TAGS_OVERRIDE: '@api',
        CI: undefined,
      })
    ).toThrow(/leave no tagged functional tests/i);
  });

  test('node-api rejects unknown tag inputs before execution', () => {
    expect(() =>
      buildConfig({
        API_PW_INCLUDE_TAGS: '@svc-not-real',
        CI: undefined,
      })
    ).toThrow(/unknown tag/i);
  });
});
