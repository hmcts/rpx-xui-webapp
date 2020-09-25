import * as fromNocNavigation from '../actions/noc-navigation.action';

export interface NocNavigationState {
    previous: string;
    current: string;
    next: string;
}

export const initialState: NocNavigationState = {
    previous: null,
    current: 'START',
    next: 'QUESTION',
};

export function nocNavigationReducer(
    state = initialState,
    action: fromNocNavigation.NocNavigationAction
): NocNavigationState {
    let reducedState: NocNavigationState = state;

    switch (action.type) {
        case fromNocNavigation.CHANGE_NAVIGATION: {

            const { previous, current, next } = action.payload;

            reducedState = {
                ...reducedState,
                previous,
                current,
                next,
            };
        }
    }

    return reducedState;
}

export const getPreviousNavigation = (state) => state.previous;
export const getCurrentNavigation = (state) => state.current;
export const getNextNavigation = (state) => state.next;
