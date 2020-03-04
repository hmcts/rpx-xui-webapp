export interface OrganisationPayload {
    name: string,
    sraId?: string,
    superUser: {
        firstName: string,
        lastName: string,
        email: string,
    }
    pbaAccounts?: [
          {
            pbaAccounts: string,
            pbaNumber: string,
          }
        ],

    contactInformation?: [{
        addressLine1: string,
        addressLine2?: string,
        townCity: string,
        county: string,
        postcode: string,
        dxAddress?: [
          {
            dxExchange: string,
            dxNumber: string,
          }
        ],
    }]
}
