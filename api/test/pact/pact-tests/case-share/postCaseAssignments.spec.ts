import { expect } from 'chai';
import { AssignAccessWithinOrganisationDto } from '../../pactFixtures';
import { postAssignCasesToUsers } from '../../pactUtil';
import { PactV3TestSetup } from '../settings/provider.mock';

const { Matchers } = require('@pact-foundation/pact');
const { somethingLike } = Matchers;
const pactSetUp = new PactV3TestSetup({ provider: 'acc_manageCaseAssignment', port: 8000 });

describe('Post Cases from CaseAssignment Api', () => {
  const mockRequest = {
    'case_type_id': 'PROBATE',
    'case_id': '1583841721773828',
    'assignee_id': '0a5874a4-3f38-4bbd-ba4c'
  };

  const mockResponse:AssignAccessWithinOrganisationDto ={
    status_message: somethingLike('Roles Role1,Role2 from the organisation policies successfully assigned to the assignee.')
  };

  describe('When Cases are assigned to Users', () => {
    before(async () => {
      const interaction = {
        states: [{ description: 'Assign a user to a case' }],
        uponReceiving: 'A request for that case to be assigned',
        withRequest: {
          method: 'POST',
          path: '/case-assignments',
          headers: {
            'Content-Type': 'application/json',
            'ServiceAuthorization': 'ServiceAuthToken',
            'Authorization': 'Bearer some-access-token'
          },
          body: mockRequest
        },
        willRespondWith: {
          status: 201,
          headers: {
            'Content-Type': 'application/json'
          },
          body: mockResponse
        }
      };

      pactSetUp.provider.addInteraction(interaction);
    });

    it('Returns CaseAssingments Response', async () => {
      return pactSetUp.provider.executeTest(async (mockServer) => {
        const taskUrl:string = `${mockServer.url}/case-assignments`;
        const resp = await postAssignCasesToUsers(taskUrl, mockRequest as any);
        expect(resp.status).to.be.equal(201);
        const responseDto:AssignAccessWithinOrganisationDto = <AssignAccessWithinOrganisationDto> resp.data;
        assertCaseAssignmentResponses(responseDto);
      });
    });
  });
});

function assertCaseAssignmentResponses(response:AssignAccessWithinOrganisationDto) {
  expect(response.status_message).to.be.equal('Roles Role1,Role2 from the organisation policies successfully assigned to the assignee.');
}
