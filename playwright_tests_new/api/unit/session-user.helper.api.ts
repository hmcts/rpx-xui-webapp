import { expect, test } from '@playwright/test';
import { resolveSessionUserId } from '../../integration/helpers/sessionUser.helper.js';

test.describe('session user helper', { tag: '@svc-internal' }, () => {
  test('returns the __userid__ value from the applied session cookies', async () => {
    const fakeApplier = async () => ({
      cookies: [
        { name: 'Idam.Session', value: 'session-cookie' },
        { name: '__userid__', value: '123456789' },
      ],
    });

    await expect(resolveSessionUserId({} as never, 'STAFF_ADMIN', fakeApplier)).resolves.toBe('123456789');
  });

  test('uses the supplied fallback when the session does not expose __userid__', async () => {
    const fakeApplier = async () => ({
      cookies: [{ name: 'Idam.Session', value: 'session-cookie' }],
    });

    await expect(
      resolveSessionUserId({} as never, 'STAFF_ADMIN', fakeApplier, { fallbackUserId: 'test-user-id' })
    ).resolves.toBe('test-user-id');
  });

  test('fails fast when the session does not expose __userid__ and no fallback is provided', async () => {
    const fakeApplier = async () => ({
      cookies: [{ name: 'Idam.Session', value: 'session-cookie' }],
    });

    await expect(resolveSessionUserId({} as never, 'STAFF_ADMIN', fakeApplier)).rejects.toThrow(
      'Expected session for STAFF_ADMIN to include __userid__ cookie.'
    );
  });
});
