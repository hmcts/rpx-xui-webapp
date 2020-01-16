import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { hot, cold } from 'jasmine-marbles';
import { of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import * as fromAppEffects from './app.effects';
import { AppEffects } from './app.effects';
import {
  GetUserDetails,
  GetUserDetailsFailure,
  GetUserDetailsSuccess,
  Logout,
  SignedOut,
  SignedOutSuccess
} from '../actions';
import { AuthService } from '../../services/auth/auth.service';
import {Store, StoreModule} from '@ngrx/store';
import { AppConfigService } from '../../services/config/configuration.services';
import {LogOutKeepAliveService} from '../../services/keep-alive/keep-alive.services';
import {HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../../services/user-service/user.service';
import {MockStore} from '@ngrx/store/testing';
import {State} from '../reducers';


let spyOnDispatchToStore = jasmine.createSpy();
let store: MockStore<State>;
describe('App Effects', () => {
    let actions$;
    let effects: AppEffects;
    const AuthServiceMock = jasmine.createSpyObj('AuthService', [
        'signOut',
    ]);
    const UserServiceMock = jasmine.createSpyObj('UserService', [
      'getUserDetails',
    ]);

  const LogOutServiceMock = jasmine.createSpyObj('LogOutKeepAliveService', [
    'logOut',
    'heartBeat'
  ]);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}),
                HttpClientTestingModule
            ],
            providers: [
                AppConfigService,
                LogOutKeepAliveService,
                {
                  provide: LogOutKeepAliveService,
                  useValue: LogOutServiceMock
                },
                {
                    provide: AuthService,
                    useValue: AuthServiceMock
                },
                {
                  provide: UserService,
                  useValue: UserServiceMock,
                },
                fromAppEffects.AppEffects,
                provideMockActions(() => actions$)
            ]
        });
        store = TestBed.get(Store);
        spyOnDispatchToStore = spyOn(store, 'dispatch').and.callThrough();
        effects = TestBed.get(AppEffects);

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

    describe('getUser$', () => {
      it('should return a UserInterface - GetUserDetailsSuccess', () => {
        const returnValue = {
          userId: 'something',
          email: 'something',
          orgId: 'something',
          roles: []
        };
        UserServiceMock.getUserDetails.and.returnValue(of(returnValue));
        const action = new GetUserDetails();
        const completion = new GetUserDetailsSuccess(returnValue);
        actions$ = hot('-a', { a: action });
        const expected = cold('-b', { b: completion });
        expect(effects.getUser$).toBeObservable(expected);
      });
    });

    describe('getUser$ error', () => {
      it('should return GetUserDetailsFailure', () => {
        UserServiceMock.getUserDetails.and.returnValue(throwError(new HttpErrorResponse({})));
        const action = new GetUserDetails();
        const completion = new GetUserDetailsFailure(new HttpErrorResponse({}));
        actions$ = hot('-a', { a: action });
        const expected = cold('-b', { b: completion });
        expect(effects.getUser$).toBeObservable(expected);
      });
    });

    describe('sigout', () => {
      it('should return a sign out sucess', () => {
        LogOutServiceMock.logOut.and.returnValue(of('something'));
        const action = new SignedOut();
        const completion = new SignedOutSuccess();
        actions$ = hot('-a', { a: action });
        const expected = cold('-b', { b: completion });
        expect(effects.sigout$).toBeObservable(expected);
      });
    });


});
