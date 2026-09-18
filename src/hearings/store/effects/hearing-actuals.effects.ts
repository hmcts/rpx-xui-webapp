import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import * as fromAppStoreActions from '../../../app/store/actions';
import * as hearingActualsActions from '../../../hearings/store/actions/hearing-actuals.action';
import { HttpError } from '../../../models/httpError.model';
import { HearingActualsStateData } from '../../models/hearingActualsStateData.model';
import { HearingsService } from '../../services/hearings.service';
import { State } from '../reducers';
import { getHearingActuals } from '../selectors';

@Injectable()
export class HearingActualsEffects {
  public getHearingActuals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(hearingActualsActions.GET_HEARING_ACTUALS),
      switchMap((action: hearingActualsActions.GetHearingActuals) =>
        this.hearingsService.getHearingActuals(action.payload.id, action.payload.caseRef).pipe(
          map((response) => new hearingActualsActions.GetHearingActualsSuccess(response)),
          catchError((error) => HearingActualsEffects.handleError(error))
        )
      )
    )
  );

  public updateHearingActualsStage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(hearingActualsActions.UPDATE_HEARING_ACTUALS_STAGE),
      withLatestFrom(this.hearingStore.select(getHearingActuals)),
      switchMap(([action, state]: [hearingActualsActions.UpdateHearingActualsStage, HearingActualsStateData]) => {
        const update$: Observable<unknown> = state.isFinalisedEditMode
          ? of(action.payload.hearingActuals)
          : this.hearingsService.updateHearingActuals(
              action.payload.hearingId,
              action.payload.hearingActuals,
              action.payload.caseId
            );
        return update$.pipe(
          map(() => new hearingActualsActions.UpdateHearingActualsSuccess(action.payload.hearingActuals)),
          tap(() => this.router.navigate([`/hearings/actuals/${action.payload.hearingId}/hearing-actual-add-edit-summary`])),
          catchError((error) => HearingActualsEffects.handleError(error))
        );
      })
    )
  );

  public updateHearingActuals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(hearingActualsActions.UPDATE_HEARING_ACTUALS),
      withLatestFrom(this.hearingStore.select(getHearingActuals)),
      switchMap(([action, state]: [hearingActualsActions.UpdateHearingActuals, HearingActualsStateData]) => {
        const update$: Observable<unknown> = state.isFinalisedEditMode
          ? of(action.payload.hearingActuals)
          : this.hearingsService.updateHearingActuals(
              action.payload.hearingId,
              action.payload.hearingActuals,
              action.payload.caseId
            );
        return update$.pipe(
          map(() => new hearingActualsActions.UpdateHearingActualsSuccess(action.payload.hearingActuals)),
          catchError((error) => HearingActualsEffects.handleError(error))
        );
      })
    )
  );

  public submitHearingActuals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(hearingActualsActions.SUBMIT_HEARING_ACTUALS),
      switchMap((action: hearingActualsActions.SubmitHearingActuals) => {
        const submit$ = () => this.hearingsService.submitHearingActuals(action.payload.id, action.payload.caseRef);
        const request$ = action.payload.hearingActuals
          ? this.hearingsService
              .updateHearingActuals(action.payload.id, action.payload.hearingActuals, action.payload.caseRef)
              .pipe(switchMap(submit$))
          : submit$();
        return request$.pipe(
          map(() => new hearingActualsActions.SubmitHearingActualsSuccess(action.payload.id)),
          tap(() => this.router.navigate([`/hearings/actuals/${action.payload.id}/hearing-actuals-confirmation`])),
          catchError((error: HttpError) => of(new hearingActualsActions.SubmitHearingActualsFailure(error)))
        );
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly hearingsService: HearingsService,
    private readonly hearingStore: Store<State>
  ) {}

  public static handleError(error: HttpError): Observable<Action> {
    if (error) {
      return of(new fromAppStoreActions.Go({ path: ['/hearings/error'] }));
    }
  }
}
