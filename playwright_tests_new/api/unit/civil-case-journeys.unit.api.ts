import { expect, test } from '@playwright/test';

import {
  __test__ as civilCaseJourneyTestHelpers,
  type CcdCaseDetails,
} from '../../E2E/utils/test-setup/journeys/civilCaseJourneys.js';

const ENV_KEYS = [
  'CCD_DATA_STORE_URL',
  'CIVIL_CITIZEN_PASSWORD',
  'CIVIL_SERVICE_URL',
  'CITIZEN_PASSWORD',
  'ENVIRONMENT',
  'IDAM_API_URL',
  'IDAM_TEST_SUPPORT_API_URL',
  'IDAM_TESTING_SUPPORT_URL',
  'PW_CIVIL_CITIZEN_PASSWORD',
  'PW_CIVIL_CLAIMANT_EMAIL',
  'PW_CIVIL_CREATE_CITIZEN_ACCOUNTS',
  'PW_CIVIL_COURT_STAFF_PASSWORD',
  'PW_CIVIL_DEFENDANT_EMAIL',
  'PW_CIVIL_API_REQUEST_TIMEOUT_MS',
  'PW_CIVIL_SERVICE_URL',
  'PW_CIVIL_S2S_TOKEN',
  'PW_CIVIL_ROLE_ASSIGNMENT_WAIT_TIMEOUT_MS',
  'PW_IDAM_TEST_SUPPORT_API_URL',
  'PW_IDAM_TESTING_SUPPORT_API_URL',
  'SERVICE_AUTH_PROVIDER_API_BASE_URL',
  'SERVICES_CCD_DATA_STORE_API',
  'SERVICES_IDAM_API_URL',
  'S2S_SECRET',
  'S2S_URL',
  'TEST_ENV',
  'TEST_PASSWORD',
  'CIVIL_COURT_STAFF_PASSWORD',
] as const;

const MEDIATION_STATE = 'IN_MEDIATION';

test.describe.configure({ mode: 'serial' });

