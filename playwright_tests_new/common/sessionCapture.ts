import { chromium, test, type BrowserContext, type Locator, type Page } from '@playwright/test';
import { randomUUID } from 'node:crypto';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as lockfile from 'proper-lockfile';
import { UserUtils } from '../E2E/utils/user.utils.js';
import { IdamPage, createLogger } from '@hmcts/playwright-common';
import type { Cookie } from 'playwright-core';
import config from '../E2E/utils/config.utils.js';
import { SessionCapturePage } from '../E2E/page-objects/pages/exui/sessionCapture.po.js';
import { SessionCaptureError, StorageStateCorruptedError } from '../api/utils/errors';
import {
  type SessionIdentity,
  type SessionIdentityInput,
  resolveSessionIdentity,
  resolveSessionStorageKey,
} from './sessionIdentity.js';
import { sanitizeUrl } from './failureClassification.js';
import {
  SESSION_CAPTURE_LOGIN_ATTEMPTS,
  SERVICE_DOWN_SESSION_CAPTURE_FAILURE,
  UNEXPLAINED_IDAM_LOGIN_FAILURE,
  isTransientSessionCaptureError,
  isUnexplainedIdamLoginRejection,
} from './sessionCaptureRetry.js';
import { withOrderedSessionFallback } from './orderedSessionFallback.js';
import { PRL_SOLICITOR_USER, resolvePrlSolicitorSessionCandidates } from './prlSolicitorUserPool.js';
import { AAT_AUTH_UNAVAILABLE_FAILURE, shouldRejectUnavailableSessionValidation } from './sessionReusePolicy.js';
import { STAFF_ADMIN_USER, resolveStaffAdminSessionCandidates } from './staffAdminUserPool.js';
import { validateStoredSession } from './sessionReuseValidation.js';
import { bootstrapApiSession } from './apiSessionBootstrap.js';
import {
  acquireSessionLock,
  clearSessionCaptureFailure,
  ensureDirectory,
  ensureLockFile,
  recentSessionCaptureFailure,
  type SessionCaptureFailureRecord,
  type SessionLockRelease,
  writeSessionCaptureFailure,
} from './sessionCaptureLifecycle.js';
import {
  hasReusableAuthCookies,
  isStoredSessionFresh,
  loadStoredSession,
  persistApiSessionState,
  persistSession,
  readStorageStateFingerprint,
  resolveTargetHost,
  storageStateFingerprint,
  type LoadedSession,
} from './sessionStorageState.js';

export type { LoadedSession, StorageStateContext } from './sessionStorageState.js';

const logger = createLogger({ serviceName: 'session-capture', format: 'pretty' });

const CHROME_ERROR_URL_PREFIX = 'chrome-error://chromewebdata/';
const DEFAULT_SESSION_MAX_AGE_MS = 3_600_000;
const DEFAULT_SESSION_CAPTURE_FAILURE_TTL_MS = 120_000;
const DEFAULT_SESSION_CAPTURE_STAGGER_MS = 0;
const IDAM_LOGIN_SURFACE_TIMEOUT_MS = 20_000;
const POST_LOGIN_AUTH_TIMEOUT_MS = 15_000;
const SESSION_CAPTURE_BROWSER_LAUNCH_BUDGET_MS = 10_000;
const SESSION_CAPTURE_CONTEXT_CREATE_BUDGET_MS = 5_000;
const SESSION_CAPTURE_TARGET_BUDGET_MS = 45_000;
const SESSION_CAPTURE_PERSIST_BUDGET_MS = 10_000;
const SESSION_CAPTURE_CONTEXT_CLOSE_BUDGET_MS = 5_000;
const SESSION_CAPTURE_BROWSER_CLOSE_BUDGET_MS = 5_000;
const SESSION_CAPTURE_RETRY_BACKOFF_MIN_MS = 1_000;
const SESSION_CAPTURE_RETRY_BACKOFF_MAX_MS = 5_000;
const SESSION_CAPTURE_SINGLE_ATTEMPT_BUDGET_MS =
  SESSION_CAPTURE_BROWSER_LAUNCH_BUDGET_MS +
  SESSION_CAPTURE_TARGET_BUDGET_MS +
  SESSION_CAPTURE_PERSIST_BUDGET_MS +
  SESSION_CAPTURE_CONTEXT_CLOSE_BUDGET_MS +
  SESSION_CAPTURE_BROWSER_CLOSE_BUDGET_MS;
const SESSION_CAPTURE_OWNER_BUDGET_MS =
  SESSION_CAPTURE_BROWSER_LAUNCH_BUDGET_MS +
  SESSION_CAPTURE_LOGIN_ATTEMPTS * (SESSION_CAPTURE_TARGET_BUDGET_MS + SESSION_CAPTURE_CONTEXT_CLOSE_BUDGET_MS) +
  SESSION_CAPTURE_PERSIST_BUDGET_MS +
  SESSION_CAPTURE_RETRY_BACKOFF_MAX_MS +
  SESSION_CAPTURE_BROWSER_CLOSE_BUDGET_MS;
const SESSION_CAPTURE_LOCK_HEADROOM_MS = 15_000;
const SESSION_CAPTURE_LOCK_WAIT_MS = SESSION_CAPTURE_OWNER_BUDGET_MS + SESSION_CAPTURE_LOCK_HEADROOM_MS;
const SESSION_CAPTURE_LOCK_START_BUDGET_MS = SESSION_CAPTURE_LOCK_HEADROOM_MS;
// The integration timeout reserves its final 30 seconds for the journey after lazy capture.
const SESSION_CAPTURE_POOL_BUDGET_MS = 150_000;
// Worker staggering must not consume the time reserved for a complete capture retry cycle.
// Keep lock headroom so timer/scheduling drift cannot reduce the cycle to one attempt.
const SESSION_CAPTURE_MAX_STAGGER_MS = Math.max(
  0,
  SESSION_CAPTURE_POOL_BUDGET_MS - SESSION_CAPTURE_OWNER_BUDGET_MS - SESSION_CAPTURE_LOCK_HEADROOM_MS
);
const SESSION_CAPTURE_LOCK_UPDATE_MS = 5_000;
// Automatic takeover inside a test run can let a suspended owner resume and overwrite
// a replacement session. CI workspaces are isolated, so fail closed on orphaned locks.
const SESSION_CAPTURE_LOCK_STALE_MS = 24 * 60 * 60_000;
const SESSION_CAPTURE_STALE_LOCK_RECOVERY_MS = 3 * 60_000;

function resolveCaptureAttemptLimit(remainingCaptureBudgetMs: number | undefined): number {
  if (remainingCaptureBudgetMs === undefined || remainingCaptureBudgetMs >= SESSION_CAPTURE_OWNER_BUDGET_MS) {
    return SESSION_CAPTURE_LOGIN_ATTEMPTS;
  }
  return remainingCaptureBudgetMs >= SESSION_CAPTURE_SINGLE_ATTEMPT_BUDGET_MS ? 1 : 0;
}

async function withOperationTimeout<T>(
  operation: () => Promise<T>,
  timeoutMs: number,
  message: string,
  onTimeout?: () => Promise<void> | void
): Promise<T> {
  let timedOut = false;
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      operation().then(
        (value) => (timedOut ? new Promise<T>(() => undefined) : value),
        (error) => (timedOut ? new Promise<T>(() => undefined) : Promise.reject(error))
      ),
      new Promise<T>((_resolve, reject) => {
        timeout = setTimeout(async () => {
          timedOut = true;
          const error = new Error(message);
          error.name = 'TimeoutError';
          try {
            await onTimeout?.();
          } catch (cleanupError) {
            const evidence = sessionCaptureFailureEvidence(cleanupError as Error);
            logger.warn('Timed operation cleanup failed', {
              error: evidence,
              operation: 'session-capture',
            });
            const cancellationError = new Error(`${message}; timeout cleanup failed: ${evidence}`);
            cancellationError.name = 'SessionCancellationError';
            reject(cancellationError);
            return;
          }
          reject(error);
        }, timeoutMs);
      }),
    ]);
  } finally {
    if (timeout) {
      clearTimeout(timeout);
    }
  }
}

async function waitForTransientRetry(): Promise<void> {
  const delayMs =
    SESSION_CAPTURE_RETRY_BACKOFF_MIN_MS +
    Math.floor(Math.random() * (SESSION_CAPTURE_RETRY_BACKOFF_MAX_MS - SESSION_CAPTURE_RETRY_BACKOFF_MIN_MS + 1));
  await new Promise<void>((resolve) => setTimeout(resolve, delayMs));
}

function sessionCaptureFailureEvidence(error: Error): string {
  return error.message
    .replace(/https?:\/\/[^\s)]+/g, (url) => sanitizeUrl(url))
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 500);
}

function sanitizedSessionCaptureError(error: unknown): Error {
  const original = toError(error);
  const sanitized = new Error(sessionCaptureFailureEvidence(original));
  sanitized.name = original.name;
  return sanitized;
}

function getIdamUsernameCandidates(page: Page, idamPage: IdamPage): Locator[] {
  return new SessionCapturePage(page).idamUsernameCandidates(idamPage);
}

