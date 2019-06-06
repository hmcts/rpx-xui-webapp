import { APPLIED } from './../actions/case-search.action';
import { SearchService, SearchResultView } from '@hmcts/ccd-case-ui-toolkit';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromActions from '../actions';
import { switchMap } from 'rxjs-compat/operator/switchMap';

@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private searchService: SearchService) {}


  @Effect()
  searchCaseResults$ = this.actions$.pipe(
    ofType(fromActions.APPLIED),
    map((action: fromActions.Applied) => action.payload),
    switchMap(getSearchResults));

  private getSearchResults(payload: any) {
    return this.searchService.search(payload.jurisdiction.id, payload.caseType.id, {}, {}, null);
    map(returnedItems => {
          return new fromActions.SearchSuccess(payload)
          }),
    catchError(error => of(new fromActions.SearchFailure(error)))
  }
    })
  );

}
