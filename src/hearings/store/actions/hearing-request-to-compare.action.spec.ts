import * as fromHearingRequestToCompareAction from './hearing-request-to-compare.action';

describe('Hearing Request To Compare Actions', () => {
  describe('fromHearingRequestToCompareAction', () => {
    it('should create reset hearing request to compare action', () => {
      const action = new fromHearingRequestToCompareAction.ResetHearingRequestToCompare();
      expect(action.type).toBe(fromHearingRequestToCompareAction.RESET_HEARING_REQUEST_TO_COMPARE);
    });

    it('should initialize hearing request action', () => {
      const payload = {
        requestDetails: null,
        hearingDetails: null,
        partyDetails: null,
      };
      const action = new fromHearingRequestToCompareAction.InitializeHearingRequestToCompare(payload);
      expect(action.type).toBe(fromHearingRequestToCompareAction.INITIALIZE_HEARING_REQUEST_TO_COMPARE);
    });
  });
});
