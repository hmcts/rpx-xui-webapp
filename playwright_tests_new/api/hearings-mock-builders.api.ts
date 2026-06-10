import { expect, test } from '@playwright/test';
import {
  AWAITING_LISTING_HEARING_SCENARIO,
  HEARINGS_CASE_REFERENCE,
  LISTED_HEARING_SCENARIO,
  UPDATE_REQUESTED_HEARING_SCENARIO,
  buildLinkedCasesWithHearingsMock,
  buildHearingsEnvironmentConfigMock,
  buildHearingsListMock,
} from '../integration/mocks/hearings.mock';

test.describe('Hearings mock builders', { tag: '@svc-internal' }, () => {
  test('buildHearingsListMock maps CR84 hearing statuses into the expected sections', () => {
    const payload = buildHearingsListMock([
      LISTED_HEARING_SCENARIO,
      AWAITING_LISTING_HEARING_SCENARIO,
      UPDATE_REQUESTED_HEARING_SCENARIO,
      {
        hearingId: '1705614528109',
        hmcStatus: 'COMPLETED',
        hearingType: 'ABA5-COMPLETED',
      },
    ]);

    expect(payload.caseRef).toBe(HEARINGS_CASE_REFERENCE);
    expect(payload.caseHearings).toHaveLength(4);
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
    expect(payload.caseHearings[2]).toMatchObject({
      hearingID: Number(UPDATE_REQUESTED_HEARING_SCENARIO.hearingId),
      hmcStatus: 'UPDATE_REQUESTED',
      exuiDisplayStatus: 'UPDATE REQUESTED',
      exuiSectionStatus: 'Current and upcoming',
    });
    expect(payload.caseHearings[3]).toMatchObject({
      hmcStatus: 'COMPLETED',
      exuiDisplayStatus: 'COMPLETED',
      exuiSectionStatus: 'Past or cancelled',
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

  test('buildLinkedCasesWithHearingsMock exposes linked hearing aggregation data for orchestration coverage', () => {
    const linkedCases = buildLinkedCasesWithHearingsMock() as Array<{
      caseRef: string;
      caseHearings: Array<{ hearingID: string | number; hearingIsLinkedFlag: boolean; isSelected: boolean }>;
    }>;

    expect(linkedCases.length).toBeGreaterThan(0);
    expect(linkedCases.some((linkedCase) => linkedCase.caseHearings.length === 0)).toBe(true);
    expect(linkedCases.flatMap((linkedCase) => linkedCase.caseHearings)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          hearingID: 'h100001',
          hearingIsLinkedFlag: true,
          isSelected: true,
        }),
      ])
    );
  });
});
