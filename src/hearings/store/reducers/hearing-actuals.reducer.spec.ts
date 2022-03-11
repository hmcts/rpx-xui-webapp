import { hearingActualsMainModel } from '../../hearing.test.data';
import * as fromHearingActualsActions from '../actions/hearing-actuals.action';
import * as fromHearingActualsReducer from './hearing-actuals.reducer';

describe('Hearing Actuals Reducer', () => {
  describe('Actions', () => {
    describe('Reset action', () => {
      it('should set correct object', () => {
        const initialState = fromHearingActualsReducer.initialHearingActualsState;
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

    describe('submit hearing actuals success action', () => {
      it('should return the correct object', () => {
        const { initialHearingActualsState } = fromHearingActualsReducer;
        const action = new fromHearingActualsActions.SubmitHearingActualsSuccess('1111222233334444');
        const state = fromHearingActualsReducer.hearingActualsReducer(initialHearingActualsState, action);
        expect(state.hearingActualsMainModel).toEqual(null);
      });
    });
  });
});
