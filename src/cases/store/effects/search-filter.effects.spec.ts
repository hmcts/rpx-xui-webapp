import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { of, throwError } from 'rxjs';
import { mockedSearchFilters } from '../../../cases/mock/search-filter.mock';
import { SearchFilterService } from '../../../cases/services';
import { ApplySearchFilter, ApplySearchFilterFail, ApplySearchFilterForES, ApplySearchFilterSuccess } from '../actions';
import { SearchFilterEffects } from './search-filter.effects';

describe('Pending Organisation Effects', () => {
    let actions$;
    let effects: SearchFilterEffects;
    const searchFilterServiceMock = jasmine.createSpyObj('SearchFilterService', [
        'search'
    ]);

    const payload = mockedSearchFilters;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: SearchFilterService,
                    useValue: searchFilterServiceMock,
                },
                SearchFilterEffects,
                provideMockActions(() => actions$)
            ]
        });

        effects = TestBed.get(SearchFilterEffects);

    });

    describe('applySearchFilters$', () => {
        it('should return a collection', () => {

            searchFilterServiceMock.search.and.returnValue(of(payload));
            const action = new ApplySearchFilter({});
            const completion = new ApplySearchFilterSuccess(payload);
            actions$ = hot('-a', { a: action });
            const expected = cold('-b', { b: completion });
            expect(effects.applySearchFilters$).toBeObservable(expected);
        });
    });

    describe('applySearchFilters$ error', () => {
        it('should return a ApplySearchFilterFail', () => {

            searchFilterServiceMock.search.and.returnValue(throwError(new Error()));
            const action = new ApplySearchFilter({});
            const completion = new ApplySearchFilterFail(new Error());
            actions$ = hot('-a', { a: action });
            const expected = cold('-b', { b: completion });
            expect(effects.applySearchFilters$).toBeObservable(expected);
        });
    });

    describe('applySearchFiltersForES$', () => {
        it('should return a collection', () => {

            searchFilterServiceMock.search.and.returnValue(of(payload));
            const action = new ApplySearchFilterForES({});
            const completion = new ApplySearchFilterSuccess(payload);
            actions$ = hot('-a', { a: action });
            const expected = cold('-b', { b: completion });
            expect(effects.applySearchFiltersForES$).toBeObservable(expected);
        });
    });

    describe('applySearchFilterForES$ error', () => {
        it('should return a ApplySearchFilterFail', () => {

            searchFilterServiceMock.search.and.returnValue(throwError(new Error()));
            const action = new ApplySearchFilterForES({});
            const completion = new ApplySearchFilterFail(new Error());
            actions$ = hot('-a', { a: action });
            const expected = cold('-b', { b: completion });
            expect(effects.applySearchFiltersForES$).toBeObservable(expected);
        });
    });

});
