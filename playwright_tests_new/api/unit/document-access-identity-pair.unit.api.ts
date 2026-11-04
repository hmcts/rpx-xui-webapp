import { expect, test } from '@playwright/test';
import { mkdtemp, readdir, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { test as e2eTest } from '../../E2E/fixtures';
import { acquireDocumentAccessIdentityPair } from '../../E2E/utils/test-setup/documentAccessIdentityPair';
import { acquireIdentityLease, IdentityLeaseTimeoutError, type IdentityLease } from '../../common/identityLease';
import { resolveConfiguredPoolIdentities } from '../../common/identityPoolRegistry';

const pairEnvironment = {
  PRL_SOLICITOR_USERNAME: 'z-user@example.test',
  PRL_SOLICITOR_PASSWORD: 'unit-only',
  PRL_SOLICITOR2_USERNAME: 'a-user@example.test',
  PRL_SOLICITOR2_PASSWORD: 'unit-only',
};

test.describe('Document access identity pair', { tag: '@svc-internal' }, () => {
  test('two competing workers acquire the same ordered pair without each holding one identity', async () => {
    const held = new Map<string, { leaseId: string; worker: string }>();
    const requestedWorkers = new Set<string>();
    const completed: string[] = [];
    let sequence = 0;
    let maximumOwners = 0;
    let bothWorkersStarted: () => void;
    const firstRequests = new Promise<void>((resolve) => {
      bothWorkersStarted = resolve;
    });
    const fetchApi: typeof fetch = async (input, init) => {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
      if (url.endsWith('/acquire')) {
        const payload = JSON.parse(String(init?.body)) as {
          workerIndex: string;
          candidates: Array<{ userIdentifier: string; leaseKey: string }>;
        };
        requestedWorkers.add(payload.workerIndex);
        if (requestedWorkers.size === 2) bothWorkersStarted();
        const candidate = payload.candidates.find((entry) => !held.has(entry.leaseKey));
        if (!candidate) return new Response(JSON.stringify({ status: 'pending' }), { status: 200 });
        const leaseId = `lease-${++sequence}`;
        held.set(candidate.leaseKey, { leaseId, worker: payload.workerIndex });
        maximumOwners = Math.max(maximumOwners, new Set([...held.values()].map((lease) => lease.worker)).size);
        // Both first requests reach the coordinator before either worker can ask for its second account.
        await firstRequests;
        return new Response(JSON.stringify({ status: 'acquired', leaseId, userIdentifier: candidate.userIdentifier }));
      }
      const entry = [...held].find(([, lease]) => url.endsWith(`/release/${lease.leaseId}`));
      if (!entry) return new Response(null, { status: 404 });
      held.delete(entry[0]);
      return new Response(null, { status: 204 });
    };
    const workers = ['firefox', 'webkit'].map(async (worker) => {
      const leases: IdentityLease[] = [];
      const env = {
        ...pairEnvironment,
        TEST_WORKER_INDEX: worker,
        PW_IDENTITY_LEASE_ENDPOINT: 'https://lease.example.test',
        PW_IDENTITY_LEASE_WAIT_MS: '250',
        PW_IDENTITY_LEASE_POLL_MS: '1',
      };
      try {
        const pair = await acquireDocumentAccessIdentityPair(
          {
            acquire: async (requirements) => {
              const lease = await acquireIdentityLease(requirements, env, fetchApi);
              leases.push(lease);
              return lease;
            },
          },
          env
        );
        expect(pair.map((lease) => lease.identity.email)).toEqual(['a-user@example.test', 'z-user@example.test']);
        expect([...held.values()].every((lease) => lease.worker === worker)).toBe(true);
        completed.push(worker);
      } finally {
        await Promise.all(leases.map((lease) => lease.release()));
      }
    });
    const results = await Promise.allSettled(workers);
    expect(maximumOwners, 'Two workers must not each hold one account while awaiting the other').toBe(1);
    expect(results.map((result) => result.status)).toEqual(['fulfilled', 'fulfilled']);
    expect(completed.sort()).toEqual(['firefox', 'webkit']);
    expect(held.size).toBe(0);
  });

  test('deduplicates aliases by physical email before selecting the canonical ordered pair', async () => {
    const env = {
      ...pairEnvironment,
      PRL_SOLICITOR3_USERNAME: ' A-USER@example.test ',
      PRL_SOLICITOR3_PASSWORD: 'unit-only',
    };
    const requested: unknown[] = [];
    const pair = await acquireDocumentAccessIdentityPair(
      {
        acquire: async (requirements) => {
          requested.push(requirements);
          return { identity: resolveConfiguredPoolIdentities(env, requirements)[0], release: async () => {} };
        },
      },
      env
    );
    expect(requested).toEqual([
      { pool: 'PRL_SOLICITOR', userIdentifier: 'PRL_SOLICITOR2' },
      { pool: 'PRL_SOLICITOR', userIdentifier: 'PRL_SOLICITOR' },
    ]);
    expect(pair.map((lease) => lease.identity.email)).toEqual(['a-user@example.test', 'z-user@example.test']);
  });

  test('rejects two configured aliases for one physical user before acquiring any lease', async () => {
    let acquisitions = 0;
    await expect(
      acquireDocumentAccessIdentityPair(
        {
          acquire: async () => {
            acquisitions++;
            throw new Error('Unexpected lease acquisition');
          },
        },
        { ...pairEnvironment, PRL_SOLICITOR_USERNAME: ' A-USER@example.test ' }
      )
    ).rejects.toThrow('two distinct configured PRL solicitor identities');
    expect(acquisitions).toBe(0);
  });

  test('an exact identity selector is applied before alias deduplication and never falls back to the pool', async () => {
    const env = {
      ...pairEnvironment,
      PRL_SOLICITOR3_USERNAME: ' A-USER@example.test ',
      PRL_SOLICITOR3_PASSWORD: 'unit-only',
    };
    expect(
      resolveConfiguredPoolIdentities(env, { pool: 'PRL_SOLICITOR', userIdentifier: 'PRL_SOLICITOR3' }).map(
        (identity) => identity.userIdentifier
      )
    ).toEqual(['PRL_SOLICITOR3']);
    expect(resolveConfiguredPoolIdentities(env, { pool: 'PRL_SOLICITOR', userIdentifier: '' })).toEqual([]);
    let coordinatorCalls = 0;
    await expect(
      acquireIdentityLease(
        { pool: 'PRL_SOLICITOR', userIdentifier: 'PRL_SOLICITOR-missing' },
        { ...env, PW_IDENTITY_LEASE_ENDPOINT: 'https://lease.example.test' },
        async () => {
          coordinatorCalls++;
          throw new Error('Unexpected coordinator request');
        }
      )
    ).rejects.toThrow('No configured exclusive identity matches');
    expect(coordinatorCalls).toBe(0);
  });
});

const fixtureTest = e2eTest.extend<{
  isolatedPairEnvironment: NodeJS.ProcessEnv & { PW_IDENTITY_LEASE_DIR: string };
}>({
  isolatedPairEnvironment: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use) => {
      const directory = await mkdtemp(path.join(os.tmpdir(), 'exui-document-pair-'));
      const env = {
        ...pairEnvironment,
        PW_IDENTITY_LEASE_DIR: directory,
        PW_IDENTITY_LEASE_ENDPOINT: '',
        PW_IDENTITY_LEASE_WAIT_MS: '100',
        PW_IDENTITY_LEASE_POLL_MS: '1',
      };
      const previous = Object.fromEntries(Object.keys(env).map((key) => [key, process.env[key]]));
      Object.assign(process.env, env);
      try {
        await use(env);
        expect((await readdir(directory)).filter((entry) => entry.endsWith('.lock'))).toEqual([]);
      } finally {
        for (const [key, value] of Object.entries(previous)) {
          if (value === undefined) delete process.env[key];
          else process.env[key] = value;
        }
        await rm(directory, { recursive: true, force: true });
      }
    },
    { auto: true },
  ],
});

fixtureTest.describe('Document access pair fixture teardown', { tag: '@svc-internal' }, () => {
  fixtureTest(
    'releases both acquired identities through the existing fixture',
    async ({ identityLease, isolatedPairEnvironment }) => {
      const pair = await acquireDocumentAccessIdentityPair(identityLease, isolatedPairEnvironment);
      expect(pair.map((lease) => lease.identity.email)).toEqual(['a-user@example.test', 'z-user@example.test']);
    }
  );

  fixtureTest(
    'releases the first acquired identity when the second acquisition fails',
    async ({ identityLease, isolatedPairEnvironment }) => {
      const second = await acquireIdentityLease(
        { pool: 'PRL_SOLICITOR', userIdentifier: 'PRL_SOLICITOR' },
        isolatedPairEnvironment
      );
      try {
        await expect(acquireDocumentAccessIdentityPair(identityLease, isolatedPairEnvironment)).rejects.toBeInstanceOf(
          IdentityLeaseTimeoutError
        );
        const files = await readdir(isolatedPairEnvironment.PW_IDENTITY_LEASE_DIR);
        expect(files.filter((entry) => entry.endsWith('.lock'))).toHaveLength(2);
      } finally {
        await second.release();
      }
    }
  );
});
