import { AllocateRoleState } from '../models';

export const noRolesErrorVisibilityStates = [AllocateRoleState.NO_ROLES_FOUND];
export const chooseRoleVisibilityStates = [AllocateRoleState.CHOOSE_ROLE];
export const chooseAllocateToVisibilityStates = [AllocateRoleState.CHOOSE_ALLOCATE_TO];
export const searchPersonVisibilityStates = [AllocateRoleState.SEARCH_PERSON];
export const chooseDurationVisibilityStates = [AllocateRoleState.CHOOSE_DURATION];
export const checkAnswersVisibilityStates = [AllocateRoleState.CHECK_ANSWERS];
