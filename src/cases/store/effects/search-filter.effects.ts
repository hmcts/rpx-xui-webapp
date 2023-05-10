import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SearchFilterService } from '../../services';
import * as caseSearchActions from '../actions/case-search.action';
import { LoggerService } from '../../../app/services/logger/logger.service';

@Injectable()
export class SearchFilterEffects {
  public payload: any;
  constructor(
        private readonly actions$: Actions,
        private readonly searchService: SearchFilterService,
        private readonly loggerService: LoggerService,
  ) {}

    @Effect()
  public applyPageMetadata$ = this.actions$.pipe(
        ofType(caseSearchActions.FIND_SEARCH_PAGINATION_METADATA),
        map((action: caseSearchActions.FindSearchPaginationMetadata) => action.payload),
        switchMap((payload) => {
          this.payload = payload;
          return this.searchService.findPaginationMetadata(payload).pipe(
            map(
              (response) => new caseSearchActions.FindSearchPaginationMetadataSuccess(response.json())),
            catchError((error) => {
              this.loggerService.error('Error in SearchFilterEffects:applyPageMetadata$', error);
              return of(new caseSearchActions.ApplySearchFilterFail(error));
            })
          );
        })
      );

    @Effect()
    public applySearchFilters$ = this.actions$.pipe(
        ofType(caseSearchActions.APPLY_SEARCH_FILTER),
        map((action: caseSearchActions.ApplySearchFilter) => action.payload),
        switchMap((payload) => {
          return this.searchService.search(payload).pipe(
            map((result: Observable<any>) => new caseSearchActions.ApplySearchFilterSuccess(result)),
            catchError((error) => {
              this.loggerService.error('Error in SearchFilterEffects:applySearchFilters$', error);
              return of(new caseSearchActions.ApplySearchFilterFail(error));
            })
          );
        }));

    @Effect()
    public applySearchFiltersForES$ = this.actions$.pipe(
        ofType(caseSearchActions.APPLY_SEARCH_FILTER_FOR_ES),
        map((action: caseSearchActions.ApplySearchFilterForES) => action.payload),
        switchMap((payload) => {
          return this.searchService.search(payload, true).pipe(
            map((result: Observable<any>) => new caseSearchActions.ApplySearchFilterSuccess(result)),
            catchError((error) => {
              this.loggerService.error('Error in SearchFilterEffects:applySearchFiltersForES$', error);
              return of(new caseSearchActions.ApplySearchFilterFail(error));
            })
          );
        }));

    @Effect()
    public applySearchFilterToggle$ = this.actions$.pipe(
        ofType(caseSearchActions.SEARCH_FILTER_DISPLAY_TOGGLE),
        map((action: caseSearchActions.SearchFilterToggle) => new caseSearchActions.SearchFilterToggleSuccess(action.payload)),
        catchError((error) => {
          this.loggerService.error('Error in SearchFilterEffects:applySearchFilterToggle$', error);
          return of(new caseSearchActions.ApplySearchFilterFail(error));
        }));
}
