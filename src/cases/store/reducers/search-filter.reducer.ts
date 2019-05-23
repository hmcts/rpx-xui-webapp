import * as fromCases from '../actions/case-search.action';

// todo this is just a place holder
export interface SearchState {
  searchFilterCriteria: any;
  loading: boolean;
  loaded: boolean;
}

export const initialStateSearch: SearchState = {
  searchFilterCriteria: {},
  loaded: false,
  loading: false,
};

export function reducer(
  state = initialStateSearch,
  action: fromCases.CaseSearchAction
): SearchState {
  switch (action.type) {
    case fromCases.APPLIED: {
      const searchFilterCriteria = action.payload.jurisdiction;
      return {
          ...state,
          searchFilterCriteria,
          loaded: true
      };
    }
  }
  return state;
}
