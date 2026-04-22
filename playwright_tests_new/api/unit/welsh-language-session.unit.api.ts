import { expect, test } from '@playwright/test';
import {
  resolveWelshLanguageSessionUser,
  resolveWelshLanguageSessionUsers,
} from '../../integration/helpers/welshLanguageSession.helper.js';

test.describe('welsh language session helper', { tag: '@svc-internal' }, () => {
  test('falls back to the shared SOLICITOR account when no extra solicitor credentials are configured', () => {
    expect(resolveWelshLanguageSessionUsers({} as NodeJS.ProcessEnv)).toEqual(['SOLICITOR']);
  });

  test('uses the configured solicitor pool and removes duplicate underlying accounts', () => {
    const env = {
      SOLICITOR_USERNAME: 'solicitor@example.test',
      SOLICITOR_PASSWORD: 'sol-password',
      PRL_SOLICITOR_USERNAME: 'prl@example.test',
      PRL_SOLICITOR_PASSWORD: 'prl-password',
      WA_SOLICITOR_USERNAME: 'solicitor@example.test',
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

  test('assigns workers across the configured solicitor pool', () => {
    const env = {
      SOLICITOR_USERNAME: 'solicitor@example.test',
      SOLICITOR_PASSWORD: 'sol-password',
      NOC_SOLICITOR_USERNAME: 'noc@example.test',
      NOC_SOLICITOR_PASSWORD: 'noc-password',
    } as NodeJS.ProcessEnv;

    expect(resolveWelshLanguageSessionUser({ workerIndex: 0 }, env)).toEqual({
      userIdentifier: 'SOLICITOR',
      email: 'solicitor@example.test',
      password: 'sol-password',
    });
    expect(resolveWelshLanguageSessionUser({ workerIndex: 1 }, env)).toEqual({
      userIdentifier: 'NOC_SOLICITOR',
      email: 'noc@example.test',
      password: 'noc-password',
    });
    expect(resolveWelshLanguageSessionUser({ workerIndex: 2 }, env)).toEqual({
      userIdentifier: 'SOLICITOR',
      email: 'solicitor@example.test',
      password: 'sol-password',
    });
  });
});
