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
    expect(allowed === origin).toBe(false);
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
