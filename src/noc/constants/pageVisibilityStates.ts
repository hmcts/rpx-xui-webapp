import { NocState } from '../models';

export const caseRefVisibilityStates = [NocState.START, NocState.CASE_REF_VALIDATION_FAILURE];
export const qAndAVisibilityStates = [NocState.QUESTION, NocState.ANSWER_INCOMPLETE];
export const answerErrorVisibilityStates = [NocState.ANSWER_SUBMISSION_FAILURE];
export const checkAnswerVisibilityStates = [NocState.CHECK_ANSWERS];
export const nocSubmitSuccessStates = [NocState.SUBMISSION_SUCCESS_APPROVED, NocState.SUBMISSION_SUCCESS_PENDING];
