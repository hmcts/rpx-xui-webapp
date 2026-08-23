import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { expect, request, test } from '@playwright/test';

import { __test__ as sessionStorageTest } from '../../E2E/utils/session-storage.utils.js';
import { __test__ as sessionCaptureTest, loadSessionCookies, refreshRejectedSession } from '../../common/sessionCapture.js';
import { __test__ as sessionReuseValidationTest } from '../../common/sessionReuseValidation.js';
import { validateStoredSession } from '../../common/sessionReuseValidation.js';
import { withOrderedSessionFallback } from '../../common/orderedSessionFallback.js';
import { SERVICE_DOWN_SESSION_CAPTURE_FAILURE } from '../../common/sessionCaptureRetry.js';
import { resolveSessionStorageKey, type SessionIdentity } from '../../common/sessionIdentity.js';
import { resolveUiStoragePathForUser, writeUiStorageMetadata } from '../../E2E/utils/storage-state.utils.js';
import { SessionCaptureError } from '../utils/errors.js';

test.describe.configure({ mode: 'serial' });

function fakeSessionPage() {
  const locator = {
    first: () => locator,
    textContent: async () => '',
  };

  return {
    getByRole: () => locator,
    locator: () => locator,
    url: () => 'https://idam-web-public.aat.platform.hmcts.net/login',
  };
}

function hiddenLocator() {
  const locator = {
    first: () => locator,
    click: async () => undefined,
    fill: async () => undefined,
    isVisible: async () => false,
    press: async () => undefined,
  };
  return locator;
}

function visibleLocator(actions: string[], name: string, visible: () => boolean = () => true, onClick?: () => void) {
  const locator = {
    first: () => locator,
    click: async () => {
      actions.push(`${name}:click`);
      onClick?.();
    },
    fill: async (value: string) => {
      actions.push(`${name}:fill:${value}`);
    },
    isVisible: async () => visible(),
    press: async (key: string) => {
      actions.push(`${name}:press:${key}`);
    },
    textContent: async () => '',
    waitFor: async () => undefined,
  };
  return locator;
}

function fakeIdamPageObject({
  page,
  usernameInput,
  passwordInput,
  submitButton,
}: {
  page: unknown;
  usernameInput: unknown;
  passwordInput: unknown;
  submitButton: unknown;
}) {
  return {
    page,
    usernameInput,
    passwordInput,
    submitBtn: submitButton,
  };
}

function sessionUserIdentifier(identity: SessionIdentity | string): string {
  return typeof identity === 'string' ? identity : identity.userIdentifier;
}

type FakeLockOptions = { onCompromised: (error: Error) => void };

function fakeLockfile(
  onAcquire?: (lockPath: string, options: FakeLockOptions) => void,
  onRelease?: (lockPath: string, options: FakeLockOptions) => void
) {
  return {
    lock: async (lockPath: string, options: FakeLockOptions) => {
      const lockDirectoryPath = `${lockPath}.lock`;
      fs.mkdirSync(lockDirectoryPath);
      onAcquire?.(lockPath, options);
      return async () => {
        fs.rmSync(lockDirectoryPath, { recursive: true, force: true });
        onRelease?.(lockPath, options);
      };
    },
  } as never;
}

function releaseCompromisedLockfile() {
  return fakeLockfile(undefined, (_lockPath, options) => {
    options.onCompromised(new Error('lock ownership lost during release'));
  });
}

