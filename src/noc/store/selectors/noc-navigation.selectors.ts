import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';

export const getNocNavigationState = createSelector(
 fromFeature.getNocNavigationFeatureState,
 (state: fromFeature.State) => state.navigation
);

export const previousNavigation = createSelector(
    getNocNavigationState,
    fromFeature.getPreviousNavigation
);

export const currentNavigation = createSelector(
    getNocNavigationState,
    fromFeature.getCurrentNavigation
);

export const nextNavigation = createSelector(
    getNocNavigationState,
    fromFeature.getNextNavigation
);
