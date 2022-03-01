import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as fromAppStoreActions from '../../../app/store/actions';
import * as hearingActualsActions from '../../../hearings/store/actions/hearing-actuals.action';
import { HttpError } from '../../../models/httpError.model';
import { HearingsService } from '../../services/hearings.service';

@Injectable()
export class HearingActualsEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly hearingsService: HearingsService,
    private readonly router: Router
  ) {
  }

  @Effect()
  public getHearingActuals$ = this.actions$.pipe(
    ofType(hearingActualsActions.GET_HEARING_ACTUALS),
    switchMap((action: hearingActualsActions.GetHearingActuals) => this.hearingsService.getHearingActuals(action.payload)
      .pipe(
        map((response) => new hearingActualsActions.GetHearingActualsSuccess(response)),
        catchError(error => HearingActualsEffects.handleError(error))
      ))
  );

  @Effect({dispatch: false})
  public updateHearingActuals$ = this.actions$.pipe(
    ofType(hearingActualsActions.UPDATE_HEARING_ACTUALS),
    switchMap((action: hearingActualsActions.UpdateHearingActuals) => {
      return this.hearingsService.updateHearingActuals(action.hearingId, action.payload.hearingActuals).pipe(
        tap(
          () => {
            return this.router.navigate(['hearings', 'actuals', 'hearing-actual-add-edit-summary']);
          }),
        catchError(error => {
          return HearingActualsEffects.handleError(error);
        })
      );
    })
  );

  public static handleError(error: HttpError): Observable<Action> {
    if (error && error.status && error.status >= 400) {
      return of(new fromAppStoreActions.Go({ path: ['/service-down'] }));
    }
  }
}
