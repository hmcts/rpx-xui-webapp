import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';
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
    store.pipe(
      select((state: any) => state.appConfig), take(2)).subscribe(appConfig => {
      if (appConfig.config.features && Object.keys(appConfig.config.features).length) {
        store.dispatch(new fromApp.FinishAppInitilizer());
        console.log('FinishAppInitilizer');
        resolve(true);
      }
    });
  });
}
