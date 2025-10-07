import { expect } from 'chai';

import * as config from 'config';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { PactV3TestSetup } from '../settings/provider.mock';
import { getWorkAllocationAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';
const { Matchers } = require('@pact-foundation/pact');
const { somethingLike } = Matchers;

const pactSetUp = new PactV3TestSetup({ provider: 'wa_task_management_api_get_task_types_by_jurisdiction', port: 8000 });

describe('Task management api, tasks by jurisdiction', () => {
  const RESPONSE_BODY = {
    task_types: [
      {
        'task_type': {
          'task_type_id': somethingLike('someTaskTypeId'),
          'task_type_name': somethingLike('Some task type name')
        }
      }
    ]
  };

  describe('get task/task-types?jurisdictionserviceId', () => {
    const sandbox: sinon.SinonSandbox = sinon.createSandbox();
    let next;

    beforeEach(() => {
      next = sandbox.spy();
    });

    before(async () => {
      const interaction = {
        states: [{ description: 'retrieve all task types by jurisdiction' }],
        uponReceiving: 'retrieve all task types by jurisdiction',
        withRequest: {
          method: 'GET',
          path: '/task/task-types',
          query: {
            jurisdiction: 'wa'
          },
          headers: {
            'Authorization': 'Bearer someAuthorizationToken',
            'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
            'Content-Type': 'application/json'
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

        const { getTaskNames } = requireReloaded('../../../../workAllocation/index');

        const req = mockReq({
          headers: {
            Authorization: 'Bearer someAuthorizationToken',
            ServiceAuthorization: 'Bearer someServiceAuthorizationToken',
            'Content-Type': 'application/json'
          },
          body: {
            service: 'wa'
          }
        });
        let returnedResponse = null;
        const response = mockRes();
        response.send = (ret) => {
          returnedResponse = ret;
          return response;
        };

        try {
          await getTaskNames(req, response, next);
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
  expect(dto[0].task_type.task_type_id).to.be.equal('someTaskTypeId');
  expect(dto[0].task_type.task_type_name).to.be.equal('Some task type name');
}
