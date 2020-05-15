import { createSelector, createFeatureSelector } from '@ngrx/store';

import { getCaseFeatureState, State, getSearchFilterJurisdiction, getSearchFilterCaseType, getSearchFilterCaseState, getSearchFilterMetadataFields,
  getSearchFilterResultView, getSearchFilterPageMetadata, getSearchResultsCurrentPage, getSearchFilterToggleState } from '../../store/reducers';

export const getSearchState = createSelector(
 getCaseFeatureState,
 (state: State) => state.caseSearch
);

export const searchFilterJurisdiction = createSelector(
    getSearchState,
    getSearchFilterJurisdiction
);

export const searchFilterCaseType = createSelector(
    getSearchState,
    getSearchFilterCaseType
);

export const searchFilterCaseState = createSelector(
    getSearchState,
    getSearchFilterCaseState
);

export const searchFilterMetadataFields = createSelector(
    getSearchState,
    getSearchFilterMetadataFields
);

export const searchFilterResultView = createSelector(
    getSearchState,
    getSearchFilterResultView
);

export const getSearchFilterPaginationMetadata = createSelector(
  getSearchState,
  getSearchFilterPageMetadata
);

export const getCurrentPage = createSelector(
  getSearchState,
  getSearchResultsCurrentPage
);

export const getSearchFilterToggle = createSelector(
  getSearchState,
  getSearchFilterToggleState
);
