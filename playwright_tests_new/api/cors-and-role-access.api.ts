import { test, expect, request } from '@playwright/test';
import { config } from '../../test_codecept/integration/tests/config/config';
import { expectStatus, StatusSets } from './utils/apiTestUtils';

const baseURL = config.baseUrl.replace(/\/+$/, '');

const origins = [
  { label: 'allowed', origin: baseURL, expected: StatusSets.corsAllowed },
  { label: 'disallowed', origin: 'https://example.invalid', expected: StatusSets.corsDisallowed }
];

test.describe('CORS and OPTIONS', () => {
  origins.forEach(({ label, origin, expected }) => {
    test(`OPTIONS /api/user/details (${label} origin)`, async () => {
      const ctx = await request.newContext({ baseURL, ignoreHTTPSErrors: true });
      try {
        const res = await ctx.fetch('api/user/details', {
          method: 'OPTIONS',
          headers: { origin },
          failOnStatusCode: false
        });
        expectStatus(res.status(), expected);
      } catch (error) {
        const message = (error as Error)?.message ?? '';
        if (/ENOTFOUND|ECONNREFUSED/.test(message)) {
          test.skip(`Base URL not reachable: ${message}`);
          return;
        }
        throw error;
      } finally {
        await ctx.dispose();
      }
    });
  });
});
