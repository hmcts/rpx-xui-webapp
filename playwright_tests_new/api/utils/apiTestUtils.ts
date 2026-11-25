import { expect, test } from '@playwright/test';

import { ensureStorageState, getStoredCookie, type ApiUserRole } from './auth';
// Central map of commonly reused status code sets to reduce magic arrays in tests.
export const StatusSets = {
  guardedBasic: [200, 401, 403, 502, 504] as const,
  guardedExtended: [200, 401, 403, 404, 500, 502, 504] as const,
  actionWithConflicts: [200, 204, 400, 401, 403, 404, 409, 500, 502, 504] as const,
  allocateRole: [200, 201, 204, 400, 401, 403, 404, 409, 500, 502, 504] as const,
  roleAccessRead: [200, 400, 401, 403, 404, 500, 502, 504] as const,
  searchCases: [200, 400, 401, 403, 404, 500, 502, 504] as const,
  globalSearch: [200, 400, 401, 403, 500, 502, 504] as const,
  okOnly: [200] as const,
  okOrBadRequest: [200, 400, 403] as const,
  retryable: [200, 401, 403, 404, 500, 502, 504] as const,
  roleAccessRetryable: [200, 400, 401, 403, 404, 409, 500, 502, 504] as const,
  /** WA read-only endpoints: guards against downstream 5xx while accepting auth rejections */
  waReadOnly: [200, 401, 403, 500, 502, 504] as const,
};

export type StatusSetName = keyof typeof StatusSets;

export type ExpectStatusOptions = {
  message?: string;
  /**
   * The status this call is really about. When set, any other accepted status records a `status-tolerated`
   * annotation. When omitted, only an allowed 5xx (or a status accepted solely through `tolerateDependencyUnavailable`)
   * is reported; allowed 2xx and 4xx are treated as the asserted contract.
   */
  primary?: number;
  /**
   * Statuses that mean a downstream dependency is unavailable. They do not fail the test, but each one records a
   * `status-tolerated` annotation so reports show the run as degraded rather than green.
   * Use only where the dependency is genuinely outside the system under test, with a comment saying why.
   */
  tolerateDependencyUnavailable?: ReadonlyArray<number>;
  /** Route label appended to the failure message. Never written to annotations, which stay free of data. */
  route?: string;
};

/** Producer-contract section 8 marker names read by the CI analytics collector. */
export const STATUS_TOLERATED_ANNOTATION = 'status-tolerated';
export const RETRY_EXHAUSTED_ANNOTATION = 'retry-exhausted';
/** Producer-contract section 7 stable failure code. */
export const API_STATUS_UNEXPECTED_CODE = 'API_STATUS_UNEXPECTED';

type TestInfo = ReturnType<typeof test.info>;

function currentTestInfo(): TestInfo | undefined {
  try {
    return test.info();
  } catch {
    return undefined;
  }
}

/** Pushes an annotation on the running test; a no-op outside a test (for example in global setup). */
export function annotateCurrentTest(type: string, description: string): void {
  currentTestInfo()?.annotations.push({ type, description });
}

function recordRetryExhausted(attempts: number, status: number): void {
  annotateCurrentTest(RETRY_EXHAUSTED_ANNOTATION, `attempts=${attempts} last=${status}`);
}

/**
 * A pass is "tolerated" (reported to CI analytics) when it hides a server or dependency failure: the status was only
 * accepted through `tolerateDependencyUnavailable`, or it is a 5xx. Allowed 4xx are usually the asserted contract (e.g.
 * anonymous callers get 401), so they are reported only when the caller names its expected `primary` status.
 */
function isToleratedPass(actual: number, allowed: ReadonlyArray<number>, primary: number | undefined): boolean {
  if (!allowed.includes(actual)) return true;
  if (primary !== undefined) return actual !== primary;
  return actual >= 500;
}

/**
 * Asserts `actual` is one of `allowed` (or `tolerateDependencyUnavailable`). Failures start with
 * `API_STATUS_UNEXPECTED actual=<n>`. A tolerated pass (see `isToleratedPass`) records
 * `status-tolerated` with `actual=<n> allowed=<accepted list>`, once per call. Retry exhaustion is a separate event.
 */
