import { promises as fs } from 'node:fs';
import * as fsSync from 'node:fs';
import * as path from 'node:path';
import * as lockfile from 'proper-lockfile';

import { IdamUtils, ServiceAuthUtils, createLogger } from '@hmcts/playwright-common';
import { request } from '@playwright/test';

import { config } from '../../common/apiTestConfig';
import { AuthenticationError, ConfigurationError } from './errors';
type UsersConfig = (typeof config.users)[keyof typeof config.users];
export type ApiUserRole = keyof UsersConfig;

const baseUrl = stripTrailingSlash(config.baseUrl);
// Unified storage location: share .sessions/ with E2E tests
// API sessions use 'api-' prefix to distinguish from E2E browser sessions
const storageRoot = path.resolve(process.cwd(), '.sessions');
// Note: storagePromises Map removed - replaced with filesystem-based locking
// for proper cross-worker coordination (same approach as E2E sessionCapture.ts)

const logger = createLogger({ serviceName: 'node-api-auth', format: 'pretty' });
type LoggerInstance = ReturnType<typeof createLogger>;

function formatUnknownError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  try {
    return JSON.stringify(error);
  } catch {
    return 'Unknown error';
  }
}

function toError(error: unknown): Error {
  return error instanceof Error ? error : new Error(formatUnknownError(error));
}

type StorageState = { cookies?: Array<{ name?: string; value?: string }> };

type StorageDeps = {
  createStorageState: (role: ApiUserRole) => Promise<string>;
  tryReadState: (storagePath: string) => Promise<StorageState | undefined>;
  unlink: (path: string) => Promise<void>;
  lockfile?: typeof lockfile;
};

type CreateStorageDeps = {
  storageRoot?: string;
  mkdir?: typeof fs.mkdir;
  getCredentials?: typeof getCredentials;
  isTokenBootstrapEnabled?: typeof isTokenBootstrapEnabled;
  tryTokenBootstrap?: typeof tryTokenBootstrap;
  createStorageStateViaForm?: typeof createStorageStateViaForm;
};

type TokenBootstrapDeps = {
  env?: NodeJS.ProcessEnv;
  idamUtils?: { generateIdamToken: (opts: Record<string, unknown>) => Promise<string> };
  serviceAuthUtils?: { retrieveToken: (opts: Record<string, unknown>) => Promise<string> };
  requestFactory?: typeof request.newContext;
  logger?: LoggerInstance;
  readState?: typeof tryReadState;
};

type FormLoginDeps = {
  requestFactory?: typeof request.newContext;
  extractCsrf?: typeof extractCsrf;
};

const defaultStorageDeps: StorageDeps = {
  createStorageState,
  tryReadState,
  unlink: fs.unlink,
  lockfile,
};

export async function ensureStorageState(role: ApiUserRole): Promise<string> {
  return ensureStorageStateWith(role);
}

async function ensureStorageStateWith(role: ApiUserRole, deps: StorageDeps = defaultStorageDeps): Promise<string> {
  const cacheKey = getCacheKey(role);
  const lockFilePath = path.join(storageRoot, `api-${cacheKey}.lock`);
  const lock = deps.lockfile ?? lockfile;

  // Ensure lock directory exists
  await fs.mkdir(storageRoot, { recursive: true });

  // Create lock file if it doesn't exist (required by proper-lockfile)
  if (!fsSync.existsSync(lockFilePath)) {
    fsSync.writeFileSync(lockFilePath, '', 'utf8');
  }

  // Acquire filesystem lock to coordinate across all workers (and with E2E tests)
  const release = await lock.lock(lockFilePath, {
    retries: {
      retries: 30,
      minTimeout: 1000,
      maxTimeout: 5000,
    },
    stale: 60000,
  });

  try {
    // Double-check freshness after acquiring lock (another worker/test suite may have logged in)
    const storagePath = path.join(storageRoot, `api-${config.testEnv}-${role}.storage.json`);
    let state = await deps.tryReadState(storagePath);

    if (state && isStorageStateFresh(storagePath)) {
      logger.info('Storage state is fresh (another worker logged in)', { role, cacheKey });
      return storagePath;
    }

    // State missing, stale, or corrupted - create new one
    if (!state) {
      logger.info('Storage state missing or corrupted, creating new one', { role, cacheKey });
      try {
        await deps.unlink(storagePath);
      } catch {
        // ignore unlink errors
      }
    } else {
      logger.info('Storage state stale, refreshing', { role, cacheKey });
    }

    return await deps.createStorageState(role);
  } finally {
    await release();
  }
}

export async function getStoredCookie(role: ApiUserRole, cookieName: string): Promise<string | undefined> {
  return getStoredCookieWith(role, cookieName);
}

