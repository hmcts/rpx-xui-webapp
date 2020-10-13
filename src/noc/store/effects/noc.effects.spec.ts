import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { NocService } from '../../services';
import { NocEffects } from './noc.effects';
import * as fromNocEffects from './noc.effects';
import { of, throwError } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';
import { CheckAnswers, SetAnswers, SetAnswersIncomplete, SetAnswerSubmissionFailure, SetCaseReference, SetCaseRefSubmissionFailure, SetCaseRefValidationFailure, SetQuestions, SetSubmissionFailure, SetSubmissionSuccessApproved, SetSubmissionSuccessPending, SubmitNoc } from '../actions/noc.action';
import { NocQuestion } from '../../models/noc-question.interface';
import { NocError } from '../../models/noc-error.interface';
import { NocAnswer } from '../../models/noc-answer.interface';

describe('Noc Effects', () => {
  let actions$;
  let effects: NocEffects;
  const NocServiceMock = jasmine.createSpyObj('NocService', [
      'getNoCQuestions',
      'validateNoCAnswers',
      'submitNoCEvent'
  ]);

  beforeEach(() => {
      TestBed.configureTestingModule({
          providers: [
              {
                  provide: NocService,
                  useValue: NocServiceMock,
              },
              fromNocEffects.NocEffects,
              provideMockActions(() => actions$)
          ]
      });

      effects = TestBed.get(NocEffects);

  });

  describe('setCaseReference$', () => {
    it('should return a response', () => {

      const dummy: NocQuestion[] = [{
        displayOrder: 0,
        answerType: null,
        displayContext: null,
        questionLabel: 'dummy'
      }];
      NocServiceMock.getNoCQuestions.and.returnValue(of(dummy));
      const action = new SetCaseReference('1223-2212-4422-3131');
      const completion = new SetQuestions(dummy);
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.setCaseReference$).toBeObservable(expected);
    });

    it('should return SetCaseRefValidationFailure', () => {

        const action = new SetCaseReference('1223-2212-4422131');
        const completion = new SetCaseRefValidationFailure();
        actions$ = hot('-a', { a: action });
        const expected = cold('-b', { b: completion });
        expect(effects.setCaseReference$).toBeObservable(expected);
    });

    it('should return SetCaseRefSubmissionFailure', () => {
        const dummyError: NocError = {
          responseCode: 400,
          message: 'dummy'
        };
        NocServiceMock.getNoCQuestions.and.returnValue(throwError(dummyError));
        const action = new SetCaseReference('1223-2212-4422-3131');
        const completion = new SetCaseRefSubmissionFailure(dummyError);
        actions$ = hot('-a', { a: action });
        const expected = cold('-b', { b: completion });
        expect(effects.setCaseReference$).toBeObservable(expected);
    });
  });

  describe('setAnswers$', () => {
    it('should return a response', () => {

      const dummy: NocAnswer[] = [{
        displayOrder: 0,
        answer: 'dummy'
      }];
      NocServiceMock.validateNoCAnswers.and.returnValue(of(true));
      const action = new SetAnswers({
        caseReference: '1234567812345678',
        nocAnswers: dummy
      });
      const completion = new CheckAnswers(dummy);
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.setAnswers$).toBeObservable(expected);
    });

    it('should return SetAnswersIncomplete', () => {

      const action = new SetAnswers({
        caseReference: '1234567812345678',
        nocAnswers: []
      });
      const completion = new SetAnswersIncomplete();
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.setAnswers$).toBeObservable(expected);
    });

    it('should return SetAnswerSubmissionFailure', () => {
      const dummy: NocAnswer[] = [{
        displayOrder: 0,
        answer: 'dummy'
      }];
      const dummyError: NocError = {
        responseCode: 400,
        message: 'dummy'
      };
      NocServiceMock.validateNoCAnswers.and.returnValue(throwError(dummyError));
      const action = new SetAnswers({
        caseReference: '1234567812345678',
        nocAnswers: dummy
      });
      const completion = new SetAnswerSubmissionFailure(dummyError);
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.setAnswers$).toBeObservable(expected);
    });
  });

  describe('submitNoc$', () => {
    it('should return SetSubmissionSuccessPending', () => {

      const dummy: NocAnswer[] = [{
        displayOrder: 0,
        answer: 'dummy'
      }];
      NocServiceMock.submitNoCEvent.and.returnValue(of({
        approval_status: 'PENDING'
      }));
      const action = new SubmitNoc({
        caseReference: '1234567812345678',
        nocAnswers: dummy
      });
      const completion = new SetSubmissionSuccessPending();
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.submitNoc$).toBeObservable(expected);
    });

    it('should return SetSubmissionSuccessApproved', () => {

      const dummy: NocAnswer[] = [{
        displayOrder: 0,
        answer: 'dummy'
      }];
      NocServiceMock.submitNoCEvent.and.returnValue(of({
        approval_status: 'APPROVED'
      }));
      const action = new SubmitNoc({
        caseReference: '1234567812345678',
        nocAnswers: dummy
      });
      const completion = new SetSubmissionSuccessApproved();
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.submitNoc$).toBeObservable(expected);
    });

    it('should return SetSubmissionFailure', () => {
      const dummy: NocAnswer[] = [{
        displayOrder: 0,
        answer: 'dummy'
      }];
      const dummyError: NocError = {
        responseCode: 400,
        message: 'dummy'
      };
      NocServiceMock.submitNoCEvent.and.returnValue(throwError(dummyError));
      const action = new SubmitNoc({
        caseReference: '1234567812345678',
        nocAnswers: dummy
      });
      const completion = new SetSubmissionFailure(dummyError);
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.submitNoc$).toBeObservable(expected);
    });
  });

});
