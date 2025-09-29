import * as config from 'config';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import { PactV3TestSetup } from '../settings/provider.mock';
import { getWorkAllocationAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';
const { Matchers } = require('@pact-foundation/pact');
const { somethingLike, eachLike } = Matchers;
const pactSetUp = new PactV3TestSetup({ provider: 'wa_task_management_api_task_roles', port: 8000 });

const taskId = '4d4b6fgh-c91f-433f-92ac-e800ae34f88c';

describe('WA Task management api, given taskId get the roles associated with the task', () => {
  const RESPONSE_BODY = { roles: eachLike({
    role_category: somethingLike('JUDICIAL'),
    role_name: somethingLike('lead-judge'),
    permissions: eachLike(somethingLike('EXECUTE')),
    authorisations: eachLike(somethingLike(('IAC')))
  }) };

  describe('get /task/taskId/roles', () => {
    const sandbox: sinon.SinonSandbox = sinon.createSandbox();
    let next;

    beforeEach(() => {
      next = sandbox.spy();
    });

    before(async () => {
      const interaction = {
        states: [{ description: 'get task roles given a taskId ' }],
        uponReceiving: 'a taskId ',
        withRequest: {
          method: 'GET',
          path: `/task/${taskId}/roles`,
          headers: {
            Authorization: 'Bearer someAuthorizationToken',
            ServiceAuthorization: 'Bearer someServiceAuthorizationToken'
          }
        },
        willRespondWith: {
          status: 200,
          headers: {},
          body: RESPONSE_BODY
        }
      };
      pactSetUp.provider.addInteraction(interaction);
    });

    afterEach(() => {
      sandbox.restore();
      sinon.reset();
    });

    it('returns the correct response', async () => {
      return pactSetUp.provider.executeTest(async (mockServer) => {
        const configValues = getWorkAllocationAPIOverrides(mockServer.url);
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
        } catch (err) {
          console.log(err.stack);
          throw new Error(err);
        }
      });
    });
  });
});

function assertResponses(dto: any) {
  console.log(JSON.stringify(dto));
  expect(dto[0].role_category).to.be.equal('JUDICIAL');
  expect(dto[0].role_name).to.be.equal('lead-judge');
  expect(dto[0].permissions).to.include.members(['EXECUTE']);
  expect(dto[0].authorisations).to.include.members(['IAC']);
}
