import { ConfigurationError } from '../api/utils/errors.js';
import { type SessionIdentity, type SessionIdentityInput, resolveSessionIdentity } from './sessionIdentity.js';
import { isExplicitIdamLoginRejection, isUnexplainedIdamLoginRejection } from './sessionCaptureRetry.js';

export type OrderedSessionResult<T> = {
  selectedUserIdentifier: string;
  value: T;
};

export async function withOrderedSessionFallback<T>(
  candidates: readonly SessionIdentityInput[],
  useSession: (identity: SessionIdentity) => Promise<T>
): Promise<OrderedSessionResult<T>> {
  if (candidates.length === 0) {
    throw new ConfigurationError('Session pool has no configured identities', 'sessionCandidates');
  }

  const seenEmails = new Set<string>();
  let lastIdentityError: unknown;
  let nextCandidateIsBoundedProbe = false;

  for (const candidate of candidates) {
    const identity = resolveSessionIdentity(candidate);
    const identityKey = identity.email.trim().toLowerCase();
    if (seenEmails.has(identityKey)) {
      continue;
    }
    seenEmails.add(identityKey);
    const isBoundedProbe = nextCandidateIsBoundedProbe;
    nextCandidateIsBoundedProbe = false;

    try {
      const value = await useSession(identity);
      return { selectedUserIdentifier: identity.userIdentifier, value };
    } catch (error) {
      if (isBoundedProbe) {
        throw error;
      }
      if (isExplicitIdamLoginRejection(error)) {
        lastIdentityError = error;
        continue;
      }
      if (isUnexplainedIdamLoginRejection(error)) {
        nextCandidateIsBoundedProbe = true;
        lastIdentityError = error;
        continue;
      }
      throw error;
    }
  }

  throw lastIdentityError;
}
