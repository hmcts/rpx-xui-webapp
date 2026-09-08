import { expect, test } from '@playwright/test';
import {
  resolveWelshLanguageSessionUser,
  resolveWelshLanguageSessionUsers,
} from '../../integration/helpers/welshLanguageSession.helper.js';

test.describe('welsh language session helper', { tag: '@svc-internal' }, () => {
  test('falls back to the shared SOLICITOR account when no extra solicitor credentials are configured', () => {
    expect(resolveWelshLanguageSessionUsers({} as NodeJS.ProcessEnv)).toEqual(['SOLICITOR']);
  });

  test('uses the configured Welsh-compatible solicitor pool and ignores WA-specific credentials', () => {
    const env = {
      SOLICITOR_USERNAME: 'solicitor@example.test',
      SOLICITOR_PASSWORD: 'sol-password',
      PRL_SOLICITOR_USERNAME: 'prl@example.test',
      PRL_SOLICITOR_PASSWORD: 'prl-password',
      WA_SOLICITOR_USERNAME: 'wa@example.test',
      WA_SOLICITOR_PASSWORD: 'wa-password',
    } as NodeJS.ProcessEnv;

    expect(resolveWelshLanguageSessionUsers(env)).toEqual([
      {
        userIdentifier: 'SOLICITOR',
        email: 'solicitor@example.test',
        password: 'sol-password',
      },
      {
        userIdentifier: 'PRL_SOLICITOR',
        email: 'prl@example.test',
        password: 'prl-password',
      },
    ]);
  });

  test('assigns stable parallel slots across the configured solicitor pool', () => {
    const env = {
      SOLICITOR_USERNAME: 'solicitor@example.test',
      SOLICITOR_PASSWORD: 'sol-password',
      NOC_SOLICITOR_USERNAME: 'noc@example.test',
      NOC_SOLICITOR_PASSWORD: 'noc-password',
    } as NodeJS.ProcessEnv;

    expect(resolveWelshLanguageSessionUser({ parallelIndex: 0 }, env)).toEqual({
      userIdentifier: 'SOLICITOR',
      email: 'solicitor@example.test',
      password: 'sol-password',
    });
    expect(resolveWelshLanguageSessionUser({ parallelIndex: 1 }, env)).toEqual({
      userIdentifier: 'NOC_SOLICITOR',
      email: 'noc@example.test',
      password: 'noc-password',
    });
    expect(resolveWelshLanguageSessionUser({ parallelIndex: 2 }, env)).toEqual({
      userIdentifier: 'SOLICITOR',
      email: 'solicitor@example.test',
      password: 'sol-password',
    });
  });

  test('keeps the selected Welsh identity when a worker restarts in the same parallel slot', () => {
    const env = {
      SOLICITOR_USERNAME: 'solicitor@example.test',
      SOLICITOR_PASSWORD: 'sol-password',
      NOC_SOLICITOR_USERNAME: 'noc@example.test',
      NOC_SOLICITOR_PASSWORD: 'noc-password',
    } as NodeJS.ProcessEnv;
    const initialWorker = { workerIndex: 1, parallelIndex: 1 };
    const restartedWorker = { workerIndex: 8, parallelIndex: 1 };

    expect(resolveWelshLanguageSessionUser(initialWorker, env)).toEqual({
      userIdentifier: 'NOC_SOLICITOR',
      email: 'noc@example.test',
      password: 'noc-password',
    });
    expect(resolveWelshLanguageSessionUser(restartedWorker, env)).toEqual({
      userIdentifier: 'NOC_SOLICITOR',
      email: 'noc@example.test',
      password: 'noc-password',
    });
  });
});
