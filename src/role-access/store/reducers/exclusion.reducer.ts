import { ExclusionState, ExclusionStateData } from '../../models';
import * as fromActions from '../actions';
import { ExclusionActionTypes } from '../actions';

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
    case ExclusionActionTypes.CHANGE_NAVIGATION: {
      return {
        ...currentState,
        state: action.payload
      };
    }
    case ExclusionActionTypes.RESET: {
      return {
        ...currentState,
        ...initialState
      };
    }
    case ExclusionActionTypes.UPDATE_DESCRIBE_EXCLUSION_TEXT: {
      return {
        ...currentState,
        state: action.payload,
        exclusionDescription: action.describeExclusionText
      };
    }
    case ExclusionActionTypes.SAVE_EXCLUSION_OPTION_AND_GO: {
      return {
        ...currentState,
        exclusionOption: action.payload.exclusionOption,
        state: action.payload.exclusionState
      };
    }
    case ExclusionActionTypes.SAVE_PERSON_ROLE_AND_GO: {
      return {
        ...currentState,
        personRole: action.payload.personRole,
        state: action.payload.exclusionState
      };
    }
    case ExclusionActionTypes.UPDATE_PERSON_EXCLUSION: {
      return {
        ...currentState,
        state: action.payload,
        person: action.person
      }
    }
    case ExclusionActionTypes.CONFIRM_EXCLUSION:
      return {
        ...currentState
      }
    case ExclusionActionTypes.CONFIRM_EXCLUSION_FAILURE:
      return {
        ...currentState
      }
      case ExclusionActionTypes.DELETE_EXCLUSION:
        return {
          ...currentState
        }
      case ExclusionActionTypes.DELETE_EXCLUSION_FAILURE:
        return {
          ...currentState
        }
    default: {
      return {
        ...currentState
      };
    }
  }
}

export const getExclusionActiveState = (exclusionState: ExclusionStateData) => exclusionState.state;
export const getCaseId = (exclusionState: ExclusionStateData) => exclusionState.caseId;
export const getLastErrors = (exclusionState: ExclusionStateData) => exclusionState.lastError;
