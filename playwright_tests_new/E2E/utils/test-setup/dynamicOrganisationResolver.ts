import { promises as fs } from 'node:fs';
import path from 'node:path';

import type {
  DynamicOrganisationSuperUser,
  DynamicOrganisationProvisioningStageTiming,
  DynamicOrganisationResolvedApprovalStrategy,
  DynamicOrganisationProvisioningOptions,
  DynamicOrganisationProvisioningResult,
} from '../professional-user/organisationProvisioning.js';
import type { ProfessionalUserUtils } from '../professional-user.utils';
import { firstNonEmpty, resolveDynamicOrganisationRunId } from '../dynamicOrganisationRunId.js';

export type DynamicOrganisationMode = 'dynamic';

export type DynamicOrganisationResolution = {
  source: 'dynamic';
  organisationId: string;
  name: string;
  status: 'ACTIVE';
  superUser?: {
    email: string;
    firstName: string;
    lastName: string;
  };
  mode: DynamicOrganisationMode;
  cacheKey: string;
  createStatus?: number;
  approveStatus?: number;
  pollAttempts?: number;
  approvalStrategy?: DynamicOrganisationResolvedApprovalStrategy;
  timings?: DynamicOrganisationProvisioningStageTiming[];
  totalElapsedMs?: number;
  reusedFromCache: boolean;
};

type DynamicOrganisationCacheEntry = {
  organisationId: string;
  name: string;
  status: 'ACTIVE';
  superUser?: {
    email: string;
    firstName: string;
    lastName: string;
  };
  cacheKey: string;
  createdAt: string;
  createStatus?: number;
  approveStatus?: number;
  pollAttempts?: number;
  approvalStrategy?: DynamicOrganisationResolvedApprovalStrategy;
  timings?: DynamicOrganisationProvisioningStageTiming[];
  totalElapsedMs?: number;
};

type ResolveDynamicOrganisationArgs = {
  professionalUserUtils: ProfessionalUserUtils;
};

type DynamicOrganisationResolverDeps = {
  ensureSuperUserAccount?: (
    professionalUserUtils: ProfessionalUserUtils,
    superUser: DynamicOrganisationSuperUser
  ) => Promise<void>;
  createApprovedOrganisation: (
    professionalUserUtils: ProfessionalUserUtils,
    options: DynamicOrganisationProvisioningOptions
  ) => Promise<DynamicOrganisationProvisioningResult>;
  readCache: (cachePath: string) => Promise<DynamicOrganisationCacheEntry | undefined>;
  writeCache: (cachePath: string, entry: DynamicOrganisationCacheEntry) => Promise<void>;
  withLock: <T>(lockPath: string, action: () => Promise<T>) => Promise<T>;
  nowIso: () => string;
};

const DEFAULT_LOCK_TIMEOUT_MS = 60_000;
const DEFAULT_LOCK_POLL_INTERVAL_MS = 250;
const DEFAULT_LOCK_STALE_MS = 15 * 60_000;
const DEFAULT_DYNAMIC_ORG_SUPER_USER_DOMAIN = 'example.test';

function resolveDynamicOrganisationMode(): 'dynamic' {
  const mode = firstNonEmpty(process.env.PW_DYNAMIC_ORGANISATION_MODE)?.toLowerCase();
  if (!mode || mode === 'dynamic') {
    return 'dynamic';
  }
  throw new Error(
    `Unsupported PW_DYNAMIC_ORGANISATION_MODE='${mode}'. Static organisation fallback has been retired; use dynamic organisation provisioning.`
  );
}

function sanitizeCacheKey(value: string): string {
  return resolveDynamicOrganisationRunId({ explicitRunId: value, maxLength: 80 });
}

function resolveDynamicOrganisationCacheKey(): string {
  return resolveDynamicOrganisationRunId({ maxLength: 80 });
}

function resolveCacheDir(): string {
  return (
    firstNonEmpty(process.env.PW_DYNAMIC_ORGANISATION_CACHE_DIR) ??
    path.join(process.cwd(), 'test-results', 'dynamic-organisations')
  );
}

function resolveCachePath(cacheKey: string): string {
  return path.join(resolveCacheDir(), `${cacheKey}.json`);
}

