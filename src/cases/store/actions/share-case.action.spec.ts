import * as fromCaseShare from './share-case.action';

describe('Case Share Actions', () => {
  describe('Case Share', () => {
    describe('AddShareCases', () => {
      it('should create an action', () => {
        const payload = {
          sharedCases: []
        };
        const action = new fromCaseShare.AddShareCases(payload);

        expect({ ...action }).toEqual({
          type: fromCaseShare.ADD_SHARE_CASES,
          payload
        });
      });
    });

    describe('DeleteAShareCase', () => {
      it('should create an action', () => {
        const payload = {
          caseId: '1'
        };
        const action = new fromCaseShare.DeleteAShareCase(payload);

        expect({ ...action }).toEqual({
          type: fromCaseShare.DELETE_A_SHARE_CASE,
          payload
        });
      });
    });

  });
});
