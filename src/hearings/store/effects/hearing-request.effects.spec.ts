import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpError } from '@hmcts/ccd-case-ui-toolkit';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { of, throwError } from 'rxjs';
import { Go } from '../../../app/store';
import { hearingRequestMainModel, initialState } from '../../hearing.test.data';
import { Mode } from '../../models/hearings.enum';
import { HearingsService } from '../../services/hearings.service';
import { AbstractPageFlow } from '../../utils/abstract-page-flow';
import * as hearingRequestToCompareActions from '../actions/hearing-request-to-compare.action';
import * as hearingRequestActions from '../actions/hearing-request.action';
import { HearingRequestEffects } from './hearing-request.effects';
import { LoggerService } from '../../../app/services/logger/logger.service';
import { beforeEach } from 'mocha';

describe('Hearing Request Effects', () => {
  let actions$;
  let effects: HearingRequestEffects;
  let store: any;
  const hearingsServiceMock = jasmine.createSpyObj('HearingsService', [
    'getAllHearings', 'loadHearingRequest', 'updateHearingRequest', 'submitHearingRequest'
  ]);
  const pageflowMock = jasmine.createSpyObj('AbstractPageFlow', [
    'getCurrentPage', 'getLastPage', 'getNextPage'
  ]);
  const mockRouter = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);
  const mockLocation = jasmine.createSpyObj('Location', ['back']);
  const loggerServiceMock = jasmine.createSpyObj('loggerService', ['error']);
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
          useValue: hearingsServiceMock
        },
        {
          provide: AbstractPageFlow,
          useValue: pageflowMock
        },
        {
          provide: Router,
          useValue: mockRouter
        },
        {
          provide: Location,
          useValue: mockLocation
        },
        {
          provide: LoggerService,
          useValue: loggerServiceMock
        },
        HearingRequestEffects,
        provideMockActions(() => actions$)
      ]
    });
    effects = TestBed.inject(HearingRequestEffects);
    store = TestBed.inject(Store);
  });

  describe('continueNavigation$', () => {
    beforeEach(() => {
      mockRouter.navigate.calls.reset();
      mockRouter.navigate.and.returnValue(Promise.resolve(true));
    });

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

  describe('continueNavigation$ - Catch scenarios', () => {
    beforeEach(() => {
      mockRouter.navigate.calls.reset();
      loggerServiceMock.error.calls.reset();
      mockRouter.navigate.and.returnValue(Promise.reject(new Error('Navigation error')));
    });

    it('should catch navigation error in case of Mode.CREATE', async () => {
      pageflowMock.getNextPage.and.returnValue('next-page');
      effects.mode = Mode.CREATE;

      actions$ = of({ type: hearingRequestActions.UPDATE_HEARING_REQUEST });

      await effects.continueNavigation$.toPromise();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['hearings', 'request', 'next-page']);
      expect(loggerServiceMock.error).toHaveBeenCalledWith('Error navigating to hearings/request/next-page ', jasmine.any(Error));
    });

    it('should catch navigation error in case of Mode.CREATE_EDIT and nextPage is a welsh page', async () => {
      pageflowMock.getNextPage.and.returnValue('hearing-welsh');
      effects.mode = Mode.CREATE_EDIT;

      actions$ = of({ type: hearingRequestActions.UPDATE_HEARING_REQUEST });

      await effects.continueNavigation$.toPromise();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['hearings', 'request', 'hearing-welsh']);
      expect(loggerServiceMock.error).toHaveBeenCalledWith('Error navigating to hearings/request/hearing-welsh ', jasmine.any(Error));
    });

    it('should catch navigation error in case of Mode.CREATE_EDIT and nextPage is not a welsh page', async () => {
      pageflowMock.getNextPage.and.returnValue('not-welsh-page');
      effects.mode = Mode.CREATE_EDIT;
      effects.fragmentId = 'test-fragment-id';

      actions$ = of({ type: hearingRequestActions.UPDATE_HEARING_REQUEST });

      await effects.continueNavigation$.toPromise();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['hearings', 'request', 'hearing-create-edit-summary'], { fragment: 'test-fragment-id' });
      expect(loggerServiceMock.error).toHaveBeenCalledWith('Error navigating to hearings/request/hearing-create-edit-summary#test-fragment-id ', jasmine.any(Error));
    });

    it('should catch navigation error in case of Mode.VIEW_EDIT and nextPage is a welsh page', async () => {
      pageflowMock.getNextPage.and.returnValue('hearing-welsh');
      effects.mode = Mode.VIEW_EDIT;

      actions$ = of({ type: hearingRequestActions.UPDATE_HEARING_REQUEST });

      await effects.continueNavigation$.toPromise();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['hearings', 'request', 'hearing-welsh']);
      expect(loggerServiceMock.error).toHaveBeenCalledWith('Error navigating to hearings/request/hearing-welsh ', jasmine.any(Error));
    });

    it('should catch navigation error in case of Mode.VIEW_EDIT and nextPage is not a welsh page', async () => {
      pageflowMock.getNextPage.and.returnValue('not-welsh-page');
      effects.mode = Mode.VIEW_EDIT;
      effects.fragmentId = 'test-fragment-id';

      actions$ = of({ type: hearingRequestActions.UPDATE_HEARING_REQUEST });

      await effects.continueNavigation$.toPromise();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['hearings', 'request', 'hearing-view-edit-summary'], { fragment: 'test-fragment-id' });
      expect(loggerServiceMock.error).toHaveBeenCalledWith('Error navigating to hearings/request/hearing-view-edit-summary#test-fragment-id ', jasmine.any(Error));
    });

    it('should catch navigation error in case of a blank mode', async () => {
      effects.mode = null;

      actions$ = of({ type: hearingRequestActions.UPDATE_HEARING_REQUEST });

      await effects.continueNavigation$.toPromise();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['cases', 'case-details', '1111222233334444', 'hearings']);
      expect(loggerServiceMock.error).toHaveBeenCalledWith('Error navigating to cases/case-details/caseId/hearings ', jasmine.any(Error));
    });
  });

  describe('backNavigation$', () => {
    it('should navigate to last page if going back on CREATE mode', () => {
      effects.mode = Mode.CREATE;
      pageflowMock.getLastPage.and.returnValue('last');
      const action = new hearingRequestActions.NavigateBackHearingRequest();
      actions$ = cold('-a', { a: action });
      const expected = cold('-b', { b: null });
      expect(effects.backNavigation$).toBeObservable(expected);
      expect(mockLocation.back).toHaveBeenCalled();
    });

    it('should navigate to hearing-create-edit-summary page if going back on CREATE_EDIT mode', () => {
      effects.mode = Mode.CREATE_EDIT;
      const action = new hearingRequestActions.NavigateBackHearingRequest();
      actions$ = cold('-a', { a: action });
      const expected = cold('-b', { b: null });
      expect(effects.backNavigation$).toBeObservable(expected);
      expect(mockLocation.back).toHaveBeenCalled();
    });

    it('should navigate to hearing tab page if going back on VIEW mode', () => {
      effects.mode = Mode.VIEW;
      const action = new hearingRequestActions.NavigateBackHearingRequest();
      actions$ = cold('-a', { a: action });
      const expected = cold('-b', { b: null });
      expect(effects.backNavigation$).toBeObservable(expected);
      expect(mockLocation.back).toHaveBeenCalled();
    });

    it('should navigate to hearing-view-edit-summary page if going back on VIEW_EDIT mode', () => {
      effects.mode = Mode.VIEW_EDIT;
      const action = new hearingRequestActions.NavigateBackHearingRequest();
      actions$ = cold('-a', { a: action });
      const expected = cold('-b', { b: null });
      expect(effects.backNavigation$).toBeObservable(expected);
      expect(mockLocation.back).toHaveBeenCalled();
    });
  });

  describe('loadHearingRequest$', () => {
    beforeEach(() => {
      mockRouter.navigateByUrl.calls.reset();
      mockRouter.navigateByUrl.and.returnValue(Promise.resolve(true));
    });

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
    beforeEach(() => {
      mockRouter.navigate.calls.reset();
      mockRouter.navigate.and.returnValue(Promise.resolve(true));
    });

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
    beforeEach(() => {
      mockRouter.navigate.calls.reset();
      mockRouter.navigate.and.returnValue(Promise.resolve(true));
    });

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
    beforeEach(() => {
      mockRouter.navigate.calls.reset();
      mockRouter.navigate.and.returnValue(Promise.resolve(true));
    });

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
      action$.subscribe((action) => expect(action).toEqual(new Go({ path: ['/hearings/error'] })));
    });

    it('should handle 4xx related errors', () => {
      const action$ = HearingRequestEffects.handleError({
        status: 403,
        message: 'error'
      });
      action$.subscribe((action) => expect(action).toEqual(new Go({ path: ['/hearings/error'] })));
    });
  });
});
