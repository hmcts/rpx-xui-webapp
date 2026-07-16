import { createHash } from 'node:crypto';

import { UserUtils } from '../E2E/utils/user.utils.js';

export type SessionIdentity = {
  userIdentifier: string;
  email: string;
  password: string;
  sessionKey?: string;
};

export type SessionIdentityInput = string | SessionIdentity;

type SessionIdentityDeps = {
  userUtils?: UserUtils;
};

function normaliseSessionStorageKey(value: string): string {
  return value.trim().replace(/[^a-zA-Z0-9._-]+/g, '-');
}

function collisionSafeSessionStorageKey(readableValue: string, canonicalValue: string): string {
  const discriminator = createHash('sha256').update(canonicalValue).digest('hex').slice(0, 12);
  return `${normaliseSessionStorageKey(readableValue)}-${discriminator}`;
}

export function resolveSessionIdentity(input: SessionIdentityInput, deps: SessionIdentityDeps = {}): SessionIdentity {
  if (typeof input !== 'string') {
    return {
      userIdentifier: input.userIdentifier,
      email: input.email,
      password: input.password,
      sessionKey: input.sessionKey,
    };
  }

  const userUtils = deps.userUtils ?? new UserUtils();
  const credentials = userUtils.getUserCredentials(input);
  return {
    userIdentifier: input,
    email: credentials.email,
    password: credentials.password,
  };
}

export function resolveSessionStorageKey(input: SessionIdentityInput, deps: SessionIdentityDeps = {}): string {
  const identity = resolveSessionIdentity(input, deps);
  const explicitSessionKey = identity.sessionKey?.trim();
  if (explicitSessionKey) {
    return collisionSafeSessionStorageKey(explicitSessionKey, `explicit\0${explicitSessionKey}`);
  }
  const canonicalEmail = identity.email.trim().toLowerCase();
  return collisionSafeSessionStorageKey(canonicalEmail, canonicalEmail);
}
