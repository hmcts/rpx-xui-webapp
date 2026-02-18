import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';

export const getHearingConditions = createSelector(
  fromFeature.getHearingsFeatureState,
  (state: fromFeature.State) => state.hearingConditions
);
