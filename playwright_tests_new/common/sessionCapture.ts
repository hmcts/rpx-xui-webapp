import { chromium, type BrowserContext, type Locator, type Page } from '@playwright/test';
import { createHash } from 'node:crypto';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as lockfile from 'proper-lockfile';
import { CookieUtils } from '../E2E/utils/cookie.utils.js';
import { UserUtils } from '../E2E/utils/user.utils.js';
import { IdamPage, createLogger } from '@hmcts/playwright-common';
import { Cookie } from 'playwright-core';
import config from '../E2E/utils/config.utils.js';
import { SessionCapturePage } from '../E2E/page-objects/pages/exui/sessionCapture.po.js';
import { StorageStateCorruptedError, SessionCaptureError } from '../api/utils/errors';
import { type SessionIdentityInput, resolveSessionIdentity, resolveSessionStorageKey } from './sessionIdentity.js';
import { sanitizeUrl } from './failureClassification.js';
import {
  SESSION_CAPTURE_LOGIN_ATTEMPTS,
  UNEXPLAINED_IDAM_LOGIN_FAILURE,
  isTransientSessionCaptureError,
  isUnexplainedIdamLoginRejection,
} from './sessionCaptureRetry.js';
import { withOrderedSessionFallback } from './orderedSessionFallback.js';
import { STAFF_ADMIN_USER, resolveStaffAdminSessionCandidates } from './staffAdminUserPool.js';

const logger = createLogger({ serviceName: 'session-capture', format: 'pretty' });

const CHROME_ERROR_URL_PREFIX = 'chrome-error://chromewebdata/';
const DEFAULT_SESSION_MAX_AGE_MS = 3_600_000;
const DEFAULT_SESSION_CAPTURE_FAILURE_TTL_MS = 120_000;
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
const SESSION_CAPTURE_OWNER_BUDGET_MS =
  SESSION_CAPTURE_BROWSER_LAUNCH_BUDGET_MS +
  SESSION_CAPTURE_LOGIN_ATTEMPTS * (SESSION_CAPTURE_TARGET_BUDGET_MS + SESSION_CAPTURE_CONTEXT_CLOSE_BUDGET_MS) +
  SESSION_CAPTURE_PERSIST_BUDGET_MS +
  SESSION_CAPTURE_RETRY_BACKOFF_MAX_MS +
  SESSION_CAPTURE_BROWSER_CLOSE_BUDGET_MS;
const SESSION_CAPTURE_LOCK_HEADROOM_MS = 15_000;
const SESSION_CAPTURE_LOCK_WAIT_MS = SESSION_CAPTURE_OWNER_BUDGET_MS + SESSION_CAPTURE_LOCK_HEADROOM_MS;
const SESSION_CAPTURE_LOCK_START_BUDGET_MS = SESSION_CAPTURE_LOCK_HEADROOM_MS;
// Automatic takeover inside a test run can let a suspended owner resume and overwrite
// a replacement session. CI workspaces are isolated, so fail closed on orphaned locks.
const SESSION_CAPTURE_LOCK_STALE_MS = 24 * 60 * 60_000;

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

function getIdamUsernameCandidates(page: Page, idamPage: IdamPage): Locator[] {
  return new SessionCapturePage(page).idamUsernameCandidates(idamPage);
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

type SessionCaptureFailureRecord = {
  message: string;
  failureKind?: string;
};

function recentSessionCaptureFailure(
  fsApi: typeof fs,
  failurePath: string,
  ttlMs: number,
  now: number = Date.now()
): SessionCaptureFailureRecord | null {
  if (ttlMs === 0 || !fsApi.existsSync(failurePath)) {
    return null;
  }

  try {
    const parsed = JSON.parse(fsApi.readFileSync(failurePath, 'utf8')) as {
      timestamp?: number;
      message?: string;
      failureKind?: string;
    };
    if (!parsed.timestamp || now - parsed.timestamp > ttlMs) {
      return null;
    }
    return {
      message: parsed.message?.trim() || 'previous session capture failed',
      failureKind: parsed.failureKind,
    };
  } catch {
    return null;
  }
}

function writeSessionCaptureFailure(fsApi: typeof fs, failurePath: string, error: Error): void {
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
      })
    );
  } catch {
    // Best-effort only: the original login failure is the actionable error.
  }
}

