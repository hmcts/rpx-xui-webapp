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
        const action = new fromHearingActualsActions.GetHearingActuals(null);
        const hearingsState = fromHearingActualsReducer.hearingActualsReducer(fromHearingActualsReducer.initialHearingActualsState, action);
        expect(hearingsState.hearingActualsMainModel).toEqual(null);
      });
    });
  });
});
