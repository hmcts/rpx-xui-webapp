import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { of, throwError } from 'rxjs';
import { Go } from '../../../app/store';
import { HttpError } from '../../../models/httpError.model';
import { hearingActualsMainModel } from '../../hearing.test.data';
import { HearingsService } from '../../services/hearings.service';
import * as hearingActualsActions from '../actions/hearing-actuals.action';
import { HearingActualsEffects } from './hearing-actuals.effects';

describe('Hearing Actuals Effects', () => {
  let actions$;
  let effects: HearingActualsEffects;
  const hearingsServiceMock = jasmine.createSpyObj('HearingsService', [
    'getHearingActuals', 'updateHearingActuals', 'updateHearingActualsStage', 'submitHearingActuals'
  ]);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: HearingsService,
          useValue: hearingsServiceMock,
        },
        HearingActualsEffects,
        provideMockActions(() => actions$)
      ]
    });
    effects = TestBed.get(HearingActualsEffects);
  });

  describe('loadHearingActual$', () => {
    it('should return a response with service hearing actuals', () => {
      hearingsServiceMock.getHearingActuals.and.returnValue(of(hearingActualsMainModel));
      const action = new hearingActualsActions.GetHearingActuals('1111222233334444');
      const completion = new hearingActualsActions.GetHearingActualsSuccess(hearingActualsMainModel);
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.getHearingActuals$).toBeObservable(expected);
    });
  });

  describe('updateHearingActual$', () => {
    it('should return a response with service hearing actuals', () => {
      hearingsServiceMock.updateHearingActuals.and.returnValue(of(hearingActualsMainModel));
      const action = new hearingActualsActions.UpdateHearingActuals({
        hearingId: '1111222233334444',
        hearingActuals: hearingActualsMainModel.hearingActuals
      });
      const completion = new hearingActualsActions.UpdateHearingActualsSuccess(hearingActualsMainModel.hearingActuals);
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.updateHearingActuals$).toBeObservable(expected);
    });
  });

  describe('updateHearingActualStage$', () => {

    it('should return a response with service hearing actuals stage', () => {
      hearingsServiceMock.updateHearingActuals.and.returnValue(of(hearingActualsMainModel));
      const action = new hearingActualsActions.UpdateHearingActualsStage({
        hearingId: '1111222233334444',
        hearingActuals: hearingActualsMainModel.hearingActuals
      });
      const completion = new hearingActualsActions.UpdateHearingActualsSuccess(hearingActualsMainModel.hearingActuals);
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.updateHearingActualsStage$).toBeObservable(expected);
    });
  });

  describe('submitHearingActuals$', () => {
    it('should submit hearing actuals', () => {
      hearingsServiceMock.submitHearingActuals.and.returnValue(of(200));
      const action = new hearingActualsActions.SubmitHearingActuals('1111222233334444');
      const completion = new hearingActualsActions.SubmitHearingActualsSuccess('1111222233334444');
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.submitHearingActuals$).toBeObservable(expected);
    });

    it('should submit hearing actuals error', () => {
      const error: HttpError = {
        status: 400,
        statusText: 'Bad Request',
        message: 'Bad Request',
        errors: [],
      };
      hearingsServiceMock.submitHearingActuals.and.returnValue(throwError(error));
      const action = new hearingActualsActions.SubmitHearingActuals('1111222233334444');
      const completion = new hearingActualsActions.SubmitHearingActualsFailure(error);
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.submitHearingActuals$).toBeObservable(expected);
    });
  });

  describe('handleError', () => {
    it('should handle 500', () => {
      const action$ = HearingActualsEffects.handleError({
        status: 500,
        message: 'error'
      });
      action$.subscribe(action => expect(action).toEqual(new Go({ path: ['/hearings/error'] })));
    });

    it('should handle 4xx related errors', () => {
      const action$ = HearingActualsEffects.handleError({
        status: 403,
        message: 'error'
      });
      action$.subscribe(action => expect(action).toEqual(new Go({ path: ['/hearings/error'] })));
    });
  });
});
