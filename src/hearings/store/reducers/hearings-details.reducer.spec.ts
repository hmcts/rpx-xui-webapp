import * as fromActions from '../actions/hearings.action';
import * as fromReducer from './hearings-details.reducer';

describe('Hearings Details Reducer', () => {

  describe('Actions', () => {

    describe('Reset action', () => {
      it('should set correct object', () => {
        const initialState = fromReducer.initialState;
        const action = new fromActions.Reset();
        const hearingsState = fromReducer.hearingsDetailsReducer(initialState, action);
        expect(hearingsState).toEqual(initialState);
      });
    });
  });
});
