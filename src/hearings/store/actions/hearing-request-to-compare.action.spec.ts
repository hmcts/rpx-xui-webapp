import * as fromHearingRequestToCompareAction from './hearing-request-to-compare.action';

// Check testing
describe('Hearing Request To Compare Actions', () => {

  // Check testing
describe('fromHearingRequestToCompareAction', () => {
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
