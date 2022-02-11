import {Location} from '@angular/common';
import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {provideMockActions} from '@ngrx/effects/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import {Go} from '../../../app/store/actions';
import {initialState} from '../../hearing.test.data';
import {Mode} from '../../models/hearings.enum';
import {HearingsService} from '../../services/hearings.service';
import {AbstractPageFlow} from '../../utils/abstract-page-flow';
import * as hearingRequestActions from '../actions/hearing-request.action';
import {HearingRequestEffects} from './hearing-request.effects';

describe('Hearing Request Effects', () => {
  let actions$;
  let effects: HearingRequestEffects;
  let router: Router;
  const hearingsServiceMock = jasmine.createSpyObj('HearingsService', [
    'getAllHearings',
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
      expect(mockRouter.navigate).toHaveBeenCalledWith(['hearings', 'request', 'hearing-view-edit-summary']);
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

  describe('handleError', () => {
    it('should handle 500', () => {
      const action$ = HearingRequestEffects.handleError({
        status: 500,
        message: 'error'
      });
      action$.subscribe(action => expect(action).toEqual(new Go({path: ['/service-down']})));
    });
  });
});
