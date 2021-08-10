import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';

export const getAllocateRoleState = createSelector(
  fromFeature.getRoleAccessFeatureState,
  (state: fromFeature.State) => state.allocateRole
);

export const getAllocateRoleActiveState = createSelector(
  getAllocateRoleState,
  fromFeature.allocateRoleActiveState
);

export const getAllocateRoleLastError = createSelector(
  getAllocateRoleState,
  fromFeature.allocateRoleLastErrors
);
