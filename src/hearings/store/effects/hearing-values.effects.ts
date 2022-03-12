import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import * as fromAppStoreActions from '../../../app/store/actions';
import * as hearingValuesActions from '../../../hearings/store/actions/hearing-values.action';
import {HttpError} from '../../../models/httpError.model';
import {HearingsService} from '../../services/hearings.service';

@Injectable()
export class HearingValuesEffects {

  constructor(
    private readonly actions$: Actions,
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
          return HearingValuesEffects.handleError(error);
        })
      );
    })
  );

  public static handleError(error: HttpError): Observable<Action> {
    if (error && error.status) {
      switch (error.status) {
        case 401:
        case 403:
          // TODO: This should be not-authorised page. Need to confirm.
          return of(new fromAppStoreActions.Go({path: ['/hearings/error']}));
        default:
          return of(new fromAppStoreActions.Go({path: ['/hearings/error']}));
      }
    }
  }
}
