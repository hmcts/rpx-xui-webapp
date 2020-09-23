import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

import * as fromNocNavigation from './noc-navigation.reducer';

export interface State {
  navigation: fromNocNavigation.NocNavigationState;
}

export const reducers: ActionReducerMap<State> = {
  navigation: fromNocNavigation.nocNavigationReducer,
};

export const getNocNavigationFeatureState = createFeatureSelector<State>(
  'noc'
);

export * from './noc-navigation.reducer';
