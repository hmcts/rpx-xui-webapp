import * as OrganisationActions from '../actions/organisations-list.action';

export interface OrganisationSuperUser {
    firstName: string;
    lastName: string;
    email: string;
}

export interface OrganisationAddress {
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    townCity: string;
    county: string;
    country: string;
    postCode: string;
    dxAddress: any [];
}

export interface Organisation {
    organisationIdentifier: string;
    name: string;
    status: string;
    sraId: string;
    sraRegulated: boolean;
    companyNumber: string;
    companyUrl: string;
    superUser: OrganisationSuperUser;
    paymentAccount: string [];
    contactInformation: OrganisationAddress [];
}

export interface OrganisationVm {
    organisationIdentifier: string;
    name: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    townCity: string;
    county: string;
    country: string;
    postCode: string;
}

export interface OrganisationsState {
    organisations: OrganisationVm [];
    loaded: boolean;
    error: any;
}

const initialOrganisationsState = {
    organisations: [],
    loaded: false,
    error: null
};

export function organisationsListReducer(
    state: OrganisationsState = initialOrganisationsState,
    action: OrganisationActions.OrganisationsActions): OrganisationsState {
    switch (action.type) {
        case OrganisationActions.LOAD_ALL_ORGANISATIONS_SUCCESS: {
            return {... state, organisations: action.payload };
        }
        case OrganisationActions.LOAD_ALL_ORGANISATIONS_FAILURE: {
            return {... state, error: action.payload };
        }
        default: {
            return state;
        }
    }
}
