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

  test('supports env-driven pool overrides and explicit warmup users', () => {
    const env = {
      PW_SEARCH_CASE_SESSION_USERS: 'SOLICITOR, STAFF_ADMIN',
      PW_INTEGRATION_SESSION_WARMUP_USERS: 'STAFF_ADMIN, FPL_GLOBAL_SEARCH, STAFF_ADMIN',
    } as NodeJS.ProcessEnv;

    expect(resolveSearchCaseSessionUsers(env)).toEqual(['SOLICITOR', 'STAFF_ADMIN']);
    expect(resolveIntegrationSessionWarmupUsers(env)).toEqual(['STAFF_ADMIN', 'FPL_GLOBAL_SEARCH']);
  });

  test('does not prewarm sessions by default', () => {
    expect(resolveIntegrationSessionWarmupUsers({} as NodeJS.ProcessEnv)).toEqual([]);
  });

  test('prewarms sessions for selected integration tags when no explicit override is provided', () => {
    const env = {
      PW_SEARCH_CASE_SESSION_USERS: 'FPL_GLOBAL_SEARCH, SEARCH_EMPLOYMENT_CASE',
    } as NodeJS.ProcessEnv;

    expect(
      resolveIntegrationSessionWarmupUsers(env, {
        includeTags: ['@integration-case-file-view', '@integration-search-case'],
        excludedTags: [],
        availableTags: ['@integration', '@integration-case-file-view', '@integration-search-case', '@integration-manage-tasks'],
        suiteTag: '@integration',
      })
    ).toEqual(['RESTRICTED_CASE_FILE_VIEW_ON', 'FPL_GLOBAL_SEARCH', 'SEARCH_EMPLOYMENT_CASE']);
  });

  test('prewarms only the shared contention sessions for full integration runs', () => {
    expect(
      resolveIntegrationSessionWarmupUsers({} as NodeJS.ProcessEnv, {
        includeTags: [],
        excludedTags: ['@integration-manage-tasks'],
        availableTags: ['@integration', '@integration-case-file-view', '@integration-hearings', '@integration-manage-tasks'],
        suiteTag: '@integration',
      })
    ).toEqual(['FPL_GLOBAL_SEARCH', 'SOLICITOR', 'STAFF_ADMIN', 'RESTRICTED_CASE_FILE_VIEW_ON']);
  });

  test('does not prewarm case-file-view session when the full run excludes that tag', () => {
    expect(
      resolveIntegrationSessionWarmupUsers({} as NodeJS.ProcessEnv, {
        includeTags: ['@integration'],
        excludedTags: ['@integration-case-file-view'],
        availableTags: ['@integration', '@integration-case-file-view', '@integration-hearings', '@integration-manage-tasks'],
        suiteTag: '@integration',
      })
    ).toEqual(['FPL_GLOBAL_SEARCH', 'SOLICITOR', 'STAFF_ADMIN']);
  });

  test('supports explicit default integration warmup pool when requested', () => {
    const env = {
      PW_SEARCH_CASE_SESSION_USERS: 'FPL_GLOBAL_SEARCH, SEARCH_EMPLOYMENT_CASE',
      PW_INTEGRATION_SESSION_WARMUP_USERS: '@default,RESTRICTED_CASE_FILE_VIEW_ON',
    } as NodeJS.ProcessEnv;

    expect(resolveIntegrationSessionWarmupUsers(env)).toEqual([
      'FPL_GLOBAL_SEARCH',
      'SOLICITOR',
      'STAFF_ADMIN',
      'SEARCH_EMPLOYMENT_CASE',
      'RESTRICTED_CASE_FILE_VIEW_ON',
    ]);
  });

  test('supports explicit no-op warmup sentinel', () => {
    const env = {
      PW_INTEGRATION_SESSION_WARMUP_USERS: '@none,RESTRICTED_CASE_FILE_VIEW_ON',
    } as NodeJS.ProcessEnv;

    expect(resolveIntegrationSessionWarmupUsers(env)).toEqual([]);
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
