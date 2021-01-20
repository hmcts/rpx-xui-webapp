import { Pact } from '@pact-foundation/pact'
import { expect } from 'chai'
import * as path from 'path'
import { getDetails } from '../../../../services/idam'
import * as getPort from "get-port";
import {some} from "../../../../lib/util";
import {eachLike} from "@pact-foundation/pact/dsl/matchers";
import arrayContaining = jasmine.arrayContaining;
const {Matchers} = require('@pact-foundation/pact');
const {somethingLike} = Matchers;

let mockServerPort: number;
let provider: Pact;

describe("Idam API user details", async() => {
    mockServerPort = await getPort()
    provider = new Pact({
    port: mockServerPort,
    log: path.resolve(process.cwd(), "api/test/pact/logs", "mockserver-integration.log"),
    dir: path.resolve(process.cwd(), "api/test/pact/pacts"),
    spec: 2,
    consumer: "xui_manageOrg_user_details",
    provider: "Idam_api",
    pactfileWriteMode: "merge",
  })

  const RESPONSE_BODY = {
    "id": somethingLike("abc123"),
    "forename": somethingLike("Joe"),
    "surname": somethingLike("Bloggs"),
    "email": somethingLike("joe.bloggs@hmcts.net"),
    "active": somethingLike(true),
    "roles":somethingLike([
      somethingLike("solicitor"),somethingLike("caseworker")
    ])
  }
  // Setup the provider
  before(() => provider.setup())
  // Write Pact when all tests done
  after(() => provider.finalize())
  // verify with Pact, and reset expectations
  afterEach(() => provider.verify())
  describe("get /details", () => {

    const jwt = 'some-access-token';

    before(done => {
      const interaction = {
        state: "a user exists",
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
          body: RESPONSE_BODY,
        },
      }
      // @ts-ignore
      provider.addInteraction(interaction).then(() => {
        done()
      })
    })
    it("returns the correct response", (done) => {
      const taskUrl = `${provider.mockService.baseUrl}`;

      const response:Promise<any>  = getDetails(taskUrl,jwt);

      response.then((axiosResponse) => {
        const dto:IdamGetDetailsResponseDto = <IdamGetDetailsResponseDto> axiosResponse;
        assertResponses(dto);
      }).then(done,done)
    })
  })
})

function assertResponses(dto:IdamGetDetailsResponseDto){
  expect(dto.active).to.be.equal(true);
  expect(dto.email).to.be.equal('joe.bloggs@hmcts.net');
  expect(dto.forename).to.be.equal('Joe');
  expect(dto.surname).to.be.equal('Bloggs');
  expect(dto.roles[0]).to.be.equal('solicitor');
  expect(dto.roles[1]).to.be.equal('caseworker');
}

export interface IdamGetDetailsResponseDto{
  id:string,
  forename:string,
  surname:string,
  email:string,
  active:boolean
  roles:string[]
}
