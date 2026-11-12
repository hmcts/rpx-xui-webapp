import { expect, test } from '@playwright/test';

import { resolveIdentityLeaseRuntimeSettings } from '../../common/identityLease.js';

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
    ).toMatchObject({ executionBudgetMs: 35 * 60_000, ttlMs: 35 * 60_000 });
  });
});
