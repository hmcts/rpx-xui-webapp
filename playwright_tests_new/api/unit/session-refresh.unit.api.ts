import fs from 'node:fs';
import { expect, test } from '@playwright/test';

import { applySessionCookies, __test__ as sessionTest } from '../../common/sessionCapture.js';
import { SessionCaptureError } from '../utils/errors.js';
import { withEnv } from '../utils/testEnv.js';
import { createSessionRefreshHarness } from './session-refresh.mock.js';

test.describe.configure({ mode: 'default' });

const refreshTest = test.extend<{ refresh: ReturnType<typeof createSessionRefreshHarness> }>({
  refresh: async ({ browserName: _browserName }, use) => {
    void _browserName;
    const refresh = createSessionRefreshHarness();
    try {
      await withEnv({ TEST_URL: undefined }, () => use(refresh));
    } finally {
      refresh.restore();
    }
  },
});

refreshTest.describe('Public session refresh identity', { tag: '@svc-internal' }, () => {
  for (const sessionKey of [undefined, 'explicit-refresh-key']) {
    refreshTest(`retains explicit account identity on refresh (${sessionKey ?? 'email key'})`, async ({ refresh }) => {
      const identity = { userIdentifier: 'SHARED_ALIAS', email: 'a@example.test', password: 'dummy', sessionKey };
      const other = { ...identity, email: 'b@example.test', password: 'other-dummy' };
      refresh.credentials.withArgs('SHARED_ALIAS').returns(other);
      fs.writeFileSync(refresh.storagePath(other), refresh.state('other-account'));
      refresh.replaceRejectedState(identity);

      const loaded = await applySessionCookies(refresh.page, identity);

      expect(loaded).toMatchObject({ email: identity.email, storageFile: refresh.storagePath(identity) });
      expect(loaded.cookies.map((cookie) => cookie.value)).toEqual(['newer', 'newer']);
      expect(refresh.addCookies.args).toEqual([[loaded.cookies]]);
      expect(refresh.contexts.args.map(([options]) => options?.storageState)).toEqual([
        refresh.storagePath(identity),
        refresh.storagePath(identity),
      ]);
      expect(refresh.get.args.map(([url]) => url)).toEqual(['/auth/isAuthenticated', '/auth/isAuthenticated']);
      expect(fs.readFileSync(refresh.storagePath(other), 'utf8')).toBe(refresh.state('other-account'));
      expect(fs.existsSync(refresh.lockPath(identity))).toBe(true);
      expect(fs.existsSync(`${refresh.lockPath(identity)}.lock`)).toBe(false);
      expect(fs.existsSync(refresh.lockPath(other))).toBe(false);
      expect(refresh.credentials.called).toBe(false);
      expect(refresh.launch.called).toBe(false);
      expect(refresh.dispose.callCount).toBe(2);
    });
  }

  refreshTest('fails closed when the refreshed explicit session is also rejected', async ({ refresh }) => {
    const identity = { userIdentifier: 'UNREGISTERED', email: 'a@example.test', password: 'dummy', sessionKey: 'explicit' };
    refresh.replaceRejectedState(identity, false);

    await expect(applySessionCookies(refresh.page, identity)).rejects.toMatchObject({
      name: 'SessionCaptureError',
      userIdentifier: identity.userIdentifier,
      message: `Refreshed session was rejected by auth/isAuthenticated for ${identity.userIdentifier}`,
    });
    expect(refresh.addCookies.called).toBe(false);
    expect(refresh.get.callCount).toBe(2);
    expect(refresh.launch.called).toBe(false);
    expect(fs.existsSync(`${refresh.lockPath(identity)}.lock`)).toBe(false);
  });

  refreshTest(
    'refreshes the selected string-pool fallback rather than restarting at the primary',
    async ({ refresh }, testInfo) => {
      await withEnv(
        {
          STAFF_ADMIN_POOL_ENABLED: 'true',
          STAFF_ADMIN_1_USERNAME: 'first@example.test',
          STAFF_ADMIN_1_PASSWORD: 'dummy',
          STAFF_ADMIN_2_USERNAME: 'second@example.test',
          STAFF_ADMIN_2_PASSWORD: 'dummy',
          ...Object.fromEntries([3, 4, 5, 6, 7, 8].map((index) => [`STAFF_ADMIN_${index}_USERNAME`, undefined])),
        },
        async () => {
          const identities = [
            { userIdentifier: 'STAFF_ADMIN-1', email: 'first@example.test', password: 'dummy' },
            { userIdentifier: 'STAFF_ADMIN-2', email: 'second@example.test', password: 'dummy' },
          ];
          const primary = identities[testInfo.parallelIndex % identities.length];
          const selected = identities[(testInfo.parallelIndex + 1) % identities.length];
          refresh.credentials.withArgs(primary.userIdentifier).returns(primary);
          refresh.credentials.withArgs(selected.userIdentifier).returns(selected);
          refresh.rejectCapture(primary);
          refresh.replaceRejectedState(selected);

          const loaded = await applySessionCookies(refresh.page, 'STAFF_ADMIN');

          expect(loaded).toMatchObject({ userIdentifier: selected.userIdentifier, storageFile: refresh.storagePath(selected) });
          expect(loaded.cookies.map((cookie) => cookie.value)).toEqual(['newer', 'newer']);
          expect(refresh.contexts.args.map(([options]) => options?.storageState)).toEqual([
            refresh.storagePath(selected),
            refresh.storagePath(selected),
          ]);
          expect(refresh.addCookies.args).toEqual([[loaded.cookies]]);
          expect(refresh.launch.called).toBe(false);
        }
      );
    }
  );

  for (const fresh of [true, false]) {
    refreshTest(`reports the account when unavailable validation has no optional identifier (fresh=${fresh})`, async () => {
      const session = {
        email: 'a@example.test',
        cookies: [],
        storageFile: '/synthetic/state.json',
        storageStateFingerprint: 'synthetic',
      };
      await expect(
        sessionTest.validateLoadedSessionForReuse(
          session,
          'https://example.test',
          async () => 'unavailable',
          { PW_SESSION_REUSE_VALIDATION_MODE: fresh ? 'strict' : 'best-effort' },
          () => fresh
        )
      ).rejects.toMatchObject({ name: SessionCaptureError.name, userIdentifier: session.email });
    });
  }
});
