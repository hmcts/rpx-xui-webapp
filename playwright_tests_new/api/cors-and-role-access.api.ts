import { test, expect, request } from '@playwright/test';

import { config } from './utils/apiTestRuntimeConfig';
import { expectStatus, StatusSets, withRetry } from './utils/apiTestUtils';
import { assertCorsHeaders, shouldIgnoreCorsError } from './utils/corsUtils';

const baseURL = config.baseUrl.replace(/\/+$/, '');
const allowedOrigin = process.env.CORS_ALLOWED_ORIGINS?.split(',').find(Boolean) ?? '';

const origins = [
  { label: 'allowed', origin: allowedOrigin, expected: StatusSets.corsAllowed },
  { label: 'disallowed', origin: 'https://example.invalid', expected: StatusSets.corsDisallowed },
];

test.describe('CORS and OPTIONS', { tag: '@svc-cors' }, () => {
  origins.forEach(({ label, origin, expected }) => {
    test(`OPTIONS /api/user/details (${label} origin)`, async () => {
      test.skip(label === 'allowed' && !allowedOrigin, 'INCONCLUSIVE: CORS_ALLOWED_ORIGINS is not configured');
      const ctx = await request.newContext({ baseURL, ignoreHTTPSErrors: true });
      try {
        const res = await withRetry(async () => {
          const response = await ctx.fetch('api/user/details', {
            method: 'OPTIONS',
            headers: { origin, 'access-control-request-method': 'GET' },
            failOnStatusCode: false,
          });
          return { status: response.status(), headers: response.headers() };
        });
        expectStatus(res.status, expected);
        if (label === 'allowed') {
          expect(res.status, 'INCONCLUSIVE: allowed-origin preflight must succeed before CORS can pass').toBeLessThan(300);
        }
        assertCorsHeaders(expected, res.status, res.headers, origin);
      } catch (error) {
        if (shouldIgnoreCorsError(error)) {
          throw new Error('INCONCLUSIVE: CORS target is unreachable');
        }
        throw error;
      } finally {
        await ctx.dispose();
      }
    });

    test(`OPTIONS /api/configuration (${label} origin)`, async () => {
      test.skip(label === 'allowed' && !allowedOrigin, 'INCONCLUSIVE: CORS_ALLOWED_ORIGINS is not configured');
      const ctx = await request.newContext({ baseURL, ignoreHTTPSErrors: true });
      try {
        const res = await withRetry(async () => {
          const response = await ctx.fetch('api/configuration', {
            method: 'OPTIONS',
            headers: { origin, 'access-control-request-method': 'GET' },
            failOnStatusCode: false,
          });
          return { status: response.status(), headers: response.headers() };
        });
        expectStatus(res.status, expected);
        if (label === 'allowed') {
          expect(res.status, 'INCONCLUSIVE: allowed-origin preflight must succeed before CORS can pass').toBeLessThan(300);
        }
        assertCorsHeaders(expected, res.status, res.headers, origin);
      } catch (error) {
        if (shouldIgnoreCorsError(error)) {
          throw new Error('INCONCLUSIVE: CORS target is unreachable');
        }
        throw error;
      } finally {
        await ctx.dispose();
      }
    });
  });
});
