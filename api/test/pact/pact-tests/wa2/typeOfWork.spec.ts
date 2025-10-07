import { expect } from 'chai';

import * as config from 'config';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { PactV3TestSetup } from '../settings/provider.mock';
import { getWorkAllocationAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';
import { eachLike } from '@pact-foundation/pact/src/dsl/matchers';
const { Matchers } = require('@pact-foundation/pact');
const { somethingLike } = Matchers;

const pactSetUp = new PactV3TestSetup({ provider: 'wa_task_management_api_get_work_types', port: 8000 });

describe('Task management api,  retrieve all work types by userId', () => {
  const RESPONSE_BODY = {
    work_types: eachLike({
      id: somethingLike('5687'),
      label: somethingLike('Upper Tribunal')
    })
  };

  describe('get /work-types by userId', () => {
    const sandbox: sinon.SinonSandbox = sinon.createSandbox();
    let next;

    beforeEach(() => {
      next = sandbox.spy();
    });

    before(async () => {
      const interaction = {
        states: [{ description: 'retrieve work types by userId' }],
        uponReceiving: 'userId to get all work types',
        withRequest: {
          method: 'GET',
          path: '/work-types',
          query: {
            'filter-by-user': 'true'
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

        const { getTypesOfWork } = requireReloaded('../../../../workAllocation/index');

        const req = mockReq({
          headers: {
            Authorization: 'Bearer someAuthorizationToken',
            ServiceAuthorization: 'Bearer someServiceAuthorizationToken',
            'Content-Type': 'application/json'
          }
        });
        let returnedResponse = null;
        const response = mockRes();
        response.send = (ret) => {
          returnedResponse = ret;
        };

        try {
          await getTypesOfWork(req, response, next);
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
  expect(dto[0].key).to.be.equal('5687');
  expect(dto[0].label).to.be.equal('Upper Tribunal');
}
