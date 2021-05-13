import { Organisation } from '../../models';
import * as fromOrganisation from '../actions/organisation.actions';

export interface OrganisationState {
  organisationDetails: Organisation;
  loaded: boolean;
  loading: boolean;
}

export const initialState: OrganisationState = {
  organisationDetails: new Organisation({}),
  loaded: false,
  loading: false,
};

export function reducer(
  state = initialState,
  action: fromOrganisation.organisationActions
): OrganisationState {
  switch (action.type) {
    case fromOrganisation.LOAD_ORGANISATION: {
      return {
        ...state,
        loaded: false,
        loading: true
      };
    }
    case fromOrganisation.LOAD_ORGANISATION_SUCCESS: {
      const organisationDetails = new Organisation(action.payload);
      return {
        ...state,
        organisationDetails,
        loaded: true
      };
    }
    default:
      return state;
  }
}

export const getOrganisation = (state: OrganisationState) => state.organisationDetails;
export const getOrganisationLoaded = (state: OrganisationState) => state.loaded;
