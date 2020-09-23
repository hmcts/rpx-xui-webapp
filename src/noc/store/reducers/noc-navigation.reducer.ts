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
    switch (action.type) {

        case fromNocNavigation.CHANGE_NAVIGATION: {
            return {
                ...state,
                previous: action.payload.previous,
                current: action.payload.current,
                next: action.payload.next,
            };
        }
    }

    return state;
}

export const getPreviousNavigation = (state) => state.previous;
export const getCurrentNavigation = (state) => state.current;
export const getNextNavigation = (state) => state.next;
