import {
  AllocateRoleState,
  AllocateRoleStateData,
  DurationOfRole,
} from '../../models';
import * as fromActions from '../actions';
import { AllocateRoleActionTypes } from '../actions';

export const allocateRoleInitialState: AllocateRoleStateData = {
  caseId: null,
  state: AllocateRoleState.CHOOSE_ROLE,
  typeOfRole: null,
  allocateTo: null,
  person: null,
  durationOfRole: DurationOfRole.INDEFINITE,
  period: null,
  lastError: null
};

export function allocateRoleReducer(currentState = allocateRoleInitialState,
                                    action: fromActions.AllocateRoleAction): AllocateRoleStateData {
  switch (action.type) {
    case AllocateRoleActionTypes.CHANGE_NAVIGATION: {
      return {
        ...currentState,
        state: action.payload
      };
    }
    case AllocateRoleActionTypes.RESET: {
      return {
        ...allocateRoleInitialState
      };
    }
    case AllocateRoleActionTypes.SET_CASE_ID: {
      return {
        ...currentState,
        caseId: action.payload
      };
    }
    case AllocateRoleActionTypes.CHOOSE_ROLE_AND_GO: {
      return {
        ...currentState,
        typeOfRole: action.payload.typeOfRole,
        state: action.payload.allocateRoleState
      };
    }
    case AllocateRoleActionTypes.CHOOSE_ALLOCATE_TO_AND_GO: {
      return {
        ...currentState,
        allocateTo: action.payload.allocateTo,
        state: action.payload.allocateRoleState
      };
    }
    case AllocateRoleActionTypes.CHOOSE_PERSON_AND_GO: {
      return {
        ...currentState,
        person: action.payload.person,
        state: action.payload.allocateRoleState
      };
    }
    case AllocateRoleActionTypes.CHOOSE_DURATION_AND_GO: {
      return {
        ...currentState,
        durationOfRole: action.payload.durationOfRole,
        period: action.payload.period,
        state: action.payload.allocateRoleState
      };
    }
    default: {
      return {
        ...currentState
      };
    }
  }
}

export const allocateRoleActiveState = (allocateRoleState: AllocateRoleStateData) => allocateRoleState.state;
export const allocateRoleLastErrors = (allocateRoleState: AllocateRoleStateData) => allocateRoleState.lastError;
