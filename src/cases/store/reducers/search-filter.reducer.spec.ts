import { CaseState, CaseType, Jurisdiction, SearchResultView } from '@hmcts/ccd-case-ui-toolkit';
import { mockedSearchFilters, mockedSearchFiltersCaseState } from '../../../cases/mock/search-filter.mock';
import * as fromActions from '../actions/case-search.action';
import * as fromFilter from './search-filter.reducer';

describe('Search Filter Reducer', () => {

  describe('Actions', () => {

    it('should set correct object', () => {
      const initialState = fromFilter.initialSearchState;
      const action = new fromActions.ApplySearchFilter({selected: {filter: mockedSearchFilters}});
      const state = fromFilter.reducer(initialState, action);
      expect(state).toBeDefined();
    });

    it('should set correct object with caseState', () => {
      const initialState = fromFilter.initialSearchState;
      const action = new fromActions.ApplySearchFilter({selected: {filter: mockedSearchFiltersCaseState}});
      const state = fromFilter.reducer(initialState, action);
      expect(state).toBeDefined();
    });

    it('should set correct object for success', () => {
      const initialState = fromFilter.initialSearchState;
      const action = new fromActions.ApplySearchFilterSuccess(mockedSearchFilters);
      const state = fromFilter.reducer(initialState, action);
      expect(state).toBeDefined();
    });
  });

  describe('Get functions', () => {
    it('should get state properties', () => {
      const initialState = fromFilter.initialSearchState;
      expect(fromFilter.getSearchFilterJurisdiction(initialState)).toEqual(new Jurisdiction());
      expect(fromFilter.getSearchFilterCaseType(initialState)).toEqual(new CaseType());
      expect(fromFilter.getSearchFilterCaseState(initialState)).toEqual(new CaseState());
      expect(fromFilter.getSearchFilterMetadataFields(initialState)).toEqual({});
      expect(fromFilter.getSearchFilterResultView(initialState)).toEqual(new SearchResultView());
    });
  });

  describe('RESET action', () => {
    it('should set correct object', () => {
      const initialState = fromFilter.initialSearchState;
      const action = new fromActions.Reset();
      const state = fromFilter.reducer(initialState, action);
      expect(state).toBe(initialState);
    });
  });


});
