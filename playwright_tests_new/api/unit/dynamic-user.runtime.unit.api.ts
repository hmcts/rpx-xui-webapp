import { expect, test } from '@playwright/test';

import {
  parseStatusCode,
  resolveAssignmentModesToTry,
  resolveExpectedAssignmentPrincipalEmail,
  resolveIdamApiPathFromOverride,
  resolveOrganisationAssignmentRoles,
  shouldRetryTokenHydrationError,
  stripBearerPrefix,
  withBearerPrefix,
} from '../../E2E/utils/professional-user/runtime.js';

test.describe.configure({ mode: 'serial' });

const ENV_KEYS = [
  'ORG_USER_ASSIGNMENT_MODE_ORDER',
  'ORG_USER_ASSIGNMENT_EXPECTED_EMAIL',
  'ORG_USER_ASSIGNMENT_USERNAME',
] as const;

let originalEnvValues: Record<string, string | undefined> = {};

test.describe('Dynamic user support unit tests: runtime helpers', { tag: '@svc-internal' }, () => {
  test.beforeEach(() => {
    originalEnvValues = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));
    for (const key of ENV_KEYS) {
      delete process.env[key];
    }
  });

  test.afterEach(() => {
    for (const key of ENV_KEYS) {
      const originalValue = originalEnvValues[key];
      if (typeof originalValue === 'string') {
        process.env[key] = originalValue;
      } else {
        delete process.env[key];
      }
    }
  });

  test('resolveOrganisationAssignmentRoles keeps assignable roles and drops unsupported ones', () => {
    expect(
      resolveOrganisationAssignmentRoles(['caseworker', 'caseworker-employment', 'unsupported-role', 'pui-case-manager'])
    ).toEqual(['caseworker', 'caseworker-employment', 'pui-case-manager']);

    expect(resolveOrganisationAssignmentRoles(['unsupported-role', 'another-unsupported-role'])).toEqual([
      'unsupported-role',
      'another-unsupported-role',
    ]);
  });

  test('parseStatusCode and retry classification recognise transient token hydration failures', () => {
    expect(parseStatusCode(new Error('Status Code: 503 from token endpoint'))).toBe(503);
    expect(shouldRetryTokenHydrationError(new Error('status 503 from token endpoint'))).toBe(true);
    expect(shouldRetryTokenHydrationError(new Error('socket hang up while hydrating token'))).toBe(true);
    expect(shouldRetryTokenHydrationError(new Error('status 401 from token endpoint'))).toBe(false);
  });

  test('resolveIdamApiPathFromOverride normalizes testing-support style URLs to API base URLs', () => {
    expect(
      resolveIdamApiPathFromOverride('https://idam-testing-support-api.aat.platform.hmcts.net/testing-support/accounts')
    ).toBe('https://idam-api.aat.platform.hmcts.net');
    expect(resolveIdamApiPathFromOverride('https://idam-api.aat.platform.hmcts.net/o/token')).toBe(
      'https://idam-api.aat.platform.hmcts.net'
    );
  });

  test('resolveAssignmentModesToTry honours configured mode order for auto mode', () => {
    process.env.ORG_USER_ASSIGNMENT_MODE_ORDER = 'internal, external, internal';

    expect(resolveAssignmentModesToTry('auto')).toEqual(['internal', 'external']);
    expect(resolveAssignmentModesToTry('external')).toEqual(['external']);
  });

  test('principal-email helpers prefer explicit expected email and normalize bearer tokens', () => {
    process.env.ORG_USER_ASSIGNMENT_USERNAME = 'fallback@example.test';
    expect(resolveExpectedAssignmentPrincipalEmail()).toBe('fallback@example.test');

    process.env.ORG_USER_ASSIGNMENT_EXPECTED_EMAIL = 'Explicit@Example.Test';
    expect(resolveExpectedAssignmentPrincipalEmail()).toBe('explicit@example.test');

    expect(withBearerPrefix('token-123')).toBe('Bearer token-123');
    expect(stripBearerPrefix('Bearer token-123')).toBe('token-123');
  });
});
