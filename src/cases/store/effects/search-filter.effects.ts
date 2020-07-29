import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import * as caseSearchActions from '../actions/case-search.action';
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
        ofType(caseSearchActions.FIND_SEARCH_PAGINATION_METADATA),
        map((action: caseSearchActions.FindSearchPaginationMetadata) => action.payload),
        switchMap(payload => {
            this.payload = payload;
            return this.searchService.findPaginationMetadata(payload).pipe(
              map(
                (response) => new caseSearchActions.FindSearchPaginationMetadataSuccess(response.json()) ),
                catchError(error => of(new caseSearchActions.ApplySearchFilterFail(error)))
            );
          })
    );

    @Effect()
    applySearchFilters$ = this.actions$.pipe(
      ofType(caseSearchActions.APPLY_SEARCH_FILTER),
      map((action: caseSearchActions.ApplySearchFilter) => action.payload),
      switchMap(payload => {
          return this.searchService.search(payload).pipe(
            map((result: Observable<any>) => new caseSearchActions.ApplySearchFilterSuccess(result)),
            catchError(error => of(new caseSearchActions.ApplySearchFilterFail(error)))
          );
      }));

    @Effect()
    applySearchFiltersForES$ = this.actions$.pipe(
      ofType(caseSearchActions.APPLY_SEARCH_FILTER_FOR_ES),
      map((action: caseSearchActions.ApplySearchFilterForES) => action.payload),
      switchMap(payload => {
          return this.searchService.search(payload, true).pipe(
            map((result: Observable<any>) => new caseSearchActions.ApplySearchFilterSuccess(result)),
            catchError(error => of(new caseSearchActions.ApplySearchFilterFail(error)))
          );
      }));

    @Effect()
    applySearchFilterToggle$ = this.actions$.pipe(
      ofType(caseSearchActions.SEARCH_FILTER_DISPLAY_TOGGLE),
      map((action: caseSearchActions.SearchFilterToggle) => new caseSearchActions.SearchFilterToggleSuccess(action.payload)),
          catchError(error => of(new caseSearchActions.ApplySearchFilterFail(error))));

}
