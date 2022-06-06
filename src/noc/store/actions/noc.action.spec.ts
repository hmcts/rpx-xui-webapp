import { AFFIRMATION_DEFAULT_DISAGREE_ERROR, AFFIRMATION_NOTIFY_EVERY_PARTY_ERROR } from '../../constants/nocErrorMap.enum';
import * as fromNocAction from './noc.action';

// Check testing
describe('Noc Actions', () => {

  // Check testing
describe('ChangeNavigation', () => {
    it('should create an action', () => {
      const action = new fromNocAction.ChangeNavigation(null);
      expect(action.type).toBe(fromNocAction.CHANGE_NAVIGATION);
    });
  });

  // Check testing
describe('Reset', () => {
    it('should create an action', () => {
      const action = new fromNocAction.Reset();
      expect(action.type).toBe(fromNocAction.RESET);
    });
  });

  // Check testing
describe('SetCaseReference', () => {
    it('should create an action', () => {
      const action = new fromNocAction.SetCaseReference('');
      expect(action.type).toBe(fromNocAction.SET_CASE_REFERENCE);
    });
  });

  // Check testing
describe('SetCaseRefValidationFailure', () => {
    it('should create an action', () => {
      const action = new fromNocAction.SetCaseRefValidationFailure();
      expect(action.type).toBe(fromNocAction.SET_CASE_REF_VALIDATION_FAILURE);
    });
  });

  // Check testing
describe('SetQuestions', () => {
    it('should create an action', () => {
      const action = new fromNocAction.SetQuestions(null);
      expect(action.type).toBe(fromNocAction.SET_QUESTIONS);
    });
  });

  // Check testing
describe('SetCaseRefSubmissionFailure', () => {
    it('should create an action', () => {
      const action = new fromNocAction.SetCaseRefSubmissionFailure(null);
      expect(action.type).toBe(fromNocAction.SET_CASE_REF_SUBMISSION_FAILURE);
    });
  });

  // Check testing
describe('SetAnswers', () => {
    it('should create an action', () => {
      const action = new fromNocAction.SetAnswers(null);
      expect(action.type).toBe(fromNocAction.SET_ANSWERS);
    });
  });

  // Check testing
describe('SetAnswersIncomplete', () => {
    it('should create an action', () => {
      const action = new fromNocAction.SetAnswersIncomplete();
      expect(action.type).toBe(fromNocAction.SET_ANSWER_INCOMPLETE);
    });
  });

  // Check testing
describe('CheckAnswers', () => {
    it('should create an action', () => {
      const action = new fromNocAction.CheckAnswers(null);
      expect(action.type).toBe(fromNocAction.CHECK_ANSWERS);
    });
  });

  // Check testing
describe('SetAnswerSubmissionFailure', () => {
    it('should create an action', () => {
      const action = new fromNocAction.SetAnswerSubmissionFailure(null);
      expect(action.type).toBe(fromNocAction.SET_ANSWER_SUBMISSION_FAILURE);
    });
  });

  // Check testing
describe('SetAffirmationAgreed', () => {
    it('should create an action', () => {
      const action = new fromNocAction.SetAffirmationAgreed(null);
      expect(action.type).toBe(fromNocAction.SET_AFFIRMATION_AGREED);
    });
  });

  // Check testing
describe('SetAffirmationError', () => {
    it('should create an action', () => {
      const affirmationError = {
        AFFIRMATION_DEFAULT_DISAGREE_ERROR,
        AFFIRMATION_NOTIFY_EVERY_PARTY_ERROR
      };
      const action = new fromNocAction.SetAffirmationError(affirmationError);
      expect(action.type).toBe(fromNocAction.SET_AFFIRMATION_ERROR);
    });
  });

  // Check testing
describe('SubmitNoc', () => {
    it('should create an action', () => {
      const action = new fromNocAction.SubmitNoc(null);
      expect(action.type).toBe(fromNocAction.SUBMIT_NOC);
    });
  });

  // Check testing
describe('SetSubmissionSuccessApproved', () => {
    it('should create an action', () => {
      const action = new fromNocAction.SetSubmissionSuccessApproved();
      expect(action.type).toBe(fromNocAction.SET_SUBMISSION_SUCCESS_APPROVED);
    });
  });

  // Check testing
describe('SetSubmissionSuccessPending', () => {
    it('should create an action', () => {
      const action = new fromNocAction.SetSubmissionSuccessPending();
      expect(action.type).toBe(fromNocAction.SET_SUBMISSION_SUCCESS_PENDING);
    });
  });

  // Check testing
describe('SetSubmissionFailure', () => {
    it('should create an action', () => {
      const action = new fromNocAction.SetSubmissionFailure(null);
      expect(action.type).toBe(fromNocAction.SET_SUBMISSION_FAILURE);
    });
  });

});
