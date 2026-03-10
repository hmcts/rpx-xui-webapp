import { expect, test } from '@playwright/test';

import { loadConfig, type EnvMap, type TestableConfigModule } from './utils/playwrightConfigUtils';

type ProjectWithFilters = {
  name: string;
  grep?: RegExp;
  grepInvert?: RegExp;
};

const getChromiumProject = (config: { projects?: Array<{ name: string }> }) =>
  config.projects?.find((project) => project.name === 'chromium') as ProjectWithFilters | undefined;

test.describe.configure({ mode: 'serial' });

test.describe('Playwright UI tag filter config coverage', { tag: ['@api', '@svc-internal'] }, () => {
  test('E2E config resolves include and exclude tags from environment', async () => {
    const configModule = (await loadConfig('playwright.e2e.config.ts')) as TestableConfigModule;
    const config = configModule.__test__.buildConfig({
      E2E_PW_INCLUDE_TAGS: 'e2e-search-case',
      E2E_PW_EXCLUDED_TAGS_OVERRIDE: '@e2e-manage-tasks',
      PW_E2E_WORKERS: '2',
      CI: undefined,
    } as EnvMap) as { projects?: Array<{ name: string }>; workers?: number };

    const chromiumProject = getChromiumProject(config);
    expect(config.workers).toBe(2);
    expect(chromiumProject).toBeDefined();
    expect(chromiumProject?.grep).toBeInstanceOf(RegExp);
    expect(chromiumProject?.grep?.test('@e2e-search-case')).toBe(true);
    expect(chromiumProject?.grepInvert).toBeInstanceOf(RegExp);
    expect(chromiumProject?.grepInvert?.test('@e2e-manage-tasks')).toBe(true);
  });

  test('integration config resolves include and exclude tags from environment', async () => {
    const configModule = (await loadConfig('playwright.integration.config.ts')) as TestableConfigModule;
    const config = configModule.__test__.buildConfig({
      INTEGRATION_PW_INCLUDE_TAGS: 'integration-search-case',
      INTEGRATION_PW_EXCLUDED_TAGS_OVERRIDE: '@integration-manage-tasks',
      PW_INTEGRATION_WORKERS: '3',
      CI: undefined,
    } as EnvMap) as { projects?: Array<{ name: string }>; workers?: number };

    const chromiumProject = getChromiumProject(config);
    expect(config.workers).toBe(3);
    expect(chromiumProject).toBeDefined();
    expect(chromiumProject?.grep).toBeInstanceOf(RegExp);
    expect(chromiumProject?.grep?.test('@integration-search-case')).toBe(true);
    expect(chromiumProject?.grepInvert).toBeInstanceOf(RegExp);
    expect(chromiumProject?.grepInvert?.test('@integration-manage-tasks')).toBe(true);
  });

  test('root chromium project merges E2E and integration tag filters', async () => {
    const configModule = (await loadConfig()) as TestableConfigModule;
    const config = configModule.__test__.buildConfig({
      E2E_PW_EXCLUDED_TAGS_OVERRIDE: '@e2e-manage-tasks',
      INTEGRATION_PW_INCLUDE_TAGS: '@integration-search-case',
      CI: undefined,
    } as EnvMap) as { projects?: Array<{ name: string }> };

    const chromiumProject = getChromiumProject(config);
    expect(chromiumProject).toBeDefined();
    expect(chromiumProject?.grep).toBeInstanceOf(RegExp);
    expect(chromiumProject?.grep?.test('@integration-search-case')).toBe(true);
    expect(chromiumProject?.grepInvert).toBeInstanceOf(RegExp);
    expect(chromiumProject?.grepInvert?.test('@e2e-manage-tasks')).toBe(true);
  });

  test('E2E config rejects suite-wide exclusions that would empty the tagged suite', async () => {
    const configModule = (await loadConfig('playwright.e2e.config.ts')) as TestableConfigModule;

    expect(() =>
      configModule.__test__.buildConfig({
        E2E_PW_EXCLUDED_TAGS_OVERRIDE: '@e2e',
        CI: undefined,
      } as EnvMap)
    ).toThrow(/leave no tagged functional tests/i);
  });

  test('integration config rejects unknown tags before execution', async () => {
    const configModule = (await loadConfig('playwright.integration.config.ts')) as TestableConfigModule;

    expect(() =>
      configModule.__test__.buildConfig({
        INTEGRATION_PW_INCLUDE_TAGS: '@integration-not-real',
        CI: undefined,
      } as EnvMap)
    ).toThrow(/unknown tag/i);
  });
});