function clearSessionCaptureFailure(fsApi: typeof fs, failurePath: string): void {
  try {
    if (fsApi.existsSync(failurePath)) {
      fsApi.rmSync(failurePath, { force: true });
    }
  } catch {
    // Best-effort only.
  }
}

function currentPageUrl(page: Page): string {
  try {
    return typeof page.url === 'function' ? page.url() : 'unknown';
  } catch {
    return 'unknown';
  }
}

function normalizeCookieDomain(domain: string | undefined): string | null {
  const value = domain?.trim().replace(/^\./, '');
  return value ? value.toLowerCase() : null;
}

function resolveTargetHost(targetUrl: string | undefined): string | null {
  if (!targetUrl?.trim()) {
    return null;
  }

  try {
    return new URL(targetUrl).hostname.toLowerCase();
  } catch {
    return null;
  }
}

function isCookieCompatibleWithHost(cookie: Cookie, targetHost: string): boolean {
  const cookieDomain = normalizeCookieDomain(cookie.domain);
  if (!cookieDomain) {
    return false;
  }

  return targetHost === cookieDomain || targetHost.endsWith(`.${cookieDomain}`) || cookieDomain.endsWith(`.${targetHost}`);
}

function hasTargetCompatibleAuthCookies(cookies: Cookie[], targetUrl: string | undefined): boolean {
  const targetHost = resolveTargetHost(targetUrl);
  if (!targetHost) {
    return true;
  }

  const authCookies = cookies.filter((cookie) => cookie.name === 'Idam.Session' || cookie.name === '__auth__');
  if (authCookies.length === 0) {
    return false;
  }

  return authCookies.some((cookie) => isCookieCompatibleWithHost(cookie, targetHost));
}

function toError(error: unknown): Error {
  if (error instanceof Error) return error;
  if (typeof error === 'string') return new Error(error);
  return new Error('[non-Error thrown]');
}

