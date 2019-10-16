import * as fromRouter from './router.action';

describe('Router Actions', () => {
  describe('NewCaseLoadedSuccessfully', () => {
    it('should create an action', () => {
      const action = new fromRouter.NewCaseLoadedSuccessfully();

      expect({ ...action }).toEqual({
        type: fromRouter.NEW_CASE_LOADED
      });
    });
  });

  describe('CreateCaseGo', () => {
    it('should create an action', () => {
      const payload = {path: [], caseId: ''};
      const action = new fromRouter.CreateCaseGo(payload);

      expect({ ...action }).toEqual({
        type: fromRouter.CREATE_CASE_GO,
        payload
      });
    });
  });

  describe('Back', () => {
    it('should create an action', () => {
      const action = new fromRouter.Back();

      expect({ ...action }).toEqual({
        type: fromRouter.BACK
      });
    });
  });

  describe('Forward', () => {
    it('should create an action', () => {
      const action = new fromRouter.Forward();

      expect({ ...action }).toEqual({
        type: fromRouter.FORWARD
      });
    });
  });

});
