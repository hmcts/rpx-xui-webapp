import { createSelector } from '@ngrx/store';

import { getCaseFeatureState, State, getCaseFiltersState } from '../../store/reducers';

export const getCreateCaseState = createSelector(
  getCaseFeatureState,
  (state: State) => state.caseCreate
);

export const getCreateCaseFilterState = createSelector(
  getCreateCaseState,
  getCaseFiltersState
);

