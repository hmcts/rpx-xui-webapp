import { Action } from '@ngrx/store';
import { NocAnswer, NocEvent, NocHttpError, NocQuestion, NocState } from '../../models';

export const RESET = '[NOC] Reset';
export const CHANGE_NAVIGATION = '[NOC] Change Navigation';
export const SET_CASE_REFERENCE = '[NOC] Set Case Reference';
export const SET_CASE_REF_VALIDATION_FAILURE = '[NOC] Set Case Reference Validation Failure';
export const SET_QUESTIONS = '[NOC] Set Questions';
export const SET_CASE_REF_SUBMISSION_FAILURE = '[NOC] Set Case Reference Submission Failure';
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
    public readonly type = RESET;
}

export class ChangeNavigation implements Action {
    public readonly type = CHANGE_NAVIGATION;
    constructor(public payload: NocState) {}
}

export class SetCaseReference implements Action {
    public readonly type = SET_CASE_REFERENCE;
    constructor(public payload: string) {}
}

export class SetCaseRefValidationFailure implements Action {
    public readonly type = SET_CASE_REF_VALIDATION_FAILURE;
}

export class SetQuestions implements Action {
    public readonly type = SET_QUESTIONS;
    constructor(public payload: {questions: NocQuestion[], caseReference: string}) {}
}

export class SetCaseRefSubmissionFailure implements Action {
    public readonly type = SET_CASE_REF_SUBMISSION_FAILURE;
    constructor(public payload: NocHttpError) {}
}

export class SetAnswers implements Action {
    public readonly type = SET_ANSWERS;
    constructor(public payload: NocEvent) {}
}

export class SetAnswersIncomplete implements Action {
    public readonly type = SET_ANSWER_INCOMPLETE;
}

export class CheckAnswers implements Action {
    public readonly type = CHECK_ANSWERS;
    constructor(public payload: NocAnswer[]) {}
}

export class SetAnswerSubmissionFailure implements Action {
    public readonly type = SET_ANSWER_SUBMISSION_FAILURE;
    constructor(public payload: NocHttpError) {}
}

export class SetAffirmationAgreed implements Action {
    public readonly type = SET_AFFIRMATION_AGREED;
    constructor(public payload: boolean) {}
}

export class GetAffirmationAgreed implements Action {
    public readonly type = GET_AFFIRMATION_AGREED;
}

export class SubmitNoc implements Action {
    public readonly type = SUBMIT_NOC;
    constructor(public payload: NocEvent) {}
}

export class SetSubmissionSuccessApproved implements Action {
    public readonly type = SET_SUBMISSION_SUCCESS_APPROVED;
}

export class SetSubmissionSuccessPending implements Action {
    public readonly type = SET_SUBMISSION_SUCCESS_PENDING;
}

export class SetSubmissionFailure implements Action {
    public readonly type = SET_SUBMISSION_FAILURE;
    constructor(public payload: NocHttpError) {}
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
