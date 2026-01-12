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

import appTestConfig, { __test__ as appTestConfigTest } from '../common/appTestConfig';
import { __test__ as apiTestConfigTest } from '../common/apiTestConfig';
import config, { __test__ as configUtilsTest } from '../E2E/utils/config.utils.js';

type EnvMap = Record<string, string | undefined>;

async function withEnv(vars: EnvMap, fn: () => Promise<void> | void) {
  const previous = new Map<string, string | undefined>();
  for (const [key, value] of Object.entries(vars)) {
    previous.set(key, process.env[key]);
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
  try {
    await fn();
  } finally {
    for (const [key, value] of previous.entries()) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
}

test.describe.configure({ mode: 'serial' });

test.describe('Configuration resolution coverage', () => {
  test('apiTestConfig helpers resolve env values', () => {
    expect(apiTestConfigTest.resolveBaseUrl(undefined)).toBe('https://manage-case.aat.platform.hmcts.net/');
    expect(apiTestConfigTest.resolveBaseUrl('https://example.test')).toBe('https://example.test');

    expect(apiTestConfigTest.resolveTestEnv(undefined)).toBe('aat');
    expect(apiTestConfigTest.resolveTestEnv('demo')).toBe('demo');
    expect(apiTestConfigTest.resolveTestEnv('aat')).toBe('aat');
    expect(apiTestConfigTest.resolveTestEnv('prod')).toBe('aat');
  });

  test('appTestConfig helpers resolve preview and test env', () => {
    const preview = appTestConfigTest.resolvePreviewConfig(
      [{ previewUrl: 'preview.example', demoUrl: 'https://demo.example' }],
      'https://preview.example/path'
    );
    expect(preview).toEqual(expect.objectContaining({ demoUrl: 'https://demo.example' }));
    expect(appTestConfigTest.resolvePreviewConfig([], 'https://preview.example/path')).toBeUndefined();
    expect(appTestConfigTest.resolvePreviewConfig([{ previewUrl: 'preview.example', demoUrl: 'https://demo.example' }], undefined)).toBeUndefined();

    const env = {} as NodeJS.ProcessEnv;
    expect(appTestConfigTest.applyPreviewConfig({ demoUrl: 'https://demo.example' }, env)).toBe(true);
    expect(env.TEST_ENV).toBe('demo');
    expect(env.TEST_URL).toBe('https://demo.example');
    expect(appTestConfigTest.applyPreviewConfig(undefined, env)).toBe(false);

    expect(appTestConfigTest.resolveTestEnv(undefined)).toBe('aat');
    expect(appTestConfigTest.resolveTestEnv('demo')).toBe('demo');
    expect(appTestConfigTest.resolveTestEnv('aat')).toBe('aat');
    expect(appTestConfigTest.resolveTestEnv('prod')).toBe('aat');
    expect(appTestConfig.getTestEnvFromEnviornment()).toBeTruthy();
  });

  test('config.utils resolves env vars and URLs', async () => {
    expect(configUtilsTest.resolveUrl('https://override', 'https://fallback')).toBe('https://override');
    expect(configUtilsTest.resolveUrl(undefined, 'https://fallback')).toBe('https://fallback');

    await withEnv({ CONFIG_TEST_VAR: 'value' }, () => {
      expect(configUtilsTest.getEnvVar('CONFIG_TEST_VAR')).toBe('value');
    });
    await withEnv({ CONFIG_TEST_VAR: undefined }, () => {
      expect(() => configUtilsTest.getEnvVar('CONFIG_TEST_VAR')).toThrow('CONFIG_TEST_VAR');
    });

    expect(config.urls.exuiDefaultUrl).toContain('manage-case');
  });

  test('withEnv restores pre-existing variables', async () => {
    process.env.CONFIG_TEST_VAR_RESTORE = 'existing';
    await withEnv({ CONFIG_TEST_VAR_RESTORE: 'override' }, () => {
      expect(process.env.CONFIG_TEST_VAR_RESTORE).toBe('override');
    });
    expect(process.env.CONFIG_TEST_VAR_RESTORE).toBe('existing');
    delete process.env.CONFIG_TEST_VAR_RESTORE;
  });
});
