import { promises as fs } from 'node:fs';
import path from 'node:path';

import type {
  DynamicOrganisationProvisioningError,
  DynamicOrganisationProvisioningStageTiming,
  DynamicOrganisationResolvedApprovalStrategy,
  DynamicOrganisationProvisioningOptions,
  DynamicOrganisationProvisioningResult,
} from '../professional-user/organisationProvisioning.js';
import type { ProfessionalUserUtils } from '../professional-user.utils';

export type DynamicOrganisationMode = 'static' | 'dynamic' | 'auto';

export type DynamicOrganisationAttemptFailure = {
  attempted: true;
  errorName: string;
  message: string;
  stage?: 'create' | 'approve' | 'poll-active';
  endpoint?: string;
  status?: number | 'timeout' | 'unknown';
  timings?: DynamicOrganisationProvisioningStageTiming[];
  totalElapsedMs?: number;
};

export type DynamicOrganisationResolution =
  | {
      source: 'static';
      organisationId: string;
      mode: DynamicOrganisationMode;
      fallbackReason: 'static-configured' | 'dynamic-disabled' | 'dynamic-failed';
      dynamicAttempt?: DynamicOrganisationAttemptFailure;
    }
  | {
      source: 'dynamic';
      organisationId: string;
      name: string;
      status: 'ACTIVE';
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
  createApprovedOrganisation: (
    professionalUserUtils: ProfessionalUserUtils,
    options: DynamicOrganisationProvisioningOptions
  ) => Promise<DynamicOrganisationProvisioningResult>;
  readCache: (cachePath: string) => Promise<DynamicOrganisationCacheEntry | undefined>;
  writeCache: (cachePath: string, entry: DynamicOrganisationCacheEntry) => Promise<void>;
  withLock: <T>(lockPath: string, action: () => Promise<T>) => Promise<T>;
  nowIso: () => string;
};

const truthyValues = new Set(['1', 'true', 'yes', 'on']);
const DEFAULT_LOCK_TIMEOUT_MS = 60_000;
const DEFAULT_LOCK_POLL_INTERVAL_MS = 250;
const DYNAMIC_ORGANISATION_MODES = new Set<DynamicOrganisationMode>(['static', 'dynamic', 'auto']);

function firstNonEmpty(...values: Array<string | undefined>): string | undefined {
  for (const value of values) {
    const trimmed = value?.trim();
    if (trimmed) return trimmed;
  }
  return undefined;
}

function isTruthy(value: string | undefined): boolean {
  return truthyValues.has((value ?? '').trim().toLowerCase());
}

function resolveExplicitDynamicOrganisationMode(): DynamicOrganisationMode | undefined {
  const mode = firstNonEmpty(process.env.PW_DYNAMIC_ORGANISATION_MODE)?.toLowerCase();
  if (DYNAMIC_ORGANISATION_MODES.has(mode as DynamicOrganisationMode)) {
    return mode as DynamicOrganisationMode;
  }
  if (isTruthy(process.env.PW_DYNAMIC_ORGANISATION_REQUIRED)) {
    return 'dynamic';
  }
  if (isTruthy(process.env.PW_DYNAMIC_ORGANISATION_FALLBACK_TO_STATIC)) {
    return 'auto';
  }
  return undefined;
}

function resolveDynamicOrganisationMode(staticOrganisationId: string | undefined): DynamicOrganisationMode {
  const explicitMode = resolveExplicitDynamicOrganisationMode();
  if (explicitMode) return explicitMode;
  if (staticOrganisationId) return 'static';
  if (isTruthy(process.env.PW_DYNAMIC_ORGANISATION_ENABLED)) return 'dynamic';
  return 'static';
}

function sanitizeCacheKey(value: string): string {
  return (
    value
      .trim()
      .replaceAll(/[^a-zA-Z0-9_.-]/g, '-')
      .replaceAll(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 80) || 'local'
  );
}

