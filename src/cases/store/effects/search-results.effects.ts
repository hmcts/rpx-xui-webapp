import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { switchMap } from 'rxjs-compat/operator/switchMap';
import * as fromAction from '../actions';
import {SearchServiceProxyService} from '../../services/search-service-proxy.service';

@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private searchProxyServce: SearchServiceProxyService) {}

  @Effect()
  postRegistrationFormData$ = this.actions$.pipe(
    ofType(fromAction.APPLIED),
    map((action: fromAction.Applied) => action.payload),
    mergeMap((payload) => {
      return this.searchProxyServce.getSearch(payload).pipe(
        map(obj => {
          return new fromAction.SearchSuccess(obj);
        }),
        catchError(error => of(new fromAction.SearchFailure(error)))
      );
    })
  );

}
