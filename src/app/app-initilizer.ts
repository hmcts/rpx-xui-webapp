import {select, Store} from '@ngrx/store';
import {takeWhile} from 'rxjs/operators';
import { EnvironmentConfig } from '../models/environmentConfig.model';
import * as fromApp from './store';

/**
 *  Function used in APP_INITIALIZER provider that returns a promise
 *  Responsible for storing and dispatching initial features data / event
 *  When it does resolves into true and starts application
 */
export function initApplication(store: Store<fromApp.State>): VoidFunction {
  return () => new Promise(resolve => {
    store.dispatch(new fromApp.StartAppInitilizer());
    store.dispatch(new fromApp.LoadConfig());
    store.dispatch(new fromApp.LoadFeatureToggleConfig());
    let take = true;
    store.pipe(
      select((state: any) => state.appConfig), takeWhile(x => take)).subscribe(appConfig => {
        if (appConfig.config.features && Object.keys(appConfig.config.features).length) {
          store.dispatch(new fromApp.FinishAppInitilizer());
          take = false;
          resolve(true);
        }
    });
  });
}
