import { expect, test } from '@playwright/test';

import { isIntegrationSessionWarmupRequired, prewarmIntegrationSessions } from '../../common/integrationSessionWarmup.js';

test.describe('integration session warmup', { tag: '@svc-internal' }, () => {
  test('requires successful warmup in CI and when explicitly enabled', () => {
    expect(isIntegrationSessionWarmupRequired({ CI: 'true' } as NodeJS.ProcessEnv)).toBe(true);
    expect(isIntegrationSessionWarmupRequired({ PW_INTEGRATION_SESSION_WARMUP_REQUIRED: 'true' } as NodeJS.ProcessEnv)).toBe(
      true
    );
    expect(
      isIntegrationSessionWarmupRequired({ CI: 'true', PW_INTEGRATION_SESSION_WARMUP_REQUIRED: 'false' } as NodeJS.ProcessEnv)
    ).toBe(true);
    expect(
      isIntegrationSessionWarmupRequired({ CI: 'true', PW_INTEGRATION_SESSION_WARMUP_REQUIRED: 'invalid' } as NodeJS.ProcessEnv)
    ).toBe(true);
    expect(isIntegrationSessionWarmupRequired({ PW_INTEGRATION_SESSION_WARMUP_REQUIRED: 'false' } as NodeJS.ProcessEnv)).toBe(
      false
    );
  });

  test('fails fast when required warmup fails', async () => {
    await expect(
      prewarmIntegrationSessions(['STAFF_ADMIN'], { CI: 'true' } as NodeJS.ProcessEnv, async () => {
        throw new Error('capture failed');
      })
    ).rejects.toThrow('capture failed');
  });

  test('keeps local warmup best effort', async () => {
    await expect(
      prewarmIntegrationSessions(['STAFF_ADMIN'], {} as NodeJS.ProcessEnv, async () => {
        throw new Error('capture failed');
      })
    ).resolves.toBeUndefined();
  });
});
