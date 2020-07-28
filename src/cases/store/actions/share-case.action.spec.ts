import * as fromCaseShare from './share-case.action';

describe('Case Share Actions', () => {
  describe('Case Share', () => {
    it('NavigateToShareCase', () => {
      const payload = [];
      const action = new fromCaseShare.NavigateToShareCase(payload);
      expect({...action}).toEqual({
        type: fromCaseShare.NAVIGATE_TO_SHARE_CASES,
        payload
      });
    });

    it('LoadUserFromOrgForCase', () => {
      const action = new fromCaseShare.LoadUserFromOrgForCase();
      expect({...action}).toEqual({
        type: fromCaseShare.LOAD_USERS_FROM_ORG_FOR_CASE
      });
    });

    it('LoadShareCase', () => {
      const payload = [];
      const action = new fromCaseShare.LoadShareCase(payload);
      expect({...action}).toEqual({
        type: fromCaseShare.LOAD_SHARE_CASES,
        payload
      });
    });

    it('LoadShareCaseSuccess', () => {
      const payload = [];
      const action = new fromCaseShare.LoadShareCaseSuccess(payload);
      expect({...action}).toEqual({
        type: fromCaseShare.LOAD_SHARE_CASES_SUCCESS,
        payload
      });
    });

    it('LoadUserFromOrgForCaseSuccess', () => {
      const payload = [];
      const action = new fromCaseShare.LoadUserFromOrgForCaseSuccess(payload);
      expect({...action}).toEqual({
        type: fromCaseShare.LOAD_USERS_FROM_ORG_FOR_CASE_SUCCESS,
        payload
      });
    });

    it('LoadShareCaseFailure', () => {
      const payload: Error = new Error();
      const action = new fromCaseShare.LoadShareCaseFailure(payload);
      expect({...action}).toEqual({
        type: fromCaseShare.LOAD_SHARE_CASES_FAILURE,
        payload
      });
    });

    it('AddShareCases', () => {
      const payload = {
        sharedCases: []
      };
      const action = new fromCaseShare.AddShareCases(payload);
      expect({...action}).toEqual({
        type: fromCaseShare.ADD_SHARE_CASES,
        payload
      });
    });

    it('AddShareCaseGo', () => {
      const payload = {
        path: [],
        sharedCases: []
      };
      const action = new fromCaseShare.AddShareCaseGo(payload);
      expect({...action}).toEqual({
        type: fromCaseShare.ADD_SHARE_CASE_GO,
        payload
      });
    });

    it('DeleteAShareCase', () => {
      const payload = {
        caseId: '1'
      };
      const action = new fromCaseShare.DeleteAShareCase(payload);
      expect({...action}).toEqual({
        type: fromCaseShare.DELETE_A_SHARE_CASE,
        payload
      });
    });

    it('SynchronizeStateToStore', () => {
      const payload = [];
      const action = new fromCaseShare.SynchronizeStateToStore(payload);
      expect({...action}).toEqual({
        type: fromCaseShare.SYNCHRONIZE_STATE_TO_STORE,
        payload
      });
    });

    it('AssignUsersToCase', () => {
      const payload = [];
      const action = new fromCaseShare.AssignUsersToCase(payload);
      expect({...action}).toEqual({
        type: fromCaseShare.ASSIGN_USERS_TO_CASE,
        payload
      });
    });

  });
});
