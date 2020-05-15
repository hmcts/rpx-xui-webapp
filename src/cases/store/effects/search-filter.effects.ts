import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { FIND_SEARCH_PAGINATION_METADATA, FindSearchPaginationMetadata, FindSearchPaginationMetadataSuccess, ApplySearchFilterFail, APPLY_SEARCH_FILTER, ApplySearchFilter, ApplySearchFilterSuccess, SEARCH_FILTER_DISPLAY_TOGGLE, SearchFilterToggleSuccess, SearchFilterToggle } from '../actions/case-search.action';
import { SearchFilterService } from '../../../cases/services';

@Injectable()
export class SearchFilterEffects {
    payload: any;
    constructor(
        private actions$: Actions,
        private searchService: SearchFilterService,
    ) { }

    @Effect()
    applyPageMetadata$ = this.actions$.pipe(
        ofType(FIND_SEARCH_PAGINATION_METADATA),
        map((action: FindSearchPaginationMetadata) => action.payload),
        switchMap(payload => {
            this.payload = payload;
            return this.searchService.findPaginationMetadata(payload).pipe(
              map(
                (response) => new FindSearchPaginationMetadataSuccess(response.json()) ),
                catchError(error => of(new ApplySearchFilterFail(error)))
            );
          })
    );

    @Effect()
    applySearchFilters$ = this.actions$.pipe(
      ofType(APPLY_SEARCH_FILTER),
      map((action: ApplySearchFilter) => action.payload),
      switchMap(payload => {
          return this.searchService.search(payload).pipe(
            map((result: Observable<any>) => new ApplySearchFilterSuccess(result)),
            catchError(error => of(new ApplySearchFilterFail(error)))
          );
      }));

      @Effect()
      applySearchFilterToggle$ = this.actions$.pipe(
        ofType(SEARCH_FILTER_DISPLAY_TOGGLE),
        map((action: SearchFilterToggle) => new SearchFilterToggleSuccess(action.payload)),
            catchError(error => of(new ApplySearchFilterFail(error))));

}
