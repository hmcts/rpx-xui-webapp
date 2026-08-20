import { expect, test } from '@playwright/test';

import {
  AAT_AUTH_UNAVAILABLE_FAILURE,
  resolveSessionReuseValidationMode,
  shouldRejectUnavailableSessionValidation,
} from '../../common/sessionReusePolicy.js';

test.describe('Session reuse validation policy', { tag: '@svc-internal' }, () => {
  test('defaults CI to strict and local execution to best-effort', () => {
    expect(resolveSessionReuseValidationMode({})).toBe('best-effort');
    expect(resolveSessionReuseValidationMode({ CI: 'true' })).toBe('strict');
  });

  test('honours explicit validation modes and only rejects unavailable validation in strict mode', () => {
    expect(resolveSessionReuseValidationMode({ PW_SESSION_REUSE_VALIDATION_MODE: 'best-effort', CI: 'true' })).toBe(
      'best-effort'
    );
    expect(resolveSessionReuseValidationMode({ PW_SESSION_REUSE_VALIDATION_MODE: 'strict' })).toBe('strict');
    expect(shouldRejectUnavailableSessionValidation('unavailable', { CI: 'true' })).toBe(true);
    expect(shouldRejectUnavailableSessionValidation('unavailable', {})).toBe(false);
    expect(shouldRejectUnavailableSessionValidation('authenticated', { CI: 'true' })).toBe(false);
    expect(AAT_AUTH_UNAVAILABLE_FAILURE).toBe('AAT_AUTH_UNAVAILABLE');
  });
});
