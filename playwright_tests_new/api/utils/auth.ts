import { promises as fs } from 'node:fs';
import * as fsSync from 'node:fs';
import { createHash } from 'node:crypto';
import * as path from 'node:path';
import * as lockfile from 'proper-lockfile';

import { IdamUtils, ServiceAuthUtils, createLogger } from '@hmcts/playwright-common';
import { request } from '@playwright/test';

import { config } from './apiTestRuntimeConfig';
import { AuthenticationError, ConfigurationError } from './errors';
import { AAT_AUTH_UNAVAILABLE_FAILURE, shouldRejectUnavailableSessionValidation } from '../../common/sessionReusePolicy.js';
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
type AuthRequestContext = AuthCheckContext & {
  post: (url: string, options?: Record<string, unknown>) => Promise<AuthCheckResponse>;
  storageState: (options?: { path?: string }) => Promise<unknown>;
  dispose: () => Promise<void>;
};
type AuthRequestFactory = (options: Parameters<typeof request.newContext>[0]) => Promise<AuthRequestContext>;

type StorageDeps = {
  createStorageState: (role: ApiUserRole) => Promise<string>;
  tryReadState: (storagePath: string) => Promise<StorageState | undefined>;
  unlink: (path: string) => Promise<void>;
  validateStorageState?: (storagePath: string) => Promise<StorageValidationResult>;
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
  requestFactory?: AuthRequestFactory;
  logger?: LoggerInstance;
  readState?: typeof tryReadState;
  authCheckAttempts?: number;
  authCheckDelayMs?: number;
};

type FormLoginDeps = {
  requestFactory?: AuthRequestFactory;
  authCheckAttempts?: number;
  authCheckDelayMs?: number;
};

type AuthCheckResponse = {
  status: () => number;
  url?: () => string;
  headers?: () => Record<string, string>;
  text?: () => Promise<string>;
  json?: () => Promise<unknown>;
};

type LoginForm = {
  action: string;
  hiddenFields: Record<string, string>;
  hasEmail: boolean;
  hasUsername: boolean;
  hasPassword: boolean;
};

type AuthCheckResult = {
  isAuthenticated: boolean;
  status: number;
  contentType?: string;
  bodyPreview?: string;
};

type StorageValidationResult = 'authenticated' | 'unauthenticated' | 'unavailable';

type AuthCheckContext = {
  get: (url: string, options?: Record<string, unknown>) => Promise<AuthCheckResponse>;
};

function getGatewayReference(response: AuthCheckResponse): string | undefined {
  const headers = response.headers?.();
  if (!headers) {
    return undefined;
  }

  return headers['x-azure-ref'] ?? headers['x-request-id'] ?? headers['x-correlation-id'];
}

function describeLoginRouteFailure(response: AuthCheckResponse): string {
  const gatewayReference = getGatewayReference(response);
  const gatewayDetail = gatewayReference ? `; gatewayRef=${gatewayReference}` : '';
  return `XUI authentication route unavailable before IDAM form submission${gatewayDetail}`;
}

const defaultStorageDeps: StorageDeps = {
  createStorageState,
  tryReadState,
  unlink: fs.unlink,
  validateStorageState: validateStorageState,
  lockfile,
};

