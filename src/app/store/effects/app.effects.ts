import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import * as fromCore from '../';
import * as fromActions from '../actions';
import {AppConfigService} from '../../services/config/configuration.services';
import {of} from 'rxjs/internal/observable/of';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>,
    private configurationServices: AppConfigService
  ) {}

  @Effect()
  config = this.actions$.pipe(
    ofType(fromActions.APP_LOAD_CONFIG),
    switchMap(() => {
      return this.configurationServices.load()
        .pipe(
          map(config =>   new fromActions.LoadConfigSuccess(config)),
          catchError(error => of(new fromActions.LoadConfigFail(error))
          ));
    })
  );

  @Effect({dispatch: false})
  setConfig = this.actions$.pipe(
    ofType(fromActions.APP_LOAD_CONFIG_SUCCESS),
    map(() => {
      this.configurationServices.setConfiguration();
    })
  );

}
