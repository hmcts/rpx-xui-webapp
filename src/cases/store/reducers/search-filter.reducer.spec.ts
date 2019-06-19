import * as fromFilter from './search-filter.reducer';
import * as fromActions from '../actions/case-search.action';

describe('Search Filter Reducer', () => {

  describe('Actions', () => {
    const dummy = {
      jurisdiction: {
        id: 'TEST',
      },
      metadataFields: {
        id: 'TEST',
      },
      caseType: {
        id: 'TEST',
      }
    };

    it('should set correct object', () => {
      const initialState = {};
      const action = new fromActions.Applied(dummy);
      const state = fromFilter.reducer(initialState, action);
      expect(state).toBeDefined();
    });
  });

  describe('RESET action', () => {
    it('should set correct object', () => {
      const initialState = {};
      const action = new fromActions.Reset();
      const state = fromFilter.reducer(initialState, action);
      expect(state).toBe(null);
    });
  });


});
