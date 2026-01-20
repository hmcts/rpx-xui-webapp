
import { test, expect } from '@playwright/test';

import { loadConfig, resolveConfigModule, type EnvMap, type TestableConfigModule } from './utils/playwrightConfigUtils';

let configModule: TestableConfigModule;

const buildConfig = (env: EnvMap) => configModule.__test__.buildConfig(env);
const resolveWorkerCount = (env: EnvMap) => configModule.__test__.resolveWorkerCount(env);

test.describe.configure({ mode: 'serial' });

test.describe('Playwright config coverage', () => {
  test.beforeAll(async () => {
    configModule = await loadConfig();
  });

  test('resolveWorkerCount covers configured, CI, and default', async () => {
    const configured = resolveWorkerCount({ FUNCTIONAL_TESTS_WORKERS: '4', CI: undefined });
    expect(configured).toBe(4);

    const ciCount = resolveWorkerCount({ FUNCTIONAL_TESTS_WORKERS: undefined, CI: 'true' });
    expect(ciCount).toBe(8);

    const defaultCount = resolveWorkerCount({ FUNCTIONAL_TESTS_WORKERS: undefined, CI: undefined });
    expect(defaultCount).toBeGreaterThanOrEqual(1);
  });

  test('resolveConfigModule prefers __test__ and default exports', () => {
    const withTest = resolveConfigModule({
      __test__: {
        buildConfig: () => ({}),
        resolveWorkerCount: () => 1
      },
      default: { name: 'default' }
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
      HEAD: 'true'
    });
    expect(config.workers).toBe(8);
    expect(config.use.baseURL).toBe('https://example.test');
    expect(config.reporter[0][0]).toBe('dot');
    expect(config.reporter[1][1].outputFolder).toBe('custom-report');
    expect(config.reporter[1][1].project).toBe('Custom Project');
    expect(config.reporter[1][1].release).toBe('Custom Release');
    expect(config.reporter[1][1].testEnvironment).toContain('ci');
    expect(config.projects[0].use.headless).toBe(false);

    const nodeApiProject = config.projects.find((p) => p.name === 'node-api');
    expect(nodeApiProject).toBeDefined();
    expect(nodeApiProject?.workers).toBe(8);
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
      HEAD: undefined
    });
    expect(config.reporter[0][0]).toBe('list');
    expect(config.reporter[1][1].outputFolder).toContain('playwright-e2e/odhin-report');
    expect(config.reporter[1][1].project).toBe('RPX XUI Webapp');
    expect(config.reporter[1][1].release).toContain('branch=local');
    expect(config.reporter[1][1].testEnvironment).toContain('local');
    expect(config.use.baseURL).toContain('manage-case');
  });
});
