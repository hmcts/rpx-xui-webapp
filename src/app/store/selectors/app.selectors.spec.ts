import { TestBed } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';

import * as fromRoot from '../../../app/store/reducers';
import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from './app.selectors';


describe('App Selectors', () => {
  let store: Store<fromReducers.State>;

  const appConfig = {
    config: {},
    termsAndCondition: { isLoaded: false, hasUserAcceptedTC: false },
    loaded: false,
    loading: false,
    termsAndConditions: null,
    isTermsAndConditionsFeatureEnabled: false,
    useIdleSessionTimeout: false,
    userDetails: {
      sessionTimeout: {
        idleModalDisplayTime: 0,
        totalIdleTime: 0,
      }
    }
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
    isTermsAndConditionsFeatureEnabled: false,
    useIdleSessionTimeout: false,
    userDetails: {
      sessionTimeout: {
        idleModalDisplayTime: 0,
        totalIdleTime: 0,
      }
    }
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
      expect(result).toEqual(appConfigLoadedAfter);
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
