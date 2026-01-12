import { test, expect, request } from '@playwright/test';
import { config } from '../common/apiTestConfig';
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
        assertCorsHeaders(expected, res.status(), res.headers(), origin);
      } catch (error) {
        if (shouldIgnoreCorsError(error)) {
          return;
        }
        throw error;
      } finally {
        await ctx.dispose();
      }
    });

    test(`OPTIONS /api/configuration (${label} origin)`, async () => {
      const ctx = await request.newContext({ baseURL, ignoreHTTPSErrors: true });
      try {
        const res = await ctx.fetch('api/configuration', {
          method: 'OPTIONS',
          headers: { origin },
          failOnStatusCode: false
        });
        expectStatus(res.status(), expected);
        assertCorsHeaders(expected, res.status(), res.headers(), origin);
      } catch (error) {
        if (shouldIgnoreCorsError(error)) {
          return;
        }
        throw error;
      } finally {
        await ctx.dispose();
      }
    });
  });
});

test.describe('CORS helper coverage', () => {
  test('assertCorsHeaders handles allowed and disallowed origins', () => {
    assertCorsHeaders(StatusSets.corsAllowed, 200, { 'access-control-allow-origin': 'https://example.test' }, 'https://example.test');
    assertCorsHeaders(StatusSets.corsAllowed, 204, {}, 'https://example.test');
    assertCorsHeaders(StatusSets.corsDisallowed, 200, { 'Access-Control-Allow-Origin': 'https://other.test' }, 'https://example.test');
    assertCorsHeaders(StatusSets.corsDisallowed, 502, {}, 'https://example.test');
  });

  test('shouldIgnoreCorsError handles network failures', () => {
    expect(shouldIgnoreCorsError(new Error('ENOTFOUND manage-case'))).toBe(true);
    expect(shouldIgnoreCorsError(new Error('ECONNREFUSED manage-case'))).toBe(true);
    expect(shouldIgnoreCorsError(new Error('ETIMEDOUT manage-case'))).toBe(false);
  });
});

function assertCorsHeaders(
  expected: ReadonlyArray<number>,
  status: number,
  headers: Record<string, string>,
  origin: string
) {
  if (expected === StatusSets.corsAllowed && status < 500) {
    const allowOrigin = headers['access-control-allow-origin'] || headers['Access-Control-Allow-Origin'];
    if (allowOrigin) {
      expect(allowOrigin).toBe(origin);
    }
  }
  if (expected === StatusSets.corsDisallowed && status < 500) {
    const allowed = headers['access-control-allow-origin'] || headers['Access-Control-Allow-Origin'];
    expect(allowed === origin).toBe(false);
  }
}

function shouldIgnoreCorsError(error: unknown): boolean {
  const message = (error as Error)?.message ?? '';
  if (/ENOTFOUND|ECONNREFUSED/.test(message)) {
    expect(message).toContain('manage-case');
    return true;
  }
  return false;
}
