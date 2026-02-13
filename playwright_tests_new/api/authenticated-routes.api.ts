import { authenticatedRoutes } from '../common/authenticatedRoutes';
import { test, expect } from './fixtures';
import { expectStatus, StatusSets } from './utils/apiTestUtils';

test.describe('Authenticated routes require session', () => {
  authenticatedRoutes.forEach(({ endpoint }, index) => {
    test(`[${index + 1}] GET ${endpoint} returns guarded status`, async ({ anonymousClient }) => {
      const response = await anonymousClient.get<Record<string, unknown>>(endpoint, {
        throwOnError: false,
      });
      expectStatus(response.status, [...StatusSets.guardedBasic, 500, 502]);
      if (response.status === 401 && response.data) {
        expect(response.data).toMatchObject({ message: 'Unauthorized' });
      }
    });
  });
});
