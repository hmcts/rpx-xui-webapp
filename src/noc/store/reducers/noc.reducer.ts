import * as fromActions from '../actions';
import { NocState, NocStateData } from '../models/noc.state';

export const initialState: NocStateData = {
    state: NocState.START,
    caseReference: '',
    lastError: null,
    questions: [],
    answers: null,
    reason: null,
    affirmationAgreed: false,
    options: null
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
        case fromActions.SET_CASE_REFERENCE: {

            return {
                ...currentState,
                caseReference: action.payload
            };
        }
        case fromActions.SET_CASE_REF_VALIDATION_FAILURE: {

            return {
                ...currentState,
                state: NocState.CASE_REF_VALIDATION_FAILURE
            }
        }
        case fromActions.SET_CASE_REF_SUBMISSION_FAILURE: {

            return {
                ...currentState,
                state: NocState.CASE_REF_SUBMISSION_FAILURE,
                lastError: action.payload
            }
        }
        case fromActions.GET_QUESTIONS: {

            return {
                ...currentState,
                state: NocState.QUESTION,
                questions: action.payload,
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
                answers: action.payload,
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
export const getQuestions = (nocState) => nocState.questions;
export const getAnswers = (nocState) => nocState.answers;

