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
      const action = new fromHearingValuesAction.LoadHearingValues();
      expect(action.type).toBe(fromHearingValuesAction.LOAD_HEARING_VALUES);
    });
  });

  describe('LoadHearingValuesFailure', () => {
    it('should load hearing values failure action', () => {
      const payload = {
        status: 403,
        errors: null,
        message: 'Http failure response: 403 Forbidden'
      };
      const action = new fromHearingValuesAction.LoadHearingValuesFailure(payload);
      expect(action.type).toBe(fromHearingValuesAction.LOAD_HEARING_VALUES_FAILURE);
    });
  });

  describe('LoadHearingValuesSuccess', () => {
    it('should load service hearing values successfully', () => {
      const action = new fromHearingValuesAction.LoadHearingValuesSuccess(null);
      expect(action.type).toBe(fromHearingValuesAction.LOAD_HEARING_VALUES_SUCCESS);
    });
  });

  describe('ResetHearingValuesLastError', () => {
    it('should reset hearing values last error action', () => {
      const action = new fromHearingValuesAction.ResetHearingValuesLastError();
      expect(action.type).toBe(fromHearingValuesAction.RESET_HEARING_VAUES_LAST_ERROR);
    });
  });
});
