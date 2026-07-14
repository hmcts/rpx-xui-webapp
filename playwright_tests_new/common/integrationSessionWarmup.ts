import fs from 'node:fs';
import path from 'node:path';
import type { SessionIdentityInput } from './sessionIdentity';
import { sessionCapture } from './sessionCapture';

type SessionCapture = (identifiers: SessionIdentityInput[], options?: { useFailureCooldown?: boolean }) => Promise<void>;

export const INTEGRATION_SESSION_WARMUP_COMPLETE_ENV = 'PW_INTEGRATION_SESSION_WARMUP_COMPLETE';
export const INTEGRATION_SESSION_WARMUP_COMPLETE_FILE_ENV = 'PW_INTEGRATION_SESSION_WARMUP_COMPLETE_FILE';

function clearWarmupCompleteFile(env: NodeJS.ProcessEnv): void {
  const completeFile = env[INTEGRATION_SESSION_WARMUP_COMPLETE_FILE_ENV]?.trim();
  if (completeFile) {
    fs.rmSync(completeFile, { force: true });
  }
}

function writeWarmupCompleteFile(env: NodeJS.ProcessEnv): void {
  const completeFile = env[INTEGRATION_SESSION_WARMUP_COMPLETE_FILE_ENV]?.trim();
  if (completeFile) {
    fs.mkdirSync(path.dirname(completeFile), { recursive: true });
    fs.writeFileSync(completeFile, 'complete\n', 'utf8');
  }
}

function parseBoolean(value: string | undefined): boolean | undefined {
  if (value === undefined) {
    return undefined;
  }
  const normalized = value.trim().toLowerCase();
  if (normalized === 'true') {
    return true;
  }
  if (normalized === 'false') {
    return false;
  }
  return undefined;
}

export function isIntegrationSessionWarmupRequired(env: NodeJS.ProcessEnv = process.env): boolean {
  const ciValue = parseBoolean(env.CI);
  const isCi = ciValue ?? Boolean(env.CI?.trim());
  return isCi || parseBoolean(env.PW_INTEGRATION_SESSION_WARMUP_REQUIRED) === true;
}

export async function prewarmIntegrationSessions(
  identifiers: SessionIdentityInput[],
  env: NodeJS.ProcessEnv = process.env,
  capture: SessionCapture = sessionCapture
): Promise<void> {
  const required = isIntegrationSessionWarmupRequired(env);
  if (required) {
    delete env[INTEGRATION_SESSION_WARMUP_COMPLETE_ENV];
    clearWarmupCompleteFile(env);
  }
  try {
    await capture(identifiers, { useFailureCooldown: required });
    if (required) {
      env[INTEGRATION_SESSION_WARMUP_COMPLETE_ENV] = 'true';
      writeWarmupCompleteFile(env);
    }
  } catch (error) {
    if (required) {
      throw error;
    }
    console.warn(`Integration session warmup failed locally; tests will capture sessions on demand: ${(error as Error).message}`);
  }
}
