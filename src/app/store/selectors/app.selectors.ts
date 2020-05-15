import { createSelector } from '@ngrx/store';
import { getAppConfigState } from '../reducers';
import { AppConfigState, getTandCLoadedConfig, getFeatureConfig } from '../reducers/app-config.reducer';

export const getConfigState = createSelector(
  getAppConfigState,
  (state: AppConfigState) => state
);

export const getTandCLoaded = createSelector(
  getConfigState,
  getTandCLoadedConfig
);

export const getAppFeatures = createSelector(
  getConfigState,
  getFeatureConfig
);

export const getTermsAndConditions = createSelector(
  getConfigState,
  state => state.termsAndConditions
);

export const getIsTermsAndConditionsFeatureEnabled = createSelector(
  getConfigState,
  state => state.isTermsAndConditionsFeatureEnabled
);
