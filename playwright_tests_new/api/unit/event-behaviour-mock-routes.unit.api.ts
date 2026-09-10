import { expect, test } from '@playwright/test';
import { setupEventBehaviourMockRoutes } from '../../integration/helpers/eventBehaviourMockRoutes.helper.js';

type RouteHandler = (route: { fulfill: (payload: unknown) => Promise<void> }) => Promise<void>;

test.describe('event behaviour mock routes helper', { tag: '@svc-internal' }, () => {
  test('disables terms and conditions so mocked case details remain reachable', async () => {
    const routes: Array<{ pattern: string | RegExp; handler: RouteHandler }> = [];
    const fakePage = {
      async addInitScript() {},
      async route(pattern: string | RegExp, handler: RouteHandler) {
        routes.push({ pattern, handler });
      },
    };

    await setupEventBehaviourMockRoutes(fakePage as never);

    const configurationUrl = 'https://manage-case.example.test/api/configuration?configurationKey=termsAndConditionsEnabled';
    const configurationRoute = routes.find(({ pattern }) => pattern instanceof RegExp && pattern.test(configurationUrl));
    expect(configurationRoute).toBeDefined();
    expect(
      routes.some(
        ({ pattern }) =>
          pattern instanceof RegExp &&
          pattern.test('https://manage-case.example.test/api/configuration?configurationKey=unrelatedFeature')
      )
    ).toBe(false);

    const fulfillCalls: unknown[] = [];
    await configurationRoute!.handler({
      fulfill: async (payload: unknown) => {
        fulfillCalls.push(payload);
      },
    });

    expect(fulfillCalls).toEqual([
      {
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(false),
      },
    ]);
  });
});
