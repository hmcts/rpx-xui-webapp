export class Organisation {
  public addressLine1: string;
  public addressLine2: string;
  public name: string;
  public postcode: string;
  public townCity: string;
  public country: string;
  public contactInformation: any[];
  public paymentAccount: any[];
  constructor(prop) {
    Object.assign(this, prop);
  }
}

export interface DxAddress {
  dxNumber: string;
  dxExchange: string;
}

export interface OrganisationContactInformation {
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  townCity: string;
  county: string;
  country: string;
  postCode: string;
  dxAddress: DxAddress[];
}

export interface OrganisationDetails {
  name: string;
  organisationIdentifier: string;
  contactInformation: OrganisationContactInformation[];
  status: string;
  sraId: string;
  sraRegulated: boolean;
  superUser: {
    firstName: string;
    lastName: string;
    email: string;
  };
  paymentAccount: string[];
}
