import { SpecificAccessState, SpecificAccessStateData } from '../../models';
import { SpecificAccessAction, SpecificAccessActionTypes  } from '../actions';

export const specificAccessInitialState: SpecificAccessStateData = {
  state: SpecificAccessState.SPECIFIC_ACCESS_DURATION
};

export function specificAccessReducer(currentState = specificAccessInitialState, action: SpecificAccessAction): SpecificAccessStateData {
  switch (action.type) {
     case SpecificAccessActionTypes.CHANGE_NAVIGATION: {
       debugger;
      return {
        ...currentState,
        state: action.payload
      };
    }

    case SpecificAccessActionTypes.CHANGE_NAVIGATION: {
       debugger;
             return {
        ...currentState,
        state: action.payload
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
export const getSpecificAccessLastErrors = (exclusionState: SpecificAccessStateData) => exclusionState.lastError;
