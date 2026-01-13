import { expect } from 'chai';
import * as config from 'config';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { PactV3TestSetup } from '../settings/provider.mock';
import { getSearchTaskOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';

const pactSetUp = new PactV3TestSetup({ provider: 'wa_task_management_api_cancel_task_by_id', port: 8000 });

describe('Task management api, cancel a task', () => {
  const sandbox: sinon.SinonSandbox = sinon.createSandbox();
  let next;
  const taskId = 'f782bde3-8d51-11eb-a9a4-06d032acc76d';

  describe('post /task/taskId/cancel', () => {
    beforeEach(() => {
      next = sandbox.spy();
    });

    before(async () => {
      const interaction = {
        states: [{ description: 'cancel a task using taskId' }],
        uponReceiving: 'taskId to cancel a task',
        withRequest: {
          method: 'POST',
          path: `/task/${taskId}/cancel`,
          headers: {
            'Authorization': 'Bearer someAuthorizationToken',
            'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/json'
          }

        },
        willRespondWith: {
          status: 204,
          headers: {
          }
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
        const configValues = getSearchTaskOverrides(mockServer.url);
        sandbox.stub(config, 'get').callsFake((prop) => {
          return configValues[prop];
        });

        const { postTaskAction } = requireReloaded('../../../../workAllocation/index');

        const req = mockReq({
          headers: {
            'Authorization': 'Bearer someAuthorizationToken',
            'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/json'
          },
          params: {
            taskId: taskId,
            action: 'cancel'
          }

        });
        let resStatus = null;
        const response = mockRes();
        response.status = (ret) => {
          resStatus = ret;
        };

        try {
          await postTaskAction(req, response, next);
          expect(resStatus).to.equal(204);
        } catch (err) {
          console.log(err.stack);
          throw new Error(err);
        }
      });
    });
  });
});

