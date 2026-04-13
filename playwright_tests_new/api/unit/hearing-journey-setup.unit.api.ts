import { expect, test } from '@playwright/test';
import { buildLargeListedHearings, resolveHearingsCaseRoute } from '../../integration/helpers/hearingJourneySetup.helper.js';

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
});
