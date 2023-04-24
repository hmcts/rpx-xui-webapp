import { HttpError } from '../../../models/httpError.model';
import { hearingActualsMainModel } from '../../hearing.test.data';
import { HearingActualsStateData } from '../../models/hearingActualsStateData.model';
import * as fromHearingActualsActions from '../actions/hearing-actuals.action';
import * as fromHearingActualsReducer from './hearing-actuals.reducer';

describe('Hearing Actuals Reducer', () => {
  describe('Actions', () => {
    // Check testing
    describe('Reset action', () => {
      it('should set correct object', () => {
        const initialState = { ...fromHearingActualsReducer.initialHearingActualsState };
        const action = new fromHearingActualsActions.ResetHearingActuals();
        const hearingsState = fromHearingActualsReducer.hearingActualsReducer(initialState, action);
        expect(hearingsState).toEqual(initialState);
      });
    });

    describe('get service hearing actuals success action', () => {
      it('should set correct object', () => {
        const action = new fromHearingActualsActions.GetHearingActualsSuccess(hearingActualsMainModel);
        const hearingsState = fromHearingActualsReducer.hearingActualsReducer(fromHearingActualsReducer.initialHearingActualsState, action);
        expect(hearingsState.hearingActualsMainModel).toEqual(hearingActualsMainModel);
      });
    });

    describe('save hearing actuals action', () => {
      it('should save correct object', () => {
        const initialHearingActualsState: HearingActualsStateData = {
          hearingActualsMainModel: {
            hearingActuals: {
              hearingOutcome: null,
              actualHearingDays: []
            },
            hearingPlanned: null,
            hmcStatus: null,
            caseDetails: null
          }
        };
        const action = new fromHearingActualsActions.SaveHearingActualsPlannedDays([]);
        const hearingsState = fromHearingActualsReducer.hearingActualsReducer(initialHearingActualsState, action);
        expect(hearingsState.hearingActualsMainModel).not.toEqual(hearingActualsMainModel);
      });
    });

    describe('submit hearing actuals success action', () => {
      it('should return the correct object', () => {
        const { initialHearingActualsState } = fromHearingActualsReducer;
        const action = new fromHearingActualsActions.SubmitHearingActualsSuccess('1111222233334444');
        const state = fromHearingActualsReducer.hearingActualsReducer(initialHearingActualsState, action);
        expect(state.hearingActualsMainModel).toEqual(null);
      });

      it('should reset the last error', () => {
        const { initialHearingActualsState } = fromHearingActualsReducer;
        const action = new fromHearingActualsActions.SubmitHearingActuals('1111222233334444');
        const state = fromHearingActualsReducer.hearingActualsReducer(initialHearingActualsState, action);
        expect(state.lastError).toEqual(null);
      });

      it('should set the last error', () => {
        const { initialHearingActualsState } = fromHearingActualsReducer;
        const error: HttpError = {
          status: 400,
          statusText: 'Bad Request',
          message: 'Bad Request',
          errors: []
        };
        const action = new fromHearingActualsActions.SubmitHearingActualsFailure(error);
        const state = fromHearingActualsReducer.hearingActualsReducer(initialHearingActualsState, action);
        expect(state.lastError).toEqual(error);
      });
    });

    describe('reset hearing actuals last error action', () => {
      it('should set correct object', () => {
        const action = new fromHearingActualsActions.ResetHearingActualsLastError();
        const hearingsState = fromHearingActualsReducer.hearingActualsReducer(fromHearingActualsReducer.initialHearingActualsState, action);
        expect(hearingsState.lastError).toEqual(null);
      });
    });
  });
});
