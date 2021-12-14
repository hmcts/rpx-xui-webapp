import * as fromHearingRequestActions from '../actions/hearing-request.action';
import * as fromHearingRequestReducer from './hearing-request.reducer';

describe('Hearing Request Reducer', () => {

  describe('Actions', () => {

    describe('Reset action', () => {
      it('should set correct object', () => {
        const initialState = fromHearingRequestReducer.initialHearingRequestState;
        const action = new fromHearingRequestActions.ResetHearingRequest();
        const hearingsState = fromHearingRequestReducer.hearingRequestReducer(initialState, action);
        expect(hearingsState).toEqual(initialState);
      });
    });

  });
});