test.describe('Session management hardening unit tests', { tag: '@svc-internal' }, () => {
  test('accepts only the documented auth/isAuthenticated response shapes', () => {
    expect(sessionReuseValidationTest.parseAuthenticatedResponse('true')).toBe(true);
    expect(sessionReuseValidationTest.parseAuthenticatedResponse('{"isAuthenticated":true}')).toBe(true);
    expect(sessionReuseValidationTest.parseAuthenticatedResponse('false')).toBe(false);
    expect(sessionReuseValidationTest.parseAuthenticatedResponse('{"isAuthenticated":false}')).toBe(false);
    expect(sessionReuseValidationTest.parseAuthenticatedResponse('<html>login</html>')).toBe(false);
  });

  test('validates a reusable session once per storage fingerprint before reusing it', async () => {
    let contextCreations = 0;
    let authRequests = 0;
    let disposals = 0;
    const createRequestContext = async (options: Parameters<typeof request.newContext>[0]) => {
      contextCreations += 1;
      expect(options).toMatchObject({
        baseURL: 'https://manage-case.example.test',
        storageState: '/tmp/unit-session.storage.json',
      });
      return {
        get: async (url: string) => {
          authRequests += 1;
          expect(url).toBe('/auth/isAuthenticated');
          return {
            status: () => 200,
            text: async () => 'true',
          };
        },
        dispose: async () => {
          disposals += 1;
          throw new Error('request context close failed');
        },
      } as never;
    };
    const session = {
      storageFile: '/tmp/unit-session.storage.json',
      storageStateFingerprint: 'unit-authenticated-fingerprint',
    };

    await expect(validateStoredSession(session, 'https://manage-case.example.test', { createRequestContext })).resolves.toBe(
      'authenticated'
    );
    await expect(validateStoredSession(session, 'https://manage-case.example.test', { createRequestContext })).resolves.toBe(
      'authenticated'
    );

    expect(contextCreations).toBe(1);
    expect(authRequests).toBe(1);
    expect(disposals).toBe(1);
  });

  test('rejects a reusable session when auth/isAuthenticated is not authenticated', async () => {
    await expect(
      validateStoredSession(
        {
          storageFile: '/tmp/unit-rejected-session.storage.json',
          storageStateFingerprint: 'unit-rejected-fingerprint',
        },
        'https://manage-case.example.test',
        {
          createRequestContext: async () =>
            ({
              get: async () => ({ status: () => 200, text: async () => 'false' }),
              dispose: async () => undefined,
            }) as never,
        }
      )
    ).resolves.toBe('unauthenticated');
  });

  test('expands a staff admin alias to the worker-selected pool before applying cookies', async () => {
    const envOverrides = {
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
    const previousValues = Object.fromEntries(Object.keys(envOverrides).map((key) => [key, process.env[key]]));
    const attempts: string[] = [];

    try {
      Object.assign(process.env, envOverrides);
      const candidates = sessionCaptureTest.resolveSessionCandidates('STAFF_ADMIN');
      const selectedUserIdentifier = sessionUserIdentifier(candidates[0]);
      const fallbackUserIdentifier = sessionUserIdentifier(candidates[1]);

      const result = await sessionCaptureTest.applySessionCookiesFromPoolWith(
        {} as never,
        [' staff_admin '],
        async (_page, identityInput) => {
          const identity = identityInput as SessionIdentity;
          attempts.push(identity.userIdentifier);
          if (identity.userIdentifier === selectedUserIdentifier) {
            throw new SessionCaptureError(
              'Login failed: IDAM page message: Email or password is incorrect',
              identity.userIdentifier
            );
          }
          return {
            userIdentifier: identity.userIdentifier,
            email: identity.email,
            cookies: [],
            storageFile: `${identity.userIdentifier}.json`,
            storageStateFingerprint: `${identity.userIdentifier}-fingerprint`,
          };
        }
      );

      expect(attempts).toEqual([selectedUserIdentifier, fallbackUserIdentifier]);
      expect(result.userIdentifier).toBe(fallbackUserIdentifier);
    } finally {
      for (const [key, value] of Object.entries(previousValues)) {
        if (value === undefined) {
          delete process.env[key];
        } else {
          process.env[key] = value;
        }
      }
    }
  });

  test('uses the active Playwright test index for staff admin pool selection', ({ browserName: _browserName }, testInfo) => {
    void _browserName;
    const envOverrides = {
      STAFF_ADMIN_POOL_ENABLED: 'true',
      STAFF_ADMIN_1_USERNAME: 'staff-admin-1@example.test',
      STAFF_ADMIN_1_PASSWORD: 'secret-1',
      STAFF_ADMIN_2_USERNAME: 'staff-admin-2@example.test',
      STAFF_ADMIN_2_PASSWORD: 'secret-2',
      STAFF_ADMIN_3_USERNAME: '',
      STAFF_ADMIN_3_PASSWORD: '',
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
    };
    const previousValues = Object.fromEntries(Object.keys(envOverrides).map((key) => [key, process.env[key]]));

    try {
      Object.assign(process.env, envOverrides);
      const candidates = sessionCaptureTest.resolveSessionCandidates('STAFF_ADMIN');
      const selected = `STAFF_ADMIN-${(testInfo.parallelIndex % 2) + 1}`;

      expect(candidates.map((candidate) => (typeof candidate === 'string' ? candidate : candidate.userIdentifier))).toEqual([
        selected,
        selected === 'STAFF_ADMIN-1' ? 'STAFF_ADMIN-2' : 'STAFF_ADMIN-1',
      ]);
    } finally {
      for (const [key, value] of Object.entries(previousValues)) {
        if (value === undefined) {
          delete process.env[key];
        } else {
          process.env[key] = value;
        }
      }
    }
  });

  test('concurrent cold-cache requests perform one capture for the resolved identity', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-single-flight-unit-'));
    const previousCwd = process.cwd();
    let sessionFresh = false;
    let loginCount = 0;

    try {
      process.chdir(tempDir);
      const capture = () =>
        sessionCaptureTest.sessionCaptureWith(['UNIT_SHARED_USER'], {
          chromiumLauncher: {} as never,
          config: { urls: { exuiDefaultUrl: 'https://manage-case.example.test' } } as never,
          env: {},
          isSessionFresh: () => sessionFresh,
          loginAndPersistSession: async () => {
            loginCount += 1;
            await new Promise((resolve) => setTimeout(resolve, 50));
            sessionFresh = true;
          },
          resolveSessionIdentity: () => ({
            userIdentifier: 'UNIT_SHARED_USER',
            email: 'shared-user@example.test',
            password: 'not-used',
          }),
        });

      await expect(Promise.all(Array.from({ length: 12 }, () => capture()))).resolves.toHaveLength(12);
      expect(loginCount).toBe(1);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('does not delete a session another worker refreshed while the identity lock was pending', async () => {
    const tempDir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'session-compare-delete-unit-')));
    const previousCwd = process.cwd();
    const identity: SessionIdentity = {
      userIdentifier: 'UNIT_STALE_USER',
      email: 'stale-user@example.test',
      password: 'not-used',
      sessionKey: 'unit-stale-user',
    };
    const sessionsDir = path.join(tempDir, '.sessions');
    const sessionPath = path.join(sessionsDir, `${resolveSessionStorageKey(identity)}.storage.json`);
    const staleContents = JSON.stringify({ cookies: [{ name: 'stale', value: 'stale' }] });
    const refreshedContents = JSON.stringify({ cookies: [{ name: 'fresh', value: 'fresh' }] });
    let loginCount = 0;

    try {
      fs.mkdirSync(sessionsDir, { recursive: true });
      fs.writeFileSync(sessionPath, staleContents);
      process.chdir(tempDir);

      await sessionCaptureTest.sessionCaptureWith([identity], {
        chromiumLauncher: {} as never,
        config: { urls: { exuiDefaultUrl: 'https://manage-case.example.test' } } as never,
        env: {},
        expectedStaleSession: {
          storageFile: sessionPath,
          storageStateFingerprint: sessionCaptureTest.storageStateFingerprint(staleContents),
        },
        force: true,
        isSessionFresh: () => false,
        lockfile: fakeLockfile(() => fs.writeFileSync(sessionPath, refreshedContents)),
        loginAndPersistSession: async () => {
          loginCount += 1;
        },
        resolveSessionIdentity: () => identity,
      });

      expect(fs.readFileSync(sessionPath, 'utf8')).toBe(refreshedContents);
      expect(loginCount).toBe(0);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('public rejected-session refresh preserves a newer session', async () => {
    const tempDir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'session-public-refresh-unit-')));
    const previousCwd = process.cwd();
    const identity: SessionIdentity = {
      userIdentifier: 'UNIT_PUBLIC_REFRESH_USER',
      email: 'public-refresh@example.test',
      password: 'not-used',
      sessionKey: 'unit-public-refresh-user',
    };
    const sessionsDir = path.join(tempDir, '.sessions');
    const sessionPath = path.join(sessionsDir, `${resolveSessionStorageKey(identity)}.storage.json`);
    const staleContents = JSON.stringify({ cookies: [{ name: 'stale', value: 'stale' }] });
    const refreshedContents = JSON.stringify({ cookies: [{ name: 'fresh', value: 'fresh' }] });

    try {
      fs.mkdirSync(sessionsDir, { recursive: true });
      fs.writeFileSync(sessionPath, staleContents);
      process.chdir(tempDir);
      const rejectedSession = loadSessionCookies(identity);
      fs.writeFileSync(sessionPath, refreshedContents);

      await refreshRejectedSession(identity, rejectedSession);

      expect(fs.readFileSync(sessionPath, 'utf8')).toBe(refreshedContents);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('deletes the rejected session under the identity lock before recapturing it', async () => {
    const tempDir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'session-locked-delete-unit-')));
    const previousCwd = process.cwd();
    const identity: SessionIdentity = {
      userIdentifier: 'UNIT_STALE_USER',
      email: 'stale-user@example.test',
      password: 'not-used',
      sessionKey: 'unit-stale-user',
    };
    const sessionsDir = path.join(tempDir, '.sessions');
    const sessionPath = path.join(sessionsDir, `${resolveSessionStorageKey(identity)}.storage.json`);
    const staleContents = JSON.stringify({ cookies: [{ name: 'stale', value: 'stale' }] });
    const replacementContents = JSON.stringify({ cookies: [{ name: 'replacement', value: 'replacement' }] });
    let staleFilePresentAtLogin = true;

    try {
      fs.mkdirSync(sessionsDir, { recursive: true });
      fs.writeFileSync(sessionPath, staleContents);
      process.chdir(tempDir);

      await sessionCaptureTest.sessionCaptureWith([identity], {
        chromiumLauncher: {} as never,
        config: { urls: { exuiDefaultUrl: 'https://manage-case.example.test' } } as never,
        env: {},
        expectedStaleSession: {
          storageFile: sessionPath,
          storageStateFingerprint: sessionCaptureTest.storageStateFingerprint(staleContents),
        },
        force: true,
        isSessionFresh: () => false,
        lockfile: fakeLockfile(),
        loginAndPersistSession: async () => {
          staleFilePresentAtLogin = fs.existsSync(sessionPath);
          fs.writeFileSync(sessionPath, replacementContents);
        },
        resolveSessionIdentity: () => identity,
      });

      expect(staleFilePresentAtLogin).toBe(false);
      expect(fs.readFileSync(sessionPath, 'utf8')).toBe(replacementContents);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('does not delete a rejected session after lock ownership is compromised', async () => {
    const tempDir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'session-capture-compromised-delete-')));
    const previousCwd = process.cwd();
    const identity: SessionIdentity = {
      userIdentifier: 'UNIT_COMPROMISED_DELETE_USER',
      email: 'compromised-delete@example.test',
      password: 'not-used',
    };
    const sessionsDir = path.join(tempDir, '.sessions');
    const sessionPath = path.join(sessionsDir, `${resolveSessionStorageKey(identity)}.storage.json`);
    const rejectedContents = JSON.stringify({ cookies: [{ name: 'rejected', value: 'session' }] });
    let onCompromised: ((error: Error) => void) | undefined;

    try {
      fs.mkdirSync(sessionsDir, { recursive: true });
      fs.writeFileSync(sessionPath, rejectedContents);
      process.chdir(tempDir);

      await expect(
        sessionCaptureTest.sessionCaptureWith([identity], {
          chromiumLauncher: {} as never,
          config: { urls: { exuiDefaultUrl: 'https://manage-case.example.test' } } as never,
          env: {},
          expectedStaleSession: {
            storageFile: sessionPath,
            storageStateFingerprint: sessionCaptureTest.storageStateFingerprint(rejectedContents),
          },
          force: true,
          fs: {
            ...fs,
            readFileSync: ((filePath: fs.PathOrFileDescriptor, options?: Parameters<typeof fs.readFileSync>[1]) => {
              const contents = fs.readFileSync(filePath, options);
              if (path.resolve(String(filePath)) === sessionPath) {
                onCompromised!(new Error('proper-lockfile ownership lost before rejected-session deletion'));
              }
              return contents;
            }) as typeof fs.readFileSync,
          } as typeof fs,
          isSessionFresh: () => false,
          lockfile: fakeLockfile((_lockPath, options) => {
            onCompromised = options.onCompromised;
          }),
          resolveSessionIdentity: () => identity,
        })
      ).rejects.toMatchObject({ name: 'SessionLockCompromisedError' });

      expect(fs.readFileSync(sessionPath, 'utf8')).toBe(rejectedContents);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('CI workers lazily capture a missing session', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-ci-lazy-unit-'));
    const previousCwd = process.cwd();
    let loginCalled = false;

    try {
      process.chdir(tempDir);

      await expect(
        sessionCaptureTest.sessionCaptureWith(['UNIT_CI_USER'], {
          chromiumLauncher: {} as never,
          config: { urls: { exuiDefaultUrl: 'https://manage-case.example.test' } } as never,
          env: { CI: 'true' },
          isSessionFresh: () => false,
          lockfile: fakeLockfile(),
          loginAndPersistSession: async () => {
            loginCalled = true;
          },
          resolveSessionIdentity: () => ({
            userIdentifier: 'UNIT_CI_USER',
            email: 'ci-user@example.test',
            password: 'not-used',
          }),
        })
      ).resolves.toBeUndefined();

      expect(loginCalled).toBe(true);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('does not start a new capture after the lock start budget is exhausted', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-lock-start-budget-unit-'));
    const previousCwd = process.cwd();
    let loginCalled = false;
    const clock = [0, sessionCaptureTest.sessionCaptureLockStartBudgetMs + 1];

    try {
      process.chdir(tempDir);

      await expect(
        sessionCaptureTest.sessionCaptureWith(['UNIT_TAKEOVER_USER'], {
          chromiumLauncher: {} as never,
          config: { urls: { exuiDefaultUrl: 'https://manage-case.example.test' } } as never,
          env: {},
          isSessionFresh: () => false,
          lockfile: fakeLockfile(),
          loginAndPersistSession: async () => {
            loginCalled = true;
          },
          now: () => clock.shift() ?? clock[clock.length - 1],
          resolveSessionIdentity: () => ({
            userIdentifier: 'UNIT_TAKEOVER_USER',
            email: 'takeover-user@example.test',
            password: 'not-used',
          }),
        })
      ).rejects.toThrow('refusing to start a capture that cannot complete within the integration test budget');

      expect(loginCalled).toBe(false);
      expect(fs.readdirSync(path.join(tempDir, '.sessions')).some((name) => name.endsWith('.capture-failed.json'))).toBe(false);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('caps worker staggering so a complete transient retry cycle remains available', () => {
    expect(
      sessionCaptureTest.resolveSessionCaptureDelayMs(3, {
        PW_SESSION_CAPTURE_STAGGER_MS: '10000',
      })
    ).toBe(sessionCaptureTest.sessionCaptureMaxStaggerMs);

    expect(
      sessionCaptureTest.resolveSessionCaptureDelayMs(1, {
        PW_SESSION_CAPTURE_STAGGER_MS: '3000',
      })
    ).toBe(3_000);
  });

  test('does not start a fallback capture when even one bounded attempt cannot finish', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-pool-deadline-unit-'));
    const previousCwd = process.cwd();
    const primary: SessionIdentity = { userIdentifier: 'PRIMARY', email: 'primary@example.test', password: 'not-used' };
    const fallback: SessionIdentity = { userIdentifier: 'FALLBACK', email: 'fallback@example.test', password: 'not-used' };
    let now = 0;
    const loginAttempts: string[] = [];

    try {
      process.chdir(tempDir);
      await expect(
        withOrderedSessionFallback([primary, fallback], async (identity) => {
          await sessionCaptureTest.sessionCaptureWith([identity], {
            chromiumLauncher: {} as never,
            captureDeadlineAt: sessionCaptureTest.sessionCapturePoolBudgetMs,
            config: { urls: { exuiDefaultUrl: 'https://manage-case.example.test' } } as never,
            env: {},
            isSessionFresh: () => false,
            lockfile: fakeLockfile(),
            loginAndPersistSession: async ({ userIdentifier }) => {
              loginAttempts.push(userIdentifier);
              now = sessionCaptureTest.sessionCapturePoolBudgetMs - sessionCaptureTest.sessionCaptureSingleAttemptBudgetMs + 1;
              throw new SessionCaptureError('IDAM login did not establish authenticated session', userIdentifier, {
                failureKind: 'unexplained-idam-login-rejection',
              });
            },
            now: () => now,
            resolveSessionIdentity: (candidate) => candidate as SessionIdentity,
          });
          return identity.userIdentifier;
        })
      ).rejects.toThrow('refusing to start a capture that cannot complete within the integration test budget');

      expect(loginAttempts).toEqual(['PRIMARY']);
      expect(fs.readdirSync(path.join(tempDir, '.sessions')).filter((name) => name.includes('fallback'))).toEqual([
        `${resolveSessionStorageKey(fallback)}.lock`,
      ]);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('caps a held lock wait to the remaining shared pool budget', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-pool-lock-budget-unit-'));
    const previousCwd = process.cwd();
    const startedAt = Date.now();
    let loginCalled = false;
    const heldLockfile = {
      lock: async () => {
        const error = new Error('Lock file is already being held');
        Object.assign(error, { code: 'ELOCKED' });
        throw error;
      },
    } as never;

    try {
      process.chdir(tempDir);
      await expect(
        sessionCaptureTest.sessionCaptureWith(['POOL_LOCK_USER'], {
          chromiumLauncher: {} as never,
          captureDeadlineAt: startedAt + 25,
          config: { urls: { exuiDefaultUrl: 'https://manage-case.example.test' } } as never,
          env: {},
          isSessionFresh: () => false,
          lockfile: heldLockfile,
          loginAndPersistSession: async () => {
            loginCalled = true;
          },
          now: Date.now,
          resolveSessionIdentity: () => ({
            userIdentifier: 'POOL_LOCK_USER',
            email: 'pool-lock-user@example.test',
            password: 'not-used',
          }),
        })
      ).rejects.toThrow('Timed out waiting for session lock');

      expect(Date.now() - startedAt).toBeLessThan(500);
      expect(loginCalled).toBe(false);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('confirmAuthenticatedLogin accepts auth-cookie based success for fallback IDAM login', async () => {
    const infoCalls: Array<Record<string, unknown>> = [];

    await expect(
      sessionCaptureTest.confirmAuthenticatedLogin(
        fakeSessionPage() as never,
        'DYNAMIC_SOLICITOR',
        'dynamic@example.test',
        '/login?state=secret',
        1,
        {
          acceptCookies: async () => undefined,
          waitForShell: async () => null,
          waitForAuthCookies: async () => true,
          info: (_message, meta) => {
            infoCalls.push(meta);
          },
        }
      )
    ).resolves.toBeUndefined();

    expect(infoCalls).toEqual([
      expect.objectContaining({
        userIdentifier: 'DYNAMIC_SOLICITOR',
        loginTarget: '/login',
        marker: 'auth-cookies',
      }),
    ]);
  });

  test('confirmAuthenticatedLogin rejects when login establishes neither shell nor auth cookies', async () => {
    const page = {
      ...fakeSessionPage(),
      url: () => 'https://idam.example.test/login?state=secret&nonce=secret',
    };
    let capturedError: Error | undefined;

    try {
      await sessionCaptureTest.confirmAuthenticatedLogin(
        page as never,
        'DYNAMIC_SOLICITOR',
        'dynamic@example.test',
        '/login',
        1,
        {
          acceptCookies: async () => undefined,
          waitForShell: async () => null,
          waitForAuthCookies: async () => false,
          info: () => undefined,
        }
      );
    } catch (error) {
      capturedError = error as Error;
    }

    expect(capturedError?.message).toContain('did not establish authenticated session');
    expect(capturedError?.message).toContain('url=https://idam.example.test/login');
    expect(capturedError?.message).not.toContain('state=secret');
    expect(capturedError?.message).not.toContain('nonce=secret');
  });

  test('confirmAuthenticatedLogin includes accessible IDAM rejection evidence', async () => {
    const emptyLocator = {
      first: () => emptyLocator,
      textContent: async () => '',
    };
    const alertLocator = {
      first: () => alertLocator,
      textContent: async () => 'Incorrect email or password',
    };
    const page = {
      locator: () => emptyLocator,
      getByRole: (role: string) => (role === 'alert' ? alertLocator : emptyLocator),
      url: () => 'https://idam-web-public.aat.platform.hmcts.net/login',
    };

    await expect(
      sessionCaptureTest.confirmAuthenticatedLogin(
        page as never,
        'IAC_Judge_WA_R1',
        'redacted@example.test',
        'https://manage-case.example.test',
        1,
        {
          acceptCookies: async () => undefined,
          waitForShell: async () => null,
          waitForAuthCookies: async () => false,
          info: () => undefined,
        }
      )
    ).rejects.toThrow('IDAM page message: Incorrect email or password');
  });

  test('completeIdamCredentialFlow submits legacy combined email and password surface', async () => {
    const actions: string[] = [];
    const usernameInput = visibleLocator(actions, 'email');
    const passwordInput = visibleLocator(actions, 'password');
    const submitButton = visibleLocator(actions, 'submit');
    const hiddenFallback = hiddenLocator();
    const page = {
      getByRole: () => submitButton,
      locator: () => hiddenFallback,
      waitForLoadState: async () => undefined,
      waitForTimeout: async () => undefined,
    };
    const idamPage = fakeIdamPageObject({ page, usernameInput, passwordInput, submitButton });

    await sessionCaptureTest.completeIdamCredentialFlow(
      page as never,
      idamPage as never,
      usernameInput as never,
      'legacy@example.test',
      'secret'
    );

    expect(actions).toEqual(['email:fill:legacy@example.test', 'password:fill:secret', 'submit:click']);
  });

  test('completeIdamCredentialFlow submits progressive email then password surfaces', async () => {
    const actions: string[] = [];
    let step: 'email' | 'password' | 'submitted' = 'email';
    const usernameInput = visibleLocator(actions, 'email', () => step === 'email');
    const passwordInput = visibleLocator(actions, 'password', () => step === 'password');
    const submitButton = visibleLocator(
      actions,
      'submit',
      () => step !== 'submitted',
      () => {
        step = step === 'email' ? 'password' : 'submitted';
      }
    );
    const hiddenFallback = hiddenLocator();
    const page = {
      getByRole: () => submitButton,
      locator: () => hiddenFallback,
      waitForLoadState: async () => undefined,
      waitForTimeout: async () => undefined,
    };
    const idamPage = fakeIdamPageObject({ page, usernameInput, passwordInput, submitButton });

    await sessionCaptureTest.completeIdamCredentialFlow(
      page as never,
      idamPage as never,
      usernameInput as never,
      'progressive@example.test',
      'secret'
    );

    expect(actions).toEqual(['email:fill:progressive@example.test', 'submit:click', 'password:fill:secret', 'submit:click']);
  });

  test('completeIdamCredentialFlow uses the page object primary submit before broad shared selectors', async () => {
    const actions: string[] = [];
    const usernameInput = visibleLocator(actions, 'email');
    const passwordInput = visibleLocator(actions, 'password');
    const primarySubmitButton = visibleLocator(actions, 'primary-submit');
    const broadSharedSubmitButton = visibleLocator(actions, 'broad-shared-submit');
    const hiddenFallback = hiddenLocator();
    const page = {
      getByRole: () => primarySubmitButton,
      locator: () => hiddenFallback,
      waitForLoadState: async () => undefined,
      waitForTimeout: async () => undefined,
    };
    const idamPage = fakeIdamPageObject({
      page,
      usernameInput,
      passwordInput,
      submitButton: broadSharedSubmitButton,
    });

    await sessionCaptureTest.completeIdamCredentialFlow(
      page as never,
      idamPage as never,
      usernameInput as never,
      'primary-submit@example.test',
      'secret'
    );

    expect(actions).toEqual(['email:fill:primary-submit@example.test', 'password:fill:secret', 'primary-submit:click']);
  });

  test('waitForAuthenticatedShell rejects service-down even when the app header is visible', async () => {
    const locatorFor = (selector: string) => {
      const visible = selector === 'exui-header' || selector === 'exui-service-down';
      const locator = {
        first: () => locator,
        isVisible: async () => visible,
      };
      return locator;
    };
    const hiddenRoleLocator = {
      first: () => hiddenRoleLocator,
      isVisible: async () => false,
    };
    const page = {
      url: () => 'https://manage-case.aat.platform.hmcts.net/service-down?code=secret&state=secret',
      locator: (selector: string) => locatorFor(selector),
      getByRole: () => hiddenRoleLocator,
      waitForTimeout: async () => undefined,
    };

    let capturedError: SessionCaptureError | undefined;
    try {
      await sessionCaptureTest.waitForAuthenticatedShell(page as never, 'SOLICITOR', 'exui-header', 1);
    } catch (error) {
      capturedError = error as SessionCaptureError;
    }

    expect(capturedError?.message).toContain('Service down page detected while waiting for app shell');
    expect(capturedError?.context.currentUrl).toBe('https://manage-case.aat.platform.hmcts.net/service-down');
    expect(capturedError?.context.failureKind).toBe('service-down');

    await expect(
      sessionCaptureTest.probeAuthenticatedShell(page as never, 'SOLICITOR', 'exui-header', 1, async () => {
        throw capturedError;
      })
    ).rejects.toBe(capturedError);
  });

  test('does not suppress a later unexpected shell failure after an IDAM probe', async () => {
    const hidden = hiddenLocator();
    const page = {
      url: () => 'https://idam-web-public.aat.platform.hmcts.net/login',
      locator: () => hidden,
      getByRole: () => hidden,
      waitForTimeout: async () => undefined,
    };

    await expect(sessionCaptureTest.waitForAuthenticatedShell(page as never, 'SOLICITOR', undefined, 1)).rejects.toThrow(
      'Login page detected while waiting for app shell'
    );
    await expect(
      sessionCaptureTest.probeAuthenticatedShell(page as never, 'SOLICITOR', undefined, 1, async () => {
        throw new Error('unexpected browser disconnect after IDAM login');
      })
    ).rejects.toThrow('unexpected browser disconnect after IDAM login');
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

  test('storage refresh lock serialises concurrent refresh writers', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-storage-lock-unit-'));
    const storagePath = path.join(tempDir, 'storage.json');
    const entries: string[] = [];
    let firstCanFinish: (() => void) | undefined;

    try {
      const first = sessionStorageTest.withUiStorageStateRefreshLock(storagePath, async () => {
        entries.push('first:start');
        await new Promise<void>((resolve) => {
          firstCanFinish = resolve;
        });
        entries.push('first:end');
      });

      await expect.poll(() => entries.join(','), { timeout: 5_000 }).toBe('first:start');

      const second = sessionStorageTest.withUiStorageStateRefreshLock(storagePath, async () => {
        entries.push('second:start');
      });

      firstCanFinish?.();
      await Promise.all([first, second]);

      expect(entries).toEqual(['first:start', 'first:end', 'second:start']);
      expect(sessionStorageTest.buildStorageRefreshLockPath(storagePath)).toBe(`${storagePath}.refresh.lock`);
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('storage refresh lock wait budget covers slow UI login contention', () => {
    const retryBudgetMs = sessionStorageTest.calculateRetryBudgetMs(sessionStorageTest.uiStorageRefreshLockRetries);

    expect(sessionStorageTest.uiStorageRefreshLockStaleMs).toBe(sessionStorageTest.defaultUiLoginTimeoutMs);
    expect(retryBudgetMs).toBeGreaterThan(sessionStorageTest.defaultUiLoginTimeoutMs * 2);
  });

  test('storage refresh lock budget follows configured UI login timeout', () => {
    const previousTimeout = process.env.PW_UI_LOGIN_TIMEOUT_MS;

    try {
      process.env.PW_UI_LOGIN_TIMEOUT_MS = '180000';
      const lockOptions = sessionStorageTest.resolveStorageRefreshLockOptions();
      const retryBudgetMs = sessionStorageTest.calculateRetryBudgetMs(lockOptions.retries);

      expect(sessionStorageTest.resolveLoginTimeoutMs()).toBe(180_000);
      expect(lockOptions.staleMs).toBe(180_000);
      expect(retryBudgetMs).toBeGreaterThan(180_000 * 2);
    } finally {
      if (previousTimeout === undefined) {
        delete process.env.PW_UI_LOGIN_TIMEOUT_MS;
      } else {
        process.env.PW_UI_LOGIN_TIMEOUT_MS = previousTimeout;
      }
    }
  });

  test('session capture reuses a fresh session instead of failing on a recent failure marker', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-capture-unit-'));
    const previousCwd = process.cwd();
    const sessionsDir = path.join(tempDir, '.sessions');
    const storageKey = resolveSessionStorageKey({
      userIdentifier: 'BOOKING_UI-FT-ON-4',
      email: 'booking-ui-user@example.test',
      password: 'not-used',
    });
    const sessionPath = path.join(sessionsDir, `${storageKey}.storage.json`);
    const failurePath = path.join(sessionsDir, `${storageKey}.capture-failed.json`);
    let lockCalled = false;
    let freshnessMaxAgeMs: number | undefined;

    try {
      fs.mkdirSync(sessionsDir, { recursive: true });
      const sessionContents = JSON.stringify({
        cookies: [
          { name: 'Idam.Session', value: 'session', expires: Math.floor(Date.now() / 1_000) + 600 },
          { name: '__auth__', value: 'auth', expires: Math.floor(Date.now() / 1_000) + 600 },
        ],
      });
      fs.writeFileSync(sessionPath, sessionContents);
      fs.writeFileSync(
        failurePath,
        JSON.stringify({
          timestamp: Date.now(),
          message: 'Login failed for BOOKING_UI-FT-ON-4',
          storageStateFingerprint: sessionCaptureTest.storageStateFingerprint('rejected-session'),
        })
      );

      process.chdir(tempDir);

      await expect(
        sessionCaptureTest.sessionCaptureWith(['BOOKING_UI-FT-ON-4'], {
          chromiumLauncher: {
            launch: async () => {
              throw new Error('should not launch browser when a fresh session exists');
            },
          } as never,
          config: {
            urls: {
              exuiDefaultUrl: 'https://manage-case.aat.platform.hmcts.net',
            },
          } as never,
          env: { PW_SESSION_MAX_AGE_MS: '1234' },
          isSessionFresh: (_sessionPath, maxAgeMs) => {
            freshnessMaxAgeMs = maxAgeMs;
            return true;
          },
          lockfile: fakeLockfile(() => {
            lockCalled = true;
          }),
          resolveSessionIdentity: () => ({
            userIdentifier: 'BOOKING_UI-FT-ON-4',
            email: 'booking-ui-user@example.test',
            password: 'not-used',
          }),
        })
      ).resolves.toBeUndefined();

      expect(lockCalled).toBe(true);
      expect(freshnessMaxAgeMs).toBe(1234);
      expect(fs.existsSync(failurePath)).toBe(false);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('reuses an authenticated session beyond the local refresh age and clears its failure marker', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-capture-validated-reuse-unit-'));
    const previousCwd = process.cwd();
    const identity: SessionIdentity = {
      userIdentifier: 'UNIT_VALIDATED_STALE_USER',
      email: 'validated-stale@example.test',
      password: 'not-used',
    };
    const sessionsDir = path.join(tempDir, '.sessions');
    const storageKey = resolveSessionStorageKey(identity);
    const sessionPath = path.join(sessionsDir, `${storageKey}.storage.json`);
    const failurePath = path.join(sessionsDir, `${storageKey}.capture-failed.json`);
    let loginCount = 0;

    try {
      fs.mkdirSync(sessionsDir, { recursive: true });
      fs.writeFileSync(
        sessionPath,
        JSON.stringify({
          cookies: [
            {
              name: 'Idam.Session',
              value: 'session',
              domain: 'idam.example.test',
              expires: Math.floor(Date.now() / 1_000) + 600,
            },
            {
              name: '__auth__',
              value: 'auth',
              domain: 'manage-case.example.test',
              expires: Math.floor(Date.now() / 1_000) + 600,
            },
          ],
        })
      );
      fs.utimesSync(sessionPath, new Date(Date.now() - 3_600_000), new Date(Date.now() - 3_600_000));
      fs.writeFileSync(failurePath, JSON.stringify({ timestamp: Date.now(), message: 'previous AAT login outage' }));
      process.chdir(tempDir);

      await sessionCaptureTest.sessionCaptureWith([identity], {
        config: {
          urls: { exuiDefaultUrl: 'https://manage-case.example.test', idamWebUrl: 'https://idam.example.test' },
        } as never,
        env: { PW_SESSION_MAX_AGE_MS: '1000' },
        loginAndPersistSession: async () => {
          loginCount += 1;
        },
        resolveSessionIdentity: () => identity,
        validateStoredSession: async () => 'authenticated',
      });

      expect(loginCount).toBe(0);
      expect(fs.existsSync(failurePath)).toBe(false);
      expect(Date.now() - fs.statSync(sessionPath).mtimeMs).toBeLessThan(5_000);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('does not reuse a stale session unless the server confirms authentication', async () => {
    for (const validation of ['unauthenticated', 'unavailable'] as const) {
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-capture-unverified-reuse-unit-'));
      const previousCwd = process.cwd();
      const identity: SessionIdentity = {
        userIdentifier: `UNIT_${validation.toUpperCase()}_STALE_USER`,
        email: `unit-${validation}-stale@example.test`,
        password: 'not-used',
      };
      const sessionsDir = path.join(tempDir, '.sessions');
      const sessionPath = path.join(sessionsDir, `${resolveSessionStorageKey(identity)}.storage.json`);
      let loginCount = 0;

      try {
        fs.mkdirSync(sessionsDir, { recursive: true });
        fs.writeFileSync(
          sessionPath,
          JSON.stringify({
            cookies: [
              {
                name: 'Idam.Session',
                value: 'session',
                domain: 'idam.example.test',
                expires: Math.floor(Date.now() / 1_000) + 600,
              },
              {
                name: '__auth__',
                value: 'auth',
                domain: 'manage-case.example.test',
                expires: Math.floor(Date.now() / 1_000) + 600,
              },
            ],
          })
        );
        fs.utimesSync(sessionPath, new Date(Date.now() - 3_600_000), new Date(Date.now() - 3_600_000));
        process.chdir(tempDir);

        await sessionCaptureTest.sessionCaptureWith([identity], {
          config: {
            urls: { exuiDefaultUrl: 'https://manage-case.example.test', idamWebUrl: 'https://idam.example.test' },
          } as never,
          env: { PW_SESSION_MAX_AGE_MS: '1000' },
          lockfile: fakeLockfile(),
          loginAndPersistSession: async () => {
            loginCount += 1;
          },
          resolveSessionIdentity: () => identity,
          validateStoredSession: async () => validation,
        });

        expect(loginCount).toBe(1);
      } finally {
        process.chdir(previousCwd);
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    }
  });

  test('rejects unavailable validation for a refreshed session under the strict reuse policy', async () => {
    const session = {
      userIdentifier: 'UNIT_REFRESHED_USER',
      email: 'refreshed@example.test',
      cookies: [],
      storageFile: '/tmp/refreshed-session.storage.json',
      storageStateFingerprint: 'fingerprint',
    };

    await expect(
      sessionCaptureTest.validateLoadedSessionForReuse(session, 'https://manage-case.example.test', async () => 'unavailable', {
        PW_SESSION_REUSE_VALIDATION_MODE: 'strict',
      })
    ).rejects.toThrow('Unable to validate cached session for UNIT_REFRESHED_USER');
  });

  test('reuses an unavailable refreshed session under the default reuse policy', async () => {
    const session = {
      userIdentifier: 'UNIT_REFRESHED_USER',
      email: 'refreshed@example.test',
      cookies: [],
      storageFile: '/tmp/refreshed-session.storage.json',
      storageStateFingerprint: 'fingerprint',
    };

    await expect(
      sessionCaptureTest.validateLoadedSessionForReuse(session, 'https://manage-case.example.test', async () => 'unavailable', {})
    ).resolves.toBe('unavailable');
  });

  test('persists an authenticated API session and skips browser login', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-capture-api-first-unit-'));
    const previousCwd = process.cwd();
    const identity: SessionIdentity = {
      userIdentifier: 'UNIT_API_FIRST_USER',
      email: 'api-first@example.test',
      password: 'not-used',
    };
    let browserLoginCount = 0;

    try {
      process.chdir(tempDir);
      await sessionCaptureTest.sessionCaptureWith([identity], {
        bootstrapApiSession: async () => ({
          status: 'authenticated',
          storageState: {
            cookies: [
              {
                name: 'Idam.Session',
                value: 'idam-session',
                domain: 'idam.example.test',
                path: '/',
                expires: Math.floor(Date.now() / 1_000) + 600,
                httpOnly: true,
                secure: true,
                sameSite: 'Lax',
              },
              {
                name: '__auth__',
                value: 'xui-session',
                domain: 'manage-case.example.test',
                path: '/',
                expires: Math.floor(Date.now() / 1_000) + 600,
                httpOnly: true,
                secure: true,
                sameSite: 'Lax',
              },
            ],
            origins: [],
          },
        }),
        config: {
          urls: { exuiDefaultUrl: 'https://manage-case.example.test', idamWebUrl: 'https://idam.example.test' },
        } as never,
        env: { TEST_URL: 'https://manage-case.example.test' },
        isSessionFresh: () => false,
        lockfile: fakeLockfile(),
        loginAndPersistSession: async () => {
          browserLoginCount += 1;
        },
        resolveSessionIdentity: () => identity,
      });

      const sessionPath = path.join(tempDir, '.sessions', `${resolveSessionStorageKey(identity)}.storage.json`);
      expect(browserLoginCount).toBe(0);
      expect(JSON.parse(fs.readFileSync(sessionPath, 'utf8')).cookies).toHaveLength(2);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('uses browser login once when API bootstrap is unavailable', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-capture-api-fallback-unit-'));
    const previousCwd = process.cwd();
    const identity: SessionIdentity = {
      userIdentifier: 'UNIT_API_FALLBACK_USER',
      email: 'api-fallback@example.test',
      password: 'not-used',
    };
    let browserLoginCount = 0;

    try {
      process.chdir(tempDir);
      await sessionCaptureTest.sessionCaptureWith([identity], {
        bootstrapApiSession: async () => ({
          status: 'unavailable',
          stage: 'xui-auth-login',
          reason: 'XUI auth/login responded with 503',
          statusCode: 503,
        }),
        config: {
          urls: { exuiDefaultUrl: 'https://manage-case.example.test', idamWebUrl: 'https://idam.example.test' },
        } as never,
        isSessionFresh: () => false,
        lockfile: fakeLockfile(),
        loginAndPersistSession: async () => {
          browserLoginCount += 1;
        },
        resolveSessionIdentity: () => identity,
      });

      expect(browserLoginCount).toBe(1);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('does not start browser fallback after API bootstrap consumes the remaining capture budget', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-capture-api-budget-unit-'));
    const previousCwd = process.cwd();
    const identity: SessionIdentity = {
      userIdentifier: 'UNIT_API_BUDGET_USER',
      email: 'api-budget@example.test',
      password: 'not-used',
    };
    let now = 0;
    let browserLoginCount = 0;

    try {
      process.chdir(tempDir);
      await expect(
        sessionCaptureTest.sessionCaptureWith([identity], {
          bootstrapApiSession: async () => {
            now = 100;
            return {
              status: 'unavailable',
              stage: 'xui-auth-login',
              reason: 'request budget exhausted',
            };
          },
          captureDeadlineAt: 100,
          config: {
            urls: { exuiDefaultUrl: 'https://manage-case.example.test', idamWebUrl: 'https://idam.example.test' },
          } as never,
          isSessionFresh: () => false,
          lockfile: fakeLockfile(),
          loginAndPersistSession: async () => {
            browserLoginCount += 1;
          },
          now: () => now,
          resolveSessionIdentity: () => identity,
        })
      ).rejects.toThrow('Browser session fallback cannot start');

      expect(browserLoginCount).toBe(0);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('does not clear a superseded cooldown marker after lock ownership is compromised', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-capture-compromised-marker-clear-'));
    const previousCwd = process.cwd();
    const identity: SessionIdentity = {
      userIdentifier: 'UNIT_COMPROMISED_MARKER_USER',
      email: 'compromised-marker@example.test',
      password: 'not-used',
    };
    const sessionsDir = path.join(tempDir, '.sessions');
    const storageKey = resolveSessionStorageKey(identity);
    const sessionPath = path.join(sessionsDir, `${storageKey}.storage.json`);
    const failurePath = path.join(sessionsDir, `${storageKey}.capture-failed.json`);
    const sessionContents = JSON.stringify({ cookies: [{ name: 'fresh', value: 'session' }] });
    const markerContents = JSON.stringify({
      timestamp: Date.now(),
      message: 'failure for replaced session',
      storageStateFingerprint: sessionCaptureTest.storageStateFingerprint('rejected-session'),
    });
    let onCompromised: ((error: Error) => void) | undefined;

    try {
      fs.mkdirSync(sessionsDir, { recursive: true });
      fs.writeFileSync(sessionPath, sessionContents);
      fs.writeFileSync(failurePath, markerContents);
      process.chdir(tempDir);

      await expect(
        sessionCaptureTest.sessionCaptureWith([identity], {
          chromiumLauncher: {} as never,
          config: { urls: { exuiDefaultUrl: 'https://manage-case.example.test' } } as never,
          env: {},
          isSessionFresh: () => {
            if (onCompromised) {
              const compromise = onCompromised;
              onCompromised = undefined;
              compromise(new Error('proper-lockfile ownership lost before marker clear'));
            }
            return true;
          },
          lockfile: fakeLockfile((_lockPath, options) => {
            onCompromised = options.onCompromised;
          }),
          resolveSessionIdentity: () => identity,
        })
      ).rejects.toMatchObject({ name: 'SessionLockCompromisedError' });

      expect(fs.readFileSync(failurePath, 'utf8')).toBe(markerContents);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('session capture does not clear a newer failure marker while acquiring the identity lock', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-capture-marker-race-unit-'));
    const previousCwd = process.cwd();
    const identity: SessionIdentity = {
      userIdentifier: 'UNIT_MARKER_RACE_USER',
      email: 'marker-race@example.test',
      password: 'not-used',
      sessionKey: 'unit-marker-race-user',
    };
    const sessionsDir = path.join(tempDir, '.sessions');
    const sessionPath = path.join(sessionsDir, `${resolveSessionStorageKey(identity)}.storage.json`);
    const failurePath = path.join(sessionsDir, `${resolveSessionStorageKey(identity)}.capture-failed.json`);
    const sessionContents = JSON.stringify({
      cookies: [
        { name: 'Idam.Session', value: 'session', expires: Math.floor(Date.now() / 1_000) + 600 },
        { name: '__auth__', value: 'auth', expires: Math.floor(Date.now() / 1_000) + 600 },
      ],
    });
    const currentFingerprint = sessionCaptureTest.storageStateFingerprint(sessionContents);

    try {
      fs.mkdirSync(sessionsDir, { recursive: true });
      fs.writeFileSync(sessionPath, sessionContents);
      fs.writeFileSync(
        failurePath,
        JSON.stringify({
          timestamp: Date.now(),
          message: 'older failure for replaced state',
          storageStateFingerprint: sessionCaptureTest.storageStateFingerprint('replaced-session'),
        })
      );
      process.chdir(tempDir);

      await expect(
        sessionCaptureTest.sessionCaptureWith([identity], {
          chromiumLauncher: {} as never,
          config: { urls: { exuiDefaultUrl: 'https://manage-case.example.test' } } as never,
          env: {},
          isSessionFresh: () => true,
          lockfile: fakeLockfile(() => {
            fs.writeFileSync(
              failurePath,
              JSON.stringify({
                timestamp: Date.now(),
                message: 'newer failure for current state',
                storageStateFingerprint: currentFingerprint,
              })
            );
          }),
          loginAndPersistSession: async () => {
            throw new Error('should not log in during cooldown');
          },
          resolveSessionIdentity: () => identity,
        })
      ).rejects.toThrow('newer failure for current state');

      const retainedMarker = JSON.parse(fs.readFileSync(failurePath, 'utf8'));
      expect(retainedMarker.message).toBe('newer failure for current state');
      expect(retainedMarker.storageStateFingerprint).toBe(currentFingerprint);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('session capture retains cooldown when the fresh session matches the session present at failure', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-capture-causal-cooldown-unit-'));
    const previousCwd = process.cwd();
    const sessionsDir = path.join(tempDir, '.sessions');
    const storageKey = resolveSessionStorageKey({
      userIdentifier: 'BOOKING_UI-FT-ON-4',
      email: 'booking-ui-user@example.test',
      password: 'not-used',
    });
    const sessionPath = path.join(sessionsDir, `${storageKey}.storage.json`);
    const failurePath = path.join(sessionsDir, `${storageKey}.capture-failed.json`);
    const sessionContents = JSON.stringify({
      cookies: [
        { name: 'Idam.Session', value: 'session', expires: Math.floor(Date.now() / 1_000) + 600 },
        { name: '__auth__', value: 'auth', expires: Math.floor(Date.now() / 1_000) + 600 },
      ],
    });
    let lockCalled = false;

    try {
      fs.mkdirSync(sessionsDir, { recursive: true });
      fs.writeFileSync(sessionPath, sessionContents);
      fs.writeFileSync(
        failurePath,
        JSON.stringify({
          timestamp: Date.now(),
          message: 'Login failed for BOOKING_UI-FT-ON-4',
          storageStateFingerprint: sessionCaptureTest.storageStateFingerprint(sessionContents),
        })
      );
      process.chdir(tempDir);

      await expect(
        sessionCaptureTest.sessionCaptureWith(['BOOKING_UI-FT-ON-4'], {
          chromiumLauncher: {} as never,
          config: { urls: { exuiDefaultUrl: 'https://manage-case.aat.platform.hmcts.net' } } as never,
          env: {},
          isSessionFresh: () => true,
          lockfile: {
            lock: async () => {
              lockCalled = true;
              throw new Error('should not acquire lock during cooldown');
            },
          } as never,
          resolveSessionIdentity: () => ({
            userIdentifier: 'BOOKING_UI-FT-ON-4',
            email: 'booking-ui-user@example.test',
            password: 'not-used',
          }),
        })
      ).rejects.toThrow(/Recent session capture failed for BOOKING_UI-FT-ON-4/);

      expect(lockCalled).toBe(false);
      expect(fs.existsSync(failurePath)).toBe(true);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('session capture retains same-state cooldown created while waiting for the identity lock', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-after-lock-causal-cooldown-unit-'));
    const previousCwd = process.cwd();
    const identity: SessionIdentity = {
      userIdentifier: 'UNIT_AFTER_LOCK_CAUSAL_USER',
      email: 'after-lock-causal@example.test',
      password: 'not-used',
      sessionKey: 'unit-after-lock-causal-user',
    };
    const sessionsDir = path.join(tempDir, '.sessions');
    const sessionPath = path.join(sessionsDir, `${resolveSessionStorageKey(identity)}.storage.json`);
    const failurePath = path.join(sessionsDir, `${resolveSessionStorageKey(identity)}.capture-failed.json`);
    const sessionContents = JSON.stringify({
      cookies: [
        { name: 'Idam.Session', value: 'session', expires: Math.floor(Date.now() / 1_000) + 600 },
        { name: '__auth__', value: 'auth', expires: Math.floor(Date.now() / 1_000) + 600 },
      ],
    });
    let loginCalled = false;

    try {
      process.chdir(tempDir);
      await expect(
        sessionCaptureTest.sessionCaptureWith([identity], {
          chromiumLauncher: {} as never,
          config: { urls: { exuiDefaultUrl: 'https://manage-case.example.test' } } as never,
          env: {},
          isSessionFresh: () => fs.existsSync(sessionPath),
          lockfile: fakeLockfile(() => {
            fs.writeFileSync(sessionPath, sessionContents);
            fs.writeFileSync(
              failurePath,
              JSON.stringify({
                timestamp: Date.now(),
                message: 'another worker failed capture',
                storageStateFingerprint: sessionCaptureTest.storageStateFingerprint(sessionContents),
              })
            );
          }),
          loginAndPersistSession: async () => {
            loginCalled = true;
          },
          resolveSessionIdentity: () => identity,
        })
      ).rejects.toThrow('Recent session capture failed for UNIT_AFTER_LOCK_CAUSAL_USER');

      expect(loginCalled).toBe(false);
      expect(fs.existsSync(failurePath)).toBe(true);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('after locking, a cooldown is not cleared by an IDAM cookie for the wrong host', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-after-lock-cooldown-'));
    const previousCwd = process.cwd();
    const identity: SessionIdentity = {
      userIdentifier: 'UNIT_AFTER_LOCK_USER',
      email: 'after-lock@example.test',
      password: 'not-used',
      sessionKey: 'unit-after-lock-user',
    };
    const sessionsDir = path.join(tempDir, '.sessions');
    const sessionStorageKey = resolveSessionStorageKey(identity);
    const sessionPath = path.join(sessionsDir, `${sessionStorageKey}.storage.json`);
    const failurePath = path.join(sessionsDir, `${sessionStorageKey}.capture-failed.json`);
    let loginCalled = false;

    try {
      process.chdir(tempDir);
      await expect(
        sessionCaptureTest.sessionCaptureWith([identity], {
          chromiumLauncher: {} as never,
          config: {
            urls: {
              exuiDefaultUrl: 'https://manage-case.example.test',
              idamWebUrl: 'https://idam.example.test',
            },
          } as never,
          env: {},
          lockfile: fakeLockfile(() => {
            fs.writeFileSync(
              sessionPath,
              JSON.stringify({
                cookies: [
                  {
                    name: 'Idam.Session',
                    value: 'session',
                    domain: 'wrong-idam.example.test',
                    path: '/',
                    expires: Math.floor(Date.now() / 1_000) + 600,
                  },
                  {
                    name: '__auth__',
                    value: 'auth',
                    domain: 'manage-case.example.test',
                    path: '/',
                    expires: Math.floor(Date.now() / 1_000) + 600,
                  },
                ],
              })
            );
            fs.writeFileSync(failurePath, JSON.stringify({ timestamp: Date.now(), message: 'another worker failed capture' }));
          }),
          loginAndPersistSession: async () => {
            loginCalled = true;
          },
          resolveSessionIdentity: () => identity,
        })
      ).rejects.toThrow('Recent session capture failed for UNIT_AFTER_LOCK_USER');

      expect(loginCalled).toBe(false);
      expect(fs.existsSync(failurePath)).toBe(true);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('writes the cooldown marker only after the locked login attempts are exhausted', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-capture-retry-marker-'));
    const previousCwd = process.cwd();
    const storageKey = resolveSessionStorageKey({
      userIdentifier: 'IAC_Judge_WA_R1',
      email: 'judge@example.test',
      password: 'not-used',
    });
    const sessionPath = path.join(tempDir, '.sessions', `${storageKey}.storage.json`);
    const failurePath = path.join(tempDir, '.sessions', `${storageKey}.capture-failed.json`);
    const rejectedContents = JSON.stringify({ cookies: [{ name: 'rejected', value: 'rejected' }] });
    let exhaustedAttempts = false;

    try {
      process.chdir(tempDir);
      fs.mkdirSync(path.dirname(sessionPath), { recursive: true });
      fs.writeFileSync(sessionPath, rejectedContents);
      await expect(
        sessionCaptureTest.sessionCaptureWith(['IAC_Judge_WA_R1'], {
          chromiumLauncher: {} as never,
          config: { urls: { exuiDefaultUrl: 'https://manage-case.example.test' } } as never,
          env: {},
          isSessionFresh: () => false,
          lockfile: fakeLockfile(),
          loginAndPersistSession: async () => {
            expect(fs.existsSync(failurePath)).toBe(false);
            exhaustedAttempts = true;
            throw new Error('both transient login attempts failed');
          },
          resolveSessionIdentity: () => ({
            userIdentifier: 'IAC_Judge_WA_R1',
            email: 'judge@example.test',
            password: 'not-used',
          }),
        })
      ).rejects.toThrow('both transient login attempts failed');

      expect(exhaustedAttempts).toBe(true);
      const marker = JSON.parse(fs.readFileSync(failurePath, 'utf8'));
      expect(marker.message).toBe('both transient login attempts failed');
      expect(marker.storageStateFingerprint).toBe(sessionCaptureTest.storageStateFingerprint(rejectedContents));
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('does not write a cooldown marker when cleanup fails after a reusable session was persisted', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-cleanup-marker-unit-'));
    const previousCwd = process.cwd();
    const identity: SessionIdentity = {
      userIdentifier: 'CLEANUP_USER',
      email: 'cleanup@example.test',
      password: 'not-used',
    };
    const storageKey = resolveSessionStorageKey(identity);
    const sessionPath = path.join(tempDir, '.sessions', `${storageKey}.storage.json`);
    const failurePath = path.join(tempDir, '.sessions', `${storageKey}.capture-failed.json`);
    let secondLoginCalled = false;

    try {
      process.chdir(tempDir);
      await expect(
        sessionCaptureTest.sessionCaptureWith([identity], {
          chromiumLauncher: {} as never,
          config: {
            urls: {
              exuiDefaultUrl: 'https://manage-case.example.test',
              idamWebUrl: 'https://idam.example.test',
            },
          } as never,
          env: {},
          lockfile: fakeLockfile(),
          loginAndPersistSession: async () => {
            fs.writeFileSync(
              sessionPath,
              JSON.stringify({
                cookies: [
                  {
                    name: 'Idam.Session',
                    value: 'idam-session',
                    domain: 'idam.example.test',
                    path: '/',
                    expires: Math.floor(Date.now() / 1_000) + 600,
                  },
                  {
                    name: '__auth__',
                    value: 'authenticated',
                    domain: 'manage-case.example.test',
                    path: '/',
                    expires: Math.floor(Date.now() / 1_000) + 600,
                  },
                ],
              })
            );
            throw new Error('browser close failed after persistence');
          },
          resolveSessionIdentity: (candidate) => candidate as SessionIdentity,
        })
      ).rejects.toThrow('browser close failed after persistence');

      expect(fs.existsSync(sessionPath)).toBe(true);
      expect(fs.existsSync(failurePath)).toBe(false);
      await expect(
        sessionCaptureTest.sessionCaptureWith([identity], {
          chromiumLauncher: {} as never,
          config: {
            urls: {
              exuiDefaultUrl: 'https://manage-case.example.test',
              idamWebUrl: 'https://idam.example.test',
            },
          } as never,
          env: {},
          lockfile: fakeLockfile(),
          loginAndPersistSession: async () => {
            secondLoginCalled = true;
          },
          resolveSessionIdentity: (candidate) => candidate as SessionIdentity,
        })
      ).resolves.toBeUndefined();
      expect(secondLoginCalled).toBe(false);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('does not write a cooldown marker when a stale lock owner is fenced', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-capture-fenced-marker-'));
    const previousCwd = process.cwd();
    const storageKey = resolveSessionStorageKey({
      userIdentifier: 'IAC_Judge_WA_R1',
      email: 'judge@example.test',
      password: 'not-used',
    });
    const failurePath = path.join(tempDir, '.sessions', `${storageKey}.capture-failed.json`);

    try {
      process.chdir(tempDir);
      await expect(
        sessionCaptureTest.sessionCaptureWith(['IAC_Judge_WA_R1'], {
          chromiumLauncher: {} as never,
          config: { urls: { exuiDefaultUrl: 'https://manage-case.example.test' } } as never,
          env: {},
          isSessionFresh: () => false,
          lockfile: fakeLockfile(),
          loginAndPersistSession: async ({ assertLockOwned }) => {
            expect(assertLockOwned).toBeDefined();
            const error = new Error('Session lock ownership was lost for IAC_Judge_WA_R1');
            error.name = 'SessionLockCompromisedError';
            throw error;
          },
          resolveSessionIdentity: () => ({
            userIdentifier: 'IAC_Judge_WA_R1',
            email: 'judge@example.test',
            password: 'not-used',
          }),
        })
      ).rejects.toThrow('Session lock ownership was lost');

      expect(fs.existsSync(failurePath)).toBe(false);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('fails a successful capture when lock ownership is lost during release', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-capture-release-compromise-'));
    const previousCwd = process.cwd();
    const identity: SessionIdentity = {
      userIdentifier: 'RELEASE_COMPROMISE_USER',
      email: 'release-compromise@example.test',
      password: 'not-used',
    };
    const failurePath = path.join(tempDir, '.sessions', `${resolveSessionStorageKey(identity)}.capture-failed.json`);

    try {
      process.chdir(tempDir);
      await expect(
        sessionCaptureTest.sessionCaptureWith([identity], {
          chromiumLauncher: {} as never,
          config: { urls: { exuiDefaultUrl: 'https://manage-case.example.test' } } as never,
          env: {},
          isSessionFresh: () => false,
          lockfile: releaseCompromisedLockfile(),
          loginAndPersistSession: async () => undefined,
          resolveSessionIdentity: (candidate) => candidate as SessionIdentity,
        })
      ).rejects.toMatchObject({ name: 'SessionLockCompromisedError' });

      expect(fs.existsSync(failurePath)).toBe(false);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('preserves a capture failure and attaches a release-time lock compromise', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-capture-release-diagnostic-'));
    const previousCwd = process.cwd();
    const identity: SessionIdentity = {
      userIdentifier: 'RELEASE_DIAGNOSTIC_USER',
      email: 'release-diagnostic@example.test',
      password: 'not-used',
    };
    const captureError = new Error('capture failed before release');
    let receivedError: (Error & { sessionLockReleaseError?: Error }) | undefined;

    try {
      process.chdir(tempDir);
      try {
        await sessionCaptureTest.sessionCaptureWith([identity], {
          chromiumLauncher: {} as never,
          config: { urls: { exuiDefaultUrl: 'https://manage-case.example.test' } } as never,
          env: {},
          isSessionFresh: () => false,
          lockfile: releaseCompromisedLockfile(),
          loginAndPersistSession: async () => {
            throw captureError;
          },
          resolveSessionIdentity: (candidate) => candidate as SessionIdentity,
        });
      } catch (error) {
        receivedError = error as Error & { sessionLockReleaseError?: Error };
      }

      expect(receivedError).toBe(captureError);
      expect(receivedError?.sessionLockReleaseError).toMatchObject({ name: 'SessionLockCompromisedError' });
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('does not write a cooldown when lock compromise precedes an unrelated login failure', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-capture-compromised-login-'));
    const previousCwd = process.cwd();
    const storageKey = resolveSessionStorageKey({
      userIdentifier: 'IAC_Judge_WA_R1',
      email: 'judge@example.test',
      password: 'not-used',
    });
    const failurePath = path.join(tempDir, '.sessions', `${storageKey}.capture-failed.json`);
    let compromiseLock: ((error: Error) => void) | undefined;

    try {
      process.chdir(tempDir);
      await expect(
        sessionCaptureTest.sessionCaptureWith(['IAC_Judge_WA_R1'], {
          chromiumLauncher: {} as never,
          config: { urls: { exuiDefaultUrl: 'https://manage-case.example.test' } } as never,
          env: {},
          isSessionFresh: () => false,
          lockfile: fakeLockfile((_lockPath, options) => {
            compromiseLock = options.onCompromised;
          }),
          loginAndPersistSession: async () => {
            compromiseLock!(new Error('proper-lockfile ownership lost'));
            throw new Error('login failed after ownership loss');
          },
          resolveSessionIdentity: () => ({
            userIdentifier: 'IAC_Judge_WA_R1',
            email: 'judge@example.test',
            password: 'not-used',
          }),
        })
      ).rejects.toMatchObject({ name: 'SessionLockCompromisedError' });

      expect(fs.existsSync(failurePath)).toBe(false);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('a recent cooldown marker fails fast without waiting for the lock or another login', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-capture-fast-cooldown-'));
    const previousCwd = process.cwd();
    const sessionsDir = path.join(tempDir, '.sessions');
    const storageKey = resolveSessionStorageKey({
      userIdentifier: 'IAC_Judge_WA_R1',
      email: 'judge@example.test',
      password: 'not-used',
    });
    const failurePath = path.join(sessionsDir, `${storageKey}.capture-failed.json`);
    let lockCalled = false;
    let loginCalled = false;

    try {
      process.chdir(tempDir);
      fs.mkdirSync(sessionsDir, { recursive: true });
      fs.writeFileSync(failurePath, JSON.stringify({ timestamp: Date.now(), message: 'both login attempts failed' }));

      await expect(
        sessionCaptureTest.sessionCaptureWith(['IAC_Judge_WA_R1'], {
          chromiumLauncher: {} as never,
          config: { urls: { exuiDefaultUrl: 'https://manage-case.example.test' } } as never,
          env: {},
          isSessionFresh: () => false,
          lockfile: {
            lock: async () => {
              lockCalled = true;
              return async () => undefined;
            },
          } as never,
          loginAndPersistSession: async () => {
            loginCalled = true;
          },
          resolveSessionIdentity: () => ({
            userIdentifier: 'IAC_Judge_WA_R1',
            email: 'judge@example.test',
            password: 'not-used',
          }),
        })
      ).rejects.toThrow('Recent session capture failed for IAC_Judge_WA_R1');

      expect(lockCalled).toBe(false);
      expect(loginCalled).toBe(false);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('retries after a recent transient capture failure while retaining deterministic cooldowns', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-capture-transient-cooldown-retry-unit-'));
    const previousCwd = process.cwd();
    const sessionsDir = path.join(tempDir, '.sessions');
    const storageKey = resolveSessionStorageKey({
      userIdentifier: 'IAC_Judge_WA_R1',
      email: 'judge@example.test',
      password: 'not-used',
    });
    const failurePath = path.join(sessionsDir, `${storageKey}.capture-failed.json`);
    let loginCalled = false;

    try {
      process.chdir(tempDir);
      fs.mkdirSync(sessionsDir, { recursive: true });
      fs.writeFileSync(
        failurePath,
        JSON.stringify({
          timestamp: Date.now(),
          message: 'Session capture attempt timed out after 45000ms',
          retryable: true,
        })
      );

      await sessionCaptureTest.sessionCaptureWith(['IAC_Judge_WA_R1'], {
        chromiumLauncher: {} as never,
        config: { urls: { exuiDefaultUrl: 'https://manage-case.example.test' } } as never,
        env: {},
        isSessionFresh: () => false,
        lockfile: fakeLockfile(),
        loginAndPersistSession: async () => {
          loginCalled = true;
        },
        resolveSessionIdentity: () => ({
          userIdentifier: 'IAC_Judge_WA_R1',
          email: 'judge@example.test',
          password: 'not-used',
        }),
      });

      expect(loginCalled).toBe(true);
      expect(fs.existsSync(failurePath)).toBe(false);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('allows one recovery capture after an unavailable IDAM surface marker', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-capture-service-down-retry-unit-'));
    const previousCwd = process.cwd();
    const identity: SessionIdentity = {
      userIdentifier: 'SERVICE_DOWN_RETRY_USER',
      email: 'service-down-retry@example.test',
      password: 'not-used',
    };
    let captures = 0;

    try {
      process.chdir(tempDir);
      await expect(
        sessionCaptureTest.sessionCaptureWith([identity], {
          chromiumLauncher: {} as never,
          config: { urls: { exuiDefaultUrl: 'https://manage-case.example.test' } } as never,
          env: {},
          isSessionFresh: () => false,
          lockfile: fakeLockfile(),
          loginAndPersistSession: async () => {
            captures += 1;
            throw new SessionCaptureError('IDAM login surface was unavailable', identity.userIdentifier, {
              failureKind: SERVICE_DOWN_SESSION_CAPTURE_FAILURE,
            });
          },
          resolveSessionIdentity: () => identity,
        })
      ).rejects.toThrow('IDAM login surface was unavailable');

      await sessionCaptureTest.sessionCaptureWith([identity], {
        chromiumLauncher: {} as never,
        config: { urls: { exuiDefaultUrl: 'https://manage-case.example.test' } } as never,
        env: {},
        isSessionFresh: () => false,
        lockfile: fakeLockfile(),
        loginAndPersistSession: async () => {
          captures += 1;
        },
        resolveSessionIdentity: () => identity,
      });

      expect(captures).toBe(2);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('allows only one shared recovery capture after a transient marker', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-capture-single-recovery-unit-'));
    const previousCwd = process.cwd();
    const identity: SessionIdentity = {
      userIdentifier: 'TRANSIENT_RECOVERY_USER',
      email: 'transient-recovery@example.test',
      password: 'not-used',
    };
    const storageKey = resolveSessionStorageKey(identity);
    const sessionsDir = path.join(tempDir, '.sessions');
    const failurePath = path.join(sessionsDir, `${storageKey}.capture-failed.json`);
    let captures = 0;

    try {
      process.chdir(tempDir);
      fs.mkdirSync(sessionsDir, { recursive: true });
      fs.writeFileSync(
        failurePath,
        JSON.stringify({
          timestamp: Date.now(),
          message: 'Session capture attempt timed out after 45000ms',
          retryable: true,
        })
      );

      const attempts = await Promise.allSettled(
        Array.from({ length: 8 }, () =>
          sessionCaptureTest.sessionCaptureWith([identity], {
            chromiumLauncher: {} as never,
            config: { urls: { exuiDefaultUrl: 'https://manage-case.example.test' } } as never,
            env: {},
            isSessionFresh: () => false,
            loginAndPersistSession: async () => {
              captures += 1;
              throw new Error('Session capture attempt timed out after 45000ms');
            },
            resolveSessionIdentity: (candidate) => candidate as SessionIdentity,
          })
        )
      );

      const marker = JSON.parse(fs.readFileSync(failurePath, 'utf8'));
      expect(captures).toBe(1);
      expect(attempts.every((attempt) => attempt.status === 'rejected')).toBe(true);
      expect(marker.recoveryAttempted).toBe(true);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('concurrent unexplained login failures share one bounded fallback capture', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-pool-generic-failure-'));
    const previousCwd = process.cwd();
    const primary: SessionIdentity = {
      userIdentifier: 'PRIMARY',
      email: 'primary@example.test',
      password: 'not-used',
    };
    const fallback: SessionIdentity = {
      userIdentifier: 'FALLBACK',
      email: 'fallback@example.test',
      password: 'not-used',
    };
    const freshUsers = new Set<string>();
    let primaryCaptureCycles = 0;
    let fallbackCaptureCycles = 0;

    try {
      process.chdir(tempDir);
      const usePool = () =>
        withOrderedSessionFallback([primary, fallback], async (identity) => {
          await sessionCaptureTest.sessionCaptureWith([identity], {
            chromiumLauncher: {} as never,
            config: { urls: { exuiDefaultUrl: 'https://manage-case.example.test' } } as never,
            env: {},
            isSessionFresh: (sessionPath) =>
              Array.from(freshUsers).some((email) =>
                sessionPath.includes(resolveSessionStorageKey({ userIdentifier: email, email, password: 'not-used' }))
              ),
            loginAndPersistSession: async ({ userIdentifier, email }) => {
              if (userIdentifier === 'PRIMARY') {
                primaryCaptureCycles += 1;
                throw new Error(
                  'Login failed for PRIMARY after 2 of 2 capture attempts: IDAM login did not establish authenticated session'
                );
              }
              fallbackCaptureCycles += 1;
              freshUsers.add(email);
            },
            resolveSessionIdentity: (candidate) => candidate as SessionIdentity,
          });
          return identity.userIdentifier;
        });

      const results = await Promise.all(Array.from({ length: 8 }, () => usePool()));
      const marker = JSON.parse(
        fs.readFileSync(path.join(tempDir, '.sessions', `${resolveSessionStorageKey(primary)}.capture-failed.json`), 'utf8')
      );

      expect(results.map((result) => result.selectedUserIdentifier)).toEqual(Array(8).fill('FALLBACK'));
      expect(primaryCaptureCycles).toBe(1);
      expect(fallbackCaptureCycles).toBe(1);
      expect(marker.failureKind).toBe('unexplained-idam-login-rejection');
      expect(fs.readdirSync(path.join(tempDir, '.sessions')).filter((name) => name.endsWith('.capture-failed.json'))).toEqual([
        `${resolveSessionStorageKey(primary)}.capture-failed.json`,
      ]);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('concurrent explicit rejections share one fallback capture and retain IDAM evidence', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-pool-explicit-rejection-'));
    const previousCwd = process.cwd();
    const primary: SessionIdentity = {
      userIdentifier: 'PRIMARY',
      email: 'primary@example.test',
      password: 'not-used',
    };
    const fallback: SessionIdentity = {
      userIdentifier: 'FALLBACK',
      email: 'fallback@example.test',
      password: 'not-used',
    };
    const freshUsers = new Set<string>();
    let primaryCaptureCycles = 0;
    let fallbackCaptureCycles = 0;

    try {
      process.chdir(tempDir);
      const usePool = () =>
        withOrderedSessionFallback([primary, fallback], async (identity) => {
          await sessionCaptureTest.sessionCaptureWith([identity], {
            chromiumLauncher: {} as never,
            config: { urls: { exuiDefaultUrl: 'https://manage-case.example.test' } } as never,
            env: {},
            isSessionFresh: (sessionPath) =>
              Array.from(freshUsers).some((email) =>
                sessionPath.includes(
                  resolveSessionStorageKey({
                    userIdentifier: email,
                    email,
                    password: 'not-used',
                  })
                )
              ),
            loginAndPersistSession: async ({ userIdentifier, email }) => {
              if (userIdentifier === 'PRIMARY') {
                primaryCaptureCycles += 1;
                throw new Error(
                  'Login failed for PRIMARY after 1 of 2 capture attempts. IDAM page message: Incorrect email or password'
                );
              }
              fallbackCaptureCycles += 1;
              freshUsers.add(email);
            },
            resolveSessionIdentity: (candidate) => candidate as SessionIdentity,
          });
          return identity.userIdentifier;
        });

      const results = await Promise.all(Array.from({ length: 8 }, () => usePool()));
      const marker = JSON.parse(
        fs.readFileSync(path.join(tempDir, '.sessions', `${resolveSessionStorageKey(primary)}.capture-failed.json`), 'utf8')
      );

      expect(results.map((result) => result.selectedUserIdentifier)).toEqual(Array(8).fill('FALLBACK'));
      expect(primaryCaptureCycles).toBe(1);
      expect(fallbackCaptureCycles).toBe(1);
      expect(marker.message).toContain('IDAM page message: Incorrect email or password');
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('ensureAuthenticatedPage does not retry navigation when the app shell is missing', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-shell-unit-'));
    const previousCwd = process.cwd();
    const previousTestUrl = process.env.TEST_URL;
    const previousSessionReuseValidationMode = process.env.PW_SESSION_REUSE_VALIDATION_MODE;
    const identity: SessionIdentity = {
      userIdentifier: 'UNIT_SHELL_USER',
      email: 'unit-shell-user@example.test',
      password: 'not-used',
      sessionKey: 'unit-shell-user',
    };
    const sessionPath = path.join(tempDir, '.sessions', `${resolveSessionStorageKey(identity)}.storage.json`);
    let gotoCount = 0;

    try {
      fs.mkdirSync(path.dirname(sessionPath), { recursive: true });
      fs.writeFileSync(
        sessionPath,
        JSON.stringify({
          cookies: [
            {
              name: 'Idam.Session',
              value: 'session',
              domain: 'idam-web-public.aat.platform.hmcts.net',
              path: '/',
              expires: Math.floor(Date.now() / 1_000) + 600,
            },
            {
              name: '__auth__',
              value: 'auth',
              domain: 'manage-case.aat.platform.hmcts.net',
              path: '/',
              expires: Math.floor(Date.now() / 1_000) + 600,
            },
          ],
        })
      );
      process.chdir(tempDir);
      process.env.TEST_URL = 'https://manage-case.aat.platform.hmcts.net';
      // The contract under test starts after cached-session validation. Avoid a
      // CI-only network validation failure masking the missing-shell assertion.
      process.env.PW_SESSION_REUSE_VALIDATION_MODE = 'best-effort';

      const page = {
        context: () => ({
          addCookies: async () => undefined,
        }),
        getByRole: () => hiddenLocator(),
        goto: async () => {
          gotoCount += 1;
        },
        locator: () => hiddenLocator(),
        url: () => 'https://manage-case.aat.platform.hmcts.net',
        waitForLoadState: async () => undefined,
        waitForTimeout: async () => undefined,
      };

      await expect(
        sessionCaptureTest.ensureAuthenticatedPage(page as never, identity, {
          targetUrl: 'https://manage-case.aat.platform.hmcts.net',
          timeoutMs: 1,
        })
      ).rejects.toThrow(/App shell not detected within 1ms/);

      expect(gotoCount).toBe(1);
    } finally {
      process.chdir(previousCwd);
      if (previousTestUrl === undefined) {
        delete process.env.TEST_URL;
      } else {
        process.env.TEST_URL = previousTestUrl;
      }
      if (previousSessionReuseValidationMode === undefined) {
        delete process.env.PW_SESSION_REUSE_VALIDATION_MODE;
      } else {
        process.env.PW_SESSION_REUSE_VALIDATION_MODE = previousSessionReuseValidationMode;
      }
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });
});
