import * as fromHearingConditionAction from './hearing-conditions.action';

describe('Hearing Conditions Actions', () => {
  describe('Reset', () => {
    it('should create an action', () => {
      const action = new fromHearingConditionAction.ResetHearingConditions();
      expect(action.type).toBe(fromHearingConditionAction.RESET_HEARING_CONDITIONS);
    });
  });

  describe('SaveHearingConditions', () => {
    it('should save hearing conditions', () => {
      const action = new fromHearingConditionAction.SaveHearingConditions({ region: 'Wales' });
      expect(action.type).toBe(fromHearingConditionAction.SAVE_HEARING_CONDITIONS);
    });
  });
});
