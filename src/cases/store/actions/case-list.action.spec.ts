import * as fromCaseList from './case-list.action';

describe('Case List Actions', () => {
  describe('Case List', () => {
    describe('CaseListJurisdictionSelected', () => {
      it('should create an action', () => {
        const action = new fromCaseList.CaseListJurisdictionSelected();

        expect({ ...action }).toEqual({
          type: fromCaseList.CASELIST_JURISDICTION_SELECTED
        });
      });
    });

    describe('CaseListApplied', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new fromCaseList.CaseListApplied(payload);

        expect({ ...action }).toEqual({
          type: fromCaseList.CASELIST_APPLIED,
          payload
        });
      });
    });

    describe('CaseListReset', () => {
      it('should create an action', () => {
        const action = new fromCaseList.CaseListReset();

        expect({ ...action }).toEqual({
          type: fromCaseList.CASELIST_RESET
        });
      });
    });

    describe('CaselistResultPageChange', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new fromCaseList.CaselistResultPageChange(payload);

        expect({ ...action }).toEqual({
          type: fromCaseList.CASELIST_RESULT_PAGE_CHANGE,
          payload
        });
      });
    });

    describe('FindCaselistPaginationMetadataSuccess', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new fromCaseList.FindCaselistPaginationMetadataSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromCaseList.FIND_CASELIST_PAGINATION_METADATA_SUCCESS,
          payload
        });
      });
    });

    describe('ApplyCaselistFilterSuccess', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new fromCaseList.ApplyCaselistFilterSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromCaseList.APPLY_CASELIST_FILTER_SUCCESS,
          payload
        });
      });
    });

    describe('ApplyCaselistFilterFail', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new fromCaseList.ApplyCaselistFilterFail(payload);

        expect({ ...action }).toEqual({
          type: fromCaseList.APPLY_CASELIST_FILTER_FAIL,
          payload
        });
      });
    });

    describe('CaseFilterToggleSuccess', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new fromCaseList.CaseFilterToggleSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromCaseList.CASE_FILTER_DISPLAY_TOGGLE_SUCCESS,
          payload
        });
      });
    });
  });
});
