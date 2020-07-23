import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromApp from '../reducers/app-config.reducer';

export const getConfigState = createSelector(
  fromFeature.getAppConfigState,
  (state: fromApp.AppConfigState) => state
);

export const getTandCLoaded = createSelector(
  getConfigState,
  fromApp.getTandCLoadedConfig
);

export const getAppFeatures = createSelector(
  getConfigState,
  fromApp.getFeatureConfig
);

export const getTermsAndConditions = createSelector(
  getConfigState,
  state => state.termsAndConditions
);

export const getIsTermsAndConditionsFeatureEnabled = createSelector(
  getConfigState,
  state => state.isTermsAndConditionsFeatureEnabled
);

export const getUserDetails = createSelector(
  getConfigState,
  fromApp.getUserDetails
);

export const getUseIdleSessionTimeout = createSelector(
  getConfigState,
  fromApp.getUseIdleSessionTimeout
);
