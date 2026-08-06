import { test, expect } from '@playwright/test';

import { __test__ } from '../../E2E/utils/test-setup/prlHearingsCaseSetup';

test.describe('PRL hearings case setup', () => {
  test('resolves required setup config with redirect fallback', () => {
    const config = __test__.resolvePrlHearingsCaseSetupConfig({
      IDAM_TESTING_SUPPORT_URL: 'https://idam-testing-support-api.aat.platform.hmcts.net',
      IDAM_WEB_URL: 'https://idam-web-public.aat.platform.hmcts.net',
      CCD_DATA_STORE_URL: 'https://ccd-data-store-api.aat.platform.hmcts.net',
      PRL_COS_API_URL: 'https://prl-cos-api.aat.platform.hmcts.net',
      IDAM_CLIENT_ID: 'xuiwebapp',
      IDAM_SECRET: 'secret',
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
      ccdClientId: 'xuiwebapp',
      redirectUri: 'https://manage-case.aat.platform.hmcts.net/oauth2/callback',
      serviceMicroservice: 'ccd_data',
      s2sUrl: 'http://service-auth/testing-support/lease',
      citizenUsername: 'citizen@example.test',
      courtAdminUsername: 'court-admin@example.test',
    });
    expect(__test__.validatePrlHearingsCaseSetupConfig(config)).toEqual([]);
  });

  test('prefers the PRL hearings IDAM secret alias without overwriting the app IDAM secret', () => {
    const config = __test__.resolvePrlHearingsCaseSetupConfig({
      IDAM_SECRET: 'xui-webapp-secret',
      PRL_HEARINGS_IDAM_SECRET: 'prl-cos-secret',
    });

    expect(config.idamSecret).toBe('prl-cos-secret');
  });

  test('allows a PRL-specific pre-issued S2S token instead of requiring a locally reachable S2S URL', () => {
    const config = __test__.resolvePrlHearingsCaseSetupConfig({
      IDAM_TESTING_SUPPORT_URL: 'https://idam-testing-support-api.aat.platform.hmcts.net',
      IDAM_WEB_URL: 'https://idam-web-public.aat.platform.hmcts.net',
      CCD_DATA_STORE_URL: 'https://ccd-data-store-api.aat.platform.hmcts.net',
      PRL_COS_API_URL: 'https://prl-cos-api.aat.platform.hmcts.net',
      IDAM_CLIENT_ID: 'xuiwebapp',
      IDAM_SECRET: 'secret',
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
      IDAM_CLIENT_ID: 'xuiwebapp',
      IDAM_SECRET: 'secret',
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
      'CCD_DATA_STORE_CLIENT_ID',
      'PRL_HEARINGS_IDAM_SECRET or IDAM_SECRET',
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

  test('extracts supported CCD case-reference response shapes', () => {
    expect(__test__.extractCaseReference({ id: 1234567812345678 })).toBe('1234567812345678');
    expect(__test__.extractCaseReference({ caseReference: '1111222233334444' })).toBe('1111222233334444');
    expect(__test__.extractCaseReference({ case_reference: '9999888877776666' })).toBe('9999888877776666');
  });

  test('rejects malformed CCD case-reference responses', () => {
    expect(() => __test__.extractCaseReference({ id: 'not-a-case-reference' })).toThrow(/valid 16-digit case reference/);
  });
});
