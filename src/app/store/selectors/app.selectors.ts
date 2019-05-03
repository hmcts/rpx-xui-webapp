import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromApp from '../reducers/app-config.reducer';

export const getConfigState = createSelector(
  fromFeature.getAppConfigState,
  (state: fromApp.AppConfigState) => state
);

export const getAppFeatures = createSelector(
  getConfigState,
  fromApp.getFeatureConfig
);
