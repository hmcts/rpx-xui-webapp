import { createSelector } from '@ngrx/store';
import * as fromFeature from '../../store/reducers';

export const getOrganisationsState = createSelector(
  fromFeature.getCaseFeatureState,
  (state: fromFeature.State) => state.organisationsList
);

export const getAllOrganisationsState = createSelector(
    getOrganisationsState,
    fromFeature.getAllOrganisations
);
