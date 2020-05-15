import { initialSearchState, reducer, getSearchFilterJurisdiction, getSearchFilterCaseType, getSearchFilterCaseState, getSearchFilterMetadataFields, getSearchFilterResultView } from './search-filter.reducer';
import { ApplySearchFilter, ApplySearchFilterSuccess, Reset } from '../actions/case-search.action';
import { mockedSearchFilters, mockedSearchFiltersCaseState } from '../../../cases/mock/search-filter.mock';
import { CaseState, CaseType, Jurisdiction, SearchResultView } from '@hmcts/ccd-case-ui-toolkit';

describe('Search Filter Reducer', () => {

  describe('Actions', () => {

    it('should set correct object', () => {
      const initialState = initialSearchState;
      const action = new ApplySearchFilter({selected: {filter: mockedSearchFilters}});
      const state = reducer(initialState, action);
      expect(state).toBeDefined();
    });

    it('should set correct object with caseState', () => {
      const initialState = initialSearchState;
      const action = new ApplySearchFilter({selected: {filter: mockedSearchFiltersCaseState}});
      const state = reducer(initialState, action);
      expect(state).toBeDefined();
    });

    it('should set correct object for success', () => {
      const initialState = initialSearchState;
      const action = new ApplySearchFilterSuccess(mockedSearchFilters);
      const state = reducer(initialState, action);
      expect(state).toBeDefined();
    });
  });

  describe('Get functions', () => {
    it('should get state properties', () => {
      const initialState = initialSearchState;
      expect(getSearchFilterJurisdiction(initialState)).toEqual(new Jurisdiction());
      expect(getSearchFilterCaseType(initialState)).toEqual(new CaseType());
      expect(getSearchFilterCaseState(initialState)).toEqual(new CaseState());
      expect(getSearchFilterMetadataFields(initialState)).toEqual({});
      expect(getSearchFilterResultView(initialState)).toEqual(new SearchResultView());
    });
  });

  describe('RESET action', () => {
    it('should set correct object', () => {
      const initialState = initialSearchState;
      const action = new Reset();
      const state = reducer(initialState, action);
      expect(state).toBe(initialState);
    });
  });


});
