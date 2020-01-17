import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromApp from '../reducers/app-config.reducer';

export const getConfigState = createSelector(
  fromFeature.getAppConfigState,
  (state: fromApp.AppState) => state
);

export const getTandCLoaded = createSelector(
  getConfigState,
  fromApp.getTandCLoadedConfig
);

export const getAppFeatures = createSelector(
  getConfigState,
  fromApp.getFeatureConfig
);

export const getUser = createSelector(
  getConfigState,
  fromApp.getUserDetails
);

export const getUserIdleTime = createSelector(
  getUser,
  (user) => (user && user.idleTime) ? user.idleTime : NaN
);

export const getUserTimeOut = createSelector(
  getUser,
  (user) => (user && user.timeout) ? user.timeout : NaN
);

export const getModalSessionData = createSelector(
  getConfigState,
  (state) => state.modal.session
);

export const getTermsAndConditions = createSelector(
  getConfigState,
  state => state.termsAndConditions
);
