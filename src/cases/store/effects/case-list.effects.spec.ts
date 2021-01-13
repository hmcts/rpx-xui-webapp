import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { of, throwError } from 'rxjs';
import { mockedSearchFilters } from '../../../cases/mock/search-filter.mock';
import { SearchFilterService } from '../../../cases/services';
import { ApplyCaselistFilter, ApplyCaselistFilterFail, ApplyCaselistFilterForES, ApplyCaselistFilterSuccess } from '../actions';
import { CaseListEffects } from './case-list.effects';

describe('Pending Organisation Effects', () => {
    let actions$;
    let effects: CaseListEffects;
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
                CaseListEffects,
                provideMockActions(() => actions$)
            ]
        });

        effects = TestBed.get(CaseListEffects);
    });

    describe('applyCaselistFilters$', () => {
        it('should return a collection', () => {

            searchFilterServiceMock.search.and.returnValue(of(payload));
            const action = new ApplyCaselistFilter({});
            const completion = new ApplyCaselistFilterSuccess(payload);
            actions$ = hot('-a', { a: action });
            const expected = cold('-b', { b: completion });
            expect(effects.applyCaselistFilters$).toBeObservable(expected);
        });
    });

    describe('applyCaselistFilters$ error', () => {
        it('should return a ApplyCaselistFilterFail', () => {

            searchFilterServiceMock.search.and.returnValue(throwError(new Error()));
            const action = new ApplyCaselistFilter({});
            const completion = new ApplyCaselistFilterFail(new Error());
            actions$ = hot('-a', { a: action });
            const expected = cold('-b', { b: completion });
            expect(effects.applyCaselistFilters$).toBeObservable(expected);
        });
    });

    describe('applyCaselistFiltersForES$', () => {
        it('should return a collection', () => {

            searchFilterServiceMock.search.and.returnValue(of(payload));
            const action = new ApplyCaselistFilterForES({});
            const completion = new ApplyCaselistFilterSuccess(payload);
            actions$ = hot('-a', { a: action });
            const expected = cold('-b', { b: completion });
            expect(effects.applyCaselistFiltersForES$).toBeObservable(expected);
        });
    });

    describe('applyCaselistFilterForES$ error', () => {
        it('should return a ApplyCaselistFilterFail', () => {

            searchFilterServiceMock.search.and.returnValue(throwError(new Error()));
            const action = new ApplyCaselistFilterForES({});
            const completion = new ApplyCaselistFilterFail(new Error());
            actions$ = hot('-a', { a: action });
            const expected = cold('-b', { b: completion });
            expect(effects.applyCaselistFiltersForES$).toBeObservable(expected);
        });
    });

});
