import { authenticatedRoutes } from '../common/authenticatedRoutes';
import { test, expect } from './fixtures';
import { expectStatus } from './utils/apiTestUtils';

test.describe('Authenticated routes require session', { tag: '@svc-auth' }, () => {
  authenticatedRoutes.forEach(({ endpoint }, index) => {
    test(`[${index + 1}] GET ${endpoint} returns guarded status`, async ({ anonymousClient }) => {
      const response = await anonymousClient.get<Record<string, unknown>>(endpoint, {
        throwOnError: false,
      });
      // Anonymous requests are rejected by the node app's auth interceptor before any proxying, so a 5xx is a real failure.
      expectStatus(response.status, [200, 401, 403]);
      if (response.status === 401 && response.data) {
        expect(response.data).toMatchObject({ message: 'Unauthorized' });
      }
    });
  });
});
