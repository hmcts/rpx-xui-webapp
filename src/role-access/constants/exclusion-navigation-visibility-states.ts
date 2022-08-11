import { ExclusionState } from '../models';

export const backButtonVisibilityStates = [
  ExclusionState.CHOOSE_PERSON_ROLE,
  ExclusionState.FIND_PERSON,
  ExclusionState.DESCRIBE_EXCLUSION,
  ExclusionState.CHECK_ANSWERS,
  ExclusionState.CONFIRM_EXCLUSION,
];

export const continueButtonVisibilityStates = [
  ExclusionState.CHOOSE_EXCLUSION,
  ExclusionState.CHOOSE_PERSON_ROLE,
  ExclusionState.FIND_PERSON,
  ExclusionState.DESCRIBE_EXCLUSION,
];

export const confirmExclusionButtonVisibilityStates = [
  ExclusionState.CHECK_ANSWERS,
];

export const cancelButtonVisibilityStates = [
  ExclusionState.CHOOSE_EXCLUSION,
  ExclusionState.CHOOSE_PERSON_ROLE,
  ExclusionState.FIND_PERSON,
  ExclusionState.DESCRIBE_EXCLUSION,
  ExclusionState.CHECK_ANSWERS,
  ExclusionState.CONFIRM_EXCLUSION,
];
