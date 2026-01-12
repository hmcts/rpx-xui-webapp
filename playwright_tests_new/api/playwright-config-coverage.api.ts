/**
 * @hmcts-audit-metadata
 * {
 *   "agent_name": "HMCTS-AI-Assistant",
 *   "version": "v1.0",
 *   "audit_reference": "EXUI-4031",
 *   "reviewer": "pending",
 *   "last_audit": "2026-01-12"
 * }
 */

import { test, expect } from '@playwright/test';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

type EnvMap = Record<string, string | undefined>;

interface ConfigModule {
  __test__?: {
    buildConfig: (env: EnvMap) => any;
    resolveWorkerCount: (env: EnvMap) => number;
  };
  default?: ConfigModule;
  [key: string]: any;
}

async function loadConfig() {
  const configPath = path.resolve(process.cwd(), 'playwright.config.ts');
  const configUrl = pathToFileURL(configPath).href;
  const loaded = await import(configUrl);
  return resolveConfigModule(loaded);
}

function resolveConfigModule(loaded: ConfigModule): ConfigModule {
  return loaded?.__test__ ? loaded : loaded?.default ?? loaded;
}

let configModule: ConfigModule;

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
    expect(ciCount).toBe(1);

    const defaultCount = resolveWorkerCount({ FUNCTIONAL_TESTS_WORKERS: undefined, CI: undefined });
    expect(defaultCount).toBeGreaterThanOrEqual(1);
  });

  test('resolveConfigModule prefers __test__ and default exports', () => {
    const withTest = resolveConfigModule({ __test__: { name: 'test' }, default: { name: 'default' } });
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
    expect(config.use.baseURL).toBe('https://example.test');
    expect(config.reporter[0][0]).toBe('dot');
    expect(config.reporter[1][1].outputFolder).toBe('custom-report');
    expect(config.reporter[1][1].project).toBe('Custom Project');
    expect(config.reporter[1][1].release).toBe('Custom Release');
    expect(config.reporter[1][1].testEnvironment).toContain('ci');
    expect(config.projects[0].use.headless).toBe(false);
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
