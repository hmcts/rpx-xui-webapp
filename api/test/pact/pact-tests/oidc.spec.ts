import { oidc } from '@hmcts/rpx-xui-node-lib'
import { Pact } from '@pact-foundation/pact'
import { assert } from 'chai'
import * as getPort from 'get-port'
import * as path from 'path'
import mockResponse from '../mocks/openid-well-known-configuration.mock'

describe("OpenId Connect API", () => {

  let MOCK_SERVER_PORT
  let idamTestUrl
  let provider

  // Setup the provider
  before(async () => {
    MOCK_SERVER_PORT = await getPort()
    idamTestUrl = `http://localhost:${MOCK_SERVER_PORT}`
    provider = new Pact({
      consumer: 'xui_approve_org',
      dir: path.resolve(__dirname, '../pacts'),
      log: path.resolve(__dirname, '../logs', 'oidc-integration.log'),
      logLevel: 'info',
      port: MOCK_SERVER_PORT,
      provider: 'Idam_oidc_api',
      spec: 2,
    })
    return provider.setup()
  })

  // Write Pact when all tests done
  after(() => provider.finalize())

  // verify with Pact, and reset expectations
  afterEach(() => provider.verify())

  describe('when a request to .well-known endpoint is made', () => {
    before(() =>
      provider.addInteraction({
        state: '.well-known endpoint',
        uponReceiving: 'a request for configuration',
        withRequest: {
          method: 'GET',
          path: "/o/.well-known/openid-configuration",
        },
        willRespondWith: {
          status: 200,
          headers: {'Content-Type': 'application/json'},
          body: mockResponse,
        }
      })
    )

    it('returns a json configuration', async () => {
      const oidcUrl = `${provider.mockService.baseUrl}/o`

      // @ts-ignore
      const issuer = await oidc.configure({
        allowRolesRegex: '.',
        authorizationURL: `${oidcUrl}/authorize`,
        callbackURL: `${provider.mockService.baseUrl}/oauth2/callback`,
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
        useRoutes: false,
      })
      assert.isDefined(issuer, 'issuer exists')
    })
  })

})
