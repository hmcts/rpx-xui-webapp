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

  test('retries one transient failure cycle with a fresh context', async () => {
    const { launcher, contexts } = createLauncher();
    let loginCalls = 0;

    await sessionCaptureTest.loginAndPersistSession({
      ...commonArgs,
      chromiumLauncher: launcher as any,
      executeLoginAttemptFn: async () => {
        loginCalls += 1;
        if (loginCalls <= 2) {
          const error = new Error('Navigation timed out');
          error.name = 'TimeoutError';
          throw error;
        }
      },
    });

    expect(loginCalls).toBe(3);
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
    ).rejects.toThrow('Login failed for IAC_Judge_WA_R1');

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
    ).rejects.toThrow('Login failed for IAC_Judge_WA_R1');

    expect(loginCalls).toBe(2);
    expect(contexts).toHaveLength(1);
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
    ).rejects.toThrow('Login failed for IAC_Judge_WA_R1');

    expect(loginCalls).toBe(4);
    expect(contexts).toHaveLength(2);
  });
});
