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
    userDetails: null,
    modal: {
      session: {
        isVisible: false,
        countdown: ''
      }
    },
    termsAndCondition: { isLoaded: false, hasUserAcceptedTC: false },
    loaded: false,
    loading: false,
    termsAndConditions: null
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
      userDetails: null,
      modal: {
        session: {
          isVisible: false,
          countdown: ''
        }
      },
      loaded: true,
      loading: false,
  };

  const appConfigLoadedAfter = {
    userDetails: null,
    modal: {
      session: {
        isVisible: false,
        countdown: ''
      }
    },
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
    termsAndConditions: null
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
    it('should return dep-config initial state', () => {
      let result;

      store
        .select(fromSelectors.getConfigState)
        .subscribe(value => (result = value));
      console.log('result', JSON.stringify(result));
      console.log('appConfig', JSON.stringify(appConfig));
      expect(result).toEqual(appConfig);

      store.dispatch(new fromActions.LoadConfigSuccess(appPayload));
      console.log('appConfigLoadedAfter', JSON.stringify(appConfigLoadedAfter));
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

    it('should return userDetails state', () => {
      let result;

      store
        .select(fromSelectors.getUser)
        .subscribe(value => (result = value));

      store.dispatch(new fromActions.GetUserDetails());
      expect(result).toEqual(appConfigLoaded.userDetails);
    });

    it('should return getUserIdleTime state', () => {
      let result;

      store
        .select(fromSelectors.getUserIdleTime)
        .subscribe(value => (result = value));

      store.dispatch(new fromActions.GetUserDetails());
      expect(result).toEqual(NaN);
    });

    it('should return getUserIdleTime state', () => {
      let result;

      store
        .select(fromSelectors.getUserTimeOut)
        .subscribe(value => (result = value));

      store.dispatch(new fromActions.GetUserDetails());
      expect(result).toEqual(NaN);
    });

    it('should return getModalSessionData state', () => {
      let result;

      store
        .select(fromSelectors.getModalSessionData)
        .subscribe(value => (result = value));

      store.dispatch(new fromActions.GetUserDetails());
      expect(result).toEqual(appConfigLoaded.modal.session);
    });

    it('should return getRouterState state', () => {
      let result;

      store
        .select(fromReducers.getRouterState)
        .subscribe(value => (result = value));
      expect(result).toBeUndefined()
    });
  });


});
