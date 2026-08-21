import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { expect, test } from '@playwright/test';

import config from '../../E2E/utils/config.utils.js';
import { applySessionCookiesAndExtractUserId } from '../../integration/helpers/sessionUser.helper.js';
import {
  getConfiguredStaffAdminUserIdentifiers,
  getLegacyStaffAdminSessionIdentity,
  resolveStaffAdminSessionCandidates,
  resolveStaffAdminUserIdentifier,
  STAFF_ADMIN_USER,
} from '../../common/staffAdminUserPool.js';
import { resolveSessionIdentity, resolveSessionStorageKey } from '../../common/sessionIdentity.js';

const staffAdminPoolCredentialEnvKeys = [
  'STAFF_ADMIN_1_USERNAME',
  'STAFF_ADMIN_1_PASSWORD',
  'STAFF_ADMIN_2_USERNAME',
  'STAFF_ADMIN_2_PASSWORD',
  'STAFF_ADMIN_3_USERNAME',
  'STAFF_ADMIN_3_PASSWORD',
  'STAFF_ADMIN_4_USERNAME',
  'STAFF_ADMIN_4_PASSWORD',
  'STAFF_ADMIN_5_USERNAME',
  'STAFF_ADMIN_5_PASSWORD',
  'STAFF_ADMIN_6_USERNAME',
  'STAFF_ADMIN_6_PASSWORD',
  'STAFF_ADMIN_7_USERNAME',
  'STAFF_ADMIN_7_PASSWORD',
  'STAFF_ADMIN_8_USERNAME',
  'STAFF_ADMIN_8_PASSWORD',
] as const;

const configuredEnv = {
  STAFF_ADMIN_POOL_ENABLED: 'true',
  STAFF_ADMIN_1_USERNAME: 'staff-admin-1@example.test',
  STAFF_ADMIN_1_PASSWORD: 'secret-1',
  STAFF_ADMIN_2_USERNAME: 'staff-admin-2@example.test',
  STAFF_ADMIN_2_PASSWORD: 'secret-2',
  STAFF_ADMIN_3_USERNAME: 'staff-admin-3@example.test',
  STAFF_ADMIN_3_PASSWORD: 'secret-3',
  STAFF_ADMIN_4_USERNAME: 'staff-admin-4@example.test',
  STAFF_ADMIN_4_PASSWORD: 'secret-4',
  STAFF_ADMIN_5_USERNAME: 'staff-admin-5@example.test',
  STAFF_ADMIN_5_PASSWORD: 'secret-5',
  STAFF_ADMIN_6_USERNAME: 'staff-admin-6@example.test',
  STAFF_ADMIN_6_PASSWORD: 'secret-6',
  STAFF_ADMIN_7_USERNAME: 'staff-admin-7@example.test',
  STAFF_ADMIN_7_PASSWORD: 'secret-7',
  STAFF_ADMIN_8_USERNAME: 'staff-admin-8@example.test',
  STAFF_ADMIN_8_PASSWORD: 'secret-8',
};

