import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SessionStorageService } from '../../../app/services';
import * as fromAppStoreActions from '../../../app/store/actions';
import * as hearingValuesActions from '../../../hearings/store/actions/hearing-values.action';
import { HearingsService } from '../../services/hearings.service';
import * as fromHearingReducers from '../../store/reducers';
import { LoggerService } from '../../../app/services/logger/logger.service';

@Injectable()
export class HearingValuesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly hearingStore: Store<fromHearingReducers.State>,
    private readonly hearingsService: HearingsService,
    private readonly sessionStorage: SessionStorageService,
    private readonly loggerService: LoggerService
  ) {}

  @Effect()
  public loadHearingValue$ = this.actions$.pipe(
      ofType(hearingValuesActions.LOAD_HEARING_VALUES),
      map((action: hearingValuesActions.LoadHearingValues) => action.payload),
      switchMap((payload) => {
        const caseInfo = JSON.parse(this.sessionStorage.getItem('caseInfo'));
        const jurisdictionId = caseInfo && caseInfo.jurisdiction;
        return this.hearingsService.loadHearingValues(jurisdictionId, payload).pipe(
          map(
            (response) => new hearingValuesActions.LoadHearingValuesSuccess(response)),
          catchError((error) => {
            this.loggerService.error('Error in HearingValuesEffects:loadHearingValue$', error);
            this.hearingStore.dispatch(new hearingValuesActions.LoadHearingValuesFailure(error));
            return of(new fromAppStoreActions.Go({ path: [`/cases/case-details/${payload}/hearings`] }));
          })
        );
      })
    );
}
