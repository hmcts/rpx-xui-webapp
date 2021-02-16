import { Pact } from '@pact-foundation/pact';
import { expect } from 'chai';
import * as getPort from 'get-port';
import * as path from 'path';
import { Organisation } from '../../pactFixtures';
import { getOrganisationDetails } from '../../pactUtil';


const {Matchers} = require('@pact-foundation/pact');
const {somethingLike, like, eachLike} = Matchers;

describe("RD Professional API call for get organisations", () => {
  let mockServerPort: number
  let provider: Pact


  // Setup the provider
  before(async() => {
    mockServerPort = await getPort()
    provider = new Pact({
      consumer: "xui_webApp",
      provider: "referenceData_organisationalExternalUsers",
      log: path.resolve(process.cwd(), "api/test/pact/logs", "mockserver-integration.log"),
      dir: path.resolve(process.cwd(), "api/test/pact/pacts"),
      logLevel: 'info',
      port: mockServerPort,
      spec: 2,
      pactfileWriteMode: "merge"
    })
    return provider.setup()
  })

  // Write Pact when all tests done
  after(() => provider.finalize())

  // verify with Pact, and reset expectations
  afterEach(() => provider.verify())

  describe("Get Organisations", () => {

    const jwt = 'some-access-token'

    before(done => {
      const interaction = {
        state: "Organisations exists with status of Active",
        uponReceiving: "On receiving a request for those organisations",
        withRequest: {
          method: "GET",
          path: "/refdata/external/v1/organisations/status/ACTIVE",
          query: "address=true",
          headers: {
            'Content-Type': 'application/json',
            "Authorization":  "Bearer some-access-token",
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
      provider.addInteraction(interaction).then(() => {
        done()
      })
    })

    it("returns the correct response", done => {
      const path: string = `${provider.mockService.baseUrl}/refdata/external/v1/organisations/status/ACTIVE?address=true`;

      const resp =  getOrganisationDetails(path);
      resp.then((response) => {
        const responseDto:Organisation[] = <Organisation[]> response.data
        assertResponse(responseDto);
      }).then(done,done)
    })
   })
})

function assertResponse(dto:Organisation[]): void{
  expect(dto).to.be.not.null;
  for(var element of dto ) {
    expect(element.name).to.equal("TheOrganisation");
    expect(element.organisationIdentifier).to.equal("K100");
  }
}

const getOrganisationResponse:Organisation[] = [
  {
    name: somethingLike('TheOrganisation'),
    organisationIdentifier: somethingLike('K100'),
    contactInformation:  eachLike({
      addressLine1: 'addressLine1',
      addressLine2: 'addressLine2',
      country: 'country',
      postCode: 'Ha5 1BJ'
    })
  }
]
