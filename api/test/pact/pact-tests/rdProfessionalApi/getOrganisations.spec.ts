import { expect } from 'chai';

import { Organisation } from '../../pactFixtures';
import { getOrganisationDetails } from '../../pactUtil';
import { PactV3TestSetup } from '../settings/provider.mock';

const { Matchers } = require('@pact-foundation/pact');
const { somethingLike, eachLike } = Matchers;
const pactSetUp = new PactV3TestSetup({ provider: 'referenceData_organisationalExternalUsers', port: 8000 });

describe('RD Professional API call for get organisations', () => {
  describe('Get Organisations', () => {
    before(async () => {
      const interaction = {
        states: [{ description: 'Organisations exists with status of Active' }],
        uponReceiving: 'On receiving a request for those organisations',
        withRequest: {
          method: 'GET',
          path: '/refdata/external/v1/organisations/status/ACTIVE',
          query: {
            address: 'true'
          },
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer some-access-token',
            'ServiceAuthorization': 'serviceAuthToken'
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: getOrganisationResponse
        }
      };

      pactSetUp.provider.addInteraction(interaction);
    });

    it('returns the correct response', async () => {
      return pactSetUp.provider.executeTest(async (mockServer) => {
        const path: string = `${mockServer.url}/refdata/external/v1/organisations/status/ACTIVE?address=true`;

        const resp = await getOrganisationDetails(path);
        const responseDto = <Organisation[]>resp.data;
        assertResponse(responseDto);
      });
    });
  });
});

function assertResponse(dto: Organisation[]): void {
  // eslint-disable-next-line no-unused-expressions
  expect(dto).to.be.not.null;
  for (const element of dto) {
    expect(element.name).to.equal('TheOrganisation');
    expect(element.organisationIdentifier).to.equal('K100');
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
];
