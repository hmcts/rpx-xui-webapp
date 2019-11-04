import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { AppConfigService } from '../../services/config/configuration.services';
import { BACK, FORWARD } from '../actions/router.action';
import * as fromRouterEffects from './router.effect';

describe('Router Effects', () => {
  let actions$: Observable<Actions>;
  let effects: fromRouterEffects.RouterEffects;

  const locationMock = jasmine.createSpyObj('Location', [
    'back', 'forward',
  ]);

  const genericMock = jasmine.createSpy();

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
