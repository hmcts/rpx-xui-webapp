import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';

export const getHearingLinks = createSelector(
  fromFeature.getHearingsFeatureState,
  (state: fromFeature.State) => state.hearingLinks
);

export const getHearingLinksLastError = createSelector(
  fromFeature.getHearingsFeatureState,
  (state: fromFeature.State) => state.hearingLinks.lastError
);
