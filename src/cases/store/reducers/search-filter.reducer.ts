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

export function c(
  state = initialStateSearch,
  action: fromCases.CaseSearchAction
): SearchState {
  switch (action.type) {

    case fromCases.JURISTDICTION_SELECTED: {
      console.log('JURISTDICTION_SELECTED');
      return {
        ...state,
        loading: true,
      };
    }

    case fromCases.APPLIED: {
      console.log('APPLIED');
      return {
        ...state,
        loading: true,
      };
    }

    case fromCases.RESET: {
      console.log('RESET');
      return {
        ...state,
        loading: true,
      };
    }

  }

  return state;
}
