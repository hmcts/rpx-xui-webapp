import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

import * as fromCaseCreate from './create-case.reducer';
import * as fromCaseSearchFilters from './search-filter.reducer';

export interface State {
  caseCreate: fromCaseCreate.CasesState;
  caseSearchFilter: fromCaseSearchFilters.SearchState;
}

export const reducers: ActionReducerMap<State> = {
  caseCreate: fromCaseCreate.reducer,
  caseSearchFilter: fromCaseSearchFilters.reducer
};

export const getCaseFeatureState = createFeatureSelector<State>(
  'cases'
);


