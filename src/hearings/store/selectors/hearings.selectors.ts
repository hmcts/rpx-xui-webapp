import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';

export const getHearingsState = createSelector(
 fromFeature.getHearingsFeatureState,
 (state: fromFeature.State) => state.hearings
);

export const lastError = createSelector(
  getHearingsState,
    fromFeature.getLastError
);
