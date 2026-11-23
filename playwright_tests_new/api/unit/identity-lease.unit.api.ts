import { expect, test } from '@playwright/test';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

import {
  acquireIdentityLease,
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

test('reports coordinator contention once without exposing account details', { tag: '@svc-internal' }, async () => {
  const messages: string[] = [];
  const originalLog = console.log;
  console.log = (...args: unknown[]) => messages.push(args.join(' '));
  let attempts = 0;
  try {
    const lease = await acquireIdentityLease(
      { pool: 'PRL_SOLICITOR' },
      {
        PRL_SOLICITOR_USERNAME: 'private@example.test',
        PRL_SOLICITOR_PASSWORD: 'private-password',
        PW_IDENTITY_LEASE_ENDPOINT: 'https://lease.example.test',
        PW_IDENTITY_LEASE_POLL_MS: '1',
        PW_IDENTITY_LEASE_WAIT_MS: '1000',
      },
      async (url) => {
        if (String(url).endsWith('/release/lease-1')) return new Response(null, { status: 204 });
        attempts += 1;
        return new Response(
          JSON.stringify(
            attempts < 3
              ? { status: 'pending' }
              : {
                  status: 'acquired',
                  leaseId: 'lease-1',
                  userIdentifier: 'PRL_SOLICITOR',
                }
          ),
          { status: 200 }
        );
      }
    );
    await lease.release();
    expect(messages).toEqual([
      '[identity-lease] Waiting for an available identity (coordinator; candidates=1; wait_limit_ms=1000).',
    ]);
    expect(messages.join(' ')).not.toContain('private');
  } finally {
    console.log = originalLog;
  }
});

test('reports local contention and remains silent for an uncontended lease', { tag: '@svc-internal' }, async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'identity-wait-'));
  const messages: string[] = [];
  const originalLog = console.log;
  let notifyWait: () => void = () => undefined;
  const waiting = new Promise<void>((resolve) => {
    notifyWait = resolve;
  });
  console.log = (...args: unknown[]) => {
    messages.push(args.join(' '));
    notifyWait();
  };
  const env = {
    PRL_SOLICITOR_USERNAME: 'private@example.test',
    PRL_SOLICITOR_PASSWORD: 'private-password',
    PW_IDENTITY_LEASE_DIR: dir,
    PW_IDENTITY_LEASE_POLL_MS: '1',
    PW_IDENTITY_LEASE_WAIT_MS: '10000',
  };
  try {
    const first = await acquireIdentityLease({ pool: 'PRL_SOLICITOR' }, env);
    let secondPromise: ReturnType<typeof acquireIdentityLease> | undefined;
    try {
      expect(messages).toEqual([]);
      secondPromise = acquireIdentityLease({ pool: 'PRL_SOLICITOR' }, env);
      const outcome = await Promise.race([waiting.then(() => 'waiting'), secondPromise.then(() => 'acquired')]);
      expect(outcome).toBe('waiting');
    } finally {
      await first.release();
      if (secondPromise) {
        const second = await secondPromise;
        await second.release();
      }
    }
    expect(messages).toEqual(['[identity-lease] Waiting for an available identity (local; candidates=1; wait_limit_ms=10000).']);
    expect(messages.join(' ')).not.toContain('private');
  } finally {
    console.log = originalLog;
    await rm(dir, { recursive: true, force: true });
  }
});
