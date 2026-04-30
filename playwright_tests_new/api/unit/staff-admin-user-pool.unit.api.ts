import { expect, test } from '@playwright/test';

import {
  getConfiguredStaffAdminUserIdentifiers,
  resolveStaffAdminUserIdentifier,
  STAFF_ADMIN_USER,
} from '../../common/staffAdminUserPool.js';
import { resolveSessionIdentity } from '../../common/sessionIdentity.js';

const configuredEnv = {
  STAFF_ADMIN_1_USERNAME: 'staff-admin-1@example.test',
  STAFF_ADMIN_1_PASSWORD: 'secret-1',
  STAFF_ADMIN_2_USERNAME: 'staff-admin-2@example.test',
  STAFF_ADMIN_2_PASSWORD: 'secret-2',
  STAFF_ADMIN_3_USERNAME: 'staff-admin-3@example.test',
  STAFF_ADMIN_3_PASSWORD: 'secret-3',
  STAFF_ADMIN_4_USERNAME: 'staff-admin-4@example.test',
  STAFF_ADMIN_4_PASSWORD: 'secret-4',
};

test.describe('Staff admin user pool unit tests', { tag: '@svc-internal' }, () => {
  test('falls back to the legacy staff admin user when no pooled users are configured', () => {
    expect(getConfiguredStaffAdminUserIdentifiers({})).toEqual([]);
    expect(resolveStaffAdminUserIdentifier(STAFF_ADMIN_USER, { parallelIndex: 3 }, {})).toBe(STAFF_ADMIN_USER);
  });

  test('returns only fully configured pooled users', () => {
    const env = {
      STAFF_ADMIN_1_USERNAME: 'staff-admin-1@example.test',
      STAFF_ADMIN_1_PASSWORD: 'secret-1',
      STAFF_ADMIN_2_USERNAME: 'staff-admin-2@example.test',
      STAFF_ADMIN_3_PASSWORD: 'secret-3',
    };

    expect(getConfiguredStaffAdminUserIdentifiers(env)).toEqual(['STAFF_ADMIN-1']);
  });

  test('selects configured pooled users by Playwright parallel index', () => {
    expect(resolveStaffAdminUserIdentifier(STAFF_ADMIN_USER, { parallelIndex: 0 }, configuredEnv)).toBe('STAFF_ADMIN-1');
    expect(resolveStaffAdminUserIdentifier(STAFF_ADMIN_USER, { parallelIndex: 1 }, configuredEnv)).toBe('STAFF_ADMIN-2');
    expect(resolveStaffAdminUserIdentifier(STAFF_ADMIN_USER, { parallelIndex: 2 }, configuredEnv)).toBe('STAFF_ADMIN-3');
    expect(resolveStaffAdminUserIdentifier(STAFF_ADMIN_USER, { parallelIndex: 3 }, configuredEnv)).toBe('STAFF_ADMIN-4');
    expect(resolveStaffAdminUserIdentifier(STAFF_ADMIN_USER, { parallelIndex: 4 }, configuredEnv)).toBe('STAFF_ADMIN-1');
  });

  test('keeps non-staff-admin user identifiers unchanged', () => {
    expect(resolveStaffAdminUserIdentifier('SOLICITOR', { parallelIndex: 1 }, configuredEnv)).toBe('SOLICITOR');
  });

  test('routes legacy STAFF_ADMIN session identity through the configured pool', () => {
    const previousEnv = {
      STAFF_ADMIN_2_USERNAME: process.env.STAFF_ADMIN_2_USERNAME,
      STAFF_ADMIN_2_PASSWORD: process.env.STAFF_ADMIN_2_PASSWORD,
      TEST_PARALLEL_INDEX: process.env.TEST_PARALLEL_INDEX,
    };

    try {
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
});
