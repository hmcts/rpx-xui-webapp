import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';

export const getHearingLinks = createSelector(
  fromFeature.getHearingsFeatureState,
  (state: fromFeature.State) => state.hearingLinks
);

export const getServiceLinkedCases = createSelector(
  getHearingLinks,
  fromFeature.serviceLinkedCases
);

export const getServiceLinkedCasesWithHearings = createSelector(
  getHearingLinks,
  fromFeature.serviceLinkedCasesWithHearings
);

export const getLinkedHearingGroup = createSelector(
  getHearingLinks,
  fromFeature.linkedHearingGroup
);

export const getHearingLinksLastError = createSelector(
  fromFeature.getHearingsFeatureState,
  (state: fromFeature.State) => state.hearingLinks.lastError
);
