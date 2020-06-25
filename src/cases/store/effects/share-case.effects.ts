import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { CaseShareService } from '../../../app/services/case/share-case.service';
import * as shareCaseActions from '../actions/share-case.action';
import * as shareCases from '../reducers/share-case.reducer';
import { of } from 'rxjs';

@Injectable()
export class ShareCaseEffects {
  payload: any;
  constructor(
    private actions$: Actions,
    private caseShareService: CaseShareService,
    private router: Router,
    private store: Store<shareCases.ShareCasesState>
  ) {
  }

  @Effect()
  public addShareCases$ = this.actions$.pipe(
    ofType(shareCaseActions.ADD_SHARE_CASES),
    map((action: shareCaseActions.AddShareCases) => action.payload),
    map(newCases => {
      return new shareCaseActions.AddShareCaseGo({
        path: [`/cases/case-share`],
        sharedCases: newCases.sharedCases
      });
    })
  );

  @Effect({ dispatch: false })
  public navigateToAddShareCase$ = this.actions$.pipe(
    ofType(shareCaseActions.ADD_SHARE_CASE_GO),
    map((action: shareCaseActions.AddShareCaseGo) => action.payload),
    tap(({ path, query: queryParams, extras, sharedCases }) => {
      const thatSharedCases = sharedCases;
      return this.router.navigate(path, { queryParams, ...extras }).then(() => {
        this.store.dispatch(new shareCaseActions.NavigateToShareCase(thatSharedCases));
      });
    })
  );

  @Effect() loadShopping$ = this.actions$.pipe(
    ofType(shareCaseActions.LOAD_SHARE_CASES),
    map((action: shareCaseActions.LoadShareCase) => action.payload),
    switchMap(payload => {
      this.payload = payload;
      return this.caseShareService.getShareCases(payload).pipe(
        map(
          (response) => new shareCaseActions.LoadShareCaseSuccess(response)),
        catchError(error => of(new shareCaseActions.LoadShareCaseFailure(error)))
      );
    })
  );
}
