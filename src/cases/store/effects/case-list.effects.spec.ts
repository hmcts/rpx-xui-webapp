import { CaseListEffects } from './case-list.effects';
import { mockedSearchFilters } from '../../../cases/mock/search-filter.mock';
import { TestBed } from '@angular/core/testing';
import { SearchFilterService } from '../../../cases/services';
import { provideMockActions } from '@ngrx/effects/testing';
import * as fromCaseListEffects from './case-list.effects';
import { of, throwError } from 'rxjs';
import { ApplyCaselistFilter, ApplyCaselistFilterSuccess, ApplyCaselistFilterFail, ApplyCaselistFilterForES } from '../actions';
import { hot, cold } from 'jasmine-marbles';

describe('Pending Organisation Effects', () => {
    let actions$;
    let effects: CaseListEffects;
    const SearchFilterServiceMock = jasmine.createSpyObj('SearchFilterService', [
        'search'
    ]);

    const payload = mockedSearchFilters;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: SearchFilterService,
                    useValue: SearchFilterServiceMock,
                },
                fromCaseListEffects.CaseListEffects,
                provideMockActions(() => actions$)
            ]
        });

        effects = TestBed.get(CaseListEffects);

    });

    describe('applyCaselistFilters$', () => {
        it('should return a collection', () => {

            SearchFilterServiceMock.search.and.returnValue(of(payload));
            const action = new ApplyCaselistFilter({});
            const completion = new ApplyCaselistFilterSuccess(payload);
            actions$ = hot('-a', { a: action });
            const expected = cold('-b', { b: completion });
            expect(effects.applyCaselistFilters$).toBeObservable(expected);
        });
    });

    describe('applyCaselistFilters$ error', () => {
        it('should return a ApplyCaselistFilterFail', () => {

            SearchFilterServiceMock.search.and.returnValue(throwError(new Error()));
            const action = new ApplyCaselistFilter({});
            const completion = new ApplyCaselistFilterFail(new Error());
            actions$ = hot('-a', { a: action });
            const expected = cold('-b', { b: completion });
            expect(effects.applyCaselistFilters$).toBeObservable(expected);
        });
    });

    describe('applyCaselistFiltersForES$', () => {
        it('should return a collection', () => {

            SearchFilterServiceMock.search.and.returnValue(of(payload));
            const action = new ApplyCaselistFilterForES({});
            const completion = new ApplyCaselistFilterSuccess(payload);
            actions$ = hot('-a', { a: action });
            const expected = cold('-b', { b: completion });
            expect(effects.applyCaselistFiltersForES$).toBeObservable(expected);
        });
    });

    describe('applyCaselistFilterForES$ error', () => {
        it('should return a ApplyCaselistFilterFail', () => {

            SearchFilterServiceMock.search.and.returnValue(throwError(new Error()));
            const action = new ApplyCaselistFilterForES({});
            const completion = new ApplyCaselistFilterFail(new Error());
            actions$ = hot('-a', { a: action });
            const expected = cold('-b', { b: completion });
            expect(effects.applyCaselistFiltersForES$).toBeObservable(expected);
        });
    });

});
