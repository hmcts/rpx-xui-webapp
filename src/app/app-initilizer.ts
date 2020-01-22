import {select, Store} from '@ngrx/store';
import * as fromApp from './store';
import {take} from 'rxjs/operators';

/**
 *  Function used in APP_INITIALIZER provider that returns a promise
 *  Responsible for storing and dispatching initial features data / event
 *  When it does resolves into true and starts application
 */
export function initApplication(store: Store<fromApp.State>): VoidFunction {
  return () => new Promise(resolve => {
    store.dispatch(new fromApp.StartAppInitilizer());
    store.dispatch(new fromApp.LoadConfig());
    store.pipe(
      select((state: any) => state.appState), take(2)).subscribe(appState => {
      if (appState.config.features && Object.keys(appState.config.features).length) {
        store.dispatch(new fromApp.FinishAppInitilizer());
        resolve(true);
      }
    });
  });
}