function getIdamPasswordCandidates(page: Page, idamPage: IdamPage): Locator[] {
  return new SessionCapturePage(page).idamPasswordCandidates(idamPage);
}

function getIdamSubmitCandidates(page: Page, idamPage: IdamPage): Locator[] {
  return new SessionCapturePage(page).idamSubmitCandidates(idamPage);
}

async function waitForFirstVisibleLocator(page: Page, candidates: Locator[], timeoutMs: number): Promise<Locator | null> {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    for (const candidate of candidates) {
      if (await candidate.isVisible().catch(() => false)) {
        return candidate;
      }
    }

    const remainingMs = deadline - Date.now();
    if (remainingMs <= 0) {
      break;
    }
    await page.waitForTimeout(Math.min(250, remainingMs));
  }

  return null;
}

function ignoreRejectedSurfaceDetector<T>(promise: Promise<T>): Promise<T> {
  return promise.catch(
    () =>
      new Promise<T>(() => {
        // Keep the race open so the alternate surface detector owns the result.
      })
  );
}

async function getIdamLoginErrorText(page: Page): Promise<string | null> {
  for (const candidate of new SessionCapturePage(page).idamLoginErrorCandidates()) {
    const text = await candidate
      .textContent({ timeout: 500 })
      .catch(() => '')
      .then((value) => value?.replace(/\s+/g, ' ').trim() ?? '');
    if (text) {
      return text.slice(0, 500);
    }
  }
  return null;
}

function resolveSessionCaptureFailureTtlMs(env: NodeJS.ProcessEnv = process.env): number {
  const configured = Number(env.PW_SESSION_CAPTURE_FAILURE_TTL_MS);
  return Number.isFinite(configured) && configured >= 0 ? configured : DEFAULT_SESSION_CAPTURE_FAILURE_TTL_MS;
}

function resolveSessionCaptureStaggerMs(env: NodeJS.ProcessEnv = process.env): number {
  const configured = Number(env.PW_SESSION_CAPTURE_STAGGER_MS);
  return Number.isFinite(configured) && configured > 0 ? configured : DEFAULT_SESSION_CAPTURE_STAGGER_MS;
}

function shouldRecoverStaleSessionLocks(env: NodeJS.ProcessEnv = process.env): boolean {
  return env.PW_SESSION_CAPTURE_RECOVER_STALE_LOCKS === 'true';
}

function resolveSessionCaptureDelayMs(parallelIndex: number | undefined, env: NodeJS.ProcessEnv = process.env): number {
  const staggerMs = resolveSessionCaptureStaggerMs(env);
  if (staggerMs <= 0 || parallelIndex === undefined || parallelIndex <= 0) {
    return 0;
  }

  return Math.min(parallelIndex * staggerMs, SESSION_CAPTURE_MAX_STAGGER_MS);
}

function currentPageUrl(page: Page): string {
  try {
    return typeof page.url === 'function' ? page.url() : 'unknown';
  } catch {
    return 'unknown';
  }
}

function sanitizedPageUrl(page: Page): string {
  return sanitizeUrl(currentPageUrl(page));
}

function toError(error: unknown): Error {
  if (error instanceof Error) return error;
  if (typeof error === 'string') return new Error(error);
  return new Error('[non-Error thrown]');
}

function isChromeErrorNavigationFailure(error: unknown, currentUrl: string): boolean {
  const message = toError(error).message;
  return currentUrl.startsWith(CHROME_ERROR_URL_PREFIX) || message.includes(CHROME_ERROR_URL_PREFIX);
}

function isTransientNavigationFailure(error: unknown, currentUrl: string): boolean {
  const message = toError(error).message;
  return (
    isChromeErrorNavigationFailure(error, currentUrl) ||
    message.includes('ERR_CERT_VERIFIER_CHANGED') ||
    message.includes('ERR_NAME_NOT_RESOLVED') ||
    message.includes('ERR_INTERNET_DISCONNECTED') ||
    message.includes('ERR_NETWORK_CHANGED') ||
    message.includes('ERR_CONNECTION_RESET') ||
    message.includes('ERR_CONNECTION_CLOSED') ||
    message.includes('ERR_CONNECTION_TIMED_OUT') ||
    message.includes('ERR_TIMED_OUT')
  );
}

async function gotoAppTarget(page: Page, userIdentifier: string, targetUrl: string): Promise<void> {
  const maxNavigationAttempts = 3;
  let lastError: Error | null = null;

  for (let navigationAttempt = 1; navigationAttempt <= maxNavigationAttempts; navigationAttempt += 1) {
    try {
      await page.goto(targetUrl);
      const currentUrl = currentPageUrl(page);
      if (currentUrl.startsWith(CHROME_ERROR_URL_PREFIX)) {
        throw new Error(`Navigation landed on ${CHROME_ERROR_URL_PREFIX} while opening ${sanitizeUrl(targetUrl)}`);
      }
      return;
    } catch (error) {
      const currentUrl = currentPageUrl(page);
      const parsedError = toError(error);
      const canRetry = navigationAttempt < maxNavigationAttempts && isTransientNavigationFailure(parsedError, currentUrl);
      lastError = sanitizedSessionCaptureError(parsedError);
      logger.warn('Authenticated app navigation failed', {
        userIdentifier,
        targetUrl: sanitizeUrl(targetUrl),
        navigationAttempt,
        maxNavigationAttempts,
        canRetry,
        currentUrl: sanitizeUrl(currentUrl),
        error: sessionCaptureFailureEvidence(parsedError),
        operation: 'ensure-authenticated-page',
      });
      if (!canRetry) {
        throw lastError;
      }
      await new Promise<void>((resolve) => setTimeout(resolve, 1_000 * navigationAttempt));
    }
  }

  if (lastError) {
    throw lastError;
  }
}

async function gotoLoginTarget(page: Page, userIdentifier: string, loginTarget: string): Promise<void> {
  const maxNavigationAttempts = 2;
  let lastError: Error | null = null;

  for (let navigationAttempt = 1; navigationAttempt <= maxNavigationAttempts; navigationAttempt += 1) {
    try {
      await page.goto(loginTarget, { waitUntil: 'commit' });
      const currentUrl = currentPageUrl(page);
      if (currentUrl.startsWith(CHROME_ERROR_URL_PREFIX)) {
        throw new Error(`Navigation landed on ${CHROME_ERROR_URL_PREFIX} while opening ${sanitizeUrl(loginTarget)}`);
      }
      return;
    } catch (error) {
      const currentUrl = currentPageUrl(page);
      const parsedError = toError(error);
      const canRetry = navigationAttempt < maxNavigationAttempts && isChromeErrorNavigationFailure(parsedError, currentUrl);
      lastError = sanitizedSessionCaptureError(parsedError);
      logger.warn('Login navigation failed', {
        userIdentifier,
        loginTarget: sanitizeUrl(loginTarget),
        navigationAttempt,
        maxNavigationAttempts,
        canRetry,
        currentUrl: sanitizeUrl(currentUrl),
        error: sessionCaptureFailureEvidence(parsedError),
        operation: 'session-capture',
      });
      if (!canRetry) {
        throw lastError;
      }
      await new Promise<void>((resolve) => setTimeout(resolve, 1_000 * navigationAttempt));
    }
  }

  if (lastError) {
    throw lastError;
  }
}

export async function acceptAccessCookiesIfPresent(page: Page): Promise<void> {
  const sessionCapturePage = new SessionCapturePage(page);
  if (await sessionCapturePage.acceptCookiesButton.isVisible().catch(() => false)) {
    await sessionCapturePage.acceptCookiesButton.click({ timeout: 2_000 }).catch(() => undefined);
  }
}

async function waitForRequiredAuthCookies(page: Page, timeoutMs: number): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const cookies = await page
      .context()
      .cookies()
      .catch(() => []);
    if (hasReusableAuthCookies(cookies, undefined, undefined)) {
      return true;
    }
    await new Promise<void>((resolve) => setTimeout(resolve, Math.min(500, deadline - Date.now())));
  }
  return false;
}

type ErrorWithSessionLockReleaseError = Error & {
  sessionLockReleaseError?: Error;
};

type ErrorWithBrowserCloseError = Error & {
  browserCloseError?: Error;
};

function isSessionLockCompromisedError(error: Error): boolean {
  return error.name === 'SessionLockCompromisedError';
}

function toSessionLockReleaseError(userIdentifier: string, error: unknown): Error {
  const releaseError = toError(error);
  if (isSessionLockCompromisedError(releaseError)) {
    return releaseError;
  }
  const wrapped = Object.assign(new Error(`Failed to release session lock for ${userIdentifier}: ${releaseError.message}`), {
    cause: releaseError,
  });
  wrapped.name = 'SessionLockReleaseError';
  return wrapped;
}

