import { promises as fs } from 'node:fs';
import * as path from 'node:path';
import * as lockfile from 'proper-lockfile';

const DEFAULT_CONCURRENCY = 1;
const DEFAULT_WAIT_MS = 10 * 60_000;
const DEFAULT_STALE_MS = 5 * 60_000;
const POLL_INTERVAL_MS = 500;

type Release = () => Promise<void>;
type GateDeps = {
  appendFile: (file: string, data: string) => Promise<void>;
  lock: (file: string, options: Record<string, unknown>) => Promise<Release>;
  mkdir: (directory: string, options: { recursive: true }) => Promise<string | undefined>;
  now: () => number;
  sleep: (delayMs: number) => Promise<void>;
};

const defaultDeps: GateDeps = {
  appendFile: fs.appendFile,
  lock: lockfile.lock,
  mkdir: fs.mkdir,
  now: Date.now,
  sleep: (delayMs) => new Promise((resolve) => setTimeout(resolve, delayMs)),
};

function parsePositiveInteger(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function resolveGateDirectory(env: NodeJS.ProcessEnv): string {
  return env.PW_E2E_CCD_SETUP_GATE_DIR?.trim() || path.join(process.cwd(), '.sessions', 'ccd-case-setup');
}

function isContendedLock(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'code' in error && (error as { code?: string }).code === 'ELOCKED';
}

export async function acquireDirectCcdSetupSlot(
  env: NodeJS.ProcessEnv = process.env,
  deps: GateDeps = defaultDeps,
  options: { maxWaitMs?: number } = {}
): Promise<{ slot: number; release: Release }> {
  const concurrency = parsePositiveInteger(env.PW_E2E_CCD_SETUP_CONCURRENCY, DEFAULT_CONCURRENCY);
  const configuredWaitMs = parsePositiveInteger(env.PW_E2E_CCD_SETUP_WAIT_MS, DEFAULT_WAIT_MS);
  const waitMs = Math.max(1, Math.min(configuredWaitMs, options.maxWaitMs ?? configuredWaitMs));
  const staleMs = parsePositiveInteger(env.PW_E2E_CCD_SETUP_STALE_MS, DEFAULT_STALE_MS);
  const directory = resolveGateDirectory(env);
  const deadline = deps.now() + waitMs;

  await deps.mkdir(directory, { recursive: true });
  const slotPaths = await Promise.all(
    Array.from({ length: concurrency }, async (_, index) => {
      const slotPath = path.join(directory, `slot-${index + 1}`);
      await deps.appendFile(slotPath, '');
      return slotPath;
    })
  );

  while (deps.now() < deadline) {
    for (const [index, slotPath] of slotPaths.entries()) {
      try {
        const release = await deps.lock(slotPath, { realpath: false, retries: 0, stale: staleMs });
        return { slot: index + 1, release };
      } catch (error) {
        if (!isContendedLock(error)) throw error;
      }
    }
    await deps.sleep(POLL_INTERVAL_MS);
  }

  throw new Error(
    `Timed out waiting ${waitMs}ms for one of ${concurrency} direct CCD case-setup slots. ` +
      'This is test scheduling pressure, not a missing-user failure.'
  );
}

export async function withDirectCcdSetupGate<T>(
  run: () => Promise<T>,
  env: NodeJS.ProcessEnv = process.env,
  deps: GateDeps = defaultDeps,
  options: { maxWaitMs?: number } = {}
): Promise<T> {
  const lease = await acquireDirectCcdSetupSlot(env, deps, options);
  try {
    return await run();
  } finally {
    await lease.release();
  }
}

export const __test__ = { isContendedLock, parsePositiveInteger, resolveGateDirectory };
