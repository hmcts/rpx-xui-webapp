import { Pact } from '@pact-foundation/pact'
import { expect } from 'chai'
import * as path from 'path'
import { getDetails } from '../../../services/idam'

describe("SIDAM API", () => {
  const idamTestUrl = "http://localhost:8992"
  const port = 8992
  const provider = new Pact({
    port: port,
    log: path.resolve(process.cwd(), "api/test/pact/logs", "mockserver-integration.log"),
    dir: path.resolve(process.cwd(), "api/test/pact/pacts"),
    spec: 2,
    consumer: "xui_webapp_sidam_user_details",
    provider: "sidam_user_details",
    pactfileWriteMode: "merge",
  })

  const EXPECTED_BODY = {
    "id": "abc123",
    "forename": "Boris",
    "surname": "Peterson",
    "email": "boris@hmcts.net",
    "active": true,
    "roles": [
      "solicitor",
      "caseworker"
    ]
  }

  // Setup the provider
  before(() => provider.setup())

  // Write Pact when all tests done
  after(() => provider.finalize())

  // verify with Pact, and reset expectations
  afterEach(() => provider.verify())

  describe("get /details", () => {

    const jwt = 'some-access-token'
    before(done => {
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
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: EXPECTED_BODY,
        },
      }
      // @ts-ignore
      provider.addInteraction(interaction).then(() => {
        done()
      })
    })

    it("returns the correct response", done => {

      getDetails(idamTestUrl, jwt).then(response => {
        console.log(response)
        expect(response).to.eql(EXPECTED_BODY)
        done()
      }, done)
    })
  })
})
