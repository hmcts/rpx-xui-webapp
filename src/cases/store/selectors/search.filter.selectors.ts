import { createSelector } from '@ngrx/store';

import * as fromFeature from '../../store/reducers';

export const getSearchState = createSelector(
 fromFeature.getCaseFeatureState,
 (state: fromFeature.State) => state.caseSearch
);

export const searchFilterJurisdiction = createSelector(
    getSearchState,
    fromFeature.getSearchFilterJurisdiction
);

export const searchFilterCaseType = createSelector(
    getSearchState,
    fromFeature.getSearchFilterCaseType
);

export const searchFilterCaseState = createSelector(
    getSearchState,
    fromFeature.getSearchFilterCaseState
);

export const searchFilterMetadataFields = createSelector(
    getSearchState,
    fromFeature.getSearchFilterMetadataFields
);

export const searchFilterResultView = createSelector(
    getSearchState,
    fromFeature.getSearchFilterResultView
);

export const getSearchFilterPaginationMetadata = createSelector(
  getSearchState,
  fromFeature.getSearchFilterPageMetadata
);

export const getCurrentPage = createSelector(
  getSearchState,
  fromFeature.getSearchResultsCurrentPage
);

export const getSearchFilterToggle = createSelector(
  getSearchState,
  fromFeature.getSearchFilterToggleState
);
