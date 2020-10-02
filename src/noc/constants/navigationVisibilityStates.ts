import { Noc } from '../store/models/noc.state';

export const backButtonVisibilityStates = [Noc.START, Noc.CASE_REF_VALIDATION_FAILURE, Noc.CASE_REF_SUBMISSION_FAILURE, Noc.QUESTION, Noc.ANSWER_INCOMPLETE,
                                           Noc.ANSWER_SUBMISSION_FAILURE, Noc.CHECK_ANSWERS, Noc.AFFIRMATION_NOT_AGREED];
export const continueButtonVisibilityStates = [Noc.START, Noc.CASE_REF_VALIDATION_FAILURE, Noc.CASE_REF_SUBMISSION_FAILURE, Noc.QUESTION, Noc.ANSWER_INCOMPLETE,
                                               Noc.ANSWER_SUBMISSION_FAILURE, Noc.SUBMISSION_SUCCESS_APPROVED, Noc.SUBMISSION_SUCCESS_PENDING,
                                               Noc.SUBMISSION_FAILURE];
export const submitButtonVisibilityStates = [Noc.CHECK_ANSWERS, Noc.AFFIRMATION_NOT_AGREED];
