import { expect, test } from '@playwright/test';

import {
  INTEGRATION_SESSION_WARMUP_COMPLETE_ENV,
  isIntegrationSessionWarmupRequired,
  prewarmIntegrationSessions,
} from '../../common/integrationSessionWarmup.js';

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
    const env = { CI: 'true' } as NodeJS.ProcessEnv;
    let useFailureCooldown: boolean | undefined;
    await expect(
      prewarmIntegrationSessions(['STAFF_ADMIN'], env, async (_identifiers, options) => {
        useFailureCooldown = options?.useFailureCooldown;
        throw new Error('capture failed');
      })
    ).rejects.toThrow('capture failed');
    expect(useFailureCooldown).toBe(true);
    expect(env[INTEGRATION_SESSION_WARMUP_COMPLETE_ENV]).toBeUndefined();
  });

  test('marks required warmup complete only after every capture succeeds', async () => {
    const env = { CI: 'true' } as NodeJS.ProcessEnv;

    await prewarmIntegrationSessions(['STAFF_ADMIN'], env, async () => undefined);

    expect(env[INTEGRATION_SESSION_WARMUP_COMPLETE_ENV]).toBe('true');
  });

  test('keeps local warmup best effort', async () => {
    let useFailureCooldown: boolean | undefined;
    await expect(
      prewarmIntegrationSessions(['STAFF_ADMIN'], {} as NodeJS.ProcessEnv, async (_identifiers, options) => {
        useFailureCooldown = options?.useFailureCooldown;
        throw new Error('capture failed');
      })
    ).resolves.toBeUndefined();
    expect(useFailureCooldown).toBe(false);
  });
});
