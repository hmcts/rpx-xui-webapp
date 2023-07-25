import * as config from 'config';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { PactTestSetup } from '../settings/provider.mock';
import { getAccessManagementServiceAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';
import { somethingLike } from '@pact-foundation/pact/src/dsl/matchers';

const pactSetUp = new PactTestSetup({ provider: 'am_roleAssignment_restoreSpecificAccessRequestRole', port: 8000 });

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

const ROLE_ASSIGNMENTS_BODY = somethingLike({
  roleRequest: somethingLike({
    assignerId: 'db17f6f7-1abf-4223-8b5e-1eece04ee5d8',
    replaceExisting: true,
    process: 'specific-access',
    reference: '1594717367271987/specific-access-legal-ops/db17f6f7-1abf-4223-8b5e-1eece04ee5d8'
  }),
  requestedRoles: somethingLike([
    {
      roleType: somethingLike('CASE'),
      readOnly: somethingLike(true),
      grantType: somethingLike('BASIC'),
      classification: somethingLike('PRIVATE'),
      attributes: {
        caseId: somethingLike('1594717367271987'),
        requestedRole: somethingLike('specific-access-legal-ops')
      },
      roleName: somethingLike('specific-access-requested'),
      roleCategory: somethingLike('LEGAL_OPERATIONS'),
      actorIdType: somethingLike('IDAM'),
      actorId: somethingLike('db17f6f7-1abf-4223-8b5e-1eece04ee5d8'),
      beginTime: somethingLike('2023-07-25T08:13:41.098Z'),
      endTime: somethingLike('2023-07-25T08:13:10.410Z'),
      notes: somethingLike([
        {
          comment: somethingLike('{"specificReason":undefined}'),
          time: somethingLike('2023-07-25T08:13:41.098Z'),
          userId: somethingLike('db17f6f7-1abf-4223-8b5e-1eece04ee5d8')
        }
      ])
    }
  ])
});

describe('access management service, restore specific access request role', () => {
  describe('restore specific access request role', () => {
    const sandbox: sinon.SinonSandbox = sinon.createSandbox();
    let next;

    beforeEach(() => {
      next = sandbox.spy();
    });

    before(async() => {
      await pactSetUp.provider.setup();
      const roleAssignmentInteraction = {
        state: 'Restore specific access request role for user',
        uponReceiving: 'restore specific access request role',
        withRequest: {
          method: 'POST',
          path: '/am/role-assignments',
          headers: {
            'Authorization': 'Bearer someAuthorizationToken',
            'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/json'
          },
          body: ROLE_ASSIGNMENTS_BODY
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

      const { restoreSpecificAccessRequestRole } = requireReloaded('../../../../roleAccess/index');
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
        await restoreSpecificAccessRequestRole(req, response, next);
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
