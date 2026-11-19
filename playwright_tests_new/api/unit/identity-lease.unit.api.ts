import { expect, test } from '@playwright/test';

import {
  IDENTITY_POOL_EXHAUSTED_CODE,
  IdentityLeaseTimeoutError,
  resolveIdentityLeaseRuntimeSettings,
} from '../../common/identityLease.js';
import { FrameworkError } from '../../E2E/utils/frameworkError.js';

test.describe('identity lease runtime settings', { tag: '@svc-internal' }, () => {
  test('uses positive defaults for malformed poll and TTL values', () => {
    expect(
      resolveIdentityLeaseRuntimeSettings({ PW_IDENTITY_LEASE_POLL_MS: '-1', PW_IDENTITY_LEASE_TTL_MS: 'not-a-duration' })
    ).toMatchObject({ pollMs: 1_000, ttlMs: 15 * 60_000 });
  });

  test('extends a lease to cover the configured and caller execution windows', () => {
    expect(
      resolveIdentityLeaseRuntimeSettings(
        { PW_IDENTITY_LEASE_EXECUTION_BUDGET_MS: '120000', PW_IDENTITY_LEASE_TTL_MS: '119999' },
        35 * 60_000
      )
    ).toMatchObject({ executionBudgetMs: 35 * 60_000, ttlMs: 35 * 60_000 + 60_000 });
  });

  test('preserves the baseline TTL when the execution window is shorter', () => {
    expect(resolveIdentityLeaseRuntimeSettings({}, 12 * 60_000)).toMatchObject({
      waitMs: 15 * 60_000,
      executionBudgetMs: 12 * 60_000,
      ttlMs: 15 * 60_000,
    });
  });

  test('keeps teardown headroom even when the explicit TTL equals the execution budget', () => {
    expect(resolveIdentityLeaseRuntimeSettings({ PW_IDENTITY_LEASE_TTL_MS: String(5 * 60_000) })).toMatchObject({
      executionBudgetMs: 5 * 60_000,
      ttlMs: 6 * 60_000,
    });
  });

  test('keeps explicit wait and TTL overrides above the execution window', () => {
    expect(
      resolveIdentityLeaseRuntimeSettings({ PW_IDENTITY_LEASE_WAIT_MS: '45000', PW_IDENTITY_LEASE_TTL_MS: String(20 * 60_000) })
    ).toMatchObject({ waitMs: 45_000, executionBudgetMs: 5 * 60_000, ttlMs: 20 * 60_000 });
  });

  test('marks a scheduling timeout as an identity-pool-exhausted setup framework error', () => {
    const error = new IdentityLeaseTimeoutError({ pool: 'PRL_SOLICITOR' }, 3 * 60_000, 'local');
    expect(error).toBeInstanceOf(FrameworkError);
    expect(error.name).toBe('IdentityLeaseTimeoutError');
    expect(error.code).toBe(IDENTITY_POOL_EXHAUSTED_CODE);
    expect(error.phase).toBe('setup');
    expect(error.message.startsWith(`[${IDENTITY_POOL_EXHAUSTED_CODE}] Identity scheduling timed out after 180000ms`)).toBe(true);
  });
});