type SessionCaptureDeps = {
  chromiumLauncher?: typeof chromium;
  userUtils?: UserUtils;
  resolveSessionIdentity?: typeof resolveSessionIdentity;
  idamPageFactory?: (page: Page) => IdamPage;
  isSessionFresh?: typeof isSessionFresh;
  persistSession?: typeof persistSession;
  loginAndPersistSession?: typeof loginAndPersistSession;
  fs?: typeof fs;
  config?: typeof config;
  env?: NodeJS.ProcessEnv;
  lockfile?: typeof lockfile;
  force?: boolean;
  now?: () => number;
  expectedStaleSession?: Pick<LoadedSession, 'storageFile' | 'storageStateFingerprint'>;
  lockWaitMs?: number;
  captureDeadlineAt?: number;
  validateStoredSession?: typeof validateStoredSession;
  bootstrapApiSession?: typeof bootstrapApiSession;
};

const setupMarkerByPage = new WeakMap<Page, string>();
const setupMarkerValues = [
  'none',
  'other',
  'setup-start',
  'cookies-ready',
  'navigated-app',
  'waiting-shell',
  'shell-ready',
  'shell-timeout',
  'service-down',
  'session-refresh',
  'idam-login',
  'setup-ready',
] as const;

type SetupMarker = (typeof setupMarkerValues)[number];
const allowedSetupMarkers = new Set<string>(setupMarkerValues);
const DEFAULT_SETUP_MARKER: SetupMarker = 'none';
const OTHER_SETUP_MARKER: SetupMarker = 'other';

function normalizeSetupMarker(marker: string | undefined): string {
  const value = marker?.trim();
  if (!value) {
    return DEFAULT_SETUP_MARKER;
  }
  return allowedSetupMarkers.has(value) ? value : OTHER_SETUP_MARKER;
}

export function setSetupMarker(page: Page, marker: string): void {
  setupMarkerByPage.set(page, normalizeSetupMarker(marker));
}

export function getSetupMarker(page: Page): string {
  return setupMarkerByPage.get(page) ?? DEFAULT_SETUP_MARKER;
}

function resolveSessionMaxAgeMs(env: NodeJS.ProcessEnv = process.env): number {
  const configured = Number(env.PW_SESSION_MAX_AGE_MS);
  return Number.isFinite(configured) && configured > 0 ? configured : DEFAULT_SESSION_MAX_AGE_MS;
}

/**
 * Ensure session is captured for a given userIdentifier before tests run.
 * Call this in test.beforeAll() to lazily capture only needed sessions.
 */
async function ensureSessionForIdentity(userIdentifier: SessionIdentityInput, captureDeadlineAt?: number): Promise<void> {
  const identity = resolveSessionIdentity(userIdentifier);
  const email = identity.email;
  const sessionStorageKey = resolveSessionStorageKey(identity);
  const sessionPath = path.join(process.cwd(), '.sessions', `${sessionStorageKey}.storage.json`);
  const targetUrl = process.env.TEST_URL ?? config.urls.exuiDefaultUrl;

  const isFresh = isSessionFresh(sessionPath, resolveSessionMaxAgeMs(), {
    targetUrl,
    idamUrl: config.urls.idamWebUrl,
  });
  if (isFresh) {
    logger.info('Session is fresh, skipping capture', {
      userIdentifier: identity.userIdentifier,
      email,
      operation: 'lazy-capture',
      metric: 'session-hit',
    });
    return;
  }
  logger.info('Session missing or stale, capturing lazily', {
    userIdentifier: identity.userIdentifier,
    email,
    operation: 'lazy-capture',
    metric: 'session-miss',
  });
  const parallelIndex = resolveCurrentPlaywrightParallelIndex();
  const delayMs = resolveSessionCaptureDelayMs(parallelIndex);
  if (delayMs > 0) {
    logger.info('Staggering lazy session capture for worker', {
      parallelIndex,
      delayMs,
      operation: 'lazy-capture',
    });
    await new Promise<void>((resolve) => setTimeout(resolve, delayMs));
  }
  // Do not force recapture here: when many workers race on a stale session,
  // lock waiters should be able to reuse the freshly captured session.
  await sessionCaptureWith([identity], { captureDeadlineAt });
}

function resolveCurrentPlaywrightParallelIndex(): number | undefined {
  try {
    return test.info().parallelIndex;
  } catch {
    return undefined;
  }
}

function resolveSessionCandidates(
  userIdentifier: SessionIdentityInput,
  parallelIndex = resolveCurrentPlaywrightParallelIndex()
): readonly SessionIdentityInput[] {
  const normalizedIdentifier = typeof userIdentifier === 'string' ? userIdentifier.trim().toUpperCase() : undefined;
  if (normalizedIdentifier === STAFF_ADMIN_USER) {
    return resolveStaffAdminSessionCandidates({ parallelIndex });
  }
  if (normalizedIdentifier === PRL_SOLICITOR_USER) {
    return resolvePrlSolicitorSessionCandidates({ parallelIndex });
  }
  return [userIdentifier];
}

type SessionSelectionRecord = {
  selectedUserIdentifier: string;
  selectedEmail: string;
};

function normaliseSessionEmail(email: string): string {
  return email.trim().toLowerCase();
}

function resolveSessionSelectionPath(
  candidates: readonly SessionIdentityInput[],
  parallelIndex = resolveCurrentPlaywrightParallelIndex()
): string | undefined {
  if (candidates.length < 2) {
    return undefined;
  }

  const primaryStorageKey = resolveSessionStorageKey(resolveSessionIdentity(candidates[0]));
  const workerSuffix = Number.isInteger(parallelIndex) && Number(parallelIndex) >= 0 ? `.worker-${parallelIndex}` : '';
  return path.join(process.cwd(), '.sessions', `${primaryStorageKey}${workerSuffix}.selection.json`);
}

function persistSessionSelection(candidates: readonly SessionIdentityInput[], selectedIdentity: SessionIdentity): void {
  const selectionPath = resolveSessionSelectionPath(candidates);
  if (!selectionPath) {
    return;
  }

  const stagingPath = `${selectionPath}.${process.pid}.${randomUUID()}.tmp`;
  const record: SessionSelectionRecord = {
    selectedUserIdentifier: selectedIdentity.userIdentifier,
    selectedEmail: normaliseSessionEmail(selectedIdentity.email),
  };

  fs.mkdirSync(path.dirname(selectionPath), { recursive: true });
  try {
    fs.writeFileSync(stagingPath, JSON.stringify(record), 'utf8');
    fs.renameSync(stagingPath, selectionPath);
  } finally {
    if (fs.existsSync(stagingPath)) {
      fs.rmSync(stagingPath, { force: true });
    }
  }
}

