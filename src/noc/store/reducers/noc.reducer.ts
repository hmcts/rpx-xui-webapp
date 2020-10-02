import * as fromActions from '../actions';
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
    action: fromActions.NocNavigationAction
): NocState {
    let reducedState: NocState = state;

    switch (action.type) {
        case fromActions.CHANGE_NAVIGATION: {

            reducedState = {
                ...reducedState,
                state: action.payload
            };
        }
    }

    return reducedState;
}

export const getNocActiveState = (nocState) => nocState.state;
