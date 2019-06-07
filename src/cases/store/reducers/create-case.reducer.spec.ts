import * as fromCases from './create-case.reducer';
import * as fromActions from '../actions/create-case.action';

describe('CasesReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromCases;
      const action = {} as any;
      const state = fromCases.reducerCreateCase(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('APPLY_CHANGE action', () => {
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

});