function resolveSessionIdentityForLoad(userIdentifier: SessionIdentityInput): SessionIdentity {
  const candidates = resolveSessionCandidates(userIdentifier);
  const primaryIdentity = resolveSessionIdentity(candidates[0]);
  const selectionPath = resolveSessionSelectionPath(candidates);
  if (!selectionPath) {
    return primaryIdentity;
  }

  try {
    const record = JSON.parse(fs.readFileSync(selectionPath, 'utf8')) as Partial<SessionSelectionRecord>;
    if (typeof record.selectedUserIdentifier !== 'string' || typeof record.selectedEmail !== 'string') {
      throw new TypeError('Session selection must contain a user identifier and email');
    }

    const selectedIdentity = candidates
      .map((candidate) => resolveSessionIdentity(candidate))
      .find(
        (candidate) =>
          candidate.userIdentifier === record.selectedUserIdentifier &&
          normaliseSessionEmail(candidate.email) === record.selectedEmail
      );
    if (selectedIdentity) {
      return selectedIdentity;
    }

    logger.warn('Ignoring session selection for an unconfigured identity', {
      userIdentifier: primaryIdentity.userIdentifier,
      selectionPath,
      operation: 'load-session',
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      logger.warn('Ignoring unreadable session selection', {
        userIdentifier: primaryIdentity.userIdentifier,
        selectionPath,
        error: (error as Error).message,
        operation: 'load-session',
      });
    }
  }

  return primaryIdentity;
}

async function ensureSessionWith(
  userIdentifier: SessionIdentityInput,
  ensureCandidate: (identity: SessionIdentity, captureDeadlineAt: number) => Promise<void> = ensureSessionForIdentity,
  candidates = resolveSessionCandidates(userIdentifier)
): Promise<void> {
  const captureDeadlineAt = Date.now() + SESSION_CAPTURE_POOL_BUDGET_MS;
  const selection = await withOrderedSessionFallback(candidates, async (identity) => {
    await ensureCandidate(identity, captureDeadlineAt);
    return identity;
  });
  persistSessionSelection(candidates, selection.value);
}

export async function ensureSession(userIdentifier: SessionIdentityInput): Promise<void> {
  await ensureSessionWith(userIdentifier);
}

/**
 * Load persisted session cookies for a given userIdentifier.
 * Throws if session doesn't exist. Use ensureSession() first.
 */
export function loadSessionCookies(userIdentifier: SessionIdentityInput): LoadedSession {
  const identity = resolveSessionIdentityForLoad(userIdentifier);
  const storageKey = resolveSessionStorageKey(identity);
  const storageFile = path.join(process.cwd(), '.sessions', `${storageKey}.storage.json`);
  return loadStoredSession(identity, storageFile);
}

/**
 * Ensure a session is captured and return the loaded cookies.
 * Retries once if the session file is missing or corrupted.
 */
async function ensureSessionCookiesForIdentity(
  userIdentifier: SessionIdentityInput,
  captureDeadlineAt?: number
): Promise<LoadedSession> {
  await ensureSessionForIdentity(userIdentifier, captureDeadlineAt);
  try {
    return loadSessionCookies(userIdentifier);
  } catch (error) {
    if (error instanceof StorageStateCorruptedError) {
      await ensureSessionForIdentity(userIdentifier, captureDeadlineAt);
      return loadSessionCookies(userIdentifier);
    }
    throw error;
  }
}

export async function ensureSessionCookies(userIdentifier: SessionIdentityInput): Promise<LoadedSession> {
  const captureDeadlineAt = Date.now() + SESSION_CAPTURE_POOL_BUDGET_MS;
  const selection = await withOrderedSessionFallback(resolveSessionCandidates(userIdentifier), (identity) =>
    ensureSessionCookiesForIdentity(identity, captureDeadlineAt)
  );
  return selection.value;
}

/**
 * Ensure a session exists and add its cookies to the provided page context.
 */
async function applySessionCookiesForIdentity(
  page: Page,
  userIdentifier: SessionIdentityInput,
  captureDeadlineAt?: number
): Promise<LoadedSession> {
  let session = captureDeadlineAt
    ? await ensureSessionCookiesForIdentity(userIdentifier, captureDeadlineAt)
    : await ensureSessionCookies(userIdentifier);
  const targetUrl = process.env.TEST_URL ?? config.urls.exuiDefaultUrl;
  const validation = await validateLoadedSessionForReuse(session, targetUrl);
  if (validation === 'unauthenticated') {
    logger.warn('Cached session was rejected by auth/isAuthenticated; refreshing once', {
      userIdentifier: session.userIdentifier,
      sessionPath: session.storageFile,
      operation: 'session-refresh',
    });
    await refreshRejectedSession(session.userIdentifier, session);
    session = await ensureSessionCookiesForIdentity(session.userIdentifier, captureDeadlineAt);
    const refreshedValidation = await validateLoadedSessionForReuse(session, targetUrl);
    if (refreshedValidation === 'unauthenticated') {
      throw new SessionCaptureError(
        `Refreshed session was rejected by auth/isAuthenticated for ${session.userIdentifier}`,
        session.userIdentifier,
        { sessionPath: session.storageFile }
      );
    }
  }
  if (session.cookies.length) {
    await page.context().addCookies(session.cookies);
  }
  return session;
}

async function validateLoadedSessionForReuse(
  session: LoadedSession,
  targetUrl: string,
  validateSession: typeof validateStoredSession = validateStoredSession,
  env: NodeJS.ProcessEnv = process.env
) {
  const validation = await validateSession(session, targetUrl);
  if (validation !== 'unavailable') {
    return validation;
  }

  if (shouldRejectUnavailableSessionValidation(validation, env)) {
    throw new SessionCaptureError(
      `Unable to validate cached session for ${session.userIdentifier}; auth/isAuthenticated is unavailable`,
      session.userIdentifier,
      { sessionPath: session.storageFile, failureKind: AAT_AUTH_UNAVAILABLE_FAILURE }
    );
  }

  logger.warn('Unable to validate cached session state; reusing it without a refresh', {
    userIdentifier: session.userIdentifier,
    sessionPath: session.storageFile,
    operation: 'validate-session-reuse',
  });
  return validation;
}

export async function applySessionCookies(page: Page, userIdentifier: SessionIdentityInput): Promise<LoadedSession> {
  return applySessionCookiesForIdentity(page, userIdentifier);
}

async function applySessionCookiesFromPoolWith(
  page: Page,
  candidates: readonly SessionIdentityInput[],
  applyCandidate: (page: Page, identity: SessionIdentityInput) => Promise<LoadedSession>
): Promise<{ userIdentifier: string; session: LoadedSession }> {
  const expandedCandidates = candidates.flatMap((candidate) => resolveSessionCandidates(candidate));
  const selection = await withOrderedSessionFallback(expandedCandidates, (identity) => applyCandidate(page, identity));
  logger.info('Applied session from ordered identity pool', {
    userIdentifier: selection.selectedUserIdentifier,
    operation: 'apply-session-pool',
  });
  return { userIdentifier: selection.selectedUserIdentifier, session: selection.value };
}

export async function applySessionCookiesFromPool(
  page: Page,
  candidates: readonly SessionIdentityInput[]
): Promise<{ userIdentifier: string; session: LoadedSession }> {
  const captureDeadlineAt = Date.now() + SESSION_CAPTURE_POOL_BUDGET_MS;
  return applySessionCookiesFromPoolWith(page, candidates, (candidatePage, identity) =>
    applySessionCookiesForIdentity(candidatePage, identity, captureDeadlineAt)
  );
}

async function isIdamLoginPage(page: Page): Promise<boolean> {
  const currentUrl = page.url();
  if (currentUrl.includes('idam-web-public') || currentUrl.includes('/login')) {
    return true;
  }
  const idamPage = new IdamPage(page);
  const [usernameVisible, passwordVisible] = await Promise.all([
    idamPage.usernameInput.isVisible().catch(() => false),
    idamPage.passwordInput.isVisible().catch(() => false),
  ]);
  return usernameVisible && passwordVisible;
}

async function isServiceDownPage(page: Page): Promise<boolean> {
  return (
    page.url().includes('/service-down') ||
    (await page
      .locator('exui-service-down')
      .isVisible()
      .catch(() => false))
  );
}

function getAppShellMarkers(page: Page, preferredSelector?: string): Array<{ name: string; locator: Locator }> {
  return new SessionCapturePage(page).appShellMarkers(preferredSelector);
}

async function waitForAuthenticatedShell(
  page: Page,
  userIdentifier: string,
  preferredSelector: string | undefined,
  timeoutMs: number
): Promise<string> {
  const markers = getAppShellMarkers(page, preferredSelector);
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    if (await isIdamLoginPage(page)) {
      setSetupMarker(page, 'idam-login');
      throw new SessionCaptureError(`Login page detected while waiting for app shell for ${userIdentifier}`, userIdentifier, {
        currentUrl: sanitizedPageUrl(page),
        preferredSelector: preferredSelector ?? 'none',
      });
    }

    if (await isServiceDownPage(page)) {
      setSetupMarker(page, 'service-down');
      throw new SessionCaptureError(
        `Service down page detected while waiting for app shell for ${userIdentifier}`,
        userIdentifier,
        {
          currentUrl: sanitizedPageUrl(page),
          preferredSelector: preferredSelector ?? 'none',
          failureKind: SERVICE_DOWN_SESSION_CAPTURE_FAILURE,
        }
      );
    }

    for (const marker of markers) {
      const visible = await marker.locator.isVisible().catch(() => false);
      if (visible) {
        return marker.name;
      }
    }

    const remainingMs = deadline - Date.now();
    if (remainingMs <= 0) {
      break;
    }
    await page.waitForTimeout(Math.min(500, remainingMs));
  }

  setSetupMarker(page, 'shell-timeout');
  throw new Error(
    `App shell not detected within ${timeoutMs}ms (preferred=${preferredSelector ?? 'none'}, url=${sanitizedPageUrl(page)}, markers=${markers
      .map((marker) => marker.name)
      .join(',')})`
  );
}

function isExpectedUnauthenticatedShellProbeFailure(error: unknown): boolean {
  const message = toError(error).message;
  return (
    message.startsWith('Login page detected while waiting for app shell') || message.startsWith('App shell not detected within')
  );
}

async function probeAuthenticatedShell(
  page: Page,
  userIdentifier: string,
  preferredSelector: string | undefined,
  timeoutMs: number,
  waitForShell: typeof waitForAuthenticatedShell = waitForAuthenticatedShell
): Promise<string | null> {
  try {
    return await waitForShell(page, userIdentifier, preferredSelector, timeoutMs);
  } catch (error) {
    if (isExpectedUnauthenticatedShellProbeFailure(error)) {
      return null;
    }
    throw error;
  }
}

/**
 * Ensure the page is authenticated for the given user and on the target URL.
 * If the session is invalid, refresh the stored session and retry once.
 */
