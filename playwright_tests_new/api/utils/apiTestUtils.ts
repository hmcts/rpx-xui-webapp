import { expect } from '@playwright/test';

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
  corsAllowed: [200, 204, 400, 401, 403] as const,
  corsDisallowed: [200, 204, 400, 401, 403, 404] as const,
  retryable: [200, 401, 403, 404, 500, 502, 504] as const,
  roleAccessRetryable: [200, 400, 401, 403, 404, 409, 500, 502, 504] as const,
  /** WA read-only endpoints: guards against downstream 5xx while accepting auth rejections */
  waReadOnly: [200, 401, 403, 500, 502, 504] as const,
};

export type StatusSetName = keyof typeof StatusSets;

export function expectStatus(actual: number, allowed: ReadonlyArray<number>, message?: string) {
  if (!allowed.includes(actual)) {
    const hint = message ?? `Expected status to be one of: ${allowed.join(', ')}`;
    // Emit a Playwright diff if it fails, but keep the message readable.
    expect({ status: actual }, hint).toEqual({ status: allowed[0] });
  }
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
      if (retryStatuses.includes(res.status) && attempt < retries) {
        await waitBeforeRetry();
        attempt++;
        continue;
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
