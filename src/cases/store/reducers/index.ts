import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

import * as fromCaseListFilters from './case-list.reducer';
import * as fromCaseCreate from './create-case.reducer';
import * as fromOrganisations from './organisations-list.reducer';
import * as fromCaseSearchFilters from './search-filter.reducer';
import * as fromCaseShare from './share-case.reducer';

export interface State {
  caseCreate: fromCaseCreate.CasesState;
  caseSearch: fromCaseSearchFilters.SearchState;
  caseList: fromCaseListFilters.CaselistState;
  caseShare: fromCaseShare.ShareCasesState;
  organisationsList: fromOrganisations.OrganisationsState;
}

export const reducers: ActionReducerMap<State> = {
  caseCreate: fromCaseCreate.reducerCreateCase,
  caseSearch: fromCaseSearchFilters.reducer,
  caseList: fromCaseListFilters.caselistReducer,
  caseShare: fromCaseShare.shareCasesReducer,
  organisationsList: fromOrganisations.organisationsListReducer
};

export const getCaseFeatureState = createFeatureSelector<State>(
  'cases'
);

export * from './search-filter.reducer';
export * from './create-case.reducer';
export * from './case-list.reducer';
export * from './share-case.reducer';
export * from './organisations-list.reducer';
