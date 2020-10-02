import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';

export const getNocState = createSelector(
 fromFeature.getNocFeatureState,
 (state: fromFeature.State) => state.noc
);

export const currentNavigation = createSelector(
    getNocState,
    fromFeature.getNocActiveState
);