export async function ensureAuthenticatedPage(
  page: Page,
  userIdentifier: SessionIdentityInput,
  options: { targetUrl?: string; waitForSelector?: string | false; timeoutMs?: number } = {}
): Promise<LoadedSession> {
  const resolveLoadedIdentity = (loadedSession: LoadedSession) => {
    if (
      typeof userIdentifier !== 'string' &&
      (!loadedSession.userIdentifier || loadedSession.userIdentifier === userIdentifier.userIdentifier)
    ) {
      return resolveSessionIdentity(userIdentifier);
    }
    return resolveSessionIdentity(loadedSession.userIdentifier ?? userIdentifier);
  };
  const markSetup = (marker: string) => setSetupMarker(page, marker);
  markSetup('setup-start');
  const targetUrl = options.targetUrl ?? process.env.TEST_URL ?? config.urls.exuiDefaultUrl;
  const timeoutMs = options.timeoutMs ?? 60_000;
  let session = await ensureSessionCookies(userIdentifier);
  let identity = resolveLoadedIdentity(session);
  await validateLoadedSessionForReuse(session, targetUrl);
  if (session.cookies.length) {
    await page.context().addCookies(session.cookies);
    markSetup('cookies-ready');
  } else {
    markSetup('cookies-ready');
  }

  await gotoAppTarget(page, identity.userIdentifier, targetUrl);
  await acceptAccessCookiesIfPresent(page);
  markSetup('navigated-app');

  if (await isIdamLoginPage(page)) {
    markSetup('idam-login');
    logger.warn('Session appears invalid; refreshing', {
      userIdentifier: identity.userIdentifier,
      email: session.email,
      targetUrl: sanitizeUrl(targetUrl),
      operation: 'session-refresh',
    });
    await sessionCaptureWith([identity], {
      force: true,
      expectedStaleSession: session,
    });
    session = await ensureSessionCookiesForIdentity(identity);
    identity = resolveLoadedIdentity(session);
    markSetup('session-refresh');
    await page.context().clearCookies();
    if (session.cookies.length) {
      await page.context().addCookies(session.cookies);
    }
    await gotoAppTarget(page, identity.userIdentifier, targetUrl);
    await acceptAccessCookiesIfPresent(page);
    markSetup('navigated-app');

    if (await isIdamLoginPage(page)) {
      markSetup('idam-login');
      throw new SessionCaptureError(`Login failed for ${identity.userIdentifier}`, identity.userIdentifier, {
        email: session.email,
        targetUrl: sanitizeUrl(targetUrl),
      });
    }
  }

  const selectors = options.waitForSelector === false ? undefined : (options.waitForSelector ?? 'exui-header');
  if (selectors) {
    const waitForAppShell = async () => {
      markSetup('waiting-shell');
      await page.waitForLoadState('domcontentloaded');
      await acceptAccessCookiesIfPresent(page);
      const marker = await waitForAuthenticatedShell(page, identity.userIdentifier, selectors, timeoutMs);
      markSetup('shell-ready');
      logger.info('Authenticated app shell detected', {
        userIdentifier: identity.userIdentifier,
        marker,
        selector: selectors,
        timeoutMs,
        currentUrl: sanitizedPageUrl(page),
        operation: 'wait-for-shell',
      });
    };
    try {
      await waitForAppShell();
    } catch (error) {
      logger.warn('App shell not detected after navigation', {
        userIdentifier: identity.userIdentifier,
        selector: selectors,
        timeoutMs,
        error: sessionCaptureFailureEvidence(toError(error)),
        operation: 'wait-for-shell',
      });
      throw error;
    }
  } else {
    markSetup('setup-ready');
  }

  return session;
}

//Return true if sessionPath exists and its mtime is within maxAgeMs.
export function isSessionFresh(
  sessionPath: string,
  maxAgeMs = DEFAULT_SESSION_MAX_AGE_MS,
  deps: { fs?: typeof fs; now?: () => number; targetUrl?: string; idamUrl?: string } = {}
): boolean {
  return isStoredSessionFresh(sessionPath, maxAgeMs, deps);
}

function hasReusableSessionSupersedingFailure({
  fsApi,
  force,
  isFresh,
  maxAgeMs,
  sessionPath,
  targetUrl,
  idamUrl,
  recentFailure,
}: {
  fsApi: typeof fs;
  force: boolean;
  isFresh: typeof isSessionFresh;
  maxAgeMs: number;
  sessionPath: string;
  targetUrl: string;
  idamUrl?: string;
  recentFailure: SessionCaptureFailureRecord;
}): boolean {
  if (force || !isFresh(sessionPath, maxAgeMs, { targetUrl, idamUrl })) {
    return false;
  }

  const currentFingerprint = readStorageStateFingerprint(fsApi, sessionPath);
  return (
    Boolean(currentFingerprint) &&
    recentFailure.storageStateFingerprint !== undefined &&
    currentFingerprint !== recentFailure.storageStateFingerprint
  );
}

async function reuseAuthenticatedSessionBeyondRefreshAge({
  fsApi,
  identity,
  isFresh,
  sessionMaxAgeMs,
  sessionPath,
  targetUrl,
  idamUrl,
  validateSession,
}: {
  fsApi: typeof fs;
  identity: SessionIdentity;
  isFresh: typeof isSessionFresh;
  sessionMaxAgeMs: number;
  sessionPath: string;
  targetUrl: string;
  idamUrl?: string;
  validateSession: typeof validateStoredSession;
}): Promise<boolean> {
  if (
    isFresh(sessionPath, sessionMaxAgeMs, { targetUrl, idamUrl }) ||
    !isFresh(sessionPath, Number.MAX_SAFE_INTEGER, { targetUrl, idamUrl })
  ) {
    return false;
  }

  let session: LoadedSession;
  try {
    session = loadSessionCookies(identity);
  } catch {
    return false;
  }

  if ((await validateSession(session, targetUrl)) !== 'authenticated') {
    return false;
  }

  if (readStorageStateFingerprint(fsApi, sessionPath) !== session.storageStateFingerprint) {
    return false;
  }

  try {
    fsApi.utimesSync(sessionPath, new Date(), new Date());
  } catch (error) {
    logger.warn('Authenticated stale session could not be refreshed locally', {
      userIdentifier: identity.userIdentifier,
      sessionPath,
      error: (error as Error).message,
      operation: 'session-reuse',
    });
  }

  logger.info('Reused server-validated session beyond local refresh age', {
    userIdentifier: identity.userIdentifier,
    sessionPath,
    operation: 'session-reuse',
  });
  return true;
}

async function executeLoginAttempt(
  page: Page,
  idamPage: IdamPage,
  userIdentifier: string,
  email: string,
  password: string,
  loginTarget: string,
  attemptIndex: number
): Promise<void> {
  await gotoLoginTarget(page, userIdentifier, loginTarget);
  await acceptAccessCookiesIfPresent(page);
  const shellMarker = await probeAuthenticatedShell(page, userIdentifier, undefined, 5_000);
  if (shellMarker) {
    logger.info('Authenticated shell detected without IDAM form login', {
      userIdentifier,
      email,
      loginTarget: sanitizeUrl(loginTarget),
      marker: shellMarker,
      attempt: attemptIndex,
      operation: 'session-capture',
    });
    return;
  }

  const usernameCandidates = getIdamUsernameCandidates(page, idamPage);
  const loginSurface = await Promise.race([
    waitForFirstVisibleLocator(page, usernameCandidates, IDAM_LOGIN_SURFACE_TIMEOUT_MS).then((locator) =>
      locator ? 'login' : null
    ),
    ignoreRejectedSurfaceDetector(
      new SessionCapturePage(page).waitForAppSurface(IDAM_LOGIN_SURFACE_TIMEOUT_MS).then(() => 'app')
    ),
  ]).catch(() => null);

  if (loginSurface === 'app') return;

  if (loginSurface !== 'login') {
    if (await isServiceDownPage(page)) {
      throw new SessionCaptureError(`Service down page detected while opening IDAM login for ${userIdentifier}`, userIdentifier, {
        currentUrl: sanitizedPageUrl(page),
        failureKind: SERVICE_DOWN_SESSION_CAPTURE_FAILURE,
      });
    }

    throw unavailableIdamLoginSurfaceError(page, userIdentifier);
  }

  const usernameInput = (await waitForFirstVisibleLocator(page, usernameCandidates, 1_000)) ?? idamPage.usernameInput.first();
  await completeIdamCredentialFlow(page, idamPage, usernameInput, email, password);
  await confirmAuthenticatedLogin(page, userIdentifier, email, loginTarget, attemptIndex);
}

// A successful navigation which renders neither IDAM nor XUI is an unavailable
// login surface. Retrying with a fresh browser context is safe because no
// credentials have been submitted yet.
function unavailableIdamLoginSurfaceError(page: Page, userIdentifier: string): SessionCaptureError {
  return new SessionCaptureError(
    `IDAM login surface did not render within ${IDAM_LOGIN_SURFACE_TIMEOUT_MS}ms for ${userIdentifier}`,
    userIdentifier,
    {
      currentUrl: sanitizedPageUrl(page),
      failureKind: SERVICE_DOWN_SESSION_CAPTURE_FAILURE,
    }
  );
}

async function clickOrSubmitActiveField(page: Page, submitButton: Locator, activeField: Locator): Promise<void> {
  if (await submitButton.isVisible().catch(() => false)) {
    await submitButton.click();
  } else {
    await activeField.press('Enter');
  }
}

