import {HearingRequestStateData} from '../../models/hearingRequestStateData.model';
import * as fromCompareActions from '../actions/hearing-request-to-compare.action';

export const initialHearingRequestToCompareState: HearingRequestStateData = {
  hearingRequestMainModel: {
    requestDetails: {
      requestTimeStamp: null,
    },
    hearingDetails: {
      duration: null,
      hearingType: null,
      hearingLocations: [],
      hearingIsLinkedFlag: false,
      hearingWindow: null,
      privateHearingRequiredFlag: false,
      panelRequirements: null,
      autolistFlag: false,
      nonStandardHearingDurationReasons: [],
      hearingPriorityType: null,
      numberOfPhysicalAttendees: null,
      hearingInWelshFlag: false,
      facilitiesRequired: [],
      listingComments: null,
      hearingRequester: null,
      leadJudgeContractType: null,
    },
    caseDetails: {
      hmctsServiceCode: null,
      caseRef: null,
      requestTimeStamp: null,
      hearingID: null,
      externalCaseReference: null,
      caseDeepLink: null,
      hmctsInternalCaseName: null,
      publicCaseName: null,
      caseAdditionalSecurityFlag: null,
      caseInterpreterRequiredFlag: false,
      caseCategories: [],
      caseManagementLocationCode: null,
      caserestrictedFlag: false,
      caseSLAStartDate: null,
    },
    partyDetails: [],
    hearingResponse: {
      listAssistTransactionID: null,
      receivedDateTime: null,
      responseVersion: null,
      laCaseStatus: null,
      hearingCancellationReason: null,
      hearingDaySchedule: null,
    }
  },
  lastError: null,
};

export function hearingRequestToCompareReducer(currentState = initialHearingRequestToCompareState,
                                               action: fromCompareActions.HearingRequestToCompareAction): HearingRequestStateData {
  switch (action.type) {
    case fromCompareActions.INITIALIZE_HEARING_REQUEST_TO_COMPARE: {
      return {
        ...currentState,
        hearingRequestMainModel: action.payload
      };
    }
    default: {
      return {
        ...currentState
      };
    }
  }
}

export const hearingRequestToCompareLastError = (hearingRequestState) => hearingRequestState.lastError;
