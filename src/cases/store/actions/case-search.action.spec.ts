import * as fromCaseSearch from './case-search.action';

describe('Case Search Actions', () => {
  describe('Search Cases filter', () => {
    describe('Jurisdiction Selected', () => {
      it('should create an action', () => {
        const action = new fromCaseSearch.JurisdictionSelected();
        expect(action.type).toBe(fromCaseSearch.JURISDICTION_SELECTED);
      });
    });

    describe('Applied', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new fromCaseSearch.Applied({});
        expect({ ...action }).toEqual({
          type: fromCaseSearch.APPLIED,
          payload
        });
      });
    });

    describe('Reset', () => {
      it('should create an action', () => {
        const action = new fromCaseSearch.Reset();

        expect({ ...action }).toEqual({
          type: fromCaseSearch.RESET
        });
      });
    });

    describe('ApplySearchFilter', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new fromCaseSearch.ApplySearchFilter(payload);
        expect({ ...action }).toEqual({
          type: fromCaseSearch.APPLY_SEARCH_FILTER,
          payload
        });
      });
    });

    describe('ApplySearchFilterSuccess', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new fromCaseSearch.ApplySearchFilterSuccess(payload);
        expect({ ...action }).toEqual({
          type: fromCaseSearch.APPLY_SEARCH_FILTER_SUCCESS,
          payload
        });
      });
    });

    describe('ApplySearchFilterFail', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new fromCaseSearch.ApplySearchFilterFail(payload);
        expect({ ...action }).toEqual({
          type: fromCaseSearch.APPLY_SEARCH_FILTER_FAIL,
          payload
        });
      });
    });

    describe('FindSearchPaginationMetadata', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new fromCaseSearch.FindSearchPaginationMetadata(payload);
        expect({ ...action }).toEqual({
          type: fromCaseSearch.FIND_SEARCH_PAGINATION_METADATA,
          payload
        });
      });
    });

    describe('SearchResultPageChange', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new fromCaseSearch.SearchResultPageChange(payload);
        expect({ ...action }).toEqual({
          type: fromCaseSearch.SEARCH_RESULT_PAGE_CHANGE,
          payload
        });
      });
    });

    describe('FindSearchPaginationMetadataSuccess', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new fromCaseSearch.FindSearchPaginationMetadataSuccess(payload);
        expect({ ...action }).toEqual({
          type: fromCaseSearch.FIND_SEARCH_PAGINATION_METADATA_SUCCESS,
          payload
        });
      });
    });

    describe('SearchFilterToggle', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new fromCaseSearch.SearchFilterToggle(payload);
        expect({ ...action }).toEqual({
          type: fromCaseSearch.SEARCH_FILTER_DISPLAY_TOGGLE,
          payload
        });
      });
    });

    describe('SearchFilterToggleSuccess', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new fromCaseSearch.SearchFilterToggleSuccess(payload);
        expect({ ...action }).toEqual({
          type: fromCaseSearch.SEARCH_FILTER_DISPLAY_TOGGLE_SUCCESS,
          payload
        });
      });
    });
  });
});
