import * as fs from 'node:fs';
import * as lockfile from 'proper-lockfile';
import { createLogger } from '@hmcts/playwright-common';

import {
  SERVICE_DOWN_SESSION_CAPTURE_FAILURE,
  UNEXPLAINED_IDAM_LOGIN_FAILURE,
  isTransientSessionCaptureError,
  isUnexplainedIdamLoginRejection,
} from './sessionCaptureRetry.js';

const logger = createLogger({ serviceName: 'session-capture', format: 'pretty' });

export type SessionCaptureFailureRecord = {
  message: string;
  failureKind?: string;
  retryable?: boolean;
  recoveryAttempted?: boolean;
  storageStateFingerprint?: string | null;
};

export type SessionLockRelease = (() => Promise<void>) & {
  assertOwned: () => void;
};

export function recentSessionCaptureFailure(
  fsApi: typeof fs,
  failurePath: string,
  ttlMs: number,
  now: number = Date.now()
): SessionCaptureFailureRecord | null {
  if (ttlMs === 0 || !fsApi.existsSync(failurePath)) return null;
  try {
    const parsed = JSON.parse(fsApi.readFileSync(failurePath, 'utf8')) as {
      timestamp?: number;
      message?: string;
      failureKind?: string;
      retryable?: boolean;
      recoveryAttempted?: boolean;
      storageStateFingerprint?: unknown;
    };
    if (!parsed.timestamp || now - parsed.timestamp > ttlMs) return null;
    return {
      message: parsed.message?.trim() || 'previous session capture failed',
      failureKind: parsed.failureKind,
      retryable: parsed.retryable === true,
      recoveryAttempted: parsed.recoveryAttempted === true,
      storageStateFingerprint:
        parsed.storageStateFingerprint === null || typeof parsed.storageStateFingerprint === 'string'
          ? parsed.storageStateFingerprint
          : undefined,
    };
  } catch {
    return null;
  }
}

export function writeSessionCaptureFailure({
  fsApi,
  failurePath,
  sessionPath,
  error,
  recoveryAttempted = false,
  readStorageStateFingerprint,
}: {
  fsApi: typeof fs;
  failurePath: string;
  sessionPath: string;
  error: Error;
  recoveryAttempted?: boolean;
  readStorageStateFingerprint: (fsApi: typeof fs, sessionPath: string) => string | undefined;
}): void {
  try {
    const context = 'context' in error ? (error as Error & { context?: { failureKind?: unknown } }).context : undefined;
    const failureKind =
      typeof context?.failureKind === 'string'
        ? context.failureKind
        : isUnexplainedIdamLoginRejection(error)
          ? UNEXPLAINED_IDAM_LOGIN_FAILURE
          : undefined;
    fsApi.writeFileSync(
      failurePath,
      JSON.stringify({
        timestamp: Date.now(),
        message: error.message,
        failureKind,
        retryable:
          failureKind === SERVICE_DOWN_SESSION_CAPTURE_FAILURE || (!failureKind && isTransientSessionCaptureError(error)),
        recoveryAttempted,
        storageStateFingerprint: readStorageStateFingerprint(fsApi, sessionPath) ?? null,
      })
    );
  } catch {
    // Best effort only: the original login failure is actionable.
  }
}

export function clearSessionCaptureFailure(fsApi: typeof fs, failurePath: string): void {
  try {
    if (fsApi.existsSync(failurePath)) fsApi.rmSync(failurePath, { force: true });
  } catch {
    // Best effort only.
  }
}

export function ensureDirectory(fsApi: typeof fs, dirPath: string): void {
  if (!fsApi.existsSync(dirPath)) fsApi.mkdirSync(dirPath, { recursive: true });
}

export function ensureLockFile(fsApi: typeof fs, lockFilePath: string): void {
  if (!fsApi.existsSync(lockFilePath)) fsApi.writeFileSync(lockFilePath, '', 'utf8');
}

function isLockAlreadyHeldError(error: unknown): boolean {
  const candidate = error as { code?: string; message?: string };
  return (
    candidate?.code === 'ELOCKED' ||
    candidate?.message?.includes('already being held') === true ||
    candidate?.message?.includes('Lock file is already being held') === true
  );
}

function isStaleSessionLock(fsApi: typeof fs, lockFilePath: string, staleRecoveryMs: number, now = Date.now()): boolean {
  try {
    return now - fsApi.statSync(`${lockFilePath}.lock`).mtimeMs >= staleRecoveryMs;
  } catch {
    return false;
  }
}

export async function acquireSessionLock({
  lockfileApi,
  lockFilePath,
  userIdentifier,
  isSessionReusable,
  force,
  maxWaitMs = 150_000,
  staleMs = 24 * 60 * 60_000,
  updateMs = 5_000,
  staleRecoveryMs = 3 * 60_000,
  fsApi = fs,
  recoverStaleLock = false,
}: {
  lockfileApi: typeof lockfile;
  lockFilePath: string;
  userIdentifier: string;
  isSessionReusable: () => boolean;
  force: boolean;
  maxWaitMs?: number;
  staleMs?: number;
  updateMs?: number;
  staleRecoveryMs?: number;
  fsApi?: typeof fs;
  recoverStaleLock?: boolean;
}): Promise<SessionLockRelease | null> {
  const pollIntervalMs = 1_000;
  const startedAt = Date.now();
  let attempt = 0;
  while (true) {
    if (!force && isSessionReusable()) {
      logger.info('Fresh session detected while waiting for lock', {
        userIdentifier,
        lockFilePath,
        waitMs: Date.now() - startedAt,
        operation: 'session-capture',
      });
      return null;
    }
    try {
      if (recoverStaleLock && isStaleSessionLock(fsApi, lockFilePath, staleRecoveryMs)) {
        fsApi.rmSync(`${lockFilePath}.lock`, { recursive: true, force: true });
        logger.warn('Recovered an abandoned session lock before capture', {
          userIdentifier,
          lockFilePath,
          operation: 'session-capture',
        });
      }
      let compromisedError: Error | undefined;
      const releaseLock = await lockfileApi.lock(lockFilePath, {
        retries: 0,
        stale: staleMs,
        update: updateMs,
        onCompromised: (error) => {
          compromisedError = error;
        },
      });
      const assertOwned = () => {
        if (compromisedError) {
          const error = new Error(`Session lock ownership was lost for ${userIdentifier}`);
          error.name = 'SessionLockCompromisedError';
          throw error;
        }
      };
      const release = async () => {
        assertOwned();
        await releaseLock();
        assertOwned();
      };
      return Object.assign(release, { assertOwned });
    } catch (error) {
      if (!isLockAlreadyHeldError(error)) throw error;
      attempt += 1;
      const elapsedMs = Date.now() - startedAt;
      if (elapsedMs >= maxWaitMs) {
        throw new Error(`Timed out waiting for session lock for ${userIdentifier} after ${elapsedMs}ms (${lockFilePath})`);
      }
      logger.info('Session lock currently held by another worker', {
        userIdentifier,
        lockFilePath,
        attempt,
        elapsedMs,
        operation: 'session-capture',
      });
      await new Promise<void>((resolve) => setTimeout(resolve, Math.min(pollIntervalMs, maxWaitMs - elapsedMs)));
    }
  }
}