function isLockAlreadyHeldError(error: unknown): boolean {
  const candidate = error as { code?: string; message?: string };
  return (
    candidate?.code === 'ELOCKED' ||
    candidate?.message?.includes('already being held') === true ||
    candidate?.message?.includes('Lock file is already being held') === true
  );
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
        throw new Error(`Navigation landed on ${CHROME_ERROR_URL_PREFIX} while opening ${targetUrl}`);
      }
      return;
    } catch (error) {
      const currentUrl = currentPageUrl(page);
      const parsedError = toError(error);
      const canRetry = navigationAttempt < maxNavigationAttempts && isTransientNavigationFailure(parsedError, currentUrl);
      lastError = parsedError;
      logger.warn('Authenticated app navigation failed', {
        userIdentifier,
        targetUrl,
        navigationAttempt,
        maxNavigationAttempts,
        canRetry,
        currentUrl,
        error: parsedError.message,
        operation: 'ensure-authenticated-page',
      });
      if (!canRetry) {
        throw parsedError;
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
      await page.goto(loginTarget, { waitUntil: 'domcontentloaded' });
      const currentUrl = currentPageUrl(page);
      if (currentUrl.startsWith(CHROME_ERROR_URL_PREFIX)) {
        throw new Error(`Navigation landed on ${CHROME_ERROR_URL_PREFIX} while opening ${loginTarget}`);
      }
      return;
    } catch (error) {
      const currentUrl = currentPageUrl(page);
      const parsedError = toError(error);
      const canRetry = navigationAttempt < maxNavigationAttempts && isChromeErrorNavigationFailure(parsedError, currentUrl);
      lastError = parsedError;
      logger.warn('Login navigation failed', {
        userIdentifier,
        loginTarget,
        navigationAttempt,
        maxNavigationAttempts,
        canRetry,
        currentUrl,
        error: parsedError.message,
        operation: 'session-capture',
      });
      if (!canRetry) {
        throw parsedError;
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

function hasRequiredAuthCookies(cookies: Cookie[]): boolean {
  const names = new Set(cookies.map((cookie) => cookie.name));
  return names.has('Idam.Session') && names.has('__auth__');
}

async function waitForRequiredAuthCookies(page: Page, timeoutMs: number): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const cookies = await page
      .context()
      .cookies()
      .catch(() => []);
    if (hasRequiredAuthCookies(cookies)) {
      return true;
    }
    await new Promise<void>((resolve) => setTimeout(resolve, Math.min(500, deadline - Date.now())));
  }
  return false;
}

export interface LoadedSession {
  userIdentifier?: string;
  email: string;
  cookies: Cookie[];
  storageFile: string;
  storageStateFingerprint?: string;
}

type PersistDeps = {
  cookieUtils?: CookieUtils;
  fs?: typeof fs;
  signal?: AbortSignal;
  assertLockOwned?: () => void;
};

type SessionLockRelease = (() => Promise<void>) & {
  assertOwned: () => void;
};

function isSessionLockCompromisedError(error: Error): boolean {
  return error.name === 'SessionLockCompromisedError';
}

export type StorageStateContext = Pick<BrowserContext, 'addCookies' | 'storageState'>;

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
async function ensureSessionForIdentity(userIdentifier: SessionIdentityInput): Promise<void> {
  const identity = resolveSessionIdentity(userIdentifier);
  const email = identity.email;
  const sessionStorageKey = resolveSessionStorageKey(identity);
  const sessionPath = path.join(process.cwd(), '.sessions', `${sessionStorageKey}.storage.json`);
  const targetUrl = process.env.TEST_URL ?? config.urls.exuiDefaultUrl;

  const isFresh = isSessionFresh(sessionPath, resolveSessionMaxAgeMs(), { targetUrl });
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
  // Do not force recapture here: when many workers race on a stale session,
  // lock waiters should be able to reuse the freshly captured session.
  await sessionCapture([identity]);
}

function resolveSessionCandidates(userIdentifier: SessionIdentityInput): readonly SessionIdentityInput[] {
  const normalizedIdentifier = typeof userIdentifier === 'string' ? userIdentifier.trim().toUpperCase() : undefined;
  return normalizedIdentifier === STAFF_ADMIN_USER ? resolveStaffAdminSessionCandidates() : [userIdentifier];
}

function storageStateFingerprint(contents: string): string {
  return createHash('sha256').update(contents).digest('hex');
}

function readStorageStateFingerprint(fsApi: typeof fs, storageFile: string): string | undefined {
  try {
    return storageStateFingerprint(fsApi.readFileSync(storageFile, 'utf8'));
  } catch {
    return undefined;
  }
}

export async function ensureSession(userIdentifier: SessionIdentityInput): Promise<void> {
  await withOrderedSessionFallback(resolveSessionCandidates(userIdentifier), ensureSessionForIdentity);
}

/**
 * Load persisted session cookies for a given userIdentifier.
 * Throws if session doesn't exist. Use ensureSession() first.
 */
export function loadSessionCookies(userIdentifier: SessionIdentityInput): LoadedSession {
  const identity = resolveSessionIdentity(userIdentifier);
  const email = identity.email;
  const storageKey = resolveSessionStorageKey(identity);
  const storageFile = path.join(process.cwd(), '.sessions', `${storageKey}.storage.json`);

  let cookies: Cookie[] = [];
  let fingerprint: string | undefined;
  if (fs.existsSync(storageFile)) {
    try {
      const storageStateContents = fs.readFileSync(storageFile, 'utf8');
      fingerprint = storageStateFingerprint(storageStateContents);
      const state = JSON.parse(storageStateContents);
      if (Array.isArray(state.cookies)) {
        cookies = state.cookies as Cookie[];
        logger.info('Loaded session cookies', {
          userIdentifier: identity.userIdentifier,
          email,
          cookieCount: cookies.length,
          operation: 'load-session',
        });
      } else {
        logger.warn('Cookies missing or invalid in storage file', {
          storageFile,
          userIdentifier: identity.userIdentifier,
          operation: 'load-session',
        });
      }
    } catch (e) {
      logger.error('Failed parsing storage state - cleaning up and throwing', {
        userIdentifier: identity.userIdentifier,
        storageFile,
        error: (e as Error).message,
        operation: 'load-session',
      });
      // Auto-clean corrupted session file
      try {
        fs.unlinkSync(storageFile);
        logger.info('Deleted corrupted session file', { storageFile });
      } catch (cleanupError) {
        logger.warn('Failed to delete corrupted session file', {
          storageFile,
          error: (cleanupError as Error).message,
        });
      }
      throw new StorageStateCorruptedError(
        `Storage file corrupted for ${userIdentifier} - file has been deleted. Re-run test to capture fresh session.`,
        storageFile,
        { userIdentifier: identity.userIdentifier },
        e as Error
      );
    }
  } else {
    logger.warn('Storage file does not exist', {
      userIdentifier: identity.userIdentifier,
      storageFile,
      operation: 'load-session',
    });
    throw new StorageStateCorruptedError(`Failed parsing storage file for ${identity.userIdentifier}`, storageFile, {
      userIdentifier: identity.userIdentifier,
    });
  }
  if (!fingerprint) {
    throw new StorageStateCorruptedError(`Failed reading storage file for ${identity.userIdentifier}`, storageFile, {
      userIdentifier: identity.userIdentifier,
    });
  }
  return { userIdentifier: identity.userIdentifier, email, cookies, storageFile, storageStateFingerprint: fingerprint };
}

/**
 * Ensure a session is captured and return the loaded cookies.
 * Retries once if the session file is missing or corrupted.
 */
async function ensureSessionCookiesForIdentity(userIdentifier: SessionIdentityInput): Promise<LoadedSession> {
  await ensureSessionForIdentity(userIdentifier);
  try {
    return loadSessionCookies(userIdentifier);
  } catch (error) {
    if (error instanceof StorageStateCorruptedError) {
      await ensureSessionForIdentity(userIdentifier);
      return loadSessionCookies(userIdentifier);
    }
    throw error;
  }
}

export async function ensureSessionCookies(userIdentifier: SessionIdentityInput): Promise<LoadedSession> {
  const selection = await withOrderedSessionFallback(resolveSessionCandidates(userIdentifier), ensureSessionCookiesForIdentity);
  return selection.value;
}

/**
 * Ensure a session exists and add its cookies to the provided page context.
 */
async function applySessionCookiesForIdentity(page: Page, userIdentifier: SessionIdentityInput): Promise<LoadedSession> {
  const session = await ensureSessionCookies(userIdentifier);
  if (session.cookies.length) {
    await page.context().addCookies(session.cookies);
  }
  return session;
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
  return applySessionCookiesFromPoolWith(page, candidates, applySessionCookies);
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
        currentUrl: page.url(),
        preferredSelector: preferredSelector ?? 'none',
      });
    }

    if (await isServiceDownPage(page)) {
      setSetupMarker(page, 'service-down');
      throw new SessionCaptureError(
        `Service down page detected while waiting for app shell for ${userIdentifier}`,
        userIdentifier,
        {
          currentUrl: page.url(),
          preferredSelector: preferredSelector ?? 'none',
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
    `App shell not detected within ${timeoutMs}ms (preferred=${preferredSelector ?? 'none'}, url=${page.url()}, markers=${markers
      .map((marker) => marker.name)
      .join(',')})`
  );
}

/**
 * Ensure the page is authenticated for the given user and on the target URL.
 * If the session is invalid, refresh the stored session and retry once.
 */
export async function ensureAuthenticatedPage(
  page: Page,
  userIdentifier: SessionIdentityInput,
  options: { targetUrl?: string; waitForSelector?: string; timeoutMs?: number } = {}
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
      targetUrl,
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
        targetUrl,
      });
    }
  }

  if (options.waitForSelector) {
    const selectors = options.waitForSelector;
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
        currentUrl: page.url(),
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
        error: (error as Error).message,
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
  deps: { fs?: typeof fs; now?: () => number; targetUrl?: string } = {}
): boolean {
  const fsApi = deps.fs ?? fs;
  const now = deps.now ?? Date.now;
  try {
    if (fsApi.existsSync(sessionPath)) {
      const stat = fsApi.statSync(sessionPath);
      const ageMs = now() - stat.mtimeMs;
      if (ageMs >= maxAgeMs) {
        return false;
      }

      const state = JSON.parse(fsApi.readFileSync(sessionPath, 'utf8'));
      const cookies = Array.isArray(state.cookies) ? state.cookies : [];
      if (cookies.length === 0) {
        return false;
      }

      // Treat session as stale if all cookies are expired or nearly expired.
      const nowSeconds = Math.floor(now() / 1_000);
      const hasValidCookie = cookies.some((cookie: Cookie) => {
        if (typeof cookie.expires !== 'number') {
          return true;
        }
        if (cookie.expires <= 0) {
          return true; // session cookie (no explicit expiry)
        }
        return cookie.expires > nowSeconds + 60;
      });
      if (!hasValidCookie) {
        return false;
      }

      return hasTargetCompatibleAuthCookies(cookies, deps.targetUrl);
    }
    return false;
  } catch (err) {
    logger.warn('Failed to stat session file', {
      sessionPath,
      error: (err as Error).message,
      operation: 'check-session-freshness',
    });
    return false;
  }
}

