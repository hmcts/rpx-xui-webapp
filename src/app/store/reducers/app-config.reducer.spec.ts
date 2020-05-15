import { reducer, initialState } from './app-config.reducer';
import { LoadHasAcceptedTCSuccess, AcceptTandCSuccess } from '../actions/';

describe('App Config Reducer', () => {
    it('should return the default state', () => {
        const action = {} as any;
        const state = reducer(undefined, action);
        expect(state).toEqual(initialState);
    });

    it('Has accepted TC Success', () => {
        const action = new LoadHasAcceptedTCSuccess(false);
        const state = reducer(initialState, action);
        const expectedState = {
            ...initialState,
            termsAndCondition: {
                isLoaded: true,
                hasUserAcceptedTC: false
              }
        };
        expect(state).toEqual(expectedState);
    });

    it('Accept TC Success', () => {
        const action = new AcceptTandCSuccess(true);
        const state = reducer(initialState, action);
        const expectedState = {
            ...initialState,
            termsAndCondition: {
                isLoaded: true,
                hasUserAcceptedTC: true
              }
        };
        expect(state).toEqual(expectedState);
    });
});