async function getStoredCookieWith(
  role: ApiUserRole,
  cookieName: string,
  deps: StorageDeps = defaultStorageDeps
): Promise<string | undefined> {
  const storagePath = await ensureStorageStateWith(role, deps);
  const state = await deps.tryReadState(storagePath);

  if (!state) {
    throw new Error(`Unable to read storage state for role "${role}" after ensure.`);
  }

  const cookie = Array.isArray(state.cookies) ? state.cookies.find((c: { name?: string }) => c.name === cookieName) : undefined;
  return cookie?.value;
}

async function createStorageState(role: ApiUserRole): Promise<string> {
  return createStorageStateWith(role);
}

async function createStorageStateWith(role: ApiUserRole, deps: CreateStorageDeps = {}): Promise<string> {
  const root = deps.storageRoot ?? storageRoot;
  const mkdir = deps.mkdir ?? fs.mkdir;
  const credentials = (deps.getCredentials ?? getCredentials)(role);
  const shouldTokenBootstrap = (deps.isTokenBootstrapEnabled ?? isTokenBootstrapEnabled)();
  const tryBootstrap = deps.tryTokenBootstrap ?? tryTokenBootstrap;
  const loginViaForm = deps.createStorageStateViaForm ?? createStorageStateViaForm;

  // Use 'api-' prefix to distinguish from E2E browser sessions in same directory
  const storagePath = path.join(root, `api-${config.testEnv}-${role}.storage.json`);
  await mkdir(path.dirname(storagePath), { recursive: true });

  const tokenLoginSucceeded = shouldTokenBootstrap ? await tryBootstrap(role, credentials, storagePath) : false;

  if (!tokenLoginSucceeded) {
    await loginViaForm(credentials, storagePath, role);
  }

  return storagePath;
}

async function tryTokenBootstrap(
  role: ApiUserRole,
  credentials: { username: string; password: string },
  storagePath: string,
  deps: TokenBootstrapDeps = {}
): Promise<boolean> {
  const env = deps.env ?? process.env;
  const clientId = env.IDAM_CLIENT_ID ?? env.SERVICES_IDAM_CLIENT_ID ?? 'xuiwebapp';
  const clientSecret = env.IDAM_SECRET;
  const scope = env.IDAM_OAUTH2_SCOPE ?? 'openid profile roles manage-user search-user';
  const microservice = env.S2S_MICROSERVICE_NAME ?? env.MICROSERVICE ?? 'xui_webapp';
  const idamWebUrl = env.IDAM_WEB_URL;
  const idamTestingSupportUrl = env.IDAM_TESTING_SUPPORT_URL;
  const s2sUrl = env.S2S_URL;

  if (!clientSecret || !idamWebUrl || !idamTestingSupportUrl || !s2sUrl) {
    return false;
  }

  const activeLogger = deps.logger ?? logger;
  const idamUtils = deps.idamUtils ?? new IdamUtils({ logger: activeLogger });
  const serviceAuthUtils = deps.serviceAuthUtils ?? new ServiceAuthUtils({ logger: activeLogger });
  const requestFactory = deps.requestFactory ?? ((options) => request.newContext(options));
  const readState = deps.readState ?? tryReadState;

  let context;
  try {
    const accessToken = await idamUtils.generateIdamToken({
      grantType: 'password',
      clientId,
      clientSecret,
      scope,
      username: credentials.username,
      password: credentials.password,
      redirectUri: env.IDAM_RETURN_URL ?? `${baseUrl}/oauth2/callback`,
    });
    const serviceToken = await serviceAuthUtils.retrieveToken({ microservice });

    context = await requestFactory({
      baseURL: baseUrl,
      ignoreHTTPSErrors: true,
      extraHTTPHeaders: {
        Authorization: `Bearer ${accessToken}`,
        ServiceAuthorization: `Bearer ${serviceToken}`,
      },
    });

    // Touch auth endpoints so the gateway can create a session + xsrf cookies.
    await context.get('auth/login', { failOnStatusCode: false });
    const authCheck = await context.get('auth/isAuthenticated', { failOnStatusCode: false });
    const isAuth = authCheck.status() === 200 ? await authCheck.json().catch(() => false) : false;

    await context.storageState({ path: storagePath });
    const state = await readState(storagePath);
    const hasCookies = Array.isArray(state?.cookies) && state.cookies.length > 0;

    if (isAuth && hasCookies) {
      return true;
    }
    activeLogger.warn(
      `Token bootstrap for role "${role}" returned isAuthenticated=${String(isAuth)}; falling back to form login`
    );
    return false;
  } catch (error) {
    activeLogger.warn(`Token bootstrap failed for role "${role}": ${formatUnknownError(error)}`);
    return false;
  } finally {
    await context?.dispose();
  }
}

