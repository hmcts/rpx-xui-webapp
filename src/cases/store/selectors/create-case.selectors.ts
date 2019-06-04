import { createSelector } from '@ngrx/store';

import * as fromFeature from '../../store';

export const getCreateCaseState = createSelector(
  fromFeature.getCaseFeatureState,
  (state: fromFeature.State) => state.caseCreate
);

export const getCreateCaseFilterState = createSelector(
  getCreateCaseState,
  fromFeature.getCaseFiltersState
);

