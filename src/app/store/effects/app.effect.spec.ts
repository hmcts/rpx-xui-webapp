import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { hot, cold } from 'jasmine-marbles';
import { of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import * as fromAppEffects from './app.effects';
import { AppEffects } from './app.effects';
import { Logout } from '../actions';
import { AuthService } from '../../services/auth/auth.service';
import { StoreModule } from '@ngrx/store';
import { AppConfigService } from '../../services/config/configuration.services';



describe('App Effects', () => {
    let actions$;
    let effects: AppEffects;
    const AuthServiceMock = jasmine.createSpyObj('AuthService', [
        'signOut',
    ]);

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
                fromAppEffects.AppEffects,
                provideMockActions(() => actions$)
            ]
        });

        effects = TestBed.inject(AppEffects);

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



});
