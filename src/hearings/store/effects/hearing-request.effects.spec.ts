import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpError } from '@hmcts/ccd-case-ui-toolkit';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { Go } from '../../../app/store/actions';
import { hearingRequestMainModel, initialState } from '../../hearing.test.data';
import { Mode } from '../../models/hearings.enum';
import { HearingsService } from '../../services/hearings.service';
import { AbstractPageFlow } from '../../utils/abstract-page-flow';
import * as hearingRequestToCompareActions from '../actions/hearing-request-to-compare.action';
import * as hearingRequestActions from '../actions/hearing-request.action';
import { HearingRequestEffects } from './hearing-request.effects';

describe('Hearing Request Effects', () => {
  let actions$;
  let effects: HearingRequestEffects;
  let store: any;
  const hearingsServiceMock = jasmine.createSpyObj('HearingsService', [
    'getAllHearings', 'loadHearingRequest', 'updateHearingRequest', 'submitHearingRequest',
  ]);
  const pageflowMock = jasmine.createSpyObj('AbstractPageFlow', [
    'getCurrentPage', 'getLastPage', 'getNextPage'
  ]);
  const mockRouter = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);
  const mockLocation = jasmine.createSpyObj('Location', ['back']);
  const hearingConditions = {
    isInit: false,
    region: 'Wales'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
        {
          provide: HearingsService,
          useValue: hearingsServiceMock,
        },
        {
          provide: AbstractPageFlow,
          useValue: pageflowMock,
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
        {
          provide: Location,
          useValue: mockLocation,
        },
        HearingRequestEffects,
        provideMockActions(() => actions$)
      ]
    });
    effects = TestBed.inject(HearingRequestEffects);
    store = TestBed.inject(Store);
  });

  describe('continueNavigation$', () => {
    it('should navigate to next page if continue on CREATE mode', () => {
      effects.mode = Mode.CREATE;
      pageflowMock.getNextPage.and.returnValue('next');
      const action = new hearingRequestActions.UpdateHearingRequest(null, hearingConditions);
      actions$ = cold('-a', { a: action });
      const navigateAction = new hearingRequestActions.UpdateHearingRequest(null, hearingConditions);
      const expected = cold('-b', { b: navigateAction });
      expect(effects.continueNavigation$).toBeObservable(expected);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['hearings', 'request', 'next']);
    });

    it('should navigate to create edit page if on CREATE_EDIT mode', () => {
      effects.mode = Mode.CREATE_EDIT;
      const action = new hearingRequestActions.UpdateHearingRequest(null, hearingConditions);
      actions$ = cold('-a', { a: action });
      const navigateAction = new hearingRequestActions.UpdateHearingRequest(null, hearingConditions);
      const expected = cold('-b', { b: navigateAction });
      expect(effects.continueNavigation$).toBeObservable(expected);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['hearings', 'request', 'hearing-create-edit-summary'], { fragment: 'venue' });
    });

    it('should navigate to create edit page if on VIEW_EDIT mode', () => {
      effects.mode = Mode.VIEW_EDIT;
      const action = new hearingRequestActions.UpdateHearingRequest(null, hearingConditions);
      actions$ = cold('-a', { a: action });
      const navigateAction = new hearingRequestActions.UpdateHearingRequest(null, hearingConditions);
      const expected = cold('-b', { b: navigateAction });
      expect(effects.continueNavigation$).toBeObservable(expected);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['hearings', 'request', 'hearing-view-edit-summary'], { fragment: 'venue' });
    });
  });

  describe('backNavigation$', () => {
    it('should navigate to last page if going back on CREATE mode', () => {
      effects.mode = Mode.CREATE;
      pageflowMock.getLastPage.and.returnValue('last');
      const action = new hearingRequestActions.NavigateBackHearingRequest();
      actions$ = cold('-a', { a: action });
      const navigateAction = new hearingRequestActions.NavigateBackHearingRequest();
      const expected = cold('-b', { b: navigateAction });
      expect(effects.backNavigation$).toBeObservable(expected);
      expect(mockLocation.back).toHaveBeenCalled();
    });

    it('should navigate to hearing-create-edit-summary page if going back on CREATE_EDIT mode', () => {
      effects.mode = Mode.CREATE_EDIT;
      const action = new hearingRequestActions.NavigateBackHearingRequest();
      actions$ = cold('-a', { a: action });
      const navigateAction = new hearingRequestActions.NavigateBackHearingRequest();
      const expected = cold('-b', { b: navigateAction });
      expect(effects.backNavigation$).toBeObservable(expected);
      expect(mockLocation.back).toHaveBeenCalled();
    });

    it('should navigate to hearing tab page if going back on VIEW mode', () => {
      effects.mode = Mode.VIEW;
      const action = new hearingRequestActions.NavigateBackHearingRequest();
      actions$ = cold('-a', { a: action });
      const navigateAction = new hearingRequestActions.NavigateBackHearingRequest();
      const expected = cold('-b', { b: navigateAction });
      expect(effects.backNavigation$).toBeObservable(expected);
      expect(mockLocation.back).toHaveBeenCalled();
    });

    it('should navigate to hearing-view-edit-summary page if going back on VIEW_EDIT mode', () => {
      effects.mode = Mode.VIEW_EDIT;
      const action = new hearingRequestActions.NavigateBackHearingRequest();
      actions$ = cold('-a', { a: action });
      const navigateAction = new hearingRequestActions.NavigateBackHearingRequest();
      const expected = cold('-b', { b: navigateAction });
      expect(effects.backNavigation$).toBeObservable(expected);
      expect(mockLocation.back).toHaveBeenCalled();
    });
  });

  describe('loadHearingRequest$', () => {
    it('should load hearing requests', () => {
      const dispatchSpy = spyOn(store, 'dispatch');
      hearingsServiceMock.loadHearingRequest.and.returnValue(of(hearingRequestMainModel));
      const action = new hearingRequestActions.LoadHearingRequest({ hearingID: 'h1000000', targetURL: 'dummy-url' });
      actions$ = cold('-a', { a: action });
      const expected = cold('-b', { b: hearingRequestMainModel });
      expect(effects.loadHearingRequest$).toBeObservable(expected);
      expect(hearingsServiceMock.loadHearingRequest).toHaveBeenCalledWith('h1000000');
      expect(dispatchSpy).toHaveBeenCalledWith(new hearingRequestToCompareActions.InitializeHearingRequestToCompare(hearingRequestMainModel));
      expect(dispatchSpy).toHaveBeenCalledWith(new hearingRequestActions.InitializeHearingRequest(hearingRequestMainModel));
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('dummy-url');
    });
  });

  describe('submitHearingReason$', () => {
    it('should submit hearing reason', () => {
      const action = new hearingRequestActions.ViewEditSubmitHearingReason(hearingRequestMainModel);
      actions$ = cold('-a', { a: action });
      const expectedAction = new hearingRequestActions.ViewEditSubmitHearingReason(hearingRequestMainModel);
      const expected = cold('-b', { b: expectedAction });
      expect(effects.submitHearingReason$).toBeObservable(expected);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['hearings', 'request', 'hearing-change-reason']);
    });
  });

  describe('submitHearingRequest$', () => {
    it('should submit hearing request', () => {
      const dispatchSpy = spyOn(store, 'dispatch');
      hearingsServiceMock.submitHearingRequest.and.returnValue(of(hearingRequestMainModel));
      const action = new hearingRequestActions.SubmitHearingRequest(hearingRequestMainModel);
      actions$ = cold('-a', { a: action });
      const expected = cold('-b', { b: hearingRequestMainModel });
      expect(effects.submitHearingRequest$).toBeObservable(expected);
      expect(hearingsServiceMock.submitHearingRequest).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['hearings', 'request', 'hearing-confirmation']);
      expect(dispatchSpy).toHaveBeenCalledTimes(0);
    });

    it('should error submitting hearing request', () => {
      const error: HttpError = {
        status: 403,
        error: null,
        message: 'Http failure response: 403 Forbidden',
        timestamp: '',
        exception: '',
        path: ''
      };
      const dispatchSpy = spyOn(store, 'dispatch');
      hearingsServiceMock.submitHearingRequest.and.returnValue(throwError(error));
      const action = new hearingRequestActions.SubmitHearingRequest(hearingRequestMainModel);
      actions$ = cold('-a', { a: action });
      const expected = cold('-b', { b: error });
      expect(effects.submitHearingRequest$).toBeObservable(expected);
      expect(hearingsServiceMock.submitHearingRequest).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenCalledWith(new hearingRequestActions.SubmitHearingRequestFailure(error));
    });
  });

  describe('ViewEditSubmitHearingRequest$', () => {
    it('should update hearing request', () => {
      hearingsServiceMock.updateHearingRequest.and.returnValue(of(hearingRequestMainModel));
      const action = new hearingRequestActions.ViewEditSubmitHearingRequest(hearingRequestMainModel);
      actions$ = cold('-a', { a: action });
      const expected = cold('-b', { b: hearingRequestMainModel });
      expect(effects.viewEditSubmitHearingRequest$).toBeObservable(expected);
      expect(hearingsServiceMock.updateHearingRequest).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['hearings', 'request', 'hearing-confirmation']);
    });

    it('should error update hearing request failed', () => {
      const error: HttpError = {
        status: 403,
        error: null,
        message: 'Http failure response: 403 Forbidden',
        timestamp: '',
        exception: '',
        path: ''
      };
      const dispatchSpy = spyOn(store, 'dispatch');
      hearingsServiceMock.updateHearingRequest.and.returnValue(throwError(error));
      const action = new hearingRequestActions.ViewEditSubmitHearingRequest(hearingRequestMainModel);
      actions$ = cold('-a', { a: action });
      const expected = cold('-b', { b: error });
      expect(effects.viewEditSubmitHearingRequest$).toBeObservable(expected);
      expect(hearingsServiceMock.updateHearingRequest).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenCalledWith(new hearingRequestActions.UpdateHearingRequestFailure(error));
    });
  });

  describe('handleError', () => {
    it('should handle 500', () => {
      const action$ = HearingRequestEffects.handleError({
        status: 400,
        message: 'error'
      });
      action$.subscribe(action => expect(action).toEqual(new Go({ path: ['/hearings/error'] })));
    });

    it('should handle 4xx related errors', () => {
      const action$ = HearingRequestEffects.handleError({
        status: 403,
        message: 'error'
      });
      action$.subscribe(action => expect(action).toEqual(new Go({ path: ['/hearings/error'] })));
    });
  });
});
