import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';

export const getSpecificAccessState = createSelector(
  fromFeature.getRoleAccessFeatureState,
  (state: fromFeature.State) => state.specificAccess
);

export const currentSpecificAccessNavigation = createSelector(
  getSpecificAccessState,
  fromFeature.getSpecificAccessActiveState
);

export const specificAccessLastError = createSelector(
  getSpecificAccessState,
  fromFeature.getSpecificAccessLastErrors
);

export const specificAccessFormData = createSelector(
  getSpecificAccessState,
  fromFeature.getSpecificAccessFormData
);


