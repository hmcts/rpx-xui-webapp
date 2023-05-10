import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RoleService } from '@hmcts/rpx-xui-common-lib';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { hot } from 'jasmine-marbles';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { AppConfigService } from '../../services/config/configuration.services';
import { Logout } from '../actions';
import * as fromAppEffects from './app.effects';
import { LoggerService } from '../../services/logger/logger.service';
import * as fromActions from '../actions';
import { TermsConditionsService } from '../../services/terms-and-conditions/terms-and-conditions.service';
import { UserService } from '../../services/user/user.service';

describe('App Effects', () => {
  let actions$;
  let effects: fromAppEffects.AppEffects;
  const AuthServiceMock = jasmine.createSpyObj('AuthService', [
    'signOut'
  ]);
  const configurationServicesMock = jasmine.createSpyObj('configurationServices', ['load']);
  const termsServiceMock = jasmine.createSpyObj('termsService', ['getTermsConditions', 'isTermsConditionsFeatureEnabled']);
  const userServiceMock = jasmine.createSpyObj('userService', ['getUserDetails']);
  const loggerServiceMock = jasmine.createSpyObj('loggerService', ['error']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        HttpClientTestingModule
      ],
      providers: [
        AppConfigService,
        {
          provide: AuthService,
          useValue: AuthServiceMock
        },
        {
          provide: TermsConditionsService,
          useValue: termsServiceMock
        },
        {
          provide: UserService,
          useValue: userServiceMock
        },
        {
          provide: LoggerService,
          useValue: loggerServiceMock
        },
        {
          provide: AppConfigService,
          useValue: configurationServicesMock
        },
        RoleService,
        fromAppEffects.AppEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(fromAppEffects.AppEffects);
  });

  describe('logout$', () => {
    it('should logout', () => {
      const payload = [{ payload: 'something' }];
      AuthServiceMock.signOut.and.returnValue(of(payload));
      const action = new Logout();
      actions$ = hot('-a', { a: action });
      effects.logout.subscribe(() => {
        expect(AuthServiceMock.signOut).toHaveBeenCalled();
      });
    });
  });

  describe('config', () => {
    it('should catch any errors', async () => {
      configurationServicesMock.load.and.returnValue(throwError('Error'));

      actions$ = of({ type: fromActions.APP_LOAD_CONFIG });

      await effects.config.toPromise()
        .catch((error) => {
          expect(loggerServiceMock.error).toHaveBeenCalledWith('Error in AppEffects:config', error);
        });
    });
  });

  describe('featureToggleConfig', () => {
    it('should catch any errors', async () => {
      termsServiceMock.isTermsConditionsFeatureEnabled.and.returnValue(throwError('Error'));

      actions$ = of({ type: fromActions.LOAD_FEATURE_TOGGLE_CONFIG });

      await effects.featureToggleConfig.toPromise()
        .catch((error) => {
          expect(loggerServiceMock.error).toHaveBeenCalledWith('Error in AppEffects:featureToggleConfig', error);
        });
    });
  });

  describe('loadTermsConditions$', () => {
    it('should catch any errors', async () => {
      termsServiceMock.getTermsConditions.and.returnValue(throwError('Error'));

      actions$ = of({ type: fromActions.LOAD_TERMS_CONDITIONS });

      await effects.featureToggleConfig.toPromise()
        .catch((error) => {
          expect(loggerServiceMock.error).toHaveBeenCalledWith('Error in AppEffects:loadTermsConditions$', error);
        });
    });
  });

  describe('loadUserDetails$', () => {
    it('should catch any errors', async () => {
      userServiceMock.getUserDetails.and.returnValue(throwError('Error'));

      actions$ = of({ type: fromActions.LOAD_USER_DETAILS });

      await effects.featureToggleConfig.toPromise()
        .catch((error) => {
          expect(loggerServiceMock.error).toHaveBeenCalledWith('Error in AppEffects:loadUserDetails$', error);
        });
    });
  });
});
