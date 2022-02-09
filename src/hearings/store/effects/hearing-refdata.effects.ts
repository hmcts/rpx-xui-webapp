import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HearingsRefDataService } from '../../../hearings/services/hearings-ref-data.service';
import * as fromAppStoreActions from '../../../app/store/actions';
import * as hearingRefDataActions from '../../../hearings/store/actions/hearing-refdata.action';
import { HttpError } from '../../../models/httpError.model';

@Injectable()
export class HearingRefDataEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly hearingsRefDataService: HearingsRefDataService,
  ) {}

  @Effect()
  public loadHearingFactilitiesData$ = this.actions$.pipe(
    ofType(hearingRefDataActions.LOAD_HEARINGS_FACILITIES_DATA),
    switchMap(() => {
      return this.hearingsRefDataService.getRefData('FacilitiesList', 'SSCS').pipe(
        map(
          (response) => new hearingRefDataActions.LoadHearingsFacilitiesDataSuccess(response)),
        catchError(error => {
          return HearingRefDataEffects.handleError(error);
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
