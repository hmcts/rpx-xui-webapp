import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as fromAppStoreActions from '../../../app/store/actions';
import * as hearingValuesActions from '../../../hearings/store/actions/hearing-values.action';
import { HttpError } from '../../../models/httpError.model';
import { HearingsService } from '../../services/hearings.service';
import * as fromHearingReducers from '../../store/reducers';

@Injectable()
export class HearingValuesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly hearingStore: Store<fromHearingReducers.State>,
    private readonly hearingsService: HearingsService
  ) {}

  public loadHearingValue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(hearingValuesActions.LOAD_HEARING_VALUES),
      withLatestFrom(this.hearingStore.select(fromHearingReducers.caseInfoSelector)),
      switchMap(([action, caseInfo]) => {
        const typedAction = action as hearingValuesActions.LoadHearingValues;
        // use the hearing case info from store only if not provided in the action payload
        const payload = typedAction.payload;
        const resolvedCaseInfo = {
          ...caseInfo,
          ...payload,
          // ensure that the payload caseReference/jurisdictionId is not incorrectly set to empty value
          jurisdictionId: payload.jurisdictionId?.trim() ? payload.jurisdictionId : caseInfo?.jurisdictionId,
          caseReference: payload.caseReference?.trim() ? payload.caseReference : caseInfo?.caseReference,
        };
        return this.hearingsService.loadHearingValues(resolvedCaseInfo.jurisdictionId, resolvedCaseInfo.caseReference).pipe(
          map((response) => new hearingValuesActions.LoadHearingValuesSuccess(response)),
          catchError((error) => {
            this.hearingStore.dispatch(new hearingValuesActions.LoadHearingValuesFailure(error));
            return HearingValuesEffects.handleError(error, resolvedCaseInfo);
          })
        );
      })
    )
  );

  public static handleError(error: HttpError, caseInfo: any): Observable<Action> {
    if (error && error.status) {
      return of(
        new fromAppStoreActions.Go({
          path: [`/cases/case-details/${caseInfo?.jurisdictionId}/${caseInfo?.caseType}/${caseInfo.caseReference}/hearings`],
        })
      );
    }
  }
}
