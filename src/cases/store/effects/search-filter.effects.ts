import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import * as caseSearchActions from '../actions/case-search.action';
import { SearchFilterService } from 'src/cases/services';

@Injectable()
export class SearchFilterEffects {
    constructor(
        private actions$: Actions,
        private searchService: SearchFilterService
    ) { }

    @Effect()
    applySearchFilters$ = this.actions$.pipe(
        ofType(caseSearchActions.APPLY_SEARCH_FILTER),
        map((action: caseSearchActions.ApplySearchFilter) => action.payload),
        switchMap(payload => {
            return this.searchService.search(payload).pipe(
              map((result: Observable<any>) => new caseSearchActions.ApplySearchFilterSuccess(result)),
              catchError(error => of(new caseSearchActions.ApplySearchFilterFail(error)))
            );
          })
    );

}