async function completeIdamCredentialFlow(
  page: Page,
  idamPage: IdamPage,
  usernameInput: Locator,
  email: string,
  password: string
): Promise<void> {
  await usernameInput.fill(email);
  let passwordInput = await waitForFirstVisibleLocator(page, getIdamPasswordCandidates(page, idamPage), 1_000);
  let submitButton =
    (await waitForFirstVisibleLocator(page, getIdamSubmitCandidates(page, idamPage), 1_000)) ?? idamPage.submitBtn.first();

  if (!passwordInput) {
    await clickOrSubmitActiveField(page, submitButton, usernameInput);
    passwordInput =
      (await waitForFirstVisibleLocator(page, getIdamPasswordCandidates(page, idamPage), IDAM_LOGIN_SURFACE_TIMEOUT_MS)) ??
      idamPage.passwordInput.first();
    submitButton =
      (await waitForFirstVisibleLocator(page, getIdamSubmitCandidates(page, idamPage), 1_000)) ?? idamPage.submitBtn.first();
  }

  await passwordInput.fill(password); // NOSONAR
  await clickOrSubmitActiveField(page, submitButton, passwordInput);
}

async function confirmAuthenticatedLogin(
  page: Page,
  userIdentifier: string,
  email: string,
  loginTarget: string,
  attemptIndex: number,
  deps: {
    acceptCookies?: typeof acceptAccessCookiesIfPresent;
    waitForShell?: typeof waitForAuthenticatedShell;
    waitForAuthCookies?: typeof waitForRequiredAuthCookies;
    info?: typeof logger.info;
  } = {}
): Promise<void> {
  const acceptCookies = deps.acceptCookies ?? acceptAccessCookiesIfPresent;
  const waitForShell = deps.waitForShell ?? waitForAuthenticatedShell;
  const waitForAuthCookies = deps.waitForAuthCookies ?? waitForRequiredAuthCookies;
  const info = deps.info ?? ((message: string, meta: Record<string, unknown>) => logger.info(message, meta));

  await acceptCookies(page);
  const [postLoginShell, hasAuthCookies] = await Promise.all([
    probeAuthenticatedShell(page, userIdentifier, undefined, POST_LOGIN_AUTH_TIMEOUT_MS, waitForShell),
    waitForAuthCookies(page, POST_LOGIN_AUTH_TIMEOUT_MS),
  ]);
  if (!postLoginShell && !hasAuthCookies) {
    const idamErrorText = await getIdamLoginErrorText(page);
    const idamMessage = idamErrorText ? ` IDAM page message: ${idamErrorText}` : '';
    throw new Error(
      `IDAM login did not establish authenticated session for ${userIdentifier} (url=${sanitizedPageUrl(page)}).${idamMessage}`
    );
  }
  info('IDAM login successful', {
    userIdentifier,
    email,
    loginTarget: sanitizeUrl(loginTarget),
    attempt: attemptIndex,
    marker: postLoginShell ?? 'auth-cookies',
    operation: 'session-capture',
  });
}

async function loginAndPersistSession({
  chromiumLauncher,
  idamFactory,
  env,
  activeConfig,
  email,
  password,
  sessionPath,
  persist,
  assertLockOwned,
  userIdentifier,
  maxAttempts = SESSION_CAPTURE_LOGIN_ATTEMPTS,
  executeLoginAttemptFn = executeLoginAttempt,
  waitForRetry = waitForTransientRetry,
}: {
  chromiumLauncher: typeof chromium;
  idamFactory: (page: Page) => IdamPage;
  env: NodeJS.ProcessEnv;
  activeConfig: typeof config;
  email: string;
  password: string;
  sessionPath: string;
  persist: typeof persistSession;
  assertLockOwned?: () => void;
  userIdentifier: string;
  maxAttempts?: number;
  executeLoginAttemptFn?: typeof executeLoginAttempt;
  waitForRetry?: () => Promise<void>;
}) {
  const targetUrl = env.TEST_URL || activeConfig.urls.exuiDefaultUrl;
  logger.info('Logging in to EXUI', {
    userIdentifier,
    email,
    targetUrl: sanitizeUrl(targetUrl),
    operation: 'session-capture',
  });
  const browser = await withOperationTimeout(
    () => chromiumLauncher.launch({ timeout: SESSION_CAPTURE_BROWSER_LAUNCH_BUDGET_MS }),
    SESSION_CAPTURE_BROWSER_LAUNCH_BUDGET_MS,
    `Browser launch timed out after ${SESSION_CAPTURE_BROWSER_LAUNCH_BUDGET_MS}ms`
  );
  let browserClosePromise: Promise<void> | undefined;
  const closeBrowser = () => {
    browserClosePromise ??= withOperationTimeout(
      () => browser.close(),
      SESSION_CAPTURE_BROWSER_CLOSE_BUDGET_MS,
      `Browser close timed out after ${SESSION_CAPTURE_BROWSER_CLOSE_BUDGET_MS}ms`
    );
    return browserClosePromise;
  };
  let captureError: unknown;
  let sessionPersisted = false;
  try {
    for (let captureAttempt = 1; captureAttempt <= maxAttempts; captureAttempt += 1) {
      const abortController = new AbortController();
      let context: BrowserContext | undefined;
      let contextClosePromise: Promise<void> | undefined;
      let retryPending = false;
      let retryCleanupError: SessionCaptureError | undefined;
      const closeContext = () => {
        if (!context) {
          return Promise.resolve();
        }
        contextClosePromise ??= withOperationTimeout(
          () => context!.close(),
          SESSION_CAPTURE_CONTEXT_CLOSE_BUDGET_MS,
          `Browser context close timed out after ${SESSION_CAPTURE_CONTEXT_CLOSE_BUDGET_MS}ms`
        );
        return contextClosePromise;
      };
      const cancelAttempt = async () => {
        abortController.abort();
        await closeContext();
      };
      try {
        const cookies = await withOperationTimeout(
          async () => {
            context = await withOperationTimeout(
              () => browser.newContext(),
              SESSION_CAPTURE_CONTEXT_CREATE_BUDGET_MS,
              `Browser context creation timed out after ${SESSION_CAPTURE_CONTEXT_CREATE_BUDGET_MS}ms`,
              closeBrowser
            );
            abortController.signal.throwIfAborted();
            const page = await context.newPage();
            const idamPage = idamFactory(page);
            await executeLoginAttemptFn(page, idamPage, userIdentifier, email, password, targetUrl, captureAttempt);
            return requirePersistableSessionCookies(context, userIdentifier, currentPageUrl(page), activeConfig.urls.idamWebUrl);
          },
          SESSION_CAPTURE_TARGET_BUDGET_MS,
          `Session capture attempt timed out after ${SESSION_CAPTURE_TARGET_BUDGET_MS}ms`,
          cancelAttempt
        );
        try {
          await withOperationTimeout(
            () =>
              persist(sessionPath, cookies, context!, userIdentifier, {
                signal: abortController.signal,
                assertLockOwned,
              }),
            SESSION_CAPTURE_PERSIST_BUDGET_MS,
            `Session persistence timed out after ${SESSION_CAPTURE_PERSIST_BUDGET_MS}ms`,
            cancelAttempt
          );
          sessionPersisted = true;
        } catch (error) {
          if (isSessionLockCompromisedError(error as Error)) {
            throw error;
          }
          const evidence = sessionCaptureFailureEvidence(error as Error);
          const persistenceError = new Error(`Session persistence failed for ${userIdentifier}: ${evidence}`);
          persistenceError.name = 'SessionPersistenceError';
          throw persistenceError;
        }
        break;
      } catch (error) {
        const loginError = error as Error;
        if (isSessionLockCompromisedError(loginError)) {
          throw loginError;
        }
        const shouldRetry = captureAttempt < maxAttempts && isTransientSessionCaptureError(loginError);
        if (!shouldRetry) {
          const evidence = sessionCaptureFailureEvidence(loginError);
          const sanitizedCause = new Error(evidence);
          sanitizedCause.name = loginError.name;
          logger.error('Login failed', {
            userIdentifier,
            targetUrl: sanitizeUrl(targetUrl),
            captureAttempt,
            error: evidence,
            operation: 'session-capture',
          });
          const failureKind =
            (loginError as { context?: { failureKind?: string } }).context?.failureKind ??
            (isUnexplainedIdamLoginRejection(loginError) ? UNEXPLAINED_IDAM_LOGIN_FAILURE : undefined);
          throw new SessionCaptureError(
            `Login failed for ${userIdentifier} at ${sanitizeUrl(targetUrl)} after ${captureAttempt} of ${maxAttempts} capture attempts: ${evidence}`,
            userIdentifier,
            { targetUrl: sanitizeUrl(targetUrl), appTargetUrl: sanitizeUrl(targetUrl), captureAttempt, evidence, failureKind },
            sanitizedCause
          );
        }
        logger.warn('Transient session capture failure; retrying once with a fresh browser context', {
          userIdentifier,
          targetUrl: sanitizeUrl(targetUrl),
          captureAttempt,
          error: sessionCaptureFailureEvidence(loginError),
          operation: 'session-capture',
        });
        retryPending = true;
      } finally {
        try {
          await closeContext();
        } catch (closeError) {
          const evidence = sessionCaptureFailureEvidence(closeError as Error);
          logger.warn('Failed to close browser context after session capture attempt', {
            userIdentifier,
            captureAttempt,
            error: evidence,
            operation: 'session-capture',
          });
          if (retryPending) {
            const sanitizedCause = new Error(evidence);
            sanitizedCause.name = 'SessionCancellationError';
            retryCleanupError = new SessionCaptureError(
              `Login failed for ${userIdentifier} at ${sanitizeUrl(targetUrl)} after ${captureAttempt} of ${maxAttempts} capture attempts: browser context cleanup failed before retry: ${evidence}`,
              userIdentifier,
              {
                targetUrl: sanitizeUrl(targetUrl),
                appTargetUrl: sanitizeUrl(targetUrl),
                captureAttempt,
                evidence,
              },
              sanitizedCause
            );
          }
        }
      }
      if (retryCleanupError) {
        throw retryCleanupError;
      }
      if (retryPending) {
        await waitForRetry();
      }
    }
  } catch (error) {
    captureError = error;
  }

  try {
    await closeBrowser();
  } catch (closeError) {
    const evidence = sessionCaptureFailureEvidence(toError(closeError));
    const sanitizedCause = new Error(evidence);
    sanitizedCause.name = 'SessionCancellationError';
    const browserCloseError = new SessionCaptureError(
      `Session capture cleanup failed for ${userIdentifier} at ${sanitizeUrl(targetUrl)}: ${evidence}`,
      userIdentifier,
      { targetUrl: sanitizeUrl(targetUrl), appTargetUrl: sanitizeUrl(targetUrl), evidence },
      sanitizedCause
    );
    logger.warn('Failed to close browser after session capture', {
      userIdentifier,
      targetUrl: sanitizeUrl(targetUrl),
      error: evidence,
      operation: 'session-capture',
    });
    if (captureError instanceof Error) {
      (captureError as ErrorWithBrowserCloseError).browserCloseError = browserCloseError;
    } else if (!sessionPersisted && captureError === undefined) {
      captureError = browserCloseError;
    }
  }

  if (captureError !== undefined) {
    throw captureError;
  }
}

