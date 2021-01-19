import { UserDetails } from '@hmcts/rpx-xui-common-lib/lib/models/user-details.model';
import { Pact } from '@pact-foundation/pact';
import { expect } from 'chai';
import * as getPort from 'get-port';
import * as path from 'path';
import { getUsers } from '../../pactUtil';

const {Matchers} = require('@pact-foundation/pact');
const {somethingLike, like, eachLike} = Matchers;

describe("RD Professional API Interactions with webapp", () => {
  let mockServerPort: number
  let provider: Pact


  // Setup the provider
  before(async() => {
    mockServerPort = await getPort()
    provider = new Pact({
      consumer: "XUIWebapp",
      provider: "RdProfessionalApi",
      log: path.resolve(process.cwd(), "api/test/pact/logs", "mockserver-integration.log"),
      dir: path.resolve(process.cwd(), "api/test/pact/pacts"),
      logLevel: 'info',
      port: mockServerPort,
      spec: 2,
      pactfileWriteMode: "merge"
    })
    return provider.setup()
  })

  // Write Pact when all tests done
  after(() => provider.finalize())

  // verify with Pact, and reset expectations
  afterEach(() => provider.verify())

  describe("Get Users", () => {

    const jwt = 'some-access-token'

    before(done => {
      const interaction = {
        state: "Organisations with users exists",
        uponReceiving: "receiving get active organisation users",
        withRequest: {
          method: "GET",
          path: "/refdata/external/v1/organisations/users",
          query: "returnRoles=true&status=active",
          headers: {
            "Content-Type": "application/json",
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: getUsersResponse,
        },
      }
      // @ts-ignore
      provider.addInteraction(interaction).then(() => {
        done()
      })
    })

    it("returns the correct response", done => {
      const path: string = `${provider.mockService.baseUrl}/refdata/external/v1/organisations/users?returnRoles=true&status=active`;

      const resp =  getUsers(path);
      resp.then((response) => {
         const responseDto:UserDetails[]   = <UserDetails[]> response.data
         assertResponse(responseDto);
      }).then(done,done)
    })
   })
})

function assertResponse(dto:UserDetails[]){
  for(var element of dto ) {
    expect(element.idamId).to.equal('newidentifier');
    expect(element.firstName).to.be.equal('willis');
    expect(element.lastName).to.be.equal('bob');
    expect(element.email).to.be.equal('abc@abc.com');
  }
}

const getUsersResponse: UserDetails[] = [
  {
    idamId:	somethingLike('newidentifier'),
    firstName:	somethingLike('willis'),
    email:somethingLike("abc@abc.com"),
    lastName: somethingLike('bob')
  }
]
