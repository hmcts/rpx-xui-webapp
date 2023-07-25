import { expect } from 'chai';
import * as config from 'config';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { PactTestSetup } from '../settings/provider.mock';
import { getAccessManagementServiceAPIOverrides } from '../utils/configOverride';
import { DateTimeMatcher } from '../utils/matchers';
import { requireReloaded } from '../utils/moduleUtil';

const { Matchers } = require('@pact-foundation/pact');
const { somethingLike, term } = Matchers;
const pactSetUp = new PactTestSetup({ provider: 'am_roleAssignment_queryAssignment', port: 8000 });

const caseId = '12345';
const roles = [
  { id: '13a234567-eb80-4681-b62c-6ae2ed069a5g', actorId: '14a21569-eb80-4681-b62c-6ae2ed069e5f', roleName: 'lead-judge', roleCategory: 'JUDICIAL', displayName: 'Lead judge' },
  { id: '23a234567-eb80-4681-b62c-6ae2ed069a5h', actorId: '24a21569-eb80-4681-b62c-6ae2ed069e5g', roleName: 'hearing-judge', roleCategory: 'JUDICIAL', displayName: 'Hearing judge' },
  { id: '33a234567-eb80-4681-b62c-6ae2ed069a5i', actorId: '34a21569-eb80-4681-b62c-6ae2ed069e5h', roleName: 'case-worker', roleCategory: 'LEGAL_OPERATIONS', displayName: 'Case worker' }
];

describe('access management service, get all roles', () => {
  const RESPONSE_BODY = {
    'roleAssignmentResponse': []
  };
  for (const role of roles) {
    const roleAssognmentRole = {
      'id': somethingLike('23a234567-eb80-4681-b62c-6ae2ed069a5g'),
      'actorId': somethingLike('14a21569-eb80-4681-b62c-6ae2ed069e5f'),
      'roleCategory': somethingLike('LEGAL_OPERATIONS'),
      'roleName': somethingLike('case-worker'),
      'beginTime': term(DateTimeMatcher('2022-01-11T00:00:00Z')),
      'endTime': term(DateTimeMatcher('2022-01-11T00:00:00Z'))
    };
    roleAssognmentRole.roleName = somethingLike(role.roleName);
    roleAssognmentRole.roleCategory = somethingLike(role.roleCategory);

    RESPONSE_BODY.roleAssignmentResponse.push(roleAssognmentRole);
  }

  describe('post /am/role-assignments/roles', () => {
    const sandbox: sinon.SinonSandbox = sinon.createSandbox();

    before(async () => {
      await pactSetUp.provider.setup();
      const interaction = {
        state: 'All role assignment roles',
        uponReceiving: 'get all roles',
        withRequest: {
          method: 'GET',
          path: '/am/role-assignments/roles',
          headers: {
            'Authorization': 'Bearer someAuthorizationToken',
            'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/vnd.uk.gov.hmcts.role-assignment-service.post-assignment-query-request+json;charset=UTF-8;version=2.0'
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'content-type': 'application/vnd.uk.gov.hmcts.role-assignment-service.post-assignment-query-request+json;charset=UTF-8;version=2.0'
          },
          body: RESPONSE_BODY
        }
      };

      // const rolesResponseBody = [];
      // for (const role of roles) {
      //   const dummyRole = getDummyCaseRole();
      //   dummyRole.name = role.roleName;
      //   dummyRole.category = role.roleCategory;
      //   dummyRole.label = role.displayName;
      //   rolesResponseBody.push(dummyRole);
      // }

      // const getRolesInteraction = {
      //   state: 'A list of role assignments for the search query',
      //   uponReceiving: 'query role assignments for caseId',
      //   withRequest: {
      //     method: 'GET',
      //     path: '/am/role-assignments/roles',
      //     headers: {
      //       'Authorization': 'Bearer someAuthorizationToken',
      //       'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
      //       'content-type': 'application/vnd.uk.gov.hmcts.role-assignment-service.post-assignment-query-request+json;charset=UTF-8;version=2.0'
      //     }
      //   },
      //   willRespondWith: {
      //     status: 200,
      //     headers: {
      //       'Content-Type': 'application/vnd.uk.gov.hmcts.role-assignment-service.post-assignment-query-request+json;charset=UTF-8;version=2.0'
      //     },
      //     body: rolesResponseBody
      //   }
      // };

      // @ts-ignore
      pactSetUp.provider.addInteraction(interaction);
      // @ts-ignore
      // pactSetUp.provider.addInteraction(getRolesInteraction);
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

      const { getAllRoles } = requireReloaded('../../../../roleAccess/roleAssignmentService');

      const req = mockReq({
        headers: {
          'Authorization': 'Bearer someAuthorizationToken',
          'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
          'content-type': 'application/vnd.uk.gov.hmcts.role-assignment-service.post-assignment-query-request+json;charset=UTF-8;version=2.0'
        }
      });
      let returnedResponse = null;
      const response = mockRes();
      response.send = (ret) => {
        returnedResponse = ret;
      };

      try {
        await getAllRoles(req);

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
  console.log(JSON.stringify(dto));
  expect(dto.length).to.be.equal(0);
}
