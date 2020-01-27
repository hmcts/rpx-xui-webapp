import * as appConfigReducer from './app-config.reducer';
import * as fromActions from '../actions/';

describe('App Config Reducer', () => {
    it('should return the default state', () => {
        const action = {} as any;
        const state = appConfigReducer.reducer(undefined, action);
        expect(state).toEqual(appConfigReducer.initialState);
    });

    it('Has accepted TC Success', () => {
        const action = new fromActions.LoadHasAcceptedTCSuccess(false);
        const state = appConfigReducer.reducer(appConfigReducer.initialState, action);
        const expectedState = {
            ...appConfigReducer.initialState,
            termsAndCondition: {
                isLoaded: true,
                hasUserAcceptedTC: false
              }
        };
        expect(state).toEqual(expectedState);
    });

    it('Accept TC Success', () => {
        const action = new fromActions.AcceptTandCSuccess(true);
        const state = appConfigReducer.reducer(appConfigReducer.initialState, action);
        const expectedState = {
            ...appConfigReducer.initialState,
            termsAndCondition: {
                isLoaded: true,
                hasUserAcceptedTC: true
              }
        };
        expect(state).toEqual(expectedState);
    });
});
