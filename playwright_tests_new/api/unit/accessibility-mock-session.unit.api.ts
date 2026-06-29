import { expect, test } from '@playwright/test';
import { setupAccessibilityMockSession } from '../../E2E/utils/accessibility/accessibilityMockSession.js';

type RegisteredRoute = {
  pattern: string | RegExp;
  handler: (route: { fulfill: (payload: unknown) => Promise<void>; request: () => { method: () => string } }) => Promise<void>;
};

function createFakePage() {
  const routes: RegisteredRoute[] = [];
  const initScripts: unknown[] = [];

  return {
    initScripts,
    routes,
    async addInitScript(handler: unknown, args: unknown[]) {
      initScripts.push({ handler, args });
    },
    async route(pattern: string | RegExp, handler: RegisteredRoute['handler']) {
      routes.push({ pattern, handler });
    },
  };
}

async function invokeRoute(route: RegisteredRoute, method = 'GET') {
  const fulfillCalls: unknown[] = [];

  await route.handler({
    fulfill: async (payload: unknown) => {
      fulfillCalls.push(payload);
    },
    request: () => ({
      method: () => method,
    }),
  });

  return fulfillCalls;
}

test.describe('Accessibility mocked session helper', { tag: '@svc-internal' }, () => {
  test('registers authenticated app-shell routes without live session capture', async () => {
    const fakePage = createFakePage();

    await setupAccessibilityMockSession(fakePage as never, {
      userDetails: {
        userId: 'a11y-user',
        roles: ['caseworker-ia'],
      },
    });

    expect(fakePage.initScripts).toHaveLength(1);
    expect(fakePage.routes.map(({ pattern }) => pattern)).toEqual(
      expect.arrayContaining([
        '**/api/user/details*',
        '**/assets/config/config.json*',
        /\/external\/config\/ui(?:\/|\?|$)/,
        '**/auth/isAuthenticated*',
        '**/api/healthCheck*',
        '**/api/organisation*',
        '**/*launchdarkly.com/**',
      ])
    );

    const authRoute = fakePage.routes.find(({ pattern }) => pattern === '**/auth/isAuthenticated*');
    expect(authRoute).toBeDefined();

    const fulfilledBodies = await invokeRoute(authRoute as RegisteredRoute);
    expect(fulfilledBodies).toEqual([
      {
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(true),
      },
    ]);
  });
});
