import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

import * as fromCaseCreate from './create-case.reducer';
import * as fromCaseSearchFilters from './search-filter.reducer';

export interface State {
  caseCreate: fromCaseCreate.CasesState;
  caseSearchFilter: fromCaseSearchFilters.SearchState;
}

export const reducers: ActionReducerMap<State> = {
  caseCreate: fromCaseCreate.reducerCreateCase,
  caseSearchFilter: fromCaseSearchFilters.reducer
};

export const getCaseFeatureState = createFeatureSelector<State>(
  'cases'
);

export * from './search-filter.reducer';
export * from './create-case.reducer';



