import { test, expect, request } from '@playwright/test';

import { config } from './utils/apiTestRuntimeConfig';
import { expectStatus, withRetry } from './utils/apiTestUtils';
import { corsAllowed, corsDisallowed, shouldIgnoreCorsError, validateCorsPreflightHeaders } from './utils/corsUtils';

const baseURL = config.baseUrl.replace(/\/+$/, '');
const allowedOrigin = process.env.CORS_ALLOWED_ORIGINS?.split(',').find(Boolean) ?? '';

const origins = [
  { label: 'allowed', origin: allowedOrigin, expected: corsAllowed },
  { label: 'disallowed', origin: 'https://example.invalid', expected: corsDisallowed },
];

test.describe('CORS and OPTIONS', { tag: '@svc-cors' }, () => {
  origins.forEach(({ label, origin, expected }) => {
    test(`OPTIONS /api/user/details (${label} origin)`, async () => {
      if (label === 'allowed') {
        expect(allowedOrigin, 'CORS_ALLOWED_ORIGINS must be configured for the allowed-origin live path').not.toBe('');
      }
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
        const validation = validateCorsPreflightHeaders(expected, res.status, res.headers, origin, 'GET');
        expect(validation.valid, validation.message ?? 'CORS preflight headers matched the expected policy').toBe(true);
      } catch (error) {
        if (shouldIgnoreCorsError(error)) {
          const message = error instanceof Error ? error.message : String(error);
          expect(message, 'CORS network errors must identify the manage-case target').toContain('manage-case');
          throw new Error('INCONCLUSIVE: CORS target is unreachable');
        }
        throw error;
      } finally {
        await ctx.dispose();
      }
    });

    test(`OPTIONS /api/configuration (${label} origin)`, async () => {
      if (label === 'allowed') {
        expect(allowedOrigin, 'CORS_ALLOWED_ORIGINS must be configured for the allowed-origin live path').not.toBe('');
      }
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
        const validation = validateCorsPreflightHeaders(expected, res.status, res.headers, origin, 'GET');
        expect(validation.valid, validation.message ?? 'CORS preflight headers matched the expected policy').toBe(true);
      } catch (error) {
        if (shouldIgnoreCorsError(error)) {
          const message = error instanceof Error ? error.message : String(error);
          expect(message, 'CORS network errors must identify the manage-case target').toContain('manage-case');
          throw new Error('INCONCLUSIVE: CORS target is unreachable');
        }
        throw error;
      } finally {
        await ctx.dispose();
      }
    });
  });
});