const validatedStorageStates = new Map<string, { mtimeMs: number; validUntil: number }>();
// A logout invalidates the server-side session without changing the storage-state file.
const STORAGE_VALIDATION_CACHE_MS = 15_000;

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
    const storagePath = getStoragePath(storageRoot, role);
    const state = await deps.tryReadState(storagePath);

    if (state && isStorageStateFresh(storagePath)) {
      const validation = await (deps.validateStorageState ?? validateStorageState)(storagePath);
      if (validation === 'authenticated') {
        logger.info('Storage state is fresh and authenticated (another worker logged in)', { role, cacheKey });
        return storagePath;
      }
      if (validation === 'unavailable') {
        if (shouldRejectUnavailableSessionValidation(validation)) {
          throw new AuthenticationError(
            `Unable to validate cached API storage state for ${role}; auth/isAuthenticated is unavailable`,
            role,
            { failureKind: AAT_AUTH_UNAVAILABLE_FAILURE, storagePath }
          );
        }
        logger.warn('Unable to validate fresh storage state; preserving it rather than amplifying a downstream outage', {
          role,
          cacheKey,
        });
        return storagePath;
      }
      logger.info('Storage state was rejected by auth/isAuthenticated, refreshing', { role, cacheKey });
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
  const storagePath = getStoragePath(root, role);
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
    const authStatus = await waitForAuthenticated(context, {
      attempts: deps.authCheckAttempts,
      delayMs: deps.authCheckDelayMs,
    });

    await context.storageState({ path: storagePath });
    const state = await readState(storagePath);
    const hasCookies = Array.isArray(state?.cookies) && state.cookies.length > 0;

    if (authStatus.isAuthenticated && hasCookies) {
      return true;
    }
    activeLogger.warn(
      `Token bootstrap for role "${role}" returned isAuthenticated=${String(authStatus.isAuthenticated)}; falling back to form login`
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
  const context = await requestFactory({
    baseURL: baseUrl,
    ignoreHTTPSErrors: true,
    maxRedirects: 10,
  });

  try {
    const loginPage = await context.get('auth/login');
    if (loginPage.status() >= 400) {
      const diagnosis = describeLoginRouteFailure(loginPage);
      throw new AuthenticationError(`GET /auth/login responded with ${loginPage.status()} (${diagnosis})`, role, {
        endpoint: 'auth/login',
        status: loginPage.status(),
        diagnosis,
        gatewayReference: getGatewayReference(loginPage),
      });
    }

    const loginUrl = loginPage.url?.() ?? `${baseUrl}/auth/login`;
    const loginForm = parseLoginForm(await loginPage.text(), loginUrl);
    const loginResponse = await submitLoginForm(context, loginForm, credentials, role);

    if (loginForm.hasEmail && !loginForm.hasPassword) {
      const passwordPageUrl = loginResponse.url?.() ?? loginUrl;
      const passwordHtml = await loginResponse.text?.();
      if (!passwordHtml) {
        throw new AuthenticationError('Progressive IDAM password page was empty', role, {
          endpoint: passwordPageUrl,
          status: loginResponse.status(),
        });
      }

      const passwordForm = parseLoginForm(passwordHtml, passwordPageUrl);
      if (!passwordForm.hasPassword) {
        throw new AuthenticationError('Progressive IDAM password form was not found', role, {
          endpoint: passwordPageUrl,
          status: loginResponse.status(),
        });
      }
      await submitLoginForm(context, passwordForm, credentials, role);
    }

    // Ensure XSRF/session cookies are refreshed on the application domain
    await context.get('/');
    const authStatus = await waitForAuthenticated(context, {
      attempts: deps.authCheckAttempts,
      delayMs: deps.authCheckDelayMs,
    });
    if (!authStatus.isAuthenticated) {
      throw new AuthenticationError(
        `Login failed for role "${role}" (auth/isAuthenticated returned ${authStatus.status}; content-type=${authStatus.contentType ?? 'unknown'}; body=${authStatus.bodyPreview ?? '<empty>'})`,
        role,
        {
          endpoint: 'auth/isAuthenticated',
          status: authStatus.status,
          contentType: authStatus.contentType,
          bodyPreview: authStatus.bodyPreview,
        }
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

async function submitLoginForm(
  context: AuthRequestContext,
  form: LoginForm,
  credentials: { username: string; password: string },
  role: ApiUserRole
): Promise<AuthCheckResponse> {
  const formPayload: Record<string, string> = { ...form.hiddenFields };
  if (form.hasEmail) formPayload.email = credentials.username;
  if (form.hasUsername) formPayload.username = credentials.username;
  if (form.hasPassword) formPayload.password = credentials.password;
  formPayload.save = form.hasPassword ? 'Sign in' : 'Continue';

  const response = await context.post(form.action, { form: formPayload });
  if (response.status() >= 400) {
    throw new AuthenticationError(`POST ${form.action} responded with ${response.status()}`, role, {
      endpoint: form.action,
      status: response.status(),
      method: 'POST',
    });
  }
  return response;
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

function parseLoginForm(html: string, pageUrl: string): LoginForm {
  const formMatch = /<form\b([^>]*)>/i.exec(html);
  const formAttributes = formMatch?.[1] ?? '';
  const actionMatch = /\baction=["']([^"']*)["']/i.exec(formAttributes);
  const action = new URL(actionMatch?.[1] || pageUrl, pageUrl).toString();
  const formEnd = formMatch ? html.indexOf('</form>', formMatch.index) : -1;
  const formHtml = formMatch && formEnd >= 0 ? html.slice(formMatch.index, formEnd) : html;
  const hiddenFields: Record<string, string> = {};
  for (const input of formHtml.match(/<input\b[^>]*type=["']hidden["'][^>]*>/gi) ?? []) {
    const name = /\bname=["']([^"']+)["']/i.exec(input)?.[1];
    const value = /\bvalue=["']([^"']*)["']/i.exec(input)?.[1];
    if (name && value !== undefined) hiddenFields[name] = value;
  }
  return {
    action,
    hiddenFields,
    hasEmail: /<input\b[^>]*(?:name|id)=["'](?:email|emailAddress)["'][^>]*>/i.test(formHtml),
    hasUsername: /<input\b[^>]*(?:name|id)=["']username["'][^>]*>/i.test(formHtml),
    hasPassword: /<input\b[^>]*type=["']password["'][^>]*>/i.test(formHtml),
  };
}

async function readAuthCheck(response: AuthCheckResponse): Promise<AuthCheckResult> {
  const status = response.status();
  const headers = typeof response.headers === 'function' ? response.headers() : {};
  const contentType = headers['content-type'] ?? headers['Content-Type'];
  const body = await readResponseBody(response);
  const bodyPreview = previewBody(body);

  if (status !== 200) {
    return { isAuthenticated: false, status, contentType, bodyPreview };
  }

  return {
    isAuthenticated: parseAuthValue(body),
    status,
    contentType,
    bodyPreview,
  };
}

async function waitForAuthenticated(
  context: AuthCheckContext,
  options: { attempts?: number; delayMs?: number } = {}
): Promise<AuthCheckResult> {
  const attempts = readPositiveInteger(options.attempts, process.env.API_AUTH_CHECK_ATTEMPTS, 5);
  const delayMs = readPositiveInteger(options.delayMs, process.env.API_AUTH_CHECK_DELAY_MS, 1000, { allowZero: true });
  let lastResult: AuthCheckResult | undefined;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    const authCheck = await context.get('auth/isAuthenticated', { failOnStatusCode: false });
    lastResult = await readAuthCheck(authCheck);
    if (lastResult.isAuthenticated || lastResult.status !== 200 || attempt === attempts) {
      return lastResult;
    }
    await sleep(delayMs);
  }

  return lastResult ?? { isAuthenticated: false, status: 0 };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readPositiveInteger(
  override: number | undefined,
  envValue: string | undefined,
  fallback: number,
  options: { allowZero?: boolean } = {}
): number {
  const value = override ?? (envValue ? Number.parseInt(envValue, 10) : fallback);
  if (!Number.isFinite(value)) {
    return fallback;
  }
  const minimum = options.allowZero ? 0 : 1;
  return Math.max(minimum, value);
}

async function readResponseBody(response: AuthCheckResponse): Promise<string | undefined> {
  if (typeof response.text === 'function') {
    return response.text().catch(() => undefined);
  }
  if (typeof response.json === 'function') {
    return response
      .json()
      .then((value) => JSON.stringify(value))
      .catch(() => undefined);
  }
  return undefined;
}

function parseAuthValue(body: string | undefined): boolean {
  if (!body) {
    return false;
  }

  const trimmed = body.trim();
  if (trimmed === 'true') {
    return true;
  }
  if (trimmed === 'false') {
    return false;
  }

  try {
    const parsed = JSON.parse(trimmed);
    if (typeof parsed === 'boolean') {
      return parsed;
    }
    if (parsed && typeof parsed === 'object' && typeof (parsed as { isAuthenticated?: unknown }).isAuthenticated === 'boolean') {
      return (parsed as { isAuthenticated: boolean }).isAuthenticated;
    }
  } catch {
    // Non-JSON 200 responses are treated as unauthenticated and reported with a body preview.
  }

  return false;
}

function previewBody(body: string | undefined): string | undefined {
  return body?.replace(/\s+/g, ' ').trim().slice(0, 200);
}

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

function getCacheKey(role: ApiUserRole): string {
  return getCacheKeyForIdentity(config.testEnv, role, getCredentials(role).username);
}

function getCacheKeyForIdentity(testEnvironment: string, role: ApiUserRole, username: string): string {
  const normalizedUsername = username.trim().toLowerCase();
  const identityHash = createHash('sha256').update(normalizedUsername).digest('hex').slice(0, 16);
  return `${testEnvironment}-${role}-${identityHash}`;
}

function getStoragePath(root: string, role: ApiUserRole): string {
  return path.join(root, `api-${getCacheKey(role)}.storage.json`);
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

async function validateStorageState(storagePath: string): Promise<StorageValidationResult> {
  let stat: fsSync.Stats;
  try {
    stat = fsSync.statSync(storagePath);
  } catch {
    return 'unauthenticated';
  }

  const cached = validatedStorageStates.get(storagePath);
  if (cached?.mtimeMs === stat.mtimeMs && cached.validUntil > Date.now()) {
    return 'authenticated';
  }

  let context: AuthRequestContext | undefined;
  try {
    context = await request.newContext({
      baseURL: baseUrl,
      ignoreHTTPSErrors: true,
      storageState: storagePath,
    });
    const result = await waitForAuthenticated(context, { attempts: 1, delayMs: 0 });
    if (!result.isAuthenticated) {
      return 'unauthenticated';
    }
    validatedStorageStates.set(storagePath, {
      mtimeMs: stat.mtimeMs,
      validUntil: Date.now() + STORAGE_VALIDATION_CACHE_MS,
    });
    return 'authenticated';
  } catch (error) {
    logger.warn(`Unable to validate cached API storage state: ${formatUnknownError(error)}`);
    return 'unavailable';
  } finally {
    try {
      await context?.dispose();
    } catch {
      // A cleanup failure must not discard a completed authentication check.
    }
  }
}

export const __test__ = {
  extractCsrf,
  parseLoginForm,
  stripTrailingSlash,
  getCacheKey,
  getCacheKeyForIdentity,
  getStoragePath,
  isTokenBootstrapEnabled,
  isStorageStateFresh,
  validateStorageState,
  tryReadState,
  ensureStorageStateWith,
  getStoredCookieWith,
  createStorageStateWith,
  tryTokenBootstrap,
  createStorageStateViaForm,
  describeLoginRouteFailure,
  getCredentials,
  readAuthCheck,
  waitForAuthenticated,
  parseAuthValue,
};
