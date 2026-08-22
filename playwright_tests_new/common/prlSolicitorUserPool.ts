import { getRuntimeUserCredentialEnvMapping } from '../E2E/utils/runtimeUserCredentials.js';
import { UserUtils } from '../E2E/utils/user.utils.js';
import type { SessionIdentity } from './sessionIdentity.js';

export const PRL_SOLICITOR_USER = 'PRL_SOLICITOR' as const;

export const PRL_SOLICITOR_POOLED_USER_IDENTIFIERS = [
  'PRL_SOLICITOR',
  'PRL_SOLICITOR2',
  'PRL_SOLICITOR4',
  'PRL_SOLICITOR5',
  'PRL_SOLICITOR6',
  'PRL_SOLICITOR7',
  'PRL_SOLICITOR8',
] as const;

export type PrlSolicitorUserIdentifier = (typeof PRL_SOLICITOR_POOLED_USER_IDENTIFIERS)[number];

type ParallelIndexSource = { parallelIndex?: number };
type EnvMap = Record<string, string | undefined>;

function hasConfiguredCredentials(userIdentifier: PrlSolicitorUserIdentifier, env: EnvMap): boolean {
  const mapping = getRuntimeUserCredentialEnvMapping(userIdentifier);
  return Boolean(mapping && env[mapping.username]?.trim() && env[mapping.password]);
}

function resolveParallelIndex(source?: ParallelIndexSource, env: EnvMap = process.env): number {
  if (Number.isInteger(source?.parallelIndex) && Number(source?.parallelIndex) >= 0) {
    return Number(source?.parallelIndex);
  }

  const parsed = Number(env.TEST_PARALLEL_INDEX ?? env.TEST_WORKER_INDEX);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : 0;
}

export function getConfiguredPrlSolicitorUserIdentifiers(env: EnvMap = process.env): PrlSolicitorUserIdentifier[] {
  return PRL_SOLICITOR_POOLED_USER_IDENTIFIERS.filter((userIdentifier) => hasConfiguredCredentials(userIdentifier, env));
}

export function resolvePrlSolicitorSessionCandidates(
  source?: ParallelIndexSource,
  env: EnvMap = process.env,
  userUtils: UserUtils = new UserUtils()
): Array<PrlSolicitorUserIdentifier | SessionIdentity> {
  const configured = getConfiguredPrlSolicitorUserIdentifiers(env);
  if (configured.length === 0) {
    const credentials = userUtils.getUserCredentials(PRL_SOLICITOR_USER);
    return [{ userIdentifier: PRL_SOLICITOR_USER, email: credentials.email, password: credentials.password }];
  }

  const selected = configured[resolveParallelIndex(source, env) % configured.length]!;
  return [selected, ...configured.filter((userIdentifier) => userIdentifier !== selected)];
}
