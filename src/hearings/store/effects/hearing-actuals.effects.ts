import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import * as fromAppStoreActions from '../../../app/store/actions';
import * as hearingActualsActions from '../../../hearings/store/actions/hearing-actuals.action';
import {HttpError} from '../../../models/httpError.model';
import {HearingsService} from '../../services/hearings.service';

@Injectable()
export class HearingActualsEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly hearingsService: HearingsService,
  ) {
  }

  @Effect()
  public getHearingActuals$ = this.actions$.pipe(
    ofType(hearingActualsActions.GET_HEARING_ACTUALS),
    switchMap((action: hearingActualsActions.GetHearingActuals) => {
      return this.hearingsService.getHearingActuals(action.payload).pipe(
        map(
          (response) => new hearingActualsActions.GetHearingActualsSuccess(response)),
        catchError(error => {
          return HearingActualsEffects.handleError(error);
        })
      );
    })
  );

  public static handleError(error: HttpError): Observable<Action> {
    if (error && error.status && error.status >= 400) {
      return of(new fromAppStoreActions.Go({path: ['/service-down']}));
    }
  }
}
