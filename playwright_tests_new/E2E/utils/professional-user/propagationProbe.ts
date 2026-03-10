import type { ProfessionalUserInfo, UserPropagationOutcome } from './types.js';

export const DEFAULT_USER_PROPAGATION_CHECK_MAX_ATTEMPTS = 6;
export const DEFAULT_USER_PROPAGATION_CHECK_RETRY_DELAY_MS = 1_000;

type PropagationProbeDeps = {
  resolveCreateUserBearerToken: () => Promise<string | undefined>;
  getUserInfoByEmail: (args: { bearerToken: string; email: string }) => Promise<unknown>;
  tryGenerateUserPasswordGrantToken: (user: ProfessionalUserInfo) => Promise<string | undefined>;
  probeIdamUserInfo: (assignmentBearerToken: string) => Promise<Record<string, unknown>>;
  createError: (error: unknown, message: string) => Error;
  sleep: (ms: number) => Promise<void>;
  warn: (message: string, meta: Record<string, unknown>) => void;
};

type PropagationProbeOptions = {
  maxAttempts?: number;
  retryDelayMs?: number;
};

function readNumericStatus(value: Record<string, unknown>): number | undefined {
  return typeof value.status === 'number' ? value.status : undefined;
}

export async function waitForUserPropagationFlow(
  user: ProfessionalUserInfo,
  deps: PropagationProbeDeps,
  options: PropagationProbeOptions = {}
): Promise<UserPropagationOutcome> {
  const maxAttempts = options.maxAttempts ?? DEFAULT_USER_PROPAGATION_CHECK_MAX_ATTEMPTS;
  const retryDelayMs = options.retryDelayMs ?? DEFAULT_USER_PROPAGATION_CHECK_RETRY_DELAY_MS;
  let lastError: unknown;
  let createUserBearerToken: string | undefined;

  try {
    createUserBearerToken = await deps.resolveCreateUserBearerToken();
  } catch (error) {
    deps.warn('Create-user bearer token unavailable for propagation probe; using password-grant probe only.', {
      email: user.email,
      message: error instanceof Error ? error.message : String(error),
    });
  }

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      if (createUserBearerToken) {
        await deps.getUserInfoByEmail({
          bearerToken: createUserBearerToken,
          email: user.email,
        });
      }

      const passwordGrantToken = await deps.tryGenerateUserPasswordGrantToken(user);
      if (!passwordGrantToken) {
        deps.warn('Password-grant token unavailable for user propagation probe; using IDAM API presence check only.', {
          email: user.email,
        });
        if (createUserBearerToken) {
          return {
            verified: true,
            degraded: true,
            reason: 'idam-api-only',
          };
        }
        deps.warn('Skipping user propagation probes because no probe token could be generated.', { email: user.email });
        return {
          verified: false,
          degraded: true,
          reason: 'no-probe-token',
        };
      }

      const userInfoProbe = await deps.probeIdamUserInfo(passwordGrantToken);
      const status = readNumericStatus(userInfoProbe);
      if (status === 200) {
        return {
          verified: true,
          degraded: false,
          reason: 'idam-api-and-userinfo-probe',
        };
      }
      throw new Error(`IDAM userinfo probe status ${typeof status === 'number' ? status : 'unknown'}`);
    } catch (error) {
      lastError = error;
      if (attempt === maxAttempts) {
        break;
      }
      await deps.sleep(retryDelayMs);
    }
  }

  throw deps.createError(lastError, 'User propagation checks failed');
}
