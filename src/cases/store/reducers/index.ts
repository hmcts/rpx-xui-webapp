import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

import * as fromCaseCreate from './create-case.reducer';
import * as fromCaseSearchFilters from './search-filter.reducer';
import * as fromCaseListFilters from './case-list.reducer';

export interface State {
  caseCreate: fromCaseCreate.CasesState;
  caseSearch: fromCaseSearchFilters.SearchState;
  caseList: fromCaseListFilters.CaselistState;
}

export const reducers: ActionReducerMap<State> = {
  caseCreate: fromCaseCreate.reducerCreateCase,
  caseSearch: fromCaseSearchFilters.reducer,
  caseList: fromCaseListFilters.caselistReducer
};

export const getCaseFeatureState = createFeatureSelector<State>(
  'cases'
);

export * from './search-filter.reducer';
export * from './create-case.reducer';
export * from './case-list.reducer';


