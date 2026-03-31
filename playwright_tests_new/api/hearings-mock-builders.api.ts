import { expect, test } from '@playwright/test';
import {
  AWAITING_LISTING_HEARING_SCENARIO,
  HEARINGS_CASE_REFERENCE,
  LISTED_HEARING_SCENARIO,
  buildHearingsEnvironmentConfigMock,
  buildHearingsListMock,
} from '../integration/mocks/hearings.mock';

test.describe('Hearings mock builders', { tag: '@svc-internal' }, () => {
  test('buildHearingsListMock maps CR84 hearing statuses into upcoming rows', () => {
    const payload = buildHearingsListMock([LISTED_HEARING_SCENARIO, AWAITING_LISTING_HEARING_SCENARIO]);

    expect(payload.caseRef).toBe(HEARINGS_CASE_REFERENCE);
    expect(payload.caseHearings).toHaveLength(2);
    expect(payload.caseHearings[0]).toMatchObject({
      hearingID: Number(LISTED_HEARING_SCENARIO.hearingId),
      hmcStatus: 'LISTED',
      exuiDisplayStatus: 'LISTED',
      exuiSectionStatus: 'Current and upcoming',
    });
    expect(payload.caseHearings[1]).toMatchObject({
      hearingID: Number(AWAITING_LISTING_HEARING_SCENARIO.hearingId),
      hmcStatus: 'AWAITING_LISTING',
      exuiDisplayStatus: 'WAITING TO BE LISTED',
      exuiSectionStatus: 'Current and upcoming',
    });
  });

  test('buildHearingsEnvironmentConfigMock separates hearings-enabled and amendments-enabled case variations', () => {
    const config = buildHearingsEnvironmentConfigMock({
      enabledCaseVariations: [{ jurisdiction: 'SSCS', caseType: 'Benefit' }],
      amendmentCaseVariations: [{ jurisdiction: 'CIVIL', caseType: 'CIVIL' }],
    });

    expect(config.hearingJurisdictionConfig.hearingJurisdictions['.*']).toEqual([
      {
        jurisdiction: 'SSCS',
        includeCaseTypes: ['Benefit'],
      },
    ]);
    expect(config.hearingJurisdictionConfig.hearingAmendment['.*']).toEqual([
      {
        jurisdiction: 'CIVIL',
        includeCaseTypes: ['CIVIL'],
      },
    ]);
  });
});
