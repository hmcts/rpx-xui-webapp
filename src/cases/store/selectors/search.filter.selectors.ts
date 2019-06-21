import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromFeature from '../../store/reducers';

const getSearchFilterState = createFeatureSelector<fromFeature.SearchState>('cases');

export const getSearchState = createSelector(
 fromFeature.getCaseFeatureState,
 (state: fromFeature.State) => state.caseSearchFilter
);

export const searchFilterJurisdiction = createSelector(
    getSearchFilterState,
    fromFeature.getSearchFilterJurisdiction
);

export const searchFilterCaseType = createSelector(
    getSearchFilterState,
    fromFeature.getSearchFilterCaseType
);

export const searchFilterCaseState = createSelector(
    getSearchFilterState,
    fromFeature.getSearchFilterCaseState
);

export const searchFilterMetadataFields = createSelector(
    getSearchFilterState,
    fromFeature.getSearchFilterMetadataFields
);

export const searchFilterResultView = createSelector(
    getSearchFilterState,
    fromFeature.getSearchFilterResultView
);
