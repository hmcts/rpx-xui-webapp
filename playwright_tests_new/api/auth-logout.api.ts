import { expect, test } from '@playwright/test';
import { OpenID } from '@hmcts/rpx-xui-node-lib/dist/auth/oidc/models/openid.class.js';
import { http } from '@hmcts/rpx-xui-node-lib/dist/common/http/http.js';

type LogoutRequest = {
  get: (header: string) => string;
  logout: (options: unknown, callback: (error?: Error) => Promise<void>) => void;
  protocol: string;
  query: Record<string, unknown>;
  session: {
    destroy: (callback: (error?: Error) => void) => void;
    passport: {
      user: {
        tokenset: {
          accessToken: string;
          refreshToken: string;
          idToken: string;
        };
      };
    };
  };
};

test.describe('OIDC logout', { tag: '@svc-auth' }, () => {
  test('redirects to SSO logout with id token and post logout redirect uri', async () => {
    const strategy = new OpenID(undefined, {
      error: () => undefined,
      log: () => undefined,
    } as any);
    (strategy as any).options = {
      clientID: 'xuiwebapp',
      clientSecret: 'secret',
      logoutURL: 'https://idam-api.test/session',
      ssoLogoutURL: 'https://idam-web.test/o/endSession',
    };

    const deleteCalls: Array<{ url: string; config: unknown }> = [];
    const originalDelete = http.delete;
    http.delete = async (url: string, config?: unknown) => {
      deleteCalls.push({ url, config });
      return { status: 200 };
    };

    let logoutCallback: Promise<void> | undefined;
    let redirectLocation: string | undefined;
    const req: LogoutRequest = {
      get: (header: string) => (header === 'host' ? 'manage-case.test' : ''),
      logout: (_options, callback) => {
        logoutCallback = callback();
      },
      protocol: 'https',
      query: {},
      session: {
        destroy: (callback) => callback(),
        passport: {
          user: {
            tokenset: {
              accessToken: 'access-token',
              refreshToken: 'refresh-token',
              idToken: 'id-token',
            },
          },
        },
      },
    };
    const res = {
      redirect: (location: string) => {
        redirectLocation = location;
      },
      status: () => res,
    };

    try {
      await strategy.logout(req as any, res as any, () => undefined);
      await logoutCallback;
    } finally {
      http.delete = originalDelete;
    }

    expect(deleteCalls.map((call) => call.url)).toEqual([
      'https://idam-api.test/session/session/access-token',
      'https://idam-api.test/session/session/refresh-token',
    ]);
    expect(redirectLocation).toBeDefined();

    const logoutUrl = new URL(redirectLocation as string);
    expect(`${logoutUrl.origin}${logoutUrl.pathname}`).toBe('https://idam-web.test/o/endSession');
    expect(logoutUrl.searchParams.get('id_token_hint')).toBe('id-token');
    expect(logoutUrl.searchParams.get('post_logout_redirect_uri')).toBe('https://manage-case.test');
  });
});
