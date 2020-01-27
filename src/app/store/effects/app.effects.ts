import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as fromCore from '../';
import * as fromActions from '../actions';
import { AppConfigService } from '../../services/config/configuration.services';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TermsConditionsService } from 'src/app/services/terms-and-conditions/terms-and-conditions.service';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>,
    private configurationServices: AppConfigService,
    private authService: AuthService,
    private termsService: TermsConditionsService
  ) { }

  @Effect()
  config = this.actions$.pipe(
    ofType(fromActions.APP_LOAD_CONFIG),
    switchMap(() => {
      return this.configurationServices.load()
        .pipe(
          map(config => new fromActions.LoadConfigSuccess(config)),
          catchError(error => of(new fromActions.LoadConfigFail(error))
          ));
    })
  );

  @Effect({ dispatch: false })
  setConfig = this.actions$.pipe(
    ofType(fromActions.APP_LOAD_CONFIG_SUCCESS),
    map(() => {
      this.configurationServices.setConfiguration();
    })
  );


  @Effect({ dispatch: false })
  logout = this.actions$.pipe(
    ofType(fromActions.LOGOUT),
    map(() => {
      this.authService.signOut();
    })
  );

  @Effect()
  loadTermsConditions$ = this.actions$.pipe(
    ofType(fromActions.LOAD_TERMS_CONDITIONS),
    switchMap(() => {
      return this.termsService.getTermsConditions().pipe(
        map(doc => new fromActions.LoadTermsConditionsSuccess(doc)),
        catchError(err => of(new fromActions.LoadTermsConditionsFail(err)))
      );
    })
  );
}
