import { Action } from '@ngrx/store';
import { NocState, NocError, NocQuestion, NoCAnswer } from '../models/noc.state';

export const RESET = '[NOC] Reset';
export const CHANGE_NAVIGATION = '[NOC] Change Navigation';
export const SET_CASE_REFERENCE = '[NOC] Set Case Reference';
export const SET_CASE_REF_VALIDATION_FAILURE = '[NOC] Case Reference Validation Failure';
export const GET_QUESTIONS = '[NOC] Get Questions';
export const SET_CASE_REF_SUBMISSION_FAILURE = '[NOC] Case Reference Submission Failure'
export const SET_ANSWERS = '[NOC] Set Answers';
export const SET_ANSWER_INCOMPLETE = '[NOC] Set Answers Incomplete';
export const CHECK_ANSWERS = '[NOC] Check Answers';
export const SET_ANSWER_SUBMISSION_FAILURE = '[NOC] Answer Submission Failure'

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

export class GetQuestions implements Action {
    readonly type = GET_QUESTIONS;
    constructor(public payload: NocQuestion[]) {}
}

export class SetCaseRefSubmissionFailure implements Action {
    readonly type = SET_CASE_REF_SUBMISSION_FAILURE;
    constructor(public payload: NocError) {}
}

export class SetAnswers implements Action {
    readonly type = SET_ANSWERS;
    constructor(public payload: NoCAnswer[]) {}
}

export class SetAnswersIncomplete implements Action {
    readonly type = SET_ANSWER_INCOMPLETE;
}

export class CheckAnswers implements Action {
    readonly type = CHECK_ANSWERS;
    constructor(public payload: NoCAnswer[]) {}
}

export class SetAnswerSubmissionFailure implements Action {
    readonly type = SET_ANSWER_SUBMISSION_FAILURE;
    constructor(public payload: NocError) {}
}

export type NocAction =
  | Reset
  | ChangeNavigation
  | SetCaseReference
  | SetCaseRefValidationFailure
  | GetQuestions
  | SetCaseRefSubmissionFailure
  | SetAnswers
  | SetAnswersIncomplete
  | CheckAnswers
  | SetAnswerSubmissionFailure;
