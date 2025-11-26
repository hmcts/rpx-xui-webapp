import { expect } from '@playwright/test';

import { ensureStorageState, getStoredCookie, type ApiUserRole } from '../auth';

// Central map of commonly reused status code sets to reduce magic arrays in tests.
export const StatusSets = {
  guardedBasic: [200, 401, 403, 502, 504] as const,
  guardedExtended: [200, 401, 403, 404, 500, 502, 503, 504] as const,
  actionWithConflicts: [200, 204, 400, 401, 403, 404, 409, 500, 502, 504] as const,
  allocateRole: [200, 201, 204, 400, 401, 403, 404, 409, 500, 502, 503, 504] as const,
  roleAccessRead: [200, 400, 401, 403, 404, 500, 502, 504] as const,
  searchCases: [200, 400, 401, 403, 404, 500, 502, 504] as const,
  globalSearch: [200, 400, 401, 403, 500, 502, 504] as const,
  okOnly: [200] as const,
  okOrBadRequest: [200, 400, 403] as const,
  corsAllowed: [200, 204, 400, 401, 403] as const,
  corsDisallowed: [200, 204, 400, 401, 403, 404] as const,
  retryable: [200, 401, 403, 404, 500, 502, 504] as const,
  roleAccessRetryable: [200, 400, 401, 403, 404, 409, 500, 502, 504] as const
};

export type StatusSetName = keyof typeof StatusSets;

export function expectStatus(actual: number, allowed: ReadonlyArray<number>, message?: string) {
  if (!allowed.includes(actual)) {
    expect({ status: actual }).toEqual({ status: allowed[0] }); // emit a Playwright diff if fails
  }
}

export async function buildXsrfHeaders(role: ApiUserRole): Promise<Record<string, string>> {
  await ensureStorageState(role);
  const xsrf = await getStoredCookie(role, 'XSRF-TOKEN');
  return xsrf ? { 'X-XSRF-TOKEN': xsrf } : {};
}

export async function withXsrf<T>(role: ApiUserRole, fn: (headers: Record<string, string>) => Promise<T>): Promise<T> {
  const headers = await buildXsrfHeaders(role);
  return fn(headers);
}

export async function withRetry<T extends { status: number }>(
  fn: () => Promise<T>,
  opts: { retries?: number; retryStatuses?: number[] } = {}
): Promise<T> {
  const retries = opts.retries ?? 1;
  const retryStatuses = opts.retryStatuses ?? [502, 504];
  let attempt = 0;
  let lastError;

  while (attempt <= retries) {
    try {
      const res = await fn();
      if (retryStatuses.includes(res.status) && attempt < retries) {
        attempt++;
        continue;
      }
      return res;
    } catch (error) {
      lastError = error;
      if (attempt >= retries) {
        throw error;
      }
    }
    attempt++;
  }
  throw lastError ?? new Error('withRetry failed unexpectedly');
}
