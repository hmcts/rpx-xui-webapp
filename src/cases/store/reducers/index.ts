import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

import * as fromCaseCreate from './create-case.reducer';
import * as fromCaseSearchFilters from './search-filter.reducer';
import * as fromCaseListFilters from './case-list-filter.reducer';

export interface State {
  caseCreate: fromCaseCreate.CasesState;
  caseSearchFilter: fromCaseSearchFilters.SearchState;
  caseListFilter: fromCaseListFilters.CaseFilterState;
}

export const reducers: ActionReducerMap<State> = {
  caseCreate: fromCaseCreate.reducerCreateCase,
  caseSearchFilter: fromCaseSearchFilters.reducer,
  caseListFilter: fromCaseListFilters.reducerCaseListFilter
};

export const getCaseFeatureState = createFeatureSelector<State>(
  'cases'
);

export * from './search-filter.reducer';
export * from './create-case.reducer';
export * from './case-list-filter.reducer';


