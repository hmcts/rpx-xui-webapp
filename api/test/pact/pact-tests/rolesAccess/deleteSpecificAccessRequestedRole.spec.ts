import * as config from 'config';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { PactTestSetup } from '../settings/provider.mock';
import { getAccessManagementServiceAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';
import { somethingLike } from '@pact-foundation/pact/src/dsl/matchers';

const pactSetUp = new PactTestSetup({ provider: 'am_roleAssignment_deleteSpecificAccessRequestedRole', port: 8000 });

const processId = 'staff-organisational-role-mapping';
const requestId= '59bedc19-9cc6-4bff-9f58-041c3ba664a0';

const REQUEST_BODY = {
  state: '1',
  accessReason: 'Approve request',
  typeOfRole: { id: 'specific-access-granted', name: 'specific-access-granted' },
  comment: 'comment',
  caseId: '1594717367271986',
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

const ROLE_ASSIGNMENTS_BODY = {
  'pathVariables': somethingLike({
    'process': somethingLike('staff-organisational-role-mapping'),
    'reference': somethingLike('59bedc19-9cc6-4bff-9f58-041c3ba664a0')
  }),
  'queryParams': null,
  'body': somethingLike({
    'userIds': somethingLike([
      '59bedc19-9cc6-4bff-9f58-041c3ba664a0'
    ])
  }),
  'multipart': somethingLike(false)
};

describe('access management service, delete specific access requested role', () => {
  describe('delete specific access requested role', () => {
    const sandbox: sinon.SinonSandbox = sinon.createSandbox();
    let next;

    beforeEach(() => {
      next = sandbox.spy();
    });

    before(async() => {
      await pactSetUp.provider.setup();
      const roleAssignmentInteraction = {
        state: 'Delete specific access requested role for user',
        uponReceiving: 'delete specific access requested role',
        withRequest: {
          method: 'DELETE',
          path: `/am/role-assignments?process=${processId}&reference=${requestId}`,
          headers: {
            'Authorization': 'Bearer someAuthorizationToken',
            'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/json'
          },
          body: ROLE_ASSIGNMENTS_BODY
        },
        willRespondWith: {
          status: 204
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

      const { deleteSpecificAccessRequestedRole } = requireReloaded('../../../../roleAccess/index');
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
      const response = null;

      try {
        returnedResponse = await deleteSpecificAccessRequestedRole(req, response, next);
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
