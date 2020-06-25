import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import {Effect, Actions, ofType} from '@ngrx/effects';
import * as RouterActions from '../actions/router.action';

import { tap, map } from 'rxjs/operators';
import * as fromCases from '../../../cases/store/index';
import { Store } from '@ngrx/store';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
    private store: Store<fromCases.State>
  ) {}

  @Effect({ dispatch: false })
  navigate$ = this.actions$.pipe(
    ofType(RouterActions.GO),
    map((action: RouterActions.Go) => action.payload),
    tap(({ path, query: queryParams, extras, callback, errorHandler }) => {
      return this.router.navigate(path, { queryParams, ...extras })
        .then(() => callback ? callback() : false)
        .catch(error => errorHandler ? errorHandler(error) : false);
    })
  );

  @Effect({ dispatch: false })
  navigateNewCase$ = this.actions$.pipe(
    ofType(RouterActions.CREATE_CASE_GO),
    map((action: RouterActions.CreateCaseGo) => action.payload),
    tap(({ path, query: queryParams, extras, caseId }) => {
      const thatCaseId = caseId;
      return this.router.navigate(path, { queryParams, ...extras }).then(() => {
        this.store.dispatch(new fromCases.CreateCaseLoaded(thatCaseId));
      });
    })
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$.pipe(
    ofType(RouterActions.BACK),
    tap(() => this.location.back())
  );


  @Effect({ dispatch: false })
  navigateForward$ = this.actions$.pipe(
    ofType(RouterActions.FORWARD),
    tap(() => this.location.forward())
  );

}
