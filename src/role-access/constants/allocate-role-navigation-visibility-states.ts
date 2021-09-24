import { AllocateRoleState } from '../models';

export const backButtonVisibilityStates = [
  AllocateRoleState.CHOOSE_ALLOCATE_TO,
  AllocateRoleState.SEARCH_PERSON,
  AllocateRoleState.CHOOSE_DURATION,
  AllocateRoleState.CHECK_ANSWERS,
];

export const continueButtonVisibilityStates = [
  AllocateRoleState.CHOOSE_ROLE,
  AllocateRoleState.CHOOSE_ALLOCATE_TO,
  AllocateRoleState.SEARCH_PERSON,
  AllocateRoleState.CHOOSE_DURATION,
];

export const confirmButtonVisibilityStates = [
  AllocateRoleState.CHECK_ANSWERS,
];

export const cancelButtonVisibilityStates = [
  AllocateRoleState.CHOOSE_ROLE,
  AllocateRoleState.CHOOSE_ALLOCATE_TO,
  AllocateRoleState.SEARCH_PERSON,
  AllocateRoleState.CHOOSE_DURATION,
  AllocateRoleState.CHECK_ANSWERS,
  AllocateRoleState.CONFIRM_ALLOCATION,
];
