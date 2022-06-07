import * as fromHearingConditionsActions from '../actions/hearing-conditions.action';
import * as fromHearingConditionsReducer from './hearing-conditions.reducer';

describe('Hearing Conditions Reducer', () => {

  describe('Actions', () => {

    describe('Reset action', () => {
      it('should set correct object', () => {
        const initialState = fromHearingConditionsReducer.initialHearingConditionsState;
        const action = new fromHearingConditionsActions.ResetHearingConditions();
        const hearingsState = fromHearingConditionsReducer.hearingConditionsReducer(initialState, action);
        expect(hearingsState).toEqual(initialState);
      });
    });
    describe('Save action', () => {
      it('should save hearing conditions', () => {
        const initialState = fromHearingConditionsReducer.initialHearingConditionsState;
        const action = new fromHearingConditionsActions.SaveHearingConditions({region: 'Wales'});
        const hearingsState = fromHearingConditionsReducer.hearingConditionsReducer(initialState, action);
        expect(hearingsState.hasOwnProperty('region')).toBeTruthy();
      });
    });
  });
});
