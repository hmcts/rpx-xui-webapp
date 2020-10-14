import { Action } from '@ngrx/store';
import { NocAnswer, NocError,  NocEvent , NocQuestion , NocState } from '../../models';

export const RESET = '[NOC] Reset';
export const CHANGE_NAVIGATION = '[NOC] Change Navigation';
export const SET_CASE_REFERENCE = '[NOC] Set Case Reference';
export const SET_CASE_REF_VALIDATION_FAILURE = '[NOC] Set Case Reference Validation Failure';
export const SET_QUESTIONS = '[NOC] Set Questions';
export const SET_CASE_REF_SUBMISSION_FAILURE = '[NOC] Set Case Reference Submission Failure'
export const SET_ANSWERS = '[NOC] Set Answers';
export const SET_ANSWER_INCOMPLETE = '[NOC] Set Answers Incomplete';
export const CHECK_ANSWERS = '[NOC] Check Answers';
export const SET_ANSWER_SUBMISSION_FAILURE = '[NOC] Set Answer Submission Failure';
export const SET_AFFIRMATION_AGREED = '[NOC] Set Affirmation Agreed';
export const GET_AFFIRMATION_AGREED = '[NOC] Get Affirmation Agreed';
export const SUBMIT_NOC = '[NOC] Submit NoC';
export const SET_SUBMISSION_SUCCESS_APPROVED = '[NOC] Submmission NoC Success Approved';
export const SET_SUBMISSION_SUCCESS_PENDING = '[NOC] Submmission NoC Success Pending';
export const SET_SUBMISSION_FAILURE = '[NOC] Submmission NoC Failure';

export class Reset implements Action {
    readonly type = RESET;
}

export class ChangeNavigation implements Action {
    readonly type = CHANGE_NAVIGATION;
    constructor(public payload: NocState) {}
}

export class SetCaseReference implements Action {
    readonly type = SET_CASE_REFERENCE;
    constructor(public payload: string) {}
}

export class SetCaseRefValidationFailure implements Action {
    readonly type = SET_CASE_REF_VALIDATION_FAILURE;
}

export class SetQuestions implements Action {
    readonly type = SET_QUESTIONS;
    constructor(public payload: NocQuestion[]) {}
}

export class SetCaseRefSubmissionFailure implements Action {
    readonly type = SET_CASE_REF_SUBMISSION_FAILURE;
    constructor(public payload: NocError) {}
}

export class SetAnswers implements Action {
    readonly type = SET_ANSWERS;
    constructor(public payload: NocEvent) {}
}

export class SetAnswersIncomplete implements Action {
    readonly type = SET_ANSWER_INCOMPLETE;
}

export class CheckAnswers implements Action {
    readonly type = CHECK_ANSWERS;
    constructor(public payload: NocAnswer[]) {}
}

export class SetAnswerSubmissionFailure implements Action {
    readonly type = SET_ANSWER_SUBMISSION_FAILURE;
    constructor(public payload: NocError) {}
}

export class SetAffirmationAgreed implements Action {
    readonly type = SET_AFFIRMATION_AGREED;
    constructor(public payload: boolean) {}
}

export class GetAffirmationAgreed implements Action {
    readonly type = GET_AFFIRMATION_AGREED;
}

export class SubmitNoc implements Action {
    readonly type = SUBMIT_NOC;
    constructor(public payload: NocEvent) {}
}

export class SetSubmissionSuccessApproved implements Action {
    readonly type = SET_SUBMISSION_SUCCESS_APPROVED;
}

export class SetSubmissionSuccessPending implements Action {
    readonly type = SET_SUBMISSION_SUCCESS_PENDING;
}

export class SetSubmissionFailure implements Action {
    readonly type = SET_SUBMISSION_FAILURE;
    constructor(public payload: NocError) {}
}

export type NocAction =
  | Reset
  | ChangeNavigation
  | SetCaseReference
  | SetCaseRefValidationFailure
  | SetQuestions
  | SetCaseRefSubmissionFailure
  | SetAnswers
  | SetAnswersIncomplete
  | CheckAnswers
  | SetAnswerSubmissionFailure
  | SetAffirmationAgreed
  | GetAffirmationAgreed
  | SubmitNoc
  | SetSubmissionSuccessApproved
  | SetSubmissionSuccessPending
  | SetSubmissionFailure;
