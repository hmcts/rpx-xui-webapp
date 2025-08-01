import { HearingValuesStateData } from '../../models/hearingValuesStateData';
import * as fromActions from '../actions';

export const initialHearingValuesState: HearingValuesStateData = {
  serviceHearingValuesModel: null,
  caseInfo: null,
  lastError: null
};

export function hearingValuesReducer(currentState = initialHearingValuesState,
  action: fromActions.HearingValuesAction): HearingValuesStateData {
  switch (action.type) {
    case fromActions.RESET_HEARING_VALUES: {
      return {
        ...initialHearingValuesState,
        caseInfo: currentState.caseInfo
      };
    }
    case fromActions.LOAD_HEARING_VALUES_SUCCESS: {
      return {
        ...currentState,
        serviceHearingValuesModel: action.payload,
        lastError: null
      };
    }
    case fromActions.LOAD_HEARING_VALUES_FAILURE: {
      return {
        ...initialHearingValuesState,
        caseInfo: currentState.caseInfo,
        lastError: action.payload
      };
    }
    case fromActions.RESET_HEARING_VAUES_LAST_ERROR: {
      return {
        ...currentState,
        lastError: null
      };
    }
    case fromActions.STORE_JURISDICTION_AND_CASE_REF: {
      console.log('setting the value for caseInfo');
      return {
        ...currentState,
        caseInfo: action.payload
      };
    }
    case fromActions.RESET_JURISDICTION_AND_CASE_REF: {
      return {
        ...currentState,
        caseInfo: null
      };
    }
    default: {
      return {
        ...currentState
      };
    }
  }
}

export const hearingValuesModel = (hearingValuesState) => hearingValuesState.serviceHearingValuesModel;
export const caseInfoSelector = (hearingValuesState) => hearingValuesState.hearings.hearingValues.caseInfo;
export const serviceHearingValueSelector = (hearingValuesState) => hearingValuesState.hearings.hearingValues.serviceHearingValuesModel;