async function createStorageStateViaForm(
  credentials: { username: string; password: string },
  storagePath: string,
  role: ApiUserRole,
  deps: FormLoginDeps = {}
): Promise<void> {
  const requestFactory = deps.requestFactory ?? ((options) => request.newContext(options));
  const extract = deps.extractCsrf ?? extractCsrf;
  const context = await requestFactory({
    baseURL: baseUrl,
    ignoreHTTPSErrors: true,
    maxRedirects: 10,
  });

  try {
    const loginPage = await context.get('auth/login');
    if (loginPage.status() >= 400) {
      throw new AuthenticationError(`GET /auth/login responded with ${loginPage.status()}`, role, {
        endpoint: 'auth/login',
        status: loginPage.status(),
      });
    }

    const loginUrl = loginPage.url();
    const csrfToken = extract(await loginPage.text());
    const formPayload: Record<string, string> = {
      username: credentials.username,
      password: credentials.password,
      save: 'Sign in',
    };
    if (csrfToken) {
      formPayload._csrf = csrfToken;
    }

    const loginResponse = await context.post(loginUrl, { form: formPayload });
    if (loginResponse.status() >= 400) {
      throw new AuthenticationError(`POST ${loginUrl} responded with ${loginResponse.status()}`, role, {
        endpoint: loginUrl,
        status: loginResponse.status(),
        method: 'POST',
      });
    }

    // Ensure XSRF/session cookies are refreshed on the application domain
    await context.get('/');
    const authCheck = await context.get('auth/isAuthenticated', { failOnStatusCode: false });
    let isAuth = false;
    if (authCheck.status() === 200 && typeof authCheck.json === 'function') {
      isAuth = await authCheck.json().catch(() => false);
    }
    if (!isAuth) {
      throw new AuthenticationError(
        `Login failed for role "${role}" (auth/isAuthenticated returned ${authCheck.status()})`,
        role,
        { endpoint: 'auth/isAuthenticated', status: authCheck.status() }
      );
    }
    await context.storageState({ path: storagePath });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      throw error;
    }
    throw new AuthenticationError(`Failed to login as ${role}`, role, { storagePath }, toError(error));
  } finally {
    await context.dispose();
  }
}

function getCredentials(role: ApiUserRole): { username: string; password: string } {
  const envUsers = config.users[config.testEnv as keyof typeof config.users];
  const userConfig = envUsers?.[role];
  if (!userConfig) {
    throw new ConfigurationError(
      `No credentials configured for role "${role}" in environment "${config.testEnv}"`,
      `users.${config.testEnv}.${role}`,
      { role, testEnv: config.testEnv }
    );
  }

  return {
    username: userConfig.e,
    password: userConfig.sec,
  };
}

function extractCsrf(html: string): string | undefined {
  const match = /name="_csrf"\s+value="([^"]+)"/i.exec(html);
  return match?.[1];
}

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

function getCacheKey(role: ApiUserRole): string {
  return `${config.testEnv}-${role}`;
}

async function tryReadState(storagePath: string): Promise<{ cookies?: Array<{ name?: string }> } | undefined> {
  try {
    const raw = await fs.readFile(storagePath, 'utf8');
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return parsed;
    }
  } catch {
    // swallow and signal failure
  }
  return undefined;
}

function isTokenBootstrapEnabled(): boolean {
  const mode = process.env.API_AUTH_MODE ?? process.env.API_USE_TOKEN_LOGIN;
  if (mode && ['form', 'off', 'false', '0', 'no'].includes(mode.toLowerCase())) {
    return false;
  }
  if (mode && ['token', 'true', '1', 'yes'].includes(mode.toLowerCase())) {
    return true;
  }
  // Default: attempt token bootstrap when required IDAM/S2S env vars exist; otherwise fall back to form.
  const hasIdamEnv = !!process.env.IDAM_SECRET && !!process.env.IDAM_WEB_URL && !!process.env.IDAM_TESTING_SUPPORT_URL;
  const hasS2S = !!process.env.S2S_URL;
  return hasIdamEnv && hasS2S;
}

/**
 * Check if storage state is fresh (within 15 minutes TTL).
 * Matches E2E session freshness check for consistency.
 */
function isStorageStateFresh(storagePath: string, ttlMs: number = 15 * 60 * 1000): boolean {
  try {
    const stats = fsSync.statSync(storagePath);
    const age = Date.now() - stats.mtimeMs;
    return age < ttlMs;
  } catch {
    return false;
  }
}

export const __test__ = {
  extractCsrf,
  stripTrailingSlash,
  getCacheKey,
  isTokenBootstrapEnabled,
  isStorageStateFresh,
  tryReadState,
  ensureStorageStateWith,
  getStoredCookieWith,
  createStorageStateWith,
  tryTokenBootstrap,
  createStorageStateViaForm,
  getCredentials,
};
