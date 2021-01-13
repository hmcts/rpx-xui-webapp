import { createSelector } from '@ngrx/store';

import * as fromFeature from '../../store/reducers';

export const getCaselistState = createSelector(
 fromFeature.getCaseFeatureState,
 (state: fromFeature.State) => state.caseList
);

export const caselistFilterJurisdiction = createSelector(
    getCaselistState,
    fromFeature.getCaselistFilterJurisdiction
);

export const caselistFilterCaseType = createSelector(
    getCaselistState,
    fromFeature.getCaselistFilterCaseType
);

export const caselistFilterCaseState = createSelector(
    getCaselistState,
    fromFeature.getCaselistFilterCaseState
);

export const caselistFilterMetadataFields = createSelector(
    getCaselistState,
    fromFeature.getCaselistFilterMetadataFields
);

export const caselistFilterResultView = createSelector(
    getCaselistState,
    fromFeature.getCaselistFilterResultView
);

export const getCaselistFilterPaginationMetadata = createSelector(
  getCaselistState,
  fromFeature.getCaselistFilterPageMetadata
);

export const getCaselistCurrentPage = createSelector(
  getCaselistState,
  fromFeature.getCaselistResultsCurrentPage
);

export const getCaselistFilterToggle = createSelector(
  getCaselistState,
  fromFeature.getSearchFilterToggleState
);
