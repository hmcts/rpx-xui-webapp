import { SpecificAccessState, SpecificAccessStateData } from '../../models';
import { SpecificAccessAction, SpecificAccessActionTypes } from '../actions';

export const specificAccessInitialState: SpecificAccessStateData = {
  state: SpecificAccessState.SPECIFIC_ACCESS_REVIEW,
  accessReason: null,
  lastError: null
};

export function specificAccessReducer(currentState = specificAccessInitialState, action: SpecificAccessAction): SpecificAccessStateData {
  switch (action.type) {
    case SpecificAccessActionTypes.CHANGE_NAVIGATION: {
      return {
        ...currentState,
        state: action.payload
      };
    }
    case SpecificAccessActionTypes.DECIDE_SPECIFIC_ACCESS_AND_GO: {
      return {
        ...currentState,
        accessReason: action.payload.accessReason,
        state: action.payload.specificAccessState
      };
    }

    default: {
      return {
        ...currentState
      };
    }
  }
}

export const getSpecificAccessActiveState = (specificAccessState: SpecificAccessStateData) => specificAccessState.state;
export const getSpecificAccessLastErrors = (specificAccessState: SpecificAccessStateData) => specificAccessState.lastError;
