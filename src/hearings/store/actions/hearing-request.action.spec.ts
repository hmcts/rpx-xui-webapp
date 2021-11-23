import * as fromHearingRequestAction from './hearing-request.action';

describe('Hearing Request Actions', () => {

  describe('Reset', () => {
    it('should create an action', () => {
      const action = new fromHearingRequestAction.HearingRequestReset();
      expect(action.type).toBe(fromHearingRequestAction.HEARING_REQUEST_RESET);
    });
  });

});
