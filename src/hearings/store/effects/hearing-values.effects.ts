import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import * as fromAppStoreActions from '../../../app/store/actions';
import * as hearingValuesActions from '../../../hearings/store/actions/hearing-values.action';
import {HttpError} from '../../../models/httpError.model';
import {HearingsService} from '../../services/hearings.service';
import * as fromHearingReducers from '../../store/reducers';

@Injectable()
export class HearingValuesEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly hearingStore: Store<fromHearingReducers.State>,
    private readonly hearingsService: HearingsService,
  ) {
  }

  @Effect()
  public loadHearingValue$ = this.actions$.pipe(
    ofType(hearingValuesActions.LOAD_HEARING_VALUES),
    map((action: hearingValuesActions.LoadHearingValues) => action.payload),
    switchMap(payload => {
      return this.hearingsService.loadHearingValues(payload).pipe(
        map(
          (response) => new hearingValuesActions.LoadHearingValuesSuccess(response)),
        catchError(error => {
          this.hearingStore.dispatch(new hearingValuesActions.LoadHearingValuesFailure(error));
          return HearingValuesEffects.handleError(error);
        })
      );
    })
  );

  public static handleError(error: HttpError): Observable<Action> {
    if (error && error.status) {
      return of(new fromAppStoreActions.Go({path: ['/hearings/error']}));
    }
  }
}