async function requirePersistableSessionCookies(
  context: Pick<BrowserContext, 'cookies'>,
  userIdentifier: string,
  currentUrl: string,
  idamUrl?: string
): Promise<Cookie[]> {
  const cookies = await context.cookies();
  if (!hasReusableAuthCookies(cookies, currentUrl, idamUrl)) {
    throw new Error(`Cannot persist unauthenticated session for ${userIdentifier} (url=${sanitizeUrl(currentUrl)}).`);
  }
  return cookies;
}

export async function sessionCapture(identifiers: SessionIdentityInput[], options: { force?: boolean } = {}) {
  return sessionCaptureWith(identifiers, {
    force: options.force,
  });
}

export async function refreshRejectedSession(
  identifier: SessionIdentityInput,
  rejectedSession: Pick<LoadedSession, 'storageFile' | 'storageStateFingerprint'>
): Promise<void> {
  await sessionCaptureWith([identifier], {
    force: true,
    expectedStaleSession: rejectedSession,
  });
}

async function sessionCaptureWith(identifiers: SessionIdentityInput[], deps: SessionCaptureDeps = {}) {
  const userUtils = deps.userUtils ?? new UserUtils();
  const resolveIdentity = deps.resolveSessionIdentity ?? resolveSessionIdentity;
  const fsApi = deps.fs ?? fs;
  const env = deps.env ?? process.env;
  const activeConfig = deps.config ?? config;
  const isFresh = deps.isSessionFresh ?? isSessionFresh;
  const persist = deps.persistSession ?? persistSession;
  const loginAndPersist = deps.loginAndPersistSession ?? loginAndPersistSession;
  const chromiumLauncher = deps.chromiumLauncher ?? chromium;
  const idamFactory = deps.idamPageFactory ?? ((page) => new IdamPage(page));
  const lockfileApi = deps.lockfile ?? lockfile;
  const force = deps.force ?? false;
  const expectedStaleSession = deps.expectedStaleSession;
  const now = deps.now ?? Date.now;
  const targetUrl = env.TEST_URL || activeConfig.urls.exuiDefaultUrl;
  const sessionMaxAgeMs = resolveSessionMaxAgeMs(env);
  const validateSession = deps.validateStoredSession ?? validateStoredSession;
  const bootstrapSession =
    deps.bootstrapApiSession ??
    (deps.loginAndPersistSession
      ? async () => ({
          status: 'unavailable' as const,
          stage: 'configuration' as const,
          reason: 'API bootstrap was not supplied with the injected browser-login test double',
        })
      : bootstrapApiSession);

  const sessionsDir = path.join(process.cwd(), '.sessions');
  ensureDirectory(fsApi, sessionsDir);

  for (const id of identifiers) {
    const identity = resolveIdentity(id, { userUtils });
    const sessionStorageKey = resolveSessionStorageKey(identity);
    const sessionPath = path.join(sessionsDir, `${sessionStorageKey}.storage.json`);
    const lockFilePath = path.join(sessionsDir, `${sessionStorageKey}.lock`);
    const failurePath = path.join(sessionsDir, `${sessionStorageKey}.capture-failed.json`);

    ensureDirectory(fsApi, sessionsDir);
    ensureLockFile(fsApi, lockFilePath);

    if (
      !force &&
      (await reuseAuthenticatedSessionBeyondRefreshAge({
        fsApi,
        identity,
        isFresh,
        sessionMaxAgeMs,
        sessionPath,
        targetUrl,
        idamUrl: activeConfig.urls.idamWebUrl,
        validateSession,
      }))
    ) {
      clearSessionCaptureFailure(fsApi, failurePath);
      continue;
    }

    // Acquire filesystem lock (blocks across all workers)
    let release: SessionLockRelease | null = null;
    let captureError: unknown;
    try {
      await (async () => {
        let requiresLockedFailureClear = false;
        let recoveryAttempted = false;
        const recentFailure = recentSessionCaptureFailure(fsApi, failurePath, resolveSessionCaptureFailureTtlMs(env));
        if (recentFailure) {
          requiresLockedFailureClear = hasReusableSessionSupersedingFailure({
            fsApi,
            force,
            isFresh,
            maxAgeMs: sessionMaxAgeMs,
            sessionPath,
            targetUrl,
            idamUrl: activeConfig.urls.idamWebUrl,
            recentFailure,
          });
          if (!requiresLockedFailureClear && (!recentFailure.retryable || recentFailure.recoveryAttempted)) {
            throw new SessionCaptureError(
              `Recent session capture failed for ${identity.userIdentifier}; refusing repeated login attempt for now: ${recentFailure.message}`,
              identity.userIdentifier,
              { sessionPath, failureKind: recentFailure.failureKind }
            );
          }
        }

        logger.info('Attempting to acquire lock for user', {
          userIdentifier: identity.userIdentifier,
          lockFilePath,
          operation: 'session-capture',
        });

        const lockStartedAt = now();
        const remainingCaptureBudgetMsBeforeLock =
          deps.captureDeadlineAt === undefined ? undefined : Math.max(0, deps.captureDeadlineAt - lockStartedAt);
        const maxLockWaitMs =
          remainingCaptureBudgetMsBeforeLock === undefined
            ? deps.lockWaitMs
            : Math.min(deps.lockWaitMs ?? SESSION_CAPTURE_LOCK_WAIT_MS, remainingCaptureBudgetMsBeforeLock);
        release = await acquireSessionLock({
          lockfileApi,
          lockFilePath,
          userIdentifier: identity.userIdentifier,
          isSessionReusable: () => isFresh(sessionPath, sessionMaxAgeMs, { targetUrl, idamUrl: activeConfig.urls.idamWebUrl }),
          force: force || requiresLockedFailureClear,
          maxWaitMs: maxLockWaitMs,
          staleMs: SESSION_CAPTURE_LOCK_STALE_MS,
          updateMs: SESSION_CAPTURE_LOCK_UPDATE_MS,
          staleRecoveryMs: SESSION_CAPTURE_STALE_LOCK_RECOVERY_MS,
          fsApi,
          recoverStaleLock: shouldRecoverStaleSessionLocks(env),
        });
        const lockWaitMs = Math.max(0, now() - lockStartedAt);

        if (!release) {
          logger.info('Skipping session capture because another worker refreshed the session', {
            userIdentifier: identity.userIdentifier,
            email: identity.email,
            sessionPath,
            operation: 'session-capture',
          });
          return;
        }

        logger.info('Lock acquired', {
          userIdentifier: identity.userIdentifier,
          operation: 'session-capture',
        });

        const lockedRecentFailure = recentSessionCaptureFailure(fsApi, failurePath, resolveSessionCaptureFailureTtlMs(env));
        if (lockedRecentFailure) {
          if (
            hasReusableSessionSupersedingFailure({
              fsApi,
              force,
              isFresh,
              maxAgeMs: sessionMaxAgeMs,
              sessionPath,
              targetUrl,
              idamUrl: activeConfig.urls.idamWebUrl,
              recentFailure: lockedRecentFailure,
            })
          ) {
            logger.warn('Clearing session capture failure marker because a reusable session is already present', {
              userIdentifier: identity.userIdentifier,
              sessionPath,
              failurePath,
              waitContext: 'after-lock',
              operation: 'session-capture',
            });
            release.assertOwned();
            clearSessionCaptureFailure(fsApi, failurePath);
            return;
          }
          if (!lockedRecentFailure.retryable || lockedRecentFailure.recoveryAttempted) {
            throw new SessionCaptureError(
              `Recent session capture failed for ${identity.userIdentifier}; refusing repeated login attempt for now: ${lockedRecentFailure.message}`,
              identity.userIdentifier,
              { sessionPath, failureKind: lockedRecentFailure.failureKind }
            );
          }

          logger.info('Clearing transient session capture failure marker before bounded retry', {
            userIdentifier: identity.userIdentifier,
            failurePath,
            operation: 'session-capture',
          });
          release.assertOwned();
          clearSessionCaptureFailure(fsApi, failurePath);
          recoveryAttempted = true;
        }

        if (expectedStaleSession) {
          if (path.resolve(expectedStaleSession.storageFile) !== path.resolve(sessionPath)) {
            throw new SessionCaptureError(
              `Rejected session path does not match resolved identity for ${identity.userIdentifier}`,
              identity.userIdentifier,
              { sessionPath }
            );
          }

          if (!expectedStaleSession.storageStateFingerprint) {
            throw new SessionCaptureError(
              `Rejected session fingerprint is unavailable for ${identity.userIdentifier}`,
              identity.userIdentifier,
              { sessionPath }
            );
          }

          const currentFingerprint = readStorageStateFingerprint(fsApi, sessionPath);
          if (currentFingerprint && currentFingerprint !== expectedStaleSession.storageStateFingerprint) {
            logger.info('Reusing session refreshed by another worker after server-side rejection', {
              userIdentifier: identity.userIdentifier,
              email: identity.email,
              sessionPath,
              operation: 'session-refresh',
            });
            return;
          }

          if (currentFingerprint === expectedStaleSession.storageStateFingerprint) {
            release.assertOwned();
            fsApi.unlinkSync(sessionPath);
            logger.info('Deleted server-rejected session under identity lock', {
              userIdentifier: identity.userIdentifier,
              sessionPath,
              operation: 'session-refresh',
            });
          }
        }

        // Recheck freshness after acquiring lock (another worker may have logged in)
        if (!force && isFresh(sessionPath, sessionMaxAgeMs, { targetUrl, idamUrl: activeConfig.urls.idamWebUrl })) {
          logger.info('Session became fresh while waiting for lock', {
            userIdentifier: identity.userIdentifier,
            email: identity.email,
            sessionPath,
            operation: 'session-capture',
          });
          return;
        }

        const apiBootstrap = await bootstrapSession({
          env,
          targetUrl,
          userIdentifier: identity.userIdentifier,
          username: identity.email,
          password: identity.password,
          captureDeadlineAt: deps.captureDeadlineAt,
        });

        if (
          apiBootstrap.status === 'authenticated' &&
          hasReusableAuthCookies(apiBootstrap.storageState.cookies as Cookie[], targetUrl, activeConfig.urls.idamWebUrl)
        ) {
          release.assertOwned();
          persistApiSessionState(sessionPath, apiBootstrap.storageState, identity.userIdentifier, fsApi, release.assertOwned);
          clearSessionCaptureFailure(fsApi, failurePath);
          return;
        }

        logger.warn('API session bootstrap unavailable; using browser login fallback', {
          userIdentifier: identity.userIdentifier,
          stage: apiBootstrap.status === 'unavailable' ? apiBootstrap.stage : 'session-cookies',
          reason:
            apiBootstrap.status === 'unavailable'
              ? apiBootstrap.reason
              : 'API storage state did not contain reusable cookies for the configured hosts',
          operation: 'session-capture',
        });

        const remainingCaptureBudgetMs = deps.captureDeadlineAt === undefined ? undefined : deps.captureDeadlineAt - now();
        const maxAttempts = resolveCaptureAttemptLimit(remainingCaptureBudgetMs);
        if (maxAttempts === 0 || (remainingCaptureBudgetMs === undefined && lockWaitMs > SESSION_CAPTURE_LOCK_START_BUDGET_MS)) {
          throw new SessionCaptureError(
            `Browser session fallback cannot start for ${identity.userIdentifier}; refusing to start a capture that cannot complete within the integration test budget after API bootstrap failed`,
            identity.userIdentifier,
            {
              sessionPath,
              lockWaitMs,
              remainingCaptureBudgetMs,
              apiBootstrapStage: apiBootstrap.status === 'unavailable' ? apiBootstrap.stage : 'session-cookies',
            }
          );
        }

        await loginAndPersist({
          chromiumLauncher,
          idamFactory,
          env,
          activeConfig,
          email: identity.email,
          password: identity.password,
          sessionPath,
          persist,
          assertLockOwned: release.assertOwned,
          userIdentifier: identity.userIdentifier,
          maxAttempts,
        })
          .then(() => {
            release!.assertOwned();
            clearSessionCaptureFailure(fsApi, failurePath);
          })
          .catch((error: Error) => {
            release!.assertOwned();
            const reusableSessionWasPersisted = isFresh(sessionPath, sessionMaxAgeMs, {
              targetUrl,
              idamUrl: activeConfig.urls.idamWebUrl,
            });
            if (!isSessionLockCompromisedError(error) && !reusableSessionWasPersisted) {
              writeSessionCaptureFailure({
                fsApi,
                failurePath,
                sessionPath,
                error,
                recoveryAttempted,
                readStorageStateFingerprint,
              });
            }
            throw error;
          });
      })();
    } catch (error) {
      captureError = error;
    }

    if (release) {
      try {
        await release();
        logger.info('Lock released', {
          userIdentifier: identity.userIdentifier,
          operation: 'session-capture',
        });
      } catch (e) {
        const releaseError = toSessionLockReleaseError(identity.userIdentifier, e);
        logger.warn('Failed to release lock', {
          userIdentifier: identity.userIdentifier,
          lockFilePath,
          error: releaseError.message,
          operation: 'session-capture',
        });
        if (captureError instanceof Error) {
          (captureError as ErrorWithSessionLockReleaseError).sessionLockReleaseError = releaseError;
        } else if (captureError === undefined) {
          captureError = releaseError;
        }
      }
    }

    if (captureError !== undefined) {
      throw captureError;
    }
  }
}

