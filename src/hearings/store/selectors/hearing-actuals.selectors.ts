import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';

export const getHearingActuals = createSelector(
  fromFeature.getHearingsFeatureState,
  (state: fromFeature.State) => state.hearingActuals
);

export const getHearingActualsLastError = createSelector(
  fromFeature.getHearingsFeatureState,
  (state: fromFeature.State) => state.hearingActuals.lastError
);
