import { RoleCategory } from '@hmcts/ccd-case-ui-toolkit';
import { AccessReason } from '../../../role-access/models/enums';
import { SpecificAccessState, SpecificAccessStateData } from '../../models';
import { SpecificAccessAction, SpecificAccessActionTypes } from '../actions';

export const specificAccessInitialState: SpecificAccessStateData = {
  state: SpecificAccessState.SPECIFIC_ACCESS_REVIEW,
  specificAccessFormData: null,
  SpecificAccessMoreInformationFormData: null,
  accessReason: null,
  lastError: null,
  caseId: null,
  caseName: null,
  taskId: null,
  actorId: null,
  requestedRole: null,
  requestCreated: null,
  requestId: null,
  jurisdiction: null,
  roleCategory: null,
  period: { startDate: null, endDate: null },
  person: null
};

export function specificAccessReducer(currentState = specificAccessInitialState, action: SpecificAccessAction): SpecificAccessStateData {
  switch (action.type) {
    case SpecificAccessActionTypes.APPROVE_SPECIFIC_ACCESS_REQUEST: {
      return {
        ...currentState,
        period: action.payload.period
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
    case SpecificAccessActionTypes.SET_SPECIFIC_ACCESS_INITIAL_DATA: {
      return {
        ...currentState,
        state: action.payload.state,
        caseId: action.payload.caseId,
        taskId: action.payload.taskId,
        requestId: action.payload.requestId,
        jurisdiction: action.payload.jurisdiction,
        caseName: action.payload.caseName,
        requestCreated: action.payload.requestCreated,
        actorId: action.payload.actorId,
        accessReason: action.payload.accessReason as AccessReason,
        specificAccessReason: action.payload.specificAccessReason,
        roleCategory: action.payload.roleCategory as RoleCategory,
        requestedRole: action.payload.requestedRole
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
