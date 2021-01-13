import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { hot } from 'jasmine-marbles';
import { of } from 'rxjs';
import { AcceptTermsService } from '../../../../src/app/services/acceptTerms/acceptTerms.service';
import * as acceptTandCActions from '../actions';
import * as fromTcEffects from './acceptTC.effects';

describe('acceptTC Effects', () => {
    let actions$;
    let effects: fromTcEffects.AcceptTcEffects;
    const acceptTermsServiceMock = jasmine.createSpyObj('AcceptTermsService', [
        'getIsUserAccepted', 'postUserAccepted'
    ]);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}),
                HttpClientTestingModule
            ],
            providers: [
                {
                    provide: AcceptTermsService,
                    useValue: acceptTermsServiceMock
                },
                fromTcEffects.AcceptTcEffects,
                provideMockActions(() => actions$)
            ]
        });

        effects = TestBed.get(fromTcEffects.AcceptTcEffects);

    });

    it('should accept TC', () => {
        const payload = [{ payload: 'userId' }];
        acceptTermsServiceMock.getIsUserAccepted.and.returnValue(of(payload));
        const action = new acceptTandCActions.LoadHasAcceptedTCSuccess(true);
        actions$ = hot('-a', { a: action });
        effects.loadHasAccepted$.subscribe(() => {
            expect(acceptTermsServiceMock.getIsUserAccepted).toHaveBeenCalled();
        });
    });

    it('should accept TC', () => {
        const payload = [{ payload: 'userId' }];
        acceptTermsServiceMock.postUserAccepted.and.returnValue(of(payload));
        const action = new acceptTandCActions.AcceptTandCSuccess(true);
        actions$ = hot('-a', { a: action });
        effects.loadHasAccepted$.subscribe(() => {
            expect(acceptTermsServiceMock.postUserAccepted).toHaveBeenCalled();
        });
    });
});
