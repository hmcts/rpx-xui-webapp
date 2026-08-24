import { request } from '@playwright/test';
import { createLogger } from '@hmcts/playwright-common';

// A logout invalidates the server-side session without changing the storage-state file.
// Keep this short so a reused identity is rechecked promptly without probing before every test.
const SESSION_REUSE_VALIDATION_CACHE_MS = 15_000;
const AUTH_STATUS_TIMEOUT_MS = 15_000;
const AUTH_STATUS_MAX_ATTEMPTS = 2;
const validatedSessionStates = new Map<string, { result: SessionReuseValidationResult; validUntil: number }>();
const validationGenerationByKey = new Map<string, number>();
const logger = createLogger({ serviceName: 'session-reuse-validation', format: 'pretty' });

export type SessionReuseValidationResult = 'authenticated' | 'unauthenticated' | 'unavailable';

type ReusableSessionState = {
  storageFile: string;
  storageStateFingerprint: string;
};

type RequestContext = Pick<Awaited<ReturnType<typeof request.newContext>>, 'get' | 'dispose'>;

type SessionReuseValidationDeps = {
  createRequestContext?: (options: Parameters<typeof request.newContext>[0]) => Promise<RequestContext>;
  now?: () => number;
};

export function parseAuthenticatedResponse(body: string): boolean {
  const trimmed = body.trim();
  if (trimmed === 'true') {
    return true;
  }
  try {
    const parsed = JSON.parse(trimmed);
    return (
      parsed === true ||
      (typeof parsed === 'object' && parsed !== null && (parsed as { isAuthenticated?: unknown }).isAuthenticated === true)
    );
  } catch {
    return false;
  }
}

export async function validateStoredSession(
  session: ReusableSessionState,
  targetUrl: string,
  deps: SessionReuseValidationDeps = {}
): Promise<SessionReuseValidationResult> {
  const now = deps.now ?? Date.now;
  const createRequestContext = deps.createRequestContext ?? request.newContext.bind(request);
  const targetOrigin = new URL(targetUrl).origin;
  const cacheKey = `${targetOrigin}:${session.storageFile}:${session.storageStateFingerprint}`;
  const cached = validatedSessionStates.get(cacheKey);
  if (cached && cached.validUntil > now()) {
    return cached.result;
  }
  const validationGeneration = (validationGenerationByKey.get(cacheKey) ?? 0) + 1;
  validationGenerationByKey.set(cacheKey, validationGeneration);
  const cacheResult = (result: SessionReuseValidationResult) => {
    if (validationGenerationByKey.get(cacheKey) === validationGeneration) {
      validatedSessionStates.set(cacheKey, { result, validUntil: now() + SESSION_REUSE_VALIDATION_CACHE_MS });
    }
    return result;
  };

  let context: RequestContext | undefined;
  let lastTransientStatus: number | undefined;
  let transportFailure = false;
  const logUnavailable = (message: string) =>
    logger.warn(message, {
      targetOrigin,
      attempts: AUTH_STATUS_MAX_ATTEMPTS,
      lastTransientStatus,
      transportFailure,
      operation: 'validate-session-reuse',
    });
  try {
    context = await createRequestContext({
      baseURL: targetUrl,
      ignoreHTTPSErrors: true,
      storageState: session.storageFile,
    });
    for (let attempt = 1; attempt <= AUTH_STATUS_MAX_ATTEMPTS; attempt += 1) {
      try {
        const response = await context.get('/auth/isAuthenticated', {
          failOnStatusCode: false,
          timeout: AUTH_STATUS_TIMEOUT_MS,
        });
        const status = response.status();
        if (status === 200) {
          const result: SessionReuseValidationResult = parseAuthenticatedResponse(await response.text())
            ? 'authenticated'
            : 'unauthenticated';
          return cacheResult(result);
        }
        if (![408, 429, 500, 502, 503, 504].includes(status)) {
          return cacheResult('unauthenticated');
        }
        lastTransientStatus = status;
      } catch {
        transportFailure = true;
        if (attempt === AUTH_STATUS_MAX_ATTEMPTS) {
          logUnavailable('Authentication validation unavailable after bounded retries');
          return 'unavailable';
        }
      }
    }
    logUnavailable('Authentication validation unavailable after bounded retries');
    return 'unavailable';
  } catch {
    logger.warn('Authentication validation request could not be created', {
      targetOrigin,
      operation: 'validate-session-reuse',
    });
    return 'unavailable';
  } finally {
    try {
      await context?.dispose();
    } catch {
      // The authentication result is still useful when only local request-context cleanup failed.
    }
  }
}

export const __test__ = { parseAuthenticatedResponse };
