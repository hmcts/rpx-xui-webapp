import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';

export const getHearingValues = createSelector(
  fromFeature.getHearingsFeatureState,
  (state: fromFeature.State) => state.hearingValues
);

export const getHearingValuesModel = createSelector(
  getHearingValues,
  fromFeature.hearingValuesModel
);

export const getHearingValuesLastError = createSelector(
  getHearingValues,
  fromFeature.hearingRequestLastError
);
