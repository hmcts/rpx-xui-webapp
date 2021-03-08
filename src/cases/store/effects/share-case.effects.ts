import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { CaseShareService } from '../../../app/services/case/share-case.service';
import * as fromRoot from '../../../app/store/index';
import * as shareCaseActions from '../actions/share-case.action';
import * as shareCases from '../reducers/share-case.reducer';

@Injectable()
export class ShareCaseEffects {

  public payload: any;

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
      queryParams = { init: true };
      return this.router.navigate(path, { queryParams, ...extras }).then(() => {
        this.store.dispatch(new shareCaseActions.NavigateToShareCase(thatSharedCases));
      });
    })
  );

  @Effect()
  public loadShareCases$ = this.actions$.pipe(
    ofType(shareCaseActions.LOAD_SHARE_CASES),
    map((action: shareCaseActions.LoadShareCase) => action.payload),
    switchMap(payload => {
      this.payload = payload;
      return this.caseShareService.getShareCases(payload).pipe(
        map(
          (response) => new shareCaseActions.LoadShareCaseSuccess(response)),
        catchError(() => of(new fromRoot.Go({ path: ['/service-down']})))
      );
    })
  );

  @Effect() public loadOrgUsers$ = this.actions$.pipe(
    ofType(shareCaseActions.LOAD_USERS_FROM_ORG_FOR_CASE),
    switchMap(() => {
      return this.caseShareService.getUsersFromOrg().pipe(
        map(
          (response) => new shareCaseActions.LoadUserFromOrgForCaseSuccess(response)),
        catchError(() => of(new fromRoot.Go({ path: ['/service-down']})))
      );
    })
  );

  @Effect()
  public assignUsersWithCases$ = this.actions$.pipe(
    ofType(shareCaseActions.ASSIGN_USERS_TO_CASE),
    map((action: shareCaseActions.AssignUsersToCase) => action.payload),
    switchMap(payload => {
      this.payload = payload;
      return this.caseShareService.assignUsersWithCases(payload).pipe(
        map(
          (response) => new shareCaseActions.AssignUsersToCaseSuccess(response)),
        catchError(() => of(new fromRoot.Go({ path: ['/service-down']})))
      );
    })
  );

}
