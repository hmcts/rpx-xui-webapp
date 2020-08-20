import { Organisation, OrganisationVm } from '../reducers';
import { OrganisationListEffects } from './organisations-list.effects';

describe('OrganisationsList Effects', () => {
    it('mapOrganisation', () => {
        const organisation: Organisation = {
            organisationIdentifier: 'AD1334',
            name: 'Name',
            status: 'ACTIVE',
            sraId: null,
            sraRegulated: false,
            companyNumber: '12344',
            companyUrl: null,
            superUser: null,
            paymentAccount: [],
            contactInformation: [{
                addressLine1: 'line1',
                addressLine2: null,
                addressLine3: null,
                townCity: 'town',
                county: null,
                country: null,
                postCode: 'XX1 2CV',
                dxAddress: []}]
        };
        const organisationVms: OrganisationVm[] = OrganisationListEffects.mapOrganisation([organisation]);
        expect(organisationVms.length).toEqual(1);
        const organisationVm = organisationVms[0];
        expect(organisationVm.organisationIdentifier).toEqual(organisation.organisationIdentifier);
        expect(organisationVm.name).toEqual(organisation.name);
        expect(organisationVm.addressLine1).toEqual(organisation.contactInformation[0].addressLine1);
        expect(organisationVm.addressLine2).toEqual(organisation.contactInformation[0].addressLine2);
        expect(organisationVm.addressLine3).toEqual(organisation.contactInformation[0].addressLine3);
        expect(organisationVm.townCity).toEqual(organisation.contactInformation[0].townCity);
        expect(organisationVm.county).toEqual(organisation.contactInformation[0].county);
        expect(organisationVm.country).toEqual(organisation.contactInformation[0].country);
        expect(organisationVm.postCode).toEqual(organisation.contactInformation[0].postCode);
    });
});
