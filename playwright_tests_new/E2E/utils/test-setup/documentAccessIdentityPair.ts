import type { IdentityLease } from '../../../common/identityLease';
import type { IdentityCompatibilityRequirements } from '../../../common/identityPoolRegistry';
import { resolveConfiguredPoolIdentities } from '../../../common/identityPoolRegistry';

export async function acquireDocumentAccessIdentityPair(
  identityLease: { acquire: (requirements: IdentityCompatibilityRequirements) => Promise<IdentityLease> },
  env: NodeJS.ProcessEnv = process.env
): Promise<[IdentityLease, IdentityLease]> {
  const [firstIdentity, secondIdentity] = resolveConfiguredPoolIdentities(env, {
    pool: 'PRL_SOLICITOR',
    concurrencyMode: 'exclusive',
  }).sort((first, second) => first.email.localeCompare(second.email, 'en'));
  if (!secondIdentity) {
    throw new Error('Document access fixture requires two distinct configured PRL solicitor identities.');
  }
  // Every browser project takes the same first account, preventing two workers from each holding half a pair.
  const first = await identityLease.acquire({ pool: 'PRL_SOLICITOR', userIdentifier: firstIdentity.userIdentifier });
  const second = await identityLease.acquire({ pool: 'PRL_SOLICITOR', userIdentifier: secondIdentity.userIdentifier });
  return [first, second];
}
