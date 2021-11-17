import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';

export const getHearingList = createSelector(
  fromFeature.getHearingsFeatureState,
  (state: fromFeature.State) => state.hearingList
);

export const lastError = createSelector(
  getHearingList,
  fromFeature.getLastError
);
