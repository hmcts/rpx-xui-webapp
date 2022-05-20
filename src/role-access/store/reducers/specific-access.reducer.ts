import { SpecificAccessState, SpecificAccessStateData } from '../../models';
import { SpecificAccessAction, SpecificAccessActionTypes } from '../actions';

// export const specificAccessInitialState: SpecificAccessStateData = {
//   state: SpecificAccessState.SPECIFIC_ACCESS_REVIEW,
//   specificAccessFormData: null,
//   SpecificAccessMoreInformationFormData: null,
//   accessReason: null,
//   lastError: null
// };

export const specificAccessInitialState: SpecificAccessStateData = {
  state: SpecificAccessState.SPECIFIC_ACCESS_REVIEW,
  specificAccessFormData: null,
  SpecificAccessMoreInformationFormData: null,
  accessReason: null,
  lastError: null,
  caseId: null,
  taskId: null,
  requestedRole: null,
  requestId: null,
  jurisdiction: null,
  roleCategory: null,
  period: {startDate: null, endDate: null},
  person: null
};

export function specificAccessReducer(currentState = specificAccessInitialState, action: SpecificAccessAction): SpecificAccessStateData {
  switch (action.type) {
    case SpecificAccessActionTypes.REQUEST_MORE_INFO_SPECIFIC_ACCESS_REQUEST: {
      return {
        ...currentState,
        caseId : action.payload.caseId,
        requestedRole : action.payload.requestedRole,
        requestId : action.payload.requestId,
        jurisdiction : action.payload.jurisdiction,
        roleCategory : action.payload.roleCategory
      };
    }
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
