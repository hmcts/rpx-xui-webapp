import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';

export const getHearingList = createSelector(
  fromFeature.getHearingsFeatureState,
  (state: fromFeature.State) => state.hearingList
);

export const getHearingListLastError = createSelector(
  getHearingList,
  fromFeature.hearingListLastError
);