export const __test__ = {
  sessionCaptureLockWaitMs: SESSION_CAPTURE_LOCK_WAIT_MS,
  sessionCaptureLockHeadroomMs: SESSION_CAPTURE_LOCK_HEADROOM_MS,
  sessionCaptureLockStartBudgetMs: SESSION_CAPTURE_LOCK_START_BUDGET_MS,
  sessionCapturePoolBudgetMs: SESSION_CAPTURE_POOL_BUDGET_MS,
  sessionCaptureMaxStaggerMs: SESSION_CAPTURE_MAX_STAGGER_MS,
  sessionCaptureLockStaleMs: SESSION_CAPTURE_LOCK_STALE_MS,
  sessionCaptureStaleLockRecoveryMs: SESSION_CAPTURE_STALE_LOCK_RECOVERY_MS,
  sessionCaptureLockUpdateMs: SESSION_CAPTURE_LOCK_UPDATE_MS,
  sessionCaptureOwnerBudgetMs: SESSION_CAPTURE_OWNER_BUDGET_MS,
  sessionCaptureSingleAttemptBudgetMs: SESSION_CAPTURE_SINGLE_ATTEMPT_BUDGET_MS,
  sessionCaptureBrowserLaunchBudgetMs: SESSION_CAPTURE_BROWSER_LAUNCH_BUDGET_MS,
  sessionCaptureTargetBudgetMs: SESSION_CAPTURE_TARGET_BUDGET_MS,
  sessionCapturePersistBudgetMs: SESSION_CAPTURE_PERSIST_BUDGET_MS,
  sessionCaptureContextCloseBudgetMs: SESSION_CAPTURE_CONTEXT_CLOSE_BUDGET_MS,
  sessionCaptureBrowserCloseBudgetMs: SESSION_CAPTURE_BROWSER_CLOSE_BUDGET_MS,
  sessionCaptureRetryBackoffMaxMs: SESSION_CAPTURE_RETRY_BACKOFF_MAX_MS,
  withOperationTimeout,
  applySessionCookiesFromPoolWith,
  resolveSessionCandidates,
  ensureSessionWith,
  resolveSessionIdentityForLoad,
  resolveSessionSelectionPath,
  persistSessionSelection,
  resolveSessionMaxAgeMs,
  resolveSessionCaptureStaggerMs,
  resolveSessionCaptureDelayMs,
  storageStateFingerprint,
  readStorageStateFingerprint,
  hasReusableAuthCookies,
  isTransientNavigationFailure,
  gotoAppTarget,
  gotoLoginTarget,
  resolveTargetHost,
  acquireSessionLock,
  sessionCaptureWith,
  resolveCaptureAttemptLimit,
  persistSession,
  confirmAuthenticatedLogin,
  completeIdamCredentialFlow,
  ensureAuthenticatedPage,
  validateLoadedSessionForReuse,
  loginAndPersistSession,
  executeLoginAttempt,
  unavailableIdamLoginSurfaceError,
  requirePersistableSessionCookies,
  waitForAuthenticatedShell,
  probeAuthenticatedShell,
};
