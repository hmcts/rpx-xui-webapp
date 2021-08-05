import {
  AllocateRoleState,
  AllocateRoleStateData,
} from '../../models';
import * as fromActions from '../actions';
import { AllocateRoleActionTypes } from '../actions';

export const allocateRoleInitialState: AllocateRoleStateData = {
  caseId: '1546883526751282',
  state: AllocateRoleState.CHOOSE_ROLE,
  typeOfRole: null,
  allocateTo: null,
  person: null,
  durationOfRole: null,
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
        ...currentState,
        ...allocateRoleInitialState
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
export const allocateRoleCaseId = (allocateRoleState: AllocateRoleStateData) => allocateRoleState.caseId;
export const allocateRoleLastErrors = (allocateRoleState: AllocateRoleStateData) => allocateRoleState.lastError;
