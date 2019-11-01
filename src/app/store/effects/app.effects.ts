import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AppConfigService } from '../../services/config/configuration.services';
import * as fromActions from '../actions';

@Injectable()
export class AppEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly configurationServices: AppConfigService,
    private readonly authService: AuthService
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
      this.authService.signOut();
    })
  );
}
