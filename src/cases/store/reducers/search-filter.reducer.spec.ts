import * as fromFilter from './search-filter.reducer';
import * as fromActions from '../actions/case-search.action';
import {Entity} from '../../../app/store/helpers/entity';
import {SearchState} from './search-filter.reducer';
export const initialState: SearchState = {
  metadataFields: new Entity({}),
  jurisdiction: new Entity({}),
  caseType: new Entity({}),
  loaded: false,
  loading: false
};

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

    it('should return the default state', () => {
      const action = {} as any;
      const state = fromFilter.reducer(initialState, action);

      expect(state).toBe(initialState);
    });

    it('should set correct object', () => {
      const action = new fromActions.Applied(dummy);
      const state = fromFilter.reducer(initialState, action);
      expect(state).toBeDefined();
    });
  });

  describe('RESET action', () => {
    it('should set correct object', () => {
      const action = new fromActions.Reset();
      const state = fromFilter.reducer(initialState, action);
      expect(state).toBe(null);
    });
  });


});
