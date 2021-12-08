import * as fromHearingRequestAction from './hearing-request.action';

describe('Hearing Request Actions', () => {

  describe('Reset', () => {
    it('should create an action', () => {
      const action = new fromHearingRequestAction.ResetHearingRequest();
      expect(action.type).toBe(fromHearingRequestAction.RESET_HEARING_REQUEST);
    });
  });

});
