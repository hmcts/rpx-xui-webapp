import * as fromActions from '../actions/noc.action';
import { NocState } from '../models/noc.state';
import * as fromReducer from './noc.reducer';

describe('Noc Navigation Reducer', () => {

    describe('Actions', () => {

        it('should set correct object', () => {
            const initialState = fromReducer.initialState;
            const action = new fromActions.ChangeNavigation(NocState.START);
            const state = fromReducer.nocReducer(initialState, action);
            expect(state).toBeDefined();
        });

        describe('Change Navigation action', () => {
            it('should set correct object', () => {
                const initialState = fromReducer.initialState;
                const action = new fromActions.ChangeNavigation(NocState.QUESTION);
                const nocState = fromReducer.nocReducer(initialState, action);
                expect(nocState.state).toEqual(NocState.QUESTION);
            });
        });

    });

    describe('Get functions', () => {
        it('should get state properties', () => {
            const nocState = {
                state: NocState.ANSWER_INCOMPLETE
            };
            expect(fromReducer.getNocActiveState(nocState)).toEqual(NocState.ANSWER_INCOMPLETE);
        });
    });
});
