import { reducerCreateCase, initialState } from './create-case.reducer';
import { ApplyChange, CaseCreateFilterApply, CreateCaseReset } from '../actions/create-case.action';

describe('CasesReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const state = reducerCreateCase(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('CREATE_CASE_APPLY action', () => {
    it('should set correct object', () => {
      const action = new ApplyChange({status: null, caseId: 1234});
      const state = reducerCreateCase(initialState, action);

      expect(state.loading).toEqual(false);
      expect(state.loaded).toEqual(true);
      expect(state.createdCase).toEqual({status: null, caseId: 1234});
    });
  });

  describe('CREATE_CASE_FILTER_APPLY action', () => {
    it('should set correct object', () => {
      const action = new CaseCreateFilterApply({jurisdiction: 'SSCS'});
      const state = reducerCreateCase(initialState, action);

      expect(state.loading).toEqual(false);
      expect(state.loaded).toEqual(true);
      expect(state.createCaseFilters).toEqual({jurisdiction: 'SSCS'});
    });
  });

  describe('CREATE_CASE_RESET action', () => {
    it('should reset to init', () => {
      const action = new CreateCaseReset();
      const state = reducerCreateCase(initialState, action);

      expect(state.loading).toEqual(false);
      expect(state.loaded).toEqual(false);
      expect(state.createCaseFilters).toEqual({});
      expect(state.createdCase).toEqual({});
    });
  });

});
