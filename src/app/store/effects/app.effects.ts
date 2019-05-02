import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import * as fromCore from '../';
import * as fromActions from '../actions';
import {of} from 'rxjs/observable/of';
import {AppConfigService} from '../../services/configuration.services';

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

      // return of()
    })
  );

  @Effect()
  setConfig = this.actions$.pipe(
    ofType(fromActions.APP_LOAD_CONFIG_SUCCESS),
    switchMap(() => {
      this.configurationServices.setConfiguration();
      return of();
    })
  );


}
