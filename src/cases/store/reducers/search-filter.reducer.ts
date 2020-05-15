import { SearchResultView, Jurisdiction, CaseType, CaseState, PaginationMetadata } from '@hmcts/ccd-case-ui-toolkit';
import { CaseSearchAction, APPLY_SEARCH_FILTER, FIND_SEARCH_PAGINATION_METADATA_SUCCESS, APPLY_SEARCH_FILTER_SUCCESS, SEARCH_FILTER_DISPLAY_TOGGLE_SUCCESS, RESET } from '../actions/case-search.action';

export class SearchStateFilter {
  jurisdiction: Jurisdiction;
  caseType: CaseType;
  caseState: CaseState;
  metadataFields: any;
  page: number;
  constructor() {
    this.jurisdiction = new Jurisdiction();
    this.caseType = new CaseType();
    this.caseState = new CaseState();
    this.metadataFields = {};
    this.page = 1;
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
  paginationMetadata: PaginationMetadata;
  showFilter: boolean;
  loading: boolean;
  loaded: boolean;
}

export const initialSearchState: SearchState = {
  filter: new SearchStateFilter(),
  results: new SearchStateResults(),
  paginationMetadata: {
    total_pages_count: 0,
    total_results_count: 0
  },
  showFilter: true,
  loading: false,
  loaded: false
};

export function reducer(
  state = initialSearchState,
  action: CaseSearchAction
): SearchState {
  switch (action.type) {
    case APPLY_SEARCH_FILTER: {
      return {
        ...state,
        filter: {
          metadataFields: action.payload.selected.metadataFields,
          jurisdiction: action.payload.selected.jurisdiction,
          caseType: action.payload.selected.caseType,
          caseState: action.payload.selected.caseState ? action.payload.selected.caseState : null,
          page: action.payload.selected.page
        },
        loading: true,
        loaded: false
      };
    }

    case FIND_SEARCH_PAGINATION_METADATA_SUCCESS: {
      return {
        ...state,
        paginationMetadata: {
          total_pages_count: action.payload.total_pages_count,
          total_results_count: action.payload.total_results_count
        },
        loading: true,
        loaded: false
      };
    }

    case APPLY_SEARCH_FILTER_SUCCESS: {
      return {
        ...state,
        results: {
          resultView: action.payload
        },
        loading: true,
        loaded: false
      };
    }

    case SEARCH_FILTER_DISPLAY_TOGGLE_SUCCESS: {
      return {
        ...state,
        showFilter: action.payload,
      };
    }

    case RESET:
      return initialSearchState;
  }
  return state;
}

export const getSearchFilterJurisdiction = (state) => state.filter.jurisdiction;
export const getSearchFilterCaseType = (state) => state.filter.caseType;
export const getSearchFilterCaseState = (state) => state.filter.caseState;
export const getSearchFilterMetadataFields = (state) => state.filter.metadataFields;
export const getSearchFilterResultView = (state) => state.results.resultView;
export const getSearchFilterPageMetadata = (state) => state.paginationMetadata;
export const getSearchResultsCurrentPage = (state) => state.filter.page;
export const getSearchFilterToggleState = (state) => state.showFilter;
