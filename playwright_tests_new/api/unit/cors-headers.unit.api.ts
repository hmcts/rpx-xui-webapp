import { expect, test } from '@playwright/test';

import { assertCorsHeaders, corsAllowed, corsDisallowed, shouldIgnoreCorsError } from '../utils/corsUtils';

test.describe('CORS helper coverage', { tag: '@svc-internal' }, () => {
  test('requires exact allow-origin on successful allowed preflights, including 204', () => {
    for (const status of [200, 204]) {
      assertCorsHeaders(corsAllowed, status, { 'access-control-allow-origin': 'https://example.test' }, 'https://example.test');
      expect(() => assertCorsHeaders(corsAllowed, status, {}, 'https://example.test')).toThrow();
    }
  });

  test('rejects an echoed disallowed origin on every accepted status', () => {
    for (const status of corsDisallowed) {
      assertCorsHeaders(corsDisallowed, status, {}, 'https://example.test');
      expect(() =>
        assertCorsHeaders(
          corsDisallowed,
          status,
          { 'access-control-allow-origin': 'https://example.test' },
          'https://example.test'
        )
      ).toThrow();
    }
    assertCorsHeaders(corsDisallowed, 502, {}, 'https://example.test');
    assertCorsHeaders(corsDisallowed, 200, { 'Access-Control-Allow-Origin': 'https://other.test' }, 'https://example.test');
  });

  test('classifies known CORS network failures', () => {
    expect(shouldIgnoreCorsError(new Error('ENOTFOUND manage-case'))).toBe(true);
    expect(shouldIgnoreCorsError(new Error('ECONNREFUSED manage-case'))).toBe(true);
    expect(shouldIgnoreCorsError(new Error('ETIMEDOUT manage-case'))).toBe(false);
  });
});
