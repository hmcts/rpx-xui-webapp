import { oidc } from '@hmcts/rpx-xui-node-lib';
import { assert } from 'chai';
import mockResponse from '../../mocks/openid-well-known-configuration.mock';
import { PactV3TestSetup } from '../settings/provider.mock';

const pactSetUp = new PactV3TestSetup({ provider: 'idamApi_oidc', port: 8000 });

describe('OpenId Connect API', () => {
  describe('when a request to a well-known endpoint is made', () => {
    before(async () => {
      pactSetUp.provider.addInteraction({
        states: [{ description: '.well-known endpoint' }],
        uponReceiving: 'a request for configuration',
        withRequest: {
          method: 'GET',
          path: '/o/.well-known/openid-configuration'
        },
        willRespondWith: {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          body: mockResponse
        }
      });
    });

    it('returns a json configuration', async () => {
      return pactSetUp.provider.executeTest(async (mockServer) => {
        const oidcUrl = `${mockServer.url}/o`;

        const issuer = oidc.configure({
          allowRolesRegex: '.',
          authorizationURL: `${oidcUrl}/authorize`,
          callbackURL: `${mockServer.url}/oauth2/callback`,
          clientID: 'rpx-ao',
          clientSecret: 'secret',
          discoveryEndpoint: `${oidcUrl}/.well-known/openid-configuration`,
          issuerURL: `${oidcUrl}`,
          logoutURL: `${oidcUrl}/logout`,
          responseTypes: ['code'],
          scope: 'openid email',
          sessionKey: 'xui-webapp',
          tokenEndpointAuthMethod: 'client_secret_post',
          tokenURL: `${oidcUrl}/token`,
          useRoutes: false
        });
        await oidc.discover();
        assert.isDefined(issuer, 'issuer exists');
      });
    });
  });
});
