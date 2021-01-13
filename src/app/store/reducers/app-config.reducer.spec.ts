import { TCDocument } from '@hmcts/rpx-xui-common-lib';
import * as fromActions from '../actions/';
import * as appConfigReducer from './app-config.reducer';

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

    it('LoadUserDetailsSuccess', () => {
        const action = new fromActions.LoadUserDetailsSuccess({
                                                                sessionTimeout: {
                                                                    idleModalDisplayTime: 100,
                                                                    totalIdleTime: 100,
                                                                },
                                                                canShareCases: false
                                                            });
        const state = appConfigReducer.reducer(appConfigReducer.initialState, action);
        const expectedState = {
            ...appConfigReducer.initialState.userDetails,
            sessionTimeout: {
                idleModalDisplayTime: 100,
                totalIdleTime: 100,
            }
        };

        console.log(expectedState);
        console.log(state.userDetails);
        expect(state.userDetails).toEqual(expectedState);
    });

    it('StartIdleSessionTimeout', () => {
        const action = new fromActions.StartIdleSessionTimeout();
        const state = appConfigReducer.reducer(appConfigReducer.initialState, action);
        const expectedState = {
            ...appConfigReducer.initialState,
            useIdleSessionTimeout: true
        };
        expect(state).toEqual(expectedState);
    });

    it('StopIdleSessionTimeout', () => {
        const action = new fromActions.StopIdleSessionTimeout();
        const state = appConfigReducer.reducer(appConfigReducer.initialState, action);
        const expectedState = {
            ...appConfigReducer.initialState,
            useIdleSessionTimeout: false
        };
        expect(state).toEqual(expectedState);
    });

    it('LoadTermsConditionsSuccess', () => {
        const document: TCDocument = {version: 1234, content: 'some', mimeType: 'text/html'};
        const action = new fromActions.LoadTermsConditionsSuccess(document);
        const state = appConfigReducer.reducer(appConfigReducer.initialState, action);
        const expectedState = {
            ...appConfigReducer.initialState,
            termsAndConditions: document
        };
        expect(state).toEqual(expectedState);
    });

    it('StartIdleSessionTimeout', () => {
        const action = new fromActions.StartIdleSessionTimeout();
        const state = appConfigReducer.reducer(appConfigReducer.initialState, action);
        const expectedState = {
            ...appConfigReducer.initialState,
            useIdleSessionTimeout: true
        };
        expect(state).toEqual(expectedState);
    });

    it('StopIdleSessionTimeout', () => {
        const action = new fromActions.StopIdleSessionTimeout();
        const state = appConfigReducer.reducer(appConfigReducer.initialState, action);
        const expectedState = {
            ...appConfigReducer.initialState,
            useIdleSessionTimeout: false
        };
        expect(state).toEqual(expectedState);
    });
});
