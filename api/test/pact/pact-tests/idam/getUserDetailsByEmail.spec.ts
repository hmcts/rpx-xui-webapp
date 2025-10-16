import { expect } from 'chai';
import { getIdamUsersByEmail } from '../../pactUtil';
import { PactV3TestSetup } from '../settings/provider.mock';

const { Matchers } = require('@pact-foundation/pact');
const { somethingLike } = Matchers;
const pactSetUp = new PactV3TestSetup({ provider: 'idamApi_users', port: 8000 });

describe('Idam Get user by email', async () => {
  const RESPONSE_BODY = {
    id: somethingLike('abc123'),
    forename: somethingLike('Joe'),
    surname: somethingLike('Bloggs'),
    email: somethingLike('joe.bloggs@hmcts.net'),
    active: somethingLike(true),
    roles: somethingLike([
      somethingLike('solicitor'), somethingLike('caseworker')
    ])
  };

  describe('get /users?email', () => {
    before(async () => {
      const interaction = {
        states: [{ description: 'a user exists with email joe@bloggs.net' }],
        uponReceiving: 'a request for that user by email',
        withRequest: {
          method: 'GET',
          path: '/users',
          query: {
            email: 'joe@bloggs.net'
          },
          headers: {
            Authorization: 'Bearer some-access-token'
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

    it('Returns the correct response', async () => {
      return pactSetUp.provider.executeTest(async (mockServer) => {
        const taskUrl = `${mockServer.url}/users?email=joe@bloggs.net`;

        const response = await getIdamUsersByEmail(taskUrl);
        const dto = await response.data;
        assertResponses(dto);
      });
    });
  });
});

function assertResponses(dto: IdamGetDetailsResponseDto) {
  expect(dto.id).to.be.equal('abc123');
  expect(dto.email).to.be.equal('joe.bloggs@hmcts.net');
  expect(dto.forename).to.be.equal('Joe');
  expect(dto.surname).to.be.equal('Bloggs');
  expect(dto.roles[0]).to.be.equal('solicitor');
  expect(dto.roles[1]).to.be.equal('caseworker');
}

export interface IdamGetDetailsResponseDto {
  id: string,
  forename: string,
  surname: string,
  email: string,
  active: boolean,
  roles: string[]
}
