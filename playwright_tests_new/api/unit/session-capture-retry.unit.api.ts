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
          locator: () => ({ waitFor: async () => undefined }),
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

  test('classifies generic unauthenticated IDAM results as non-transient', () => {
    const error = new Error(
      'IDAM login did not establish authenticated session for IAC_Judge_WA_R1 (url=https://idam.example.test/login)'
    );
    expect(isTransientSessionCaptureError(error)).toBe(false);
  });

  test('does not retry timeout text without a typed Playwright timeout', () => {
    expect(isTransientSessionCaptureError(new Error('IDAM request timeout policy reached'))).toBe(false);
  });

  test('does not retry deterministic browser or cookie failures', () => {
    expect(isTransientSessionCaptureError(new Error('net::ERR_CERT_AUTHORITY_INVALID'))).toBe(false);
    expect(isTransientSessionCaptureError(new Error('Cannot persist unauthenticated session'))).toBe(false);
  });

  test('lock wait budget covers two capture attempts plus persistence', () => {
    expect(sessionCaptureTest.sessionCaptureLockWaitMs).toBe(300_000);
  });

  test('retries one transient failure cycle with a fresh context', async () => {
    const { launcher, contexts } = createLauncher();
    let loginCalls = 0;

    await sessionCaptureTest.loginAndPersistSession({
      ...commonArgs,
      chromiumLauncher: launcher as any,
      executeLoginAttemptFn: async () => {
        loginCalls += 1;
        if (loginCalls === 1) {
          const error = new Error('Navigation timed out');
          error.name = 'TimeoutError';
          throw error;
        }
      },
    });

    expect(loginCalls).toBe(2);
    expect(contexts).toHaveLength(2);
    expect(contexts.map((context) => context.closeCalls)).toEqual([1, 1]);
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
      'Login failed for IAC_Judge_WA_R1 at https://idam.example.test/login after 2 of 2 capture attempts: net::ERR_CONNECTION_RESET'
    );

    expect(loginCalls).toBe(2);
    expect(contexts).toHaveLength(2);
  });
});
