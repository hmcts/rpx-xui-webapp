import { NewCaseLoadedSuccessfully, NEW_CASE_LOADED, CreateCaseGo, CREATE_CASE_GO, Back, BACK, Forward, FORWARD } from './router.action';

describe('Router Actions', () => {
  describe('NewCaseLoadedSuccessfully', () => {
    it('should create an action', () => {
      const action = new NewCaseLoadedSuccessfully();

      expect({ ...action }).toEqual({
        type: NEW_CASE_LOADED
      });
    });
  });

  describe('CreateCaseGo', () => {
    it('should create an action', () => {
      const payload = {path: [], caseId: ''};
      const action = new CreateCaseGo(payload);

      expect({ ...action }).toEqual({
        type: CREATE_CASE_GO,
        payload
      });
    });
  });

  describe('Back', () => {
    it('should create an action', () => {
      const action = new Back();

      expect({ ...action }).toEqual({
        type: BACK
      });
    });
  });

  describe('Forward', () => {
    it('should create an action', () => {
      const action = new Forward();

      expect({ ...action }).toEqual({
        type: FORWARD
      });
    });
  });

});
