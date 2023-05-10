import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SearchFilterService } from '../../services';
import * as caselistActions from '../actions/case-list.action';
import { LoggerService } from '../../../app/services/logger/logger.service';

@Injectable()
export class CaseListEffects {
  public payload: any;
  constructor(
        private readonly actions$: Actions,
        private readonly searchService: SearchFilterService,
        private readonly loggerService: LoggerService,
  ) {}

    @Effect()
  public applyPageMetadata$ = this.actions$.pipe(
        ofType(caselistActions.FIND_CASELIST_PAGINATION_METADATA),
        map((action: caselistActions.FindCaselistPaginationMetadata) => action.payload),
        switchMap((payload) => {
          this.payload = payload;
          return this.searchService.findPaginationMetadata(payload).pipe(
            map(
              (response) => new caselistActions.FindCaselistPaginationMetadataSuccess(response.json())),
            catchError((error) => {
              this.loggerService.error('Error in CaseListEffects:applyPageMetadata$', error);
              return of(new caselistActions.ApplyCaselistFilterFail(error));
            })
          );
        })
      );

    @Effect()
    public applyCaselistFilters$ = this.actions$.pipe(
        ofType(caselistActions.APPLY_CASELIST_FILTER),
        map((action: caselistActions.ApplyCaselistFilter) => action.payload),
        switchMap((payload) => {
          return this.searchService.search(payload).pipe(
            map((result: Observable<any>) => new caselistActions.ApplyCaselistFilterSuccess(result)),
            catchError((error) => {
              this.loggerService.error('Error in CaseListEffects:applyCaselistFilters$', error);
              return of(new caselistActions.ApplyCaselistFilterFail(error));
            })
          );
        }));

    @Effect()
    public applyCaselistFiltersForES$ = this.actions$.pipe(
        ofType(caselistActions.APPLY_CASELIST_FILTER_FOR_ES),
        map((action: caselistActions.ApplyCaselistFilterForES) => action.payload),
        switchMap((payload) => {
          return this.searchService.search(payload, true).pipe(
            map((result: Observable<any>) => new caselistActions.ApplyCaselistFilterSuccess(result)),
            catchError((error) => {
              this.loggerService.error('Error in CaseListEffects:applyCaselistFiltersForES$', error);
              return of(new caselistActions.ApplyCaselistFilterFail(error));
            })
          );
        }));

    @Effect()
    public applySearchFilterToggle$ = this.actions$.pipe(
        ofType(caselistActions.CASE_FILTER_DISPLAY_TOGGLE),
        map((action: caselistActions.CaseFilterToggle) => new caselistActions.CaseFilterToggleSuccess(action.payload)),
        catchError((error) => {
          this.loggerService.error('Error in CaseListEffects:applySearchFilterToggle$', error);
          return of(new caselistActions.ApplyCaselistFilterFail(error));
        }));
}
