import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as fromRoot from '../../../app/store/reducers';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from './app.selectors';


describe('App Selectors', () => {
  let store: Store<fromReducers.State>;

  const appConfig = {
    config: {},
    loaded: false,
    loading: false
  };

  const appPayload = {
    features: {
      ccdCaseCreate: {
        isEnabled: true,
        label: 'CCDCaseCreate'
      }
    }
  };

  const appConfigLoaded = {
      config: {
        features: {
          ccdCaseCreate: {
            isEnabled: true,
            label: 'CCDCaseCreate'
          }
        }
      },
      loaded: true,
      loading: false
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          products: combineReducers(fromReducers.reducers),
        }),
      ],
    });

    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('Configuration State', () => {
    it('should return config initial state', () => {
      let result;

      store
        .select(fromSelectors.getConfigState)
        .subscribe(value => (result = value));

      expect(result).toEqual(appConfig);

      store.dispatch(new fromActions.LoadConfigSuccess(appPayload));
      expect(result).toEqual(appConfigLoaded);
    });

    it('should return app feature state', () => {
      let result;

      store
        .select(fromSelectors.getAppFeatures)
        .subscribe(value => (result = value));

      store.dispatch(new fromActions.LoadConfigSuccess(appPayload));
      expect(result).toEqual(appConfigLoaded.config);
    });
  });


});
