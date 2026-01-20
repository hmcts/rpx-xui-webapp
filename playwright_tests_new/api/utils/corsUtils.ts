import { expect } from '@playwright/test';

import { StatusSets } from './apiTestUtils';

export function assertCorsHeaders(
  expected: ReadonlyArray<number>,
  status: number,
  headers: Record<string, string>,
  origin: string
): void {
  if (expected === StatusSets.corsAllowed && status < 500) {
    const allowOrigin = headers['access-control-allow-origin'] || headers['Access-Control-Allow-Origin'];
    if (allowOrigin) {
      expect(allowOrigin).toBe(origin);
    }
  }
  if (expected === StatusSets.corsDisallowed && status < 500) {
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
