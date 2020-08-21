import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TermsConditionsService } from 'src/app/services/terms-and-conditions/terms-and-conditions.service';
import { UserService } from 'src/app/services/user/user.service';
import { AppConfigService } from '../../services/config/configuration.services';
import * as fromActions from '../actions';

@Injectable()
export class AppEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly configurationServices: AppConfigService,
    private readonly authService: AuthService,
    private readonly termsService: TermsConditionsService,
    private readonly userService: UserService
  ) { }

  @Effect()
  public config = this.actions$.pipe(
    ofType(fromActions.APP_LOAD_CONFIG),
    switchMap(() => {
      return this.configurationServices.load()
        .pipe(
          map(config => new fromActions.LoadConfigSuccess(config)),
          catchError(error => of(new fromActions.LoadConfigFail(error))
          ));
    })
  );

  @Effect()
  public featureToggleConfig = this.actions$.pipe(
    ofType(fromActions.LOAD_FEATURE_TOGGLE_CONFIG),
    switchMap(() => {
      // TODO: this should be replaced by the feature toggle service once its ready.
      return this.termsService.isTermsConditionsFeatureEnabled()
        .pipe(
          map(isTandCFeatureToggleEnabled => new fromActions.LoadFeatureToggleConfigSuccess(isTandCFeatureToggleEnabled)),
          catchError(error => of(new fromActions.LoadFeatureToggleConfigFail(error))
          ));
    })
  );

  @Effect({ dispatch: false })
  public setConfig = this.actions$.pipe(
    ofType(fromActions.APP_LOAD_CONFIG_SUCCESS),
    map(() => {
      this.configurationServices.setConfiguration();
    })
  );


  @Effect({ dispatch: false })
  public logout = this.actions$.pipe(
    ofType(fromActions.LOGOUT),
    map(() => {
      console.log('call Signout auth service.');
      this.authService.signOut();
    })
  );

  @Effect({ dispatch: false })
  public logoutAndRedirect = this.actions$.pipe(
    ofType(fromActions.IDLE_USER_LOGOUT),
    map(() => {
      this.authService.logOutAndRedirect();
    })
  );

  @Effect()
  public loadTermsConditions$ = this.actions$.pipe(
    ofType(fromActions.LOAD_TERMS_CONDITIONS),
    switchMap(() => {
      return this.termsService.getTermsConditions().pipe(
        map(doc => new fromActions.LoadTermsConditionsSuccess(doc)),
        catchError(err => of(new fromActions.Go({ path: ['/service-down'] })))
      );
    })
  );

  @Effect()
  public loadUserDetails$ = this.actions$.pipe(
    ofType(fromActions.LOAD_USER_DETAILS),
    switchMap(() => {
      return this.userService.getUserDetails().pipe(
        map(userDetails => new fromActions.LoadUserDetailsSuccess(userDetails)),
        // TODO: catch error
        catchError(err => of(new fromActions.Go({ path: ['/service-down'] })))
      );
    })
  );
}
