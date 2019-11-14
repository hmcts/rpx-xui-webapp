import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AcceptTermsService } from '../../../../src/app/services/acceptTerms/acceptTerms.service';
import * as fromTcEffects from './acceptTC.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { of } from 'rxjs';
import * as acceptTandCActions from '../actions';
import { hot } from 'jasmine-marbles';

describe('acceptTC Effects', () => {
    let actions$;
    let effects: fromTcEffects.AcceptTcEffects;
    const AcceptTermsServiceMock = jasmine.createSpyObj('AcceptTermsService', [
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
                    useValue: AcceptTermsServiceMock
                },
                fromTcEffects.AcceptTcEffects,
                provideMockActions(() => actions$)
            ]
        });

        effects = TestBed.get(fromTcEffects.AcceptTcEffects);

    });

    it('should accept TC', () => {
        const payload = [{ payload: 'userId' }];
        AcceptTermsServiceMock.getIsUserAccepted.and.returnValue(of(payload));
        const action = new acceptTandCActions.LoadHasAcceptedTCSuccess(true);
        actions$ = hot('-a', { a: action });
        effects.loadHasAccepted$.subscribe(() => {
            expect(AcceptTermsServiceMock.getIsUserAccepted).toHaveBeenCalled();
        });
    });

    it('should accept TC', () => {
        const payload = [{ payload: 'userId' }];
        AcceptTermsServiceMock.postUserAccepted.and.returnValue(of(payload));
        const action = new acceptTandCActions.AcceptTandCSuccess(true);
        actions$ = hot('-a', { a: action });
        effects.loadHasAccepted$.subscribe(() => {
            expect(AcceptTermsServiceMock.postUserAccepted).toHaveBeenCalled();
        });
    });
});
