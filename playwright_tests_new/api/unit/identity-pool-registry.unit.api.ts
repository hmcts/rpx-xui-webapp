import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import {
  acquireIdentityLease,
  IdentityLeaseTimeoutError,
  resolveIdentityLeaseTestTimeouts,
  resolveIdentityLeaseTiming,
} from '../../common/identityLease.js';
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
  DIVORCE_SOLICITOR_USERNAME: 'divorce@example.test',
  DIVORCE_SOLICITOR_PASSWORD: 'secret',
  SEARCH_EMPLOYMENT_CASE_USERNAME: 'employment@example.test',
  SEARCH_EMPLOYMENT_CASE_PASSWORD: 'secret',
  USER_WITH_FLAGS_USERNAME: 'flags@example.test',
  USER_WITH_FLAGS_PASSWORD: 'secret',
} as NodeJS.ProcessEnv;

test.describe('identity pool registry', { tag: '@svc-internal' }, () => {
  test('uses complete credentials only, normalises duplicate emails, and retains compatibility metadata', () => {
    const identities = resolveConfiguredPoolIdentities(env);
    expect(identities).toHaveLength(6);
    expect(identities.find((identity) => identity.pool === 'PRL_SOLICITOR')).toMatchObject({
      role: 'solicitor',
      organisation: 'private-law-professional',
      jurisdictions: ['PRIVATELAW'],
      concurrencyMode: 'exclusive',
    });
    expect(identities.find((identity) => identity.pool === 'SEARCH_EMPLOYMENT_CASE')).toMatchObject({
      role: 'caseworker',
      organisation: 'employment',
      jurisdictions: ['EMPLOYMENT'],
      concurrencyMode: 'exclusive',
    });
  });

  test('discovers configured staff administrators by default and supports an explicit opt-out', () => {
    const withoutFlag = { ...env };
    delete withoutFlag.STAFF_ADMIN_POOL_ENABLED;

    expect(resolveConfiguredPoolIdentities(withoutFlag, { pool: 'STAFF_ADMIN' })).toHaveLength(1);
    expect(
      resolveConfiguredPoolIdentities({ ...withoutFlag, STAFF_ADMIN_POOL_ENABLED: 'false' }, { pool: 'STAFF_ADMIN' })
    ).toEqual([]);
  });

  test('leases an exclusive identity locally when no cross-executor coordinator is configured', async () => {
    const leaseDirectory = `/tmp/exui-identity-lease-${process.pid}-${Date.now()}`;
    const localEnv = {
      ...env,
      PW_IDENTITY_LEASE_DIR: leaseDirectory,
      PW_IDENTITY_LEASE_WAIT_MS: '1000',
      PW_IDENTITY_LEASE_POLL_MS: '1',
    };
    const firstLease = await acquireIdentityLease({ pool: 'DIVORCE_SOLICITOR' }, localEnv);
    expect(firstLease.identity.userIdentifier).toBe('DIVORCE_SOLICITOR');
    await firstLease.release();

    const secondLease = await acquireIdentityLease({ pool: 'DIVORCE_SOLICITOR' }, localEnv);
    expect(secondLease.identity.userIdentifier).toBe('DIVORCE_SOLICITOR');
    await secondLease.release();
  });

  test('keeps PRL and WA solicitor compatibility pools separate', () => {
    expect(resolveConfiguredPoolIdentities(env, { pool: 'PRL_SOLICITOR' }).map((identity) => identity.userIdentifier)).toEqual([
      'PRL_SOLICITOR',
    ]);
    expect(
      resolveConfiguredPoolIdentities(env, { organisation: 'work-allocation-legacy' }).map((identity) => identity.userIdentifier)
    ).toEqual(['WA_SOLICITOR']);
  });

  test('keeps state-changing Employment and case-flags identities exclusive', () => {
    expect(resolveConfiguredPoolIdentities(env, { pool: 'SEARCH_EMPLOYMENT_CASE' })).toMatchObject([
      {
        userIdentifier: 'SEARCH_EMPLOYMENT_CASE',
        concurrencyMode: 'exclusive',
      },
    ]);
    expect(resolveConfiguredPoolIdentities(env, { pool: 'USER_WITH_FLAGS' })).toMatchObject([
      {
        userIdentifier: 'USER_WITH_FLAGS',
        concurrencyMode: 'exclusive',
      },
    ]);
  });

  test('state-changing E2E journeys acquire their registered exclusive identity', () => {
    const expectedLeases = new Map<string, string[]>([
      ['playwright_tests_new/E2E/test/createCase/createCase.spec.ts', ['DIVORCE_SOLICITOR']],
      ['playwright_tests_new/E2E/test/updateCase/updateCase.spec.ts', ['DIVORCE_SOLICITOR']],
      ['playwright_tests_new/E2E/test/updateCase/updateCase.nullTranslation.spec.ts', ['DIVORCE_SOLICITOR']],
      ['playwright_tests_new/E2E/test/mediaViewer/mediaViewerHappyPath.spec.ts', ['DIVORCE_SOLICITOR']],
      [
        'playwright_tests_new/E2E/test/documentUpload/documentUpload.positive.spec.ts',
        ['DIVORCE_SOLICITOR', 'SEARCH_EMPLOYMENT_CASE'],
      ],
      ['playwright_tests_new/E2E/test/caseFileView/caseFileView.spec.ts', ['SEARCH_EMPLOYMENT_CASE']],
      ['playwright_tests_new/E2E/test/caseFlags/caseFlags.positive.spec.ts', ['SEARCH_EMPLOYMENT_CASE', 'USER_WITH_FLAGS']],
    ]);

    for (const [relativePath, pools] of expectedLeases) {
      const source = readFileSync(path.resolve(process.cwd(), relativePath), 'utf8');
      for (const pool of pools) {
        expect(source, `${relativePath} must lease ${pool}`).toContain(`identityLease.acquire({ pool: '${pool}' })`);
      }
    }
  });

  test('filters compatibility before deduplicating the same physical identity', () => {
    const sharedSolicitorEnv = {
      ...env,
      DIVORCE_SOLICITOR_USERNAME: 'shared-solicitor@example.test',
      PRL_SOLICITOR_USERNAME: 'shared-solicitor@example.test',
    };

    expect(
      resolveConfiguredPoolIdentities(sharedSolicitorEnv, { pool: 'PRL_SOLICITOR' }).map((identity) => identity.userIdentifier)
    ).toEqual(['PRL_SOLICITOR']);
  });

  test('aliases for the same email cannot be leased concurrently', async () => {
    const leaseDirectory = `/tmp/exui-identity-alias-lease-${process.pid}-${Date.now()}`;
    const sharedSolicitorEnv = {
      ...env,
      DIVORCE_SOLICITOR_USERNAME: 'shared-solicitor@example.test',
      PRL_SOLICITOR_USERNAME: 'shared-solicitor@example.test',
      PW_IDENTITY_LEASE_DIR: leaseDirectory,
      PW_IDENTITY_LEASE_WAIT_MS: '25',
      PW_IDENTITY_LEASE_POLL_MS: '1',
    };
    const divorceLease = await acquireIdentityLease({ pool: 'DIVORCE_SOLICITOR' }, sharedSolicitorEnv);

    const blockedLease = acquireIdentityLease({ pool: 'PRL_SOLICITOR' }, sharedSolicitorEnv);
    await expect(blockedLease).rejects.toBeInstanceOf(IdentityLeaseTimeoutError);
    await expect(blockedLease).rejects.toThrow('No credential is missing');

    await divorceLease.release();
    const prlLease = await acquireIdentityLease({ pool: 'PRL_SOLICITOR' }, sharedSolicitorEnv);
    expect(prlLease.identity.userIdentifier).toBe('PRL_SOLICITOR');
    await prlLease.release();
  });

  test('provides enough default scheduling and execution budget for a shared identity queue', () => {
    expect(resolveIdentityLeaseTiming({})).toEqual({
      waitMs: 15 * 60_000,
      executionBudgetMs: 5 * 60_000,
    });
    expect(
      resolveIdentityLeaseTiming({
        PW_IDENTITY_LEASE_WAIT_MS: '2500',
        PW_IDENTITY_LEASE_EXECUTION_BUDGET_MS: '7500',
      })
    ).toEqual({ waitMs: 2500, executionBudgetMs: 7500 });
  });

  test('removes unused scheduling allowance after acquisition while preserving execution time', () => {
    const timing = { waitMs: 15 * 60_000, executionBudgetMs: 5 * 60_000 };
    expect(resolveIdentityLeaseTestTimeouts(4 * 60_000, 0, timing)).toEqual({
      duringAcquireMs: 20 * 60_000,
      afterAcquireMs: 5 * 60_000,
    });
    expect(resolveIdentityLeaseTestTimeouts(4 * 60_000, 12 * 60_000, timing)).toEqual({
      duringAcquireMs: 32 * 60_000,
      afterAcquireMs: 17 * 60_000,
    });

    const fixtureSource = readFileSync(path.resolve(process.cwd(), 'playwright_tests_new/E2E/fixtures.ts'), 'utf8');
    expect(fixtureSource).toContain('const fixtureStartedAt = Date.now()');
    expect(fixtureSource).not.toContain('testInfo.startTime');
  });

  test('reports selected-tag capacity without treating capacity as a worker requirement', () => {
    expect(resolveConfiguredSessionPoolCapacities(env, { tags: ['e2e', 'solicitor'] })).toEqual({
      DIVORCE_SOLICITOR: 1,
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

  test('gives coordinator aliases of one physical account the same opaque lease key', async () => {
    const leaseKeys: string[] = [];
    const fetchApi = async (url: string, init?: RequestInit) => {
      if (url.endsWith('/acquire')) {
        const payload = JSON.parse(String(init?.body)) as {
          candidates: Array<{ userIdentifier: string; leaseKey: string; email?: string }>;
        };
        expect(payload.candidates[0].email).toBeUndefined();
        leaseKeys.push(payload.candidates[0].leaseKey);
        return new Response(
          JSON.stringify({
            status: 'acquired',
            leaseId: `lease-${leaseKeys.length}`,
            userIdentifier: payload.candidates[0].userIdentifier,
          }),
          { status: 200 }
        );
      }
      return new Response(null, { status: 204 });
    };
    const sharedAliasEnv = {
      ...env,
      DIVORCE_SOLICITOR_USERNAME: 'shared-solicitor@example.test',
      PRL_SOLICITOR_USERNAME: 'shared-solicitor@example.test',
      PW_IDENTITY_LEASE_ENDPOINT: 'https://lease.example.test',
    };

    const divorceLease = await acquireIdentityLease({ pool: 'DIVORCE_SOLICITOR' }, sharedAliasEnv, fetchApi);
    await divorceLease.release();
    const prlLease = await acquireIdentityLease({ pool: 'PRL_SOLICITOR' }, sharedAliasEnv, fetchApi);
    await prlLease.release();

    expect(leaseKeys).toHaveLength(2);
    expect(leaseKeys[0]).toBe(leaseKeys[1]);
  });

  test('a coordinator keeps a second alias waiting until the first physical identity lease is released', async () => {
    let heldKey: string | undefined;
    let activeLeaseId: string | undefined;
    let leaseSequence = 0;
    const fetchApi = async (url: string, init?: RequestInit) => {
      if (url.endsWith('/acquire')) {
        const payload = JSON.parse(String(init?.body)) as {
          candidates: Array<{ userIdentifier: string; leaseKey: string }>;
        };
        const candidate = payload.candidates[0];
        if (heldKey === candidate.leaseKey) {
          return new Response(JSON.stringify({ status: 'pending' }), { status: 200 });
        }
        heldKey = candidate.leaseKey;
        activeLeaseId = `lease-${++leaseSequence}`;
        return new Response(
          JSON.stringify({ status: 'acquired', leaseId: activeLeaseId, userIdentifier: candidate.userIdentifier }),
          { status: 200 }
        );
      }
      if (url.endsWith(`/release/${activeLeaseId}`)) {
        heldKey = undefined;
        activeLeaseId = undefined;
        return new Response(null, { status: 204 });
      }
      return new Response(null, { status: 404 });
    };
    const sharedAliasEnv = {
      ...env,
      DIVORCE_SOLICITOR_USERNAME: 'shared-solicitor@example.test',
      PRL_SOLICITOR_USERNAME: 'shared-solicitor@example.test',
      PW_IDENTITY_LEASE_ENDPOINT: 'https://lease.example.test',
      PW_IDENTITY_LEASE_POLL_MS: '1',
      PW_IDENTITY_LEASE_WAIT_MS: '500',
    };

    const firstLease = await acquireIdentityLease({ pool: 'DIVORCE_SOLICITOR' }, sharedAliasEnv, fetchApi);
    let secondResolved = false;
    const secondLeasePromise = acquireIdentityLease({ pool: 'PRL_SOLICITOR' }, sharedAliasEnv, fetchApi).then((lease) => {
      secondResolved = true;
      return lease;
    });
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(secondResolved).toBe(false);

    await firstLease.release();
    const secondLease = await secondLeasePromise;
    expect(secondLease.identity.userIdentifier).toBe('PRL_SOLICITOR');
    await secondLease.release();
  });
});
