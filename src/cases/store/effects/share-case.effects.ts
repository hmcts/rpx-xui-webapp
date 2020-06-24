import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CaseShareService } from '../../../app/services/case/share-case.service';
import { LoadShareCase } from '../actions';
import * as shareCaseActions from '../actions/share-case.action';
import * as fromActions from '../actions';
import * as fromRoot from '../../../app/store';

@Injectable()
export class ShareCaseEffects {

  constructor(
    private actions$: Actions,
    private caseShareService: CaseShareService
  ) {
  }

  @Effect()
  public loadShareCases$ = this.actions$.pipe(
      ofType<LoadShareCase>(shareCaseActions.LOAD_SHARE_CASES),
      switchMap(
        () => this.caseShareService.getShareCases().pipe(
            map(response =>  new shareCaseActions.LoadShareCaseSuccess(response)),
            catchError(error => of(new shareCaseActions.LoadShareCaseFailure(error)))
          )
      ),
    );

/*  @Effect()
  public addShareCases$ = this.actions$.pipe(
    ofType(shareCaseActions.ADD_SHARE_CASES),
    map((action: shareCaseActions.AddShareCases) => action.payload),
    map(newCases => {
      return new shareCaseActions.AddShareCases({
        path: [`/cases/case-share`],
        sharedCases: newCases.sharedCases
      });
    })
  );*/

  @Effect()
  public addShareCases$ = this.actions$.pipe(
    ofType(shareCaseActions.ADD_SHARE_CASES),
    map(() => {
      return new shareCaseActions.AddShareCases({
        path: [`/cases/case-share`]
      });
    })
  );
}
