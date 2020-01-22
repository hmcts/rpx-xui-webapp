import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TermsConditionsService } from 'src/app/services/terms-and-conditions/terms-and-conditions.service';
import * as fromCore from '../';
import { AppConfigService } from '../../services/config/configuration.services';
import * as fromActions from '../actions';

import {HttpErrorResponse} from '@angular/common/http';
import {UserInterface} from '../../models/user.model';
import {LogOutKeepAliveService} from '../../services/keep-alive/keep-alive.services';
import {UserService} from '../../services/user-service/user.service';

@Injectable()
export class AppEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<fromCore.State>,
    private readonly configurationServices: AppConfigService,
    private readonly authService: AuthService,
    private readonly termsService: TermsConditionsService,
    private readonly logOutService: LogOutKeepAliveService,
    private readonly userService: UserService
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

  sigout$ = this.actions$.pipe(
    ofType(fromActions.SIGNED_OUT),
    switchMap(() => {
      return this.logOutService.logOut().pipe(
        map(() => new fromActions.SignedOutSuccess())
      );
    })
  );

  @Effect()
  signedOutSuccess$ = this.actions$.pipe(
    ofType(fromActions.SIGNED_OUT_SUCCESS),
    map(() => new fromActions.Go({path: ['/signed-out']}))
  );

  @Effect({ dispatch: false})
  keepAlive$ = this.actions$.pipe(
    ofType(fromActions.KEEP_ALIVE),
    switchMap((date) => {
      return this.logOutService.heartBeat()
        ;
    })
  );

  @Effect()
  getUser$ = this.actions$.pipe(
    ofType(fromActions.GET_USER_DETAILS),
    switchMap(() => {
      return this.userService.getUserDetails()
        .pipe(
          map((userDetails: UserInterface) => new fromActions.GetUserDetailsSuccess(userDetails)),
          catchError((error: HttpErrorResponse) => of(new fromActions.GetUserDetailsFailure(error)))
        );
    })
  );
}
