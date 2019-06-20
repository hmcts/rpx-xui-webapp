import { Entity } from '../../../app/store/helpers/entity';
import { SearchResultView } from '@hmcts/ccd-case-ui-toolkit';
import * as fromCases from '../actions/case-search.action';

// todo this is just a place holder
export interface SearchState {
  metadataFields: Entity;
  jurisdiction: Entity;
  caseType: Entity;
  loading: boolean;
  loaded: boolean;
  resultView: SearchResultView;
}

export const initialSearchState: SearchState = {
  metadataFields: null,
  jurisdiction: null,
  caseType: null,
  loading: false,
  loaded: false,
  resultView: null
};

export function reducer(
  state = initialSearchState,
  action: fromCases.CaseSearchAction
): SearchState {
  switch (action.type) {
    case fromCases.APPLY_SEARCH_FILTER: {
      return {
        ...state,
        metadataFields: new Entity(action.payload.metadataFields),
        jurisdiction: new Entity(action.payload.jurisdiction),
        caseType: new Entity(action.payload.caseType),
        loading: true,
        loaded: false
      };
    }

    case fromCases.APPLY_SEARCH_FILTER_SUCCESS: {
      return {
        ...state,
        metadataFields: new Entity(action.payload.metadataFields),
        jurisdiction: new Entity(action.payload.jurisdiction),
        caseType: new Entity(action.payload.caseType),
        resultView: action.payload,
        loading: false,
        loaded: true
      };
    }

    case fromCases.RESET:
      return initialSearchState;
  }
  return state;
}

