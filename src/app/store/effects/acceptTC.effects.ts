import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AcceptTermsService } from '../../services/acceptTerms/acceptTerms.service';
import * as fromRoot from '../../store';
import * as acceptTandCActions from '../actions';
import { LoggerService } from '../../services/logger/logger.service';

@Injectable()
export class AcceptTcEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly acceptTcService: AcceptTermsService,
    private readonly loggerService: LoggerService
  ) {}

  @Effect()
  public loadHasAccepted$ = this.actions$.pipe(
      ofType(acceptTandCActions.LOAD_HAS_ACCEPTED_TC),
      switchMap((action: any) => {
        return this.acceptTcService.getIsUserAccepted(action.payload).pipe(
          map((userId) => {
            return new acceptTandCActions.LoadHasAcceptedTCSuccess(userId);
          }),
          catchError((error) => {
            this.loggerService.error('Error in AcceptTcEffects:loadHasAccepted$', error);
            return of(new fromRoot.Go({ path: ['/service-down'] }));
          })
        );
      })
    );

  @Effect()
  public userHasAccepted$ = this.actions$.pipe(
      ofType(acceptTandCActions.ACCEPT_T_AND_C),
      switchMap((action: any) => {
        return this.acceptTcService.postUserAccepted(action.payload).pipe(
          map((accepted) => {
            return new acceptTandCActions.AcceptTandCSuccess(accepted);
          }),
          catchError((error) => {
            this.loggerService.error('Error in AcceptTcEffects:userHasAccepted$', error);
            return of(new fromRoot.Go({ path: ['/service-down'] }));
          })
        );
      })
    );
}
