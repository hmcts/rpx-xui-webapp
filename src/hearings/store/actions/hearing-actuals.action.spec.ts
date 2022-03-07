import { HearingActualsMainModel } from '../../models/hearingActualsMainModel';
import { HMCStatus } from '../../models/hearings.enum';
import * as fromHearingActualsAction from './hearing-actuals.action';

describe('Hearing Actuals Actions', () => {

  const payload: HearingActualsMainModel = {
    hearingActuals: null,
    hearingPlanned: null,
    hmcStatus: HMCStatus.AWAITING_ACTUALS,
    caseDetails: null
  };

  describe('Reset', () => {
    it('should create an action', () => {
      const action = new fromHearingActualsAction.ResetHearingActuals();
      expect(action.type).toBe(fromHearingActualsAction.RESET_HEARING_ACTUALS);
    });
  });

  describe('UpdateHearingActuals', () => {
    it('should update hearing actuals action', () => {

      const action = new fromHearingActualsAction.UpdateHearingActuals({ hearingId: '1', hearingActuals: payload.hearingActuals
      });
      expect(action.type).toBe(fromHearingActualsAction.UPDATE_HEARING_ACTUALS);
    });
  });

  describe('SubmitHearingActuals', () => {
    it('should submit hearing actuals action', () => {
      const action = new fromHearingActualsAction.SubmitHearingActuals('1');
      expect(action.type).toBe(fromHearingActualsAction.SUBMIT_HEARING_ACTUALS);
    });
  });

});
