import * as fromCreateCases from './create-case.action';

describe('Create Cases Actions', () => {
  describe('Create Cases', () => {
    // Check testing
    describe('Apply Change', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new fromCreateCases.ApplyChange(payload);

        expect({ ...action }).toEqual({
          type: fromCreateCases.CREATE_CASE_APPLY,
          payload
        });
      });
    });

    describe('Reset Change', () => {
      it('should create an action', () => {
        const action = new fromCreateCases.CreateCaseReset();

        expect({ ...action }).toEqual({
          type: fromCreateCases.CREATE_CASE_RESET
        });
      });
    });

    describe('Case Create Loaded', () => {
      it('should create an action', () => {
        const caseId = 'caseId';
        const action = new fromCreateCases.CreateCaseLoaded(caseId);

        expect({ ...action }).toEqual({
          type: fromCreateCases.CREATED_CASE_LOADED,
          caseId
        });
      });
    });

    describe('Case Create Filter Apply', () => {
      it('should create an action', () => {
        const payload = { jurisdiction: 'SSCS' };
        const action = new fromCreateCases.CaseCreateFilterApply(payload);

        expect({ ...action }).toEqual({
          type: fromCreateCases.CREATE_CASE_FILTER_APPLY,
          payload
        });
      });
    });

    describe('Case Create Filter Changed', () => {
      it('should create an action', () => {
        const payload = { jurisdiction: 'SSCS' };
        const action = new fromCreateCases.CaseCreateFilterChanged(payload);

        expect({ ...action }).toEqual({
          type: fromCreateCases.CREATE_CASE_FILTER_CHANGED,
          payload
        });
      });
    });
  });
});
