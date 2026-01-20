import { expect } from 'chai';
import { PactV3TestSetup } from '../settings/provider.mock';
import { getUsers } from '../../pactUtil';
import { CaseworkerUserDetailsDto } from '../../pactFixtures';

const { Matchers } = require('@pact-foundation/pact');
const { somethingLike } = Matchers;
const pactSetUp = new PactV3TestSetup({ provider: 'referenceData_caseworkerRefUsers', port: 8000 });

/*
    Currently not able to see a Pact requirement for this as on MC the calls to location api are only
    for this end point: /refdata/caseworker/location/{locationId}/service/{serviceId}
    Example : /refdata/caseworker/location/1/service/IA
    Hence this pact is disabled for now.
*/

xdescribe('Caseworker ref data api, get all caseworkers for a specific location and service', () => {
  const baseLocations = [
    { location_id: somethingLike(1),
      location: somethingLike('National'),
      is_primary: somethingLike(true) }
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

  describe('get Caseworkers For A Location And Service', () => {
    before(async () => {
      const interaction = {
        states: [{ description: ' Get A list of users given a location and a Service' }],
        uponReceiving: 'get list of caseworkers for location and service',
        withRequest: {
          method: 'GET',
          path: '/refdata/caseworker/location/1/service/IA',
          headers: {
            'Authorization': 'Bearer someAuthorizationToken',
            'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/json'
          }
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
        const path: string = `${mockServer.url}/refdata/caseworker/location/1/service/IA}`;
        const resp = await getUsers(path);
        const responseDto = <CaseworkerUserDetailsDto[]> resp.data;
        assertUserDetailsResponse(responseDto);
      });
    });
  });
});
function assertUserDetailsResponse(responseDto: CaseworkerUserDetailsDto[]): void {
  // eslint-disable-next-line no-unused-expressions
  expect(responseDto).to.be.not.null;
  for (const element of responseDto) {
    expect(element.first_name).to.equal('testFN');
    expect(element.last_name).to.equal('testLN');
    expect(element.user_type).to.equal('HMCTS');
    expect(element.email_id).to.equal('test_person@test.gov.uk');
    expect(responseDto[0].base_location[0].location_id).to.be.equal(1);
    expect(responseDto[0].base_location[0].location).to.be.equal('National');
    expect(responseDto[0].base_location[0].is_primary).to.be.equal(true);
  }
}
