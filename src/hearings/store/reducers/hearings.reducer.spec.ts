import * as fromActions from '../actions/hearings.action';
import * as fromReducer from './hearings.reducer';

describe('Hearings Reducer', () => {

  describe('Actions', () => {

    describe('Reset action', () => {
      it('should set correct object', () => {
        const initialState = fromReducer.initialState;
        const action = new fromActions.Reset();
        const hearingsState = fromReducer.hearingsReducer(initialState, action);
        expect(hearingsState).toEqual(initialState);
      });
    });
  });
});
