import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromOrganisation from './organisation.reducer';


export interface OrganisationState {
  organisation: fromOrganisation.OrganisationState;
}

export const reducers: ActionReducerMap<OrganisationState> = {
  organisation: fromOrganisation.reducer,
};

export const getRootOrgState = createFeatureSelector<OrganisationState>(
  'org'
);
