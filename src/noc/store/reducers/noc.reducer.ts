import { NocState , NocStateData } from '../../models';
import * as fromActions from '../actions';

export const initialState: NocStateData = {
    state: NocState.START,
    caseReference: '',
    lastError: null,
    questions: [],
    answers: null,
    reason: null,
    affirmationAgreed: false,
    options: null,
    validationErrors: null
};

export function nocReducer(
    currentState = initialState,
    action: fromActions.NocAction
): NocStateData {

    switch (action.type) {
        case fromActions.CHANGE_NAVIGATION: {

            return {
                ...currentState,
                state: action.payload
            };
        }
        case fromActions.RESET: {

            return {
                ...currentState,
                ...initialState
            };
        }
        case fromActions.SET_CASE_REF_VALIDATION_FAILURE: {

            return {
                ...currentState,
                state: NocState.CASE_REF_VALIDATION_FAILURE,
                validationErrors: {
                    caseRef: {
                        messages: ['You must enter an online case reference number that exactly matches the case details']
                    }
                },
                lastError: {
                    responseCode: 0,
                    message: 'Enter a valid online case reference'
                }
            }
        }
        case fromActions.SET_CASE_REF_SUBMISSION_FAILURE: {

            return {
                ...currentState,
                state: NocState.CASE_REF_SUBMISSION_FAILURE,
                lastError: action.payload
            }
        }
        case fromActions.SET_QUESTIONS: {

            return {
                ...currentState,
                state: NocState.QUESTION,
                questions: action.payload.questions,
                caseReference: action.payload.caseReference
            }
        }
        case fromActions.SET_ANSWER_INCOMPLETE: {

            return {
                ...currentState,
                state: NocState.ANSWER_INCOMPLETE
            }
        }
        case fromActions.CHECK_ANSWERS: {

            return {
                ...currentState,
                state: NocState.CHECK_ANSWERS,
                answers: action.payload
            }
        }
        case fromActions.SET_AFFIRMATION_AGREED: {

            return {
                ...currentState,
                affirmationAgreed: action.payload
            }
        }
        case fromActions.SET_SUBMISSION_SUCCESS_APPROVED: {
            return {
                ...currentState,
                state: NocState.SUBMISSION_SUCCESS_APPROVED
            }
        }
        case fromActions.SET_SUBMISSION_SUCCESS_PENDING: {
            return {
                ...currentState,
                state: NocState.SUBMISSION_SUCCESS_PENDING
            }
        }
        case fromActions.SET_SUBMISSION_FAILURE: {
            return {
                ...currentState,
                state: NocState.SUBMISSION_FAILURE,
                lastError: action.payload
            }
        }
        default: {

            return {
                ...initialState
            };
        }
    }
}

export const getNocActiveState = (nocState) => nocState.state;
export const getLastError = (nocState) => nocState.lastError;
export const getValidationErrors = (nocState) => nocState.validationErrors;
export const getQuestions = (nocState) => nocState.questions;
export const getAnswers = (nocState) => nocState.answers;
export const getAffirmationAgreed = (nocState) => nocState.affirmationAgreed;
