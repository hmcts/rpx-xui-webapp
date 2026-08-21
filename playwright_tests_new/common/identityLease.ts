import { randomUUID } from 'node:crypto';
import type { IdentityCompatibilityRequirements, IdentityPoolIdentity } from './identityPoolRegistry.js';
import { resolveConfiguredPoolIdentities } from './identityPoolRegistry.js';

const DEFAULT_WAIT_MS = 120_000;
const DEFAULT_POLL_MS = 1_000;
const DEFAULT_TTL_MS = 15 * 60_000;

export type IdentityLease = { identity: IdentityPoolIdentity; release: () => Promise<void> };
type LeaseResponse = { status: 'acquired'; leaseId: string; userIdentifier: string } | { status: 'pending' };
type FetchLike = typeof fetch;

function wait(delayMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

function leaseEndpoint(env: NodeJS.ProcessEnv): string | undefined {
  const endpoint = env.PW_IDENTITY_LEASE_ENDPOINT?.trim();
  return endpoint ? endpoint.replace(/\/$/, '') : undefined;
}

export async function acquireIdentityLease(
  requirements: IdentityCompatibilityRequirements,
  env: NodeJS.ProcessEnv = process.env,
  fetchApi: FetchLike = fetch
): Promise<IdentityLease> {
  const candidates = resolveConfiguredPoolIdentities(env, { ...requirements, concurrencyMode: 'exclusive' });
  if (candidates.length === 0) {
    throw new Error(`No configured exclusive identity matches ${JSON.stringify(requirements)}.`);
  }
  const endpoint = leaseEndpoint(env);
  if (!endpoint) {
    throw new Error('PW_IDENTITY_LEASE_ENDPOINT is required for an opt-in state-changing identity lease.');
  }
  const deadline = Date.now() + Number(env.PW_IDENTITY_LEASE_WAIT_MS ?? DEFAULT_WAIT_MS);
  const pollMs = Number(env.PW_IDENTITY_LEASE_POLL_MS ?? DEFAULT_POLL_MS);
  const payload = {
    requestId: randomUUID(),
    runId: env.PW_TEST_RUN_ID ?? env.BUILD_TAG ?? `local-${process.ppid}`,
    workerIndex: env.TEST_PARALLEL_INDEX ?? env.TEST_WORKER_INDEX ?? '0',
    ttlMs: Number(env.PW_IDENTITY_LEASE_TTL_MS ?? DEFAULT_TTL_MS),
    candidates: candidates.map(({ userIdentifier, pool, role, organisation, jurisdictions, tags }) => ({
      userIdentifier,
      pool,
      role,
      organisation,
      jurisdictions,
      tags,
    })),
  };
  while (Date.now() < deadline) {
    const response = await fetchApi(`${endpoint}/acquire`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`Identity lease coordinator returned HTTP ${response.status}.`);
    const lease = (await response.json()) as LeaseResponse;
    if (lease.status === 'pending') {
      await wait(Math.max(1, pollMs));
      continue;
    }
    const identity = candidates.find((candidate) => candidate.userIdentifier === lease.userIdentifier);
    if (!identity) throw new Error('Identity lease coordinator returned an incompatible identity.');
    return {
      identity,
      release: async () => {
        const releaseResponse = await fetchApi(`${endpoint}/release/${encodeURIComponent(lease.leaseId)}`, { method: 'DELETE' });
        if (!releaseResponse.ok) throw new Error(`Identity lease release returned HTTP ${releaseResponse.status}.`);
      },
    };
  }
  throw new Error('Timed out waiting for a compatible identity lease.');
}
