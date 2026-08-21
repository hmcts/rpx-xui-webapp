import { expect, test } from '@playwright/test';

import { bootstrapApiSession } from '../../common/apiSessionBootstrap.js';

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
  test('follows progressive IDAM forms and publishes only an authenticated session', async () => {
    const calls: string[] = [];
    let postCount = 0;
    const result = await bootstrapApiSession(options, {
      requestFactory: async () =>
        ({
          get: async (url: string) => {
            calls.push(`GET ${url}`);
            if (url === 'auth/login') {
              return response(
                200,
                'https://idam.example.test/login',
                '<form action="/login"><input type="hidden" name="_csrf" value="abc&amp;123"><input name="email"></form>'
              );
            }
            return response(200, `https://manage-case.example.test/${url}`, url === 'auth/isAuthenticated' ? 'true' : '');
          },
          post: async (url: string, requestOptions: { form: Record<string, string> }) => {
            postCount += 1;
            calls.push(`POST ${url}`);
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
        }) as never,
      wait: async () => {},
    });

    expect(result.status).toBe('authenticated');
    expect(calls).toEqual([
      'GET auth/login',
      'POST https://idam.example.test/login',
      'POST https://idam.example.test/login/password',
      'GET /',
      'GET auth/isAuthenticated',
    ]);
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
