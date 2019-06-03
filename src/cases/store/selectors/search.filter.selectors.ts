import { createSelector } from '@ngrx/store';

import * as fromFeature from '../../store/reducers';
import * as fromSearch from '../reducers';

export const getSearchState = createSelector(
 fromFeature.getCaseFeatureState,
 (state: fromFeature.State) => state.caseSearchFilter
);

