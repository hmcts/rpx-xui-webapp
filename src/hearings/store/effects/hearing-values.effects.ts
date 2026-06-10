import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as fromAppStoreActions from '../../../app/store/actions';
import * as hearingValuesActions from '../../../hearings/store/actions/hearing-values.action';
import { HttpError } from '../../../models/httpError.model';
import { HearingValuesCaseContext, ResolvedHearingValuesCaseContext } from '../../models/hearingValuesStateData';
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
        const resolvedCaseInfo = HearingValuesEffects.resolveCaseContext(caseInfo, typedAction.payload);
        if (!HearingValuesEffects.hasRequiredCaseContext(resolvedCaseInfo)) {
          const error: HttpError = {
            status: 400,
            message: 'Missing hearing case context',
          };
          this.hearingStore.dispatch(new hearingValuesActions.LoadHearingValuesFailure(error));
          return HearingValuesEffects.handleError(error, resolvedCaseInfo);
        }
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

  public static resolveCaseContext(
    storedCaseInfo: HearingValuesCaseContext | null,
    payload?: HearingValuesCaseContext
  ): HearingValuesCaseContext {
    return {
      ...storedCaseInfo,
      ...payload,
      jurisdictionId: HearingValuesEffects.resolveTextValue(payload?.jurisdictionId, storedCaseInfo?.jurisdictionId),
      caseReference: HearingValuesEffects.resolveTextValue(payload?.caseReference, storedCaseInfo?.caseReference),
    };
  }

  public static hasRequiredCaseContext(caseInfo: HearingValuesCaseContext | null): caseInfo is ResolvedHearingValuesCaseContext {
    return !!caseInfo?.jurisdictionId?.trim() && !!caseInfo?.caseReference?.trim();
  }

  public static handleError(error: HttpError, caseInfo: HearingValuesCaseContext | null): Observable<Action> {
    if (error && error.status) {
      if (!HearingValuesEffects.hasRequiredCaseContext(caseInfo) || !caseInfo.caseType?.trim()) {
        return of(new fromAppStoreActions.Go({ path: ['/hearings/error'] }));
      }
      return of(
        new fromAppStoreActions.Go({
          path: [`/cases/case-details/${caseInfo.jurisdictionId}/${caseInfo.caseType}/${caseInfo.caseReference}/hearings`],
        })
      );
    }
  }

  private static resolveTextValue(candidate?: string, fallback?: string): string | undefined {
    return candidate?.trim() ? candidate : fallback;
  }
}
