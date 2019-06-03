import * as fromCases from './search-filter.reducer';
import * as fromActions from '../actions/case-search.action';

describe('SearchFilterReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialStateSearch } = fromCases;
      const action = {} as any;
      const state = fromCases.reducer(undefined, action);

      expect(state).toBe(initialStateSearch);
    });
  });

  describe('APPLIED action', () => {
    it('should apply patload to store', () => {
      const { initialStateSearch } = fromCases;
      const payload = {jurisdiction: true};
      const action = new fromActions.Applied(payload);
      const state = fromCases.reducer(initialStateSearch, action);
      expect(state.loaded).toEqual(true);
    });
  });

});
