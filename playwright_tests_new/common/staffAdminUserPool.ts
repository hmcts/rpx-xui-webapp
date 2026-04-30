import { getRuntimeUserCredentialEnvMapping } from '../E2E/utils/runtimeUserCredentials';

export const STAFF_ADMIN_USER = 'STAFF_ADMIN' as const;

export const STAFF_ADMIN_POOLED_USER_IDENTIFIERS = ['STAFF_ADMIN-1', 'STAFF_ADMIN-2', 'STAFF_ADMIN-3', 'STAFF_ADMIN-4'] as const;

export type StaffAdminUserIdentifier = typeof STAFF_ADMIN_USER | (typeof STAFF_ADMIN_POOLED_USER_IDENTIFIERS)[number];

type ParallelIndexSource = {
  parallelIndex?: number;
};

type EnvMap = Record<string, string | undefined>;

function hasConfiguredCredentials(userIdentifier: StaffAdminUserIdentifier, env: EnvMap): boolean {
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

export function getConfiguredStaffAdminUserIdentifiers(env: EnvMap = process.env): StaffAdminUserIdentifier[] {
  return STAFF_ADMIN_POOLED_USER_IDENTIFIERS.filter((userIdentifier) => hasConfiguredCredentials(userIdentifier, env));
}

export function resolveStaffAdminUserIdentifier(
  userIdentifier: string,
  source?: ParallelIndexSource,
  env: EnvMap = process.env
): string {
  if (userIdentifier !== STAFF_ADMIN_USER) {
    return userIdentifier;
  }

  const configuredUserIdentifiers = getConfiguredStaffAdminUserIdentifiers(env);
  if (configuredUserIdentifiers.length === 0) {
    return userIdentifier;
  }

  return configuredUserIdentifiers[resolveParallelIndex(source, env) % configuredUserIdentifiers.length];
}
