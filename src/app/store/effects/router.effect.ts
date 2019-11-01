import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import * as fromCases from '../../../cases/store/index';
import * as RouterActions from '../actions/router.action';

@Injectable()
export class RouterEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly location: Location,
    private readonly store: Store<fromCases.State>
  ) {}

  @Effect({ dispatch: false })
  public navigate$ = this.actions$.pipe(
    ofType(RouterActions.GO),
    map((action: RouterActions.Go) => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  public navigateNewCase$ = this.actions$.pipe(
    ofType(RouterActions.CREATE_CASE_GO),
    map((action: RouterActions.CreateCaseGo) => action.payload),
    tap(({ path, query: queryParams, extras, caseId }) => {
      const thatCaseId = caseId;
      this.router.navigate(path, { queryParams, ...extras }).then(() => {
        this.store.dispatch(new fromCases.CreateCaseLoaded(thatCaseId));
      });
    })
  );

  @Effect({ dispatch: false })
  public navigateBack$ = this.actions$.pipe(
    ofType(RouterActions.BACK),
    tap(() => this.location.back())
  );


  @Effect({ dispatch: false })
  public navigateForward$ = this.actions$.pipe(
    ofType(RouterActions.FORWARD),
    tap(() => this.location.forward())
  );

}
