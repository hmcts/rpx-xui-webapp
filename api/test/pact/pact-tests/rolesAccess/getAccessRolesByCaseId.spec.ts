import { expect } from 'chai';
import { PactV3TestSetup } from '../settings/provider.mock';
import { accessRolesByCaseId } from '../../pactUtil';
import { AccessRolesDto } from '../../pactFixtures';

const { Matchers } = require('@pact-foundation/pact');
const { somethingLike } = Matchers;

const pactSetUp = new PactV3TestSetup({ provider: 'am_roleAssignment_queryAssignment', port: 8000 });
const RAS_V2_HEADER = 'application/vnd.uk.gov.hmcts.role-assignment-service.post-assignment-query-request+json;charset=UTF-8;version=2.0';

describe('getAccessRolesByCaseId - access management service, query role assignments', () => {
  const REQUEST_BODY = {
    'queryRequests': [
      {
        'attributes': {
          'caseId': ['1546883526751282']
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

  describe('POST  /am/role-assignments/query', () => {
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
            'content-type': RAS_V2_HEADER
          },
          body: REQUEST_BODY
        },
        willRespondWith: {
          status: 200,
          headers: {
            'content-type': RAS_V2_HEADER
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
              'attributes': {
                'caseId': ['1546883526751282']
              }
            }
          ]
        };
        const response = await accessRolesByCaseId(path, payload);
        const accessRolesResponse = <AccessRolesDto> response.data;
        console.log('....accessLogResponseReceived is \n \n ', accessRolesResponse);
        assertResponses(accessRolesResponse);
      });
    });
  });
});

function assertResponses(dto: AccessRolesDto) {
  console.log(dto);
  expect(dto.roleAssignmentResponse[0].id).to.be.equal('b83acc2f-6720-4cf9-a1f8-52367c35963d');
  expect(dto.roleAssignmentResponse[0].actorIdType).to.be.equal('IDAM');
  expect(dto.roleAssignmentResponse[0].actorId).to.be.equal('271ebdd4-f757-492d-b57f-101b8e47c90e');
  expect(dto.roleAssignmentResponse[0].roleType).to.be.equal('CASE');
  expect(dto.roleAssignmentResponse[0].roleName).to.be.equal('case-manager');
  expect(dto.roleAssignmentResponse[0].classification).to.be.equal('PUBLIC');
  expect(dto.roleAssignmentResponse[0].grantType).to.be.equal('SPECIFIC');
  expect(dto.roleAssignmentResponse[0].beginTime).to.be.equal('2022-09-15T23:00:00Z');
  expect(dto.roleAssignmentResponse[0].readOnly).to.be.equal(false);
  expect(dto.roleAssignmentResponse[0].created).to.be.equal('2022-09-16T13:06:44.295367Z');
  expect(dto.roleAssignmentResponse[0].attributes.substantive).to.be.equal('Y');
  expect(dto.roleAssignmentResponse[0].attributes.caseId).to.be.equal('1546883526751282');
  expect(dto.roleAssignmentResponse[0].attributes.jurisdiction).to.be.equal('IA');
  expect(dto.roleAssignmentResponse[0].attributes.caseType).to.be.equal('Asylum');
}
