import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as hearingListActions from '../../../hearings/store/actions/hearing-list.action';
import { HttpError } from '../../../models/httpError.model';
import { HearingsService } from '../../services/hearings.service';
import { LoggerService } from '../../../app/services/logger/logger.service';

@Injectable()
export class HearingListEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly hearingsService: HearingsService,
    private readonly loggerService: LoggerService
  ) {}

  @Effect()
  public loadHearingList$ = this.actions$.pipe(
      ofType(hearingListActions.LOAD_ALL_HEARINGS),
      map((action: hearingListActions.LoadAllHearings) => action.payload),
      switchMap((payload) => {
        return this.hearingsService.getAllHearings(payload).pipe(
          map(
            (response) => new hearingListActions.LoadAllHearingsSuccess(response)),
          catchError((error: HttpError) => {
            this.loggerService.error('Error in HearingListEffects:loadHearingList$', error);
            return of(new hearingListActions.LoadAllHearingsFailure(error));
          })
        );
      })
    );
}
