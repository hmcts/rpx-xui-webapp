import { expect } from 'chai';
import * as config from 'config';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { PactV3TestSetup } from '../settings/provider.mock';
import { getAccessManagementServiceAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';

const pactSetUp = new PactV3TestSetup({ provider: 'am_roleAssignment_deleteAssignment', port: 8000 });

const exclusionId = '704c8b1c-e89b-436a-90f6-953b1dc40157';

describe('access management service, delete exclusion', () => {
  describe('delete /am/role-assignments/{exclusionId}', () => {
    const sandbox: sinon.SinonSandbox = sinon.createSandbox();
    let next;

    beforeEach(() => {
      next = sandbox.spy();
    });

    before(async () => {
      const interaction = {
        states: [{ description: 'An actor with provided id is available in role assignment service' }],
        uponReceiving: 'delete role assignment for exclusion',
        withRequest: {
          method: 'DELETE',
          path: `/am/role-assignments/${exclusionId}`,
          headers: {
            'Authorization': 'Bearer someAuthorizationToken',
            'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/json'
          }
        },
        willRespondWith: {
          status: 204
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
        const configValues = getAccessManagementServiceAPIOverrides(mockServer.url);
        sandbox.stub(config, 'get').callsFake((prop) => {
          return configValues[prop];
        });

        const { deleteUserExclusion } = requireReloaded('../../../../roleAccess/exclusionService');
        const req = mockReq({
          headers: {
            'Authorization': 'Bearer someAuthorizationToken',
            'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/json'
          },
          body: {
            roleExclusion: {
              id: exclusionId
            }
          }
        });
        let returnedResponse = null;
        const response = mockRes();
        response.send = (ret) => {
          returnedResponse = ret;
        };

        await deleteUserExclusion(req, response, next);
        assertResponses(returnedResponse);
      });
    });
  });
});

function assertResponses(dto: any) {
  expect(dto.id).to.be.equal(exclusionId);
}
