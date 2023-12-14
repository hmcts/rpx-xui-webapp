import { expect } from 'chai';
import * as config from 'config';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { PactTestSetup } from '../settings/provider.mock';
import { getWorkAllocationAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';
const { Matchers } = require('@pact-foundation/pact');
const { somethingLike } = Matchers;
const pactSetUp = new PactTestSetup({ provider: 'wa_task_management_api_task_role_permissions_by_task_id', port: 8000 });

const taskId = '4d4b6fgh-c91f-433f-92ac-e456ae34f72a';

describe('Task management api, task roles', () => {
  const RESPONSE_BODY = { roles: [] };

  const roles = [
    { roleName: 'case-worker', roleCategory: 'LEGAL_OPERATIONS' },
    { roleName: 'lead-judge', roleCategory: 'JUDICIAL' },
    { roleName: 'hearing-judge', roleCategory: 'JUDICIAL' }
  ];

  for (const role of roles) {
    const testRole = {
      role_category: somethingLike(role.roleCategory),
      role_name: somethingLike(role.roleName),
      permissions: [
        somethingLike('OWN'),
        somethingLike('EXECUTE'),
        somethingLike('READ'),
        somethingLike('MANAGE'),
        somethingLike('CANCEL')
      ],
      authorisations: [
        somethingLike('IAC'),
        somethingLike('SSCS')
      ]
    };
    RESPONSE_BODY.roles.push(testRole);
  }

  describe('get /work-types', () => {
    const sandbox: sinon.SinonSandbox = sinon.createSandbox();
    let next;

    beforeEach(() => {
      next = sandbox.spy();
    });

    before(async () => {
      await pactSetUp.provider.setup();
      const interaction = {
        state: 'get task role information using taskId',
        uponReceiving: 'get task roles by taskId',
        withRequest: {
          method: 'GET',
          path: `/task/${taskId}/roles`,
          headers: {
            Authorization: 'Bearer someAuthorizationToken',
            ServiceAuthorization: 'Bearer someServiceAuthorizationToken'
            // 'content-Type': 'application/json',
          }
        },
        willRespondWith: {
          status: 200,
          headers: {},
          body: RESPONSE_BODY
        }
      };
      // @ts-ignore
      pactSetUp.provider.addInteraction(interaction);
    });

    afterEach(() => {
      sandbox.restore();
      sinon.reset();
    });

    it('returns the correct response', async () => {
      const configValues = getWorkAllocationAPIOverrides(pactSetUp.provider.mockService.baseUrl);
      sandbox.stub(config, 'get').callsFake((prop) => {
        return configValues[prop];
      });

      const { getTaskRoles } = requireReloaded('../../../../workAllocation/index');

      const req = mockReq({
        headers: {
          'Authorization': 'Bearer someAuthorizationToken',
          'ServiceAuthorization': 'Bearer someServiceAuthorizationToken'
          // 'content-Type': 'application/json'
        },
        params: {
          taskId: taskId
        }
      });
      let returnedResponse = null;
      const response = mockRes();
      response.send = (ret) => {
        returnedResponse = ret;
      };

      try {
        await getTaskRoles(req, response, next);

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
  expect(dto[0].role_category).to.be.equal('LEGAL_OPERATIONS');
  expect(dto[0].role_name).to.be.equal('case-worker');
  expect(dto[0].permissions).to.include.members(['OWN', 'EXECUTE', 'READ', 'MANAGE', 'CANCEL']);
  expect(dto[0].authorisations).to.include.members(['IAC', 'SSCS']);
}
