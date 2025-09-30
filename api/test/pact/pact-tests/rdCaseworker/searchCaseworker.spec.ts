import { expect } from 'chai';
import { PactV3TestSetup } from '../settings/provider.mock';
import { CaseworkerUserDetailsDto } from '../../pactFixtures';
import { searchCaseworker } from '../../pactUtil';

const { Matchers } = require('@pact-foundation/pact');
const { somethingLike } = Matchers;
const pactSetUp = new PactV3TestSetup({ provider: 'referenceData_caseworkerRefUsers', port: 8000 });

describe('Caseworker ref data api, Search caseworker given userId', () => {
  const REQUEST_BODY = {
    userId: { 'userId': '004b7164-0943-41b5-95fc-39794af4a9fe' }
  };

  const baseLocations = [
    { location_id: somethingLike(1), location: somethingLike('National'), is_primary: somethingLike(true) }
  ];
  const RESPONSE_BODY = [
    {
      'email_id': somethingLike('test_person@test.gov.uk'),
      'first_name': somethingLike('testFN'),
      'last_name': somethingLike('testLN'),
      'id': somethingLike('004b7164-0943-41b5-95fc-39794af4a9fe'),
      'base_location': baseLocations
    }
  ];

  describe('POST  /caseworker/search', () => {
    before(async () => {
      const interaction = {
        states: [{ description: 'A list of users for CRD request' }],
        uponReceiving: 'get specific caseworker',
        withRequest: {
          method: 'POST',
          path: '/caseworker/search',
          headers: {
            'Authorization': 'Bearer someAuthorizationToken',
            'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/json'
          },
          body: REQUEST_BODY
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: RESPONSE_BODY
        }
      };

      pactSetUp.provider.addInteraction(interaction);
    });

    it('returns the correct response', async () => {
      return pactSetUp.provider.executeTest(async (mockServer) => {
        const path: string = `${mockServer.url}/caseworker/search`;
        const payload = {
          userId: { 'userId': '004b7164-0943-41b5-95fc-39794af4a9fe' }
        };
        const resp = await searchCaseworker(path, payload);
        const responseDto = <CaseworkerUserDetailsDto[]> resp.data;
        assertResponses(responseDto);
      });
    });
  });
});

function assertResponses(dto: any) {
  console.log(JSON.stringify(dto));
  expect(dto[0].email_id).to.be.equal('test_person@test.gov.uk');
  expect(dto[0].first_name).to.be.equal('testFN');
  expect(dto[0].last_name).to.be.equal('testLN');
  expect(dto[0].id).to.be.equal('004b7164-0943-41b5-95fc-39794af4a9fe');
  expect(dto[0].base_location[0].location_id).to.be.equal(1);
  expect(dto[0].base_location[0].location).to.be.equal('National');
  expect(dto[0].base_location[0].is_primary).to.be.equal(true);
}
