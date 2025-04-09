import { caseReference } from 'src/noc/store';
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

  describe('StoreJurisdictionAndCaseRef', () => {
    it('should store jurisdiction and case reference', () => {
      const action = new fromHearingValuesAction.StoreJurisdictionAndCaseRef({ caseReference: '123', jurisdictionId: '123' });
      expect(action.type).toBe(fromHearingValuesAction.STORE_JURISDICTION_AND_CASE_REF);
    });
  });

  describe('ResetJurisdictionAndCaseRef', () => {
    it('should store jurisdiction and case reference', () => {
      const action = new fromHearingValuesAction.ResetJurisdictionAndCaseRef();
      expect(action.type).toBe(fromHearingValuesAction.RESET_JURISDICTION_AND_CASE_REF);
    });
  });

  describe('ResetHearingValuesLastError', () => {
    it('should reset hearing values last error action', () => {
      const action = new fromHearingValuesAction.ResetHearingValuesLastError();
      expect(action.type).toBe(fromHearingValuesAction.RESET_HEARING_VAUES_LAST_ERROR);
    });
  });
});
