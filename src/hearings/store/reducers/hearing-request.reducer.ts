import {HearingConditions} from '../../models/hearingConditions';
import {HearingRequestMainModel} from '../../models/hearingRequestMain.model';
import {HearingRequestStateData} from '../../models/hearingRequestStateData.model';
import * as fromActions from '../actions';

export const initialHearingRequestState: HearingRequestStateData = {
  hearingRequestMainModel: {
    requestDetails: {
      timeStamp: null,
      versionNumber: 0,
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
      let hasWalesLocation;
      const hearingConditions: HearingConditions = action.hearingCondition;
      if (hearingConditions.hasOwnProperty('region')) {
        const region = hearingConditions['region'];
        hasWalesLocation = region.includes('Wales');
      }
      let updatedHearingRequestMainModel: HearingRequestMainModel = action.hearingRequestMainModel;
      if (!hasWalesLocation) {
        updatedHearingRequestMainModel = {
          ...action.hearingRequestMainModel,
          hearingDetails: {
            ...action.hearingRequestMainModel.hearingDetails,
            hearingInWelshFlag: false
          }
        };
      }
      return {
        ...currentState,
        hearingRequestMainModel: updatedHearingRequestMainModel,
        lastError: null
      };
    }
    case fromActions.SUBMIT_HEARING_REQUEST_FAILURE:
    case fromActions.UPDATE_HEARING_REQUEST_FAILURE: {
      return {
        ...currentState,
        lastError: action.payload
      };
    }
    case fromActions.RESET_HEARING_REQUEST_LAST_ERROR: {
      return {
        ...currentState,
        lastError: null
      };
    }
    default: {
      return {
        ...currentState,
        lastError: null
      };
    }
  }
}

export const hearingRequestLastError = (hearingRequestState) => hearingRequestState.lastError;
