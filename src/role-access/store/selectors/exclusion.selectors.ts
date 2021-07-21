import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';

export const getRoleAccessState = createSelector(
  fromFeature.getRoleAccessFeatureState,
  (state: fromFeature.State) => state.exclusion
);

export const currentNavigation = createSelector(
  getRoleAccessState,
  fromFeature.getExclusionActiveState
);

export const lastError = createSelector(
  getRoleAccessState,
  fromFeature.getLastErrors
);
