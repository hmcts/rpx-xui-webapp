import { Location } from '@angular/common';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { AppConfigService } from '../../services/config/configuration.services';
import { Back, CreateCaseGo, Forward, Go } from '../actions/router.action';
import * as fromRouterEffects from './router.effect';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DecentralisedRoutingService } from '../../shared/services/decentralised-routing.service';

describe('Router Effects', () => {
  let actions$;
  let effects: fromRouterEffects.RouterEffects;
  let store;

  const LocationMock = jasmine.createSpyObj('Location', [
    'back', 'forward'
  ]);

  const RouterMock = jasmine.createSpyObj('Router', [
    'navigate'
  ]);
  const DecentralisedRoutingServiceMock = jasmine.createSpyObj('DecentralisedRoutingService', [
    'getRedirectUrlFromPath'
  ]);
  const WindowMock = {
    location: {
      assign: jasmine.createSpy('assign')
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let spyOnDispatchToStore = jasmine.createSpy();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        AppConfigService,
        {
          provide: Location,
          useValue: LocationMock
        },
        {
          provide: Router,
          useValue: RouterMock
        },
        {
          provide: DecentralisedRoutingService,
          useValue: DecentralisedRoutingServiceMock
        },
        {
          provide: Window,
          useValue: WindowMock
        },
        fromRouterEffects.RouterEffects,
        provideMockActions(() => actions$),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    store = TestBed.inject(Store);
    spyOnDispatchToStore = spyOn(store, 'dispatch').and.callThrough();

    effects = TestBed.inject(fromRouterEffects.RouterEffects);
    RouterMock.navigate.calls.reset();
    WindowMock.location.assign.calls.reset();
    DecentralisedRoutingServiceMock.getRedirectUrlFromPath.calls.reset();
    DecentralisedRoutingServiceMock.getRedirectUrlFromPath.and.returnValue(null);
  });

  describe('navigate$', () => {
    it('should call Angular\'s router on dispatch of RouterActions.Go and trigger "callback"', (done) => {
      const payload = {
        path: [],
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        callback: () => {}
      };

      RouterMock.navigate.and.returnValue(Promise.resolve(true));

      const action = new Go(payload);
      actions$ = of(action);

      effects.navigate$.subscribe(() => {
        expect(RouterMock.navigate).toHaveBeenCalled();
        done();
      });
    });

    it('should call Angular\'s router on dispatch of RouterActions.Go and not trigger "callback"', (done) => {
      const payload = {
        path: []
      };

      RouterMock.navigate.and.returnValue(Promise.resolve(true));

      const action = new Go(payload);
      actions$ = of(action);

      effects.navigate$.subscribe(() => {
        expect(RouterMock.navigate).toHaveBeenCalled();
        done();
      });
    });

    it('should call Angular\'s router on dispatch of RouterActions.Go and trigger "errorHandler"', (done) => {
      const payload = {
        path: [],
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        errorHandler: () => {}
      };

      RouterMock.navigate.and.returnValue(Promise.reject(false));

      const action = new Go(payload);
      actions$ = of(action);

      effects.navigate$.subscribe(() => {
        expect(RouterMock.navigate).toHaveBeenCalled();
        done();
      });
    });

    it('should call Angular\'s router on dispatch of RouterActions.Go and not trigger "errorHandler"', (done) => {
      const payload = {
        path: []
      };

      RouterMock.navigate.and.returnValue(Promise.reject(false));

      const action = new Go(payload);
      actions$ = of(action);

      effects.navigate$.subscribe(() => {
        expect(RouterMock.navigate).toHaveBeenCalled();
        done();
      });
    });

    it('should redirect to decentralised url when configured', (done) => {
      const payload = {
        path: ['/cases/case-details/IA/Asylum/123/trigger/ext:customEvent']
      };

      DecentralisedRoutingServiceMock.getRedirectUrlFromPath.and.returnValue('https://example.com/cases/123/event/ext:customEvent');
      const action = new Go(payload);
      actions$ = of(action);

      effects.navigate$.subscribe(() => {
        expect(WindowMock.location.assign).toHaveBeenCalledWith('https://example.com/cases/123/event/ext:customEvent');
        expect(RouterMock.navigate).not.toHaveBeenCalled();
        done();
      });
    });
  });

  describe('navigateNewCase$', () => {
    it('should call Angular\'s router on dispatch of RouterActions.CREATE_CASE_GO', (done) => {
      const payload = {
        path: [],
        caseId: 'dummy'
      };

      RouterMock.navigate.and.returnValue(Promise.resolve(true));

      const action = new CreateCaseGo(payload);
      actions$ = of(action);

      effects.navigateNewCase$.subscribe(() => {
        expect(RouterMock.navigate).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('navigateBack$', () => {
    it('should call Angular\'s Location.back() on dispatch' +
      ' of RouterActions.BACK', (done) => {
      const action = new Back();
      actions$ = of(action);
      effects.navigateBack$.subscribe(() => {
        expect(LocationMock.back).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('navigateForward$', () => {
    it('should call Angular\'s Location.forward() on dispatch of RouterActions.FORWARD', (done) => {
      const action = new Forward();
      actions$ = of(action);
      effects.navigateForward$.subscribe(() => {
        expect(LocationMock.forward).toHaveBeenCalled();
        done();
      });
    });
  });
});
