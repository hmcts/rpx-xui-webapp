import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AcceptTermsService } from 'src/app/services/acceptTerms/acceptTerms.service';
import { Go } from '../../store';
import { LOAD_HAS_ACCEPTED_TC, LoadHasAcceptedTCSuccess, ACCEPT_T_AND_C, AcceptTandCSuccess } from '../actions';

@Injectable()
export class AcceptTcEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly acceptTcService: AcceptTermsService
  ) { }

  @Effect()
  public loadHasAccepted$ = this.actions$.pipe(
    ofType(LOAD_HAS_ACCEPTED_TC),
    switchMap((action: any) => {
      return this.acceptTcService.getIsUserAccepted(action.payload).pipe(
        map(userId => {
            return new LoadHasAcceptedTCSuccess(userId);
        }),
        catchError(() => of(new Go({ path: ['/service-down']})))
      );
    })
  );

  @Effect()
  public userHasAccepted$ = this.actions$.pipe(
    ofType(ACCEPT_T_AND_C),
    switchMap((action: any) => {
      return this.acceptTcService.postUserAccepted(action.payload).pipe(
        map(accepted => {
            return new AcceptTandCSuccess(accepted);
        }),
        catchError(error => of(new Go({ path: ['/service-down'] })))
      );
    })
  );
}
