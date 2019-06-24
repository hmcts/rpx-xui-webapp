import * as fromCases from '../actions/case-list.filter.action';

export interface CaseFilterState {
  loading: boolean;
  loaded: boolean;
}

export function reducerCaseListFilter( state , action: fromCases.CaseListFilterAction): CaseFilterState {
  switch (action.type) {
    case fromCases.APPLYFILTER: {
      return {
          loading: false,
          loaded: true
      };
    }

    case fromCases.RESETFILTER:
      return null;
  }
  return state;
}
