import { test, expect } from './fixtures';
import { endpoints } from '../../test_codecept/integration/tests/config/authenticatedRoutes';

test.describe('Authenticated routes require session', () => {
  endpoints.forEach(({ endpoint }, index) => {
    test(`[${index + 1}] GET ${endpoint} returns 401`, async ({ anonymousClient }) => {
      const response = await anonymousClient.get<Record<string, unknown>>(endpoint, {
        throwOnError: false
      });
      expect(response.status).toBe(401);
      expect(response.data).toMatchObject({
        message: 'Unauthorized'
      });
    });
  });
});
