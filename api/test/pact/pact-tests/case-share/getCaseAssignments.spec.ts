import { Pact } from '@pact-foundation/pact';
import {assert, expect} from 'chai';
import * as getPort from 'get-port';
import * as path from 'path';
import {CaseAssignmentResponseDto} from "../../pactFixtures";
import {getCaseAssignments} from "../../pactUtil";
const {Matchers} = require('@pact-foundation/pact');
const {somethingLike, like, eachLike} = Matchers;

describe('Get Cases from CaseAssignment Api', () => {

  let mockServerPort: number;
  let provider: Pact;

  before(async () => {
    mockServerPort = await getPort()
    provider = new Pact({
      consumer: 'xui_webApp',
      log: path.resolve(process.cwd(), "api/test/pact/logs", "mockserver-integration.log"),
      dir: path.resolve(process.cwd(), "api/test/pact/pacts"),
      logLevel: 'info',
      port: mockServerPort,
      provider: 'acc_manageCaseAssignment',
      spec: 2,
      pactfileWriteMode: "merge"
    })
    return provider.setup()
  })

  // Write Pact when all tests done
  after(() => provider.finalize())

  // verify with Pact, and reset expectations
  afterEach(() => provider.verify())


  let mockResponse = {
    "status_message": "Case-User-Role assignments returned successfully",
    "case_assignments": [
      {
        "case_id": somethingLike("1588234985453946"),
        "shared_with": [
          {
            "idam_id": somethingLike("221a2877-e1ab-4dc4-a9ff-f9424ad58738"),
            "first_name": somethingLike("Bill"),
            "last_name": somethingLike("Roberts"),
            "email": somethingLike("bill.roberts@greatbrsolicitors.co.uk"),
            "case_roles": somethingLike([
              "[Claimant]",
              "[Defendant]"
            ])
          }
        ]
      }
    ]
  }

  describe('when requested to get case assignments for array of CaseIds ', () => {
    before(done =>{
      const interaction = {
        state: 'Case assignments exist for case Ids',
        uponReceiving: 'a request for those cases',
        withRequest: {
          method: "GET",
          path: "/case-assignments",
          query:"case_ids=12345678,87654321",
          headers: {
            "Content-Type": "application/json",
            "ServiceAuthorization": "ServiceAuthToken",
            "Authorization": "Bearer some-access-token"
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          },
          body: caseAssignmentResponseDto
        }
      }
      // @ts-ignore
      provider.addInteraction(interaction).then(() => {
        done()
      })
    })

    it('Returns CaseAssignments Response', async () => {

      const taskUrl:string  = `${provider.mockService.baseUrl}/case-assignments?case_ids=12345678,87654321`;
      const resp =  getCaseAssignments(taskUrl)
        resp.then((axResponse) => {
            const responseDto:CaseAssignmentResponseDto = <CaseAssignmentResponseDto> axResponse.data
            try{
              assertCaseAssignmentResponses(responseDto);
            }catch(e){
              e.toString(`~~~~~Error when trying to assert the response from the call to the ${taskUrl}` +e);
            }
        })
    })
  })
})


const caseAssignmentResponseDto:CaseAssignmentResponseDto = {
  status_message: somethingLike("Case-User-Role assignments returned successfully"),
  case_assignments:somethingLike(
    [
      {
        "case_id": somethingLike("1588234985453946"),
        "shared_with": [
          {
            "idam_id": somethingLike("221a2877-e1ab-4dc4-a9ff-f9424ad58738"),
            "first_name": somethingLike("Bill"),
            "last_name": somethingLike("Roberts"),
            "email": somethingLike("bill.roberts@greatbrsolicitors.co.uk"),
            "case_roles": somethingLike([
              "[Claimant]",
              "[Defendant]"
            ])
          }
        ]
      }
    ])
}

function assertCaseAssignmentResponses(response:CaseAssignmentResponseDto){
  expect(response.status_message).to.be.equal('Case-User-Role assignments returned successfully');
  expect(response.case_assignments[0].sharedWith[0].first_name).to.be.equal("Bill");
  expect(response.case_assignments[0].sharedWith[0].last_name).to.be.equal("Roberts");
  expect(response.case_assignments[0].sharedWith[0].case_roles[0]).to.be.equal("Claimant");
  expect(response.case_assignments[0].sharedWith[0].case_roles[1]).to.be.equal("Defendant");
}