function clearSessionCaptureFailureIfReusableSession({
  fsApi,
  failurePath,
  force,
  isFresh,
  maxAgeMs,
  sessionPath,
  targetUrl,
  userIdentifier,
  waitContext,
}: {
  fsApi: typeof fs;
  failurePath: string;
  force: boolean;
  isFresh: typeof isSessionFresh;
  maxAgeMs: number;
  sessionPath: string;
  targetUrl: string;
  userIdentifier: string;
  waitContext: 'before-lock' | 'after-lock';
}): boolean {
  if (force || !isFresh(sessionPath, maxAgeMs, { targetUrl })) {
    return false;
  }

  logger.warn('Clearing session capture failure marker because a reusable session is already present', {
    userIdentifier,
    sessionPath,
    failurePath,
    waitContext,
    operation: 'session-capture',
  });
  clearSessionCaptureFailure(fsApi, failurePath);
  return true;
}

// local helper to persist session: write session file, add cookies to context and save storageState
async function persistSession(
  localSessionPath: string,
  localCookies: Cookie[],
  ctx: StorageStateContext,
  uid: string,
  deps: PersistDeps = {}
) {
  const cookieUtils = deps.cookieUtils ?? new CookieUtils();
  const fsApi = deps.fs ?? fs;
  const stagingPath = `${localSessionPath}.${process.pid}.${Date.now()}.tmp`;
  const assertNotAborted = () => {
    if (deps.signal?.aborted) {
      const error = new Error(`Session persistence aborted for ${uid}`);
      error.name = 'AbortError';
      throw error;
    }
  };
  try {
    assertNotAborted();
    cookieUtils.writeManageCasesSession(stagingPath, localCookies);
    assertNotAborted();
    const augmented = JSON.parse(fsApi.readFileSync(stagingPath, 'utf8')).cookies;
    await ctx.addCookies(augmented);
    assertNotAborted();
    await ctx.storageState({ path: stagingPath });
    assertNotAborted();
    deps.assertLockOwned?.();
    fsApi.renameSync(stagingPath, localSessionPath);
    logger.info('Stored storage state', {
      userIdentifier: uid,
      sessionPath: localSessionPath,
      cookieCount: augmented.length,
      operation: 'persist-session',
    });
  } catch (err) {
    logger.error('Failed to persist storage state', {
      userIdentifier: uid,
      sessionPath: localSessionPath,
      error: (err as Error).message,
      operation: 'persist-session',
    });
    throw err;
  } finally {
    if (fsApi.existsSync(stagingPath)) {
      fsApi.rmSync(stagingPath, { force: true });
    }
  }
}

