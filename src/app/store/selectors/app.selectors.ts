import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromApp from '../reducers/app-config.reducer';

export const getConfigState = createSelector(
  fromFeature.getAppConfigState,
  (state: fromApp.AppState) => state
);

export const getAppFeatures = createSelector(
  getConfigState,
  fromApp.getFeatureConfig
);

export const getUser = createSelector(
  getConfigState,
  fromApp.getUserDetails
);

export const getUserIdleTimeOut = createSelector(
  getUser,
  (user) => (user && user.idleTime) ? user.idleTime : NaN
);

export const getModalSessionData = createSelector(
  getConfigState,
  (state) => state.modal.session
);
