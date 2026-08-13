import { expect, test } from '@playwright/test';
import {
  applyHearingManagerSessionCookies,
  buildLargeListedHearings,
  resolveHearingsCaseRoute,
} from '../../integration/helpers/hearingJourneySetup.helper.js';

test.describe('hearing journey setup helper', { tag: '@svc-internal' }, () => {
  test('uses explicit route fields before routeConfig.caseConfig', () => {
    expect(
      resolveHearingsCaseRoute({
        jurisdictionId: 'EXPLICIT_JURISDICTION',
        caseTypeId: 'EXPLICIT_CASE_TYPE',
        caseReference: '1234123412341234',
        routeConfig: {
          caseConfig: {
            jurisdictionId: 'CONFIG_JURISDICTION',
            caseTypeId: 'CONFIG_CASE_TYPE',
            caseReference: '9999888877776666',
          },
        },
      })
    ).toEqual({
      jurisdictionId: 'EXPLICIT_JURISDICTION',
      caseTypeId: 'EXPLICIT_CASE_TYPE',
      caseReference: '1234123412341234',
    });
  });

  test('uses routeConfig.caseConfig when explicit route fields are omitted', () => {
    expect(
      resolveHearingsCaseRoute({
        routeConfig: {
          caseConfig: {
            jurisdictionId: 'SSCS',
            caseTypeId: 'Benefit',
            caseReference: '1111222233334444',
          },
        },
      })
    ).toEqual({
      jurisdictionId: 'SSCS',
      caseTypeId: 'Benefit',
      caseReference: '1111222233334444',
    });
  });

  test('falls back to the default hearings route when no overrides are supplied', () => {
    expect(resolveHearingsCaseRoute({ routeConfig: {} })).toEqual({
      jurisdictionId: 'CIVIL',
      caseTypeId: 'CIVIL',
      caseReference: '1234567812345678',
    });
  });

  test('builds a stable listed-hearings dataset with sequential ids and hearing types', () => {
    expect(buildLargeListedHearings(3)).toEqual([
      expect.objectContaining({
        hearingId: '1705615000000',
        hearingType: 'ABA5-LISTED-1',
      }),
      expect.objectContaining({
        hearingId: '1705615000001',
        hearingType: 'ABA5-LISTED-2',
      }),
      expect.objectContaining({
        hearingId: '1705615000002',
        hearingType: 'ABA5-LISTED-3',
      }),
    ]);
  });

  test('annotates the hearing identity selected after session fallback', async () => {
    const environment = {
      HEARING_MANAGER_CR84_ON_1_USERNAME: 'hearing-on-1@example.test',
      HEARING_MANAGER_CR84_ON_1_PASSWORD: 'not-a-real-password',
      HEARING_MANAGER_CR84_ON_2_USERNAME: 'hearing-on-2@example.test',
      HEARING_MANAGER_CR84_ON_2_PASSWORD: 'not-a-real-password',
      HEARING_MANAGER_CR84_ON_3_USERNAME: '',
      HEARING_MANAGER_CR84_ON_3_PASSWORD: '',
      HEARING_MANAGER_CR84_ON_4_USERNAME: '',
      HEARING_MANAGER_CR84_ON_4_PASSWORD: '',
    };
    const previousEnvironment = Object.fromEntries(Object.keys(environment).map((key) => [key, process.env[key]]));
    const testInfo = { annotations: [], parallelIndex: 0 };
    const fallbackIdentity = 'HEARING_MANAGER_CR84_ON-2';

    try {
      Object.assign(process.env, environment);
      await applyHearingManagerSessionCookies({} as never, 'HEARING_MANAGER_CR84_ON', testInfo, async (_page, candidates) => {
        expect(candidates).toEqual(['HEARING_MANAGER_CR84_ON-1', fallbackIdentity]);
        return { userIdentifier: fallbackIdentity, session: {} as never };
      });

      expect(testInfo.annotations).toEqual([{ type: 'session-user', description: fallbackIdentity }]);
    } finally {
      for (const [key, value] of Object.entries(previousEnvironment)) {
        if (value === undefined) {
          delete process.env[key];
        } else {
          process.env[key] = value;
        }
      }
    }
  });
});
