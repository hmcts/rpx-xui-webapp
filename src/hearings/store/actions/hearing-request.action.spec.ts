import * as fromHearingRequestAction from './hearing-request.action';

describe('Hearing Request Actions', () => {

  describe('Reset', () => {
    it('should create an action', () => {
      const action = new fromHearingRequestAction.ResetHearingRequest();
      expect(action.type).toBe(fromHearingRequestAction.RESET_HEARING_REQUEST);
    });
  });

  describe('UpdateHearingRequest', () => {
    it('should update hearing request action', () => {
      const payload = {
        requestDetails: null,
        hearingDetails: null,
        partyDetails: null
      };
      const action = new fromHearingRequestAction.UpdateHearingRequest(payload);
      expect(action.type).toBe(fromHearingRequestAction.UPDATE_HEARING_REQUEST);
    });
  });

  describe('SubmitHearingRequest', () => {
    it('should submit hearing request action', () => {
      const payload = {
        requestDetails: null,
        hearingDetails: null,
        partyDetails: null
      };
      const action = new fromHearingRequestAction.SubmitHearingRequest(payload);
      expect(action.type).toBe(fromHearingRequestAction.SUBMIT_HEARING_REQUEST);
    });
  });

});
