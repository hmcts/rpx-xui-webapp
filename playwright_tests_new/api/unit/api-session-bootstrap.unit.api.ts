import { expect, test } from '@playwright/test';

import { __test__ as apiSessionBootstrapTestApi, bootstrapApiSession } from '../../common/apiSessionBootstrap.js';

const options = {
  env: {} as NodeJS.ProcessEnv,
  targetUrl: 'https://manage-case.example.test',
  userIdentifier: 'UNIT_SOLICITOR',
  username: 'unit@example.test',
  password: 'mock-password',
  authCheckAttempts: 1,
  authCheckDelayMs: 0,
};

function response(status: number, url: string, body = '', headers: Record<string, string> = {}) {
  return { status: () => status, url: () => url, text: async () => body, headers: () => headers };
}

test.describe('API-first session bootstrap', { tag: '@svc-internal' }, () => {
  test('selects the credential form when a preceding form is unrelated', () => {
    expect(
      apiSessionBootstrapTestApi.parseLoginForm(
        '<form action="/cookies"><input name="analytics"></form><form action="/login"><input name="email"></form>',
        'https://idam.example.test/login'
      )
    ).toMatchObject({ action: 'https://idam.example.test/login', hasEmail: true, hasPassword: false });
  });

  test('follows progressive IDAM forms and publishes only an authenticated session', async () => {
    const calls: string[] = [];
    const requestTimeouts: number[] = [];
    let contextTimeout: number | undefined;
    let postCount = 0;
    const result = await bootstrapApiSession(
      { ...options, requestTimeoutMs: 200 },
      {
        requestFactory: async (contextOptions) => {
          contextTimeout = contextOptions?.timeout;
          return {
            get: async (url: string, requestOptions: { timeout: number }) => {
              calls.push(`GET ${url}`);
              requestTimeouts.push(requestOptions.timeout);
              if (url === 'auth/login') {
                return response(
                  200,
                  'https://idam.example.test/login',
                  '<form action="/login"><input type="hidden" name="_csrf" value="abc&amp;123"><input name="email"></form>'
                );
              }
              return response(200, `https://manage-case.example.test/${url}`, url === 'auth/isAuthenticated' ? 'true' : '');
            },
            post: async (url: string, requestOptions: { form: Record<string, string>; timeout: number }) => {
              postCount += 1;
              calls.push(`POST ${url}`);
              requestTimeouts.push(requestOptions.timeout);
              if (postCount === 1) {
                expect(requestOptions.form).toMatchObject({ _csrf: 'abc&123', email: options.username, save: 'Continue' });
                return response(
                  200,
                  'https://idam.example.test/login/password',
                  '<form action="/login/password"><input type="hidden" name="_csrf" value="def"><input type="password" name="password"></form>'
                );
              }
              expect(requestOptions.form).toMatchObject({ _csrf: 'def', password: options.password, save: 'Sign in' });
              return response(200, 'https://manage-case.example.test/');
            },
            storageState: async () => ({
              cookies: [
                { name: 'Idam.Session', value: 'idam-session' },
                { name: '__auth__', value: 'xui-session' },
              ],
              origins: [],
            }),
            dispose: async () => {},
          } as never;
        },
        wait: async () => {},
      }
    );

    expect(result.status).toBe('authenticated');
    expect(calls).toEqual([
      'GET auth/login',
      'POST https://idam.example.test/login',
      'POST https://idam.example.test/login/password',
      'GET /',
      'GET auth/isAuthenticated',
    ]);
    expect(contextTimeout).toBe(200);
    expect(requestTimeouts).toHaveLength(5);
    expect(requestTimeouts.every((timeout) => timeout > 0 && timeout <= 200)).toBe(true);
  });

  test('bounds a never-resolving request by the smaller request timeout and reports its stage', async () => {
    test.setTimeout(1_000);
    let observedRequestTimeout: number | undefined;
    let disposed = false;

    const result = await bootstrapApiSession(
      { ...options, bootstrapTimeoutMs: 200, requestTimeoutMs: 15 },
      {
        requestFactory: async () =>
          ({
            get: async (_url: string, requestOptions: { timeout: number }) => {
              observedRequestTimeout = requestOptions.timeout;
              return new Promise(() => undefined);
            },
            post: async () => response(500, 'https://idam.example.test/login'),
            storageState: async () => ({ cookies: [], origins: [] }),
            dispose: async () => {
              disposed = true;
            },
          }) as never,
      }
    );

    expect(observedRequestTimeout).toBeLessThanOrEqual(15);
    expect(disposed).toBe(true);
    expect(result).toMatchObject({ status: 'unavailable', stage: 'xui-auth-login' });
    expect(result.status === 'unavailable' ? result.reason : '').toContain(
      'API session bootstrap timed out during xui-auth-login'
    );
  });

  test('caps a request to the remaining shared capture budget', async () => {
    test.setTimeout(1_000);
    let observedRequestTimeout: number | undefined;
    const captureBudgetMs = 200;
    const captureDeadlineAt = Date.now() + captureBudgetMs;

    const result = await bootstrapApiSession(
      { ...options, bootstrapTimeoutMs: 500, requestTimeoutMs: 200, captureDeadlineAt },
      {
        requestFactory: async () =>
          ({
            get: async (_url: string, requestOptions: { timeout: number }) => {
              observedRequestTimeout = requestOptions.timeout;
              return new Promise(() => undefined);
            },
            post: async () => response(500, 'https://idam.example.test/login'),
            storageState: async () => ({ cookies: [], origins: [] }),
            dispose: async () => {},
          }) as never,
      }
    );

    expect(observedRequestTimeout).toBeLessThanOrEqual(captureBudgetMs);
    expect(result).toMatchObject({ status: 'unavailable', stage: 'xui-auth-login' });
  });

  test('bounds a never-resolving IDAM submission and reports the credential stage', async () => {
    test.setTimeout(1_000);
    let observedRequestTimeout: number | undefined;

    const result = await bootstrapApiSession(
      { ...options, bootstrapTimeoutMs: 200, requestTimeoutMs: 15 },
      {
        requestFactory: async () =>
          ({
            get: async () =>
              response(
                200,
                'https://idam.example.test/login',
                '<form action="/login"><input name="username"><input type="password" name="password"></form>'
              ),
            post: async (_url: string, requestOptions: { timeout: number }) => {
              observedRequestTimeout = requestOptions.timeout;
              return new Promise(() => undefined);
            },
            storageState: async () => ({ cookies: [], origins: [] }),
            dispose: async () => {},
          }) as never,
      }
    );

    expect(observedRequestTimeout).toBeLessThanOrEqual(15);
    expect(result).toMatchObject({ status: 'unavailable', stage: 'idam-username' });
    expect(result.status === 'unavailable' ? result.reason : '').toContain(
      'API session bootstrap timed out during idam-username'
    );
  });

  test('classifies XUI login route failures with the gateway reference', async () => {
    const result = await bootstrapApiSession(options, {
      requestFactory: async () =>
        ({
          get: async () => response(503, 'https://manage-case.example.test/auth/login', '', { 'x-azure-ref': 'gateway-123' }),
          post: async () => response(500, 'https://idam.example.test/login'),
          storageState: async () => ({ cookies: [], origins: [] }),
          dispose: async () => {},
        }) as never,
    });

    expect(result).toMatchObject({ status: 'unavailable', stage: 'xui-auth-login', statusCode: 503 });
    expect(result.status === 'unavailable' ? result.reason : '').toContain('gateway-123');
  });

  test('rejects incomplete cookies even when auth/isAuthenticated returns true', async () => {
    const result = await bootstrapApiSession(options, {
      requestFactory: async () =>
        ({
          get: async (url: string) =>
            url === 'auth/login'
              ? response(
                  200,
                  'https://idam.example.test/login',
                  '<form action="/login"><input name="username"><input type="password" name="password"></form>'
                )
              : response(200, `https://manage-case.example.test/${url}`, url === 'auth/isAuthenticated' ? 'true' : ''),
          post: async () => response(200, 'https://manage-case.example.test/'),
          storageState: async () => ({ cookies: [{ name: '__auth__', value: 'xui-session' }], origins: [] }),
          dispose: async () => {},
        }) as never,
      wait: async () => {},
    });

    expect(result).toMatchObject({ status: 'unavailable', stage: 'session-cookies' });
  });

  test('does not read storage state before XUI confirms authentication', async () => {
    let storageStateReads = 0;
    const result = await bootstrapApiSession(options, {
      requestFactory: async () =>
        ({
          get: async (url: string) =>
            url === 'auth/login'
              ? response(
                  200,
                  'https://idam.example.test/login',
                  '<form action="/login"><input name="username"><input type="password" name="password"></form>'
                )
              : response(200, `https://manage-case.example.test/${url}`, url === 'auth/isAuthenticated' ? 'false' : ''),
          post: async () => response(200, 'https://manage-case.example.test/'),
          storageState: async () => {
            storageStateReads += 1;
            return { cookies: [], origins: [] };
          },
          dispose: async () => {},
        }) as never,
      wait: async () => {},
    });

    expect(result).toMatchObject({ status: 'unavailable', stage: 'xui-auth-status' });
    expect(storageStateReads).toBe(0);
  });

  test('reports the credential stage when IDAM does not return a login form', async () => {
    const result = await bootstrapApiSession(options, {
      requestFactory: async () =>
        ({
          get: async () => response(200, 'https://idam.example.test/login', '<html>service unavailable</html>'),
          post: async () => response(500, 'https://idam.example.test/login'),
          storageState: async () => ({ cookies: [], origins: [] }),
          dispose: async () => {},
        }) as never,
    });

    expect(result).toMatchObject({ status: 'unavailable', stage: 'idam-username' });
  });

  test('removes OIDC query parameters from request failure diagnostics', async () => {
    const result = await bootstrapApiSession(options, {
      requestFactory: async () => {
        throw new Error('request failed at https://idam.example.test/login?state=secret-state&nonce=secret-nonce');
      },
    });

    expect(result.status === 'unavailable' ? result.reason : '').toContain('https://idam.example.test/login');
    expect(result.status === 'unavailable' ? result.reason : '').not.toContain('secret-state');
    expect(result.status === 'unavailable' ? result.reason : '').not.toContain('secret-nonce');
  });

  test('can explicitly retain browser-only session capture', async () => {
    let requestCount = 0;
    const result = await bootstrapApiSession(
      { ...options, env: { PW_SESSION_BOOTSTRAP_MODE: 'browser' } },
      {
        requestFactory: async () => {
          requestCount += 1;
          throw new Error('not expected');
        },
      }
    );

    expect(result).toMatchObject({ status: 'unavailable', stage: 'configuration' });
    expect(requestCount).toBe(0);
  });
});
