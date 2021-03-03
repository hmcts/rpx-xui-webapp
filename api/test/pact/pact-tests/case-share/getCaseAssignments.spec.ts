import { expect } from 'chai';
import { CaseAssignmentResponseDto } from "../../pactFixtures";
import { getCaseAssignments } from "../../pactUtil";
import { PactTestSetup } from '../settings/provider.mock';

const { Matchers } = require('@pact-foundation/pact');
const { somethingLike, like, eachLike } = Matchers;
const pactSetUp = new PactTestSetup({ provider: 'acc_manageCaseAssignment', port: 8000 });


describe('Get Cases from CaseAssignment Api', () => {

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
    before(async () => {
      await pactSetUp.provider.setup()
      const interaction = {
        state: 'Case assignments exist for case Ids',
        uponReceiving: 'a request for those cases',
        withRequest: {
          method: "GET",
          path: "/case-assignments",
          query: "case_ids=12345678,87654321",
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
      pactSetUp.provider.addInteraction(interaction)
    })

    it('Returns CaseAssignments Response', async () => {

      const taskUrl: string = `${pactSetUp.provider.mockService.baseUrl}/case-assignments?case_ids=12345678,87654321`;
      const resp = getCaseAssignments(taskUrl)
      resp.then((axResponse) => {
        const responseDto: CaseAssignmentResponseDto = <CaseAssignmentResponseDto>axResponse.data
        try {
          assertCaseAssignmentResponses(responseDto);
        } catch (e) {
          e.toString(`~~~~~Error when trying to assert the response from the call to the ${taskUrl}` + e);
        }
      }).then(() => {
        pactSetUp.provider.verify()
        pactSetUp.provider.finalize()
      })
    })
  })
})


const caseAssignmentResponseDto: CaseAssignmentResponseDto = {
  status_message: somethingLike("Case-User-Role assignments returned successfully"),
  case_assignments: somethingLike(
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

function assertCaseAssignmentResponses(response: CaseAssignmentResponseDto) {
  expect(response.status_message).to.be.equal('Case-User-Role assignments returned successfully');
  expect(response.case_assignments[0].sharedWith[0].first_name).to.be.equal("Bill");
  expect(response.case_assignments[0].sharedWith[0].last_name).to.be.equal("Roberts");
  expect(response.case_assignments[0].sharedWith[0].case_roles[0]).to.be.equal("Claimant");
  expect(response.case_assignments[0].sharedWith[0].case_roles[1]).to.be.equal("Defendant");
}
