import { expect } from 'chai';
import { PactV3TestSetup } from '../settings/provider.mock';
import { postS2SLease } from '../../pactUtil';
import { S2SResponse } from '../../pactFixtures';

const pactSetUp = new PactV3TestSetup({ provider: 's2s_auth', port: 8000 });

describe('S2S Auth API', () => {
  describe('post S2S lease', () => {
    const mockRequest = {
      microservice: 'xui-webapp', oneTimePassword: 'exPassword'
    };

    before(async () => {
      const interaction = {
        states: [{ description: 'microservice with valid credentials' }],
        uponReceiving: 'a request for a token',
        withRequest: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'ServiceAuthorization': 'ServiceAuthToken'
          },
          path: '/lease',
          body: mockRequest
        },
        willRespondWith: {
          headers: {
            'Content-Type': 'text/plain'
          },
          status: 200,
          body: 'sometoken'
        }
      };
      pactSetUp.provider.addInteraction(interaction);
    });

    it('returns the correct response', async () => {
      return pactSetUp.provider.executeTest(async (mockServer) => {
        const s2sUrl: string = `${mockServer.url}/lease`;
        try {
          const resp = await postS2SLease(s2sUrl, mockRequest);
          assertResponse(resp.data);
        } catch (e) {
          throw new Error(e);
        }
      });
    });
  });
});

function assertResponse(dto: S2SResponse) {
  expect(dto).to.be.equal('sometoken');
}
