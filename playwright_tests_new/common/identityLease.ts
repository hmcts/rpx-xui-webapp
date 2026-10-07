import { createHash, randomUUID } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import * as lockfile from 'proper-lockfile';
import type { IdentityCompatibilityRequirements, IdentityPoolIdentity } from './identityPoolRegistry.js';
import { resolveConfiguredPoolIdentities } from './identityPoolRegistry.js';

const DEFAULT_WAIT_MS = 15 * 60_000;
const DEFAULT_EXECUTION_BUDGET_MS = 5 * 60_000;
const DEFAULT_POLL_MS = 1_000;
const DEFAULT_TTL_MS = 15 * 60_000;

export type IdentityLease = { identity: IdentityPoolIdentity; release: () => Promise<void> };
export type IdentityLeaseTiming = { waitMs: number; executionBudgetMs: number };
export type IdentityLeaseRuntimeSettings = IdentityLeaseTiming & { pollMs: number; ttlMs: number };
type LeaseResponse = { status: 'acquired'; leaseId: string; userIdentifier: string } | { status: 'pending' };
type FetchLike = typeof fetch;

export class IdentityLeaseTimeoutError extends Error {
  constructor(requirements: IdentityCompatibilityRequirements, waitMs: number, mode: 'local' | 'coordinator') {
    super(
      `Identity scheduling timed out after ${waitMs}ms waiting for a compatible configured account (${mode}; requirements=${JSON.stringify(requirements)}). No credential is missing; a previous owner may still hold or may have leaked the lease.`
    );
    this.name = 'IdentityLeaseTimeoutError';
  }
}

