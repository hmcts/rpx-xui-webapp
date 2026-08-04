import { expect, test } from '@playwright/test';

import { prewarmIntegrationSessions } from '../../common/integrationSessionWarmup';

test.describe('Playwright global setup', { tag: '@svc-internal' }, () => {
  test('does not make integration session warmup a suite-level failure', async () => {
    const capturedUsers: string[][] = [];

    await expect(
      prewarmIntegrationSessions(['STAFF_ADMIN'], async (users) => {
        capturedUsers.push(users as string[]);
        throw new Error('IDAM unavailable');
      })
    ).resolves.toBeUndefined();

    expect(capturedUsers).toEqual([['STAFF_ADMIN']]);
  });
});
