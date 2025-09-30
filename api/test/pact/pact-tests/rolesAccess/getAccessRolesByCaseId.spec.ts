import { expect } from 'chai';
import { PactV3TestSetup } from '../settings/provider.mock';
import { accessRolesByCaseId } from '../../pactUtil';
import { AccessRolesDto } from '../../pactFixtures';

const { Matchers } = require('@pact-foundation/pact');
const { somethingLike } = Matchers;

const pactSetUp = new PactV3TestSetup({ provider: 'am_roleAssignment_queryAssignment', port: 8000 });

const caseId = '12345';

xdescribe('getAccessRolesByCaseId - access management service, query role assignments', () => {
  const REQUEST_BODY = {
    queryRequests: [
      {
        attributes: {
          caseId: [somethingLike('12345')]
        }
      }
    ]
  };
  const RESPONSE_BODY = {
    roleAssignmentResponse: [
      {
        id: somethingLike('b83acc2f-6720-4cf9-a1f8-52367c35963d'),
        actorIdType: somethingLike('IDAM'),
        actorId: somethingLike('271ebdd4-f757-492d-b57f-101b8e47c90e'),
        roleType: somethingLike('CASE'),
        roleName: somethingLike('case-manager'),
        classification: somethingLike('PUBLIC'),
        grantType: somethingLike('SPECIFIC'),
        roleCategory: somethingLike('LEGAL_OPERATIONS'),
        readOnly: somethingLike(false),
        beginTime: somethingLike('2022-09-15T23:00:00Z'),
        created: somethingLike('2022-09-16T13:06:44.295367Z'),
        attributes: {
          substantive: somethingLike('Y'),
          caseId: somethingLike('1546883526751282'),
          jurisdiction: somethingLike('IA'),
          caseType: somethingLike('Asylum')
        }
      }
    ]
  };

  describe('post /am/role-assignments/query', () => {
    before(async () => {
      const interaction = {
        states: [{ description: 'A list of role assignments for the search query' }],
        uponReceiving: 'query role assignments for caseId',
        withRequest: {
          method: 'POST',
          path: '/am/role-assignments/query',
          headers: {
            'Authorization': 'Bearer someAuthorizationToken',
            'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
            'Content-Type': 'application/vnd.uk.gov.hmcts.role-assignment-service.post-assignment-query-request+json;charset=UTF-8;version=2.0'
          },
          body: REQUEST_BODY
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/vnd.uk.gov.hmcts.role-assignment-service.post-assignment-query-request+json;charset=UTF-8;version=2.0'
          },
          body: RESPONSE_BODY
        }
      };

      pactSetUp.provider.addInteraction(interaction);
    });

    it('returns the correct response', async () => {
      return pactSetUp.provider.executeTest(async (mockServer) => {
        const path: string = `${mockServer.url}/am/role-assignments/query`;
        const payload = {
          queryRequests: [
            {
              attributes: {
                caseId: '12345'
              }
            }
          ]
        };
        const response = await accessRolesByCaseId(path, payload);
        //console.log(' response .headers for getAccessRolesByCaseID', response.headers);
        const accessRolesResponse = <AccessRolesDto[]> response.data;
        assertResponses(accessRolesResponse);
      });
    });
  });
});

function assertResponses(dto: any) {
  console.log(dto);
  expect(dto.length).to.be.equal(1);
  expect(dto[0].actions[0].id).to.be.equal('reallocate');
  expect(dto[0].actions[0].title).to.be.equal('Reallocate');
  expect(dto[0].actorId).to.be.equal('271ebdd4-f757-492d-b57f-101b8e47c90e');
  expect(dto[0].end).to.be.equal(null);
  expect(dto[0].id).to.be.equal('b83acc2f-6720-4cf9-a1f8-52367c35963d');
  expect(dto[0].roleId).to.be.equal(null);
  expect(dto[0].location).to.be.equal(null);
  expect(dto[0].roleCategory).to.be.equal('LEGAL_OPERATIONS');
  expect(dto[0].roleName).to.be.equal('case-manager');
  expect(dto[0].start).to.be.equal('2022-09-15T23:00:00Z');
  expect(dto[0].created).to.be.equal('2022-09-16T13:06:44.295367Z');
  expect(dto[0].notes).to.be.equal('No reason for case access given');
  expect(dto[0].requestedRole).to.be.equal(null);
}
