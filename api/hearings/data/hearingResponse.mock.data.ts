import { CaseDetailsModel } from '../models/caseDetails.model';
import { HearingDetailsModel } from '../models/hearingDetails.model';
import { HearingResponseModel } from '../models/hearingResponse.model';
import { HearingResponseMainModel } from '../models/hearingResponseMain.model';
import { PartyDetailsModel } from '../models/partyDetails.model';
export const HEARING_RESPONSE_RESULT: HearingResponseMainModel[] = [
  {
    caseDetails: {
      hmctsServiceCode: 'SSCS',
      caseRef: '1584618195804035',
      requestTimeStamp: null,
      hearingID: 'h100001',
      externalCaseReference: null,
      caseDeepLink: null,
      hmctsInternalCaseName: null,
      publicCaseName: null,
      caseAdditionalSecurityFlag: null,
      caseInterpreterRequiredFlag: false,
      caseCategories: [],
      caseManagementLocationCode: null,
      caserestrictedFlag: false,
      caseSLAStartDate: '2021-11-23T09:00:00.000+0000',
    } as CaseDetailsModel,
    hearingDetails: {
      duration: 45,
      hearingType: 'Final',
      hearingLocations: [
        {
          locationType: 'hearing',
          locationId: '196538',
          locationName: 'LIVERPOOL SOCIAL SECURITY AND CHILD SUPPORT TRIBUNAL',
          region: 'North West',
        },
      ],
      hearingIsLinkedFlag: false,
      hearingWindow: {
        hearingWindowDateRange: {
          hearingWindowStartDateRange: '2021-11-23T09:00:00.000+0000',
          hearingWindowEndDateRange: '2021-11-30T09:00:00.000+0000',
        },
        hearingWindowFirstDate: '2021-12-01T09:00:00.000+0000',
      },
      privateHearingRequiredFlag: false,
      panelRequirements: null,
      autolistFlag: false,
      hearingPriorityType: 'Standard',
      numberOfPhysicalAttendees: 2,
      hearingInWelshFlag: false,
      facilitiesRequired: [
        'immigrationDetentionCentre',
        'inCameraCourt',
        'sameSexCourtroom',
      ],
      listingComments: '',
      hearingRequester: '',
      leadJudgeContractType: '',
      totalParticipantAttendingHearing: 2,
    } as HearingDetailsModel,
    partyDetails: {
      partyName: 'Jane and Smith',
      partyChannel: 'inperson',
    } as PartyDetailsModel,
    hearingResponse: {
      listAssistTransacrtionID: '123456789',
      receivedDateTime: '2021-11-30T09:00:00.000+0000',
      responseVersion: 0,
      laCaseStatus: 'tbd',
      hearingCancellationReason: '123456543',
      hearingDaySchedule: {
        hearingStartDateTime: '2021-03-12T09:00:00.000+0000',
        hearingEndDateTime: '2021-03-12T16:00:00.000+0000',
        listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b15',
        hearingVenueId: 'venue 4',
        hearingRoomId: 'room 4',
        hearingPanel: ['hearingJudgeId2'],
      },
    } as HearingResponseModel,
  } as HearingResponseMainModel,
];
