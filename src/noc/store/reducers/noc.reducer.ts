import {
  CASE_REF_DEFAULT_VALIDATION_ERROR
} from '../../constants/nocErrorMap.enum';
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
  notifyEveryParty: false,
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
        validationErrors: CASE_REF_DEFAULT_VALIDATION_ERROR,
      };
    }
    case fromActions.SET_CASE_REF_SUBMISSION_FAILURE: {
      let nextState: NocState;
      let validationErrors;
      const lastError = action.payload;
      if (action.payload.error && (action.payload.error.code === 'case-id-invalid' || action.payload.error.code === 'case-not-found')) {
        nextState = NocState.CASE_REF_VALIDATION_FAILURE;
        validationErrors = CASE_REF_DEFAULT_VALIDATION_ERROR;
      } else {
        nextState = NocState.CASE_REF_SUBMISSION_FAILURE;
      }
      return {
        ...currentState,
        state: nextState,
        validationErrors,
        lastError
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
        answers: action.payload.answers
      };
    }
    case fromActions.SET_ANSWER_SUBMISSION_FAILURE: {
      let nextState: NocState;
      if (action.payload.error && action.payload.error.code === 'answers-not-matched-any-litigant') {
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
    case fromActions.SET_NOTIFY_EVERY_PARTY: {
      return {
        ...currentState,
        notifyEveryParty: action.payload
      };
    }
    case fromActions.SET_AFFIRMATION_ERROR: {
      return {
        ...currentState,
        validationErrors: action.payload
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
export const getNotifyEveryParty = (nocState) => nocState.notifyEveryParty;
export const getCaseReference = (nocState) => nocState.caseReference;
