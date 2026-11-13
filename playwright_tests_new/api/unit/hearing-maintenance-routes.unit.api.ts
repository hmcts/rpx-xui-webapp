import { test, expect, type Page, type Route } from '@playwright/test';
import { setupHearingsMockRoutes } from '../../integration/helpers/hearingsMockRoutes.helper';

test.describe('hearing maintenance mock boundaries', { tag: '@svc-internal' }, () => {
  for (const status of [200, 500]) {
    test(`cancellation uses the configured ${status} response without falling through to the provider`, async () => {
      const handlers = new Map<string | RegExp, (route: Route) => Promise<void>>();
      const page = {
        addInitScript: async () => {},
        route: async (pattern: string | RegExp, handler: (route: Route) => Promise<void>) => {
          handlers.set(pattern, handler);
        },
      } as unknown as Page;
      await setupHearingsMockRoutes(page, {
        userRoles: [],
        hearingsApiOverrides: { cancelHearings: { status, body: { cancellation: status } } },
      });
      const replies: unknown[] = [];
      const route = {
        request: () => ({ url: () => 'http://localhost/api/hearings/cancelHearings?hearingId=selected&caseId=case-a' }),
        fulfill: async (response: unknown) => {
          replies.push(response);
        },
        fallback: () => {
          throw new Error('Cancellation escaped the mock boundary');
        },
      } as unknown as Route;
      await handlers.get('**/api/hearings/**')!(route);
      expect(replies).toEqual([{ status, contentType: 'application/json', body: JSON.stringify({ cancellation: status }) }]);
    });
  }
});
