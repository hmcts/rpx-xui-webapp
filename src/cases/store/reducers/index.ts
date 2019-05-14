import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

import * as fromCaseCreate from './cases.reducer';
import * as fromCaseSearchFilters from './search-filter.reducer';

export interface State {
  caseCreate: fromCaseCreate.CasesState;
  caseSearchFilter: fromCaseSearchFilters.SearchState;
}

export const reccers: ActionReducerMap<State> = {
  caseCreate: fromCaseCreate.reducer,
  caseSearchFilter: fromCaseSearchFilters.reducer
};

export const getCaseFeatureState = createFeatureSelector<State>(
  'cases'
);

