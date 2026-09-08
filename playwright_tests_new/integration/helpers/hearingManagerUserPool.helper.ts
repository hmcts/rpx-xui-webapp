import { getRuntimeUserCredentialEnvMapping } from '../../E2E/utils/runtimeUserCredentials';
import { resolveConfiguredPoolIdentities } from '../../common/identityPoolRegistry';

export const HEARING_MANAGER_CR84_ON_USER = 'HEARING_MANAGER_CR84_ON' as const;
export const HEARING_MANAGER_CR84_OFF_USER = 'HEARING_MANAGER_CR84_OFF' as const;

export type HearingManagerUserIdentifier =
  | typeof HEARING_MANAGER_CR84_ON_USER
  | typeof HEARING_MANAGER_CR84_OFF_USER
  | `HEARING_MANAGER_CR84_ON-${number}`
  | `HEARING_MANAGER_CR84_OFF-${number}`;

type ParallelIndexSource = {
  parallelIndex?: number;
};

type EnvMap = Record<string, string | undefined>;

function hasSupportedRuntimeCredentials(userIdentifier: string, env: EnvMap): userIdentifier is HearingManagerUserIdentifier {
  const mapping = getRuntimeUserCredentialEnvMapping(userIdentifier);
  if (!mapping) {
    return false;
  }

  return Boolean(env[mapping.username]?.trim() && env[mapping.password]);
}

function resolveParallelIndex(source?: ParallelIndexSource, env: EnvMap = process.env): number {
  if (Number.isInteger(source?.parallelIndex) && Number(source?.parallelIndex) >= 0) {
    return Number(source?.parallelIndex);
  }

  const envParallelIndex = env.TEST_PARALLEL_INDEX ?? env.TEST_WORKER_INDEX;
  const parsedParallelIndex = Number(envParallelIndex);
  return Number.isInteger(parsedParallelIndex) && parsedParallelIndex > 0 ? parsedParallelIndex : 0;
}

export function getConfiguredHearingManagerUserIdentifiers(
  baseUserIdentifier: typeof HEARING_MANAGER_CR84_ON_USER | typeof HEARING_MANAGER_CR84_OFF_USER,
  env: EnvMap = process.env
): HearingManagerUserIdentifier[] {
  return resolveConfiguredPoolIdentities(env, { pool: baseUserIdentifier })
    .map(({ userIdentifier }) => userIdentifier)
    .filter((userIdentifier): userIdentifier is HearingManagerUserIdentifier =>
      hasSupportedRuntimeCredentials(userIdentifier, env)
    );
}

export function resolveHearingManagerUserIdentifier(
  userIdentifier: HearingManagerUserIdentifier,
  source?: ParallelIndexSource,
  env: EnvMap = process.env
): HearingManagerUserIdentifier {
  if (userIdentifier !== HEARING_MANAGER_CR84_ON_USER && userIdentifier !== HEARING_MANAGER_CR84_OFF_USER) {
    return userIdentifier;
  }

  const configuredUserIdentifiers = getConfiguredHearingManagerUserIdentifiers(userIdentifier, env);
  if (configuredUserIdentifiers.length === 0) {
    return userIdentifier;
  }

  return configuredUserIdentifiers[resolveParallelIndex(source, env) % configuredUserIdentifiers.length];
}

export function resolveHearingManagerSessionCandidates(
  userIdentifier: HearingManagerUserIdentifier,
  source?: ParallelIndexSource,
  env: EnvMap = process.env
): HearingManagerUserIdentifier[] {
  const selected = resolveHearingManagerUserIdentifier(userIdentifier, source, env);
  if (userIdentifier !== HEARING_MANAGER_CR84_ON_USER && userIdentifier !== HEARING_MANAGER_CR84_OFF_USER) {
    return [selected];
  }

  const configuredUserIdentifiers = getConfiguredHearingManagerUserIdentifiers(userIdentifier, env);
  return configuredUserIdentifiers.length > 0 ? Array.from(new Set([selected, ...configuredUserIdentifiers])) : [userIdentifier];
}