function positiveDuration(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function resolveIdentityLeaseTiming(env: NodeJS.ProcessEnv = process.env): IdentityLeaseTiming {
  return {
    waitMs: positiveDuration(env.PW_IDENTITY_LEASE_WAIT_MS, DEFAULT_WAIT_MS),
    executionBudgetMs: positiveDuration(env.PW_IDENTITY_LEASE_EXECUTION_BUDGET_MS, DEFAULT_EXECUTION_BUDGET_MS),
  };
}

export function resolveIdentityLeaseRuntimeSettings(
  env: NodeJS.ProcessEnv = process.env,
  requiredExecutionMs = 0
): IdentityLeaseRuntimeSettings {
  const timing = resolveIdentityLeaseTiming(env);
  const executionBudgetMs = Math.max(timing.executionBudgetMs, requiredExecutionMs);
  const ttlMs = Math.max(positiveDuration(env.PW_IDENTITY_LEASE_TTL_MS, DEFAULT_TTL_MS), executionBudgetMs);
  return {
    ...timing,
    executionBudgetMs,
    pollMs: positiveDuration(env.PW_IDENTITY_LEASE_POLL_MS, DEFAULT_POLL_MS),
    ttlMs,
  };
}

export function resolveIdentityLeaseTestTimeouts(
  originalTimeoutMs: number,
  schedulingElapsedMs: number,
  timing: IdentityLeaseTiming
): { duringAcquireMs: number; afterAcquireMs: number } {
  const executionTimeoutMs = Math.max(originalTimeoutMs, timing.executionBudgetMs);
  return {
    duringAcquireMs: Math.max(0, schedulingElapsedMs) + timing.waitMs + executionTimeoutMs,
    afterAcquireMs: Math.max(0, schedulingElapsedMs) + executionTimeoutMs,
  };
}

function wait(delayMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

function leaseEndpoint(env: NodeJS.ProcessEnv): string | undefined {
  const endpoint = env.PW_IDENTITY_LEASE_ENDPOINT?.trim();
  return endpoint ? endpoint.replace(/\/$/, '') : undefined;
}

function physicalIdentityKey(identity: IdentityPoolIdentity): string {
  return createHash('sha256').update(identity.email.trim().toLowerCase()).digest('hex').slice(0, 24);
}

async function acquireLocalIdentityLease(
  candidates: IdentityPoolIdentity[],
  requirements: IdentityCompatibilityRequirements,
  deadline: number,
  waitMs: number,
  pollMs: number,
  ttlMs: number,
  env: NodeJS.ProcessEnv
): Promise<IdentityLease> {
  const directory = env.PW_IDENTITY_LEASE_DIR?.trim() || path.join(process.cwd(), '.sessions', 'identity-leases');
  await fs.mkdir(directory, { recursive: true });

  while (Date.now() < deadline) {
    for (const identity of candidates) {
      const leaseFile = path.join(directory, `${physicalIdentityKey(identity)}.lease`);
      await fs.appendFile(leaseFile, '');
      try {
        const release = await lockfile.lock(leaseFile, { realpath: false, retries: 0, stale: ttlMs });
        return { identity, release };
      } catch (error) {
        if (!(typeof error === 'object' && error !== null && 'code' in error && error.code === 'ELOCKED')) {
          throw error;
        }
      }
    }
    await wait(Math.max(1, pollMs));
  }

  throw new IdentityLeaseTimeoutError(requirements, waitMs, 'local');
}

async function acquireCompatibleIdentityLease(
  candidates: IdentityPoolIdentity[],
  requirements: IdentityCompatibilityRequirements,
  env: NodeJS.ProcessEnv,
  fetchApi: FetchLike,
  requiredExecutionMs: number
): Promise<IdentityLease> {
  if (candidates.length === 0) {
    throw new Error(`No configured exclusive identity matches ${JSON.stringify(requirements)}.`);
  }
  const endpoint = leaseEndpoint(env);
  const { waitMs, pollMs, ttlMs } = resolveIdentityLeaseRuntimeSettings(env, requiredExecutionMs);
  const deadline = Date.now() + waitMs;
  if (!endpoint) {
    return acquireLocalIdentityLease(candidates, requirements, deadline, waitMs, pollMs, ttlMs, env);
  }
  const payload = {
    requestId: randomUUID(),
    runId: env.PW_TEST_RUN_ID ?? env.BUILD_TAG ?? `local-${process.ppid}`,
    workerIndex: env.TEST_PARALLEL_INDEX ?? env.TEST_WORKER_INDEX ?? '0',
    ttlMs,
    candidates: candidates.map((identity) => ({
      userIdentifier: identity.userIdentifier,
      leaseKey: physicalIdentityKey(identity),
      pool: identity.pool,
      role: identity.role,
      organisation: identity.organisation,
      jurisdictions: identity.jurisdictions,
      tags: identity.tags,
    })),
  };
  while (Date.now() < deadline) {
    const remainingMs = Math.max(1, deadline - Date.now());
    let response: Response;
    try {
      response = await fetchApi(`${endpoint}/acquire`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(remainingMs),
      });
    } catch (error) {
      if (Date.now() >= deadline || (error instanceof Error && (error.name === 'AbortError' || error.name === 'TimeoutError'))) {
        throw new IdentityLeaseTimeoutError(requirements, waitMs, 'coordinator');
      }
      throw error;
    }
    if (!response.ok) throw new Error(`Identity lease coordinator returned HTTP ${response.status}.`);
    const lease = (await response.json()) as LeaseResponse;
    if (lease.status === 'pending') {
      await wait(Math.min(Math.max(1, pollMs), Math.max(1, deadline - Date.now())));
      continue;
    }
    const identity = candidates.find((candidate) => candidate.userIdentifier === lease.userIdentifier);
    if (!identity) throw new Error('Identity lease coordinator returned an incompatible identity.');
    return {
      identity,
      release: async () => {
        const releaseResponse = await fetchApi(`${endpoint}/release/${encodeURIComponent(lease.leaseId)}`, {
          method: 'DELETE',
          signal: AbortSignal.timeout(Math.min(ttlMs, 30_000)),
        });
        if (!releaseResponse.ok) throw new Error(`Identity lease release returned HTTP ${releaseResponse.status}.`);
      },
    };
  }
  throw new IdentityLeaseTimeoutError(requirements, waitMs, 'coordinator');
}

export async function acquireIdentityLease(
  requirements: IdentityCompatibilityRequirements,
  env: NodeJS.ProcessEnv = process.env,
  fetchApi: FetchLike = fetch,
  requiredExecutionMs = 0
): Promise<IdentityLease> {
  const candidates = resolveConfiguredPoolIdentities(env, { ...requirements, concurrencyMode: 'exclusive' });
  return acquireCompatibleIdentityLease(candidates, requirements, env, fetchApi, requiredExecutionMs);
}
