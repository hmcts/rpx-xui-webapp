import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import * as hearingLinksActions from '../../../hearings/store/actions/hearing-links.action';
import {HttpError} from '../../../models/httpError.model';
import {HearingsService} from '../../services/hearings.service';

@Injectable()
export class HearingLinksEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly hearingsService: HearingsService,
  ) {
  }

  @Effect()
  public loadServiceLinkedCases$ = this.actions$.pipe(
    ofType(hearingLinksActions.LOAD_SERVICE_LINKED_CASES),
    map((action: hearingLinksActions.LoadServiceLinkedCases) => action.payload),
    switchMap(payload => {
      return this.hearingsService.loadServiceLinkedCases(payload.caseReference, payload.hearingId).pipe(
        map(response => new hearingLinksActions.LoadServiceLinkedCasesSuccess(response)),
        catchError((error: HttpError) => of(new hearingLinksActions.LoadServiceLinkedCasesFailure(error)))
      );
    })
  );

  @Effect()
  public loadLinkedHearingGroup$ = this.actions$.pipe(
    ofType(hearingLinksActions.LOAD_LINKED_HEARING_GROUP),
    map((action: hearingLinksActions.LoadLinkedHearingGroup) => action.payload),
    switchMap(payload => {
      return this.hearingsService.getLinkedHearingGroup(payload.caseReference, payload.hearingId).pipe(
        map(response => new hearingLinksActions.LoadLinkedHearingGroupSuccess(response)),
        catchError((error: HttpError) => of(new hearingLinksActions.LoadLinkedHearingGroupFailure(error)))
      );
    })
  );
}
