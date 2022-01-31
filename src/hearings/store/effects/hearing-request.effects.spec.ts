import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {provideMockActions} from '@ngrx/effects/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import {Go} from '../../../app/store/actions';
import {initialState} from '../../hearing.store.state.test';
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
        HearingRequestEffects,
        provideMockActions(() => actions$)
      ]
    });
    effects = TestBed.get(HearingRequestEffects);
    router = TestBed.get(Router);
  });

  describe('continueNavigation$', () => {
    it('should navigate to error page if continue with no page', () => {
      pageflowMock.getNextPage.and.returnValue('next');
      const action = new hearingRequestActions.UpdateHearingRequest(null);
      actions$ = cold('-a', {a: action});
      const navigateAction = new hearingRequestActions.UpdateHearingRequest(null);
      const expected = cold('-b', {b: navigateAction});
      expect(effects.continueNavigation$).toBeObservable(expected);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['hearings', 'request', 'next']);
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
