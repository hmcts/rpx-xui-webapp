import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { expect, test } from '@playwright/test';

import { __test__ as sessionCaptureTest, loadSessionCookies } from '../../common/sessionCapture.js';
import { resolveSessionIdentity, resolveSessionStorageKey } from '../../common/sessionIdentity.js';
import { SessionCaptureError } from '../utils/errors.js';

const poolEnvironment = {
  STAFF_ADMIN_POOL_ENABLED: 'true',
  STAFF_ADMIN_1_USERNAME: 'staff-admin-1@example.test',
  STAFF_ADMIN_1_PASSWORD: 'secret-1',
  STAFF_ADMIN_2_USERNAME: 'staff-admin-2@example.test',
  STAFF_ADMIN_2_PASSWORD: 'secret-2',
  STAFF_ADMIN_3_USERNAME: 'staff-admin-3@example.test',
  STAFF_ADMIN_3_PASSWORD: 'secret-3',
  STAFF_ADMIN_4_USERNAME: '',
  STAFF_ADMIN_4_PASSWORD: '',
  STAFF_ADMIN_5_USERNAME: '',
  STAFF_ADMIN_5_PASSWORD: '',
  STAFF_ADMIN_6_USERNAME: '',
  STAFF_ADMIN_6_PASSWORD: '',
  STAFF_ADMIN_7_USERNAME: '',
  STAFF_ADMIN_7_PASSWORD: '',
  STAFF_ADMIN_8_USERNAME: '',
  STAFF_ADMIN_8_PASSWORD: '',
} as const;

test.describe.configure({ mode: 'parallel' });

for (const fallback of [false, true]) {
  test(`legacy pooled session load preserves the ${fallback ? 'fallback' : 'primary'} selected by the active worker`, async ({
    request,
  }, testInfo) => {
    void request;
    const tempDir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'session-legacy-pool-worker-unit-')));
    const previousCwd = process.cwd();
    const environmentKeys = [...Object.keys(poolEnvironment), 'TEST_PARALLEL_INDEX', 'TEST_WORKER_INDEX'];
    const previousValues = Object.fromEntries(environmentKeys.map((key) => [key, process.env[key]]));

    try {
      Object.assign(process.env, poolEnvironment);
      delete process.env.TEST_PARALLEL_INDEX;
      delete process.env.TEST_WORKER_INDEX;
      process.chdir(tempDir);

      const candidates = sessionCaptureTest.resolveSessionCandidates('STAFF_ADMIN');
      const primaryIdentity = resolveSessionIdentity(candidates[0]);
      const expectedPrimary = `STAFF_ADMIN-${(testInfo.parallelIndex % 3) + 1}`;
      expect(primaryIdentity.userIdentifier).toBe(expectedPrimary);

      await sessionCaptureTest.ensureSessionWith(
        'STAFF_ADMIN',
        async (identity) => {
          if (fallback && identity.userIdentifier !== 'STAFF_ADMIN-3') {
            throw new SessionCaptureError(
              'Login failed: IDAM page message: Email or password is incorrect',
              identity.userIdentifier
            );
          }

          const storagePath = path.join(tempDir, '.sessions', `${resolveSessionStorageKey(identity)}.storage.json`);
          fs.mkdirSync(path.dirname(storagePath), { recursive: true });
          fs.writeFileSync(storagePath, JSON.stringify({ cookies: [{ name: 'Idam.Session', value: identity.userIdentifier }] }));
        },
        candidates
      );

      const selectedIdentity = fallback ? resolveSessionIdentity('STAFF_ADMIN-3') : primaryIdentity;
      const selectionPath = sessionCaptureTest.resolveSessionSelectionPath(candidates);
      expect(selectionPath).toBeDefined();
      expect(JSON.parse(fs.readFileSync(selectionPath!, 'utf8'))).toEqual({
        selectedUserIdentifier: selectedIdentity.userIdentifier,
        selectedEmail: selectedIdentity.email.toLowerCase(),
      });
      expect(loadSessionCookies('STAFF_ADMIN')).toMatchObject({ userIdentifier: selectedIdentity.userIdentifier });
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
      for (const [key, value] of Object.entries(previousValues)) {
        if (value === undefined) {
          delete process.env[key];
        } else {
          process.env[key] = value;
        }
      }
    }
  });
}

test('legacy pooled session loading ignores unreadable and obsolete selection receipts', ({ request }, testInfo) => {
  void request;
  const tempDir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'session-legacy-pool-receipt-unit-')));
  const previousCwd = process.cwd();
  const environmentKeys = [...Object.keys(poolEnvironment), 'TEST_PARALLEL_INDEX', 'TEST_WORKER_INDEX'];
  const previousValues = Object.fromEntries(environmentKeys.map((key) => [key, process.env[key]]));

  try {
    Object.assign(process.env, poolEnvironment);
    delete process.env.TEST_PARALLEL_INDEX;
    delete process.env.TEST_WORKER_INDEX;
    process.chdir(tempDir);

    const candidates = sessionCaptureTest.resolveSessionCandidates('STAFF_ADMIN');
    const primaryIdentity = resolveSessionIdentity(candidates[0]);
    const selectionPath = sessionCaptureTest.resolveSessionSelectionPath(candidates);
    expect(selectionPath).toBeDefined();

    const storagePath = path.join(tempDir, '.sessions', `${resolveSessionStorageKey(primaryIdentity)}.storage.json`);
    fs.mkdirSync(path.dirname(storagePath), { recursive: true });
    fs.writeFileSync(storagePath, JSON.stringify({ cookies: [{ name: 'Idam.Session', value: primaryIdentity.userIdentifier }] }));

    for (const receipt of [
      '{',
      JSON.stringify({ selectedUserIdentifier: 'STAFF_ADMIN-4', selectedEmail: 'staff-admin-4@example.test' }),
    ]) {
      fs.writeFileSync(selectionPath!, receipt);
      expect(loadSessionCookies('STAFF_ADMIN')).toMatchObject({ userIdentifier: primaryIdentity.userIdentifier });
    }

    const collidingPrimaryCandidates = sessionCaptureTest.resolveSessionCandidates('STAFF_ADMIN', testInfo.parallelIndex + 3);
    expect(resolveSessionIdentity(collidingPrimaryCandidates[0])).toMatchObject({
      userIdentifier: primaryIdentity.userIdentifier,
    });
    expect(sessionCaptureTest.resolveSessionSelectionPath(candidates, testInfo.parallelIndex)).not.toBe(
      sessionCaptureTest.resolveSessionSelectionPath(collidingPrimaryCandidates, testInfo.parallelIndex + 3)
    );
  } finally {
    process.chdir(previousCwd);
    fs.rmSync(tempDir, { recursive: true, force: true });
    for (const [key, value] of Object.entries(previousValues)) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
});
