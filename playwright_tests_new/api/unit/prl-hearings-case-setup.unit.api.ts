import { test, expect } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';

import { __test__ as resolverTest } from '../../E2E/utils/test-setup/hearingsCaseResolver';
import { __test__, PrlHearingsCaseSetupConfig } from '../../E2E/utils/test-setup/prlHearingsCaseSetup';

test.describe('PRL hearings case setup', () => {
  test('resolves required setup config with redirect fallback', () => {
    const config = __test__.resolvePrlHearingsCaseSetupConfig({
      IDAM_TESTING_SUPPORT_URL: 'https://idam-testing-support-api.aat.platform.hmcts.net',
      IDAM_WEB_URL: 'https://idam-web-public.aat.platform.hmcts.net',
      CCD_DATA_STORE_URL: 'https://ccd-data-store-api.aat.platform.hmcts.net',
      PRL_COS_API_URL: 'https://prl-cos-api.aat.platform.hmcts.net',
      IDAM_CLIENT_ID: 'xuiwebapp',
      IDAM_SECRET: 'xui-webapp-secret',
      ORG_USER_ASSIGNMENT_REDIRECT_URI: 'https://manage-case.aat.platform.hmcts.net/oauth2/callback',
      S2S_URL: 'http://service-auth/testing-support/lease',
      CITIZEN_USERNAME: 'citizen@example.test',
      CITIZEN_PASSWORD: 'citizen-password',
      COURT_ADMIN_STOKE_USERNAME: 'court-admin@example.test',
      COURT_ADMIN_STOKE_PASSWORD: 'court-admin-password',
    });

    expect(config).toMatchObject({
      idamApiUrl: 'https://idam-testing-support-api.aat.platform.hmcts.net',
      idamWebUrl: 'https://idam-web-public.aat.platform.hmcts.net',
      idamTestingSupportUrl: 'https://idam-testing-support-api.aat.platform.hmcts.net',
      prlCosApiUrl: 'https://prl-cos-api.aat.platform.hmcts.net',
      idamClientId: 'xuiwebapp',
      idamSecret: 'xui-webapp-secret',
      redirectUri: 'https://manage-case.aat.platform.hmcts.net/oauth2/callback',
      serviceMicroservice: 'ccd_data',
      s2sUrl: 'http://service-auth/testing-support/lease',
      citizenUsername: 'citizen@example.test',
      courtAdminUsername: 'court-admin@example.test',
    });
    expect(__test__.validatePrlHearingsCaseSetupConfig(config)).toEqual([]);
  });

  test('uses the XUI IDAM secret without falling back to the PRL COS secret', () => {
    const defaultClient = __test__.resolvePrlHearingsCaseSetupConfig({ IDAM_SECRET: 'xui-webapp-secret' });
    const config = __test__.resolvePrlHearingsCaseSetupConfig({
      IDAM_CLIENT_ID: 'configured-xui-client',
      IDAM_SECRET: 'xui-webapp-secret',
      PRL_HEARINGS_IDAM_SECRET: 'prl-cos-secret',
    });

    expect(defaultClient.idamClientId).toBe('xuiwebapp');
    expect(config.idamClientId).toBe('configured-xui-client');
    expect(config.idamSecret).toBe('xui-webapp-secret');
  });

  test('allows a PRL-specific pre-issued S2S token instead of requiring a locally reachable S2S URL', () => {
    const config = __test__.resolvePrlHearingsCaseSetupConfig({
      IDAM_TESTING_SUPPORT_URL: 'https://idam-testing-support-api.aat.platform.hmcts.net',
      IDAM_WEB_URL: 'https://idam-web-public.aat.platform.hmcts.net',
      CCD_DATA_STORE_URL: 'https://ccd-data-store-api.aat.platform.hmcts.net',
      PRL_COS_API_URL: 'https://prl-cos-api.aat.platform.hmcts.net',
      IDAM_SECRET: 'xui-webapp-secret',
      ORG_USER_ASSIGNMENT_REDIRECT_URI: 'https://manage-case.aat.platform.hmcts.net/oauth2/callback',
      PRL_HEARINGS_S2S_TOKEN: 'pre-issued-s2s-token',
      CITIZEN_USERNAME: 'citizen@example.test',
      CITIZEN_PASSWORD: 'citizen-password',
      COURT_ADMIN_STOKE_USERNAME: 'court-admin@example.test',
      COURT_ADMIN_STOKE_PASSWORD: 'court-admin-password',
    });

    expect(config.s2sToken).toBe('pre-issued-s2s-token');
    expect(__test__.validatePrlHearingsCaseSetupConfig(config)).toEqual([]);
  });

  test('does not use the generic app S2S token for PRL setup', () => {
    const config = __test__.resolvePrlHearingsCaseSetupConfig({
      S2S_TOKEN: 'generic-app-token',
      S2S_URL: 'http://service-auth/testing-support/lease',
    });

    expect(config.s2sToken).toBeUndefined();
    expect(config.s2sUrl).toBe('http://service-auth/testing-support/lease');
  });

  test('accepts the Key Vault IDAM testing-support users URL alias', () => {
    const config = __test__.resolvePrlHearingsCaseSetupConfig({
      IDAM_TESTING_SUPPORT_USERS_URL: 'https://idam-testing-support-api.aat.platform.hmcts.net/test/idam/users',
    });

    expect(config.idamApiUrl).toBe('https://idam-testing-support-api.aat.platform.hmcts.net/test/idam/users');
    expect(config.idamTestingSupportUrl).toBe('https://idam-testing-support-api.aat.platform.hmcts.net/test/idam/users');
  });

  test('ignores unrelated caseworker credentials because the PRL setup flow does not use that actor', () => {
    const config = __test__.resolvePrlHearingsCaseSetupConfig({
      IDAM_TESTING_SUPPORT_URL: 'https://idam-testing-support-api.aat.platform.hmcts.net',
      IDAM_WEB_URL: 'https://idam-web-public.aat.platform.hmcts.net',
      CCD_DATA_STORE_URL: 'https://ccd-data-store-api.aat.platform.hmcts.net',
      PRL_COS_API_URL: 'https://prl-cos-api.aat.platform.hmcts.net',
      IDAM_SECRET: 'xui-webapp-secret',
      ORG_USER_ASSIGNMENT_REDIRECT_URI: 'https://manage-case.aat.platform.hmcts.net/oauth2/callback',
      S2S_URL: 'http://service-auth/testing-support/lease',
      CITIZEN_USERNAME: 'citizen@example.test',
      CITIZEN_PASSWORD: 'citizen-password',
      CASEWORKER_USERNAME: 'unused-caseworker@example.test',
      CASEWORKER_PASSWORD: 'unused-password',
      CCD_DATA_STORE_CLIENT_USERNAME: 'unused-ccd-caseworker@example.test',
      CCD_DATA_STORE_CLIENT_PASSWORD: 'unused-ccd-password',
      COURT_ADMIN_STOKE_USERNAME: 'court-admin@example.test',
      COURT_ADMIN_STOKE_PASSWORD: 'court-admin-password',
    });

    expect('caseworkerUsername' in config).toBe(false);
    expect('caseworkerPassword' in config).toBe(false);
    expect(config.courtAdminUsername).toBe('court-admin@example.test');
    expect(config.courtAdminPassword).toBe('court-admin-password');
  });

  test('reports missing setup inputs before calling downstream services', () => {
    expect(__test__.validatePrlHearingsCaseSetupConfig({})).toEqual([
      'IDAM_API_URL, IDAM_TESTING_SUPPORT_URL, or IDAM_TESTING_SUPPORT_USERS_URL',
      'IDAM_WEB_URL',
      'IDAM_TESTING_SUPPORT_URL or IDAM_TESTING_SUPPORT_USERS_URL',
      'CCD_DATA_STORE_URL',
      'PRL_COS_API_URL',
      'IDAM_SECRET',
      'MANAGE_CASE_REDIRECT_URI or ORG_USER_ASSIGNMENT_REDIRECT_URI',
      'S2S_URL or PRL_HEARINGS_S2S_TOKEN',
      'PRL_HEARINGS_SERVICE_MICROSERVICE',
      'CITIZEN_USERNAME',
      'CITIZEN_PASSWORD',
      'COURT_ADMIN_STOKE_USERNAME',
      'COURT_ADMIN_STOKE_PASSWORD',
    ]);
  });

  test('enables dynamic PRL setup only when explicitly enabled', () => {
    expect(__test__.isPrlHearingsCaseSetupEnabled({})).toBe(false);
    expect(__test__.isPrlHearingsCaseSetupEnabled({ CI: 'true' })).toBe(false);
    expect(__test__.isPrlHearingsCaseSetupEnabled({ JENKINS_URL: 'https://build.hmcts.net' })).toBe(false);
    expect(__test__.isPrlHearingsCaseSetupEnabled({ BUILD_NUMBER: '5075' })).toBe(false);
    expect(__test__.isPrlHearingsCaseSetupEnabled({ PRL_HEARINGS_CASE_SETUP: 'false' })).toBe(false);
    expect(__test__.isPrlHearingsCaseSetupEnabled({ CI: 'true', PRL_HEARINGS_CASE_SETUP: 'false' })).toBe(false);
    expect(__test__.isPrlHearingsCaseSetupEnabled({ PRL_HEARINGS_CASE_SETUP: ' TRUE ' })).toBe(true);
  });

  test('formats downstream HTTP failures without embedding response bodies', () => {
    const error = __test__.formatHttpFailure('PRL hearings setup case read failed', 500);

    expect(error.message).toBe(
      'PRL hearings setup case read failed (HTTP 500). Check sanitized service logs for response details.'
    );
    expect(error.message).not.toContain('Body');
  });

  test('uses the one PRL hearing-manager primary location from the signed-in user', () => {
    const resolvePrimaryLocation = resolverTest.resolveHearingManagerPrimaryLocation;
    const userDetails = {
      userInfo: { roles: ['caseworker', 'caseworker-privatelaw-courtadmin'] },
      roleAssignmentInfo: [
        { jurisdiction: 'PRIVATELAW', roleName: 'hearing-manager', primaryLocation: ' 898213 ' },
        { jurisdiction: 'PRIVATELAW', roleName: 'hearing-manager', primaryLocation: '898213' },
        { jurisdiction: 'PRIVATELAW', roleName: 'case-allocator', primaryLocation: '654321' },
        { jurisdiction: 'PUBLICLAW', roleName: 'hearing-manager', primaryLocation: '123456' },
      ],
    };

    expect(resolvePrimaryLocation(userDetails, 'PRIVATELAW')).toBe('898213');
  });

  test('rejects missing or ambiguous PRL hearing-manager primary locations', () => {
    const resolvePrimaryLocation = resolverTest.resolveHearingManagerPrimaryLocation;

    expect(() =>
      resolvePrimaryLocation({ userInfo: { roles: ['caseworker-privatelaw-courtadmin'] }, roleAssignmentInfo: [] }, 'PRIVATELAW')
    ).toThrow(/exactly one.*found 0/i);
    expect(() =>
      resolvePrimaryLocation(
        {
          userInfo: { roles: ['caseworker-privatelaw-courtadmin'] },
          roleAssignmentInfo: [
            { jurisdiction: 'PRIVATELAW', roleName: 'hearing-manager', primaryLocation: '898213' },
            { jurisdiction: 'PRIVATELAW', roleName: 'hearing-manager', primaryLocation: '123456' },
          ],
        },
        'PRIVATELAW'
      )
    ).toThrow(/exactly one.*found 2/i);
  });

  test('rejects a hearing manager location when the signed-in identity lacks the PRL court-admin role', () => {
    const resolvePrimaryLocation = resolverTest.resolveHearingManagerPrimaryLocation;

    expect(() =>
      resolvePrimaryLocation(
        {
          userInfo: { roles: ['caseworker', 'hearing-manager'] },
          roleAssignmentInfo: [{ jurisdiction: 'PRIVATELAW', roleName: 'hearing-manager', primaryLocation: '234946' }],
        },
        'PRIVATELAW'
      )
    ).toThrow(/caseworker-privatelaw-courtadmin/i);
    expect(() =>
      resolvePrimaryLocation(
        {
          roleAssignmentInfo: [{ jurisdiction: 'PRIVATELAW', roleName: 'hearing-manager', primaryLocation: '234946' }],
        },
        'PRIVATELAW'
      )
    ).toThrow(/caseworker-privatelaw-courtadmin/i);
  });

  test('reads one refreshed user-details response before resolving the access profile', async () => {
    const requestedUrls: string[] = [];
    const page = {
      request: {
        get: async (url: string) => {
          requestedUrls.push(url);
          return {
            status: () => 200,
            json: async () => ({
              userInfo: { roles: ['caseworker-privatelaw-courtadmin'] },
              roleAssignmentInfo: [{ jurisdiction: 'PRIVATELAW', roleName: 'hearing-manager', primaryLocation: '234946' }],
            }),
          };
        },
      },
    };

    await expect(resolverTest.getHearingManagerPrimaryLocation(page as never, 'PRIVATELAW')).resolves.toBe('234946');
    expect(requestedUrls).toEqual(['/api/user/details?refreshRoleAssignments=true']);
  });

  test('submits the exact canonical court option supplied by the CCD event token', () => {
    const selectCourtLocation = __test__.selectCourtLocation;
    const courtLocation = selectCourtLocation(
      {
        case_details: {
          case_data: {
            courtList: {
              list_items: [
                { code: '898213:eastlondonfamilypr@justice.gov.uk', label: 'East London Family Court - 898213' },
                { code: '123456:other@justice.gov.uk', label: 'Other Family Court - 123456' },
              ],
            },
          },
        },
      },
      '898213'
    );

    expect(__test__.buildIssueAndSendToLocalCourtEventData(courtLocation)).toEqual({
      data: {
        courtList: {
          value: {
            code: '898213:eastlondonfamilypr@justice.gov.uk',
            label: 'East London Family Court - 898213',
          },
          list_items: [
            {
              code: '898213:eastlondonfamilypr@justice.gov.uk',
              label: 'East London Family Court - 898213',
            },
          ],
        },
      },
    });
  });

  test('rejects missing or ambiguous CCD court options', () => {
    const selectCourtLocation = __test__.selectCourtLocation;
    const response = (list_items: Array<{ code: string; label: string }>) => ({
      case_details: { case_data: { courtList: { list_items } } },
    });

    expect(() => selectCourtLocation(response([]), '898213')).toThrow(/exactly one.*found 0/i);
    expect(() =>
      selectCourtLocation(
        response([
          { code: '898213:first@justice.gov.uk', label: 'First court' },
          { code: '898213:second@justice.gov.uk', label: 'Second court' },
        ]),
        '898213'
      )
    ).toThrow(/exactly one.*found 2/i);
  });

  test('preflights the signed-in hearing manager location against the authoritative C100 Work Allocation list', async () => {
    let requestUrl = '';
    let requestOptions: Record<string, unknown> | undefined;
    const apiContext = {
      post: async (url: string, options: Record<string, unknown>) => {
        requestUrl = url;
        requestOptions = options;
        return {
          ok: () => true,
          status: () => 200,
          json: async () => ({
            data: {
              courtList: {
                list_items: [
                  { code: '123456:other@justice.gov.uk', label: 'Other Family Court - 123456' },
                  { code: '898213:eastlondonfamilypr@justice.gov.uk', label: 'East London Family Court - 898213' },
                ],
              },
            },
          }),
        };
      },
    } as unknown as APIRequestContext;

    const selected = await __test__.preflightWorkAllocationCourt(
      apiContext,
      { prlCosApiUrl: 'https://prl-cos-api.example.test/' } as Required<PrlHearingsCaseSetupConfig>,
      'court-admin-token',
      's2s-token',
      '898213'
    );

    expect(requestUrl).toBe('https://prl-cos-api.example.test/transfer-court/about-to-start');
    expect(requestOptions).toEqual({
      headers: {
        Authorization: 'Bearer court-admin-token',
        ServiceAuthorization: 'Bearer s2s-token',
        'Content-Type': 'application/json',
      },
      data: {
        event_id: 'transferToAnotherCourt',
        case_details: {
          jurisdiction: 'PRIVATELAW',
          case_type_id: 'PRLAPPS',
          state: 'SUBMITTED_PAID',
          data: {
            caseTypeOfApplication: 'C100',
            courtId: '898213',
          },
        },
      },
      failOnStatusCode: false,
    });
    expect(selected).toEqual({
      code: '898213:eastlondonfamilypr@justice.gov.uk',
      label: 'East London Family Court - 898213',
    });
  });

  test('rejects unavailable, malformed, or ambiguous Work Allocation court options', async () => {
    const selectWorkAllocationCourtLocation = __test__.selectWorkAllocationCourtLocation;

    expect(() => selectWorkAllocationCourtLocation({}, '898213')).toThrow(/Work Allocation.*found 0/i);
    expect(() =>
      selectWorkAllocationCourtLocation(
        {
          data: {
            courtList: {
              list_items: [
                { code: '8982130:not-the-same-court@justice.gov.uk', label: 'Prefix trap' },
                { code: '898213:missing-label@justice.gov.uk', label: ' ' },
              ],
            },
          },
        },
        '898213'
      )
    ).toThrow(/Work Allocation.*found 0/i);
    expect(() =>
      selectWorkAllocationCourtLocation(
        {
          data: {
            courtList: {
              list_items: [
                { code: '898213:first@justice.gov.uk', label: 'First court' },
                { code: '898213:second@justice.gov.uk', label: 'Second court' },
              ],
            },
          },
        },
        '898213'
      )
    ).toThrow(/Work Allocation.*found 2/i);
  });

  test('reports a sanitized Work Allocation preflight HTTP failure', async () => {
    const apiContext = {
      post: async () => ({
        ok: () => false,
        status: () => 503,
      }),
    } as unknown as APIRequestContext;

    await expect(
      __test__.preflightWorkAllocationCourt(
        apiContext,
        { prlCosApiUrl: 'https://prl-cos-api.example.test' } as Required<PrlHearingsCaseSetupConfig>,
        'court-admin-token',
        's2s-token',
        '898213'
      )
    ).rejects.toThrow(
      'PRL hearings setup Work Allocation court preflight failed (HTTP 503). Check sanitized service logs for response details.'
    );
  });

  test('completes Work Allocation preflight before acquiring citizen credentials or creating a case', async () => {
    const calls: string[] = [];

    const result = await __test__.prepareCitizenCaseAfterPreflight(
      async () => {
        calls.push('work-allocation-preflight');
      },
      async () => {
        calls.push('citizen-token');
        return 'citizen-token';
      },
      async (citizenToken) => {
        calls.push(`citizen-create:${citizenToken}`);
        return { id: '1111222233334444' };
      }
    );

    expect(calls).toEqual(['work-allocation-preflight', 'citizen-token', 'citizen-create:citizen-token']);
    expect(result).toEqual({
      citizenToken: 'citizen-token',
      createdCase: { id: '1111222233334444' },
    });
  });

  test('stops before acquiring citizen credentials or creating a case when Work Allocation preflight fails', async () => {
    const calls: string[] = [];

    await expect(
      __test__.prepareCitizenCaseAfterPreflight(
        async () => {
          calls.push('work-allocation-preflight');
          throw new Error('location is not Work Allocation enabled');
        },
        async () => {
          calls.push('citizen-token');
          return 'citizen-token';
        },
        async () => {
          calls.push('citizen-create');
          return { id: '1111222233334444' };
        }
      )
    ).rejects.toThrow('location is not Work Allocation enabled');
    expect(calls).toEqual(['work-allocation-preflight']);
  });

  test('accepts only an issued Work Allocation case at the signed-in manager location', () => {
    expect(() =>
      __test__.validateIssuedCase(
        {
          state: 'CASE_ISSUED',
          data: {
            caseManagementLocation: { baseLocation: '898213' },
          },
        },
        '898213'
      )
    ).not.toThrow();

    expect(() =>
      __test__.validateIssuedCase(
        {
          state: 'PROCEEDS_IN_HERITAGE_SYSTEM',
          data: {
            caseManagementLocation: { baseLocation: '898213' },
            isNonWorkAllocationEnabledCourtSelected: 'Yes',
          },
        },
        '898213'
      )
    ).toThrow(/expected state CASE_ISSUED.*PROCEEDS_IN_HERITAGE_SYSTEM/i);

    expect(() =>
      __test__.validateIssuedCase(
        {
          state: 'CASE_ISSUED',
          data: {
            caseManagementLocation: { baseLocation: '898213' },
            isNonWorkAllocationEnabledCourtSelected: 'Yes',
          },
        },
        '898213'
      )
    ).toThrow(/outside the Work Allocation path/i);

    expect(() =>
      __test__.validateIssuedCase(
        {
          state: 'CASE_ISSUED',
          data: {
            caseManagementLocation: { baseLocation: '123456' },
          },
        },
        '898213'
      )
    ).toThrow(/expected case location 898213.*123456/i);
  });

  test('extracts supported CCD case-reference response shapes', () => {
    expect(__test__.extractCaseReference({ id: 1234567812345678 })).toBe('1234567812345678');
    expect(__test__.extractCaseReference({ caseReference: '1111222233334444' })).toBe('1111222233334444');
    expect(__test__.extractCaseReference({ case_reference: '9999888877776666' })).toBe('9999888877776666');
  });

  test('rejects malformed CCD case-reference responses', () => {
    expect(() => __test__.extractCaseReference({ id: 'not-a-case-reference' })).toThrow(/valid 16-digit case reference/);
  });
});
