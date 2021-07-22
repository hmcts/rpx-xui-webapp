import { ExclusionState, ExclusionStateData } from '../../models';
import * as fromActions from '../actions';

export const initialState: ExclusionStateData = {
  caseId: '1546883526751282',
  state: ExclusionState.CHOOSE_EXCLUSION,
  exclusionOption: null,
  personRole: null,
  person: null,
  exclusionDescription: null,
  lastError: null
};

export function exclusionReducer(currentState = initialState, action: fromActions.ExclusionAction): ExclusionStateData {
  switch (action.type) {
    case fromActions.CHANGE_NAVIGATION: {
      return {
        ...currentState,
        state: action.payload
      };
    }
    case fromActions.RESET: {
      return {
        ...currentState,
        ...initialState
      };
    }
    case fromActions.UPDATE_DESCRIBE_EXCLUSION_TEXT: {
      return {
        ...currentState,
        state: action.payload,
        exclusionDescription: action.describeExclusionText
      };
    }
    case fromActions.UPDATE_PERSON_EXCLUSION: {
      return {
        ...currentState,
        state: action.payload,
        person: action.person
      }
    }
    default: {
      return {
        ...currentState
      };
    }
  }
}

export const getExclusionActiveState = (exclusionState) => exclusionState.state;
export const getLastErrors = (exclusionState) => exclusionState.lastError;
