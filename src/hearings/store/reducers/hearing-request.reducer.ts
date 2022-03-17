import {HearingLocationModel} from '../../models/hearingLocation.model';
import {HearingRequestMainModel} from '../../models/hearingRequestMain.model';
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
      caseAdditionalSecurityFlag: null,
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
    case fromActions.INITIALIZE_HEARING_REQUEST: {
      return {
        ...currentState,
        hearingRequestMainModel: action.payload
      };
    }
    case fromActions.UPDATE_HEARING_REQUEST: {
      const hearingLocations: HearingLocationModel[] = action.payload.hearingDetails.hearingLocations;
      const hasWalesLocation = hearingLocations.some(location => location.region === 'Wales');
      let updatedHearingRequestMainModel: HearingRequestMainModel = action.payload;
      if (!hasWalesLocation) {
        updatedHearingRequestMainModel = {
          ...action.payload,
          hearingDetails: {
            ...action.payload.hearingDetails,
            hearingInWelshFlag: false
          }
        };
      }
      return {
        ...currentState,
        hearingRequestMainModel: updatedHearingRequestMainModel
      };
    }
    case fromActions.LOAD_HEARING_REQUEST_FAILURE: {
      return {
        ...currentState,
        lastError: action.payload
      }
    }
    case fromActions.SUBMIT_HEARING_REQUEST_FAILURE: {
      return {
        ...currentState,
        lastError: action.payload
      }
    }
    default: {
      return {
        ...currentState
      };
    }
  }
}

export const hearingRequestLastError = (hearingRequestState) => hearingRequestState.lastError;
