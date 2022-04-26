import { SpecificAccessState, SpecificAccessStateData } from '../../models';
import { SpecificAccessAction, SpecificAccessActionTypes } from '../actions';

export const specificAccessInitialState: SpecificAccessStateData = {
  state: SpecificAccessState.SPECIFIC_ACCESS_REVIEW,
  specificAccessFormData: null,
  SpecificAccessMoreInformationFormData: null,
  accessReason: null,
  lastError: null,
  caseId: null,
  jurisdiction: null,
  roleCategory: null,
  period: {startDate: null, endDate: null},
  person: null
};

export function specificAccessReducer(currentState = specificAccessInitialState, action: SpecificAccessAction): SpecificAccessStateData {
  switch (action.type) {
    case SpecificAccessActionTypes.APPROVE_SPECIFIC_ACCESS_REQUEST: {
      return {
        ...currentState
      };
    }
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
    case SpecificAccessActionTypes.SET_SPECIFIC_ACCESS_FORM_DATA: {
      return {
        ...currentState,
        specificAccessFormData: action.payload
      };
    }
    case SpecificAccessActionTypes.SET_SPECIFIC_ACCESS_INFO_FORM_DATA: {
      return {
        ...currentState,
        SpecificAccessMoreInformationFormData: action.payload
      };
    }
    case SpecificAccessActionTypes.SET_SPECIFIC_ACCESS_DURATION: {
      return {
        ...currentState,
        period: action.payload.period
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
export const getSpecificAccessInfoFormData = (specificAccessState: SpecificAccessStateData) => specificAccessState.SpecificAccessMoreInformationFormData.InfoText;
