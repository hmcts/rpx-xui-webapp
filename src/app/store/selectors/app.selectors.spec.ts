import { TestBed } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { LoadConfigSuccess } from '../actions';
import { State, reducers } from '../reducers';
import { getConfigState, getAppFeatures } from './app.selectors';


describe('App Selectors', () => {
  let store: Store<State>;

  const appConfig = {
    config: {},
    termsAndCondition: { isLoaded: false, hasUserAcceptedTC: false },
    loaded: false,
    loading: false,
    termsAndConditions: null,
    isTermsAndConditionsFeatureEnabled: false
  };

  const appPayload = {
    features: {
      ccdCaseCreate: {
        isEnabled: true,
        label: 'CCDCaseCreate'
      }
    },
  };

  const appConfigLoaded = {
      config: {
        features: {
          ccdCaseCreate: {
            isEnabled: true,
            label: 'CCDCaseCreate'
          }
        },
      },
      loaded: true,
      loading: false,
  };

  const appConfigLoadedAfter = {
    config: {
      features: {
        ccdCaseCreate: {
          isEnabled: true,
          label: 'CCDCaseCreate'
        }
      },
    },
    termsAndCondition: { isLoaded: false, hasUserAcceptedTC: false },
    loaded: true,
    loading: false,
    termsAndConditions: null,
    isTermsAndConditionsFeatureEnabled: false
};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...reducers,
          products: combineReducers(reducers),
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
        .select(getConfigState)
        .subscribe(value => (result = value));
      expect(result).toEqual(appConfig);

      store.dispatch(new LoadConfigSuccess(appPayload));
      expect(result).toEqual(appConfigLoadedAfter);
    });

    it('should return app feature state', () => {
      let result;

      store
        .select(getAppFeatures)
        .subscribe(value => (result = value));

      store.dispatch(new LoadConfigSuccess(appPayload));
      expect(result).toEqual(appConfigLoaded.config);
    });
  });


});
