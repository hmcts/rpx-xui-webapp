import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { expect, test } from '@playwright/test';

import { __test__ as sessionStorageTest } from '../../E2E/utils/session-storage.utils.js';
import { __test__ as sessionCaptureTest } from '../../common/sessionCapture.js';
import { resolveUiStoragePathForUser, writeUiStorageMetadata } from '../../E2E/utils/storage-state.utils.js';

test.describe('Session management hardening unit tests', { tag: '@svc-internal' }, () => {
  test('confirmAuthenticatedLogin accepts auth-cookie based success for fallback IDAM login', async () => {
    const infoCalls: Array<Record<string, unknown>> = [];

    await expect(
      sessionCaptureTest.confirmAuthenticatedLogin({} as never, 'DYNAMIC_SOLICITOR', 'dynamic@example.test', '/login', 1, {
        acceptCookies: async () => undefined,
        waitForShell: async () => null,
        waitForAuthCookies: async () => true,
        info: (_message, meta) => {
          infoCalls.push(meta);
        },
      })
    ).resolves.toBeUndefined();

    expect(infoCalls).toEqual([
      expect.objectContaining({
        userIdentifier: 'DYNAMIC_SOLICITOR',
        marker: 'auth-cookies',
      }),
    ]);
  });

  test('confirmAuthenticatedLogin rejects when login establishes neither shell nor auth cookies', async () => {
    await expect(
      sessionCaptureTest.confirmAuthenticatedLogin({} as never, 'DYNAMIC_SOLICITOR', 'dynamic@example.test', '/login', 1, {
        acceptCookies: async () => undefined,
        waitForShell: async () => null,
        waitForAuthCookies: async () => false,
        info: () => undefined,
      })
    ).rejects.toThrow(/did not establish authenticated session/i);
  });

  test('strict storage reuse refreshes when the cached state is no longer authenticated server-side', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-storage-unit-'));
    const storagePath = path.join(tempDir, 'storage.json');

    try {
      fs.writeFileSync(
        storagePath,
        JSON.stringify({
          cookies: [
            { name: 'Idam.Session', value: 'session', expires: Math.floor(Date.now() / 1000) + 600 },
            { name: '__auth__', value: 'auth', expires: Math.floor(Date.now() / 1000) + 600 },
          ],
        })
      );

      const shouldRefresh = await sessionStorageTest.shouldRefreshStorageState(storagePath, 'https://example.test', {
        ignoreTtl: true,
        validateAuthenticatedState: async () => false,
      });

      expect(shouldRefresh).toBe(true);
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('storage path is keyed by the resolved runtime email, not just the alias', () => {
    const firstPath = resolveUiStoragePathForUser('SOLICITOR', { email: 'first@example.test' });
    const secondPath = resolveUiStoragePathForUser('SOLICITOR', { email: 'second@example.test' });

    expect(firstPath).not.toBe(secondPath);
    expect(firstPath).toContain('solicitor-first-example-test');
    expect(secondPath).toContain('solicitor-second-example-test');
  });

  test('storage reuse refreshes when cached metadata belongs to a different resolved email for the same alias', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-storage-unit-'));
    const storagePath = path.join(tempDir, 'storage.json');

    try {
      fs.writeFileSync(
        storagePath,
        JSON.stringify({
          cookies: [
            { name: 'Idam.Session', value: 'session', expires: Math.floor(Date.now() / 1000) + 600 },
            { name: '__auth__', value: 'auth', expires: Math.floor(Date.now() / 1000) + 600 },
          ],
        })
      );
      writeUiStorageMetadata(storagePath, {
        userIdentifier: 'SOLICITOR',
        email: 'stale@example.test',
      });

      const shouldRefresh = await sessionStorageTest.shouldRefreshStorageState(storagePath, 'https://example.test', {
        ignoreTtl: true,
        validateAuthenticatedState: async () => true,
        expectedIdentity: {
          userIdentifier: 'SOLICITOR',
          email: 'fresh@example.test',
        },
      });

      expect(shouldRefresh).toBe(true);
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });
});
