import { getRuntimeUserCredentialEnvMapping } from '../../E2E/utils/runtimeUserCredentials';

export const IAC_JUDICIAL_USER_IDENTIFIERS = ['IAC_Judge_WA_R1', 'IAC_Judge_WA_R2', 'IAC_Judge_WA_R3'] as const;
export type IacJudicialUserIdentifier = (typeof IAC_JUDICIAL_USER_IDENTIFIERS)[number];

type ParallelIndexSource = {
  parallelIndex?: number;
};

type EnvMap = Record<string, string | undefined>;

function hasConfiguredCredentials(userIdentifier: IacJudicialUserIdentifier, env: EnvMap): boolean {
  const mapping = getRuntimeUserCredentialEnvMapping(userIdentifier);
  return Boolean(mapping && env[mapping.username]?.trim() && env[mapping.password]);
}

export function getConfiguredIacJudicialUserIdentifiers(env: EnvMap = process.env): IacJudicialUserIdentifier[] {
  return IAC_JUDICIAL_USER_IDENTIFIERS.filter((userIdentifier) => hasConfiguredCredentials(userIdentifier, env));
}

export function resolveIacJudicialWarmupUsers(env: EnvMap = process.env): IacJudicialUserIdentifier[] {
  const configuredUsers = getConfiguredIacJudicialUserIdentifiers(env);
  return configuredUsers.length > 0 ? configuredUsers : [IAC_JUDICIAL_USER_IDENTIFIERS[0]];
}

export function resolveIacJudicialUserIdentifier(
  source: ParallelIndexSource,
  env: EnvMap = process.env
): IacJudicialUserIdentifier {
  const configuredUsers = getConfiguredIacJudicialUserIdentifiers(env);
  const pool = configuredUsers.length > 0 ? configuredUsers : [IAC_JUDICIAL_USER_IDENTIFIERS[0]];
  const parallelIndex =
    Number.isInteger(source.parallelIndex) && Number(source.parallelIndex) >= 0 ? Number(source.parallelIndex) : 0;
  return pool[parallelIndex % pool.length];
}
