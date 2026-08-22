import { expect, test } from '@playwright/test';

import {
  AAT_AUTH_UNAVAILABLE_FAILURE,
  resolveSessionReuseValidationMode,
  shouldRejectUnavailableSessionValidation,
} from '../../common/sessionReusePolicy.js';

test.describe('Session reuse validation policy', { tag: '@svc-internal' }, () => {
  test('defaults local and CI execution to best-effort validation', () => {
    expect(resolveSessionReuseValidationMode({})).toBe('best-effort');
    expect(resolveSessionReuseValidationMode({ CI: 'true' })).toBe('best-effort');
  });

  test('honours explicit validation modes and only rejects unavailable validation in strict mode', () => {
    expect(resolveSessionReuseValidationMode({ PW_SESSION_REUSE_VALIDATION_MODE: 'best-effort', CI: 'true' })).toBe(
      'best-effort'
    );
    expect(resolveSessionReuseValidationMode({ PW_SESSION_REUSE_VALIDATION_MODE: 'strict' })).toBe('strict');
    expect(shouldRejectUnavailableSessionValidation('unavailable', { CI: 'true' })).toBe(false);
    expect(shouldRejectUnavailableSessionValidation('unavailable', {})).toBe(false);
    expect(shouldRejectUnavailableSessionValidation('unavailable', { PW_SESSION_REUSE_VALIDATION_MODE: 'best-effort' })).toBe(
      false
    );
    expect(shouldRejectUnavailableSessionValidation('authenticated', { CI: 'true' })).toBe(false);
    expect(AAT_AUTH_UNAVAILABLE_FAILURE).toBe('AAT_AUTH_UNAVAILABLE');
  });
});
