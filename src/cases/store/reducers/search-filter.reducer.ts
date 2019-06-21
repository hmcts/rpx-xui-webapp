import { SearchResultView, Jurisdiction, CaseType, CaseState, PaginationMetadata } from '@hmcts/ccd-case-ui-toolkit';
import * as fromCases from '../actions/case-search.action';
import { FormGroup } from '@angular/forms';

export class SearchStateFilter {
  jurisdiction: Jurisdiction;
  caseType: CaseType;
  caseState: CaseState;
  metadataFields: any;

  constructor() {
    this.jurisdiction = new Jurisdiction();
    this.caseType = new CaseType();
    this.caseState = new CaseState();
    this.metadataFields = {};
  }
}

export class SearchStateResults {
  resultView: SearchResultView;

  constructor() {
    this.resultView = new SearchResultView();
  }
}

export interface SearchState {
  filter: SearchStateFilter;
  results: SearchStateResults;
  loading: boolean;
  loaded: boolean;
}

export const initialSearchState: SearchState = {
  filter: new SearchStateFilter(),
  results: new SearchStateResults(),
  loading: false,
  loaded: false,
};

export function reducer(
  state = initialSearchState,
  action: fromCases.CaseSearchAction
): SearchState {
  switch (action.type) {
    case fromCases.APPLY_SEARCH_FILTER: {
      return {
        ...state,
        filter: {
          metadataFields: action.payload.metadataFields,
          jurisdiction: action.payload.jurisdiction,
          caseType: action.payload.caseType,
          caseState: action.payload.caseState ? action.payload.caseState : null
        },
        loading: true,
        loaded: false
      };
    }

    case fromCases.APPLY_SEARCH_FILTER_SUCCESS: {
      return {
        ...state,
        results: {
          resultView: action.payload
        },
        loading: false,
        loaded: true
      };
    }

    case fromCases.RESET:
      return initialSearchState;
  }
  return state;
}

export const getSearchFilterJurisdiction = (state) => state.caseSearchFilter.filter.jurisdiction;
export const getSearchFilterCaseType = (state) => state.caseSearchFilter.filter.caseType;
export const getSearchFilterCaseState = (state) => state.caseSearchFilter.filter.caseState;
export const getSearchFilterMetadataFields = (state) => state.caseSearchFilter.filter.metadataFields;
export const getSearchFilterResultView = (state) => state.caseSearchFilter.results.resultView;
