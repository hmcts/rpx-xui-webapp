import { AFFIRMATION_DEFAULT_DISAGREE_ERROR, AFFIRMATION_NOTIFY_EVERY_PARTY_ERROR } from '../../constants/nocErrorMap.enum';
import * as fromNocAction from './noc.action';

describe('Noc Actions', () => {

  describe('ChangeNavigation', () => {
    it('should create an action', () => {
      const action = new fromNocAction.ChangeNavigation(null);
      expect(action.type).toBe(fromNocAction.CHANGE_NAVIGATION);
    });
  });

  describe('Reset', () => {
    it('should create an action', () => {
      const action = new fromNocAction.Reset();
      expect(action.type).toBe(fromNocAction.RESET);
    });
  });

  describe('SetCaseReference', () => {
    it('should create an action', () => {
      const action = new fromNocAction.SetCaseReference('');
      expect(action.type).toBe(fromNocAction.SET_CASE_REFERENCE);
    });
  });

  describe('SetCaseRefValidationFailure', () => {
    it('should create an action', () => {
      const action = new fromNocAction.SetCaseRefValidationFailure();
      expect(action.type).toBe(fromNocAction.SET_CASE_REF_VALIDATION_FAILURE);
    });
  });

  describe('SetQuestions', () => {
    it('should create an action', () => {
      const action = new fromNocAction.SetQuestions(null);
      expect(action.type).toBe(fromNocAction.SET_QUESTIONS);
    });
  });

  describe('SetCaseRefSubmissionFailure', () => {
    it('should create an action', () => {
      const action = new fromNocAction.SetCaseRefSubmissionFailure(null);
      expect(action.type).toBe(fromNocAction.SET_CASE_REF_SUBMISSION_FAILURE);
    });
  });

  describe('SetAnswers', () => {
    it('should create an action', () => {
      const action = new fromNocAction.SetAnswers(null);
      expect(action.type).toBe(fromNocAction.SET_ANSWERS);
    });
  });

  describe('SetAnswersIncomplete', () => {
    it('should create an action', () => {
      const action = new fromNocAction.SetAnswersIncomplete();
      expect(action.type).toBe(fromNocAction.SET_ANSWER_INCOMPLETE);
    });
  });

  describe('CheckAnswers', () => {
    it('should create an action', () => {
      const action = new fromNocAction.CheckAnswers(null);
      expect(action.type).toBe(fromNocAction.CHECK_ANSWERS);
    });
  });

  describe('SetAnswerSubmissionFailure', () => {
    it('should create an action', () => {
      const action = new fromNocAction.SetAnswerSubmissionFailure(null);
      expect(action.type).toBe(fromNocAction.SET_ANSWER_SUBMISSION_FAILURE);
    });
  });

  describe('SetAffirmationAgreed', () => {
    it('should create an action', () => {
      const action = new fromNocAction.SetAffirmationAgreed(null);
      expect(action.type).toBe(fromNocAction.SET_AFFIRMATION_AGREED);
    });
  });

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

  describe('SubmitNoc', () => {
    it('should create an action', () => {
      const action = new fromNocAction.SubmitNoc(null);
      expect(action.type).toBe(fromNocAction.SUBMIT_NOC);
    });
  });

  describe('SetSubmissionSuccessApproved', () => {
    it('should create an action', () => {
      const action = new fromNocAction.SetSubmissionSuccessApproved();
      expect(action.type).toBe(fromNocAction.SET_SUBMISSION_SUCCESS_APPROVED);
    });
  });

  describe('SetSubmissionSuccessPending', () => {
    it('should create an action', () => {
      const action = new fromNocAction.SetSubmissionSuccessPending();
      expect(action.type).toBe(fromNocAction.SET_SUBMISSION_SUCCESS_PENDING);
    });
  });

  describe('SetSubmissionFailure', () => {
    it('should create an action', () => {
      const action = new fromNocAction.SetSubmissionFailure(null);
      expect(action.type).toBe(fromNocAction.SET_SUBMISSION_FAILURE);
    });
  });

});
