import { ExclusionState } from '../../models';
import * as fromActions from '../actions/exclusion.action';
import * as fromReducer from './exclusion.reducer';

describe('Exclusion Reducer', () => {

  describe('Actions', () => {

    describe('Change Navigation action', () => {
      it('should set correct object', () => {
        const initialState = fromReducer.initialState;
        const action = new fromActions.ChangeNavigation(ExclusionState.CHOOSE_PERSON_ROLE);
        const exclusionState = fromReducer.exclusionReducer(initialState, action);
        expect(exclusionState.state).toEqual(ExclusionState.CHOOSE_PERSON_ROLE);
      });
    });

    describe('Reset action', () => {
      it('should set correct object', () => {
        const initialState = fromReducer.initialState;
        const action = new fromActions.Reset();
        const exclusionState = fromReducer.exclusionReducer(initialState, action);
        expect(exclusionState).toEqual(initialState);
      });
    });
  });

});
