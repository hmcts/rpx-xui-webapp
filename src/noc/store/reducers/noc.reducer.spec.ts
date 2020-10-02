import * as fromActions from '../actions/noc-navigation.action';
import { Noc } from '../models/noc.state';
import * as fromReducer from './noc.reducer';

describe('Noc Navigation Reducer', () => {

    describe('Actions', () => {

        it('should set correct object', () => {
            const initialState = fromReducer.initialState;
            const action = new fromActions.ChangeNavigation(Noc.START);
            const state = fromReducer.nocReducer(initialState, action);
            expect(state).toBeDefined();
        });

        describe('Change Navigation action', () => {
            it('should set correct object', () => {
                const initialState = fromReducer.initialState;
                const action = new fromActions.ChangeNavigation(Noc.QUESTION);
                const state = fromReducer.nocReducer(initialState, action);
                expect(state.state).toEqual(Noc.QUESTION);
            });
        });

    });

    describe('Get functions', () => {
        it('should get state properties', () => {
            const nocState = {
                state: Noc.ANSWER_INCOMPLETE
            };
            expect(fromReducer.getNocActiveState(nocState)).toEqual(Noc.ANSWER_INCOMPLETE);
        });
    });
});
