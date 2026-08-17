import { expect, test } from '@playwright/test';
import { createRequire } from 'node:module';
import {
  HEARINGS_CASE_REFERENCE,
  HEARINGS_CASE_TYPE,
  HEARINGS_LOCATION_ID,
  HEARINGS_SERVICE_ID,
  LISTED_HEARING_SCENARIO,
  UPDATE_REQUESTED_HEARING_SCENARIO,
  buildCourtLocationMock,
  buildHearingsCaseDetailsMock,
  buildHearingRequestMock,
  buildLinkedCasesWithHearingsMock,
  buildLovRefDataMock,
  buildHearingsEnvironmentConfigMock,
  buildHearingsListMock,
  buildServiceHearingValuesMock,
  type HearingScenario,
} from '../integration/mocks/hearings.mock';

const require = createRequire(import.meta.url);
const { hearingStatusMappings } = require('../../src/hearings/models/hearingStatusMappings') as {
  hearingStatusMappings: Array<{ hmcStatus: string }>;
};

test.describe('Hearings mock builders', { tag: '@svc-internal' }, () => {
  test('buildHearingsListMock maps every supported hearing status into the expected display section', () => {
    const statusExpectations = [
      {
        hmcStatus: 'HEARING_REQUESTED',
        exuiDisplayStatus: 'WAITING TO BE LISTED',
        exuiSectionStatus: 'Current and upcoming',
      },
      {
        hmcStatus: 'AWAITING_LISTING',
        exuiDisplayStatus: 'WAITING TO BE LISTED',
        exuiSectionStatus: 'Current and upcoming',
      },
      {
        hmcStatus: 'LISTED',
        exuiDisplayStatus: 'LISTED',
        exuiSectionStatus: 'Current and upcoming',
      },
      {
        hmcStatus: 'UPDATE_REQUESTED',
        exuiDisplayStatus: 'UPDATE REQUESTED',
        exuiSectionStatus: 'Current and upcoming',
      },
      {
        hmcStatus: 'UPDATE_SUBMITTED',
        exuiDisplayStatus: 'UPDATE REQUESTED',
        exuiSectionStatus: 'Current and upcoming',
      },
      {
        hmcStatus: 'EXCEPTION',
        exuiDisplayStatus: 'REQUEST FAILURE',
        exuiSectionStatus: 'Current and upcoming',
      },
      {
        hmcStatus: 'CANCELLATION_REQUESTED',
        exuiDisplayStatus: 'CANCELLATION REQUESTED',
        exuiSectionStatus: 'Current and upcoming',
      },
      {
        hmcStatus: 'CANCELLATION_SUBMITTED',
        exuiDisplayStatus: 'CANCELLATION REQUESTED',
        exuiSectionStatus: 'Current and upcoming',
      },
      {
        hmcStatus: 'AWAITING_ACTUALS',
        exuiDisplayStatus: 'AWAITING HEARING DETAILS',
        exuiSectionStatus: 'Current and upcoming',
      },
      {
        hmcStatus: 'CANCELLED',
        exuiDisplayStatus: 'CANCELLED',
        exuiSectionStatus: 'Past or cancelled',
      },
      {
        hmcStatus: 'COMPLETED',
        exuiDisplayStatus: 'COMPLETED',
        exuiSectionStatus: 'Past or cancelled',
      },
      {
        hmcStatus: 'ADJOURNED',
        exuiDisplayStatus: 'ADJOURNED',
        exuiSectionStatus: 'Past or cancelled',
      },
    ];

    const payload = buildHearingsListMock(
      statusExpectations.map((statusExpectation, index) => ({
        hearingId: String(1705614528100 + index),
        hmcStatus: statusExpectation.hmcStatus,
        hearingType: `ABA5-${statusExpectation.hmcStatus}`,
      }))
    );

    expect(payload.caseRef).toBe(HEARINGS_CASE_REFERENCE);
    expect(payload.caseHearings).toHaveLength(statusExpectations.length);
    expect(statusExpectations.map((statusExpectation) => statusExpectation.hmcStatus).sort()).toEqual(
      hearingStatusMappings.map((statusMapping) => statusMapping.hmcStatus).sort()
    );
    statusExpectations.forEach((statusExpectation, index) => {
      expect(payload.caseHearings[index]).toMatchObject({
        hearingID: 1705614528100 + index,
        hmcStatus: statusExpectation.hmcStatus,
        exuiDisplayStatus: statusExpectation.exuiDisplayStatus,
        exuiSectionStatus: statusExpectation.exuiSectionStatus,
      });
    });
  });

  test('buildHearingsListMock falls back unknown statuses into a safe upcoming section', () => {
    const unmappedScenario: HearingScenario = {
      hearingId: '1705614528115',
      hmcStatus: 'UNKNOWN_TO_EXUI',
      hearingType: 'ABA5-UNKNOWN',
    };

    const payload = buildHearingsListMock([unmappedScenario]);

    expect(payload.caseHearings).toEqual([
      expect.objectContaining({
        hearingID: Number(unmappedScenario.hearingId),
        hmcStatus: 'UNKNOWN_TO_EXUI',
        exuiDisplayStatus: 'UNKNOWN_TO_EXUI',
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

  test('hearing DTO builders preserve non-default case context across mocked API surfaces', () => {
    const caseConfig = {
      caseReference: '9988776655443322',
      jurisdictionId: 'SSCS',
      caseTypeId: 'Benefit',
      serviceId: 'BFA1',
      locationId: '231596',
      locationName: 'Birmingham Civil and Family Justice Centre',
    };

    const caseDetails = buildHearingsCaseDetailsMock(caseConfig) as {
      case_id: string;
      case_type: { id: string; jurisdiction: { id: string } };
      metadataFields: Array<{ id: string; value: string | number }>;
    };
    const hearingsList = buildHearingsListMock([LISTED_HEARING_SCENARIO], caseConfig) as {
      caseRef: string;
      hmctsServiceID: string;
      hmctsServiceCode: string;
      caseHearings: Array<{ hearingDaySchedule: Array<{ hearingVenueId: string }> }>;
    };
    const serviceValues = buildServiceHearingValuesMock(caseConfig, LISTED_HEARING_SCENARIO) as {
      hmctsServiceID: string;
      hmctsInternalCaseName: string;
      caseDeepLink: string;
      caseManagementLocationCode: string;
      hearingLocations: Array<{ locationId: string }>;
    };
    const hearingRequest = buildHearingRequestMock(LISTED_HEARING_SCENARIO, caseConfig) as {
      caseDetails: { caseRef: string; hmctsServiceCode: string; caseManagementLocationCode: string };
      hearingDetails: { hearingLocations: Array<{ locationId: string }> };
      hearingResponse: { hearingDaySchedule: Array<{ hearingVenueId: string }> };
    };
    const courtLocation = buildCourtLocationMock(caseConfig) as Array<{ epimms_id: string; court_name: string }>;
    const caseTypes = buildLovRefDataMock('caseType', { caseTypeId: caseConfig.caseTypeId }) as Array<{ key: string }>;

    expect(caseDetails).toMatchObject({
      case_id: caseConfig.caseReference,
      case_type: {
        id: caseConfig.caseTypeId,
        jurisdiction: {
          id: caseConfig.jurisdictionId,
        },
      },
    });
    expect(caseDetails.metadataFields).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: '[CASE_REFERENCE]', value: Number(caseConfig.caseReference) }),
        expect.objectContaining({ id: '[JURISDICTION]', value: caseConfig.jurisdictionId }),
        expect.objectContaining({ id: '[CASE_TYPE]', value: caseConfig.caseTypeId }),
      ])
    );
    expect(hearingsList).toMatchObject({
      caseRef: caseConfig.caseReference,
      hmctsServiceID: caseConfig.serviceId,
      hmctsServiceCode: caseConfig.serviceId,
    });
    expect(hearingsList.caseHearings[0].hearingDaySchedule[0].hearingVenueId).toBe(caseConfig.locationId);
    expect(serviceValues).toMatchObject({
      hmctsServiceID: caseConfig.serviceId,
      hmctsInternalCaseName: caseConfig.caseReference,
      caseManagementLocationCode: caseConfig.locationId,
      hearingLocations: [expect.objectContaining({ locationId: caseConfig.locationId })],
    });
    expect(serviceValues.caseDeepLink).toContain(caseConfig.caseReference);
    expect(hearingRequest.caseDetails).toMatchObject({
      caseRef: caseConfig.caseReference,
      hmctsServiceCode: caseConfig.serviceId,
      caseManagementLocationCode: caseConfig.locationId,
    });
    expect(hearingRequest.hearingDetails.hearingLocations).toEqual([
      expect.objectContaining({ locationId: caseConfig.locationId }),
    ]);
    expect(hearingRequest.hearingResponse.hearingDaySchedule[0].hearingVenueId).toBe(caseConfig.locationId);
    expect(courtLocation).toEqual([
      expect.objectContaining({
        epimms_id: caseConfig.locationId,
        court_name: caseConfig.locationName,
      }),
    ]);
    expect(caseTypes).toEqual([expect.objectContaining({ key: caseConfig.caseTypeId })]);
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
      reasonsForLink: string[];
      caseHearings: Array<{
        hearingID: string | number;
        hearingType: string;
        hearingIsLinkedFlag: boolean;
        isSelected: boolean;
      }>;
    }>;

    expect(linkedCases.map((linkedCase) => linkedCase.caseRef)).toEqual([
      '4652724902696213',
      '5283819672542864',
      '8254902572336147',
    ]);
    expect(linkedCases.map((linkedCase) => linkedCase.reasonsForLink)).toEqual([
      ['Linked for a hearing'],
      ['Linked for a hearing', 'Progressed as part of lead case'],
      ['Familial', 'Guardian', 'Linked for a hearing'],
    ]);

    const casesWithHearings = linkedCases.filter((linkedCase) => linkedCase.caseHearings.length > 0);
    expect(casesWithHearings.map((linkedCase) => linkedCase.caseRef)).toEqual(['4652724902696213', '8254902572336147']);
    expect(linkedCases[1]).toMatchObject({
      caseRef: '5283819672542864',
      caseHearings: [],
    });
    expect(
      casesWithHearings.map((linkedCase) => ({
        caseRef: linkedCase.caseRef,
        hearingIds: linkedCase.caseHearings.map((hearing) => hearing.hearingID),
        selectedFlags: linkedCase.caseHearings.map((hearing) => hearing.isSelected),
        linkedFlags: linkedCase.caseHearings.map((hearing) => hearing.hearingIsLinkedFlag),
      }))
    ).toEqual([
      {
        caseRef: '4652724902696213',
        hearingIds: ['h100001'],
        selectedFlags: [true],
        linkedFlags: [true],
      },
      {
        caseRef: '8254902572336147',
        hearingIds: ['h100010', 'h100012'],
        selectedFlags: [true, true],
        linkedFlags: [true, true],
      },
    ]);
  });
});
