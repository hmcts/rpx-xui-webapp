import { SpecificAccessState, SpecificAccessStateData } from '../../models';
import { SpecificAccessAction, SpecificAccessActionTypes } from '../actions';

export const specificAccessInitialState: SpecificAccessStateData = {
  state: SpecificAccessState.SPECIFIC_ACCESS_REVIEW,
  specificAccessFormData: null,
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
    case SpecificAccessActionTypes.SET_SPECIFIC_ACCESS_FORM_DATA: {
      return {
        ...currentState,
        specificAccessFormData: action.payload
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
export const getSpecificAccessFormData = (specificAccessState: SpecificAccessStateData) => specificAccessState.specificAccessFormData.specificAccessDurationForm;
