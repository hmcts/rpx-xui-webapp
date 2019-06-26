import * as fromCases from '../actions/case-list.filter.action';



export interface CaseFilterState {
  loading: boolean;
  loaded: boolean;
    caseState: {
      id: string;
      name: string;
      description: string;
    };
    caseType: {
      id: string;
      name: string;
      description: string;
    };
    jurisdiction: {
      id: string;
      name: string;
      description: string;
    };
}

export const initialCaseFilterState: CaseFilterState = {
  loading: false,
  loaded: false,
  caseState: {
    id: '',
    name: '',
    description: ''
  },
  jurisdiction: {
    id: '',
    name: '',
    description: ''
  },
  caseType: {
    id: '',
    name: '',
    description: ''
  }
};

export function reducerCaseListFilter( state = initialCaseFilterState, action: fromCases.CaseListFilterAction): CaseFilterState {
  switch (action.type) {
    case fromCases.APPLYCASELISTFILTER: {
      return {
          ...state,
          loading: true,
          loaded: false,
          caseState: {...action.payload.selected.caseState},
          jurisdiction: {...action.payload.selected.jurisdiction},
          caseType: {...action.payload.selected.caseType}
      } as CaseFilterState;
    }

    case fromCases.RESETFILTER:
      return initialCaseFilterState;
  }
  return state;
}