export function expectStatus(actual: number, allowed: ReadonlyArray<number>, messageOrOptions?: string | ExpectStatusOptions) {
  const options: ExpectStatusOptions =
    typeof messageOrOptions === 'string' ? { message: messageOrOptions } : (messageOrOptions ?? {});
  const message = options.message;
  const accepted = [...new Set([...allowed, ...(options.tolerateDependencyUnavailable ?? [])])];
  if (!accepted.includes(actual)) {
    const hint = `${API_STATUS_UNEXPECTED_CODE} actual=${actual} Received HTTP ${actual}. ${message ?? `Expected status to be one of: ${allowed.join(', ')}`}${options.route ? ` (route: ${options.route})` : ''}`;
    // Emit a Playwright diff if it fails, but keep the message readable.
    expect({ status: actual }, hint).toEqual({ status: allowed[0] });
    return;
  }
  if (isToleratedPass(actual, allowed, options.primary)) {
    annotateCurrentTest(STATUS_TOLERATED_ANNOTATION, `actual=${actual} allowed=${accepted.join(',')}`);
  }
}

export function isRequestTimeoutError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /timeout|timed out|ETIMEDOUT|ECONNRESET|socket hang up|Request context disposed|apiRequestContext\.fetch: aborted|transport: request failure/i.test(
    message
  );
}

export async function buildXsrfHeaders(role: ApiUserRole): Promise<Record<string, string>> {
  return buildXsrfHeadersWith(role);
}

export async function withXsrf<T>(role: ApiUserRole, fn: (headers: Record<string, string>) => Promise<T>): Promise<T> {
  const headers = await buildXsrfHeaders(role);
  return fn(headers);
}

export async function withRetry<T extends { status: number }>(
  fn: () => Promise<T>,
  opts: { retries?: number; retryStatuses?: number[]; baseDelayMs?: number; backoffFactor?: number; maxDelayMs?: number } = {}
): Promise<T> {
  const retries = opts.retries ?? 1;
  const retryStatuses = opts.retryStatuses ?? [502, 504];
  const baseDelayMs = opts.baseDelayMs ?? 250;
  const backoffFactor = opts.backoffFactor ?? 2;
  const maxDelayMs = opts.maxDelayMs ?? 2_000;
  let attempt = 0;
  let lastError;

  const waitBeforeRetry = async () => {
    if (baseDelayMs <= 0) {
      return;
    }
    const delayMs = Math.min(maxDelayMs, Math.floor(baseDelayMs * Math.pow(backoffFactor, attempt)));
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  };

  while (attempt <= retries) {
    try {
      const res = await fn();
      if (retryStatuses.includes(res.status)) {
        if (attempt < retries) {
          await waitBeforeRetry();
          attempt++;
          continue;
        }
        if (retries > 0) {
          // The retry budget ran out on a retryable status; the caller carries on with this response.
          recordRetryExhausted(attempt + 1, res.status);
        }
      }
      return res;
    } catch (error) {
      lastError = error;
      if (attempt >= retries) {
        throw error;
      }
      await waitBeforeRetry();
    }
    attempt++;
  }
  throw lastError ?? new Error('withRetry failed unexpectedly');
}

export type GuardedRequestOptions = {
  failOnRequestError?: boolean;
  onRequestTimeout?: (message: string) => void;
  timeoutStatus?: number;
};

export async function guardedRequest<T extends { status: number; data?: unknown }>(
  fn: () => Promise<T>,
  options: GuardedRequestOptions = {}
): Promise<T | { data: undefined; status: number }> {
  try {
    return await fn();
  } catch (error) {
    if (!isRequestTimeoutError(error)) {
      throw error;
    }
    if (options.failOnRequestError === true) {
      throw error;
    }
    const message = error instanceof Error ? error.message : String(error);
    options.onRequestTimeout?.(message);
    return { data: undefined, status: options.timeoutStatus ?? 504 };
  }
}

type BuildXsrfDeps = {
  ensureStorageState?: typeof ensureStorageState;
  getStoredCookie?: typeof getStoredCookie;
};

async function buildXsrfHeadersWith(role: ApiUserRole, deps: BuildXsrfDeps = {}): Promise<Record<string, string>> {
  const ensure = deps.ensureStorageState ?? ensureStorageState;
  const getCookie = deps.getStoredCookie ?? getStoredCookie;
  await ensure(role);
  const xsrf = await getCookie(role, 'XSRF-TOKEN');
  return xsrf ? { 'X-XSRF-TOKEN': xsrf } : {};
}

export const __test__ = {
  buildXsrfHeadersWith,
};
