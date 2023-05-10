import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as fromAppStoreActions from '../../../app/store/actions';
import * as hearingActualsActions from '../../../hearings/store/actions/hearing-actuals.action';
import { HttpError } from '../../../models/httpError.model';
import { HearingsService } from '../../services/hearings.service';
import { LoggerService } from '../../../app/services/logger/logger.service';

@Injectable()
export class HearingActualsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly hearingsService: HearingsService,
    private readonly loggerService: LoggerService
  ) {}

  @Effect()
  public getHearingActuals$ = this.actions$.pipe(
      ofType(hearingActualsActions.GET_HEARING_ACTUALS),
      switchMap((action: hearingActualsActions.GetHearingActuals) => this.hearingsService.getHearingActuals(action.payload)
        .pipe(
          map((response) => new hearingActualsActions.GetHearingActualsSuccess(response)),
          catchError((error) => {
            this.loggerService.error('Error in HearingActualsEffects:getHearingActuals$', error);
            return of(new fromAppStoreActions.Go({ path: ['/hearings/error'] }));
          })
        ))
    );

  @Effect()
  public updateHearingActualsStage$ = this.actions$.pipe(
      ofType(hearingActualsActions.UPDATE_HEARING_ACTUALS_STAGE),
      switchMap((action: any) => this.hearingsService.updateHearingActuals(action.payload.hearingId, action.payload.hearingActuals)
        .pipe(
          map(() => new hearingActualsActions.UpdateHearingActualsSuccess(action.payload.hearingActuals)),
          tap(() => this.router.navigate([`/hearings/actuals/${action.payload.hearingId}/hearing-actual-add-edit-summary`])),
          catchError((error) => {
            this.loggerService.error('Error in HearingActualsEffects:updateHearingActualsStage$', error);
            return of(new fromAppStoreActions.Go({ path: ['/hearings/error'] }));
          })
        ))
    );

  @Effect()
  public updateHearingActuals$ = this.actions$.pipe(
      ofType(hearingActualsActions.UPDATE_HEARING_ACTUALS),
      switchMap((action: any) => this.hearingsService.updateHearingActuals(action.payload.hearingId, action.payload.hearingActuals)
        .pipe(
          map(() => new hearingActualsActions.UpdateHearingActualsSuccess(action.payload.hearingActuals)),
          catchError((error) => {
            this.loggerService.error('Error in HearingActualsEffects:updateHearingActuals$', error);
            return of(new fromAppStoreActions.Go({ path: ['/hearings/error'] }));
          })
        ))
    );

  @Effect()
  public submitHearingActuals$ = this.actions$.pipe(
      ofType(hearingActualsActions.SUBMIT_HEARING_ACTUALS),
      switchMap((action: any) => this.hearingsService.submitHearingActuals(action.payload)
        .pipe(
          map(() => new hearingActualsActions.SubmitHearingActualsSuccess(action.payload)),
          tap(() => this.router.navigate([`/hearings/actuals/${action.payload}/hearing-actuals-confirmation`])),
          catchError((error: HttpError) => {
            this.loggerService.error('Error in HearingActualsEffects:submitHearingActuals$', error);
            return of(new hearingActualsActions.SubmitHearingActualsFailure(error));
          })
        ))
    );
}
