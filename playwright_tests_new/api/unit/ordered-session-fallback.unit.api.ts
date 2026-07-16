import { expect, test } from '@playwright/test';

import { ConfigurationError, SessionCaptureError } from '../utils/errors.js';
import { withOrderedSessionFallback } from '../../common/orderedSessionFallback.js';
import { UNEXPLAINED_IDAM_LOGIN_FAILURE } from '../../common/sessionCaptureRetry.js';

const primary = {
  userIdentifier: 'PRIMARY',
  email: 'primary@example.test',
  password: 'not-used',
};
const fallback = {
  userIdentifier: 'FALLBACK',
  email: 'fallback@example.test',
  password: 'not-used',
};

function identityRejection(message: string): SessionCaptureError {
  return new SessionCaptureError(`Login failed: IDAM page message: ${message}`, 'PRIMARY');
}

function unexplainedIdentityRejection(userIdentifier: string): SessionCaptureError {
  return new SessionCaptureError(
    `Login failed for ${userIdentifier} after 2 of 2 capture attempts: IDAM login did not establish authenticated session`,
    userIdentifier,
    { failureKind: UNEXPLAINED_IDAM_LOGIN_FAILURE }
  );
}

test.describe('ordered session fallback', { tag: '@svc-internal' }, () => {
  test('keeps the primary identity when it succeeds', async () => {
    const attempts: string[] = [];

    const result = await withOrderedSessionFallback([primary, fallback], async (identity) => {
      attempts.push(identity.userIdentifier);
      return 'session';
    });

    expect(attempts).toEqual(['PRIMARY']);
    expect(result).toEqual({ selectedUserIdentifier: 'PRIMARY', value: 'session' });
  });

  test('uses the next identity after explicit invalid credentials', async () => {
    const attempts: string[] = [];

    const result = await withOrderedSessionFallback([primary, fallback], async (identity) => {
      attempts.push(identity.userIdentifier);
      if (identity.userIdentifier === 'PRIMARY') throw identityRejection('Email or password is incorrect');
      return 'fallback-session';
    });

    expect(attempts).toEqual(['PRIMARY', 'FALLBACK']);
    expect(result.selectedUserIdentifier).toBe('FALLBACK');
  });

  test('uses the next identity after an explicit locked account response', async () => {
    const result = await withOrderedSessionFallback([primary, fallback], async (identity) => {
      if (identity.userIdentifier === 'PRIMARY') throw identityRejection('Account is locked');
      return identity.email;
    });

    expect(result).toEqual({ selectedUserIdentifier: 'FALLBACK', value: 'fallback@example.test' });
  });

  test('does not rotate for service or navigation failures', async () => {
    for (const error of [new Error('503 Service Unavailable'), new Error('page.goto: Timeout 30000ms exceeded')]) {
      const attempts: string[] = [];

      await expect(
        withOrderedSessionFallback([primary, fallback], async (identity) => {
          attempts.push(identity.userIdentifier);
          throw error;
        })
      ).rejects.toBe(error);
      expect(attempts).toEqual(['PRIMARY']);
    }
  });

  test('stops when a fallback identity encounters a target-wide failure', async () => {
    const third = { userIdentifier: 'THIRD', email: 'third@example.test', password: 'not-used' };
    const serviceError = new Error('503 Service Unavailable');
    const attempts: string[] = [];

    await expect(
      withOrderedSessionFallback([primary, fallback, third], async (identity) => {
        attempts.push(identity.userIdentifier);
        if (identity.userIdentifier === 'PRIMARY') throw identityRejection('Account is disabled');
        throw serviceError;
      })
    ).rejects.toBe(serviceError);
    expect(attempts).toEqual(['PRIMARY', 'FALLBACK']);
  });

  test('probes one fallback identity after an exhausted unexplained IDAM login failure', async () => {
    const attempts: string[] = [];

    const result = await withOrderedSessionFallback([primary, fallback], async (identity) => {
      attempts.push(identity.userIdentifier);
      if (identity.userIdentifier === 'PRIMARY') throw unexplainedIdentityRejection('PRIMARY');
      return 'fallback-session';
    });

    expect(attempts).toEqual(['PRIMARY', 'FALLBACK']);
    expect(result).toEqual({ selectedUserIdentifier: 'FALLBACK', value: 'fallback-session' });
  });

  test('stops after a second unexplained IDAM login failure instead of sweeping the pool', async () => {
    const third = { userIdentifier: 'THIRD', email: 'third@example.test', password: 'not-used' };
    const attempts: string[] = [];

    await expect(
      withOrderedSessionFallback([primary, fallback, third], async (identity) => {
        attempts.push(identity.userIdentifier);
        throw unexplainedIdentityRejection(identity.userIdentifier);
      })
    ).rejects.toThrow('FALLBACK');

    expect(attempts).toEqual(['PRIMARY', 'FALLBACK']);
  });

  test('stops when the bounded probe receives an explicit rejection', async () => {
    const third = { userIdentifier: 'THIRD', email: 'third@example.test', password: 'not-used' };
    const attempts: string[] = [];

    await expect(
      withOrderedSessionFallback([primary, fallback, third], async (identity) => {
        attempts.push(identity.userIdentifier);
        if (identity.userIdentifier === 'PRIMARY') throw unexplainedIdentityRejection('PRIMARY');
        throw identityRejection('Account is disabled');
      })
    ).rejects.toThrow('Account is disabled');

    expect(attempts).toEqual(['PRIMARY', 'FALLBACK']);
  });

  test('does not rotate for unknown framework or storage failures', async () => {
    const error = new SessionCaptureError('Failed to persist storage state', 'PRIMARY');
    const attempts: string[] = [];

    await expect(
      withOrderedSessionFallback([primary, fallback], async (identity) => {
        attempts.push(identity.userIdentifier);
        throw error;
      })
    ).rejects.toBe(error);
    expect(attempts).toEqual(['PRIMARY']);
  });

  test('deduplicates aliases that resolve to the same normalized email', async () => {
    const duplicate = { ...fallback, userIdentifier: 'FALLBACK_ALIAS', email: ' FALLBACK@example.test ' };
    const attempts: string[] = [];

    await expect(
      withOrderedSessionFallback([fallback, duplicate], async (identity) => {
        attempts.push(identity.userIdentifier);
        throw identityRejection('User not found');
      })
    ).rejects.toThrow('User not found');
    expect(attempts).toEqual(['FALLBACK']);
  });

  test('preserves the final explicit rejection when all identities fail', async () => {
    const finalError = identityRejection('Account is disabled');

    await expect(
      withOrderedSessionFallback([primary, fallback], async (identity) => {
        if (identity.userIdentifier === 'PRIMARY') throw identityRejection('User not found');
        throw finalError;
      })
    ).rejects.toBe(finalError);
  });

  test('rejects an empty candidate list as configuration failure', async () => {
    await expect(withOrderedSessionFallback([], async () => undefined)).rejects.toBeInstanceOf(ConfigurationError);
  });
});
