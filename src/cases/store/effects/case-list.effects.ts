import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import * as caselistActions from '../actions/case-list.action';
import { SearchFilterService } from '../../../cases/services';

@Injectable()
export class CaseListEffects {
    payload: any;
    constructor(
        private actions$: Actions,
        private searchService: SearchFilterService,
    ) { }

    @Effect()
    applyPageMetadata$ = this.actions$.pipe(
        ofType(caselistActions.FIND_CASELIST_PAGINATION_METADATA),
        map((action: caselistActions.FindCaselistPaginationMetadata) => action.payload),
        switchMap(payload => {
            this.payload = payload;
            return this.searchService.findPaginationMetadata(payload).pipe(
              map(
                (response) => new caselistActions.FindCaselistPaginationMetadataSuccess(response.json()) ),
                catchError(error => of(new caselistActions.ApplyCaselistFilterFail(error)))
            );
          })
    );

    @Effect()
    applyCaselistFilters$ = this.actions$.pipe(
      ofType(caselistActions.APPLY_CASELIST_FILTER),
      map((action: caselistActions.ApplyCaselistFilter) => action.payload),
      switchMap(payload => {
          return this.searchService.search(payload).pipe(
            map((result: Observable<any>) => new caselistActions.ApplyCaselistFilterSuccess(result)),
            catchError(error => of(new caselistActions.ApplyCaselistFilterFail(error)))
          );
      }));

    @Effect()
    applyCaselistFiltersForES$ = this.actions$.pipe(
      ofType(caselistActions.APPLY_CASELIST_FILTER_FOR_ES),
      map((action: caselistActions.ApplyCaselistFilterForES) => action.payload),
      switchMap(payload => {
          return this.searchService.search(payload, true).pipe(
            map((result: Observable<any>) => new caselistActions.ApplyCaselistFilterSuccess(result)),
            catchError(error => of(new caselistActions.ApplyCaselistFilterFail(error)))
          );
      }));

    @Effect()
    applySearchFilterToggle$ = this.actions$.pipe(
      ofType(caselistActions.CASE_FILTER_DISPLAY_TOGGLE),
      map((action: caselistActions.CaseFilterToggle) => new caselistActions.CaseFilterToggleSuccess(action.payload)),
          catchError(error => of(new caselistActions.ApplyCaselistFilterFail(error))));
}
