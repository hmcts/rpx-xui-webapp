import { createSelector } from '@ngrx/store';

import * as fromFeature from '../../store/reducers';
import * as fromOrganisation from '../reducers/organisation.reducer';

export const getOrganisationState = createSelector(
  fromFeature.getRootOrgState,
  (state: fromFeature.OrganisationState) => state.organisation
);

export const getOrganisationSel = createSelector(
  getOrganisationState,
  fromOrganisation.getOrganisation
);

export const getOrganisationLoaded = createSelector(
  getOrganisationState,
  fromOrganisation.getOrganisationLoaded
);
