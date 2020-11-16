import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { of, throwError } from 'rxjs';
import { Go } from '../../../app/store';
import { NocAnswer, NocHttpError, NocQuestion } from '../../models/';
import { NocService } from '../../services';
import {
  CheckAnswers,
  SetAnswers,
  SetAnswersIncomplete,
  SetAnswerSubmissionFailure,
  SetCaseReference,
  SetCaseRefSubmissionFailure,
  SetCaseRefValidationFailure,
  SetQuestions,
  SetSubmissionFailure,
  SetSubmissionSuccessApproved,
  SetSubmissionSuccessPending,
  SubmitNoc
} from '../actions/noc.action';
import { NocEffects } from './noc.effects';

describe('Noc Effects', () => {
  let actions$;
  let effects: NocEffects;
  const nocServiceMock = jasmine.createSpyObj('NocService', [
    'getNoCQuestions',
    'validateNoCAnswers',
    'submitNoCEvent'
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: NocService,
          useValue: nocServiceMock,
        },
        NocEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(NocEffects);

  });

  describe('setCaseReference$', () => {
    it('should return a response', () => {
      const dummy: NocQuestion[] = [{
        case_type_id: 'AAT',
        order: '1',
        question_text: 'What is their Email?',
        answer_field_type: {
          id: 'Email',
          type: 'Email',
          min: null,
          max: null,
          regular_expression: null,
          fixed_list_items: [],
          complex_fields: [],
          collection_field_type: null
        },
        display_context_parameter: '1',
        challenge_question_id: 'NoC',
        answer_field: '',
        question_id: 'QuestionId67745'
      }];
      nocServiceMock.getNoCQuestions.and.returnValue(of(dummy));
      const action = new SetCaseReference('1223-2212-4422-3131');
      const completion = new SetQuestions({questions: dummy, caseReference: '1223221244223131'});
      actions$ = hot('-a', {a: action});
      const expected = cold('-b', {b: completion});
      expect(effects.setCaseReference$).toBeObservable(expected);
    });

    it('should return SetCaseRefValidationFailure', () => {

      const action = new SetCaseReference('1223-2212-4422131');
      const completion = new SetCaseRefValidationFailure();
      actions$ = hot('-a', {a: action});
      const expected = cold('-b', {b: completion});
      expect(effects.setCaseReference$).toBeObservable(expected);
    });

    it('should return SetCaseRefValidationFailure when payload is null', () => {

      const action = new SetCaseReference(null);
      const completion = new SetCaseRefValidationFailure();
      actions$ = hot('-a', {a: action});
      const expected = cold('-b', {b: completion});
      expect(effects.setCaseReference$).toBeObservable(expected);
    });

    it('should redirect to service down', () => {
      const dummyError: NocHttpError = {
        status: 404,
        message: 'dummy'
      };
      nocServiceMock.getNoCQuestions.and.returnValue(throwError({dummyError, status: 404}));
      const action = new SetCaseReference('1223-2212-4422-3131');
      const completion = new Go({path: ['/service-down']});
      actions$ = hot('-a', {a: action});
      const expected = cold('-b', {b: completion});
      expect(effects.setCaseReference$).toBeObservable(expected);
    });
  });

  describe('setAnswers$', () => {
    it('should return a response', () => {

      const dummy: NocAnswer[] = [{
        question_id: '0',
        value: 'dummy'
      }];
      nocServiceMock.validateNoCAnswers.and.returnValue(of(true));
      const action = new SetAnswers({
        caseReference: '1234567812345678',
        nocAnswers: dummy
      });
      const completion = new CheckAnswers(dummy);
      actions$ = hot('-a', {a: action});
      const expected = cold('-b', {b: completion});
      expect(effects.setAnswers$).toBeObservable(expected);
    });

    it('should return SetAnswersIncomplete', () => {

      const action = new SetAnswers({
        caseReference: '1234567812345678',
        nocAnswers: []
      });
      const completion = new SetAnswersIncomplete();
      actions$ = hot('-a', {a: action});
      const expected = cold('-b', {b: completion});
      expect(effects.setAnswers$).toBeObservable(expected);
    });

    it('should return SetAnswerSubmissionFailure', () => {
      const dummy: NocAnswer[] = [{
        question_id: '0',
        value: 'dummy'
      }];
      const dummyError: NocHttpError = {
        status: 400,
        message: 'dummy'
      };
      nocServiceMock.validateNoCAnswers.and.returnValue(throwError(dummyError));
      const action = new SetAnswers({
        caseReference: '1234567812345678',
        nocAnswers: dummy
      });
      const completion = new SetAnswerSubmissionFailure(dummyError);
      actions$ = hot('-a', {a: action});
      const expected = cold('-b', {b: completion});
      expect(effects.setAnswers$).toBeObservable(expected);
    });
  });

  describe('submitNoc$', () => {
    it('should return SetSubmissionSuccessPending', () => {

      const dummy: NocAnswer[] = [{
        question_id: '0',
        value: 'dummy'
      }];
      nocServiceMock.submitNoCEvent.and.returnValue(of({
        approval_status: 'PENDING'
      }));
      const action = new SubmitNoc({
        caseReference: '1234567812345678',
        nocAnswers: dummy
      });
      const completion = new SetSubmissionSuccessPending();
      actions$ = hot('-a', {a: action});
      const expected = cold('-b', {b: completion});
      expect(effects.submitNoc$).toBeObservable(expected);
    });

    it('should return SetSubmissionSuccessApproved', () => {

      const dummy: NocAnswer[] = [{
        question_id: '0',
        value: 'dummy'
      }];
      nocServiceMock.submitNoCEvent.and.returnValue(of({
        approval_status: 'APPROVED'
      }));
      const action = new SubmitNoc({
        caseReference: '1234567812345678',
        nocAnswers: dummy
      });
      const completion = new SetSubmissionSuccessApproved();
      actions$ = hot('-a', {a: action});
      const expected = cold('-b', {b: completion});
      expect(effects.submitNoc$).toBeObservable(expected);
    });

    it('should return SetSubmissionFailure', () => {
      const dummy: NocAnswer[] = [{
        question_id: '0',
        value: 'dummy'
      }];
      const dummyError: NocHttpError = {
        status: 400,
        message: 'dummy'
      };
      nocServiceMock.submitNoCEvent.and.returnValue(throwError(dummyError));
      const action = new SubmitNoc({
        caseReference: '1234567812345678',
        nocAnswers: dummy
      });
      const completion = new SetSubmissionFailure(dummyError);
      actions$ = hot('-a', {a: action});
      const expected = cold('-b', {b: completion});
      expect(effects.submitNoc$).toBeObservable(expected);
    });
  });

  describe('handleError', () => {
    it('should handle 400', () => {
      const action$ = NocEffects.handleError({status: 400, message: 'error'});
      action$.subscribe(action => expect(action).toEqual(new SetCaseRefSubmissionFailure({status: 400, message: 'error'})));
    });
  });

  describe('handleError', () => {
    it('should handle 500', () => {
      const action$ = NocEffects.handleError({status: 500});
      action$.subscribe(action => expect(action).toEqual(new Go({path: ['/service-down']})));
    });
  });

});
