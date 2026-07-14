import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { expect, test } from '@playwright/test';

import { __test__ as sessionStorageTest } from '../../E2E/utils/session-storage.utils.js';
import { __test__ as sessionCaptureTest } from '../../common/sessionCapture.js';
import { resolveUiStoragePathForUser, writeUiStorageMetadata } from '../../E2E/utils/storage-state.utils.js';

function fakeSessionPage() {
  const locator = {
    first: () => locator,
    textContent: async () => '',
  };

  return {
    locator: () => locator,
    url: () => 'https://idam-web-public.aat.platform.hmcts.net/login',
  };
}

function hiddenLocator() {
  const locator = {
    first: () => locator,
    click: async () => undefined,
    isVisible: async () => false,
  };
  return locator;
}

test.describe('Session management hardening unit tests', { tag: '@svc-internal' }, () => {
  test('confirmAuthenticatedLogin accepts auth-cookie based success for fallback IDAM login', async () => {
    const infoCalls: Array<Record<string, unknown>> = [];

    await expect(
      sessionCaptureTest.confirmAuthenticatedLogin(
        fakeSessionPage() as never,
        'DYNAMIC_SOLICITOR',
        'dynamic@example.test',
        '/login',
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
        marker: 'auth-cookies',
      }),
    ]);
  });

  test('confirmAuthenticatedLogin rejects when login establishes neither shell nor auth cookies', async () => {
    await expect(
      sessionCaptureTest.confirmAuthenticatedLogin(
        fakeSessionPage() as never,
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
      )
    ).rejects.toThrow(/did not establish authenticated session/i);
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
      url: () => 'https://manage-case.aat.platform.hmcts.net/service-down',
      locator: (selector: string) => locatorFor(selector),
      getByRole: () => hiddenRoleLocator,
      waitForTimeout: async () => undefined,
    };

    await expect(sessionCaptureTest.waitForAuthenticatedShell(page as never, 'SOLICITOR', 'exui-header', 1)).rejects.toThrow(
      /Service down page detected while waiting for app shell/
    );
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
    const sessionPath = path.join(sessionsDir, 'booking-ui-user-example.test.storage.json');
    const failurePath = path.join(sessionsDir, 'booking-ui-user-example.test.capture-failed.json');
    let lockCalled = false;
    let freshnessMaxAgeMs: number | undefined;

    try {
      fs.mkdirSync(sessionsDir, { recursive: true });
      fs.writeFileSync(
        sessionPath,
        JSON.stringify({
          cookies: [
            { name: 'Idam.Session', value: 'session', expires: Math.floor(Date.now() / 1_000) + 600 },
            { name: '__auth__', value: 'auth', expires: Math.floor(Date.now() / 1_000) + 600 },
          ],
        })
      );
      fs.writeFileSync(
        failurePath,
        JSON.stringify({
          timestamp: Date.now(),
          message: 'Login failed for BOOKING_UI-FT-ON-4',
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
          lockfile: {
            lock: async () => {
              lockCalled = true;
              throw new Error('should not acquire lock when a fresh session exists');
            },
          } as never,
          resolveSessionIdentity: () => ({
            userIdentifier: 'BOOKING_UI-FT-ON-4',
            email: 'booking-ui-user@example.test',
            password: 'not-used',
          }),
        })
      ).resolves.toBeUndefined();

      expect(lockCalled).toBe(false);
      expect(freshnessMaxAgeMs).toBe(1234);
      expect(fs.existsSync(failurePath)).toBe(false);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('writes the cooldown marker only after the locked login attempts are exhausted', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-capture-retry-marker-'));
    const previousCwd = process.cwd();
    const failurePath = path.join(tempDir, '.sessions', 'judge-example.test.capture-failed.json');
    let exhaustedAttempts = false;

    try {
      process.chdir(tempDir);
      await expect(
        sessionCaptureTest.sessionCaptureWith(['IAC_Judge_WA_R1'], {
          chromiumLauncher: {} as never,
          config: { urls: { exuiDefaultUrl: 'https://manage-case.example.test' } } as never,
          env: {},
          isSessionFresh: () => false,
          lockfile: { lock: async () => async () => undefined } as never,
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
      expect(JSON.parse(fs.readFileSync(failurePath, 'utf8')).message).toBe('both transient login attempts failed');
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('ensureAuthenticatedPage does not retry navigation when the app shell is missing', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-shell-unit-'));
    const previousCwd = process.cwd();
    const previousTestUrl = process.env.TEST_URL;
    const sessionPath = path.join(tempDir, '.sessions', 'unit-shell-user.storage.json');
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
              domain: 'manage-case.aat.platform.hmcts.net',
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
        sessionCaptureTest.ensureAuthenticatedPage(
          page as never,
          {
            userIdentifier: 'UNIT_SHELL_USER',
            email: 'unit-shell-user@example.test',
            password: 'not-used',
            sessionKey: 'unit-shell-user',
          },
          {
            targetUrl: 'https://manage-case.aat.platform.hmcts.net',
            waitForSelector: 'exui-header',
            timeoutMs: 1,
          }
        )
      ).rejects.toThrow(/App shell not detected within 1ms/);

      expect(gotoCount).toBe(1);
    } finally {
      process.chdir(previousCwd);
      if (previousTestUrl === undefined) {
        delete process.env.TEST_URL;
      } else {
        process.env.TEST_URL = previousTestUrl;
      }
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });
});
