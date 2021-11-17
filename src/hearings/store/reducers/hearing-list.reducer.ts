import { HearingListStateData } from '../../models/hearingsStateData.model';
import * as fromActions from '../actions';

export const initialState: HearingListStateData = {
  caseHearingsMainModel: null,
  lastError: null,
};

export function hearingListReducer(currentState = initialState, action: fromActions.HearingListAction): HearingListStateData {
  switch (action.type) {
    case fromActions.RESET: {
      return {
        ...currentState,
        ...initialState
      };
    }
    case fromActions.LOAD_ALL_HEARINGS_SUCCESS: {
      return {
        ...currentState,
        caseHearingsMainModel: action.payload
      };
    }
    default: {
      return {
        ...currentState
      };
    }
  }
}

export const getLastError = (hearingsState) => hearingsState.lastError;
