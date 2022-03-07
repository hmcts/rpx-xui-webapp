import {
  Actions,
  AllocateRoleState,
  AllocateRoleStateData,
  DurationOfRole,
} from '../../models';
import { AllocateRoleAction, AllocateRoleActionTypes } from '../actions';

export const allocateRoleInitialState: AllocateRoleStateData = {
  caseId: null,
  jurisdiction: null,
  state: AllocateRoleState.CHOOSE_ROLE,
  typeOfRole: null,
  allocateTo: null,
  person: null,
  durationOfRole: DurationOfRole.INDEFINITE,
  action: Actions.Allocate,
  period: null,
  lastError: null
};

export function allocateRoleReducer(currentState = allocateRoleInitialState,
                                    action: AllocateRoleAction): AllocateRoleStateData {
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
    case AllocateRoleActionTypes.SET_INITIAL_DATA: {
      return {
        ...currentState,
        caseId: action.payload.caseId,
        jurisdiction: action.payload.jurisdiction,
        roleCategory: action.payload.roleCategory
      };
    }
    case AllocateRoleActionTypes.ALLOCATE_ROLE_INSTANTIATE: {
      return {
        ...currentState,
        caseId: action.payload.caseId,
        jurisdiction: action.payload.jurisdiction,
        assignmentId: action.payload.assignmentId,
        state: action.payload.state,
        personToBeRemoved: action.payload.personToBeRemoved,
        typeOfRole: action.payload.typeOfRole,
        allocateTo: action.payload.allocateTo,
        durationOfRole: action.payload.durationOfRole,
        roleCategory: action.payload.roleCategory,
        action: action.payload.action
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
        allocateTo: action.payload.allocateTo,
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
