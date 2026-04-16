import { chromium, type BrowserContext, type Locator, type Page } from '@playwright/test';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as lockfile from 'proper-lockfile';
import { CookieUtils } from '../E2E/utils/cookie.utils.js';
import { UserUtils } from '../E2E/utils/user.utils.js';
import { IdamPage, createLogger } from '@hmcts/playwright-common';
import { Cookie } from 'playwright-core';
import config from '../E2E/utils/config.utils.js';
import { StorageStateCorruptedError, SessionCaptureError } from '../api/utils/errors';
import { type SessionIdentityInput, resolveSessionIdentity, resolveSessionStorageKey } from './sessionIdentity.js';

const logger = createLogger({ serviceName: 'session-capture', format: 'pretty' });

const IDAM_USERNAME_FALLBACK_SELECTOR =
  'input#email, input[name="email"], input[name="emailAddress"], input[autocomplete="email"]';
const IDAM_SUBMIT_FALLBACK_SELECTOR = 'button:has-text("Sign in"), button:has-text("Continue")';
const CHROME_ERROR_URL_PREFIX = 'chrome-error://chromewebdata/';
const DEFAULT_SESSION_MAX_AGE_MS = 60 * 60 * 1000;

function getIdamUsernameCandidates(page: Page, idamPage: IdamPage): Locator[] {
  return [idamPage.usernameInput.first(), page.locator(IDAM_USERNAME_FALLBACK_SELECTOR).first()];
}

function getIdamSubmitCandidates(page: Page, idamPage: IdamPage): Locator[] {
  return [idamPage.submitBtn.first(), page.locator(IDAM_SUBMIT_FALLBACK_SELECTOR).first()];
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
      await new Promise<void>((resolve) => setTimeout(resolve, 1000 * navigationAttempt));
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
      await new Promise<void>((resolve) => setTimeout(resolve, 1000 * navigationAttempt));
    }
  }

  if (lastError) {
    throw lastError;
  }
}

