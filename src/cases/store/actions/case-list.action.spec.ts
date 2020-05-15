import { CaseListJurisdictionSelected, CASELIST_JURISDICTION_SELECTED, CaseListApplied, CASELIST_APPLIED, CaseListReset,
  CASELIST_RESET, CaselistResultPageChange, CASELIST_RESULT_PAGE_CHANGE, FindCaselistPaginationMetadataSuccess,
  FIND_CASELIST_PAGINATION_METADATA_SUCCESS, ApplyCaselistFilterSuccess, APPLY_CASELIST_FILTER_SUCCESS,
  ApplyCaselistFilterFail, APPLY_CASELIST_FILTER_FAIL, CaseFilterToggleSuccess, CASE_FILTER_DISPLAY_TOGGLE_SUCCESS } from './case-list.action';

describe('Case List Actions', () => {
  describe('Case List', () => {
    describe('CaseListJurisdictionSelected', () => {
      it('should create an action', () => {
        const action = new CaseListJurisdictionSelected();

        expect({ ...action }).toEqual({
          type: CASELIST_JURISDICTION_SELECTED
        });
      });
    });

    describe('CaseListApplied', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new CaseListApplied(payload);

        expect({ ...action }).toEqual({
          type: CASELIST_APPLIED,
          payload
        });
      });
    });

    describe('CaseListReset', () => {
      it('should create an action', () => {
        const action = new CaseListReset();

        expect({ ...action }).toEqual({
          type: CASELIST_RESET
        });
      });
    });

    describe('CaselistResultPageChange', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new CaselistResultPageChange(payload);

        expect({ ...action }).toEqual({
          type: CASELIST_RESULT_PAGE_CHANGE,
          payload
        });
      });
    });

    describe('FindCaselistPaginationMetadataSuccess', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new FindCaselistPaginationMetadataSuccess(payload);

        expect({ ...action }).toEqual({
          type: FIND_CASELIST_PAGINATION_METADATA_SUCCESS,
          payload
        });
      });
    });

    describe('ApplyCaselistFilterSuccess', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new ApplyCaselistFilterSuccess(payload);

        expect({ ...action }).toEqual({
          type: APPLY_CASELIST_FILTER_SUCCESS,
          payload
        });
      });
    });

    describe('ApplyCaselistFilterFail', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new ApplyCaselistFilterFail(payload);

        expect({ ...action }).toEqual({
          type: APPLY_CASELIST_FILTER_FAIL,
          payload
        });
      });
    });

    describe('CaseFilterToggleSuccess', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new CaseFilterToggleSuccess(payload);

        expect({ ...action }).toEqual({
          type: CASE_FILTER_DISPLAY_TOGGLE_SUCCESS,
          payload
        });
      });
    });

  });
});
