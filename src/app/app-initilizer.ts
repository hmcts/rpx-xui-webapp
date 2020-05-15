import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';
import { StartAppInitilizer, State, LoadConfig, LoadFeatureToggleConfig, FinishAppInitilizer } from './store';

/**
 *  Function used in APP_INITIALIZER provider that returns a promise
 *  Responsible for storing and dispatching initial features data / event
 *  When it does resolves into true and starts application
 */
export function initApplication(store: Store<State>): VoidFunction {
  return () => new Promise(resolve => {
    store.dispatch(new StartAppInitilizer());
    store.dispatch(new LoadConfig());
    store.dispatch(new LoadFeatureToggleConfig());
    store.pipe(
      select((state: any) => state.appConfig), take(2)).subscribe(appConfig => {
      if (appConfig.config.features && Object.keys(appConfig.config.features).length) {
        store.dispatch(new FinishAppInitilizer());
        resolve(true);
      }
    });
  });
}
