import { test, expect } from '@playwright/test';

import { __test__ } from '../../E2E/utils/test-setup/prlHearingsCaseSetup';

test.describe('PRL hearings case setup', () => {
  test('resolves required setup config with redirect fallback', () => {
    const config = __test__.resolvePrlHearingsCaseSetupConfig({
      IDAM_TESTING_SUPPORT_URL: 'https://idam-testing-support-api.aat.platform.hmcts.net',
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
      prlCosApiUrl: 'https://prl-cos-api.aat.platform.hmcts.net',
      ccdClientId: 'xuiwebapp',
      redirectUri: 'https://manage-case.aat.platform.hmcts.net/oauth2/callback',
      serviceMicroservice: 'ccd_data',
      citizenUsername: 'citizen@example.test',
      courtAdminUsername: 'court-admin@example.test',
    });
    expect(__test__.validatePrlHearingsCaseSetupConfig(config)).toEqual([]);
  });

  test('ignores unrelated caseworker credentials because the PRL setup flow does not use that actor', () => {
    const config = __test__.resolvePrlHearingsCaseSetupConfig({
      IDAM_TESTING_SUPPORT_URL: 'https://idam-testing-support-api.aat.platform.hmcts.net',
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
      'IDAM_API_URL or IDAM_TESTING_SUPPORT_URL',
      'CCD_DATA_STORE_URL',
      'PRL_COS_API_URL',
      'CCD_DATA_STORE_CLIENT_ID',
      'IDAM_SECRET',
      'MANAGE_CASE_REDIRECT_URI or ORG_USER_ASSIGNMENT_REDIRECT_URI',
      'S2S_URL',
      'PRL_HEARINGS_SERVICE_MICROSERVICE',
      'CITIZEN_USERNAME',
      'CITIZEN_PASSWORD',
      'COURT_ADMIN_STOKE_USERNAME',
      'COURT_ADMIN_STOKE_PASSWORD',
    ]);
  });

  test('keeps dynamic PRL setup opt-in so the resolver can fall back to global search by default', () => {
    expect(__test__.isPrlHearingsCaseSetupEnabled({})).toBe(false);
    expect(__test__.isPrlHearingsCaseSetupEnabled({ PRL_HEARINGS_CASE_SETUP: 'false' })).toBe(false);
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
