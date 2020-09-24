import * as fromReducer from './noc-navigation.reducer';
import * as fromActions from '../actions/noc-navigation.action';

describe('Noc Navigation Reducer', () => {

    describe('Actions', () => {

        it('should set correct object', () => {
            const initialState = fromReducer.initialState;
            const action = new fromActions.ChangeNavigation({});
            const state = fromReducer.nocNavigationReducer(initialState, action);
            expect(state).toBeDefined();
        });

        describe('Change Navigation action', () => {
            it('should set correct object', () => {
                const initialState = fromReducer.initialState;
                const action = new fromActions.ChangeNavigation({
                    previous: 'a',
                    current: 'b',
                    next: 'c'
                });
                const state = fromReducer.nocNavigationReducer(initialState, action);
                expect(state).toEqual({
                    previous: 'a',
                    current: 'b',
                    next: 'c'
                });
            });
        });

    });

    describe('Get functions', () => {
        it('should get state properties', () => {
            const state = {
                previous: 'p',
                current: 'c',
                next: 'n'
            };
            expect(fromReducer.getPreviousNavigation(state)).toEqual('p');
            expect(fromReducer.getCurrentNavigation(state)).toEqual('c');
            expect(fromReducer.getNextNavigation(state)).toEqual('n');
        });
    });
});
