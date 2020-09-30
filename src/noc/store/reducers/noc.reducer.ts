import * as fromNocNavigation from '../actions/noc-navigation.action';
import { Noc, NocState } from '../models/noc.state';

export const initialState: NocState = {
    state: Noc.START,
    lastError: null,
    questions: null,
    answers: null,
    reason: null,
    affirmationAgreed: false,
    options: null
};

export function nocReducer(
    state = initialState,
    action: fromNocNavigation.NocNavigationAction
): NocState {
    let reducedState: NocState = state;

    switch (action.type) {
        case fromNocNavigation.CHANGE_NAVIGATION: {

            reducedState = {
                ...reducedState,
                state: action.payload
            };
        }
    }

    return reducedState;
}

export const getNocState = (nocState) => nocState.state;