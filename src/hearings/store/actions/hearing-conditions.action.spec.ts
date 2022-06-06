import * as fromHearingConditionAction from './hearing-conditions.action';

// Check testing
describe('Hearing Conditions Actions', () => {

  // Check testing
describe('Reset', () => {
    it('should create an action', () => {
      const action = new fromHearingConditionAction.ResetHearingConditions();
      expect(action.type).toBe(fromHearingConditionAction.RESET_HEARING_CONDITIONS);
    });
  });

  // Check testing
describe('SaveHearingConditions', () => {
    it('should save hearing conditions', () => {
      const action = new fromHearingConditionAction.SaveHearingConditions({region: 'Wales'});
      expect(action.type).toBe(fromHearingConditionAction.SAVE_HEARING_CONDITIONS);
    });
  });
});
