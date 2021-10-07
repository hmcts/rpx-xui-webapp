import { HearingsStateData } from '../../models/hearingsStateData.model';
import * as fromActions from '../actions';

export const initialState: HearingsStateData = {
  caseReference: '',
  caseHearingsMainModel: null,
  lastError: null,
};

export function hearingsReducer(currentState = initialState, action: fromActions.HearingsAction): HearingsStateData {
  switch (action.type) {
    case fromActions.RESET: {
      return {
        ...currentState,
        ...initialState
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
