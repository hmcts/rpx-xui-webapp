import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TermsConditionsService } from 'src/app/services/terms-and-conditions/terms-and-conditions.service';
import { AppConfigService } from '../../services/config/configuration.services';
import { APP_LOAD_CONFIG, LoadConfigSuccess, LoadConfigFail, LOAD_FEATURE_TOGGLE_CONFIG, LoadFeatureToggleConfigSuccess, LoadFeatureToggleConfigFail, APP_LOAD_CONFIG_SUCCESS, LOGOUT, LOAD_TERMS_CONDITIONS, LoadTermsConditionsSuccess, Go } from '../actions';

@Injectable()
export class AppEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly configurationServices: AppConfigService,
    private readonly authService: AuthService,
    private readonly termsService: TermsConditionsService
  ) { }

  @Effect()
  public config = this.actions$.pipe(
    ofType(APP_LOAD_CONFIG),
    switchMap(() => {
      return this.configurationServices.load()
        .pipe(
          map(config => new LoadConfigSuccess(config)),
          catchError(error => of(new LoadConfigFail(error))
          ));
    })
  );

  @Effect()
  public featureToggleConfig = this.actions$.pipe(
    ofType(LOAD_FEATURE_TOGGLE_CONFIG),
    switchMap(() => {
      // TODO: this should be replaced by the feature toggle service once its ready.
      return this.termsService.isTermsConditionsFeatureEnabled()
        .pipe(
          map(isTandCFeatureToggleEnabled => new LoadFeatureToggleConfigSuccess(isTandCFeatureToggleEnabled)),
          catchError(error => of(new LoadFeatureToggleConfigFail(error))
          ));
    })
  );

  @Effect({ dispatch: false })
  public setConfig = this.actions$.pipe(
    ofType(APP_LOAD_CONFIG_SUCCESS),
    map(() => {
      this.configurationServices.setConfiguration();
    })
  );


  @Effect({ dispatch: false })
  public logout = this.actions$.pipe(
    ofType(LOGOUT),
    map(() => {
      this.authService.signOut();
    })
  );

  @Effect()
  public loadTermsConditions$ = this.actions$.pipe(
    ofType(LOAD_TERMS_CONDITIONS),
    switchMap(() => {
      return this.termsService.getTermsConditions().pipe(
        map(doc => new LoadTermsConditionsSuccess(doc)),
        catchError(err => of(new Go({ path: ['/service-down'] })))
      );
    })
  );
}
