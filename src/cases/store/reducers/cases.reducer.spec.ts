import * as fromCases from './cases.reducer';
import * as fromActions from '../actions/create-cases.action';
;

describe('CasesReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromCases;
      const action = {} as any;
      const state = fromCases.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('RESET_CHANGE action', () => {
    it('should set loading to true', () => {
      const { initialState } = fromCases;
      const action = new fromActions.ResetChange();
      const state = fromCases.reducer(initialState, action);

      expect(state.loading).toEqual(true);
      expect(state.loaded).toEqual(false);
    });
  });

});
