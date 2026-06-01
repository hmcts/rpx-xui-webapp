import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';

import {
  buildDataLossComparisonReport,
  normaliseCaseDataForDataLossComparison,
  rawCivilDataLossAttachmentsEnabled,
  redactCaseReference,
  resolveCivilClaimantPartyName,
} from '../../E2E/utils/case-flags.utils.js';
import {
  __test__ as civilCaseJourneyTestHelpers,
  getCivilLipMediationApiMissingConfiguration,
  type CcdCaseDetails,
} from '../../E2E/utils/test-setup/journeys/civilCaseJourneys.js';

const ENV_KEYS = [
  'CI',
  'CITIZEN_PASSWORD',
  'CIVIL_SERVICE_URL',
  'IDAM_API_URL',
  'IDAM_CLIENT_SECRET',
  'IDAM_TEST_SUPPORT_API_URL',
  'IDAM_TESTING_SUPPORT_API_URL',
  'PW_CIVIL_CITIZEN_PASSWORD',
  'PW_CIVIL_CLAIMANT_EMAIL',
  'PW_CIVIL_CREATE_CITIZEN_ACCOUNTS',
  'PW_CIVIL_DATA_LOSS_ATTACH_RAW_JSON',
  'PW_CIVIL_DEFENDANT_EMAIL',
  'PW_CIVIL_SERVICE_URL',
  'PW_IDAM_API_URL',
  'PW_IDAM_CLIENT_SECRET',
  'PW_IDAM_TESTING_SUPPORT_API_URL',
  'PW_SERVICE_AUTH_PROVIDER_URL',
  'PW_S2S_SECRET',
  'SERVICE_AUTH_PROVIDER_API_BASE_URL',
  'SERVICE_AUTH_PROVIDER_URL',
  'S2S_SECRET',
] as const;

const MEDIATION_STATE = 'IN_MEDIATION';
const TEST_CASE_REFERENCE_SUFFIX = '6240';
const TEST_CASE_REFERENCE = `${faker.string.numeric(12)}${TEST_CASE_REFERENCE_SUFFIX}`;
const REDACTED_TEST_CASE_REFERENCE = `${'*'.repeat(TEST_CASE_REFERENCE.length - TEST_CASE_REFERENCE_SUFFIX.length)}${TEST_CASE_REFERENCE_SUFFIX}`;
const TEST_FLAG_COMMENT = 'Data loss Civil Create Case Flag';
const CLAIMANT_ROLE = 'Claimant 1';
const CLAIMANT_NAME = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  title: faker.person.prefix(),
};
const EXPECTED_CLAIMANT_PARTY_NAME = `${CLAIMANT_NAME.title} ${CLAIMANT_NAME.firstName} ${CLAIMANT_NAME.lastName}`;
const REQUIRED_CIVIL_MEDIATION_ENV = {
  IDAM_API_URL: 'https://idam-api.example.test',
  IDAM_CLIENT_SECRET: faker.string.alphanumeric(16),
  IDAM_TEST_SUPPORT_API_URL: 'https://idam-testing-support-api.example.test',
  PW_CIVIL_CITIZEN_PASSWORD: faker.internet.password(),
  PW_CIVIL_SERVICE_URL: 'http://civil-service.example.test',
  SERVICE_AUTH_PROVIDER_API_BASE_URL: 'http://service-auth-provider.example.test',
  S2S_SECRET: faker.string.alphanumeric(16),
} as const;

let originalEnvValues: Record<(typeof ENV_KEYS)[number], string | undefined>;

test.describe.configure({ mode: 'serial' });

