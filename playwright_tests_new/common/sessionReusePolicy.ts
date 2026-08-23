import type { SessionReuseValidationResult } from './sessionReuseValidation.js';

export type SessionReuseValidationMode = 'best-effort' | 'strict';

export const AAT_AUTH_UNAVAILABLE_FAILURE = 'AAT_AUTH_UNAVAILABLE';

export function resolveSessionReuseValidationMode(env: NodeJS.ProcessEnv = process.env): SessionReuseValidationMode {
  const configured = env.PW_SESSION_REUSE_VALIDATION_MODE?.trim().toLowerCase();
  if (configured === 'best-effort' || configured === 'strict') {
    return configured;
  }

  return env.CI === 'true' || env.CI === '1' ? 'strict' : 'best-effort';
}

export function shouldRejectUnavailableSessionValidation(
  validation: SessionReuseValidationResult,
  env: NodeJS.ProcessEnv = process.env
): boolean {
  return validation === 'unavailable' && resolveSessionReuseValidationMode(env) === 'strict';
}
