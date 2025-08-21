import { ExclusionState, ExclusionStateData } from '../../models';
import { ExclusionAction, ExclusionActionTypes } from '../actions';

export const initialState: ExclusionStateData = {
  caseId: null,
  jurisdiction: null,
  state: ExclusionState.CHOOSE_EXCLUSION,
  exclusionOption: null,
  personRole: null,
  person: null,
  exclusionDescription: null,
  lastError: null,
  caseType: null
};

export function exclusionReducer(currentState = initialState, action: ExclusionAction): ExclusionStateData {
  switch (action.type) {
    case ExclusionActionTypes.CHANGE_NAVIGATION: {
      return {
        ...currentState,
        state: action.payload
      };
    }
    case ExclusionActionTypes.EXCLUSION_RESET: {
      return {
        ...initialState
      };
    }
    case ExclusionActionTypes.EXCLUSION_SET_CASE_ID: {
      return {
        ...currentState,
        caseId: action.caseId,
        jurisdiction: action.jurisdiction,
        caseType: action.caseType
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
        person: action.payload.personRole === currentState.personRole ? currentState.person : null,
        personRole: action.payload.personRole,
        state: action.payload.exclusionState
      };
    }
    case ExclusionActionTypes.UPDATE_PERSON_EXCLUSION: {
      return {
        ...currentState,
        state: action.payload,
        person: action.person
      };
    }
    default: {
      return {
        ...currentState
      };
    }
  }
}

export const getExclusionActiveState = (exclusionState: ExclusionStateData) => exclusionState.state;
export const getLastErrors = (exclusionState: ExclusionStateData) => exclusionState.lastError;
