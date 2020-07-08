import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { hot } from 'jasmine-marbles';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { AppConfigService } from '../../services/config/configuration.services';
import { LoadConfigSuccess, LoadUserDetails, Logout } from '../actions';
import * as fromAppEffects from './app.effects';



describe('App Effects', () => {
    let actions$;
    let effects: fromAppEffects.AppEffects;
    const authServiceMock = jasmine.createSpyObj('AuthService', [
        'signOut', 'logOutAndRedirect'
    ]);

    const appConfigServiceMock = jasmine.createSpyObj('AppConfigService', ['setConfiguration']);

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
                    useValue: authServiceMock
                },
                fromAppEffects.AppEffects,
                provideMockActions(() => actions$)
            ]
        });

        effects = TestBed.get(fromAppEffects.AppEffects);

    });


    describe('logout$', () => {
        it('should logout', () => {
            const payload = [{ payload: 'something' }];
            authServiceMock.signOut.and.returnValue(of(payload));
            const action = new Logout();
            actions$ = hot('-a', { a: action });
            effects.logout.subscribe(() => {
                expect(authServiceMock.signOut).toHaveBeenCalled();
            });
        });
    });

    describe('logoutRedirect$', () => {
        it('should logout', () => {
            const action = new LoadUserDetails();
            actions$ = hot('-a', { a: action });
            effects.logout.subscribe(() => {
                expect(authServiceMock.logOutAndRedirect).toHaveBeenCalled();
            });
        });
    });

    describe('LoadConfigSuccess$', () => {
        it('should LoadConfigSuccess', () => {
            const action = new LoadConfigSuccess({});
            actions$ = hot('-a', { a: action });
            effects.logout.subscribe(() => {
                expect(appConfigServiceMock.setConfiguration).toHaveBeenCalled();
            });
        });
    });

});
