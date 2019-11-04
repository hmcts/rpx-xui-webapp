import { CaseState, CaseType, Jurisdiction, PaginationMetadata, SearchResultView } from '@hmcts/ccd-case-ui-toolkit';
import * as fromCases from '../actions/case-search.action';

export class SearchStateFilter {
  public jurisdiction: Jurisdiction;
  public caseType: CaseType;
  public caseState: CaseState;
  public metadataFields: any;
  public page: number;
  constructor() {
    this.jurisdiction = new Jurisdiction();
    this.caseType = new CaseType();
    this.caseState = new CaseState();
    this.metadataFields = {};
    this.page = 1;
  }
}

export class SearchStateResults {
  public resultView: SearchResultView;

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
  action: fromCases.CaseSearchAction
): SearchState {
  switch (action.type) {
    case fromCases.APPLY_SEARCH_FILTER: {
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

    case fromCases.FIND_SEARCH_PAGINATION_METADATA_SUCCESS: {
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

    case fromCases.APPLY_SEARCH_FILTER_SUCCESS: {
      return {
        ...state,
        results: {
          resultView: action.payload
        },
        loading: true,
        loaded: false
      };
    }

    case fromCases.SEARCH_FILTER_DISPLAY_TOGGLE_SUCCESS: {
      return {
        ...state,
        showFilter: action.payload,
      };
    }

    case fromCases.RESET:
      return initialSearchState;

    default:
      return state;
  }
}

export const getSearchFilterJurisdiction = (state: SearchState) => state.filter.jurisdiction;
export const getSearchFilterCaseType = (state: SearchState) => state.filter.caseType;
export const getSearchFilterCaseState = (state: SearchState) => state.filter.caseState;
export const getSearchFilterMetadataFields = (state: SearchState) => state.filter.metadataFields;
export const getSearchFilterResultView = (state: SearchState) => state.results.resultView;
export const getSearchFilterPageMetadata = (state: SearchState) => state.paginationMetadata;
export const getSearchResultsCurrentPage = (state: SearchState) => state.filter.page;
export const getSearchFilterToggleState = (state: SearchState) => state.showFilter;
