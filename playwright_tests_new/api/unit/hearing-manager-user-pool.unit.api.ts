import { expect, test } from '@playwright/test';

import {
  getConfiguredHearingManagerUserIdentifiers,
  HEARING_MANAGER_CR84_OFF_USER,
  HEARING_MANAGER_CR84_ON_USER,
  resolveHearingManagerUserIdentifier,
} from '../../integration/helpers/hearingManagerUserPool.helper.js';

const configuredEnv = {
  HEARING_MANAGER_CR84_OFF_1_USERNAME: 'hearing-off-1@example.test',
  HEARING_MANAGER_CR84_OFF_1_PASSWORD: 'secret-1',
  HEARING_MANAGER_CR84_OFF_2_USERNAME: 'hearing-off-2@example.test',
  HEARING_MANAGER_CR84_OFF_2_PASSWORD: 'secret-2',
  HEARING_MANAGER_CR84_OFF_3_USERNAME: 'hearing-off-3@example.test',
  HEARING_MANAGER_CR84_OFF_3_PASSWORD: 'secret-3',
  HEARING_MANAGER_CR84_OFF_4_USERNAME: 'hearing-off-4@example.test',
  HEARING_MANAGER_CR84_OFF_4_PASSWORD: 'secret-4',
  HEARING_MANAGER_CR84_ON_1_USERNAME: 'hearing-on-1@example.test',
  HEARING_MANAGER_CR84_ON_1_PASSWORD: 'secret-1',
  HEARING_MANAGER_CR84_ON_2_USERNAME: 'hearing-on-2@example.test',
  HEARING_MANAGER_CR84_ON_2_PASSWORD: 'secret-2',
  HEARING_MANAGER_CR84_ON_3_USERNAME: 'hearing-on-3@example.test',
  HEARING_MANAGER_CR84_ON_3_PASSWORD: 'secret-3',
  HEARING_MANAGER_CR84_ON_4_USERNAME: 'hearing-on-4@example.test',
  HEARING_MANAGER_CR84_ON_4_PASSWORD: 'secret-4',
};

test.describe('Hearing manager user pool unit tests', { tag: '@svc-internal' }, () => {
  test('falls back to the legacy hearing manager users when no pooled users are configured', () => {
    expect(getConfiguredHearingManagerUserIdentifiers(HEARING_MANAGER_CR84_ON_USER, {})).toEqual([]);
    expect(getConfiguredHearingManagerUserIdentifiers(HEARING_MANAGER_CR84_OFF_USER, {})).toEqual([]);
    expect(resolveHearingManagerUserIdentifier(HEARING_MANAGER_CR84_ON_USER, { parallelIndex: 3 }, {})).toBe(
      HEARING_MANAGER_CR84_ON_USER
    );
    expect(resolveHearingManagerUserIdentifier(HEARING_MANAGER_CR84_OFF_USER, { parallelIndex: 3 }, {})).toBe(
      HEARING_MANAGER_CR84_OFF_USER
    );
  });

  test('returns only fully configured pooled users for the requested CR84 mode', () => {
    const env = {
      HEARING_MANAGER_CR84_ON_1_USERNAME: 'hearing-on-1@example.test',
      HEARING_MANAGER_CR84_ON_1_PASSWORD: 'secret-1',
      HEARING_MANAGER_CR84_ON_2_USERNAME: 'hearing-on-2@example.test',
      HEARING_MANAGER_CR84_OFF_1_USERNAME: 'hearing-off-1@example.test',
      HEARING_MANAGER_CR84_OFF_2_PASSWORD: 'secret-2',
    };

    expect(getConfiguredHearingManagerUserIdentifiers(HEARING_MANAGER_CR84_ON_USER, env)).toEqual(['HEARING_MANAGER_CR84_ON-1']);
    expect(getConfiguredHearingManagerUserIdentifiers(HEARING_MANAGER_CR84_OFF_USER, env)).toEqual([]);
  });

  test('selects configured CR84 ON pooled users by Playwright parallel index', () => {
    expect(resolveHearingManagerUserIdentifier(HEARING_MANAGER_CR84_ON_USER, { parallelIndex: 0 }, configuredEnv)).toBe(
      'HEARING_MANAGER_CR84_ON-1'
    );
    expect(resolveHearingManagerUserIdentifier(HEARING_MANAGER_CR84_ON_USER, { parallelIndex: 1 }, configuredEnv)).toBe(
      'HEARING_MANAGER_CR84_ON-2'
    );
    expect(resolveHearingManagerUserIdentifier(HEARING_MANAGER_CR84_ON_USER, { parallelIndex: 4 }, configuredEnv)).toBe(
      'HEARING_MANAGER_CR84_ON-1'
    );
  });

  test('selects configured CR84 OFF pooled users by Playwright worker env when no source is passed', () => {
    expect(
      resolveHearingManagerUserIdentifier(HEARING_MANAGER_CR84_OFF_USER, undefined, {
        ...configuredEnv,
        TEST_PARALLEL_INDEX: '2',
      })
    ).toBe('HEARING_MANAGER_CR84_OFF-3');
  });

  test('keeps an already pooled user identifier unchanged', () => {
    expect(resolveHearingManagerUserIdentifier('HEARING_MANAGER_CR84_OFF-2', { parallelIndex: 3 }, configuredEnv)).toBe(
      'HEARING_MANAGER_CR84_OFF-2'
    );
  });
});
