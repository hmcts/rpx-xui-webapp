import { expect, test } from '@playwright/test';

import { resolveSessionStorageKey } from '../../common/sessionIdentity.js';
import { syntheticSessionIdentity as identity } from './session-cache.mock.js';

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

  test('uses one storage key for case variants of the same IDAM email', () => {
    const lowerCase = resolveSessionStorageKey(identity('user@example.test'));
    const upperCase = resolveSessionStorageKey(identity('USER@example.test'));

    expect(lowerCase).toBe(upperCase);
  });

  test('isolates different accounts using the same trimmed explicit session key', () => {
    const firstAlias = resolveSessionStorageKey(identity('first@example.test', ' shared-session '));
    const secondAlias = resolveSessionStorageKey(identity('second@example.test', 'shared-session'));

    expect(secondAlias).not.toBe(firstAlias);
    expect(resolveSessionStorageKey(identity('first@example.test', 'shared-session'))).toBe(firstAlias);
  });

  test('shares an explicit key across canonical-email aliases and password changes', () => {
    const firstAlias = identity('first@example.test', 'shared-session', 'FIRST');
    const secondAlias = {
      ...identity(' FIRST@EXAMPLE.TEST ', ' shared-session ', 'SECOND'),
      password: 'changed-dummy-password',
    };

    expect(resolveSessionStorageKey(secondAlias)).toBe(resolveSessionStorageKey(firstAlias));
  });

  test('does not collide when explicit-key punctuation normalises to the same readable value', () => {
    const plusVariant = resolveSessionStorageKey(identity('first@example.test', 'shared+session'));
    const hyphenVariant = resolveSessionStorageKey(identity('first@example.test', 'shared-session'));

    expect(plusVariant).not.toBe(hyphenVariant);
  });

  test('does not collide with an explicit key that matches another key generated name', () => {
    const generatedName = resolveSessionStorageKey(identity('first@example.test', 'shared+session'));
    const matchingKey = resolveSessionStorageKey(identity('first@example.test', generatedName));

    expect(matchingKey).not.toBe(generatedName);
  });

  test('does not collide for explicit key case variants on a case-insensitive filesystem', () => {
    const lowerCase = resolveSessionStorageKey(identity('first@example.test', 'shared-session'));
    const upperCase = resolveSessionStorageKey(identity('first@example.test', 'Shared-Session'));

    expect(lowerCase.toLowerCase()).not.toBe(upperCase.toLowerCase());
  });

  test('falls back to the email when the explicit session key is blank', () => {
    expect(resolveSessionStorageKey(identity('fallback@example.test', '   '))).toBe(
      resolveSessionStorageKey(identity('fallback@example.test'))
    );
  });
});
