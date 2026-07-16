import { expect, test } from '@playwright/test';
import type { BrowserContext, Page } from '@playwright/test';
import type { IdamPage } from '@hmcts/playwright-common';
import type { Cookie } from 'playwright-core';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { createRequire } from 'node:module';

import { __test__ as sessionCaptureTest } from '../../common/sessionCapture.js';
import { withOrderedSessionFallback } from '../../common/orderedSessionFallback.js';
import type { SessionIdentity } from '../../common/sessionIdentity.js';
import { isExplicitIdamLoginRejection, isTransientSessionCaptureError } from '../../common/sessionCaptureRetry.js';

const require = createRequire(import.meta.url);
const { INTEGRATION_TEST_TIMEOUT_MS, POST_SESSION_CAPTURE_JOURNEY_ALLOWANCE_MS } =
  require('../../../playwright.integration.config.support.cjs') as {
    INTEGRATION_TEST_TIMEOUT_MS: number;
    POST_SESSION_CAPTURE_JOURNEY_ALLOWANCE_MS: number;
  };

const authCookies: Cookie[] = [
  {
    name: 'Idam.Session',
    value: 'idam',
    domain: 'idam.example.test',
    path: '/',
    expires: -1,
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
  },
  {
    name: '__auth__',
    value: 'auth',
    domain: 'manage-case.example.test',
    path: '/',
    expires: -1,
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
  },
];

function createLauncher({ failFirstContextClose = false }: { failFirstContextClose?: boolean } = {}) {
  const contexts: Array<{ closeCalls: number }> = [];
  const launcher = {
    launch: async () => ({
      newContext: async () => {
        const state = { closeCalls: 0 };
        contexts.push(state);
        const context = {
          cookies: async () => authCookies,
          close: async () => {
            state.closeCalls += 1;
            if (failFirstContextClose && contexts.length === 1) {
              throw new Error('context close failed');
            }
          },
        } as unknown as BrowserContext;
        const page = {
          context: () => context,
          url: () => 'https://manage-case.example.test/',
          locator: () => {
            throw new Error('unexpected post-authentication page readiness check');
          },
        } as unknown as Page;
        (context as BrowserContext & { newPage: () => Promise<Page> }).newPage = async () => page;
        return context;
      },
      close: async () => undefined,
    }),
  };
  return { launcher, contexts };
}

const commonArgs = {
  idamFactory: (() => ({})) as unknown as (page: Page) => IdamPage,
  env: { TEST_URL: 'https://manage-case.example.test/' } as NodeJS.ProcessEnv,
  activeConfig: {
    urls: { exuiDefaultUrl: 'https://manage-case.example.test/', idamWebUrl: 'https://idam.example.test/' },
  } as any,
  email: 'judge@example.test',
  password: 'not-a-real-password',
  sessionPath: '.sessions/judge.storage.json',
  persist: async () => undefined,
  userIdentifier: 'IAC_Judge_WA_R1',
  waitForRetry: async () => undefined,
};

