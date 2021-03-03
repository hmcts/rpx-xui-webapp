import { expect } from 'chai';
import { Organisation } from '../../pactFixtures';
import { getOrganisationDetails } from '../../pactUtil';
import { PactTestSetup } from '../settings/provider.mock';



const { Matchers } = require('@pact-foundation/pact');
const { somethingLike, like, eachLike } = Matchers;
const pactSetUp = new PactTestSetup({ provider: 'referenceData_organisationalExternalUsers', port: 8000 });


describe("RD Professional API call for get organisations", () => {

  describe("Get Organisations", () => {

    const jwt = 'some-access-token'

    before(async () => {
      await pactSetUp.provider.setup()
      const interaction = {
        state: "Organisations exists with status of Active",
        uponReceiving: "On receiving a request for those organisations",
        withRequest: {
          method: "GET",
          path: "/refdata/external/v1/organisations/status/ACTIVE",
          query: "address=true",
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer some-access-token",
            "ServiceAuthorization": "serviceAuthToken"
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: getOrganisationResponse,
        },
      }
      // @ts-ignore
      pactSetUp.provider.addInteraction(interaction)
    })

    it("returns the correct response", async () => {
      const path: string = `${pactSetUp.provider.mockService.baseUrl}/refdata/external/v1/organisations/status/ACTIVE?address=true`;

      const resp = getOrganisationDetails(path);
      resp.then((response) => {
        const responseDto: Organisation[] = <Organisation[]>response.data
        assertResponse(responseDto);
      }).then(() => {
        pactSetUp.provider.verify()
        pactSetUp.provider.finalize()
      })
    })
  })
})

function assertResponse(dto: Organisation[]): void {
  expect(dto).to.be.not.null;
  for (var element of dto) {
    expect(element.name).to.equal("TheOrganisation");
    expect(element.organisationIdentifier).to.equal("K100");
  }
}

const getOrganisationResponse: Organisation[] = [
  {
    name: somethingLike('TheOrganisation'),
    organisationIdentifier: somethingLike('K100'),
    contactInformation: eachLike({
      addressLine1: 'addressLine1',
      addressLine2: 'addressLine2',
      country: 'country',
      postCode: 'Ha5 1BJ'
    })
  }
]
