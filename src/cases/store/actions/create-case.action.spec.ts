import { ApplyChange, CREATE_CASE_APPLY, CreateCaseReset, CREATE_CASE_RESET, CreateCaseLoaded, CREATED_CASE_LOADED,
  CaseCreateFilterApply, CREATE_CASE_FILTER_APPLY, CaseCreateFilterChanged, CREATE_CASE_FILTER_CHANGED } from './create-case.action';

describe('Create Cases Actions', () => {
  describe('Create Cases', () => {
    describe('Apply Change', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new ApplyChange(payload);

        expect({ ...action }).toEqual({
          type: CREATE_CASE_APPLY,
          payload,
        });
      });
    });

    describe('Reset Change', () => {
      it('should create an action', () => {
        const action = new CreateCaseReset();

        expect({ ...action }).toEqual({
          type: CREATE_CASE_RESET,
        });
      });
    });

    describe('Case Create Loaded', () => {
      it('should create an action', () => {
        const caseId = 'caseId';
        const action = new CreateCaseLoaded(caseId);

        expect({ ...action }).toEqual({
          type: CREATED_CASE_LOADED,
          caseId
        });
      });
    });

    describe('Case Create Filter Apply', () => {
      it('should create an action', () => {
        const payload = {jurisdiction: 'SSCS'};
        const action = new CaseCreateFilterApply(payload);

        expect({ ...action }).toEqual({
          type: CREATE_CASE_FILTER_APPLY,
          payload
        });
      });
    });

    describe('Case Create Filter Changed', () => {
      it('should create an action', () => {
        const payload = {jurisdiction: 'SSCS'};
        const action = new CaseCreateFilterChanged(payload);

        expect({ ...action }).toEqual({
          type: CREATE_CASE_FILTER_CHANGED,
          payload
        });
      });
    });

  });

});
