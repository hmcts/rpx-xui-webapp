import {Location} from '@angular/common';
import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {provideMockActions} from '@ngrx/effects/testing';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {Go} from '../../../app/store/actions';
import {hearingRequestMainModel, initialState} from '../../hearing.test.data';
import {Mode} from '../../models/hearings.enum';
import {HearingsService} from '../../services/hearings.service';
import {AbstractPageFlow} from '../../utils/abstract-page-flow';
import * as hearingRequestToCompareActions from '../actions/hearing-request-to-compare.action';
import * as hearingRequestActions from '../actions/hearing-request.action';
import {HearingRequestEffects} from './hearing-request.effects';

describe('Hearing Request Effects', () => {
  let actions$;
  let effects: HearingRequestEffects;
  let router: Router;
  let store: any;
  let hearingService: any;
  const hearingsServiceMock = jasmine.createSpyObj('HearingsService', [
    'getAllHearings', 'loadHearingRequest', 'updateHearingRequest', 'submitHearingRequest',
  ]);
  const pageflowMock = jasmine.createSpyObj('AbstractPageFlow', [
    'getCurrentPage', 'getLastPage', 'getNextPage'
  ]);
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  const mockLocation = jasmine.createSpyObj('Location', ['back']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState}),
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
    effects = TestBed.get(HearingRequestEffects);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    hearingService = TestBed.get(HearingsService);
  });

  describe('continueNavigation$', () => {
    it('should navigate to next page if continue on CREATE mode', () => {
      effects.mode = Mode.CREATE;
      pageflowMock.getNextPage.and.returnValue('next');
      const action = new hearingRequestActions.UpdateHearingRequest(null);
      actions$ = cold('-a', {a: action});
      const navigateAction = new hearingRequestActions.UpdateHearingRequest(null);
      const expected = cold('-b', {b: navigateAction});
      expect(effects.continueNavigation$).toBeObservable(expected);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['hearings', 'request', 'next']);
    });

    it('should navigate to create edit page if on CREATE_EDIT mode', () => {
      effects.mode = Mode.CREATE_EDIT;
      const action = new hearingRequestActions.UpdateHearingRequest(null);
      actions$ = cold('-a', {a: action});
      const navigateAction = new hearingRequestActions.UpdateHearingRequest(null);
      const expected = cold('-b', {b: navigateAction});
      expect(effects.continueNavigation$).toBeObservable(expected);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['hearings', 'request', 'hearing-create-edit-summary'], { fragment: 'venue' });
    });

    it('should navigate to create edit page if on VIEW_EDIT mode', () => {
      effects.mode = Mode.VIEW_EDIT;
      const action = new hearingRequestActions.UpdateHearingRequest(null);
      actions$ = cold('-a', {a: action});
      const navigateAction = new hearingRequestActions.UpdateHearingRequest(null);
      const expected = cold('-b', {b: navigateAction});
      expect(effects.continueNavigation$).toBeObservable(expected);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['hearings', 'request', 'hearing-view-edit-summary'], { fragment: 'venue' });
    });
  });

  describe('backNavigation$', () => {
    it('should navigate to last page if going back on CREATE mode', () => {
      effects.mode = Mode.CREATE;
      pageflowMock.getLastPage.and.returnValue('last');
      const action = new hearingRequestActions.NavigateBackHearingRequest();
      actions$ = cold('-a', {a: action});
      const navigateAction = new hearingRequestActions.NavigateBackHearingRequest();
      const expected = cold('-b', {b: navigateAction});
      expect(effects.backNavigation$).toBeObservable(expected);
      expect(mockLocation.back).toHaveBeenCalled();
    });

    it('should navigate to hearing-create-edit-summary page if going back on CREATE_EDIT mode', () => {
      effects.mode = Mode.CREATE_EDIT;
      const action = new hearingRequestActions.NavigateBackHearingRequest();
      actions$ = cold('-a', {a: action});
      const navigateAction = new hearingRequestActions.NavigateBackHearingRequest();
      const expected = cold('-b', {b: navigateAction});
      expect(effects.backNavigation$).toBeObservable(expected);
      expect(mockLocation.back).toHaveBeenCalled();
    });

    it('should navigate to hearing tab page if going back on VIEW mode', () => {
      effects.mode = Mode.VIEW;
      const action = new hearingRequestActions.NavigateBackHearingRequest();
      actions$ = cold('-a', {a: action});
      const navigateAction = new hearingRequestActions.NavigateBackHearingRequest();
      const expected = cold('-b', {b: navigateAction});
      expect(effects.backNavigation$).toBeObservable(expected);
      expect(mockLocation.back).toHaveBeenCalled();
    });

    it('should navigate to hearing-view-edit-summary page if going back on VIEW_EDIT mode', () => {
      effects.mode = Mode.VIEW_EDIT;
      const action = new hearingRequestActions.NavigateBackHearingRequest();
      actions$ = cold('-a', {a: action});
      const navigateAction = new hearingRequestActions.NavigateBackHearingRequest();
      const expected = cold('-b', {b: navigateAction});
      expect(effects.backNavigation$).toBeObservable(expected);
      expect(mockLocation.back).toHaveBeenCalled();
    });
  });

  describe('loadHearingRequest$', () => {
    it('should load hearing requests', () => {
      const dispatchSpy = spyOn(store, 'dispatch');
      hearingsServiceMock.loadHearingRequest.and.returnValue(of(hearingRequestMainModel));
      const action = new hearingRequestActions.LoadHearingRequest('h1000000');
      actions$ = cold('-a', {a: action});
      const expected = cold('-b', {b: hearingRequestMainModel});
      expect(effects.loadHearingRequest$).toBeObservable(expected);
      expect(hearingsServiceMock.loadHearingRequest).toHaveBeenCalledWith('h1000000');
      expect(dispatchSpy).toHaveBeenCalledWith(new hearingRequestToCompareActions.InitializeHearingRequestToCompare(hearingRequestMainModel));
      expect(dispatchSpy).toHaveBeenCalledWith(new hearingRequestActions.InitializeHearingRequest(hearingRequestMainModel));
    });
  });

  describe('submitHearingReason$', () => {
    it('should submit hearing reason', () => {
      const action = new hearingRequestActions.ViewEditSubmitHearingReason(hearingRequestMainModel);
      actions$ = cold('-a', {a: action});
      const expectedAction = new hearingRequestActions.ViewEditSubmitHearingReason(hearingRequestMainModel);
      const expected = cold('-b', {b: expectedAction});
      expect(effects.submitHearingReason$).toBeObservable(expected);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['hearings', 'request', 'hearing-change-reason']);
    });
  });

  describe('submitHearingRequest$', () => {
    it('should submit hearing request', () => {
      hearingsServiceMock.submitHearingRequest.and.returnValue(of(hearingRequestMainModel));
      const action = new hearingRequestActions.SubmitHearingRequest(hearingRequestMainModel);
      actions$ = cold('-a', {a: action});
      const expected = cold('-b', {b: hearingRequestMainModel});
      expect(effects.submitHearingRequest$).toBeObservable(expected);
      expect(hearingsServiceMock.submitHearingRequest).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['hearings', 'request', 'hearing-confirmation']);
    });
  });

  describe('viewEditSubmitHearingRequest$', () => {
    it('should view edit submit hearing request', () => {
      hearingsServiceMock.updateHearingRequest.and.returnValue(of(hearingRequestMainModel));
      const action = new hearingRequestActions.ViewEditSubmitHearingRequest(hearingRequestMainModel);
      actions$ = cold('-a', {a: action});
      const expected = cold('-b', {b: hearingRequestMainModel});
      expect(effects.viewEditSubmitHearingRequest$).toBeObservable(expected);
      expect(hearingsServiceMock.updateHearingRequest).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['hearings', 'request', 'hearing-confirmation']);
    });
  });

  describe('handleError', () => {
    it('should handle 500', () => {
      const action$ = HearingRequestEffects.handleError({
        status: 500,
        message: 'error'
      });
      action$.subscribe(action => expect(action).toEqual(new Go({path: ['/hearings/error']})));
    });
  });
});
