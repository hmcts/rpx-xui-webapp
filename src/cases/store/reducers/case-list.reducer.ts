import { SearchResultView, Jurisdiction, CaseType, CaseState, PaginationMetadata } from '@hmcts/ccd-case-ui-toolkit';
import { CaselistAction, APPLY_CASELIST_FILTER, FIND_CASELIST_PAGINATION_METADATA_SUCCESS, APPLY_CASELIST_FILTER_SUCCESS, CASE_FILTER_DISPLAY_TOGGLE_SUCCESS, CASELIST_RESET } from '../actions/case-list.action';

export class CaselistStateFilter {
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

export class CaselistStateResults {
  resultView: SearchResultView;

  constructor() {
    this.resultView = new SearchResultView();
  }
}

export interface CaselistState {
  filter: CaselistStateFilter;
  results: CaselistStateResults;
  paginationMetadata: PaginationMetadata;
  showFilter: boolean;
  loading: boolean;
  loaded: boolean;
}

export const initialCaselistState: CaselistState = {
  filter: new CaselistStateFilter(),
  results: new CaselistStateResults(),
  paginationMetadata: {
    total_pages_count: 0,
    total_results_count: 0
  },
  showFilter: true,
  loading: false,
  loaded: false,
};

export function caselistReducer(
  state = initialCaselistState,
  action: CaselistAction
): CaselistState {
  switch (action.type) {
    case APPLY_CASELIST_FILTER: {
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

    case FIND_CASELIST_PAGINATION_METADATA_SUCCESS: {
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

    case APPLY_CASELIST_FILTER_SUCCESS: {
      return {
        ...state,
        results: {
          resultView: action.payload
        },
        loading: true,
        loaded: false
      };
    }

    case CASE_FILTER_DISPLAY_TOGGLE_SUCCESS: {
      return {
        ...state,
        showFilter: action.payload,
      };
    }

    case CASELIST_RESET:
      return initialCaselistState;
  }
  return state;
}

export const getCaselistFilterJurisdiction = (state) => state.filter.jurisdiction;
export const getCaselistFilterCaseType = (state) => state.filter.caseType;
export const getCaselistFilterCaseState = (state) => state.filter.caseState;
export const getCaselistFilterMetadataFields = (state) => state.filter.metadataFields;
export const getCaselistFilterResultView = (state) => state.results.resultView;
export const getCaselistFilterPageMetadata = (state) => state.paginationMetadata;
export const getCaselistResultsCurrentPage = (state) => state.filter.page;
export const getCaselistFilterToggleState = (state) => state.showFilter;
