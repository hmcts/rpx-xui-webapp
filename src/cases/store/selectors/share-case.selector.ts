import { createSelector } from '@ngrx/store';

import * as fromFeature from '../../store/reducers';

export const getCaseShareState = createSelector(
  fromFeature.getCaseFeatureState,
  (state: fromFeature.State) => state.caseShare
);

export const getShareCaseListState = createSelector(
  getCaseShareState,
  fromFeature.getShareCases
);

export const getOrganisationUsersState = createSelector(
  getCaseShareState,
  fromFeature.getOrganisationUsers
);
