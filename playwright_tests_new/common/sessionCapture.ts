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

const logger = createLogger({ serviceName: 'session-capture', format: 'pretty' });

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

/**
 * Ensure session is captured for a given userIdentifier before tests run.
 * Call this in test.beforeAll() to lazily capture only needed sessions.
 */
export async function ensureSession(userIdentifier: string): Promise<void> {
  const userUtils = new UserUtils();
  const creds = userUtils.getUserCredentials(userIdentifier);
  const email = creds.email;
  const sessionPath = path.join(process.cwd(), '.sessions', `${email}.storage.json`);

  const isFresh = isSessionFresh(sessionPath);
  if (isFresh) {
    logger.info('Session is fresh, skipping capture', {
      userIdentifier,
      email,
      operation: 'lazy-capture',
      metric: 'session-hit',
    });
    return;
  }
  logger.info('Session missing or stale, capturing lazily', {
    userIdentifier,
    email,
    operation: 'lazy-capture',
    metric: 'session-miss',
  });
  // Do not force recapture here: when many workers race on a stale session,
  // lock waiters should be able to reuse the freshly captured session.
  await sessionCapture([userIdentifier]);
}

/**
 * Load persisted session cookies for a given userIdentifier.
 * Throws if session doesn't exist. Use ensureSession() first.
 */
