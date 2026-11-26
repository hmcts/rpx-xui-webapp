import { createSelector } from '@ngrx/store';
import { CurrentUserService } from '@hmcts/ccd-case-ui-toolkit';
import * as fromFeature from '../reducers';
import * as fromApp from '../reducers/app-config.reducer';

export const getConfigState = createSelector(fromFeature.getAppConfigState, (state: fromApp.AppConfigState) => state);

export const getTandCLoaded = createSelector(getConfigState, fromApp.getTandCLoadedConfig);

export const getAppFeatures = createSelector(getConfigState, fromApp.getFeatureConfig);

export const getTermsAndConditions = createSelector(getConfigState, (state) => state.termsAndConditions);

export const getIsTermsAndConditionsFeatureEnabled = createSelector(
  getConfigState,
  (state) => state.isTermsAndConditionsFeatureEnabled
);

// Only the version should trigger a user-details emission. Other app actions
// update this reducer too and would otherwise repeat routing and initialization.
export const getUserDetailsVersion = createSelector(getConfigState, fromApp.getUserDetailsVersion);
export const getUserDetails = createSelector(getUserDetailsVersion, () => CurrentUserService.readUserDetails(sessionStorage));

export const getUseIdleSessionTimeout = createSelector(getConfigState, fromApp.getUseIdleSessionTimeout);

export const getDecorate16digitCaseReferenceSearchBoxInHeader = createSelector(
  getConfigState,
  fromApp.getDecorate16digitCaseReferenceSearchBoxInHeader
);
