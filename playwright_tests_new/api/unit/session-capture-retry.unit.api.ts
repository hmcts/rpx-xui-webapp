import { expect, test } from '@playwright/test';
import type { BrowserContext, Page } from '@playwright/test';
import type { IdamPage } from '@hmcts/playwright-common';
import type { Cookie } from 'playwright-core';

import { __test__ as sessionCaptureTest } from '../../common/sessionCapture.js';
import { isExplicitIdamLoginRejection, isTransientSessionCaptureError } from '../../common/sessionCaptureRetry.js';

const authCookies: Cookie[] = [
  {
    name: 'Idam.Session',
    value: 'idam',
    domain: 'example.test',
    path: '/',
    expires: -1,
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
  },
  {
    name: '__auth__',
    value: 'auth',
    domain: 'example.test',
    path: '/',
    expires: -1,
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
  },
];

function createLauncher() {
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

  test('does not retry an unauthenticated result without proven transient evidence', () => {
    const error = new Error(
      'IDAM login did not establish authenticated session for IAC_Judge_WA_R1 (url=https://idam.example.test/login)'
    );
    expect(isTransientSessionCaptureError(error)).toBe(false);
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
    expect(isTransientSessionCaptureError(new Error('net::ERR_CERT_AUTHORITY_INVALID'))).toBe(false);
    expect(isTransientSessionCaptureError(new Error('Cannot persist unauthenticated session'))).toBe(false);
  });

  test('lock wait budget includes lifecycle headroom after capture and persistence budgets', () => {
    const guardedOperationBudget =
      2 * sessionCaptureTest.sessionCaptureTargetBudgetMs + sessionCaptureTest.sessionCapturePersistBudgetMs;
    expect(sessionCaptureTest.sessionCaptureLockHeadroomMs).toBeGreaterThan(0);
    expect(sessionCaptureTest.sessionCaptureLockWaitMs).toBe(
      guardedOperationBudget + sessionCaptureTest.sessionCaptureLockHeadroomMs
    );
    expect(sessionCaptureTest.sessionCaptureLockWaitMs).toBeGreaterThan(guardedOperationBudget);
    expect(sessionCaptureTest.sessionCaptureLockWaitMs).toBeLessThan(120_000);
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

  test('retries an enforced session capture budget timeout', () => {
    const error = new Error(`Session capture attempt timed out after ${sessionCaptureTest.sessionCaptureTargetBudgetMs}ms`);
    error.name = 'TimeoutError';
    expect(isTransientSessionCaptureError(error)).toBe(true);
  });

  test('retries one transient failure cycle with a fresh context', async () => {
    const { launcher, contexts } = createLauncher();
    let loginCalls = 0;
    const loginTargets: string[] = [];

    await sessionCaptureTest.loginAndPersistSession({
      ...commonArgs,
      chromiumLauncher: launcher as any,
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
    expect(loginTargets).toEqual(['https://manage-case.example.test/', 'https://manage-case.example.test/']);
    expect(contexts).toHaveLength(2);
    expect(contexts.map((context) => context.closeCalls)).toEqual([1, 1]);
  });

  test('fails an unclassified unauthenticated result without a second attempt', async () => {
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
    ).rejects.toThrow('after 1 of 2 capture attempts');

    expect(loginCalls).toBe(1);
    expect(contexts).toHaveLength(1);
    expect(contexts.map((context) => context.closeCalls)).toEqual([1]);
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