export function loadSessionCookies(userIdentifier: string): LoadedSession {
  const userUtils = new UserUtils();
  const creds = userUtils.getUserCredentials(userIdentifier);
  const email = creds.email;
  const storageFile = path.join(process.cwd(), '.sessions', `${email}.storage.json`);

  let cookies: Cookie[] = [];
  if (fs.existsSync(storageFile)) {
    try {
      const state = JSON.parse(fs.readFileSync(storageFile, 'utf8'));
      if (Array.isArray(state.cookies)) {
        cookies = state.cookies as Cookie[];
        logger.info('Loaded session cookies', {
          userIdentifier,
          email,
          cookieCount: cookies.length,
          operation: 'load-session',
        });
      } else {
        logger.warn('Cookies missing or invalid in storage file', {
          storageFile,
          userIdentifier,
          operation: 'load-session',
        });
      }
    } catch (e) {
      logger.error('Failed parsing storage state - cleaning up and throwing', {
        userIdentifier,
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
        { userIdentifier },
        e as Error
      );
    }
  } else {
    logger.warn('Storage file does not exist', {
      userIdentifier,
      storageFile,
      operation: 'load-session',
    });
    throw new StorageStateCorruptedError(`Failed parsing storage file for ${userIdentifier}`, storageFile, { userIdentifier });
  }
  return { email, cookies, storageFile };
}

/**
 * Ensure a session is captured and return the loaded cookies.
 * Retries once if the session file is missing or corrupted.
 */
export async function ensureSessionCookies(userIdentifier: string): Promise<LoadedSession> {
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
export async function applySessionCookies(page: Page, userIdentifier: string): Promise<LoadedSession> {
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
  userIdentifier: string,
  options: { targetUrl?: string; waitForSelector?: string; timeoutMs?: number } = {}
): Promise<LoadedSession> {
  const markSetup = (marker: string) => setSetupMarker(page, marker);
  markSetup('setup-start');
  const targetUrl = options.targetUrl ?? process.env.TEST_URL ?? config.urls.exuiDefaultUrl;
  const timeoutMs = options.timeoutMs ?? 60000;
  let session = await ensureSessionCookies(userIdentifier);
  if (session.cookies.length) {
    await page.context().addCookies(session.cookies);
    markSetup('cookies-ready');
  } else {
    markSetup('cookies-ready');
  }

  await page.goto(targetUrl);
  markSetup('navigated-app');

  if (await isIdamLoginPage(page)) {
    markSetup('idam-login');
    logger.warn('Session appears invalid; refreshing', {
      userIdentifier,
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
        userIdentifier,
        storageFile: session.storageFile,
        error: (error as Error).message,
        operation: 'session-refresh',
      });
    }

    await sessionCapture([userIdentifier]);
    markSetup('session-refresh');
    session = loadSessionCookies(userIdentifier);
    await page.context().clearCookies();
    if (session.cookies.length) {
      await page.context().addCookies(session.cookies);
    }
    await page.goto(targetUrl);
    markSetup('navigated-app');

    if (await isIdamLoginPage(page)) {
      markSetup('idam-login');
      throw new SessionCaptureError(`Login failed for ${userIdentifier}`, userIdentifier, { email: session.email, targetUrl });
    }
  }

  if (options.waitForSelector) {
    const selectors = options.waitForSelector;
    const waitForAppShell = async () => {
      markSetup('waiting-shell');
      await page.waitForLoadState('domcontentloaded');
      const marker = await waitForAuthenticatedShell(page, userIdentifier, selectors, timeoutMs);
      markSetup('shell-ready');
      logger.info('Authenticated app shell detected', {
        userIdentifier,
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
        userIdentifier,
        selector: selectors,
        timeoutMs,
        error: (error as Error).message,
        operation: 'wait-for-shell',
      });
      await page.goto(targetUrl);
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
  maxAgeMs = 15 * 60 * 1000,
  deps: { fs?: typeof fs; now?: () => number } = {}
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
      return hasValidCookie;
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
}) {
  const browser = await chromiumLauncher.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const idamPage = idamFactory(page);
  const targetUrl = env.TEST_URL || activeConfig.urls.exuiDefaultUrl;
  logger.info('Logging in to EXUI', {
    userIdentifier,
    email,
    targetUrl,
    operation: 'session-capture',
  });
  try {
    await page.goto(targetUrl);
    await idamPage.usernameInput.waitFor({ state: 'visible', timeout: 60000 });
    await idamPage.login({ username: email, password });
    // Wait for presence of the standard EXUI header component to confirm the app shell loaded.
    try {
      await page.waitForSelector('exui-header', { timeout: 60000 });
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

  const cookies = await context.cookies();
  await persist(sessionPath, cookies, context, userIdentifier);
  await browser.close();
}

export async function sessionCapture(identifiers: string[], options: { force?: boolean } = {}) {
  return sessionCaptureWith(identifiers, { force: options.force });
}

async function sessionCaptureWith(identifiers: string[], deps: SessionCaptureDeps = {}) {
  const userUtils = deps.userUtils ?? new UserUtils();
  const fsApi = deps.fs ?? fs;
  const env = deps.env ?? process.env;
  const activeConfig = deps.config ?? config;
  const isFresh = deps.isSessionFresh ?? isSessionFresh;
  const persist = deps.persistSession ?? persistSession;
  const chromiumLauncher = deps.chromiumLauncher ?? chromium;
  const idamFactory = deps.idamPageFactory ?? ((page) => new IdamPage(page));
  const lockfileApi = deps.lockfile ?? lockfile;
  const force = deps.force ?? false;

  const sessionsDir = path.join(process.cwd(), '.sessions');
  ensureDirectory(fsApi, sessionsDir);

  for (const id of identifiers) {
    const { email, password } = userUtils.getUserCredentials(id);
    const sessionPath = path.join(sessionsDir, `${email}.storage.json`);
    const lockFilePath = path.join(sessionsDir, `${email}.lock`);

    ensureDirectory(fsApi, sessionsDir);
    ensureLockFile(fsApi, lockFilePath);

    // Acquire filesystem lock (blocks across all workers)
    let release: (() => Promise<void>) | null = null;
    try {
      logger.info('Attempting to acquire lock for user', {
        userIdentifier: id,
        lockFilePath,
        operation: 'session-capture',
      });

      release = await lockfileApi.lock(lockFilePath, {
        retries: {
          retries: 30,
          minTimeout: 1000,
          maxTimeout: 5000,
        },
        stale: 60000, // Consider lock stale after 60s
      });

      logger.info('Lock acquired', {
        userIdentifier: id,
        operation: 'session-capture',
      });

      // Recheck freshness after acquiring lock (another worker may have logged in)
      if (!force && isFresh(sessionPath)) {
        logger.info('Session became fresh while waiting for lock', {
          userIdentifier: id,
          email,
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
        email,
        password,
        sessionPath,
        persist,
        userIdentifier: id,
      });
    } finally {
      // Always release lock
      if (release) {
        try {
          await release();
          logger.info('Lock released', {
            userIdentifier: id,
            operation: 'session-capture',
          });
        } catch (e) {
          logger.warn('Failed to release lock', {
            userIdentifier: id,
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
  sessionCaptureWith,
  persistSession,
};
