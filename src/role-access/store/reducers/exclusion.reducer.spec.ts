import { ExclusionState } from '../../models';
import * as fromActions from '../actions/exclusion.action';
import * as fromReducer from './exclusion.reducer';

// Check testing
describe('Exclusion Reducer', () => {

  // Check testing
describe('Actions', () => {

    // Check testing
describe('Change Navigation action', () => {
      it('should set correct object', () => {
        const initialState = fromReducer.initialState;
        const action = new fromActions.ChangeNavigation(ExclusionState.CHOOSE_PERSON_ROLE);
        const exclusionState = fromReducer.exclusionReducer(initialState, action);
        expect(exclusionState.state).toEqual(ExclusionState.CHOOSE_PERSON_ROLE);
      });
    });

    // Check testing
describe('Reset action', () => {
      it('should set correct object', () => {
        const initialState = fromReducer.initialState;
        const action = new fromActions.ExclusionReset();
        const exclusionState = fromReducer.exclusionReducer(initialState, action);
        expect(exclusionState).toEqual(initialState);
      });
    });
  });

});
