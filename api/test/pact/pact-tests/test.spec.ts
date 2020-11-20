import { Pact } from '@pact-foundation/pact'
import { expect } from 'chai'
import * as getPort from 'get-port'
import * as path from 'path'
import { getDetails } from '../../../services/idam'

describe('Reference Data API', () => {

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
      log: path.resolve(__dirname, '../logs', 'sidam-integration.log'),
      logLevel: 'info',
      port: MOCK_SERVER_PORT,
      provider: 'Idam_api',
      spec: 2,
    })
    return provider.setup()
  })

  // Write Pact when all tests done
  after(() => provider.finalize())

  // verify with Pact, and reset expectations
  afterEach(() => provider.verify())

  describe('get /details', () => {

    const EXPECTED_BODY = {
      active: true,
      email: "boris@hmcts.net",
      forename: "Boris",
      id: "abc123",
      roles: [
        "solicitor",
        "caseworker",
      ],
      surname: "Peterson",
    }

    const interaction = {
      state: "request for user details",
      uponReceiving: "sidam_user_details will respond with:",
      withRequest: {
        method: "GET",
        path: "/details",
        headers: {
          Authorization: "Bearer some-access-token"
        },
      },
      willRespondWith: {
        body: EXPECTED_BODY,
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
      },
    }

    // @ts-ignore
    before(() => provider.addInteraction(interaction))

    const jwt = 'some-access-token'

    it("returns the correct response", async () => {
      const response = await getDetails(idamTestUrl, jwt)
      expect(response).to.eql(EXPECTED_BODY)
    })
  })
})
