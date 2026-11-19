import { lookup } from 'node:dns/promises';
import type { FullConfig } from '@playwright/test';

// Opt-in run-level check that the target environment exists before any test
// starts. Without it a missing preview deployment fails every test separately
// with page.goto: net::ERR_NAME_NOT_RESOLVED.
export const TARGET_PREFLIGHT_ENV_VAR = 'PW_TARGET_PREFLIGHT';
export const TARGET_PREFLIGHT_PROBE_PATH = '/auth/login';
export const TARGET_PREFLIGHT_TIMEOUT_MS = 10_000;
// A warming or rolling preview ingress can answer 5xx or time out briefly; DNS misses and 404 are not retried.
export const TARGET_PREFLIGHT_HTTP_ATTEMPTS = 3;
export const TARGET_PREFLIGHT_RETRY_BACKOFF_MS = 5_000;

export type TargetPreflightDeps = {
  lookupHost: (hostname: string) => Promise<unknown>;
  httpGet: (url: string, timeoutMs: number) => Promise<{ status: number }>;
  sleep?: (ms: number) => Promise<void>;
};

export class TargetEnvironmentUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TargetEnvironmentUnavailableError';
  }
}

export function isTargetPreflightEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return env[TARGET_PREFLIGHT_ENV_VAR]?.trim().toLowerCase() === 'true';
}

function errorCode(error: unknown): string {
  const candidate = error as { code?: unknown; name?: unknown; cause?: { code?: unknown } } | undefined;
  const code = candidate?.code ?? candidate?.cause?.code ?? candidate?.name;
  return typeof code === 'string' && code.length > 0 ? code : 'unknown error';
}

function isTimeout(error: unknown): boolean {
  const name = (error as { name?: unknown } | undefined)?.name;
  return name === 'TimeoutError' || name === 'AbortError';
}

async function withTimeout<T>(operation: Promise<T>, timeoutMs: number): Promise<T> {
  let timer: NodeJS.Timeout | undefined;
  try {
    return await Promise.race([
      operation,
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => {
          const error = new Error(`timed out after ${timeoutMs}ms`);
          error.name = 'TimeoutError';
          reject(error);
        }, timeoutMs);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

const defaultDeps: TargetPreflightDeps = {
  lookupHost: (hostname) => lookup(hostname),
  httpGet: async (url, timeoutMs) => {
    // Manual redirects: /auth/login answers 302 to IDAM, which proves the app is up.
    const response = await fetch(url, { method: 'GET', redirect: 'manual', signal: AbortSignal.timeout(timeoutMs) });
    await response.body?.cancel().catch(() => undefined);
    return { status: response.status };
  },
};

export async function assertTargetEnvironmentAvailable(
  baseUrl: string,
  deps: TargetPreflightDeps = defaultDeps,
  timeoutMs: number = TARGET_PREFLIGHT_TIMEOUT_MS
): Promise<void> {
  let target: URL;
  try {
    target = new URL(baseUrl);
  } catch {
    throw new TargetEnvironmentUnavailableError(`Target environment unavailable: base URL is not a valid URL`);
  }
  const host = target.hostname;
  const prefix = `Target environment unavailable: ${host}`;

  try {
    await withTimeout(deps.lookupHost(host), timeoutMs);
  } catch (error) {
    const reason = isTimeout(error) ? `DNS lookup timed out after ${timeoutMs}ms` : errorCode(error);
    throw new TargetEnvironmentUnavailableError(`${prefix} did not resolve (${reason})`);
  }

  const probeUrl = new URL(TARGET_PREFLIGHT_PROBE_PATH, target.origin).toString();
  const sleep = deps.sleep ?? ((ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms)));
  for (let attempt = 1; ; attempt += 1) {
    const failure = await probeOnce(deps, probeUrl, prefix, timeoutMs);
    if (!failure) return;
    if (!failure.retryable || attempt >= TARGET_PREFLIGHT_HTTP_ATTEMPTS) {
      throw new TargetEnvironmentUnavailableError(
        failure.retryable ? `${failure.message} (after ${attempt} attempts)` : failure.message
      );
    }
    await sleep(TARGET_PREFLIGHT_RETRY_BACKOFF_MS * attempt);
  }
}

async function probeOnce(
  deps: TargetPreflightDeps,
  probeUrl: string,
  prefix: string,
  timeoutMs: number
): Promise<{ message: string; retryable: boolean } | null> {
  let status: number;
  try {
    ({ status } = await withTimeout(deps.httpGet(probeUrl, timeoutMs), timeoutMs));
  } catch (error) {
    if (isTimeout(error)) {
      return { message: `${prefix} did not respond on ${TARGET_PREFLIGHT_PROBE_PATH} within ${timeoutMs}ms`, retryable: true };
    }
    return { message: `${prefix} request to ${TARGET_PREFLIGHT_PROBE_PATH} failed (${errorCode(error)})`, retryable: true };
  }
  // A 404 proves only that this route is unavailable; it does not establish why.
  if (status === 404) {
    return { message: `${prefix} responded HTTP ${status} on ${TARGET_PREFLIGHT_PROBE_PATH}`, retryable: false };
  }
  if (status >= 500) {
    return { message: `${prefix} responded HTTP ${status} on ${TARGET_PREFLIGHT_PROBE_PATH}`, retryable: true };
  }
  return null;
}

export function resolveTargetBaseUrl(fullConfig: FullConfig | undefined, env: NodeJS.ProcessEnv): string | undefined {
  const projectBaseUrl = fullConfig?.projects?.map((project) => project.use?.baseURL).find(Boolean);
  return projectBaseUrl || env.TEST_URL?.trim() || undefined;
}

export async function runTargetEnvironmentPreflight(
  fullConfig?: FullConfig,
  env: NodeJS.ProcessEnv = process.env,
  deps: TargetPreflightDeps = defaultDeps
): Promise<void> {
  if (!isTargetPreflightEnabled(env)) return;
  const baseUrl = resolveTargetBaseUrl(fullConfig, env);
  if (!baseUrl) {
    throw new TargetEnvironmentUnavailableError(
      `Target environment unavailable: ${TARGET_PREFLIGHT_ENV_VAR}=true but no baseURL or TEST_URL is configured`
    );
  }
  await assertTargetEnvironmentAvailable(baseUrl, deps);
}

export default async function targetEnvironmentPreflightGlobalSetup(fullConfig: FullConfig): Promise<void> {
  await runTargetEnvironmentPreflight(fullConfig);
}
