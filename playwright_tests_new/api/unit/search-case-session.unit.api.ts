import { expect, test } from '@playwright/test';
import {
  resolveIntegrationSessionUsers,
  resolveSearchCaseSessionUsers,
  resolveSearchCaseUserIdentifier,
} from '../../integration/helpers/searchCaseSession.helper.js';

test.describe('search case session helper', { tag: '@svc-internal' }, () => {
  test('uses the default shared user pool when no env override is provided', () => {
    expect(resolveSearchCaseSessionUsers({} as NodeJS.ProcessEnv)).toEqual(['FPL_GLOBAL_SEARCH']);
  });

  test('supports env-driven search-case pool overrides', () => {
    const env = {
      PW_SEARCH_CASE_SESSION_USERS: 'SOLICITOR, STAFF_ADMIN',
    } as NodeJS.ProcessEnv;

    expect(resolveSearchCaseSessionUsers(env)).toEqual(['SOLICITOR', 'STAFF_ADMIN']);
  });

  test('declares the configured staff-admin pool used by a search-case alias override', () => {
    const env = {
      PW_SEARCH_CASE_SESSION_USERS: 'STAFF_ADMIN',
      STAFF_ADMIN_POOL_ENABLED: 'true',
      STAFF_ADMIN_1_USERNAME: 'staff-admin-1@example.test',
      STAFF_ADMIN_1_PASSWORD: 'secret-1',
      STAFF_ADMIN_2_USERNAME: 'staff-admin-2@example.test',
      STAFF_ADMIN_2_PASSWORD: 'secret-2',
    } as NodeJS.ProcessEnv;

    expect(
      resolveIntegrationSessionUsers(env, {
        includeTags: ['@integration-search-case'],
        excludedTags: [],
        availableTags: ['@integration', '@integration-search-case'],
        suiteTag: '@integration',
      })
    ).toEqual(['STAFF_ADMIN-1', 'STAFF_ADMIN-2']);
  });

  test('declares only configured booking and hearing pool identities', () => {
    const env = {
      BOOKING_UI_FT_ON_1_USERNAME: 'booking-ui-1@example.test',
      BOOKING_UI_FT_ON_1_PASSWORD: 'secret-1',
      HEARING_MANAGER_CR84_ON_1_USERNAME: 'hearing-on-1@example.test',
      HEARING_MANAGER_CR84_ON_1_PASSWORD: 'secret-1',
      HEARING_MANAGER_CR84_OFF_1_USERNAME: 'hearing-off-1@example.test',
      HEARING_MANAGER_CR84_OFF_1_PASSWORD: 'secret-1',
    } as NodeJS.ProcessEnv;

    expect(
      resolveIntegrationSessionUsers(env, {
        includeTags: ['@integration-booking-ui', '@integration-hearings'],
        excludedTags: [],
        availableTags: ['@integration', '@integration-booking-ui', '@integration-hearings'],
        suiteTag: '@integration',
      })
    ).toEqual(['BOOKING_UI-FT-ON-1', 'HEARING_MANAGER_CR84_ON-1', 'HEARING_MANAGER_CR84_OFF-1']);
  });

  test('returns no integration declarations without a tag selection', () => {
    expect(resolveIntegrationSessionUsers({} as NodeJS.ProcessEnv)).toEqual([]);
  });

  test('declares sessions for selected integration tags', () => {
    const env = {
      PW_SEARCH_CASE_SESSION_USERS: 'FPL_GLOBAL_SEARCH, SEARCH_EMPLOYMENT_CASE',
    } as NodeJS.ProcessEnv;

    expect(
      resolveIntegrationSessionUsers(env, {
        includeTags: ['@integration-case-file-view', '@integration-search-case'],
        excludedTags: [],
        availableTags: ['@integration', '@integration-case-file-view', '@integration-search-case', '@integration-manage-tasks'],
        suiteTag: '@integration',
      })
    ).toEqual(['RESTRICTED_CASE_FILE_VIEW_ON', 'FPL_GLOBAL_SEARCH', 'SEARCH_EMPLOYMENT_CASE']);
  });

  test('declares the solicitor session for targeted CCD toolkit integration runs', () => {
    expect(
      resolveIntegrationSessionUsers({} as NodeJS.ProcessEnv, {
        includeTags: ['@integration-ccd-toolkit'],
        excludedTags: [],
        availableTags: ['@integration', '@integration-ccd-toolkit', '@integration-create-case'],
        suiteTag: '@integration',
      })
    ).toEqual(['SOLICITOR']);
  });

  test('declares sessions used by targeted data loss, query management and share case runs', () => {
    expect(
      resolveIntegrationSessionUsers({} as NodeJS.ProcessEnv, {
        includeTags: ['@integration-data-loss', '@integration-query-management', '@integration-share-case'],
        excludedTags: [],
        availableTags: ['@integration', '@integration-data-loss', '@integration-query-management', '@integration-share-case'],
        suiteTag: '@integration',
      })
    ).toEqual(['SOLICITOR', 'STAFF_ADMIN']);
  });

  test('declares users selected by every enabled feature tag for full integration runs', () => {
    expect(
      resolveIntegrationSessionUsers({} as NodeJS.ProcessEnv, {
        includeTags: [],
        excludedTags: ['@integration-manage-tasks'],
        availableTags: ['@integration', '@integration-case-file-view', '@integration-hearings', '@integration-manage-tasks'],
        suiteTag: '@integration',
      })
    ).toEqual(['RESTRICTED_CASE_FILE_VIEW_ON', 'HEARING_MANAGER_CR84_ON', 'HEARING_MANAGER_CR84_OFF']);
  });

  test('requires every selected integration feature tag to declare its session identities', () => {
    expect(() =>
      resolveIntegrationSessionUsers({} as NodeJS.ProcessEnv, {
        includeTags: ['@integration-unmapped'],
        excludedTags: [],
        availableTags: ['@integration', '@integration-unmapped'],
        suiteTag: '@integration',
      })
    ).toThrow('Integration session mappings missing for: @integration-unmapped');
  });

  test('declares route-mocked platform services as requiring no captured identities', () => {
    expect(
      resolveIntegrationSessionUsers({} as NodeJS.ProcessEnv, {
        includeTags: ['@integration-platform-services'],
        excludedTags: [],
        availableTags: ['@integration', '@integration-platform-services'],
        suiteTag: '@integration',
      })
    ).toEqual([]);
  });

  test('does not declare case-file-view session when the full run excludes that tag', () => {
    expect(
      resolveIntegrationSessionUsers({} as NodeJS.ProcessEnv, {
        includeTags: ['@integration'],
        excludedTags: ['@integration-case-file-view'],
        availableTags: ['@integration', '@integration-case-file-view', '@integration-hearings', '@integration-manage-tasks'],
        suiteTag: '@integration',
      })
    ).toEqual(['HEARING_MANAGER_CR84_ON', 'HEARING_MANAGER_CR84_OFF', 'STAFF_ADMIN', 'IAC_CaseOfficer_R2', 'IAC_Judge_WA_R1']);
  });

  test('declares the proven judicial identity that selected-tag workers use', () => {
    expect(
      resolveIntegrationSessionUsers({} as NodeJS.ProcessEnv, {
        includeTags: ['@integration-case-linking'],
        excludedTags: [],
        availableTags: ['@integration', '@integration-case-linking'],
        suiteTag: '@integration',
      })
    ).toEqual(['STAFF_ADMIN', 'IAC_Judge_WA_R1']);
  });

  test('distributes configured search users by worker index', () => {
    const env = {
      PW_SEARCH_CASE_SESSION_USERS: 'FPL_GLOBAL_SEARCH,SOLICITOR,STAFF_ADMIN',
    } as NodeJS.ProcessEnv;

    expect(resolveSearchCaseUserIdentifier({ workerIndex: 0 }, env)).toBe('FPL_GLOBAL_SEARCH');
    expect(resolveSearchCaseUserIdentifier({ workerIndex: 1 }, env)).toBe('SOLICITOR');
    expect(resolveSearchCaseUserIdentifier({ workerIndex: 2 }, env)).toBe('STAFF_ADMIN');
    expect(resolveSearchCaseUserIdentifier({ workerIndex: 3 }, env)).toBe('FPL_GLOBAL_SEARCH');
  });
});
