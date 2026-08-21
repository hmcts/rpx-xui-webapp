import { expect, test } from '@playwright/test';
import { acquireIdentityLease } from '../../common/identityLease.js';
import { resolveConfiguredPoolIdentities, resolveConfiguredSessionPoolCapacities } from '../../common/identityPoolRegistry.js';

const env = {
  STAFF_ADMIN_POOL_ENABLED: 'true',
  STAFF_ADMIN_1_USERNAME: 'Shared@example.test',
  STAFF_ADMIN_1_PASSWORD: 'secret',
  STAFF_ADMIN_2_USERNAME: 'shared@example.test',
  STAFF_ADMIN_2_PASSWORD: 'secret',
  PRL_SOLICITOR_USERNAME: 'prl@example.test',
  PRL_SOLICITOR_PASSWORD: 'secret',
  WA_SOLICITOR_USERNAME: 'wa@example.test',
  WA_SOLICITOR_PASSWORD: 'secret',
} as NodeJS.ProcessEnv;

test.describe('identity pool registry', { tag: '@svc-internal' }, () => {
  test('uses complete credentials only, normalises duplicate emails, and retains compatibility metadata', () => {
    const identities = resolveConfiguredPoolIdentities(env);
    expect(identities).toHaveLength(3);
    expect(identities.find((identity) => identity.pool === 'PRL_SOLICITOR')).toMatchObject({
      role: 'solicitor',
      organisation: 'private-law-professional',
      jurisdictions: ['PRIVATELAW'],
      concurrencyMode: 'exclusive',
    });
  });

  test('keeps PRL and WA solicitor compatibility pools separate', () => {
    expect(resolveConfiguredPoolIdentities(env, { pool: 'PRL_SOLICITOR' }).map((identity) => identity.userIdentifier)).toEqual([
      'PRL_SOLICITOR',
    ]);
    expect(
      resolveConfiguredPoolIdentities(env, { organisation: 'work-allocation-legacy' }).map((identity) => identity.userIdentifier)
    ).toEqual(['WA_SOLICITOR']);
  });

  test('reports selected-tag capacity without treating capacity as a worker requirement', () => {
    expect(resolveConfiguredSessionPoolCapacities(env, { tags: ['e2e', 'solicitor'] })).toEqual({
      PRL_SOLICITOR: 1,
      WA_SOLICITOR: 1,
    });
  });

  test('waits for a coordinator lease and releases the leased compatible identity', async () => {
    const calls: Array<{ url: string; method?: string }> = [];
    let acquireAttempts = 0;
    const fetchApi = async (url: string, init?: RequestInit) => {
      calls.push({ url, method: init?.method });
      if (url.endsWith('/acquire')) {
        acquireAttempts += 1;
        return new Response(
          JSON.stringify(
            acquireAttempts === 1
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
      return new Response(null, { status: 204 });
    };
    const lease = await acquireIdentityLease(
      { pool: 'PRL_SOLICITOR' },
      {
        ...env,
        PW_IDENTITY_LEASE_ENDPOINT: 'https://lease.example.test',
        PW_IDENTITY_LEASE_POLL_MS: '1',
        PW_IDENTITY_LEASE_WAIT_MS: '1000',
      },
      fetchApi
    );
    expect(lease.identity.userIdentifier).toBe('PRL_SOLICITOR');
    await lease.release();
    expect(calls).toEqual([
      { url: 'https://lease.example.test/acquire', method: 'POST' },
      { url: 'https://lease.example.test/acquire', method: 'POST' },
      { url: 'https://lease.example.test/release/lease-1', method: 'DELETE' },
    ]);
  });
});
