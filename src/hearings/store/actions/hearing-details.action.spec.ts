import * as fromHearingDetailsAction from './hearing-details.action';

describe('Hearing Details Actions', () => {
  describe('GetHearingDetails', () => {
    it('should load all hearings', () => {
      const action = new fromHearingDetailsAction.HearingDetails();
      expect(action.type).toBe(fromHearingDetailsAction.HEARING_DETAILS);
    });
  });
});
