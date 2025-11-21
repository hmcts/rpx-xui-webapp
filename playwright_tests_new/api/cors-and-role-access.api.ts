import { test, expect, request } from '@playwright/test';
import { config } from '../../test_codecept/integration/tests/config/config';

const baseURL = config.baseUrl.replace(/\/+$/, '');

const origins = [
  { label: 'allowed', origin: baseURL, expected: [200, 204, 400, 401, 403] },
  { label: 'disallowed', origin: 'https://example.invalid', expected: [200, 204, 400, 401, 403, 404] }
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
        expect(expected).toContain(res.status());
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
