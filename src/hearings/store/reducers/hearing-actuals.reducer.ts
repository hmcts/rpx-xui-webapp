import { HearingActualsStateData } from '../../models/hearingActualsStateData.model';
import * as fromActions from '../actions';

export const initialHearingActualsState: HearingActualsStateData = {
  hearingActualsMainModel: null,
  lastError: null,
};

export function hearingActualsReducer(
  currentState = initialHearingActualsState,
  action: fromActions.HearingActualsAction
): HearingActualsStateData {
  switch (action.type) {
    case fromActions.RESET_HEARING_ACTUALS: {
      return {
        ...initialHearingActualsState
      };
    }
    case fromActions.GET_HEARING_ACTUALS_SUCCESS: {
      return {
        ...currentState,
        hearingActualsMainModel: action.payload
      };
    }
    case fromActions.SAVE_HEARING_ACTUALS_PLANNED_DAYS: {
      return {
        ...currentState,
        hearingActualsMainModel: {
          ...currentState.hearingActualsMainModel,
          hearingActuals: {
            ...currentState.hearingActualsMainModel.hearingActuals,
            actualHearingDays: action.actualHearingDays
          }
        }
      };
    }
    case fromActions.UPDATE_HEARING_ACTUALS_SUCCESS: {
      return {
        ...currentState,
        hearingActualsMainModel: {
          ...currentState.hearingActualsMainModel,
          hearingActuals: action.payload
        }
      };
    }
    case fromActions.SUBMIT_HEARING_ACTUALS: {
      return {
        ...initialHearingActualsState,
        lastError: null
      };
    }
    case fromActions.SUBMIT_HEARING_ACTUALS_SUCCESS: {
      return {
        ...initialHearingActualsState
      };
    }
    case fromActions.SUBMIT_HEARING_ACTUALS_FAILURE: {
      return {
        ...initialHearingActualsState,
        lastError: action.payload
      };
    }
    case fromActions.RESET_HEARING_ACTUALS_LAST_ERROR: {
      return {
        ...currentState,
        lastError: null
      };
    }
    default: {
      return {
        ...currentState
      };
    }
  }
}

export const hearingActualsLastError = (hearingActualsState) => hearingActualsState.lastError;
