import * as fromCases from '../actions/case-list.filter.action';

export interface CaseFilterState {
  loading: boolean;
  loaded: boolean;
  selected: {
    caseState: {id: string;  name: string; description: string},
    caseType: {
      id: string,
      name: string,
      description: string
    },
    jurisdiction: {
      id: string,
      name: string,
      description: string
    }
  };
}

const initialState: CaseFilterState = {
  loading: false,
  loaded: false,
  selected: {
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
  }
};

export function reducerCaseListFilter( state = initialState, action: fromCases.CaseListFilterAction): CaseFilterState {
  switch (action.type) {
    case fromCases.APPLYFILTER: {
     const caseType = {...action.payload.selected.caseType.id};
      debugger; 
      return {
          ...state,
          caseType,
          loading: true,
          loaded: false
      } as CaseFilterState;
    }

    case fromCases.RESETFILTER:
      return initialState;
  }
  return state;
}
