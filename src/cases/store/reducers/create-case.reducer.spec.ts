import * as fromActions from '../actions/create-case.action';
import * as fromCases from './create-case.reducer';

describe('CasesReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromCases;
      const action = {} as any;
      const state = fromCases.reducerCreateCase(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('CREATE_CASE_APPLY action', () => {
    it('should set correct object', () => {
      const { initialState } = fromCases;
      const action = new fromActions.ApplyChange({status: null, caseId: 1234});
      const state = fromCases.reducerCreateCase(initialState, action);

      expect(state.loading).toEqual(false);
      expect(state.loaded).toEqual(true);
      expect(state.createdCase).toEqual({status: null, caseId: 1234});
    });
  });

  describe('CREATE_CASE_FILTER_APPLY action', () => {
    it('should set correct object', () => {
      const { initialState } = fromCases;
      const action = new fromActions.CaseCreateFilterApply({jurisdiction: 'SSCS'});
      const state = fromCases.reducerCreateCase(initialState, action);

      expect(state.loading).toEqual(false);
      expect(state.loaded).toEqual(true);
      expect(state.createCaseFilters).toEqual({jurisdiction: 'SSCS'});
    });
  });

  describe('CREATE_CASE_RESET action', () => {
    it('should reset to init', () => {
      const { initialState } = fromCases;
      const action = new fromActions.CreateCaseReset();
      const state = fromCases.reducerCreateCase(initialState, action);

      expect(state.loading).toEqual(false);
      expect(state.loaded).toEqual(false);
      expect(state.createCaseFilters).toEqual({});
      expect(state.createdCase).toEqual({});
    });
  });

});