function resolveDynamicOrganisationOptions(cacheKey: string): DynamicOrganisationProvisioningOptions {
  return {
    runId: cacheKey,
    name: firstNonEmpty(process.env.PW_DYNAMIC_ORGANISATION_NAME),
    superUserEmail: firstNonEmpty(process.env.PW_DYNAMIC_ORGANISATION_SUPER_USER_EMAIL),
  };
}

function resolveDynamicOrganisationSuperUser(cacheKey: string): DynamicOrganisationSuperUser {
  const domain = firstNonEmpty(process.env.PW_DYNAMIC_ORGANISATION_SUPER_USER_DOMAIN) ?? DEFAULT_DYNAMIC_ORG_SUPER_USER_DOMAIN;
  return {
    email:
      firstNonEmpty(process.env.PW_DYNAMIC_ORGANISATION_SUPER_USER_EMAIL) ?? `pw-dynamic-org-${cacheKey.toLowerCase()}@${domain}`,
    firstName: 'Playwright',
    lastName: 'Dynamic',
  };
}

function resolveLockTimeoutMs(): number {
  const parsed = Number.parseInt(process.env.PW_DYNAMIC_ORGANISATION_LOCK_TIMEOUT_MS ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_LOCK_TIMEOUT_MS;
}

function resolveLockPollIntervalMs(): number {
  const parsed = Number.parseInt(process.env.PW_DYNAMIC_ORGANISATION_LOCK_POLL_INTERVAL_MS ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_LOCK_POLL_INTERVAL_MS;
}

function resolveLockStaleMs(): number {
  const parsed = Number.parseInt(process.env.PW_DYNAMIC_ORGANISATION_LOCK_STALE_MS ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_LOCK_STALE_MS;
}

async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function readCache(cachePath: string): Promise<DynamicOrganisationCacheEntry | undefined> {
  try {
    const raw = await fs.readFile(cachePath, 'utf8');
    const parsed = JSON.parse(raw) as Partial<DynamicOrganisationCacheEntry>;
    if (parsed.organisationId && parsed.name && parsed.status === 'ACTIVE' && parsed.cacheKey) {
      return parsed as DynamicOrganisationCacheEntry;
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw error;
    }
  }
  return undefined;
}

async function writeCache(cachePath: string, entry: DynamicOrganisationCacheEntry): Promise<void> {
  await fs.mkdir(path.dirname(cachePath), { recursive: true });
  await fs.writeFile(cachePath, `${JSON.stringify(entry, null, 2)}\n`, 'utf8');
}

async function tryRetireStaleLock(lockPath: string, staleMs: number): Promise<boolean> {
  let stats;
  try {
    stats = await fs.stat(lockPath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return true;
    }
    throw error;
  }

  if (Date.now() - stats.mtimeMs < staleMs) {
    return false;
  }

  const retiredPath = `${lockPath}.stale-${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  try {
    await fs.rename(lockPath, retiredPath);
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === 'ENOENT') {
      return true;
    }
    if (code === 'EEXIST') {
      return false;
    }
    throw error;
  }
  await fs.rm(retiredPath, { recursive: true, force: true });
  return true;
}

async function withDirectoryLock<T>(lockPath: string, action: () => Promise<T>): Promise<T> {
  const timeoutMs = resolveLockTimeoutMs();
  const pollIntervalMs = resolveLockPollIntervalMs();
  const staleMs = resolveLockStaleMs();
  const deadline = Date.now() + timeoutMs;
  await fs.mkdir(path.dirname(lockPath), { recursive: true });
  while (true) {
    try {
      await fs.mkdir(lockPath);
      break;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
        throw error;
      }
      if (await tryRetireStaleLock(lockPath, staleMs)) {
        continue;
      }
      if (Date.now() >= deadline) {
        throw new Error(
          `Timed out after ${timeoutMs}ms waiting for dynamic organisation lock: ${lockPath}. ` +
            `Existing lock was not stale; stale threshold is ${staleMs}ms.`
        );
      }
      await sleep(pollIntervalMs);
    }
  }
  try {
    return await action();
  } finally {
    await fs.rm(lockPath, { recursive: true, force: true });
  }
}

const DEFAULT_DEPS: DynamicOrganisationResolverDeps = {
  ensureSuperUserAccount: async (professionalUserUtils, superUser) => {
    await professionalUserUtils.createOrganisationAssignmentAdminUser({
      email: superUser.email,
      forename: superUser.firstName,
      surname: superUser.lastName,
      outputCreatedUserData: process.env.PW_DYNAMIC_USER_OUTPUT_CREATED_DATA === '1',
    });
  },
  createApprovedOrganisation: (professionalUserUtils, options) =>
    professionalUserUtils.createApprovedOrganisationForTest(options),
  readCache,
  writeCache,
  withLock: withDirectoryLock,
  nowIso: () => new Date().toISOString(),
};

function toDynamicResolution(
  created: DynamicOrganisationProvisioningResult,
  cacheKey: string,
  mode: DynamicOrganisationMode,
  reusedFromCache: boolean
): DynamicOrganisationResolution {
  return {
    source: 'dynamic',
    organisationId: created.organisationId,
    name: created.name,
    status: created.status,
    superUser: created.superUser,
    mode,
    cacheKey,
    createStatus: created.createStatus,
    approveStatus: created.approveStatus,
    pollAttempts: created.pollAttempts,
    approvalStrategy: created.approvalStrategy,
    timings: created.timings,
    totalElapsedMs: created.totalElapsedMs,
    reusedFromCache,
  };
}

function toCachedDynamicResolution(
  entry: DynamicOrganisationCacheEntry,
  cacheKey: string,
  mode: DynamicOrganisationMode
): DynamicOrganisationResolution {
  return {
    source: 'dynamic',
    organisationId: entry.organisationId,
    name: entry.name,
    status: entry.status,
    superUser: entry.superUser,
    mode,
    cacheKey,
    createStatus: entry.createStatus,
    approveStatus: entry.approveStatus,
    pollAttempts: entry.pollAttempts,
    approvalStrategy: entry.approvalStrategy,
    timings: entry.timings,
    totalElapsedMs: entry.totalElapsedMs,
    reusedFromCache: true,
  };
}

function isCacheEntryForRun(
  entry: DynamicOrganisationCacheEntry | undefined,
  expectedCacheKey: string
): entry is DynamicOrganisationCacheEntry {
  return Boolean(entry && entry.cacheKey === expectedCacheKey);
}

async function createOrReuseDynamicOrganisation(
  args: ResolveDynamicOrganisationArgs,
  deps: DynamicOrganisationResolverDeps,
  mode: DynamicOrganisationMode
): Promise<DynamicOrganisationResolution> {
  const cacheKey = resolveDynamicOrganisationCacheKey();
  const cachePath = resolveCachePath(cacheKey);
  const lockPath = `${cachePath}.lock`;
  const cachedBeforeLock = await deps.readCache(cachePath);
  if (isCacheEntryForRun(cachedBeforeLock, cacheKey)) {
    return toCachedDynamicResolution(cachedBeforeLock, cacheKey, mode);
  }

  return deps.withLock(lockPath, async () => {
    const cachedAfterLock = await deps.readCache(cachePath);
    if (isCacheEntryForRun(cachedAfterLock, cacheKey)) {
      return toCachedDynamicResolution(cachedAfterLock, cacheKey, mode);
    }

    const superUser = resolveDynamicOrganisationSuperUser(cacheKey);
    await deps.ensureSuperUserAccount?.(args.professionalUserUtils, superUser);
    const organisationOptions = {
      ...resolveDynamicOrganisationOptions(cacheKey),
      superUser,
    };
    const created = await deps.createApprovedOrganisation(args.professionalUserUtils, organisationOptions);
    await deps.writeCache(cachePath, {
      organisationId: created.organisationId,
      name: created.name,
      status: created.status,
      superUser: created.superUser,
      cacheKey,
      createdAt: deps.nowIso(),
      createStatus: created.createStatus,
      approveStatus: created.approveStatus,
      pollAttempts: created.pollAttempts,
      approvalStrategy: created.approvalStrategy,
      timings: created.timings,
      totalElapsedMs: created.totalElapsedMs,
    });
    return toDynamicResolution(created, cacheKey, mode, false);
  });
}

export async function resolveDynamicOrganisationId(
  args: ResolveDynamicOrganisationArgs,
  deps: DynamicOrganisationResolverDeps = DEFAULT_DEPS
): Promise<DynamicOrganisationResolution> {
  return createOrReuseDynamicOrganisation(args, deps, resolveDynamicOrganisationMode());
}

export const __test__ = {
  resolveDynamicOrganisationId,
  resolveDynamicOrganisationMode,
  resolveDynamicOrganisationCacheKey,
  resolveLockStaleMs,
  sanitizeCacheKey,
  withDirectoryLock,
};
