import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {hot} from 'jasmine-marbles';
import {of} from 'rxjs';
import {provideMockActions} from '@ngrx/effects/testing';
import * as fromRouterEffects from './router.effect';
import {RouterEffects} from './router.effect';
import {BACK, FORWARD} from '../actions/router.action';
import {Location} from '@angular/common';
import {Store, StoreModule} from '@ngrx/store';
import {AppConfigService} from '../../services/config/configuration.services';
import {MockStore} from '@ngrx/store/testing';
import {State} from '../reducers';

describe('Router Effects', () => {
  let actions$;
  let effects: RouterEffects;
  let store: MockStore<State>;

  const LocationMock = jasmine.createSpyObj('Location', [
    'back', 'forward',
  ]);

  const GenericMock = jasmine.createSpy();
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
          useValue: LocationMock
        },
        {
          provide: Router,
          useValue: GenericMock
        },
        fromRouterEffects.RouterEffects,
        provideMockActions(() => actions$)
      ]
    });
    store = TestBed.get(Store);
    spyOnDispatchToStore = spyOn(store, 'dispatch').and.callThrough();

    effects = TestBed.get(RouterEffects);
  });

  describe('navigateBack$', () => {
    it('should call Angular\'s Location.back() on dispatch' +
      'of RouterActions.BACK', () => {
      const payload = [{payload: 'something'}];

      LocationMock.back.and.returnValue(of(payload));

      const action = BACK;
      actions$ = hot('-a', {a: action});
      effects.navigateBack$.subscribe(() => {
        expect(LocationMock.back).toHaveBeenCalled();
      });
    });
  });

  describe('navigateForward$', () => {
    it('should call Angular\'s Location.forward() on dispatch' +
      'of RouterActions.FORWARD', () => {
      const payload = [{payload: 'something'}];

      LocationMock.forward.and.returnValue(of(payload));

      const action = FORWARD;
      actions$ = hot('-a', {a: action});
      effects.navigateForward$.subscribe(() => {
        expect(LocationMock.forward).toHaveBeenCalled();
      });
    });
  });
});
