import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as fromActions from '../../../app/store/actions';
import * as hearingsActions from '../../../hearings/store/actions/hearings.action';
import { HttpError } from '../../../models/httpError.model';
import { HearingsService } from '../../services/hearings.service';

@Injectable()
export class HearingsEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly hearingsService: HearingsService,
  ) {
  }

  @Effect()
  public loadHearingsList$ = this.actions$.pipe(
    ofType(hearingsActions.LOAD_ALL_HEARINGS),
    map((action: hearingsActions.LoadAllHearings) => action.payload),
    switchMap(payload => {
      return this.hearingsService.getAllHearings(payload).pipe(
        map(
          (response) => new hearingsActions.LoadAllHearingsSuccess(response)),
        catchError(error => {
          return HearingsEffects.handleError(error, hearingsActions.LOAD_ALL_HEARINGS);
        })
      );
    })
  );

  public static handleError(error: HttpError, action: string): Observable<Action> {
    if (error && error.status && error.status >= 400) {
      return of(new fromActions.Go({path: ['/service-down']}));
    }
  }
}
