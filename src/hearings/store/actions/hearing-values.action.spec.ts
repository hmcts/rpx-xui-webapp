import * as fromHearingValuesAction from './hearing-values.action';

describe('Hearing Values Actions', () => {

  describe('Reset', () => {
    it('should create an action', () => {
      const action = new fromHearingValuesAction.ResetHearingValues();
      expect(action.type).toBe(fromHearingValuesAction.RESET_HEARING_VALUES);
    });
  });

  describe('LoadServiceHearingValues', () => {
    it('should load service hearing values', () => {
      const action = new fromHearingValuesAction.LoadHearingValues('1111222233334444');
      expect(action.type).toBe(fromHearingValuesAction.LOAD_HEARING_VALUES);
    });
  });

  describe('LoadHearingValuesSuccess', () => {
    it('should load service hearing values successfully', () => {
      const action = new fromHearingValuesAction.LoadHearingValuesSuccess(null);
      expect(action.type).toBe(fromHearingValuesAction.LOAD_HEARING_VALUES_SUCCESS);
    });
  });
});
