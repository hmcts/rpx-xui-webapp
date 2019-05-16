import * as fromCases from '../actions/case-search.action';

// todo this is just a place holder
export interface SearchState {
  someState: any;
  loading: boolean;
  loaded: boolean;
}

export const initialStateSearch: SearchState = {
  someState: {},
  loaded: false,
  loading: false,
};

export function reducer(
  state = initialStateSearch,
  action: fromCases.CaseSearchAction
): SearchState {
  switch (action.type) {

    case fromCases.JURISDICTION_SELECTED: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromCases.APPLIED: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromCases.RESET: {
      return {
        ...state,
        loading: true,
      };
    }

  }

  return state;
}
