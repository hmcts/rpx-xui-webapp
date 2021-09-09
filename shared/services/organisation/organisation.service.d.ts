import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractAppConfig } from '../../../app.config';
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
    dxAddress: any[];
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
    paymentAccount: string[];
    contactInformation: OrganisationAddress[];
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
export declare class OrganisationService {
    private readonly http;
    private readonly appconfig;
    private organisations$;
    static mapOrganisation(organisations: Organisation[]): OrganisationVm[];
    constructor(http: HttpClient, appconfig: AbstractAppConfig);
    getActiveOrganisations(): Observable<OrganisationVm[]>;
}
