import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';

export const getHearingRequestToCompare = createSelector(
  fromFeature.getHearingsFeatureState,
  (state: fromFeature.State) => state.hearingRequestToCompare
);

export const getHearingRequestToCompareLastError = createSelector(
  getHearingRequestToCompare,
  fromFeature.hearingRequestToCompareLastError
);
