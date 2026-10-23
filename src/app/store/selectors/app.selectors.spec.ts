import { TestBed } from '@angular/core/testing';
import { CurrentUserService } from '@hmcts/ccd-case-ui-toolkit';
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
    userDetailsVersion: 0,
    decorate16digitCaseReferenceSearchBoxInHeader: false,
  };

  const appPayload = {
    features: {
      ccdCaseCreate: {
        isEnabled: true,
        label: 'CCDCaseCreate',
      },
    },
  };

  const appConfigLoaded = {
    config: {
      features: {
        ccdCaseCreate: {
          isEnabled: true,
          label: 'CCDCaseCreate',
        },
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
          label: 'CCDCaseCreate',
        },
      },
    },
    termsAndCondition: { isLoaded: false, hasUserAcceptedTC: false },
    loaded: true,
    loading: false,
    termsAndConditions: null,
    isTermsAndConditionsFeatureEnabled: false,
    useIdleSessionTimeout: false,
    userDetailsVersion: 0,
    decorate16digitCaseReferenceSearchBoxInHeader: false,
  };

  beforeEach(() => {
    sessionStorage.removeItem('userDetails');
    CurrentUserService.resetUserDetails();
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          products: combineReducers(fromReducers.reducers),
        }),
      ],
    });

    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  afterEach(() => {
    sessionStorage.removeItem('userDetails');
    CurrentUserService.resetUserDetails();
  });

  it('selects user details from session storage after the version action', () => {
    const details = {
      userInfo: { id: 'user-1', email: 'user@example.com', roles: [], token: 'Bearer secret' },
      canShareCases: true,
      sessionTimeout: { idleModalDisplayTime: 10, totalIdleTime: 30 },
      roleAssignmentInfo: [{ jurisdiction: 'IA', isCaseAllocator: true }]
    } as any;
    let selectedDetails;
    store.select(fromSelectors.getUserDetails).subscribe((value) => (selectedDetails = value));

    CurrentUserService.setUserDetails(sessionStorage, details);
    store.dispatch(new fromActions.LoadUserDetailsSuccess());

    expect(selectedDetails.userInfo).toEqual({ id: 'user-1', email: 'user@example.com', roles: [] });
    expect(selectedDetails.canShareCases).toBeTrue();
    expect(selectedDetails.roleAssignmentInfo).toEqual(details.roleAssignmentInfo);
    expect(sessionStorage.getItem('userDetails')).not.toContain('Bearer secret');
  });

  it('does not emit user details again for unrelated app state changes', () => {
    let emissions = 0;
    store.select(fromSelectors.getUserDetails).subscribe(() => emissions++);

    store.dispatch(new fromActions.LoadConfigSuccess(appPayload));

    expect(emissions).toBe(1);
  });

  describe('Configuration State', () => {
    it('should return config initial state', () => {
      let result;

      store.select(fromSelectors.getConfigState).subscribe((value) => (result = value));
      expect(result).toEqual(appConfig);

      store.dispatch(new fromActions.LoadConfigSuccess(appPayload));
      expect(result).toEqual(appConfigLoadedAfter);
    });

    it('should return app feature state', () => {
      let result;

      store.select(fromSelectors.getAppFeatures).subscribe((value) => (result = value));

      store.dispatch(new fromActions.LoadConfigSuccess(appPayload));
      expect(result).toEqual(appConfigLoaded.config);
    });
  });
});
