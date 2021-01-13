import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { AppConfigService } from '../../services/config/configuration.services';
import { Back, CreateCaseGo, Forward, Go } from '../actions/router.action';
import { State } from '../reducers';
import * as fromRouterEffects from './router.effect';

describe('Router Effects', () => {
  let actions$;
  let effects: fromRouterEffects.RouterEffects;
  let store: MockStore<State>;

  const locationMock = jasmine.createSpyObj('Location', [
    'back', 'forward',
  ]);

  const routerMock = jasmine.createSpyObj('Router', [
    'navigate'
  ]);

  let spyOnDispatchToStore = jasmine.createSpy();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        HttpClientTestingModule
      ],
      providers: [
        AppConfigService,
        {
          provide: Location,
          useValue: locationMock
        },
        {
          provide: Router,
          useValue: routerMock
        },
        fromRouterEffects.RouterEffects,
        provideMockActions(() => actions$)
      ]
    });
    store = TestBed.get(Store);
    spyOnDispatchToStore = spyOn(store, 'dispatch').and.callThrough();

    effects = TestBed.get(fromRouterEffects.RouterEffects);
  });

  describe('navigate$', () => {

    it('should call Angular\'s router on dispatch of RouterActions.Go and trigger "callback"', () => {
      const payload = {
        path: [],
        callback: () => { }
      };

      routerMock.navigate.and.returnValue(Promise.resolve(true));

      const action = new Go(payload);
      actions$ = hot('-a', { a: action });

      effects.navigate$.subscribe(() => {
        expect(routerMock.navigate).toHaveBeenCalled();
      });
    });

    it('should call Angular\'s router on dispatch of RouterActions.Go and not trigger "callback"', () => {
      const payload = {
        path: []
      };

      routerMock.navigate.and.returnValue(Promise.resolve(true));

      const action = new Go(payload);
      actions$ = hot('-a', { a: action });

      effects.navigate$.subscribe(() => {
        expect(routerMock.navigate).toHaveBeenCalled();
      });
    });

    it('should call Angular\'s router on dispatch of RouterActions.Go and trigger "errorHandler"', () => {
      const payload = {
        path: [],
        errorHandler: () => { }
      };

      routerMock.navigate.and.returnValue(Promise.reject(false));

      const action = new Go(payload);
      actions$ = hot('-a', { a: action });

      effects.navigate$.subscribe(() => {
        expect(routerMock.navigate).toHaveBeenCalled();
      });
    });

    it('should call Angular\'s router on dispatch of RouterActions.Go and not trigger "errorHandler"', () => {
      const payload = {
        path: []
      };

      routerMock.navigate.and.returnValue(Promise.reject(false));

      const action = new Go(payload);
      actions$ = hot('-a', { a: action });

      effects.navigate$.subscribe(() => {
        expect(routerMock.navigate).toHaveBeenCalled();
      });
    });
  });

  describe('navigateNewCase$', () => {

    it('should call Angular\'s router on dispatch of RouterActions.CREATE_CASE_GO', () => {
      const payload = {
        path: [],
        caseId: 'dummy'
      };

      routerMock.navigate.and.returnValue(Promise.resolve(true));

      const action = new CreateCaseGo(payload);
      actions$ = hot('-a', { a: action });

      effects.navigateNewCase$.subscribe(() => {
        expect(routerMock.navigate).toHaveBeenCalled();
      });
    });
  });

  describe('navigateBack$', () => {
    it('should call Angular\'s Location.back() on dispatch' +
      ' of RouterActions.BACK', () => {

        const action = new Back();
        actions$ = hot('-a', { a: action });
        effects.navigateBack$.subscribe(() => {
          expect(locationMock.back).toHaveBeenCalled();
        });
      });
  });

  describe('navigateForward$', () => {
    it('should call Angular\'s Location.forward() on dispatch' +
      ' of RouterActions.FORWARD', () => {

        const action = new Forward();
        actions$ = hot('-a', { a: action });
        effects.navigateForward$.subscribe(() => {
          expect(locationMock.forward).toHaveBeenCalled();
        });
      });
  });
});
