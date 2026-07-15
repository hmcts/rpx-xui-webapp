import { expect, test } from '@playwright/test';

import { resolveSessionStorageKey, type SessionIdentity } from '../../common/sessionIdentity.js';

function identity(email: string, sessionKey?: string): SessionIdentity {
  return {
    userIdentifier: email,
    email,
    password: 'not-used',
    sessionKey,
  };
}

test.describe('session identity storage key', { tag: '@svc-internal' }, () => {
  test('creates a readable deterministic key from the email', () => {
    const sessionIdentity = identity('user+one@example.test');

    expect(resolveSessionStorageKey(sessionIdentity)).toBe('user-one-example.test-0d1943f8a1db');
  });

  test('does not collide when punctuation normalises to the same readable value', () => {
    const plusVariant = resolveSessionStorageKey(identity('user+one@example.test'));
    const hyphenVariant = resolveSessionStorageKey(identity('user-one@example.test'));

    expect(plusVariant).not.toBe(hyphenVariant);
  });

  test('does not collide for case variants', () => {
    const lowerCase = resolveSessionStorageKey(identity('user@example.test'));
    const upperCase = resolveSessionStorageKey(identity('USER@example.test'));

    expect(lowerCase).not.toBe(upperCase);
  });

  test('uses the trimmed explicit session key instead of the email', () => {
    const firstAlias = resolveSessionStorageKey(identity('first@example.test', ' shared-session '));
    const secondAlias = resolveSessionStorageKey(identity('second@example.test', 'shared-session'));

    expect(firstAlias).toBe('shared-session');
    expect(secondAlias).toBe(firstAlias);
  });

  test('falls back to the email when the explicit session key is blank', () => {
    expect(resolveSessionStorageKey(identity('fallback@example.test', '   '))).toBe(
      resolveSessionStorageKey(identity('fallback@example.test'))
    );
  });
});
