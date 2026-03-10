/**
 * Shared Playwright configuration utility functions.
 * Used by both playwright.config.ts and playwright.e2e.config.ts to avoid duplication.
 */

import { cpus } from 'node:os';

type EnvMap = NodeJS.ProcessEnv;

/**
 * Parses a string environment variable as a non-negative integer.
 * Returns undefined for absent, empty, non-numeric, or negative values.
 */
export function parseNonNegativeInt(raw: string | undefined): number | undefined {
  if (!raw) {
    return undefined;
  }
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return undefined;
  }
  return parsed;
}

/**
 * Resolves the default Playwright reporter from PLAYWRIGHT_DEFAULT_REPORTER env var.
 * Falls back to 'dot' in CI, 'list' locally.
 */
export function resolveDefaultReporter(env: EnvMap = process.env): string {
  const configured = env.PLAYWRIGHT_DEFAULT_REPORTER?.trim();
  if (configured && ['dot', 'list', 'line'].includes(configured)) {
    return configured;
  }
  return env.CI ? 'dot' : 'list';
}

/**
 * Resolves Playwright worker count from FUNCTIONAL_TESTS_WORKERS or host CPU capacity.
 * Uses an approximate physical-core heuristic from logical CPU count and clamps to 2..8.
 */
export function resolveWorkerCount(env: EnvMap = process.env): number {
  const configured = env.FUNCTIONAL_TESTS_WORKERS?.trim();
  if (configured) {
    const parsed = Number.parseInt(configured, 10);
    if (Number.isFinite(parsed) && parsed > 0) {
      return parsed;
    }
  }

  const logical = cpus()?.length ?? 1;
  const approxPhysical = logical <= 2 ? 1 : Math.max(1, Math.round(logical / 2));
  return Math.min(8, Math.max(2, approxPhysical));
}
