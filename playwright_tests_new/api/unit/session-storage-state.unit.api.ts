import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { expect, test } from '@playwright/test';
import type { Cookie } from 'playwright-core';

import {
  isStoredSessionFresh,
  loadStoredSession,
  persistSession,
  readStorageStateFingerprint,
  storageStateFingerprint,
} from '../../common/sessionStorageState.js';

const cookie = (name: string, value: string, domain: string): Cookie => ({
  name,
  value,
  domain,
  path: '/',
  expires: -1,
  httpOnly: true,
  secure: true,
  sameSite: 'Lax',
});

test.describe('session storage state', { tag: '@svc-internal' }, () => {
  test('loads a fingerprinted session and accepts only compatible authentication cookies', () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'session-storage-state-'));
    const storageFile = path.join(directory, 'state.json');
    const contents = JSON.stringify({
      cookies: [
        cookie('Idam.Session', 'idam-session', 'idam.example.test'),
        cookie('__auth__', 'xui-session', 'manage.example.test'),
      ],
    });

    try {
      fs.writeFileSync(storageFile, contents, 'utf8');

      expect(loadStoredSession({ userIdentifier: 'UNIT_USER', email: 'unit@example.test' }, storageFile)).toMatchObject({
        userIdentifier: 'UNIT_USER',
        storageStateFingerprint: storageStateFingerprint(contents),
      });
      expect(readStorageStateFingerprint(fs, storageFile)).toBe(storageStateFingerprint(contents));
      expect(
        isStoredSessionFresh(storageFile, 60_000, {
          targetUrl: 'https://manage.example.test',
          idamUrl: 'https://idam.example.test',
        })
      ).toBe(true);
      expect(
        isStoredSessionFresh(storageFile, 60_000, {
          targetUrl: 'https://other.example.test',
          idamUrl: 'https://idam.example.test',
        })
      ).toBe(false);

      const staleAt = Date.now() - 61_000;
      fs.utimesSync(storageFile, staleAt / 1_000, staleAt / 1_000);
      expect(isStoredSessionFresh(storageFile, 60_000)).toBe(false);
    } finally {
      fs.rmSync(directory, { recursive: true, force: true });
    }
  });

  test('rejects malformed state and removes a failed persistence staging file', async () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'session-storage-state-'));
    const storageFile = path.join(directory, 'state.json');
    const originalNow = Date.now;
    Date.now = () => 1_700_000_000_000;

    try {
      fs.writeFileSync(storageFile, JSON.stringify({ cookies: {} }), 'utf8');
      expect(() => loadStoredSession({ userIdentifier: 'UNIT_USER', email: 'unit@example.test' }, storageFile)).toThrow(
        'Storage file corrupted'
      );

      await expect(
        persistSession(
          storageFile,
          [cookie('__auth__', 'session', 'manage.example.test')],
          {
            addCookies: async () => {},
            storageState: async () => {
              throw new Error('storage state failed');
            },
          },
          'UNIT_USER',
          {
            cookieUtils: {
              writeManageCasesSession: (stagePath: string, cookies: Cookie[]) => {
                fs.writeFileSync(stagePath, JSON.stringify({ cookies }), 'utf8');
              },
            } as never,
          }
        )
      ).rejects.toThrow('storage state failed');

      expect(fs.existsSync(`${storageFile}.${process.pid}.${Date.now()}.tmp`)).toBe(false);
    } finally {
      Date.now = originalNow;
      fs.rmSync(directory, { recursive: true, force: true });
    }
  });
});
