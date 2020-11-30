import { NocQuestion, NocState, NocStateData } from '../../models';
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

export function nocReducer(currentState = initialState, action: fromActions.NocAction): NocStateData {
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
          status: 400,
          message: 'You must enter an online case reference number that exactly matches the case details'
        },
        lastError: {
          status: 400,
          message: 'Enter a valid online case reference'
        }
      };
    }
    case fromActions.SET_CASE_REF_SUBMISSION_FAILURE: {
      return {
        ...currentState,
        state: NocState.CASE_REF_SUBMISSION_FAILURE,
        lastError: action.payload
      };
    }
    case fromActions.SET_QUESTIONS: {
      return {
        ...currentState,
        state: NocState.QUESTION,
        questions: orderQuestions(action.payload.questions),
        caseReference: action.payload.caseReference,
        validationErrors: null,
        lastError: null
      };
    }
    case fromActions.SET_ANSWER_INCOMPLETE: {
      return {
        ...currentState,
        state: NocState.ANSWER_INCOMPLETE
      };
    }
    case fromActions.SET_ANSWERS: {
      return {
        ...currentState,
        answers: action.payload.nocAnswers
      };
    }
    case fromActions.SET_ANSWER_SUBMISSION_FAILURE: {
      let nextState: NocState;
      if (action.payload.error && action.payload.error.code === 'answersIncomplete') {
        nextState = NocState.ANSWER_INCOMPLETE;
      } else {
        nextState = NocState.ANSWER_SUBMISSION_FAILURE;
      }
      return {
        ...currentState,
        state: nextState,
        validationErrors: action.payload,
        lastError: action.payload
      };
    }
    case fromActions.CHECK_ANSWERS: {
      return {
        ...currentState,
        state: NocState.CHECK_ANSWERS,
        answers: action.payload,
        validationErrors: null,
        lastError: null
      };
    }
    case fromActions.SET_AFFIRMATION_AGREED: {
      return {
        ...currentState,
        affirmationAgreed: action.payload
      };
    }
    case fromActions.SET_AFFIRMATION_DISAGREE_ERROR: {
      return {
        ...currentState,
        affirmationAgreed: false,
        validationErrors: {
          status: 430,
          message: 'You must confirm the information you have provided'
        }
      };
    }
    case fromActions.SET_SUBMISSION_SUCCESS_APPROVED: {
      return {
        ...currentState,
        state: NocState.SUBMISSION_SUCCESS_APPROVED,
        validationErrors: null,
        lastError: null
      };
    }
    case fromActions.SET_SUBMISSION_SUCCESS_PENDING: {
      return {
        ...currentState,
        state: NocState.SUBMISSION_SUCCESS_PENDING,
        validationErrors: null,
        lastError: null
      };
    }
    case fromActions.SET_SUBMISSION_FAILURE: {
      return {
        ...currentState,
        state: NocState.SUBMISSION_FAILURE,
        lastError: action.payload
      };
    }
    default: {
      return {
        ...currentState
      };
    }
  }
}

export function orderQuestions(questions: NocQuestion[]): NocQuestion[] {
  return questions.slice().sort((question1, question2) => {
    return Number(question1.order) > Number(question2.order) ? 1 : Number(question2.order) > Number(question1.order) ? -1 : 0;
  });
}

export const getNocActiveState = (nocState) => nocState.state;
export const getLastError = (nocState) => nocState.lastError;
export const getValidationErrors = (nocState) => nocState.validationErrors;
export const getQuestions = (nocState) => nocState.questions;
export const getAnswers = (nocState) => nocState.answers;
export const getAffirmationAgreed = (nocState) => nocState.affirmationAgreed;
export const getCaseReference = (nocState) => nocState.caseReference;
