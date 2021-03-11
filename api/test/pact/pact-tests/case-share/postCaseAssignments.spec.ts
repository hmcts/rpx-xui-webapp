import { expect } from 'chai';
import { AssignAccessWithinOrganisationDto } from "../../pactFixtures";
import { postAssignCasesToUsers } from "../../pactUtil";
import { PactTestSetup } from '../settings/provider.mock';

const {Matchers} = require('@pact-foundation/pact');
const {somethingLike} = Matchers;
const pactSetUp = new PactTestSetup({ provider: 'acc_manageCaseAssignment', port: 8000 });


describe('Post Cases from CaseAssignment Api', () => {

  let mockRequest = {
    "case_type_id": "PROBATE" ,
    "case_id": "1583841721773828" ,
    "assignee_id": "0a5874a4-3f38-4bbd-ba4c"
  }

  let mockResponse:AssignAccessWithinOrganisationDto ={
      status_message:somethingLike("Roles Role1,Role2 from the organisation policies successfully assigned to the assignee.")
  }

  describe('When Cases are assigned to Users', () => {
    before(async () =>{
      await pactSetUp.provider.setup()
      const interaction = {
        state: 'Assign a user to a case',
        uponReceiving: 'A request for that case to be assigned',
        withRequest: {
          method: "POST",
          path: "/case-assignments",
          headers: {
            "Content-Type": "application/json",
            "ServiceAuthorization": "ServiceAuthToken",
            "Authorization": "Bearer some-access-token"
          },
          body: mockRequest
        },
        willRespondWith: {
          status: 201,
          headers: {
            "Content-Type": "application/json"
          },
          body: mockResponse
        }
      }
      // @ts-ignore
      pactSetUp.provider.addInteraction(interaction)
    })

    it('Returns CaseAssingments Response', async () => {

      const taskUrl:string  = `${pactSetUp.provider.mockService.baseUrl}/case-assignments`;
      const resp =  postAssignCasesToUsers(taskUrl,mockRequest as any)

        resp.then((axResponse) => {
            expect(axResponse.status).to.be.equal(201);
            const responseDto:AssignAccessWithinOrganisationDto = <AssignAccessWithinOrganisationDto> axResponse.data
            try{
              assertCaseAssignmentResponses(responseDto);
            }catch(e){
              e.toString(`~~~~~ Error when trying to assert the response from the call to the ${taskUrl}` +e);
            }
        }).then(() => {
          pactSetUp.provider.verify()
          pactSetUp.provider.finalize()
        })
    })
  })
})

function assertCaseAssignmentResponses(response:AssignAccessWithinOrganisationDto){
  expect(response.status_message).to.be.equal('Roles Role1,Role2 from the organisation policies successfully assigned to the assignee.');
}
