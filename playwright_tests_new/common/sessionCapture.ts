import { chromium } from '@playwright/test';
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

type SessionCaptureDeps = {
  chromiumLauncher?: typeof chromium;
  userUtils?: UserUtils;
  idamPageFactory?: (page: any) => { login: (creds: { username: string; password: string }) => Promise<void> };
  isSessionFresh?: typeof isSessionFresh;
  persistSession?: typeof persistSession;
  fs?: typeof fs;
  config?: typeof config;
  env?: NodeJS.ProcessEnv;
  lockfile?: typeof lockfile;
};

/**
 * Ensure session is captured for a given userIdentifier before tests run.
 * Call this in test.beforeAll() to lazily capture only needed sessions.
 */
export async function ensureSession(userIdentifier: string): Promise<void> {
  const userUtils = new UserUtils();
  const creds = userUtils.getUserCredentials(userIdentifier);
  const email = creds.email;
  const sessionPath = path.join(process.cwd(), '.sessions', `${email}.storage.json`);
  
  if (!isSessionFresh(sessionPath)) {
    logger.info('Session missing or stale, capturing lazily', { 
      userIdentifier, 
      email,
      operation: 'lazy-capture',
      metric: 'session-miss'
    });
    await sessionCapture([userIdentifier]);
  } else {
    logger.info('Session is fresh, skipping capture', { 
      userIdentifier, 
      email,
      operation: 'lazy-capture',
      metric: 'session-hit'
    });
  }
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
          operation: 'load-session'
        });
      } else {
        logger.warn('Cookies missing or invalid in storage file', { 
          storageFile, 
          userIdentifier,
          operation: 'load-session'
        });
      }
    } catch (e) {
      logger.error('Failed parsing storage state - cleaning up and throwing', { 
        userIdentifier, 
        storageFile, 
        error: (e as Error).message,
        operation: 'load-session'
      });
      // Auto-clean corrupted session file
      try {
        fs.unlinkSync(storageFile);
        logger.info('Deleted corrupted session file', { storageFile });
      } catch (cleanupError) {
        logger.warn('Failed to delete corrupted session file', { 
          storageFile, 
          error: (cleanupError as Error).message 
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
      operation: 'load-session'
    });
    throw new StorageStateCorruptedError(
      `Failed parsing storage file for ${userIdentifier}`,
      storageFile,
      { userIdentifier }
    );
  }
  return { email, cookies, storageFile };
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
        if (!fsApi.existsSync(sessionPath)) return false;        
        const stat = fsApi.statSync(sessionPath);
        const ageMs = now() - stat.mtimeMs;
        return ageMs < maxAgeMs;
    } catch (err) {
        logger.warn('Failed to stat session file', { 
          sessionPath, 
          error: (err as Error).message,
          operation: 'check-session-freshness'
        });
        return false;
    }
}

// local helper to persist session: write session file, add cookies to context and save storageState
async function persistSession(
    localSessionPath: string,
    localCookies: any[],
    ctx: any,
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
          operation: 'persist-session'
        });
    } catch (err) {
        logger.error('Failed to persist storage state', { 
          userIdentifier: uid, 
          sessionPath: localSessionPath,
          error: (err as Error).message,
          operation: 'persist-session'
        });
        throw err;
    }
}

export async function sessionCapture(identifiers: string[]) {
    return sessionCaptureWith(identifiers);
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

    const sessionsDir = path.join(process.cwd(), '.sessions');
    if (!fsApi.existsSync(sessionsDir)) {
        fsApi.mkdirSync(sessionsDir, { recursive: true });
    }

    for (const id of identifiers) {
        const { email, password } = userUtils.getUserCredentials(id);
        const sessionPath = path.join(sessionsDir, `${email}.storage.json`);
        const lockFilePath = path.join(sessionsDir, `${email}.lock`);

        // Ensure lock file directory exists
        if (!fsApi.existsSync(sessionsDir)) {
            fsApi.mkdirSync(sessionsDir, { recursive: true });
        }

        // Create lock file if it doesn't exist
        if (!fsApi.existsSync(lockFilePath)) {
            fsApi.writeFileSync(lockFilePath, '', 'utf8');
        }

        // Acquire filesystem lock (blocks across all workers)
        let release: (() => Promise<void>) | null = null;
        try {
            logger.info('Attempting to acquire lock for user', { 
              userIdentifier: id,
              lockFilePath,
              operation: 'session-capture'
            });
            
            release = await lockfileApi.lock(lockFilePath, {
                retries: {
                    retries: 30,
                    minTimeout: 1000,
                    maxTimeout: 5000
                },
                stale: 60000 // Consider lock stale after 60s
            });

            logger.info('Lock acquired', { 
              userIdentifier: id,
              operation: 'session-capture'
            });

            // Recheck freshness after acquiring lock (another worker may have logged in)
            if (isFresh(sessionPath)) {
                logger.info('Session became fresh while waiting for lock', { 
                  userIdentifier: id, 
                  email, 
                  sessionPath,
                  operation: 'session-capture'
                });
                continue;
            }

            // Perform login
            const browser = await chromiumLauncher.launch();
            const context = await browser.newContext();
            const page = await context.newPage();
            const idamPage = idamFactory(page);
            const targetUrl = env.TEST_URL || activeConfig.urls.exuiDefaultUrl;
            logger.info('Logging in to EXUI', { 
              userIdentifier: id, 
              email, 
              targetUrl,
              operation: 'session-capture'
            });
            try {
                await page.goto(targetUrl);
                await page.waitForSelector('#username', { timeout: 60000 });
                await idamPage.login({ username: email, password });
                // Wait for presence of the standard EXUI header component to confirm the app shell loaded.
                try {
                    await page.waitForSelector('exui-header', { timeout: 60000 });
                    logger.info('EXUI header detected', { 
                      userIdentifier: id,
                      operation: 'session-capture'
                    });
                } catch (error_) {
                    logger.warn('EXUI header not detected within timeout', { 
                      userIdentifier: id, 
                      timeout: 60000,
                      error: (error_ as Error).message,
                      operation: 'session-capture'
                    });
                }
            } catch (e) {
                logger.error('Login failed', { 
                  userIdentifier: id, 
                  email, 
                  targetUrl,
                  error: (e as Error).message,
                  operation: 'session-capture'
                });
                throw new SessionCaptureError(
                  `Login failed for ${id}`,
                  id,
                  { email, targetUrl },
                  e as Error
                );
            }

            const cookies = await context.cookies();
            await persist(sessionPath, cookies, context, id);
            await browser.close();

        } finally {
            // Always release lock
            if (release) {
                try {
                    await release();
                    logger.info('Lock released', { 
                      userIdentifier: id,
                      operation: 'session-capture'
                    });
                } catch (e) {
                    logger.warn('Failed to release lock', { 
                      userIdentifier: id, 
                      lockFilePath,
                      error: (e as Error).message,
                      operation: 'session-capture'
                    });
                }
            }
        }
    }
}

export const __test__ = {
    sessionCaptureWith,
    persistSession
};
