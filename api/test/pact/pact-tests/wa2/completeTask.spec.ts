import { expect } from 'chai';
import * as config from 'config';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { PactTestSetup } from '../settings/provider.mock';
import { getSearchTaskOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';

const pactSetUp = new PactTestSetup({ provider: 'wa_task_management_api_complete_task_by_id', port: 8000 });

describe('Task management api, Complete a task', () => {
  let next;
  const taskId = 'f782bde3-8d51-11eb-a9a4-06d032acc76d';

  describe('post /task/taskId/complete/', () => {
    const sandbox: sinon.SinonSandbox = sinon.createSandbox();

    beforeEach(() => {
      next = sandbox.spy();
    });

    before(async () => {
      await pactSetUp.provider.setup();
      const interaction = {
        state: 'complete a task using taskId',
        uponReceiving: 'taskId to complete a task',
        withRequest: {
          method: 'POST',
          path: `/task/${taskId}/complete`,
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
      // @ts-ignore
      pactSetUp.provider.addInteraction(interaction);
    });

    afterEach(() => {
      sandbox.restore();
      sinon.reset();
    });

    it('returns the correct response', async () => {
      const configValues = getSearchTaskOverrides(pactSetUp.provider.mockService.baseUrl);
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
          action: 'complete'
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

