import * as config from 'config';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { PactTestSetup } from '../settings/provider.mock';
import { getAccessManagementServiceAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';
import { somethingLike } from '@pact-foundation/pact/src/dsl/matchers';

const pactSetUp = new PactTestSetup({ provider: 'am_roleAssignment_createSpecificAccessApprovalRole', port: 8000 });

const REQUEST_BODY = {
  state: 1,
  accessReason: 'Approve request',
  typeOfRole: { id: 'specific-access-granted', name: 'specific-access-granted' },
  period: {
    startDate: new Date(),
    endDate: new Date()
  },
  actorId: '123',
  caseName: 'example name',
  requestCreated: null,
  caseId: '1594717367271987',
  taskId: 'd3f939d2-d4f3-11ec-8d51-b6ad61ebbb09',
  requestId: '59bedc19-9cc6-4bff-9f58-041c3ba664a0',
  jurisdiction: 'IA',
  roleCategory: 'LEGAL_OPERATIONS',
  requestedRole: 'specific-access-legal-ops',
  person: { id: 'db17f6f7-1abf-4223-8b5e-1eece04ee5d8', name: null, domain: null },
  specificAccessFormData: {
    specificAccessDurationForm: {
      selectedOption: '7 days',
      selectedDuration: {
        startDate: {
          day: 11,
          month: 11,
          year: 2024
        },
        endDate: {
          day: 11,
          month: 11,
          year: 2024
        }
      }
    }
  }
};

const SPECIFIC_ACCESS_ROLE_ASSIGNMENT_BODY = {
  roleRequest: somethingLike({
    assignerId: somethingLike('123'),
    replaceExisting: somethingLike(false)
  }),
  requestedRoles: somethingLike([{
    roleType: somethingLike('CASE'),
    grantType: somethingLike('SPECIFIC'),
    classification: somethingLike('PUBLIC'),
    attributes: {
      caseId: somethingLike('1234123412341234'),
      jurisdiction: somethingLike('IA')
    },
    roleName: somethingLike('lead-judge'),
    roleCategory: somethingLike('LEGAL_OPERATIONS'),
    actorIdType: somethingLike('IDAM'),
    actorId: somethingLike('123'),
    beginTime: somethingLike('11-07-2023'),
    endTime: somethingLike('18-07-2023')
  }])
};

describe('access management service, create specific access approval role', () => {
  describe('create specific access approval role /allocate-role/specific-access-approval', () => {
    const sandbox: sinon.SinonSandbox = sinon.createSandbox();
    let next;

    beforeEach(() => {
      next = sandbox.spy();
    });

    before(async() => {
      await pactSetUp.provider.setup();
      const roleAssignmentInteraction = {
        state: 'Create specific access approval role for user',
        uponReceiving: 'create specific access approval role',
        withRequest: {
          method: 'POST',
          path: '/am/role-assignments',
          headers: {
            'Authorization': 'Bearer someAuthorizationToken',
            'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/json'
          },
          body: SPECIFIC_ACCESS_ROLE_ASSIGNMENT_BODY
        },
        willRespondWith: {
          status: 200,
          headers: {
            'content-type': 'application/vnd.uk.gov.hmcts.role-assignment-service.post-assignment-query-request+json;charset=UTF-8;version=2.0'
          },
          body: {}
        }
      };
      const refreshRoleAssignmentInteraction = {
        state: 'An actor with provided id is available in role assignment service',
        uponReceiving: 'refresh role assignment for user',
        withRequest: {
          method: 'GET',
          path: '/am/role-assignments/actors/123',
          headers: {
            'Authorization': 'Bearer someAuthorizationToken',
            'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/json'
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'content-type': 'application/vnd.uk.gov.hmcts.role-assignment-service.post-assignment-query-request+json;charset=UTF-8;version=2.0'
          },
          body: {}
        }
      };

      // @ts-ignore
      pactSetUp.provider.addInteraction(roleAssignmentInteraction);
      // @ts-ignore
      pactSetUp.provider.addInteraction(refreshRoleAssignmentInteraction);
    });

    afterEach(() => {
      sandbox.restore();
      sinon.reset();
    });

    it('returns the correct response', async () => {
      const configValues = getAccessManagementServiceAPIOverrides(pactSetUp.provider.mockService.baseUrl);
      sandbox.stub(config, 'get').callsFake((prop) => {
        return configValues[prop];
      });

      const { createSpecificAccessApprovalRole } = requireReloaded('../../../../roleAccess/index');
      const req = mockReq({
        headers: {
          'Authorization': 'Bearer someAuthorizationToken',
          'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
          'content-type': 'application/json'
        },
        session: { passport: { user: { userinfo: { id: '123' } } } },
        body: REQUEST_BODY
      });
      let returnedResponse = null;
      const response = mockRes();
      response.send = (ret) => {
        returnedResponse = ret;
      };

      try {
        await createSpecificAccessApprovalRole(req, response, next);
        assertResponses(returnedResponse);
        pactSetUp.provider.verify();
        pactSetUp.provider.finalize();
      } catch (err) {
        console.log(err.stack);
        pactSetUp.provider.verify();
        pactSetUp.provider.finalize();
        throw new Error(err);
      }
    });
  });
});

function assertResponses(dto: any) {
  console.log('ASSERT RESPONSES', JSON.stringify(dto));
}
