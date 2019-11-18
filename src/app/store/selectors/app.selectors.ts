import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromApp from '../reducers/app-config.reducer';
import { TermsAndCondition } from 'src/app/models/TermsAndCondition';

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
