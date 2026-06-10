import { expect, test } from '@playwright/test';
import {
  AWAITING_LISTING_HEARING_SCENARIO,
  HEARINGS_CASE_REFERENCE,
  HEARINGS_CASE_TYPE,
  HEARINGS_LOCATION_ID,
  HEARINGS_SERVICE_ID,
  LISTED_HEARING_SCENARIO,
  UPDATE_REQUESTED_HEARING_SCENARIO,
  buildHearingRequestMock,
  buildLinkedCasesWithHearingsMock,
  buildLovRefDataMock,
  buildHearingsEnvironmentConfigMock,
  buildHearingsListMock,
  buildServiceHearingValuesMock,
  type HearingScenario,
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

  test('buildHearingsListMock falls back unmapped statuses into a safe upcoming section', () => {
    const unmappedScenario: HearingScenario = {
      hearingId: '1705614528115',
      hmcStatus: 'VACATED',
      hearingType: 'ABA5-VACATED',
    };

    const payload = buildHearingsListMock([unmappedScenario]);

    expect(payload.caseHearings).toEqual([
      expect.objectContaining({
        hearingID: Number(unmappedScenario.hearingId),
        hmcStatus: 'VACATED',
        exuiDisplayStatus: 'VACATED',
        exuiSectionStatus: 'Current and upcoming',
      }),
    ]);
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

  test('buildServiceHearingValuesMock keeps case context, hearing type, location and screen flow aligned', () => {
    const serviceValues = buildServiceHearingValuesMock(undefined, UPDATE_REQUESTED_HEARING_SCENARIO) as {
      hmctsServiceID: string;
      hmctsInternalCaseName: string;
      caseDeepLink: string;
      caseManagementLocationCode: string;
      hearingType: string;
      hearingLocations: Array<{ locationId: string; locationType: string }>;
      screenFlow: Array<{ screenName: string }>;
    };

    expect(serviceValues).toMatchObject({
      hmctsServiceID: HEARINGS_SERVICE_ID,
      hmctsInternalCaseName: HEARINGS_CASE_REFERENCE,
      caseManagementLocationCode: HEARINGS_LOCATION_ID,
      hearingType: UPDATE_REQUESTED_HEARING_SCENARIO.hearingType,
    });
    expect(serviceValues.caseDeepLink).toContain(HEARINGS_CASE_REFERENCE);
    expect(serviceValues.hearingLocations).toEqual([
      expect.objectContaining({
        locationId: HEARINGS_LOCATION_ID,
        locationType: 'court',
      }),
    ]);
    expect(serviceValues.screenFlow.map((screen) => screen.screenName)).toEqual([
      'hearing-requirements',
      'hearing-facilities',
      'hearing-stage',
      'hearing-attendance',
      'hearing-venue',
      'hearing-welsh',
      'hearing-judge',
      'hearing-timing',
      'hearing-link',
      'hearing-additional-instructions',
    ]);
  });

  test('buildHearingRequestMock propagates case context into request, case, hearing and response DTO sections', () => {
    const request = buildHearingRequestMock(UPDATE_REQUESTED_HEARING_SCENARIO) as {
      requestDetails: { hearingRequestID: string; status: string };
      caseDetails: { caseRef: string; hmctsServiceCode: string; caseManagementLocationCode: string };
      hearingDetails: { hearingType: string; hearingLocations: Array<{ locationId: string; locationType: string }> };
      hearingResponse: { laCaseStatus: string; listingStatus: string };
    };

    expect(request.requestDetails).toMatchObject({
      hearingRequestID: UPDATE_REQUESTED_HEARING_SCENARIO.hearingId,
      status: UPDATE_REQUESTED_HEARING_SCENARIO.hmcStatus,
    });
    expect(request.caseDetails).toMatchObject({
      caseRef: HEARINGS_CASE_REFERENCE,
      hmctsServiceCode: HEARINGS_SERVICE_ID,
      caseManagementLocationCode: HEARINGS_LOCATION_ID,
    });
    expect(request.hearingDetails).toMatchObject({
      hearingType: UPDATE_REQUESTED_HEARING_SCENARIO.hearingType,
      hearingLocations: [
        {
          locationId: HEARINGS_LOCATION_ID,
          locationType: 'court',
        },
      ],
    });
    expect(request.hearingResponse).toMatchObject({
      laCaseStatus: UPDATE_REQUESTED_HEARING_SCENARIO.hmcStatus,
      listingStatus: 'DRAFT',
    });
  });

  test('buildLovRefDataMock provides hearing type and case type options needed by the request journey', () => {
    const hearingTypes = buildLovRefDataMock('HearingType', {
      hearingTypes: [UPDATE_REQUESTED_HEARING_SCENARIO.hearingType ?? 'ABA5-UPDATE'],
      caseTypeId: HEARINGS_CASE_TYPE,
    }) as Array<{ key: string; value_en: string; category_key: string }>;
    const caseTypes = buildLovRefDataMock('caseType', { caseTypeId: HEARINGS_CASE_TYPE }) as Array<{
      key: string;
      value_en: string;
      category_key: string;
    }>;

    expect(hearingTypes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: UPDATE_REQUESTED_HEARING_SCENARIO.hearingType,
          value_en: UPDATE_REQUESTED_HEARING_SCENARIO.hearingType,
          category_key: 'HearingType',
        }),
      ])
    );
    expect(caseTypes).toEqual([
      expect.objectContaining({
        key: HEARINGS_CASE_TYPE,
        value_en: HEARINGS_CASE_TYPE,
        category_key: 'caseType',
      }),
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