test.describe('Staff admin user pool unit tests', { tag: '@svc-internal' }, () => {
  test('falls back to the legacy staff admin user when no pooled users are configured', () => {
    expect(getConfiguredStaffAdminUserIdentifiers({})).toEqual([]);
    expect(resolveStaffAdminUserIdentifier(STAFF_ADMIN_USER, { parallelIndex: 3 }, {})).toBe(STAFF_ADMIN_USER);
  });

  test('returns only fully configured pooled users', () => {
    const env = {
      STAFF_ADMIN_POOL_ENABLED: 'true',
      STAFF_ADMIN_1_USERNAME: 'staff-admin-1@example.test',
      STAFF_ADMIN_1_PASSWORD: 'secret-1',
      STAFF_ADMIN_2_USERNAME: 'staff-admin-2@example.test',
      STAFF_ADMIN_3_PASSWORD: 'secret-3',
    };

    expect(getConfiguredStaffAdminUserIdentifiers(env)).toEqual(['STAFF_ADMIN-1']);
  });

  test('uses configured pooled users without requiring an enable flag', () => {
    const env = {
      STAFF_ADMIN_1_USERNAME: 'staff-admin-1@example.test',
      STAFF_ADMIN_1_PASSWORD: 'secret-1',
    };

    expect(getConfiguredStaffAdminUserIdentifiers(env)).toEqual(['STAFF_ADMIN-1']);
    expect(resolveStaffAdminUserIdentifier(STAFF_ADMIN_USER, { parallelIndex: 0 }, env)).toBe('STAFF_ADMIN-1');
  });

  test('honours an explicit pool opt-out', () => {
    const env = {
      STAFF_ADMIN_POOL_ENABLED: 'false',
      STAFF_ADMIN_1_USERNAME: 'staff-admin-1@example.test',
      STAFF_ADMIN_1_PASSWORD: 'secret-1',
    };

    expect(getConfiguredStaffAdminUserIdentifiers(env)).toEqual([]);
    expect(resolveStaffAdminUserIdentifier(STAFF_ADMIN_USER, { parallelIndex: 0 }, env)).toBe(STAFF_ADMIN_USER);
  });

  test('distributes configured pooled users by parallel index', () => {
    expect(resolveStaffAdminUserIdentifier(STAFF_ADMIN_USER, { parallelIndex: 0 }, configuredEnv)).toBe('STAFF_ADMIN-1');
    expect(resolveStaffAdminUserIdentifier(STAFF_ADMIN_USER, { parallelIndex: 1 }, configuredEnv)).toBe('STAFF_ADMIN-2');
    expect(resolveStaffAdminUserIdentifier(STAFF_ADMIN_USER, { parallelIndex: 2 }, configuredEnv)).toBe('STAFF_ADMIN-3');
    expect(resolveStaffAdminUserIdentifier(STAFF_ADMIN_USER, { parallelIndex: 3 }, configuredEnv)).toBe('STAFF_ADMIN-4');
    expect(resolveStaffAdminUserIdentifier(STAFF_ADMIN_USER, { parallelIndex: 4 }, configuredEnv)).toBe('STAFF_ADMIN-5');
    expect(resolveStaffAdminUserIdentifier(STAFF_ADMIN_USER, { parallelIndex: 7 }, configuredEnv)).toBe('STAFF_ADMIN-8');
    expect(resolveStaffAdminUserIdentifier(STAFF_ADMIN_USER, { parallelIndex: 8 }, configuredEnv)).toBe('STAFF_ADMIN-1');
  });

  test('honours an explicit zero parallel index over a configured environment index', () => {
    expect(
      resolveStaffAdminUserIdentifier(STAFF_ADMIN_USER, { parallelIndex: 0 }, { ...configuredEnv, TEST_PARALLEL_INDEX: '2' })
    ).toBe('STAFF_ADMIN-1');
  });

  test('keeps non-staff-admin user identifiers unchanged', () => {
    expect(resolveStaffAdminUserIdentifier('SOLICITOR', { parallelIndex: 1 }, configuredEnv)).toBe('SOLICITOR');
  });

  test('normalises a staff admin alias before resolving a pool or legacy identity', () => {
    expect(resolveStaffAdminUserIdentifier(' staff_admin ', { parallelIndex: 1 }, configuredEnv)).toBe('STAFF_ADMIN-2');
    expect(resolveStaffAdminUserIdentifier(' staff_admin ', undefined, {})).toBe(STAFF_ADMIN_USER);
  });

  test('creates an explicit legacy staff admin session identity that bypasses pool resolution', () => {
    const identity = getLegacyStaffAdminSessionIdentity({
      getUserCredentials: (userIdentifier: string) => {
        expect(userIdentifier).toBe(STAFF_ADMIN_USER);
        return { email: 'legacy-staff-admin@example.test', password: 'legacy-secret' };
      },
    } as never);

    expect(identity).toEqual({
      userIdentifier: STAFF_ADMIN_USER,
      email: 'legacy-staff-admin@example.test',
      password: 'legacy-secret',
    });
    expect(resolveSessionIdentity(identity).userIdentifier).toBe(STAFF_ADMIN_USER);
  });

  test('returns configured session candidates in worker-selected-first order', () => {
    expect(resolveStaffAdminSessionCandidates({ parallelIndex: 2 }, configuredEnv as NodeJS.ProcessEnv)).toEqual([
      'STAFF_ADMIN-3',
      'STAFF_ADMIN-1',
      'STAFF_ADMIN-2',
      'STAFF_ADMIN-4',
      'STAFF_ADMIN-5',
      'STAFF_ADMIN-6',
      'STAFF_ADMIN-7',
      'STAFF_ADMIN-8',
    ]);
  });

  test('preserves pooled resolution for the legacy staff admin alias', () => {
    const previousEnv: Record<string, string | undefined> = {
      STAFF_ADMIN_POOL_ENABLED: process.env.STAFF_ADMIN_POOL_ENABLED,
      TEST_PARALLEL_INDEX: process.env.TEST_PARALLEL_INDEX,
      PW_SESSION_REUSE_VALIDATION_MODE: process.env.PW_SESSION_REUSE_VALIDATION_MODE,
    };
    for (const key of staffAdminPoolCredentialEnvKeys) {
      previousEnv[key] = process.env[key];
      delete process.env[key];
    }

    try {
      process.env.STAFF_ADMIN_POOL_ENABLED = 'true';
      process.env.STAFF_ADMIN_2_USERNAME = 'staff-admin-2@example.test';
      process.env.STAFF_ADMIN_2_PASSWORD = 'secret-2';
      process.env.TEST_PARALLEL_INDEX = '1';

      const resolvedUserIdentifiers: string[] = [];
      const identity = resolveSessionIdentity('STAFF_ADMIN', {
        userUtils: {
          getUserCredentials: (userIdentifier: string) => {
            resolvedUserIdentifiers.push(userIdentifier);
            return { email: `${userIdentifier.toLowerCase()}@example.test`, password: 'secret' };
          },
        } as never,
      });

      expect(resolvedUserIdentifiers).toEqual(['STAFF_ADMIN-2']);
      expect(identity.userIdentifier).toBe('STAFF_ADMIN-2');
      expect(identity.email).toBe('staff_admin-2@example.test');
      expect(
        resolveSessionStorageKey('STAFF_ADMIN', {
          userUtils: {
            getUserCredentials: () => ({ email: 'staff_admin-2@example.test', password: 'secret' }),
          } as never,
        })
      ).toBe(resolveSessionStorageKey(identity));
    } finally {
      for (const [key, value] of Object.entries(previousEnv)) {
        if (typeof value === 'string') {
          process.env[key] = value;
        } else {
          delete process.env[key];
        }
      }
    }
  });

  test('propagates the resolved pooled identity through the public session cookie path', async () => {
    const tempDir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'staff-admin-public-session-')));
    const previousCwd = process.cwd();
    const previousEnv: Record<string, string | undefined> = {
      STAFF_ADMIN_POOL_ENABLED: process.env.STAFF_ADMIN_POOL_ENABLED,
      TEST_PARALLEL_INDEX: process.env.TEST_PARALLEL_INDEX,
    };
    for (const key of staffAdminPoolCredentialEnvKeys) {
      previousEnv[key] = process.env[key];
      delete process.env[key];
    }

    try {
      process.env.STAFF_ADMIN_POOL_ENABLED = 'true';
      process.env.STAFF_ADMIN_2_USERNAME = 'staff-admin-2@example.test';
      process.env.STAFF_ADMIN_2_PASSWORD = 'secret-2';
      process.env.TEST_PARALLEL_INDEX = '1';
      // This is a storage-state/cookie unit contract, not an auth endpoint test.
      process.env.PW_SESSION_REUSE_VALIDATION_MODE = 'best-effort';
      process.chdir(tempDir);

      const identity = resolveSessionIdentity('STAFF_ADMIN');
      const sessionsDir = path.join(tempDir, '.sessions');
      const storageFile = path.join(sessionsDir, `${resolveSessionStorageKey(identity)}.storage.json`);
      const exuiHost = new URL(process.env.TEST_URL ?? config.urls.exuiDefaultUrl).hostname;
      const idamHost = new URL(config.urls.idamWebUrl).hostname;
      const cookies = [
        { name: 'Idam.Session', value: 'idam-session', domain: idamHost, path: '/', expires: -1 },
        { name: '__auth__', value: 'auth-session', domain: exuiHost, path: '/', expires: -1 },
        { name: '__userid__', value: 'staff-admin-user-id', domain: exuiHost, path: '/', expires: -1 },
      ];
      fs.mkdirSync(sessionsDir, { recursive: true });
      fs.writeFileSync(storageFile, JSON.stringify({ cookies }));

      const appliedCookies: unknown[] = [];
      const page = {
        context: () => ({
          addCookies: async (values: unknown[]) => appliedCookies.push(...values),
        }),
      } as never;

      await expect(applySessionCookiesAndExtractUserId(page, 'STAFF_ADMIN')).resolves.toBe('staff-admin-user-id');
      expect(identity.userIdentifier).toBe('STAFF_ADMIN-2');
      expect(appliedCookies).toEqual(cookies);
      expect(test.info().annotations).toContainEqual({ type: 'session-user', description: 'STAFF_ADMIN-2' });
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
      for (const [key, value] of Object.entries(previousEnv)) {
        if (typeof value === 'string') {
          process.env[key] = value;
        } else {
          delete process.env[key];
        }
      }
    }
  });
});
