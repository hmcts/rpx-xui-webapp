import { Matchers } from '@pact-foundation/pact';
import { expect } from 'chai';
import { getDetails } from '../../../../services/idam';
import { PactV3TestSetup } from '../settings/provider.mock';

const { somethingLike, eachLike } = Matchers;
const pactSetUp = new PactV3TestSetup({ provider: 'idamApi_oidc', port: 8000 });

describe('Idam API user details', () => {
  const RESPONSE_BODY = {
    uid: somethingLike('abc123'),
    given_name: somethingLike('Joe'),
    family_name: somethingLike('Bloggs'),
    sub: somethingLike('joe.bloggs@hmcts.net'),
    roles: eachLike('solicitor'),
  };

  describe('get /o/userinfo', () => {
    const jwt = 'some-access-token';

    before(async () => {
      const interaction = {
        states: [{ description: 'userinfo is requested' }],
        uponReceiving: 'a request for userinfo',
        withRequest: {
          method: 'GET',
          path: '/o/userinfo',
          headers: {
            Authorization: 'Bearer some-access-token',
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: RESPONSE_BODY,
        },
      };
      pactSetUp.provider.addInteraction(interaction);
    });

    it('returns the correct response', async () => {
      return pactSetUp.provider.executeTest(async (mockServer) => {
        const taskUrl = `${mockServer.url}`;

        const dto = await getDetails(taskUrl, jwt);
        assertResponses(dto);
      });
    });
  });
});

function assertResponses(dto: IdamGetDetailsResponseDto) {
  expect(dto.uid).to.be.equal('abc123');
  expect(dto.sub).to.be.equal('joe.bloggs@hmcts.net');
  expect(dto.given_name).to.be.equal('Joe');
  expect(dto.family_name).to.be.equal('Bloggs');
  expect(dto.roles[0]).to.be.equal('solicitor');
}

export interface IdamGetDetailsResponseDto {
  uid: string;
  given_name: string;
  family_name: string;
  sub: string;
  roles: string[];
}
