import { getRuntimeUserCredentialEnvMapping } from '../../E2E/utils/runtimeUserCredentials';

export const HEARING_MANAGER_CR84_ON_USER = 'HEARING_MANAGER_CR84_ON' as const;
export const HEARING_MANAGER_CR84_OFF_USER = 'HEARING_MANAGER_CR84_OFF' as const;

export const HEARING_MANAGER_CR84_ON_POOLED_USER_IDENTIFIERS = [
  'HEARING_MANAGER_CR84_ON-1',
  'HEARING_MANAGER_CR84_ON-2',
  'HEARING_MANAGER_CR84_ON-3',
  'HEARING_MANAGER_CR84_ON-4',
] as const;

export const HEARING_MANAGER_CR84_OFF_POOLED_USER_IDENTIFIERS = [
  'HEARING_MANAGER_CR84_OFF-1',
  'HEARING_MANAGER_CR84_OFF-2',
  'HEARING_MANAGER_CR84_OFF-3',
  'HEARING_MANAGER_CR84_OFF-4',
] as const;

export type HearingManagerUserIdentifier =
  | typeof HEARING_MANAGER_CR84_ON_USER
  | typeof HEARING_MANAGER_CR84_OFF_USER
  | (typeof HEARING_MANAGER_CR84_ON_POOLED_USER_IDENTIFIERS)[number]
  | (typeof HEARING_MANAGER_CR84_OFF_POOLED_USER_IDENTIFIERS)[number];

type ParallelIndexSource = {
  parallelIndex?: number;
};

type EnvMap = Record<string, string | undefined>;

function hasConfiguredCredentials(userIdentifier: HearingManagerUserIdentifier, env: EnvMap): boolean {
  const mapping = getRuntimeUserCredentialEnvMapping(userIdentifier);
  if (!mapping) {
    return false;
  }

  return Boolean(env[mapping.username]?.trim() && env[mapping.password]);
}

function resolveParallelIndex(source?: ParallelIndexSource, env: EnvMap = process.env): number {
  if (Number.isInteger(source?.parallelIndex) && Number(source?.parallelIndex) > 0) {
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
  const pool =
    baseUserIdentifier === HEARING_MANAGER_CR84_ON_USER
      ? HEARING_MANAGER_CR84_ON_POOLED_USER_IDENTIFIERS
      : HEARING_MANAGER_CR84_OFF_POOLED_USER_IDENTIFIERS;

  return pool.filter((userIdentifier) => hasConfiguredCredentials(userIdentifier, env));
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