function ensureDirectory(fsApi: typeof fs, dirPath: string) {
  if (!fsApi.existsSync(dirPath)) {
    fsApi.mkdirSync(dirPath, { recursive: true });
  }
}

function ensureLockFile(fsApi: typeof fs, lockFilePath: string) {
  if (!fsApi.existsSync(lockFilePath)) {
    fsApi.writeFileSync(lockFilePath, '', 'utf8');
  }
}

async function acquireSessionLock({
  lockfileApi,
  lockFilePath,
  userIdentifier,
  isSessionReusable,
  force,
  maxWaitMs = SESSION_CAPTURE_LOCK_WAIT_MS,
}: {
  lockfileApi: typeof lockfile;
  lockFilePath: string;
  userIdentifier: string;
  isSessionReusable: () => boolean;
  force: boolean;
  maxWaitMs?: number;
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
      let compromisedError: Error | undefined;
      const releaseLock = await lockfileApi.lock(lockFilePath, {
        retries: 0,
        stale: SESSION_CAPTURE_LOCK_STALE_MS,
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
      };
      return Object.assign(release, { assertOwned });
    } catch (error) {
      if (!isLockAlreadyHeldError(error)) {
        throw error;
      }

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
  const shellMarker = await waitForAuthenticatedShell(page, userIdentifier, undefined, 5_000).catch(() => null);
  if (shellMarker) {
    logger.info('Authenticated shell detected without IDAM form login', {
      userIdentifier,
      email,
      loginTarget,
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
    await idamPage.usernameInput.first().waitFor({ state: 'visible', timeout: 10_000 });
    await idamPage.login({ username: email, password });
    await confirmAuthenticatedLogin(page, userIdentifier, email, loginTarget, attemptIndex);
    return;
  }

  const usernameInput = (await waitForFirstVisibleLocator(page, usernameCandidates, 1_000)) ?? idamPage.usernameInput.first();
  const passwordInput = idamPage.passwordInput.first(); // NOSONAR
  const submitButton =
    (await waitForFirstVisibleLocator(page, getIdamSubmitCandidates(page, idamPage), 1_000)) ?? idamPage.submitBtn.first();
  await usernameInput.fill(email);
  await passwordInput.fill(password); // NOSONAR
  if (await submitButton.isVisible().catch(() => false)) {
    await submitButton.click();
  } else {
    await passwordInput.press('Enter');
  }
  await confirmAuthenticatedLogin(page, userIdentifier, email, loginTarget, attemptIndex);
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
    waitForShell(page, userIdentifier, undefined, POST_LOGIN_AUTH_TIMEOUT_MS).catch(() => null),
    waitForAuthCookies(page, POST_LOGIN_AUTH_TIMEOUT_MS),
  ]);
  if (!postLoginShell && !hasAuthCookies) {
    const idamErrorText = await getIdamLoginErrorText(page);
    const idamMessage = idamErrorText ? ` IDAM page message: ${idamErrorText}` : '';
    throw new Error(
      `IDAM login did not establish authenticated session for ${userIdentifier} (url=${currentPageUrl(page)}).${idamMessage}`
    );
  }
  info('IDAM login successful', {
    userIdentifier,
    email,
    loginTarget,
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
  executeLoginAttemptFn?: typeof executeLoginAttempt;
  waitForRetry?: () => Promise<void>;
}) {
  const targetUrl = env.TEST_URL || activeConfig.urls.exuiDefaultUrl;
  logger.info('Logging in to EXUI', {
    userIdentifier,
    email,
    targetUrl,
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
  try {
    for (let captureAttempt = 1; captureAttempt <= SESSION_CAPTURE_LOGIN_ATTEMPTS; captureAttempt += 1) {
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
            return requirePersistableSessionCookies(context, userIdentifier, currentPageUrl(page));
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
        } catch (error) {
          if (isSessionLockCompromisedError(error as Error)) {
            throw error;
          }
          const evidence = sessionCaptureFailureEvidence(error as Error);
          const persistenceError = new Error(`Session persistence failed for ${userIdentifier}: ${evidence}`);
          persistenceError.name = 'SessionPersistenceError';
          throw persistenceError;
        }
        return;
      } catch (error) {
        const loginError = error as Error;
        if (isSessionLockCompromisedError(loginError)) {
          throw loginError;
        }
        const shouldRetry = captureAttempt < SESSION_CAPTURE_LOGIN_ATTEMPTS && isTransientSessionCaptureError(loginError);
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
          const failureKind = isUnexplainedIdamLoginRejection(loginError) ? UNEXPLAINED_IDAM_LOGIN_FAILURE : undefined;
          throw new SessionCaptureError(
            `Login failed for ${userIdentifier} at ${sanitizeUrl(targetUrl)} after ${captureAttempt} of ${SESSION_CAPTURE_LOGIN_ATTEMPTS} capture attempts: ${evidence}`,
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
              `Login failed for ${userIdentifier} at ${sanitizeUrl(targetUrl)} after ${captureAttempt} of ${SESSION_CAPTURE_LOGIN_ATTEMPTS} capture attempts: browser context cleanup failed before retry: ${evidence}`,
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
  } finally {
    try {
      await closeBrowser();
    } catch (closeError) {
      logger.warn('Failed to close browser after session capture', {
        userIdentifier,
        targetUrl: sanitizeUrl(targetUrl),
        error: (closeError as Error).message,
        operation: 'session-capture',
      });
    }
  }
}

async function requirePersistableSessionCookies(
  context: Pick<BrowserContext, 'cookies'>,
  userIdentifier: string,
  currentUrl: string
): Promise<Cookie[]> {
  const cookies = await context.cookies();
  if (!hasRequiredAuthCookies(cookies)) {
    throw new Error(`Cannot persist unauthenticated session for ${userIdentifier} (url=${currentUrl}).`);
  }
  return cookies;
}

export async function sessionCapture(identifiers: SessionIdentityInput[], options: { force?: boolean } = {}) {
  return sessionCaptureWith(identifiers, {
    force: options.force,
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

    // Acquire filesystem lock (blocks across all workers)
    let release: SessionLockRelease | null = null;
    try {
      const recentFailure = recentSessionCaptureFailure(fsApi, failurePath, resolveSessionCaptureFailureTtlMs(env));
      if (recentFailure) {
        if (
          clearSessionCaptureFailureIfReusableSession({
            fsApi,
            failurePath,
            force,
            isFresh,
            maxAgeMs: sessionMaxAgeMs,
            sessionPath,
            targetUrl,
            userIdentifier: identity.userIdentifier,
            waitContext: 'before-lock',
          })
        ) {
          continue;
        }
        throw new SessionCaptureError(
          `Recent session capture failed for ${identity.userIdentifier}; refusing repeated login attempt for now: ${recentFailure.message}`,
          identity.userIdentifier,
          { sessionPath, failureKind: recentFailure.failureKind }
        );
      }

      logger.info('Attempting to acquire lock for user', {
        userIdentifier: identity.userIdentifier,
        lockFilePath,
        operation: 'session-capture',
      });

      const lockStartedAt = now();
      release = await acquireSessionLock({
        lockfileApi,
        lockFilePath,
        userIdentifier: identity.userIdentifier,
        isSessionReusable: () => isFresh(sessionPath, sessionMaxAgeMs, { targetUrl }),
        force,
        maxWaitMs: deps.lockWaitMs,
      });
      const lockWaitMs = Math.max(0, now() - lockStartedAt);

      if (!release) {
        logger.info('Skipping session capture because another worker refreshed the session', {
          userIdentifier: identity.userIdentifier,
          email: identity.email,
          sessionPath,
          operation: 'session-capture',
        });
        continue;
      }

      logger.info('Lock acquired', {
        userIdentifier: identity.userIdentifier,
        operation: 'session-capture',
      });

      const lockedRecentFailure = recentSessionCaptureFailure(fsApi, failurePath, resolveSessionCaptureFailureTtlMs(env));
      if (lockedRecentFailure) {
        if (
          clearSessionCaptureFailureIfReusableSession({
            fsApi,
            failurePath,
            force,
            isFresh,
            maxAgeMs: sessionMaxAgeMs,
            sessionPath,
            targetUrl,
            userIdentifier: identity.userIdentifier,
            waitContext: 'after-lock',
          })
        ) {
          continue;
        }
        throw new SessionCaptureError(
          `Recent session capture failed for ${identity.userIdentifier}; refusing repeated login attempt for now: ${lockedRecentFailure.message}`,
          identity.userIdentifier,
          { sessionPath, failureKind: lockedRecentFailure.failureKind }
        );
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
          continue;
        }

        if (currentFingerprint === expectedStaleSession.storageStateFingerprint) {
          fsApi.unlinkSync(sessionPath);
          logger.info('Deleted server-rejected session under identity lock', {
            userIdentifier: identity.userIdentifier,
            sessionPath,
            operation: 'session-refresh',
          });
        }
      }

      // Recheck freshness after acquiring lock (another worker may have logged in)
      if (!force && isFresh(sessionPath, sessionMaxAgeMs, { targetUrl })) {
        logger.info('Session became fresh while waiting for lock', {
          userIdentifier: identity.userIdentifier,
          email: identity.email,
          sessionPath,
          operation: 'session-capture',
        });
        continue;
      }

      if (lockWaitMs > SESSION_CAPTURE_LOCK_START_BUDGET_MS) {
        throw new SessionCaptureError(
          `Session lock became available for ${identity.userIdentifier} after ${lockWaitMs}ms; refusing to start a capture that cannot complete within the integration test budget`,
          identity.userIdentifier,
          { sessionPath, lockWaitMs }
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
      })
        .then(() => {
          release!.assertOwned();
          clearSessionCaptureFailure(fsApi, failurePath);
        })
        .catch((error: Error) => {
          release!.assertOwned();
          if (!isSessionLockCompromisedError(error)) {
            writeSessionCaptureFailure(fsApi, failurePath, error);
          }
          throw error;
        });
    } finally {
      // Always release lock
      if (release) {
        try {
          await release();
          logger.info('Lock released', {
            userIdentifier: identity.userIdentifier,
            operation: 'session-capture',
          });
        } catch (e) {
          logger.warn('Failed to release lock', {
            userIdentifier: identity.userIdentifier,
            lockFilePath,
            error: (e as Error).message,
            operation: 'session-capture',
          });
        }
      }
    }
  }
}

export const __test__ = {
  sessionCaptureLockWaitMs: SESSION_CAPTURE_LOCK_WAIT_MS,
  sessionCaptureLockHeadroomMs: SESSION_CAPTURE_LOCK_HEADROOM_MS,
  sessionCaptureLockStartBudgetMs: SESSION_CAPTURE_LOCK_START_BUDGET_MS,
  sessionCaptureLockStaleMs: SESSION_CAPTURE_LOCK_STALE_MS,
  sessionCaptureOwnerBudgetMs: SESSION_CAPTURE_OWNER_BUDGET_MS,
  sessionCaptureBrowserLaunchBudgetMs: SESSION_CAPTURE_BROWSER_LAUNCH_BUDGET_MS,
  sessionCaptureTargetBudgetMs: SESSION_CAPTURE_TARGET_BUDGET_MS,
  sessionCapturePersistBudgetMs: SESSION_CAPTURE_PERSIST_BUDGET_MS,
  sessionCaptureContextCloseBudgetMs: SESSION_CAPTURE_CONTEXT_CLOSE_BUDGET_MS,
  sessionCaptureBrowserCloseBudgetMs: SESSION_CAPTURE_BROWSER_CLOSE_BUDGET_MS,
  sessionCaptureRetryBackoffMaxMs: SESSION_CAPTURE_RETRY_BACKOFF_MAX_MS,
  withOperationTimeout,
  applySessionCookiesFromPoolWith,
  resolveSessionMaxAgeMs,
  storageStateFingerprint,
  readStorageStateFingerprint,
  hasTargetCompatibleAuthCookies,
  isTransientNavigationFailure,
  gotoAppTarget,
  resolveTargetHost,
  acquireSessionLock,
  sessionCaptureWith,
  persistSession,
  confirmAuthenticatedLogin,
  ensureAuthenticatedPage,
  loginAndPersistSession,
  requirePersistableSessionCookies,
  waitForAuthenticatedShell,
};
