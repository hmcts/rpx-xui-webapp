import { faker } from '@faker-js/faker';

import type { CcdCaseDetails } from '../../E2E/utils/test-setup/journeys/civilCaseJourneys.js';

const CLAIMANT_ROLE = 'Claimant 1';

const CLAIMANT_NAME = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  title: faker.person.prefix(),
};

export const EXPECTED_CLAIMANT_PARTY_NAME = `${CLAIMANT_NAME.title} ${CLAIMANT_NAME.firstName} ${CLAIMANT_NAME.lastName}`;

const REQUIRED_CIVIL_MEDIATION_ENV = {
  IDAM_API_URL: 'https://idam-api.example.test',
  IDAM_CLIENT_SECRET: faker.string.alphanumeric(16),
  IDAM_TEST_SUPPORT_API_URL: 'https://idam-testing-support-api.example.test',
  PW_CIVIL_CITIZEN_PASSWORD: faker.internet.password(),
  PW_CIVIL_SERVICE_URL: 'http://civil-service.example.test',
  SERVICE_AUTH_PROVIDER_API_BASE_URL: 'http://service-auth-provider.example.test',
  S2S_SECRET: faker.string.alphanumeric(16),
} as const;

export function createCaseDetails(data: Record<string, unknown> = {}, state = 'IN_MEDIATION'): CcdCaseDetails {
  return {
    data,
    state: {
      id: state,
    },
  };
}

export function createCivilParty(options: { includeExistingFlags?: boolean } = {}): Record<string, unknown> {
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

export function createPartyFlag(flagComment: string): Record<string, unknown> {
  return {
    id: '0',
    value: {
      flagComment,
      flagStatus: 'ACTIVE',
      flagType: 'Other',
    },
  };
}

export function createCaseViewPayloadWithClaimantField(): CcdCaseDetails {
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

export function configureRequiredCivilMediationEnv(): void {
  for (const [key, value] of Object.entries(REQUIRED_CIVIL_MEDIATION_ENV)) {
    process.env[key] = value;
  }
}
