import {HearingRequestStateData} from '../../models/hearingRequestStateData.model';
import * as fromActions from '../actions';

export const initialHearingRequestState: HearingRequestStateData = {
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
      caseAdditionalSecurityFlag: false,
      caseInterpreterRequiredFlag: false,
      caseCategories: [],
      caseManagementLocationCode: null,
      caserestrictedFlag: false,
      caseSLAStartDate: null,
    },
    partyDetails: [],
  },
  lastError: null,
};

export function hearingRequestReducer(currentState = initialHearingRequestState,
                                      action: fromActions.HearingRequestAction): HearingRequestStateData {
  switch (action.type) {
    case fromActions.RESET_HEARING_REQUEST: {
      return {
        ...initialHearingRequestState
      };
    }
    case fromActions.UPDATE_HEARING_REQUEST: {
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

export const hearingRequestLastError = (hearingRequestState) => hearingRequestState.lastError;
