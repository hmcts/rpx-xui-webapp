import { SpecificAccessState } from '../models/specific-access-state.enum';

export const specificAccessBackButtonVisibilityStates = [
  SpecificAccessState.SPECIFIC_ACCESS_DURATION, SpecificAccessState.SPECIFIC_ACCESS_INFORMATION
];

export const specificAccessContinueButtonVisibilityStates = [
  SpecificAccessState.SPECIFIC_ACCESS_REVIEW, SpecificAccessState.SPECIFIC_ACCESS_DURATION, SpecificAccessState.SPECIFIC_ACCESS_INFORMATION
];

export const specicAccessCancelButtonVisibilityStates = [
  SpecificAccessState.SPECIFIC_ACCESS_REVIEW, SpecificAccessState.SPECIFIC_ACCESS_DURATION, SpecificAccessState.SPECIFIC_ACCESS_INFORMATION
];

export const specicAccessReturnToMyTasksButtonVisibilityStates = [
  SpecificAccessState.SPECIFIC_ACCESS_APPROVED, SpecificAccessState.SPECIFIC_ACCESS_DENIED, SpecificAccessState.SPECIFIC_ACCESS_DUPLICATE_RECORD
];

export const specicAccessReturnToTasksTabVisibilityStates = [
  SpecificAccessState.SPECIFIC_ACCESS_APPROVED, SpecificAccessState.SPECIFIC_ACCESS_DENIED
];
export const specificAccessReviewVisibilityStates = [SpecificAccessState.SPECIFIC_ACCESS_REVIEW];
export const specificAccessDurationVisibilityStates = [SpecificAccessState.SPECIFIC_ACCESS_DURATION];
export const specificAccessApprovedVisibilityStates = [SpecificAccessState.SPECIFIC_ACCESS_APPROVED];
export const specificAccessInformationVisibilityStates = [SpecificAccessState.SPECIFIC_ACCESS_INFORMATION];
export const specificAccessDeniedVisibilityStates = [SpecificAccessState.SPECIFIC_ACCESS_DENIED];
export const specificAccessDuplicateRecordVisibilityStates = [SpecificAccessState.SPECIFIC_ACCESS_DUPLICATE_RECORD];
