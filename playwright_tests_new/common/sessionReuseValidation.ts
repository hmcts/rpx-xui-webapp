import { request } from '@playwright/test';

// A logout invalidates the server-side session without changing the storage-state file.
// Keep this short so a reused identity is rechecked promptly without probing before every test.
const SESSION_REUSE_VALIDATION_CACHE_MS = 15_000;
const SESSION_REUSE_UNAVAILABLE_CACHE_MS = 15_000;
const AUTH_STATUS_TIMEOUT_MS = 15_000;
const validatedSessionStates = new Map<string, { result: SessionReuseValidationResult; validUntil: number }>();

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
  const cacheKey = `${session.storageFile}:${session.storageStateFingerprint}`;
  const cached = validatedSessionStates.get(cacheKey);
  if (cached && cached.validUntil > now()) {
    return cached.result;
  }

  let context: RequestContext | undefined;
  try {
    context = await createRequestContext({
      baseURL: targetUrl,
      ignoreHTTPSErrors: true,
      storageState: session.storageFile,
    });
    const response = await context.get('/auth/isAuthenticated', { failOnStatusCode: false, timeout: AUTH_STATUS_TIMEOUT_MS });
    const result: SessionReuseValidationResult =
      response.status() === 200 && parseAuthenticatedResponse(await response.text()) ? 'authenticated' : 'unauthenticated';
    validatedSessionStates.set(cacheKey, { result, validUntil: now() + SESSION_REUSE_VALIDATION_CACHE_MS });
    return result;
  } catch {
    validatedSessionStates.set(cacheKey, { result: 'unavailable', validUntil: now() + SESSION_REUSE_UNAVAILABLE_CACHE_MS });
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