test.describe('Civil case flag data-loss helpers', { tag: '@svc-internal' }, () => {
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

  test('normaliser removes only the expected created flag while preserving existing flag metadata', () => {
    const baseline = createCaseDetails({
      applicant1: createCivilParty({ includeExistingFlags: true }),
    });
    const updated = createCaseDetails({
      applicant1: createCivilParty({ includeExistingFlags: true }),
      partyFlags: [createPartyFlag(TEST_FLAG_COMMENT)],
    });
    const updatedWithoutExistingFlags = createCaseDetails({
      applicant1: createCivilParty({ includeExistingFlags: false }),
    });

    expect(
      normaliseCaseDataForDataLossComparison(updated, {
        ignoredFlagComment: TEST_FLAG_COMMENT,
      })
    ).toEqual(normaliseCaseDataForDataLossComparison(baseline));
    expect(normaliseCaseDataForDataLossComparison(updatedWithoutExistingFlags)).not.toEqual(
      normaliseCaseDataForDataLossComparison(baseline)
    );
  });

  test('claimant name resolution uses Civil applicant fields', () => {
    expect(resolveCivilClaimantPartyName(createCaseDetails({ applicant1: createCivilParty() }))).toBe(
      EXPECTED_CLAIMANT_PARTY_NAME
    );
  });

  test('claimant name resolution supports case-view field payloads', () => {
    expect(resolveCivilClaimantPartyName(createCaseViewPayloadWithClaimantField())).toBe(EXPECTED_CLAIMANT_PARTY_NAME);
  });

  test('data-loss report redacts case reference and describes raw attachment state', () => {
    const report = buildDataLossComparisonReport({
      baselineCaseDetails: createCaseDetails(),
      caseNumber: TEST_CASE_REFERENCE,
      normalisedBaseline: { state: MEDIATION_STATE },
      normalisedUpdated: { state: MEDIATION_STATE },
      rawJsonAttached: false,
      updatedCaseDetails: createCaseDetails(),
    });

    expect(report).toContain(`Case number: ${REDACTED_TEST_CASE_REFERENCE}`);
    expect(report).not.toContain(TEST_CASE_REFERENCE);
    expect(report).toContain('Raw and normalised JSON snapshots are not attached');
  });

  test('raw JSON attachments are local debug only', () => {
    process.env.PW_CIVIL_DATA_LOSS_ATTACH_RAW_JSON = 'true';
    expect(rawCivilDataLossAttachmentsEnabled()).toBe(true);

    process.env.CI = 'true';
    expect(rawCivilDataLossAttachmentsEnabled()).toBe(false);
  });

  test('Civil mediation setup requires generated or explicitly configured citizen users', () => {
    configureRequiredCivilMediationEnv();
    process.env.PW_CIVIL_CREATE_CITIZEN_ACCOUNTS = 'false';

    expect(getCivilLipMediationApiMissingConfiguration()).toContain(
      'generated Civil users or PW_CIVIL_CLAIMANT_EMAIL/PW_CIVIL_DEFENDANT_EMAIL'
    );

    process.env.PW_CIVIL_CREATE_CITIZEN_ACCOUNTS = 'true';
    expect(getCivilLipMediationApiMissingConfiguration()).not.toContain(
      'generated Civil users or PW_CIVIL_CLAIMANT_EMAIL/PW_CIVIL_DEFENDANT_EMAIL'
    );
  });

  test('Civil LiP mediation setup returns the payload fetched after the expected state wait', async () => {
    const expectedCaseDetails = createCaseDetails({ marker: faker.string.uuid() });
    const caseNumber = faker.string.numeric(16);
    const waitCalls: Array<{
      caseNumber: string;
      expectedState: string;
      context: string;
    }> = [];

    const result = await civilCaseJourneyTestHelpers.waitForCivilLipMediationCaseDetails(
      {
        caseNumber,
        expectedState: MEDIATION_STATE,
        page: {} as never,
      },
      async (options) => {
        waitCalls.push({
          caseNumber: options.caseNumber,
          expectedState: options.expectedState,
          context: options.context,
        });
        return expectedCaseDetails;
      }
    );

    expect(result).toBe(expectedCaseDetails);
    expect(waitCalls).toEqual([
      {
        caseNumber,
        expectedState: MEDIATION_STATE,
        context: 'after Civil LiP mediation setup',
      },
    ]);
  });

  test('case reference redaction keeps only the final four digits', () => {
    expect(redactCaseReference(TEST_CASE_REFERENCE)).toBe(REDACTED_TEST_CASE_REFERENCE);
    expect(redactCaseReference('123')).toBe('****');
  });
});

function createCaseDetails(data: Record<string, unknown> = {}, state = MEDIATION_STATE): CcdCaseDetails {
  return {
    data,
    state: {
      id: state,
    },
  };
}

function createCivilParty(options: { includeExistingFlags?: boolean } = {}): Record<string, unknown> {
  const party = {
    individualFirstName: CLAIMANT_NAME.firstName,
    individualLastName: CLAIMANT_NAME.lastName,
    individualTitle: CLAIMANT_NAME.title,
  };

  return options.includeExistingFlags
    ? {
        flags: {
          partyName: EXPECTED_CLAIMANT_PARTY_NAME,
          roleOnCase: CLAIMANT_ROLE,
        },
        ...party,
      }
    : party;
}

function createPartyFlag(flagComment: string): Record<string, unknown> {
  return {
    id: '0',
    value: {
      flagComment,
      flagStatus: 'ACTIVE',
      flagType: 'Other',
    },
  };
}

function createCaseViewPayloadWithClaimantField(): CcdCaseDetails {
  return {
    tabs: [
      {
        fields: [
          {
            id: 'respondent1',
            value: {
              companyName: faker.company.name(),
            },
          },
          {
            id: 'applicant1',
            formatted_value: createCivilParty({ includeExistingFlags: true }),
          },
        ],
      },
    ],
  };
}

function configureRequiredCivilMediationEnv(): void {
  for (const [key, value] of Object.entries(REQUIRED_CIVIL_MEDIATION_ENV)) {
    process.env[key] = value;
  }
}
