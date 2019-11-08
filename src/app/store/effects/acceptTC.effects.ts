import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as acceptTandCActions from '../actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AcceptTermsService } from 'src/app/services/acceptTerms/acceptTerms.service';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class AcceptTcEffects {
  constructor(
    private actions$: Actions,
    private acceptTcService: AcceptTermsService,
    private cookieService: CookieService
  ) { }

  @Effect()
  loadHasAccepted$ = this.actions$.pipe(
    ofType(acceptTandCActions.LOAD_HAS_ACCEPTED_TC),
    switchMap((action: any) => {
    console.log(action);
    return this.acceptTcService.getIsUserAccepted(action.payload).pipe(
    map(userId => {
        return new acceptTandCActions.LoadHasAcceptedTCSuccess(userId);
    }),
    catchError(error => of(new acceptTandCActions.LoadHasAcceptedTCFail(error)))
    );
    })
  );
}
