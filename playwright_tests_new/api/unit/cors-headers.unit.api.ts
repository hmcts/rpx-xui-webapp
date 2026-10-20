import { expect, test } from '@playwright/test';

import {
  corsAllowed,
  corsDisallowed,
  shouldIgnoreCorsError,
  validateCorsHeaders,
  validateCorsPreflightHeaders,
} from '../utils/corsUtils';

test.describe('CORS helper coverage', { tag: '@svc-internal' }, () => {
  test('requires exact allow-origin on successful allowed preflights, including 204', () => {
    for (const status of [200, 204]) {
      const headers = {
        'access-control-allow-origin': 'https://example.test',
        'access-control-allow-credentials': 'true',
        'access-control-allow-methods': 'GET, OPTIONS',
      };
      const validation = validateCorsPreflightHeaders(corsAllowed, status, headers, 'https://example.test', 'GET');
      expect(validation.valid, validation.message).toBe(true);
      const missingHeaders = validateCorsPreflightHeaders(corsAllowed, status, {}, 'https://example.test', 'GET');
      expect(missingHeaders.valid, missingHeaders.message).toBe(false);
      const wildcardOrigin = validateCorsPreflightHeaders(
        corsAllowed,
        status,
        { ...headers, 'access-control-allow-origin': '*' },
        'https://example.test',
        'GET'
      );
      expect(wildcardOrigin.valid, wildcardOrigin.message).toBe(false);
    }
  });

  test('matches copied allowed and disallowed policies by value', () => {
    const allowedPolicy = [...corsAllowed];
    const disallowedPolicy = [...corsDisallowed];
    const allowedValidation = validateCorsHeaders(
      allowedPolicy,
      204,
      { 'access-control-allow-origin': 'https://example.test' },
      'https://example.test'
    );
    const disallowedValidation = validateCorsHeaders(
      disallowedPolicy,
      204,
      { 'access-control-allow-origin': 'https://example.test' },
      'https://example.test'
    );

    expect(allowedValidation.valid, allowedValidation.message).toBe(true);
    expect(
      disallowedValidation.valid,
      disallowedValidation.message ?? 'Copied disallowed policy should reject echoed origin'
    ).toBe(false);
  });

  test('requires credentials and the requested method on successful allowed preflights', () => {
    const headers = { 'access-control-allow-origin': 'https://example.test', 'access-control-allow-methods': 'GET' };
    const missingCredentials = validateCorsPreflightHeaders(corsAllowed, 204, headers, 'https://example.test', 'GET');
    expect(missingCredentials.valid, missingCredentials.message).toBe(false);
    const wrongMethod = validateCorsPreflightHeaders(
      corsAllowed,
      204,
      { ...headers, 'access-control-allow-credentials': 'true' },
      'https://example.test',
      'POST'
    );
    expect(wrongMethod.valid, wrongMethod.message).toBe(false);
  });

  test('rejects an echoed disallowed origin on every accepted status', () => {
    for (const status of corsDisallowed) {
      const valid = validateCorsHeaders(corsDisallowed, status, {}, 'https://example.test');
      expect(valid.valid, valid.message).toBe(true);
      const echoed = validateCorsHeaders(
        corsDisallowed,
        status,
        { 'access-control-allow-origin': 'https://example.test' },
        'https://example.test'
      );
      expect(echoed.valid, echoed.message).toBe(false);
      const wildcard = validateCorsHeaders(
        corsDisallowed,
        status,
        { 'access-control-allow-origin': '*' },
        'https://example.test'
      );
      expect(wildcard.valid, wildcard.message).toBe(false);
    }
    expect(validateCorsHeaders(corsDisallowed, 502, {}, 'https://example.test').valid).toBe(true);
    expect(
      validateCorsHeaders(corsDisallowed, 200, { 'Access-Control-Allow-Origin': 'https://other.test' }, 'https://example.test')
        .valid
    ).toBe(true);
  });

  test('classifies known CORS network failures', () => {
    expect(shouldIgnoreCorsError(new Error('ENOTFOUND manage-case'))).toBe(true);
    expect(shouldIgnoreCorsError(new Error('ECONNREFUSED manage-case'))).toBe(true);
    expect(shouldIgnoreCorsError(new Error('ETIMEDOUT manage-case'))).toBe(false);
  });
});
