import { NocState } from '../models';

export const backButtonVisibilityStates = [NocState.START, NocState.CASE_REF_VALIDATION_FAILURE, NocState.CASE_REF_SUBMISSION_FAILURE, NocState.QUESTION, NocState.ANSWER_INCOMPLETE,
                                           NocState.ANSWER_SUBMISSION_FAILURE, NocState.CHECK_ANSWERS, NocState.AFFIRMATION_NOT_AGREED];
export const continueButtonVisibilityStates = [NocState.START, NocState.CASE_REF_VALIDATION_FAILURE];
export const setAnswersButtonVisibilityStates = [NocState.QUESTION, NocState.ANSWER_INCOMPLETE, NocState.SUBMISSION_SUCCESS_APPROVED, NocState.SUBMISSION_SUCCESS_PENDING, NocState.SUBMISSION_FAILURE];
export const checkAnswersButtonVisibilityStates = [NocState.CHECK_ANSWERS];
export const submitButtonVisibilityStates = [NocState.CHECK_ANSWERS, NocState.AFFIRMATION_NOT_AGREED];
