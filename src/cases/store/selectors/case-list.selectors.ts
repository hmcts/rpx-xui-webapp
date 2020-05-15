import { createSelector, createFeatureSelector } from '@ngrx/store';

import { getCaseFeatureState, State, getCaselistFilterJurisdiction, getCaselistFilterCaseType, getCaselistFilterCaseState,
  getCaselistFilterMetadataFields, getCaselistFilterResultView, getCaselistFilterPageMetadata, getCaselistResultsCurrentPage,
  getSearchFilterToggleState } from '../../store/reducers';

export const getCaselistState = createSelector(
 getCaseFeatureState,
 (state: State) => state.caseList
);

export const caselistFilterJurisdiction = createSelector(
    getCaselistState,
    getCaselistFilterJurisdiction
);

export const caselistFilterCaseType = createSelector(
    getCaselistState,
    getCaselistFilterCaseType
);

export const caselistFilterCaseState = createSelector(
    getCaselistState,
    getCaselistFilterCaseState
);

export const caselistFilterMetadataFields = createSelector(
    getCaselistState,
    getCaselistFilterMetadataFields
);

export const caselistFilterResultView = createSelector(
    getCaselistState,
    getCaselistFilterResultView
);

export const getCaselistFilterPaginationMetadata = createSelector(
  getCaselistState,
  getCaselistFilterPageMetadata
);

export const getCaselistCurrentPage = createSelector(
  getCaselistState,
  getCaselistResultsCurrentPage
);

export const getCaselistFilterToggle = createSelector(
  getCaselistState,
  getSearchFilterToggleState
);
