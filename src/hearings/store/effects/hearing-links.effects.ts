import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as fromAppStoreActions from '../../../app/store/actions';
import * as fromHearingReducers from '../../../app/store/reducers';
import * as hearingLinksActions from '../../../hearings/store/actions/hearing-links.action';
import { HttpError } from '../../../models/httpError.model';
import { HearingsService } from '../../services/hearings.service';

@Injectable()
export class HearingLinksEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly hearingStore: Store<fromHearingReducers.State>,
    private readonly hearingsService: HearingsService,
    private readonly router: Router,
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

  @Effect({dispatch: false})
  public submitLinkedHearingGroup$ = this.actions$.pipe(
    ofType(hearingLinksActions.SUBMIT_LINKED_HEARING_GROUP),
    map((action: hearingLinksActions.SubmitLinkedHearingGroup) => action.payload),
    switchMap(payload => {
      return this.hearingsService.postLinkedHearingGroup(payload.linkedHearingGroup).pipe(
        tap(
          () => {
            return this.router.navigate(['/', 'hearings', 'link', payload.caseId, payload.hearingId, 'final-confirmation']);
          }),
          catchError(error => {
            this.hearingStore.dispatch(new hearingLinksActions.SubmitLinkedHearingGroupFailure(error));
            return of(error);
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
