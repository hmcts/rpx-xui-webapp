import { expect } from '@playwright/test';

export const corsAllowed = [200, 204, 400, 401, 403] as const;
export const corsDisallowed = [200, 204, 400, 401, 403, 404] as const;

export function assertCorsHeaders(
  expected: ReadonlyArray<number>,
  status: number,
  headers: Record<string, string>,
  origin: string
): void {
  if (expected === corsAllowed && status >= 200 && status < 300) {
    const allowOrigin = headers['access-control-allow-origin'] || headers['Access-Control-Allow-Origin'];
    expect(allowOrigin).toBe(origin);
  }
  if (expected === corsDisallowed && status < 500) {
    const allowed = headers['access-control-allow-origin'] || headers['Access-Control-Allow-Origin'];
    expect([origin, '*']).not.toContain(allowed);
  }
}

export function assertCorsPreflightHeaders(
  expected: ReadonlyArray<number>,
  status: number,
  headers: Record<string, string>,
  origin: string,
  requestedMethod: string
): void {
  assertCorsHeaders(expected, status, headers, origin);
  if (expected === corsAllowed && status >= 200 && status < 300) {
    expect(headers['access-control-allow-credentials'] || headers['Access-Control-Allow-Credentials']).toBe('true');
    expect(
      (headers['access-control-allow-methods'] || headers['Access-Control-Allow-Methods'])
        ?.split(',')
        .map((method) => method.trim())
    ).toContain(requestedMethod);
  }
}

export function shouldIgnoreCorsError(error: unknown): boolean {
  const message = (error as Error)?.message ?? '';
  if (/ENOTFOUND|ECONNREFUSED/.test(message)) {
    expect(message).toContain('manage-case');
    return true;
  }
  return false;
}
