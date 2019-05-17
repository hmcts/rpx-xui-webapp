import * as fromCases from '../actions/create-cases.action';

export interface CreatedCaseModel {
  caseId: string;
  status: string;
}

export interface CasesState {
  createdCase: CreatedCaseModel | {};
  loading: boolean;
  loaded: boolean;
}

export const initialState: CasesState = {
  createdCase: {},
  loaded: false,
  loading: false,
};

export function reducer(
  state = initialState,
  action: fromCases.CreateCasesAction
): CasesState {
  switch (action.type) {

    case fromCases.APPLY_CHANGE: {
      return {
        ...state,
        createdCase: action.payload,
        loaded: true,
      };
    }

  }

  return state;
}
