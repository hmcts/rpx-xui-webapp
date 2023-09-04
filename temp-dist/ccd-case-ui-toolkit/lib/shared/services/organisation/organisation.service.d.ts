import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractAppConfig } from '../../../app.config';
import * as i0 from "@angular/core";
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
    constructor(http: HttpClient, appconfig: AbstractAppConfig);
    private organisations$;
    static mapOrganisation(organisations: Organisation[]): OrganisationVm[];
    getActiveOrganisations(): Observable<OrganisationVm[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrganisationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrganisationService>;
}
//# sourceMappingURL=organisation.service.d.ts.map