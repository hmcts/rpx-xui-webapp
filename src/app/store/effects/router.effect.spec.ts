import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { hot, cold } from 'jasmine-marbles';
import { of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import * as fromRouterEffects from './router.effect';
import { RouterEffects } from './router.effect';
import { BACK } from '../actions/router.action';
import { Location } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { AppConfigService } from '../../services/config/configuration.services';

describe('Router Effects', () => {
    let actions$;
    let effects: RouterEffects;

    const LocationMock = jasmine.createSpyObj('Location', [
        'back',
    ]);

    const GenericMock = jasmine.createSpy();

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

        effects = TestBed.get(RouterEffects);
    });

    describe('navigateBack$', () => {
        it('should navigate back', () => {
            const payload = [{ payload: 'something' }];

            // spy on the LocationMock
            LocationMock.back.and.returnValue(of(payload));

            const action = BACK;
            actions$ = hot('-a', { a: action });
            effects.navigateBack$.subscribe(() => {
                expect(LocationMock.back).toHaveBeenCalled();
            });
        });
    });
});
