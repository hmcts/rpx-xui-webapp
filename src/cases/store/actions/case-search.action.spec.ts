import { JurisdictionSelected, JURISDICTION_SELECTED, Applied, APPLIED,
  Reset, RESET, ApplySearchFilter, APPLY_SEARCH_FILTER, ApplySearchFilterSuccess,
  APPLY_SEARCH_FILTER_SUCCESS, ApplySearchFilterFail, APPLY_SEARCH_FILTER_FAIL, FindSearchPaginationMetadata,
  FIND_SEARCH_PAGINATION_METADATA, SearchResultPageChange, SEARCH_RESULT_PAGE_CHANGE, FindSearchPaginationMetadataSuccess,
  FIND_SEARCH_PAGINATION_METADATA_SUCCESS, SearchFilterToggle, SEARCH_FILTER_DISPLAY_TOGGLE, SearchFilterToggleSuccess,
  SEARCH_FILTER_DISPLAY_TOGGLE_SUCCESS } from './case-search.action';

describe('Case Search Actions', () => {
  describe('Search Cases filter', () => {
    describe('Jurisdiction Selected', () => {
      it('should create an action', () => {
        const action = new JurisdictionSelected();
        expect(action.type).toBe(JURISDICTION_SELECTED);
      });
    });

    describe('Applied', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new Applied({});
        expect({ ...action }).toEqual({
          type: APPLIED,
          payload
        });
      });
    });

    describe('Reset', () => {
      it('should create an action', () => {
        const action = new Reset();

        expect({ ...action }).toEqual({
          type: RESET
        });
      });
    });

    describe('ApplySearchFilter', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new ApplySearchFilter(payload);
        expect({ ...action }).toEqual({
          type: APPLY_SEARCH_FILTER,
          payload
        });
      });
    });

    describe('ApplySearchFilterSuccess', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new ApplySearchFilterSuccess(payload);
        expect({ ...action }).toEqual({
          type: APPLY_SEARCH_FILTER_SUCCESS,
          payload
        });
      });
    });

    describe('ApplySearchFilterFail', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new ApplySearchFilterFail(payload);
        expect({ ...action }).toEqual({
          type: APPLY_SEARCH_FILTER_FAIL,
          payload
        });
      });
    });

    describe('FindSearchPaginationMetadata', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new FindSearchPaginationMetadata(payload);
        expect({ ...action }).toEqual({
          type: FIND_SEARCH_PAGINATION_METADATA,
          payload
        });
      });
    });

    describe('SearchResultPageChange', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new SearchResultPageChange(payload);
        expect({ ...action }).toEqual({
          type: SEARCH_RESULT_PAGE_CHANGE,
          payload
        });
      });
    });

    describe('FindSearchPaginationMetadataSuccess', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new FindSearchPaginationMetadataSuccess(payload);
        expect({ ...action }).toEqual({
          type: FIND_SEARCH_PAGINATION_METADATA_SUCCESS,
          payload
        });
      });
    });

    describe('SearchFilterToggle', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new SearchFilterToggle(payload);
        expect({ ...action }).toEqual({
          type: SEARCH_FILTER_DISPLAY_TOGGLE,
          payload
        });
      });
    });

    describe('SearchFilterToggleSuccess', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new SearchFilterToggleSuccess(payload);
        expect({ ...action }).toEqual({
          type: SEARCH_FILTER_DISPLAY_TOGGLE_SUCCESS,
          payload
        });
      });
    });

  });

});
