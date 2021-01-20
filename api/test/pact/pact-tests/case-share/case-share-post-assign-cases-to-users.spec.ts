import { Pact } from '@pact-foundation/pact';
import {expect} from 'chai';
import * as getPort from 'get-port';
import * as path from 'path';
import {AssignAccessWithinOrganisationDto, CaseAssignmentResponseDto} from "../pactFixtures";
import {postAssignCasesToUsers} from "../pactUtils";
const {Matchers} = require('@pact-foundation/pact');
const {somethingLike} = Matchers;

describe('Post Cases from CaseAssignment Api', () => {

  let mockServerPort: number;
  let provider: Pact;

  before(async () => {
    mockServerPort = await getPort()
    provider = new Pact({
      consumer: 'XUIWebApp',
      log: path.resolve(process.cwd(), "api/test/pact/logs", "mockserver-integration.log"),
      dir: path.resolve(process.cwd(), "api/test/pact/pacts"),
      logLevel: 'info',
      port: mockServerPort,
      provider: 'CaseShare_api___', //TODO TBD
      spec: 2,
      pactfileWriteMode: "merge"
    })
    return provider.setup()
  })

  // Write Pact when all tests done
  after(() => provider.finalize())

  // verify with Pact, and reset expectations
  afterEach(() => provider.verify())

  let mockRequest = {
    "case_type_id": somethingLike("ecb5edf4-2f5f-4031-a0ec"),
    "case_id":somethingLike("1583841721773828"),
    "assignee_id":somethingLike("PROBATE")
  }

  let mockResponse:AssignAccessWithinOrganisationDto ={
      status_message:somethingLike("Role [Defendant] from the organisation policy successfully assigned to the assignee.")
  }

  describe('When Cases are assigned to Users', () => {
    before(done =>{
      const interaction = {
        state: 'Then a status message is returned',
        uponReceiving: 'A Request for cases to be assigned',
        withRequest: {
          method: "POST",
          path: "/case-assignments",
          headers: {
            "Content-Type": "application/json",
            "ServiceAuthorization": "ServiceAuthToken",
            "Authorization": "Bearer some-access-token"
          }
        },
        willRespondWith: {
          status: 201,
          headers: {
            "Content-Type": "application/json"
          },
          body: {
            mockResponse
          }
        }
      }
      // @ts-ignore
      provider.addInteraction(interaction).then(() => {
        done()
      })
    })

    it('Returns CaseAssingments Response', async () => {

      const taskUrl:string  = `${provider.mockService.baseUrl}/case-assignments`;
      const resp =  postAssignCasesToUsers(taskUrl,mockRequest as any)

        resp.then((axResponse) => {
            expect(axResponse.status).to.be.equal(201);
            const responseDto:AssignAccessWithinOrganisationDto = <AssignAccessWithinOrganisationDto> axResponse.data
            try{
              assertCaseAssignmentResponses(responseDto);
            }catch(e){
              e.toString(`~~~~~ Error when trying to assert the response from the call to the ${taskUrl}` +e);
            }
        })
    })
  })
})

function assertCaseAssignmentResponses(response:AssignAccessWithinOrganisationDto){
  expect(response.status_message).to.be.equal('Role [Defendant] from the organisation policy successfully assigned to the assignee');
}
