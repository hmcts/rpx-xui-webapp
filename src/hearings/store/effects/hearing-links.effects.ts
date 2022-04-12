import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as fromAppStoreActions from '../../../app/store/actions';
import * as hearingLinksActions from '../../../hearings/store/actions/hearing-links.action';
import { HttpError } from '../../../models/httpError.model';
import { HearingsService } from '../../services/hearings.service';

@Injectable()
export class HearingLinksEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
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

  @Effect()
  public submitLinkedHearingGroup$ = this.actions$.pipe(
    ofType(hearingLinksActions.SUBMIT_LINKED_HEARING_GROUP),
    map((action: hearingLinksActions.SubmitLinkedHearingGroup) => action.payload),
    switchMap(payload => {
      return this.hearingsService.postLinkedHearingGroup(payload).pipe(
        tap(() => this.router.navigate(['/hearings/link/h100002/confirmation'])),
        catchError((error: HttpError) => HearingLinksEffects.handleError(error))
      );
    })
  );

  public static handleError(error: HttpError): Observable<Action> {
    if (error && error.status) {
      return of(new fromAppStoreActions.Go({path: ['/hearings/error']}));
    }
  }
}
