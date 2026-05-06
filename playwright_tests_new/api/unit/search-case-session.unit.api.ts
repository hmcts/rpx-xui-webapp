import { expect, test } from '@playwright/test';
import {
  resolveIntegrationSessionWarmupUsers,
  resolveSearchCaseSessionUsers,
  resolveSearchCaseUserIdentifier,
} from '../../integration/helpers/searchCaseSession.helper.js';

test.describe('search case session helper', { tag: '@svc-internal' }, () => {
  test('uses the default shared user pool when no env override is provided', () => {
    expect(resolveSearchCaseSessionUsers({} as NodeJS.ProcessEnv)).toEqual(['FPL_GLOBAL_SEARCH']);
  });

  test('supports env-driven pool overrides and lets explicit warmup users narrow the prewarmed set', () => {
    const env = {
      PW_SEARCH_CASE_SESSION_USERS: 'SOLICITOR, STAFF_ADMIN',
      PW_INTEGRATION_SESSION_WARMUP_USERS: 'STAFF_ADMIN, FPL_GLOBAL_SEARCH, STAFF_ADMIN',
    } as NodeJS.ProcessEnv;

    expect(resolveSearchCaseSessionUsers(env)).toEqual(['SOLICITOR', 'STAFF_ADMIN']);
    expect(resolveIntegrationSessionWarmupUsers(env)).toEqual(['STAFF_ADMIN', 'FPL_GLOBAL_SEARCH']);
  });

  test('falls back to the default integration warmup pool when no explicit warmup override is provided', () => {
    const env = {
      PW_SEARCH_CASE_SESSION_USERS: 'FPL_GLOBAL_SEARCH, SEARCH_EMPLOYMENT_CASE',
    } as NodeJS.ProcessEnv;

    expect(resolveIntegrationSessionWarmupUsers(env)).toEqual([
      'FPL_GLOBAL_SEARCH',
      'SOLICITOR',
      'STAFF_ADMIN',
      'SEARCH_EMPLOYMENT_CASE',
    ]);
  });

  test('assigns workers across the configured shared user pool', () => {
    const env = {
      PW_SEARCH_CASE_SESSION_USERS: 'FPL_GLOBAL_SEARCH,SOLICITOR,STAFF_ADMIN',
    } as NodeJS.ProcessEnv;

    expect(resolveSearchCaseUserIdentifier({ workerIndex: 0 }, env)).toBe('FPL_GLOBAL_SEARCH');
    expect(resolveSearchCaseUserIdentifier({ workerIndex: 1 }, env)).toBe('SOLICITOR');
    expect(resolveSearchCaseUserIdentifier({ workerIndex: 2 }, env)).toBe('STAFF_ADMIN');
    expect(resolveSearchCaseUserIdentifier({ workerIndex: 3 }, env)).toBe('FPL_GLOBAL_SEARCH');
  });
});
