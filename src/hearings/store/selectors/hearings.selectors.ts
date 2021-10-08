import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';

export const getHearingsList = createSelector(
  fromFeature.getHearingsFeatureState,
  (state: fromFeature.State) => state.hearingsList
);

export const lastError = createSelector(
  getHearingsList,
  fromFeature.getLastError
);
