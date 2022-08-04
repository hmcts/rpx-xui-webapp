import { HttpError } from '../../../models/httpError.model';
import { HearingActualsMainModel } from '../../models/hearingActualsMainModel';
import { HearingRequestMainModel } from '../../models/hearingRequestMain.model';
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

    it('should submit hearing actuals success action', () => {
      const action = new fromHearingActualsAction.SubmitHearingActualsSuccess('1');
      expect(action.type).toBe(fromHearingActualsAction.SUBMIT_HEARING_ACTUALS_SUCCESS);
    });

    it('should submit hearing actuals failure action', () => {
      const error: HttpError = {
        status: 400,
        statusText: 'Bad Request',
        message: 'Bad Request',
        errors: [],
      };
      const action = new fromHearingActualsAction.SubmitHearingActualsFailure(error);
      expect(action.type).toBe(fromHearingActualsAction.SUBMIT_HEARING_ACTUALS_FAILURE);
    });
  });

  describe('ResetHearingActualsLastError', () => {
    it('should reset hearing actuals last error action', () => {
      const action = new fromHearingActualsAction.ResetHearingActualsLastError();
      expect(action.type).toBe(fromHearingActualsAction.RESET_HEARING_ACTUALS_LAST_ERROR);
    });
  });

  describe('UpdateActualHearingRequest', () => {
    it('should submit update actual hearing request action', () => {
      const hearingRequestMainModel: HearingRequestMainModel = {
        partyDetails: null,
        hearingDetails: null,
        hearingResponse: null
      };
      const action = new fromHearingActualsAction.UpdateActualHearingRequest({hearingRequestMainModel});
      expect(action.type).toBe(fromHearingActualsAction.UPDATE_ACTUAL_HEARING_REQUEST);
    });

    it('should submit update actual hearing request success action', () => {
      const hearingRequestMainModel: HearingRequestMainModel = {
        partyDetails: null,
        hearingDetails: null,
        hearingResponse: null
      };
      const action = new fromHearingActualsAction.UpdateActualHearingRequestSuccess({hearingRequestMainModel});
      expect(action.type).toBe(fromHearingActualsAction.UPDATE_ACTUAL_HEARING_REQUEST_SUCCESS);
    });

    it('should submit update actual hearing request failure action', () => {
      const error: HttpError = {
        status: 400,
        statusText: 'Bad Request',
        message: 'Bad Request',
        errors: [],
      };
      const action = new fromHearingActualsAction.UpdateActualHearingRequestError(error);
      expect(action.type).toBe(fromHearingActualsAction.UPDATE_ACTUAL_HEARING_REQUEST_ERROR);
    });

  });

});