test.describe('Civil journey helpers', { tag: '@svc-internal' }, () => {
  let originalEnvValues: Record<(typeof ENV_KEYS)[number], string | undefined>;

  test.beforeEach(() => {
    originalEnvValues = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]])) as Record<
      (typeof ENV_KEYS)[number],
      string | undefined
    >;
    for (const key of ENV_KEYS) {
      delete process.env[key];
    }
  });

  test.afterEach(() => {
    for (const key of ENV_KEYS) {
      const originalValue = originalEnvValues[key];
      if (typeof originalValue === 'string') {
        process.env[key] = originalValue;
      } else {
        delete process.env[key];
      }
    }
  });

  test('resolveCivilApiConfig resolves the configured endpoints and generated citizen placeholders', () => {
    configureBaseCivilEnv();
    process.env.PW_CIVIL_CREATE_CITIZEN_ACCOUNTS = 'true';

    const config = civilCaseJourneyTestHelpers.resolveCivilApiConfig();

    expect(config.civilServiceUrl).toBe('http://civil-service-demo.service.core-compute-demo.internal');
    expect(config.idamApiUrl).toBe('https://idam-api.example.test');
    expect(config.idamTestSupportApiUrl).toBe('https://idam-testing-support-api.example.test');
    expect(config.serviceAuthProviderUrl).toBe('http://service-auth-provider.example.test');
    expect(config.s2sSecret).toBe('service-auth-secret');
    expect(config.claimantUser.email).toMatch(/^claimantcitizen-[a-z0-9-]+@example\.com$/);
    expect(config.defendantUser.email).toMatch(/^defendantcitizen-[a-z0-9-]+@example\.com$/);
    expect(config.claimantUser.password).toBe('citizen-password');
    expect(config.defendantUser.password).toBe('citizen-password');
    expect(config.createClaimantAccount).toBe(true);
    expect(config.createDefendantAccount).toBe(true);
  });

  test('withGeneratedCivilCitizenUsers replaces placeholder users with unique generated accounts', () => {
    configureBaseCivilEnv();
    process.env.PW_CIVIL_CREATE_CITIZEN_ACCOUNTS = 'true';

    const baseConfig = civilCaseJourneyTestHelpers.resolveCivilApiConfig();
    const generatedConfig = civilCaseJourneyTestHelpers.withGeneratedCivilCitizenUsers(baseConfig);
    const nextGeneratedConfig = civilCaseJourneyTestHelpers.withGeneratedCivilCitizenUsers(baseConfig);

    expect(generatedConfig.createClaimantAccount).toBe(true);
    expect(generatedConfig.createDefendantAccount).toBe(true);
    expect(generatedConfig.claimantUser.password).toBe('court-staff-password');
    expect(generatedConfig.defendantUser.password).toBe('court-staff-password');
    expect(generatedConfig.claimantUser.email).toMatch(/^claimant-civil-[a-z0-9-]+@example\.com$/);
    expect(generatedConfig.defendantUser.email).toMatch(/^defendant-civil-[a-z0-9-]+@example\.com$/);
    expect(generatedConfig.claimantUser.email).not.toBe(nextGeneratedConfig.claimantUser.email);
    expect(generatedConfig.defendantUser.email).not.toBe(nextGeneratedConfig.defendantUser.email);
  });

  test('assignCivilCaseRoleToUser retries transient failures before succeeding', async () => {
    configureBaseCivilEnv();
    process.env.PW_CIVIL_ROLE_ASSIGNMENT_WAIT_TIMEOUT_MS = '1000';
    process.env.PW_CIVIL_API_REQUEST_TIMEOUT_MS = '4321';

    const requestAttempts: Array<{
      url: string;
      headers: Record<string, string>;
      timeout: number;
    }> = [];
    const waitCalls: number[] = [];
    let attempt = 0;
    const page = {
      isClosed: () => false,
      waitForTimeout: async (timeout: number) => {
        waitCalls.push(timeout);
      },
      request: {
        post: async (
          url: string,
          options: {
            data: Record<string, unknown>;
            failOnStatusCode: boolean;
            headers: Record<string, string>;
            timeout: number;
          }
        ) => {
          requestAttempts.push({ url, headers: options.headers, timeout: options.timeout });
          attempt += 1;
          if (attempt === 1) {
            return {
              ok: () => false,
              status: () => 429,
              text: async () => 'case status did not qualify for the event',
            };
          }

          return {
            ok: () => true,
            status: () => 200,
            text: async () => '',
          };
        },
      },
    };

    await civilCaseJourneyTestHelpers.assignCivilCaseRoleToUser({
      page: page as never,
      config: {
        civilServiceUrl: 'https://civil-service.example.test',
        idamApiUrl: 'https://idam-api.example.test',
        claimantUser: { email: 'claimant@example.com', password: 'citizen-password' },
        defendantUser: { email: 'defendant@example.com', password: 'citizen-password' },
        createClaimantAccount: false,
        createDefendantAccount: false,
        s2sSecret: 'service-auth-secret',
      },
      caseNumber: '123456789',
      caseRole: 'DEFENDANT',
      idamToken: 'idam-token',
    });

    expect(attempt).toBe(2);
    expect(waitCalls).toHaveLength(1);
    expect(requestAttempts).toEqual([
      {
        url: 'https://civil-service.example.test/testing-support/assign-case/123456789/DEFENDANT',
        headers: {
          Authorization: 'Bearer idam-token',
          'Content-Type': 'application/json',
        },
        timeout: 4321,
      },
      {
        url: 'https://civil-service.example.test/testing-support/assign-case/123456789/DEFENDANT',
        headers: {
          Authorization: 'Bearer idam-token',
          'Content-Type': 'application/json',
        },
        timeout: 4321,
      },
    ]);
  });

  test('waitForCaseState keeps polling until the expected state is returned', async () => {
    const pendingCaseDetails = createCaseDetails('ASSIGNED', { marker: 'pending' });
    const finalCaseDetails = createCaseDetails(MEDIATION_STATE, { marker: 'final' });
    const waitCalls: number[] = [];
    const fetchCalls: string[] = [];
    const page = {
      isClosed: () => false,
      waitForTimeout: async (timeout: number) => {
        waitCalls.push(timeout);
      },
    };

    const result = await civilCaseJourneyTestHelpers.waitForCaseState(
      {
        page: page as never,
        caseNumber: '123456789',
        expectedState: MEDIATION_STATE,
        context: 'after Civil API mediation setup',
      },
      async (_page, caseNumber) => {
        fetchCalls.push(caseNumber);
        return fetchCalls.length < 3 ? pendingCaseDetails : finalCaseDetails;
      }
    );

    expect(result).toBe(finalCaseDetails);
    expect(fetchCalls).toEqual(['123456789', '123456789', '123456789']);
    expect(waitCalls).toEqual([3_000, 3_000]);
  });
});

function configureBaseCivilEnv(): void {
  process.env.CCD_DATA_STORE_URL = 'https://ccd-data-store-api-demo.service.core-compute-demo.internal';
  process.env.IDAM_API_URL = 'https://idam-api.example.test/o/token';
  process.env.IDAM_TEST_SUPPORT_API_URL = 'https://idam-testing-support-api.example.test/test/idam/burner/users';
  process.env.PW_CIVIL_CITIZEN_PASSWORD = 'citizen-password';
  process.env.PW_CIVIL_COURT_STAFF_PASSWORD = 'court-staff-password';
  process.env.SERVICE_AUTH_PROVIDER_API_BASE_URL = 'http://service-auth-provider.example.test/';
  process.env.S2S_SECRET = 'service-auth-secret';
  process.env.TEST_ENV = 'demo';
}

function createCaseDetails(state: string, data: Record<string, unknown> = {}): CcdCaseDetails {
  return {
    data,
    state,
  };
}
