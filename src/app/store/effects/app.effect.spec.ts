import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { hot, cold } from 'jasmine-marbles';
import { of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import * as fromAppEffects from './app.effects';
import { AppEffects } from './app.effects';
//import { Logoutl } from '../actions/app.actions';
import { Logout } from '../actions';
import { AuthService } from '../../services/auth/auth.service';



xdescribe('Organisation Effects', () => {
    let actions$;
    let effects: AppEffects;
    const AuthServiceMock = jasmine.createSpyObj('AuthService', [
        'signOut',
    ]);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {
                    provide: AuthService,
                    useValue: AuthServiceMock,
                },
                fromAppEffects.AppEffects,
                provideMockActions(() => actions$)
            ]
        });

        effects = TestBed.get(AppEffects);

    });


    describe('logout$', () => {
        it('should logout', () => {
            const payload = [{ payload: 'something' }];
            AuthServiceMock.signOut.and.returnValue(of(payload));
            const action = new Logout()

            actions$ = hot('-a', { a: action });
            //const expected = cold('-b', { b: completion });
            expect(effects.logout$).toHaveBeenCalled();
        });
    });

    

});
