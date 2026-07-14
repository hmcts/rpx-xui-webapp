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

  test('prewarms the solicitor session for targeted CCD toolkit integration runs', () => {
    expect(
      resolveIntegrationSessionWarmupUsers({} as NodeJS.ProcessEnv, {
        includeTags: ['@integration-ccd-toolkit'],
        excludedTags: [],
        availableTags: ['@integration', '@integration-ccd-toolkit', '@integration-create-case'],
        suiteTag: '@integration',
      })
    ).toEqual(['SOLICITOR']);
  });

  test('prewarms sessions used by targeted data loss, query management and share case runs', () => {
    expect(
      resolveIntegrationSessionWarmupUsers({} as NodeJS.ProcessEnv, {
        includeTags: ['@integration-data-loss', '@integration-query-management', '@integration-share-case'],
        excludedTags: [],
        availableTags: ['@integration', '@integration-data-loss', '@integration-query-management', '@integration-share-case'],
        suiteTag: '@integration',
      })
    ).toEqual(['SOLICITOR', 'STAFF_ADMIN']);
  });

  test('prewarms users selected by every enabled feature tag for full integration runs', () => {
    expect(
      resolveIntegrationSessionWarmupUsers({} as NodeJS.ProcessEnv, {
        includeTags: [],
        excludedTags: ['@integration-manage-tasks'],
        availableTags: ['@integration', '@integration-case-file-view', '@integration-hearings', '@integration-manage-tasks'],
        suiteTag: '@integration',
      })
    ).toEqual(['RESTRICTED_CASE_FILE_VIEW_ON', 'HEARING_MANAGER_CR84_ON', 'HEARING_MANAGER_CR84_OFF']);
  });

  test('requires every selected integration feature tag to declare its session identities', () => {
    expect(() =>
      resolveIntegrationSessionWarmupUsers({} as NodeJS.ProcessEnv, {
        includeTags: ['@integration-unmapped'],
        excludedTags: [],
        availableTags: ['@integration', '@integration-unmapped'],
        suiteTag: '@integration',
      })
    ).toThrow('Integration session warmup mappings missing for: @integration-unmapped');
  });

  test('does not let an explicit warmup-user override bypass tag mapping validation', () => {
    expect(() =>
      resolveIntegrationSessionWarmupUsers({ PW_INTEGRATION_SESSION_WARMUP_USERS: 'STAFF_ADMIN' } as NodeJS.ProcessEnv, {
        includeTags: ['@integration-unmapped'],
        excludedTags: [],
        availableTags: ['@integration', '@integration-unmapped'],
        suiteTag: '@integration',
      })
    ).toThrow('Integration session warmup mappings missing for: @integration-unmapped');
  });

  test('required warmup cannot omit identities declared by the selected tags', () => {
    expect(
      resolveIntegrationSessionWarmupUsers(
        {
          CI: 'true',
          PW_INTEGRATION_SESSION_WARMUP_USERS: 'FPL_GLOBAL_SEARCH',
        } as NodeJS.ProcessEnv,
        {
          includeTags: ['@integration-case-linking'],
          excludedTags: [],
          availableTags: ['@integration', '@integration-case-linking'],
          suiteTag: '@integration',
        }
      )
    ).toEqual(['STAFF_ADMIN', 'IAC_Judge_WA_R1', 'FPL_GLOBAL_SEARCH']);
  });

  test('declares route-mocked platform services as requiring no captured identities', () => {
    expect(
      resolveIntegrationSessionWarmupUsers({} as NodeJS.ProcessEnv, {
        includeTags: ['@integration-platform-services'],
        excludedTags: [],
        availableTags: ['@integration', '@integration-platform-services'],
        suiteTag: '@integration',
      })
    ).toEqual([]);
  });

  test('does not prewarm case-file-view session when the full run excludes that tag', () => {
    expect(
      resolveIntegrationSessionWarmupUsers({} as NodeJS.ProcessEnv, {
        includeTags: ['@integration'],
        excludedTags: ['@integration-case-file-view'],
        availableTags: ['@integration', '@integration-case-file-view', '@integration-hearings', '@integration-manage-tasks'],
        suiteTag: '@integration',
      })
    ).toEqual(['HEARING_MANAGER_CR84_ON', 'HEARING_MANAGER_CR84_OFF', 'STAFF_ADMIN', 'IAC_CaseOfficer_R2', 'IAC_Judge_WA_R1']);
  });

  test('prewarms every configured judicial user that selected-tag workers may use', () => {
    const env = {
      PW_IAC_JUDGE_WA_R1_EMAIL: 'r1@example.test',
      PW_IAC_JUDGE_WA_R1_PASSWORD: 'r1-password',
      IAC_JUDGE_WA_R2_USERNAME: 'r2@example.test',
      IAC_JUDGE_WA_R2_PASSWORD: 'r2-password',
      IAC_JUDGE_WA_R3_USERNAME: 'r3@example.test',
      IAC_JUDGE_WA_R3_PASSWORD: 'r3-password',
    } as NodeJS.ProcessEnv;

    expect(
      resolveIntegrationSessionWarmupUsers(env, {
        includeTags: ['@integration-case-linking'],
        excludedTags: [],
        availableTags: ['@integration', '@integration-case-linking'],
        suiteTag: '@integration',
      })
    ).toEqual(['STAFF_ADMIN', 'IAC_Judge_WA_R1', 'IAC_Judge_WA_R2', 'IAC_Judge_WA_R3']);
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

  test('does not allow the no-op warmup sentinel to disable CI fail-fast', () => {
    const env = {
      CI: 'true',
      PW_INTEGRATION_SESSION_WARMUP_USERS: '@none',
    } as NodeJS.ProcessEnv;

    expect(() => resolveIntegrationSessionWarmupUsers(env)).toThrow(
      'PW_INTEGRATION_SESSION_WARMUP_USERS=@none cannot disable required integration session warmup'
    );
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
