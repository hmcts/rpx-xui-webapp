import { SearchFilterEffects } from './search-filter.effects';
import { mockedSearchFilters } from '../../../cases/mock/search-filter.mock';
import { TestBed } from '@angular/core/testing';
import { SearchFilterService } from '../../../cases/services';
import { provideMockActions } from '@ngrx/effects/testing';
import * as fromSearchFilterEffects from './search-filter.effects';
import { of, throwError } from 'rxjs';
import { ApplySearchFilter, ApplySearchFilterSuccess, ApplySearchFilterFail, ApplySearchFilterForES } from '../actions';
import { hot, cold } from 'jasmine-marbles';

describe('Pending Organisation Effects', () => {
    let actions$;
    let effects: SearchFilterEffects;
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
                fromSearchFilterEffects.SearchFilterEffects,
                provideMockActions(() => actions$)
            ]
        });

        effects = TestBed.get(SearchFilterEffects);

    });

    describe('applySearchFilters$', () => {
        it('should return a collection', () => {

            SearchFilterServiceMock.search.and.returnValue(of(payload));
            const action = new ApplySearchFilter({});
            const completion = new ApplySearchFilterSuccess(payload);
            actions$ = hot('-a', { a: action });
            const expected = cold('-b', { b: completion });
            expect(effects.applySearchFilters$).toBeObservable(expected);
        });
    });

    describe('applySearchFilters$ error', () => {
        it('should return a ApplySearchFilterFail', () => {

            SearchFilterServiceMock.search.and.returnValue(throwError(new Error()));
            const action = new ApplySearchFilter({});
            const completion = new ApplySearchFilterFail(new Error());
            actions$ = hot('-a', { a: action });
            const expected = cold('-b', { b: completion });
            expect(effects.applySearchFilters$).toBeObservable(expected);
        });
    });

    describe('applySearchFiltersForES$', () => {
        it('should return a collection', () => {

            SearchFilterServiceMock.search.and.returnValue(of(payload));
            const action = new ApplySearchFilterForES({});
            const completion = new ApplySearchFilterSuccess(payload);
            actions$ = hot('-a', { a: action });
            const expected = cold('-b', { b: completion });
            expect(effects.applySearchFiltersForES$).toBeObservable(expected);
        });
    });

    describe('applySearchFilterForES$ error', () => {
        it('should return a ApplySearchFilterFail', () => {

            SearchFilterServiceMock.search.and.returnValue(throwError(new Error()));
            const action = new ApplySearchFilterForES({});
            const completion = new ApplySearchFilterFail(new Error());
            actions$ = hot('-a', { a: action });
            const expected = cold('-b', { b: completion });
            expect(effects.applySearchFiltersForES$).toBeObservable(expected);
        });
    });

});
