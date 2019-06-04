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

  describe('RESET_CHANGE action', () => {
    it('should set loading to true', () => {
      const { initialState } = fromCases;
      const action = new fromActions.ResetChange();
      const state = fromCases.reducerCreateCase(initialState, action);

      expect(state.loading).toEqual(false);
      expect(state.loaded).toEqual(false);
    });
  });

});