export async function acceptAccessCookiesIfPresent(page: Page): Promise<void> {
  const acceptButton = page.getByRole('button', { name: /accept (additional|analytics) cookies/i }).first();
  if (await acceptButton.isVisible().catch(() => false)) {
    await acceptButton.click({ timeout: 2000 }).catch(() => undefined);
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
  email: string;
  cookies: Cookie[];
  storageFile: string;
}

type PersistDeps = {
  cookieUtils?: CookieUtils;
  fs?: typeof fs;
};

export type StorageStateContext = Pick<BrowserContext, 'addCookies' | 'storageState'>;

type SessionCaptureDeps = {
  chromiumLauncher?: typeof chromium;
  userUtils?: UserUtils;
  resolveSessionIdentity?: typeof resolveSessionIdentity;
  idamPageFactory?: (page: Page) => IdamPage;
  isSessionFresh?: typeof isSessionFresh;
  persistSession?: typeof persistSession;
  fs?: typeof fs;
  config?: typeof config;
  env?: NodeJS.ProcessEnv;
  lockfile?: typeof lockfile;
  force?: boolean;
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
export async function ensureSession(userIdentifier: SessionIdentityInput): Promise<void> {
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
  if (fs.existsSync(storageFile)) {
    try {
      const state = JSON.parse(fs.readFileSync(storageFile, 'utf8'));
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
  return { email, cookies, storageFile };
}

/**
 * Ensure a session is captured and return the loaded cookies.
 * Retries once if the session file is missing or corrupted.
 */
export async function ensureSessionCookies(userIdentifier: SessionIdentityInput): Promise<LoadedSession> {
  await ensureSession(userIdentifier);
  try {
    return loadSessionCookies(userIdentifier);
  } catch (error) {
    if (error instanceof StorageStateCorruptedError) {
      await ensureSession(userIdentifier);
      return loadSessionCookies(userIdentifier);
    }
    throw error;
  }
}

/**
 * Ensure a session exists and add its cookies to the provided page context.
 */
export async function applySessionCookies(page: Page, userIdentifier: SessionIdentityInput): Promise<LoadedSession> {
  const session = await ensureSessionCookies(userIdentifier);
  if (session.cookies.length) {
    await page.context().addCookies(session.cookies);
  }
  return session;
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

function getAppShellMarkers(page: Page, preferredSelector?: string): Array<{ name: string; locator: Locator }> {
  const markers: Array<{ name: string; locator: Locator }> = [];

  if (preferredSelector?.trim()) {
    markers.push({
      name: `preferred:${preferredSelector}`,
      locator: page.locator(preferredSelector).first(),
    });
  }

  markers.push(
    { name: 'exui-header', locator: page.locator('exui-header').first() },
    { name: 'create-case-link', locator: page.getByRole('link', { name: 'Create case' }).first() },
    { name: 'case-list-link', locator: page.getByRole('link', { name: 'Case list' }).first() },
    { name: 'case-action-dropdown', locator: page.locator('#next-step').first() },
    { name: 'jurisdiction-select', locator: page.locator('#cc-jurisdiction').first() }
  );

  return markers;
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
  const identity = resolveSessionIdentity(userIdentifier);
  const markSetup = (marker: string) => setSetupMarker(page, marker);
  markSetup('setup-start');
  const targetUrl = options.targetUrl ?? process.env.TEST_URL ?? config.urls.exuiDefaultUrl;
  const timeoutMs = options.timeoutMs ?? 60000;
  let session = await ensureSessionCookies(identity);
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
    try {
      if (fs.existsSync(session.storageFile)) {
        fs.unlinkSync(session.storageFile);
      }
    } catch (error) {
      logger.warn('Failed to delete stale session file', {
        userIdentifier: identity.userIdentifier,
        storageFile: session.storageFile,
        error: (error as Error).message,
        operation: 'session-refresh',
      });
    }

    await sessionCapture([identity]);
    markSetup('session-refresh');
    session = loadSessionCookies(identity);
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
      markSetup('waiting-shell');
      logger.warn('App shell not detected; retrying once', {
        userIdentifier: identity.userIdentifier,
        selector: selectors,
        timeoutMs,
        error: (error as Error).message,
        operation: 'wait-for-shell',
      });
      await gotoAppTarget(page, identity.userIdentifier, targetUrl);
      await acceptAccessCookiesIfPresent(page);
      markSetup('navigated-app');
      await waitForAppShell();
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
      const nowSeconds = Math.floor(now() / 1000);
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
  try {
    cookieUtils.writeManageCasesSession(localSessionPath, localCookies);
    const augmented = JSON.parse(fsApi.readFileSync(localSessionPath, 'utf8')).cookies;
    await ctx.addCookies(augmented);
    await ctx.storageState({ path: localSessionPath });
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
  fsApi,
  lockfileApi,
  lockFilePath,
  userIdentifier,
  isSessionReusable,
  force,
}: {
  fsApi: typeof fs;
  lockfileApi: typeof lockfile;
  lockFilePath: string;
  userIdentifier: string;
  isSessionReusable: () => boolean;
  force: boolean;
}): Promise<(() => Promise<void>) | null> {
  const pollIntervalMs = 1000;
  const maxWaitMs = 90000;
  const staleLockWindowMs = 65000;
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
      return await lockfileApi.lock(lockFilePath, {
        retries: 0,
        stale: 60000,
      });
    } catch (error) {
      if (!isLockAlreadyHeldError(error)) {
        throw error;
      }

      attempt += 1;
      const elapsedMs = Date.now() - startedAt;
      const recovered = tryRecoverAbandonedSessionLock(fsApi, lockFilePath, staleLockWindowMs);
      if (recovered) {
        logger.warn('Recovered abandoned session lock artifact', {
          userIdentifier,
          lockFilePath,
          attempt,
          elapsedMs,
          operation: 'session-capture',
        });
        continue;
      }
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

function tryRecoverAbandonedSessionLock(fsApi: typeof fs, lockFilePath: string, staleLockWindowMs: number): boolean {
  const lockArtifactPath = `${lockFilePath}.lock`;
  try {
    if (!fsApi.existsSync(lockArtifactPath)) {
      return false;
    }
    const ageMs = Date.now() - fsApi.statSync(lockArtifactPath).mtimeMs;
    if (ageMs < staleLockWindowMs) {
      return false;
    }
    fsApi.rmSync(lockArtifactPath, { recursive: true, force: true });
    return true;
  } catch {
    return false;
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
  const shellMarker = await waitForAuthenticatedShell(page, userIdentifier, undefined, 5000).catch(() => null);
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
    waitForFirstVisibleLocator(page, usernameCandidates, 60000).then((locator) => (locator ? 'login' : null)),
    page
      .locator('exui-header, exui-case-home')
      .first()
      .waitFor({ state: 'visible', timeout: 60000 })
      .then(() => 'app'),
  ]).catch(() => null);

  if (loginSurface === 'app') return;

  if (loginSurface !== 'login') {
    await idamPage.usernameInput.first().waitFor({ state: 'visible', timeout: 10000 });
    await idamPage.login({ username: email, password });
    await confirmAuthenticatedLogin(page, userIdentifier, email, loginTarget, attemptIndex);
    return;
  }

  const usernameInput = (await waitForFirstVisibleLocator(page, usernameCandidates, 1000)) ?? idamPage.usernameInput.first();
  const passwordInput = idamPage.passwordInput.first(); // NOSONAR
  const submitButton =
    (await waitForFirstVisibleLocator(page, getIdamSubmitCandidates(page, idamPage), 1000)) ?? idamPage.submitBtn.first();
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
  const postLoginShell = await waitForShell(page, userIdentifier, undefined, 15000).catch(() => null);
  const hasAuthCookies = await waitForAuthCookies(page, 15000);
  if (!postLoginShell && !hasAuthCookies) {
    throw new Error(`IDAM login did not establish authenticated session for ${userIdentifier} (url=${currentPageUrl(page)}).`);
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
  userIdentifier,
  executeLoginAttemptFn = executeLoginAttempt,
}: {
  chromiumLauncher: typeof chromium;
  idamFactory: (page: Page) => IdamPage;
  env: NodeJS.ProcessEnv;
  activeConfig: typeof config;
  email: string;
  password: string;
  sessionPath: string;
  persist: typeof persistSession;
  userIdentifier: string;
  executeLoginAttemptFn?: typeof executeLoginAttempt;
}) {
  const browser = await chromiumLauncher.launch();
  const targetUrl = env.TEST_URL || activeConfig.urls.exuiDefaultUrl;
  const idamLoginUrl = activeConfig.urls.idamWebUrl ? new URL('/login', activeConfig.urls.idamWebUrl).toString() : undefined;
  const loginTargets = [targetUrl, idamLoginUrl].filter((candidate): candidate is string => Boolean(candidate));
  logger.info('Logging in to EXUI', {
    userIdentifier,
    email,
    targetUrl,
    operation: 'session-capture',
  });
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    const idamPage = idamFactory(page);
    try {
      let loginError: Error | null = null;
      for (let attempt = 0; attempt < loginTargets.length; attempt += 1) {
        const loginTarget = loginTargets[attempt];
        try {
          await executeLoginAttemptFn(page, idamPage, userIdentifier, email, password, loginTarget, attempt + 1);
          loginError = null;
          break;
        } catch (attemptError) {
          loginError = attemptError as Error;
          logger.warn('IDAM login attempt failed', {
            userIdentifier,
            email,
            loginTarget,
            attempt: attempt + 1,
            totalAttempts: loginTargets.length,
            currentUrl: currentPageUrl(page),
            error: loginError.message,
            operation: 'session-capture',
          });
        }
      }

      if (loginError) {
        throw loginError;
      }

      try {
        await page.locator('exui-header').waitFor({ timeout: 60000 });
        logger.info('EXUI header detected', {
          userIdentifier,
          operation: 'session-capture',
        });
      } catch (error_) {
        logger.warn('EXUI header not detected within timeout', {
          userIdentifier,
          timeout: 60000,
          error: (error_ as Error).message,
          operation: 'session-capture',
        });
      }

      const cookies = await requirePersistableSessionCookies(context, userIdentifier, currentPageUrl(page));
      await persist(sessionPath, cookies, context, userIdentifier);
    } catch (e) {
      logger.error('Login failed', {
        userIdentifier,
        email,
        targetUrl,
        error: (e as Error).message,
        operation: 'session-capture',
      });
      throw new SessionCaptureError(`Login failed for ${userIdentifier}`, userIdentifier, { email, targetUrl }, e as Error);
    }
  } finally {
    try {
      await browser.close();
    } catch (closeError) {
      logger.warn('Failed to close browser after session capture', {
        userIdentifier,
        email,
        targetUrl,
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
  return sessionCaptureWith(identifiers, { force: options.force });
}

async function sessionCaptureWith(identifiers: SessionIdentityInput[], deps: SessionCaptureDeps = {}) {
  const userUtils = deps.userUtils ?? new UserUtils();
  const resolveIdentity = deps.resolveSessionIdentity ?? resolveSessionIdentity;
  const fsApi = deps.fs ?? fs;
  const env = deps.env ?? process.env;
  const activeConfig = deps.config ?? config;
  const isFresh = deps.isSessionFresh ?? isSessionFresh;
  const persist = deps.persistSession ?? persistSession;
  const chromiumLauncher = deps.chromiumLauncher ?? chromium;
  const idamFactory = deps.idamPageFactory ?? ((page) => new IdamPage(page));
  const lockfileApi = deps.lockfile ?? lockfile;
  const force = deps.force ?? false;
  const targetUrl = env.TEST_URL || activeConfig.urls.exuiDefaultUrl;

  const sessionsDir = path.join(process.cwd(), '.sessions');
  ensureDirectory(fsApi, sessionsDir);

  for (const id of identifiers) {
    const identity = resolveIdentity(id, { userUtils });
    const sessionStorageKey = resolveSessionStorageKey(identity);
    const sessionPath = path.join(sessionsDir, `${sessionStorageKey}.storage.json`);
    const lockFilePath = path.join(sessionsDir, `${sessionStorageKey}.lock`);

    ensureDirectory(fsApi, sessionsDir);
    ensureLockFile(fsApi, lockFilePath);

    // Acquire filesystem lock (blocks across all workers)
    let release: (() => Promise<void>) | null = null;
    try {
      logger.info('Attempting to acquire lock for user', {
        userIdentifier: identity.userIdentifier,
        lockFilePath,
        operation: 'session-capture',
      });

      release = await acquireSessionLock({
        fsApi,
        lockfileApi,
        lockFilePath,
        userIdentifier: identity.userIdentifier,
        isSessionReusable: () => isFresh(sessionPath, DEFAULT_SESSION_MAX_AGE_MS, { targetUrl }),
        force,
      });

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

      // Recheck freshness after acquiring lock (another worker may have logged in)
      if (!force && isFresh(sessionPath, DEFAULT_SESSION_MAX_AGE_MS, { targetUrl })) {
        logger.info('Session became fresh while waiting for lock', {
          userIdentifier: identity.userIdentifier,
          email: identity.email,
          sessionPath,
          operation: 'session-capture',
        });
        continue;
      }

      await loginAndPersistSession({
        chromiumLauncher,
        idamFactory,
        env,
        activeConfig,
        email: identity.email,
        password: identity.password,
        sessionPath,
        persist,
        userIdentifier: identity.userIdentifier,
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
  resolveSessionMaxAgeMs,
  hasTargetCompatibleAuthCookies,
  resolveTargetHost,
  acquireSessionLock,
  sessionCaptureWith,
  persistSession,
  confirmAuthenticatedLogin,
  loginAndPersistSession,
  requirePersistableSessionCookies,
};
