import { expect } from 'chai';
import { ProfessionalUserResponse } from '../../pactFixtures';
import { getUsers } from '../../pactUtil';
import { PactV3TestSetup } from '../settings/provider.mock';

const { Matchers } = require('@pact-foundation/pact');
const { eachLike } = Matchers;
const pactSetUp = new PactV3TestSetup({ provider: 'referenceData_professionalExternalUsers', port: 8000 });

describe('RD Professional API Interactions with webapp', () => {
  describe('Get Users', () => {
    before(async () => {
      const interaction = {
        states: [{ description: 'Professional users exist for an Active organisation' }],
        uponReceiving: 'a request for those users',
        withRequest: {
          method: 'GET',
          path: '/refdata/external/v1/organisations/users',
          query: {
            returnRoles: 'true',
            status: 'active'
          },
          headers: {
            'Authorization': 'Bearer some-access-token',
            'Content-Type': 'application/json',
            'ServiceAuthorization': 'serviceAuthToken'
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: getUsersResponse
        }
      };

      pactSetUp.provider.addInteraction(interaction);
    });

    it('returns the correct response', async () => {
      return pactSetUp.provider.executeTest(async (mockServer) => {
        const path: string = `${mockServer.url}/refdata/external/v1/organisations/users?returnRoles=true&status=active`;
        const resp = await getUsers(path);
        const responseDto: ProfessionalUserResponse = <ProfessionalUserResponse>resp.data;
        assertResponse(responseDto);
      });
    });
  });
});

function assertResponse(dto: ProfessionalUserResponse) {
  for (const element of dto.users) {
    expect(element.firstName).to.be.equal('firstName');
    expect(element.lastName).to.be.equal('lastName');
    expect(element.email).to.be.equal('email@org.com');
  }
}

const getUsersResponse = {
  'users': eachLike({
    'userIdentifier': '123456',
    'firstName': 'firstName',
    'lastName': 'lastName',
    'email': 'email@org.com',
    'idamStatus': 'ACTIVE',
    'roles': eachLike('pui-user-manage')
  })
};