test.describe('session capture retry', { tag: '@svc-internal' }, () => {
  test('classifies explicit IDAM credential rejection as non-transient', () => {
    const error = new Error(
      'IDAM login did not establish authenticated session. IDAM page message: Your email or password is incorrect'
    );
    expect(isExplicitIdamLoginRejection(error)).toBe(true);
    expect(isTransientSessionCaptureError(error)).toBe(false);
  });

  test('classifies the current IDAM incorrect-credentials wording as non-transient', () => {
    const error = new Error('IDAM login did not establish authenticated session. IDAM page message: Incorrect email or password');
    expect(isExplicitIdamLoginRejection(error)).toBe(true);
    expect(isTransientSessionCaptureError(error)).toBe(false);
  });

  test('classifies unknown IDAM business rejection as non-transient', () => {
    const error = new Error(
      'IDAM login did not establish authenticated session. IDAM page message: Additional verification is required'
    );
    expect(isExplicitIdamLoginRejection(error)).toBe(false);
    expect(isTransientSessionCaptureError(error)).toBe(false);
  });

  test('keeps explicit IDAM service failures transient', () => {
    const error = new Error('IDAM login did not establish authenticated session. IDAM page message: Service unavailable (503)');
    expect(isTransientSessionCaptureError(error)).toBe(true);
  });

  test('does not treat a bare service-like number in an IDAM business message as transient', () => {
    const error = new Error(
      'IDAM login did not establish authenticated session. IDAM page message: Contact support quoting reference 503'
    );
    expect(isTransientSessionCaptureError(error)).toBe(false);
  });

  test('treats a recognised HTTP service status as transient', () => {
    expect(isTransientSessionCaptureError(new Error('IDAM response status 503'))).toBe(true);
  });

  test('retries an unexplained post-submit unauthenticated result', () => {
    const error = new Error(
      'IDAM login did not establish authenticated session for IAC_Judge_WA_R1 (url=https://idam.example.test/login)'
    );
    expect(isTransientSessionCaptureError(error)).toBe(true);
  });

  test('does not retry timeout text without a typed Playwright timeout', () => {
    expect(isTransientSessionCaptureError(new Error('IDAM request timeout policy reached'))).toBe(false);
  });

  test('does not retry a typed locator timeout that can indicate a wrong or changed page', () => {
    const error = new Error('locator.waitFor: Timeout 10000ms exceeded');
    error.name = 'TimeoutError';
    expect(isTransientSessionCaptureError(error)).toBe(false);
  });

  test('retries a typed navigation timeout', () => {
    const error = new Error('page.goto: Timeout 30000ms exceeded');
    error.name = 'TimeoutError';
    expect(isTransientSessionCaptureError(error)).toBe(true);
  });

  test('does not retry deterministic browser or cookie failures', () => {
    for (const certificateError of [
      'net::ERR_CERT_AUTHORITY_INVALID',
      'net::ERR_CERT_COMMON_NAME_INVALID',
      'net::ERR_CERT_DATE_INVALID',
    ]) {
      expect(isTransientSessionCaptureError(new Error(certificateError))).toBe(false);
    }
    expect(isTransientSessionCaptureError(new Error('Cannot persist unauthenticated session'))).toBe(false);
  });

  test('retries when Chromium certificate verifier configuration changes during navigation', () => {
    const error = new Error('page.goto: net::ERR_CERT_VERIFIER_CHANGED at https://manage-case.example.test/');

    expect(isTransientSessionCaptureError(error)).toBe(true);
    expect(sessionCaptureTest.isTransientNavigationFailure(error, 'https://manage-case.example.test/')).toBe(true);
  });

  test('retries an authenticated app navigation after the certificate verifier changes', async () => {
    let gotoCalls = 0;
    const page = {
      goto: async () => {
        gotoCalls += 1;
        if (gotoCalls === 1) {
          throw new Error('page.goto: net::ERR_CERT_VERIFIER_CHANGED at https://manage-case.example.test/');
        }
      },
      url: () => 'https://manage-case.example.test/',
    } as unknown as Page;

    await sessionCaptureTest.gotoAppTarget(page, 'STAFF_ADMIN-1', 'https://manage-case.example.test/');

    expect(gotoCalls).toBe(2);
  });

  test('redacts OAuth query metadata from terminal app and login navigation errors', async () => {
    const page = {
      goto: async () => {
        throw new Error(
          'page.goto: net::ERR_CERT_AUTHORITY_INVALID at https://idam.example.test/callback?state=secret&nonce=secret&code=secret'
        );
      },
      url: () => 'https://idam.example.test/callback?state=secret&nonce=secret&code=secret',
    } as unknown as Page;

    for (const navigate of [
      () => sessionCaptureTest.gotoAppTarget(page, 'STAFF_ADMIN-1', 'https://idam.example.test/callback?state=secret'),
      () => sessionCaptureTest.gotoLoginTarget(page, 'STAFF_ADMIN-1', 'https://idam.example.test/login?state=secret'),
    ]) {
      let capturedError: Error | undefined;
      try {
        await navigate();
      } catch (error) {
        capturedError = error as Error;
      }

      expect(capturedError?.message).toContain('https://idam.example.test/callback');
      expect(capturedError?.message).not.toContain('state=secret');
      expect(capturedError?.message).not.toContain('nonce=secret');
      expect(capturedError?.message).not.toContain('code=secret');
    }
  });

  test('does not retry persistence failures even when their cause looks transient', () => {
    const error = new Error('Session persistence failed: net::ERR_CONNECTION_RESET');
    error.name = 'SessionPersistenceError';
    expect(isTransientSessionCaptureError(error)).toBe(false);
  });

  test('does not retry unconfirmed cancellation even when cleanup evidence looks transient', () => {
    const error = new Error('Session capture attempt timed out after 45000ms; timeout cleanup failed: 503 Service Unavailable');
    error.name = 'SessionCancellationError';

    expect(isTransientSessionCaptureError(error)).toBe(false);
  });

  test('retries exhausted transient app navigation failures once', () => {
    expect(
      isTransientSessionCaptureError(
        new Error('Navigation landed on chrome-error://chromewebdata/ while opening https://manage-case.example.test')
      )
    ).toBe(true);
    expect(isTransientSessionCaptureError(new Error('page.goto: net::ERR_NAME_NOT_RESOLVED'))).toBe(true);
    expect(isTransientSessionCaptureError(new Error('page.goto: ERR_INTERNET_DISCONNECTED'))).toBe(true);
  });

  test('lock wait covers owner reuse while delayed capture still leaves journey time', () => {
    const guardedOperationBudget =
      sessionCaptureTest.sessionCaptureBrowserLaunchBudgetMs +
      2 * (sessionCaptureTest.sessionCaptureTargetBudgetMs + sessionCaptureTest.sessionCaptureContextCloseBudgetMs) +
      sessionCaptureTest.sessionCapturePersistBudgetMs +
      sessionCaptureTest.sessionCaptureRetryBackoffMaxMs +
      sessionCaptureTest.sessionCaptureBrowserCloseBudgetMs;
    expect(sessionCaptureTest.sessionCaptureOwnerBudgetMs).toBe(guardedOperationBudget);
    expect(sessionCaptureTest.sessionCaptureLockHeadroomMs).toBeGreaterThan(0);
    expect(sessionCaptureTest.sessionCaptureLockWaitMs).toBe(
      guardedOperationBudget + sessionCaptureTest.sessionCaptureLockHeadroomMs
    );
    expect(sessionCaptureTest.sessionCaptureLockWaitMs).toBeGreaterThan(guardedOperationBudget);
    expect(sessionCaptureTest.sessionCaptureLockWaitMs).toBeLessThanOrEqual(
      INTEGRATION_TEST_TIMEOUT_MS - POST_SESSION_CAPTURE_JOURNEY_ALLOWANCE_MS
    );
    expect(sessionCaptureTest.sessionCaptureLockStartBudgetMs + guardedOperationBudget).toBeLessThanOrEqual(
      INTEGRATION_TEST_TIMEOUT_MS - POST_SESSION_CAPTURE_JOURNEY_ALLOWANCE_MS
    );
  });

  test('enforces operation budgets with a typed timeout', async () => {
    const operation = sessionCaptureTest.withOperationTimeout(
      () => new Promise<void>(() => undefined),
      5,
      'Session capture attempt timed out after 5ms'
    );

    await expect(operation).rejects.toMatchObject({
      name: 'TimeoutError',
      message: 'Session capture attempt timed out after 5ms',
    });
  });

  test('waits for timeout cancellation and ignores a late operation result', async () => {
    let resolveOperation: (() => void) | undefined;
    let cancellationFinished = false;
    const operation = sessionCaptureTest.withOperationTimeout(
      () =>
        new Promise<void>((resolve) => {
          resolveOperation = resolve;
        }),
      5,
      'operation timed out',
      async () => {
        await new Promise<void>((resolve) => setTimeout(resolve, 5));
        cancellationFinished = true;
      }
    );

    await expect(operation).rejects.toMatchObject({ name: 'TimeoutError', message: 'operation timed out' });
    expect(cancellationFinished).toBe(true);
    resolveOperation?.();
  });

  test('fails closed when timeout cancellation cannot be confirmed', async () => {
    let capturedError: Error | undefined;

    try {
      await sessionCaptureTest.withOperationTimeout(
        () => new Promise<void>(() => undefined),
        5,
        'Session capture attempt timed out after 5ms',
        async () => {
          throw new Error('Browser context close timed out after 5ms');
        }
      );
    } catch (error) {
      capturedError = error as Error;
    }

    expect(capturedError).toMatchObject({
      name: 'SessionCancellationError',
      message: 'Session capture attempt timed out after 5ms; timeout cleanup failed: Browser context close timed out after 5ms',
    });
    expect(isTransientSessionCaptureError(capturedError!)).toBe(false);
  });

  test('does not publish storage state after persistence is aborted', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-persist-abort-'));
    const sessionPath = path.join(tempDir, 'session.json');
    const abortController = new AbortController();
    let releaseStorageState: (() => void) | undefined;
    let storageStateStarted: (() => void) | undefined;
    const storageStateStart = new Promise<void>((resolve) => {
      storageStateStarted = resolve;
    });
    const context = {
      addCookies: async () => undefined,
      storageState: async ({ path: stagingPath }: { path: string }) => {
        storageStateStarted?.();
        await new Promise<void>((resolve) => {
          releaseStorageState = resolve;
        });
        fs.writeFileSync(stagingPath, JSON.stringify({ cookies: authCookies }), 'utf8');
      },
    };
    const cookieUtils = {
      writeManageCasesSession: (stagingPath: string, cookies: Cookie[]) => {
        fs.writeFileSync(stagingPath, JSON.stringify({ cookies }), 'utf8');
      },
    };

    const persistence = sessionCaptureTest.persistSession(sessionPath, authCookies, context as any, 'IAC_Judge_WA_R1', {
      cookieUtils: cookieUtils as any,
      fs,
      signal: abortController.signal,
    });
    await storageStateStart;
    abortController.abort();
    releaseStorageState?.();

    await expect(persistence).rejects.toMatchObject({ name: 'AbortError' });
    expect(fs.existsSync(sessionPath)).toBe(false);
    expect(fs.readdirSync(tempDir)).toEqual([]);
  });

  test('retries an enforced session capture budget timeout', () => {
    const error = new Error(`Session capture attempt timed out after ${sessionCaptureTest.sessionCaptureTargetBudgetMs}ms`);
    error.name = 'TimeoutError';
    expect(isTransientSessionCaptureError(error)).toBe(true);
  });

  test('retries one transient failure cycle with a fresh context', async () => {
    const { launcher, contexts } = createLauncher();
    let loginCalls = 0;
    let retryWaitCalls = 0;
    const loginTargets: string[] = [];

    await sessionCaptureTest.loginAndPersistSession({
      ...commonArgs,
      chromiumLauncher: launcher as any,
      waitForRetry: async () => {
        retryWaitCalls += 1;
      },
      executeLoginAttemptFn: async (_page, _idamPage, _userIdentifier, _email, _password, loginTarget) => {
        loginCalls += 1;
        loginTargets.push(loginTarget);
        if (loginCalls === 1) {
          const error = new Error('Navigation timed out');
          error.name = 'TimeoutError';
          throw error;
        }
      },
    });

    expect(loginCalls).toBe(2);
    expect(retryWaitCalls).toBe(1);
    expect(loginTargets).toEqual(['https://manage-case.example.test/', 'https://manage-case.example.test/']);
    expect(contexts).toHaveLength(2);
    expect(contexts.map((context) => context.closeCalls)).toEqual([1, 1]);
  });

  test('retries the certificate verifier change once at the outer capture boundary with a fresh context', async () => {
    const { launcher, contexts } = createLauncher();
    let loginCalls = 0;
    let retryWaitCalls = 0;

    await sessionCaptureTest.loginAndPersistSession({
      ...commonArgs,
      chromiumLauncher: launcher as any,
      waitForRetry: async () => {
        retryWaitCalls += 1;
      },
      executeLoginAttemptFn: async () => {
        loginCalls += 1;
        if (loginCalls === 1) {
          throw new Error(
            'page.goto: net::ERR_CERT_VERIFIER_CHANGED at https://manage-case.example.test/ Call log: navigating to the target'
          );
        }
      },
    });

    expect(loginCalls).toBe(2);
    expect(retryWaitCalls).toBe(1);
    expect(contexts).toHaveLength(2);
    expect(contexts.map((context) => context.closeCalls)).toEqual([1, 1]);
  });

  test('does not retry when the failed attempt context cannot be closed', async () => {
    const { launcher, contexts } = createLauncher({ failFirstContextClose: true });
    let loginCalls = 0;
    let retryWaitCalls = 0;

    await expect(
      sessionCaptureTest.loginAndPersistSession({
        ...commonArgs,
        chromiumLauncher: launcher as any,
        waitForRetry: async () => {
          retryWaitCalls += 1;
        },
        executeLoginAttemptFn: async () => {
          loginCalls += 1;
          const error = new Error('Navigation timed out');
          error.name = 'TimeoutError';
          throw error;
        },
      })
    ).rejects.toThrow('browser context cleanup failed before retry: context close failed');

    expect(loginCalls).toBe(1);
    expect(retryWaitCalls).toBe(0);
    expect(contexts).toHaveLength(1);
    expect(contexts[0].closeCalls).toBe(1);
  });

  test('does not repeat login after a persistence failure', async () => {
    const { launcher, contexts } = createLauncher();
    let loginCalls = 0;
    let retryWaitCalls = 0;

    await expect(
      sessionCaptureTest.loginAndPersistSession({
        ...commonArgs,
        chromiumLauncher: launcher as any,
        persist: async () => {
          throw new Error('net::ERR_CONNECTION_RESET');
        },
        waitForRetry: async () => {
          retryWaitCalls += 1;
        },
        executeLoginAttemptFn: async () => {
          loginCalls += 1;
        },
      })
    ).rejects.toThrow('Session persistence failed for IAC_Judge_WA_R1: net::ERR_CONNECTION_RESET');

    expect(loginCalls).toBe(1);
    expect(retryWaitCalls).toBe(0);
    expect(contexts).toHaveLength(1);
    expect(contexts[0].closeCalls).toBe(1);
  });

  test('the real persistence boundary rejects lock compromise before atomic publication', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-persist-lock-compromise-'));
    const sessionPath = path.join(tempDir, 'session.storage.json');
    const lockError = new Error('Session lock ownership was lost for IAC_Judge_WA_R1');
    lockError.name = 'SessionLockCompromisedError';
    const context = {
      addCookies: async () => undefined,
      storageState: async ({ path: stagingPath }: { path: string }) => {
        fs.writeFileSync(stagingPath, JSON.stringify({ cookies: authCookies }), 'utf8');
      },
    };
    const cookieUtils = {
      writeManageCasesSession: (stagingPath: string, cookies: Cookie[]) => {
        fs.writeFileSync(stagingPath, JSON.stringify({ cookies }), 'utf8');
      },
    };

    try {
      await expect(
        sessionCaptureTest.persistSession(sessionPath, authCookies, context as any, 'IAC_Judge_WA_R1', {
          assertLockOwned: () => {
            throw lockError;
          },
          cookieUtils: cookieUtils as any,
          fs,
        })
      ).rejects.toBe(lockError);

      expect(fs.existsSync(sessionPath)).toBe(false);
      expect(fs.readdirSync(tempDir)).toEqual([]);
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('retries an unexplained unauthenticated result once with a fresh context', async () => {
    const { launcher, contexts } = createLauncher();
    let loginCalls = 0;

    await expect(
      sessionCaptureTest.loginAndPersistSession({
        ...commonArgs,
        chromiumLauncher: launcher as any,
        executeLoginAttemptFn: async () => {
          loginCalls += 1;
          throw new Error(
            'IDAM login did not establish authenticated session for IAC_Judge_WA_R1 (url=https://idam.example.test/login)'
          );
        },
      })
    ).rejects.toThrow('after 2 of 2 capture attempts');

    expect(loginCalls).toBe(2);
    expect(contexts).toHaveLength(2);
    expect(contexts.map((context) => context.closeCalls)).toEqual([1, 1]);
  });

  test('recovers when the unexplained unauthenticated result is transient', async () => {
    const { launcher, contexts } = createLauncher();
    let loginCalls = 0;

    await sessionCaptureTest.loginAndPersistSession({
      ...commonArgs,
      chromiumLauncher: launcher as any,
      executeLoginAttemptFn: async () => {
        loginCalls += 1;
        if (loginCalls === 1) {
          throw new Error(
            'IDAM login did not establish authenticated session for IAC_Judge_WA_R1 (url=https://idam.example.test/login)'
          );
        }
      },
    });

    expect(loginCalls).toBe(2);
    expect(contexts).toHaveLength(2);
    expect(contexts.map((context) => context.closeCalls)).toEqual([1, 1]);
  });

  test('persists the primary session without a cooldown or pool fallback after retry recovery', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-retry-recovery-'));
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
    const { launcher } = createLauncher();
    const freshPaths = new Set<string>();
    const loginCalls: string[] = [];

    try {
      process.chdir(tempDir);
      const result = await withOrderedSessionFallback([primary, fallback], async (identity) => {
        await sessionCaptureTest.sessionCaptureWith([identity], {
          chromiumLauncher: launcher as any,
          config: commonArgs.activeConfig,
          env: commonArgs.env,
          isSessionFresh: (sessionPath) => freshPaths.has(sessionPath),
          persistSession: async (sessionPath) => {
            freshPaths.add(sessionPath);
          },
          loginAndPersistSession: (args) =>
            sessionCaptureTest.loginAndPersistSession({
              ...args,
              idamFactory: commonArgs.idamFactory,
              executeLoginAttemptFn: async () => {
                loginCalls.push(args.userIdentifier);
                if (loginCalls.length === 1) {
                  throw new Error(
                    'IDAM login did not establish authenticated session for PRIMARY (url=https://idam.example.test/login)'
                  );
                }
              },
              waitForRetry: async () => undefined,
            }),
          resolveSessionIdentity: (candidate) => candidate as SessionIdentity,
        });
        return identity.userIdentifier;
      });

      expect(result.selectedUserIdentifier).toBe('PRIMARY');
      expect(loginCalls).toEqual(['PRIMARY', 'PRIMARY']);
      expect(fs.readdirSync(path.join(tempDir, '.sessions')).some((name) => name.endsWith('.capture-failed.json'))).toBe(false);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('persists one bounded fallback after two unexplained primary login failures', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-retry-fallback-'));
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
    const { launcher } = createLauncher();
    const freshPaths = new Set<string>();
    const loginCalls: string[] = [];

    try {
      process.chdir(tempDir);
      const result = await withOrderedSessionFallback([primary, fallback], async (identity) => {
        await sessionCaptureTest.sessionCaptureWith([identity], {
          chromiumLauncher: launcher as any,
          config: commonArgs.activeConfig,
          env: commonArgs.env,
          isSessionFresh: (sessionPath) => freshPaths.has(sessionPath),
          persistSession: async (sessionPath) => {
            freshPaths.add(sessionPath);
          },
          loginAndPersistSession: (args) =>
            sessionCaptureTest.loginAndPersistSession({
              ...args,
              idamFactory: commonArgs.idamFactory,
              executeLoginAttemptFn: async () => {
                loginCalls.push(args.userIdentifier);
                if (args.userIdentifier === 'PRIMARY') {
                  throw new Error(
                    'IDAM login did not establish authenticated session for PRIMARY (url=https://idam.example.test/login)'
                  );
                }
              },
              waitForRetry: async () => undefined,
            }),
          resolveSessionIdentity: (candidate) => candidate as SessionIdentity,
        });
        return identity.userIdentifier;
      });

      expect(result.selectedUserIdentifier).toBe('FALLBACK');
      expect(loginCalls).toEqual(['PRIMARY', 'PRIMARY', 'FALLBACK']);
      const markerFile = fs.readdirSync(path.join(tempDir, '.sessions')).find((name) => name.endsWith('.capture-failed.json'));
      expect(markerFile).toBeTruthy();
      expect(JSON.parse(fs.readFileSync(path.join(tempDir, '.sessions', markerFile!), 'utf8')).failureKind).toBe(
        'unexplained-idam-login-rejection'
      );
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('does not retry an explicit IDAM credential rejection', async () => {
    const { launcher, contexts } = createLauncher();
    let loginCalls = 0;

    await expect(
      sessionCaptureTest.loginAndPersistSession({
        ...commonArgs,
        chromiumLauncher: launcher as any,
        executeLoginAttemptFn: async () => {
          loginCalls += 1;
          throw new Error(
            'IDAM login did not establish authenticated session. IDAM page message: Your email or password is incorrect'
          );
        },
      })
    ).rejects.toThrow('Login failed for IAC_Judge_WA_R1 at https://manage-case.example.test/ after 1 of 2 capture attempts');

    expect(loginCalls).toBe(1);
    expect(contexts).toHaveLength(1);
  });

  test('does not retry or change target for an unknown IDAM business rejection', async () => {
    const { launcher, contexts } = createLauncher();
    let loginCalls = 0;

    await expect(
      sessionCaptureTest.loginAndPersistSession({
        ...commonArgs,
        chromiumLauncher: launcher as any,
        executeLoginAttemptFn: async () => {
          loginCalls += 1;
          throw new Error(
            'IDAM login did not establish authenticated session. IDAM page message: Additional verification is required'
          );
        },
      })
    ).rejects.toThrow('Login failed for IAC_Judge_WA_R1 at https://manage-case.example.test/ after 1 of 2 capture attempts');

    expect(loginCalls).toBe(1);
    expect(contexts).toHaveLength(1);
  });

  test('does not retry an unclassified error', async () => {
    const { launcher, contexts } = createLauncher();
    let loginCalls = 0;

    await expect(
      sessionCaptureTest.loginAndPersistSession({
        ...commonArgs,
        chromiumLauncher: launcher as any,
        executeLoginAttemptFn: async () => {
          loginCalls += 1;
          throw new Error('unexpected application state');
        },
      })
    ).rejects.toThrow(
      'Login failed for IAC_Judge_WA_R1 at https://manage-case.example.test/ after 1 of 2 capture attempts: unexpected application state'
    );

    expect(loginCalls).toBe(1);
    expect(contexts).toHaveLength(1);
  });

  test('sanitizes URL query parameters in root failure evidence', async () => {
    const { launcher } = createLauncher();
    let capturedError: Error | undefined;

    try {
      await sessionCaptureTest.loginAndPersistSession({
        ...commonArgs,
        chromiumLauncher: launcher as any,
        executeLoginAttemptFn: async () => {
          throw new Error('unexpected state at https://idam.example.test/login?state=secret&nonce=secret');
        },
      });
    } catch (error) {
      capturedError = error as Error;
    }

    expect(capturedError?.message).toContain('unexpected state at https://idam.example.test/login');
    expect(capturedError?.message).not.toContain('state=secret');
    expect((capturedError as Error & { cause?: Error }).cause?.message).not.toContain('nonce=secret');
  });

  test('stops after the second transient failure cycle', async () => {
    const { launcher, contexts } = createLauncher();
    let loginCalls = 0;

    await expect(
      sessionCaptureTest.loginAndPersistSession({
        ...commonArgs,
        chromiumLauncher: launcher as any,
        executeLoginAttemptFn: async () => {
          loginCalls += 1;
          throw new Error('net::ERR_CONNECTION_RESET');
        },
      })
    ).rejects.toThrow(
      'Login failed for IAC_Judge_WA_R1 at https://manage-case.example.test/ after 2 of 2 capture attempts: net::ERR_CONNECTION_RESET'
    );

    expect(loginCalls).toBe(2);
    expect(contexts).toHaveLength(2);
  });
});
