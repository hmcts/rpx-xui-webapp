import { CreateCasesAction, CREATE_CASE_APPLY, CREATE_CASE_FILTER_APPLY, CREATE_CASE_RESET } from '../actions/create-case.action';

export interface CreatedCaseModel {
  caseId: string;
  status: string;
}

export interface CasesState {
  createdCase: CreatedCaseModel | {};
  createCaseFilters: any;
  loading: boolean;
  loaded: boolean;
}

export const initialState: CasesState = {
  createdCase: {},
  createCaseFilters: {},
  loaded: false,
  loading: false,
};

export function reducerCreateCase(
  state = initialState,
  action: CreateCasesAction
): CasesState {
  switch (action.type) {

    case CREATE_CASE_APPLY: {
      return {
        ...state,
        createdCase: action.payload,
        loaded: true,
      };
    }

    case CREATE_CASE_FILTER_APPLY: {
      return {
        ...state,
        createCaseFilters: action.payload,
        loaded: true,
      };
    }

    case CREATE_CASE_RESET: {
      return {
        ...state,
        ...initialState
      };
    }

  }

  return state;
}


export const getCreatedCase = (state: CasesState) => state.createdCase;
export const  getCaseFiltersState = (state: CasesState) => state.createCaseFilters;
