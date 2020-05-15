import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { FIND_CASELIST_PAGINATION_METADATA, FindCaselistPaginationMetadata, FindCaselistPaginationMetadataSuccess, ApplyCaselistFilterFail,
  APPLY_CASELIST_FILTER, ApplyCaselistFilter, ApplyCaselistFilterSuccess, CASE_FILTER_DISPLAY_TOGGLE, CaseFilterToggle,
  CaseFilterToggleSuccess } from '../actions/case-list.action';
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
        ofType(FIND_CASELIST_PAGINATION_METADATA),
        map((action: FindCaselistPaginationMetadata) => action.payload),
        switchMap(payload => {
            this.payload = payload;
            return this.searchService.findPaginationMetadata(payload).pipe(
              map(
                (response) => new FindCaselistPaginationMetadataSuccess(response.json()) ),
                catchError(error => of(new ApplyCaselistFilterFail(error)))
            );
          })
    );

    @Effect()
    applyCaselistFilters$ = this.actions$.pipe(
      ofType(APPLY_CASELIST_FILTER),
      map((action: ApplyCaselistFilter) => action.payload),
      switchMap(payload => {
          return this.searchService.search(payload).pipe(
            map((result: Observable<any>) => new ApplyCaselistFilterSuccess(result)),
            catchError(error => of(new ApplyCaselistFilterFail(error)))
          );
      }));

      @Effect()
      applySearchFilterToggle$ = this.actions$.pipe(
        ofType(CASE_FILTER_DISPLAY_TOGGLE),
        map((action: CaseFilterToggle) => new CaseFilterToggleSuccess(action.payload)),
            catchError(error => of(new ApplyCaselistFilterFail(error))));
}
