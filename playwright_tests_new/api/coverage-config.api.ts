import { test, expect } from '@playwright/test';

import config, { __test__ as configUtilsTest } from '../E2E/utils/config.utils.js';
import { withEnv } from './utils/testEnv';

test.describe.configure({ mode: 'serial' });

test.describe('Configuration resolution coverage', { tag: '@svc-internal' }, () => {
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
