import * as fromCaseList from './case-list.action';

// Check testing
describe('Case List Actions', () => {
  // Check testing
describe('Case List', () => {
    // Check testing
describe('CaseListJurisdictionSelected', () => {
      it('should create an action', () => {
        const action = new fromCaseList.CaseListJurisdictionSelected();

        expect({ ...action }).toEqual({
          type: fromCaseList.CASELIST_JURISDICTION_SELECTED
        });
      });
    });

    // Check testing
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

    // Check testing
describe('CaseListReset', () => {
      it('should create an action', () => {
        const action = new fromCaseList.CaseListReset();

        expect({ ...action }).toEqual({
          type: fromCaseList.CASELIST_RESET
        });
      });
    });

    // Check testing
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

    // Check testing
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

    // Check testing
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

    // Check testing
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

    // Check testing
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