function resolveDynamicOrganisationCacheKey(): string {
  return sanitizeCacheKey(
    firstNonEmpty(
      process.env.PW_DYNAMIC_ORGANISATION_RUN_ID,
      process.env.GITHUB_RUN_ID,
      process.env.BUILD_BUILDID,
      process.env.BUILD_BUILDNUMBER,
      process.env.CI_PIPELINE_ID,
      process.env.PW_TEST_RUN_ID,
      'local'
    ) ?? 'local'
  );
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

function toDynamicAttemptFailure(error: unknown): DynamicOrganisationAttemptFailure {
  const provisioningError = error as Partial<DynamicOrganisationProvisioningError>;
  return {
    attempted: true,
    errorName: error instanceof Error ? error.name : 'UnknownError',
    message: error instanceof Error ? error.message : String(error),
    stage: provisioningError.stage,
    endpoint: provisioningError.endpoint,
    status: provisioningError.status,
    timings: provisioningError.timings,
    totalElapsedMs: provisioningError.totalElapsedMs,
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

async function withDirectoryLock<T>(lockPath: string, action: () => Promise<T>): Promise<T> {
  const timeoutMs = resolveLockTimeoutMs();
  const pollIntervalMs = resolveLockPollIntervalMs();
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
      if (Date.now() >= deadline) {
        throw new Error(`Timed out after ${timeoutMs}ms waiting for dynamic organisation lock: ${lockPath}`);
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

async function createOrReuseDynamicOrganisation(
  args: ResolveDynamicOrganisationArgs,
  deps: DynamicOrganisationResolverDeps,
  mode: DynamicOrganisationMode
): Promise<DynamicOrganisationResolution> {
  const cacheKey = resolveDynamicOrganisationCacheKey();
  const cachePath = resolveCachePath(cacheKey);
  const lockPath = `${cachePath}.lock`;
  const cachedBeforeLock = await deps.readCache(cachePath);
  if (cachedBeforeLock) {
    return toCachedDynamicResolution(cachedBeforeLock, cacheKey, mode);
  }

  return deps.withLock(lockPath, async () => {
    const cachedAfterLock = await deps.readCache(cachePath);
    if (cachedAfterLock) {
      return toCachedDynamicResolution(cachedAfterLock, cacheKey, mode);
    }

    const created = await deps.createApprovedOrganisation(
      args.professionalUserUtils,
      resolveDynamicOrganisationOptions(cacheKey)
    );
    await deps.writeCache(cachePath, {
      organisationId: created.organisationId,
      name: created.name,
      status: created.status,
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
  const staticOrganisationId = process.env.TEST_SOLICITOR_ORGANISATION_ID?.trim();
  const mode = resolveDynamicOrganisationMode(staticOrganisationId);

  if (mode === 'static') {
    if (!staticOrganisationId) {
      throw new Error(
        'Missing dynamic-user prerequisite: TEST_SOLICITOR_ORGANISATION_ID. Set TEST_SOLICITOR_ORGANISATION_ID or enable PW_DYNAMIC_ORGANISATION_MODE=dynamic.'
      );
    }
    return {
      source: 'static',
      organisationId: staticOrganisationId,
      mode,
      fallbackReason: isTruthy(process.env.PW_DYNAMIC_ORGANISATION_ENABLED) ? 'static-configured' : 'dynamic-disabled',
    };
  }

  if (mode === 'dynamic') {
    return createOrReuseDynamicOrganisation(args, deps, mode);
  }

  try {
    return await createOrReuseDynamicOrganisation(args, deps, mode);
  } catch (error) {
    if (!staticOrganisationId) {
      throw error;
    }
    return {
      source: 'static',
      organisationId: staticOrganisationId,
      mode,
      fallbackReason: 'dynamic-failed',
      dynamicAttempt: toDynamicAttemptFailure(error),
    };
  }
}

export const __test__ = {
  resolveDynamicOrganisationId,
  resolveDynamicOrganisationMode,
  sanitizeCacheKey,
  toDynamicAttemptFailure,
};
