import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { of } from 'rxjs';
import { AppConfigService } from '../../services/config/configuration.services';
import { BACK, FORWARD } from '../actions/router.action';
import { State } from '../reducers';
import * as fromRouterEffects from './router.effect';

describe('Router Effects', () => {
  let actions$;
  let effects: fromRouterEffects.RouterEffects;
  let store: MockStore<State>;

  const locationMock = jasmine.createSpyObj('Location', [
    'back', 'forward',
  ]);

  const genericMock = jasmine.createSpy();
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
          useValue: genericMock
        },
        fromRouterEffects.RouterEffects,
        provideMockActions(() => actions$)
      ]
    });
    store = TestBed.get(Store);
    spyOnDispatchToStore = spyOn(store, 'dispatch').and.callThrough();

    effects = TestBed.get(fromRouterEffects.RouterEffects);
  });

  describe('navigateBack$', () => {
    it('should call Angular\'s Location.back() on dispatch' +
      'of RouterActions.BACK', () => {
      const payload = [{payload: 'something'}];

      locationMock.back.and.returnValue(of(payload));

      const action = BACK;
      actions$ = hot('-a', {a: action});
      effects.navigateBack$.subscribe(() => {
        expect(locationMock.back).toHaveBeenCalled();
      });
    });
  });

  describe('navigateForward$', () => {
    it('should call Angular\'s Location.forward() on dispatch' +
      'of RouterActions.FORWARD', () => {
      const payload = [{payload: 'something'}];

      locationMock.forward.and.returnValue(of(payload));

      const action = FORWARD;
      actions$ = hot('-a', {a: action});
      effects.navigateForward$.subscribe(() => {
        expect(locationMock.forward).toHaveBeenCalled();
      });
    });
  });
});
