import { somethingLike } from '@pact-foundation/pact/src/dsl/matchers';
import { expect } from 'chai';
import * as config from 'config';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { PactTestSetup } from '../settings/provider.mock';
import { getAccessManagementServiceAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';

const pactSetUp = new PactTestSetup({ provider: 'am_roleAssignment_deleteRoleByCaseAndRoleId', port: 8000 });

const assignmentId = '704c8b1c-e89b-436a-90f6-953b1dc40157';

const REQUEST_BODY = {
  'assignmentId': assignmentId
};

describe('access management service, delete role by case and role id', () => {
  describe('delete /am/role-assignments/{assignmentId}', () => {
    const sandbox: sinon.SinonSandbox = sinon.createSandbox();
    let next;

    beforeEach(() => {
      next = sandbox.spy();
    });

    before(async () => {
      await pactSetUp.provider.setup();
      const interaction = {
        state: 'An actor with provided id is available in role assignment service',
        uponReceiving: 'delete role by case and role id',
        withRequest: {
          method: 'DELETE',
          path: `/am/role-assignments/${assignmentId}`,
          headers: {
            'Authorization': 'Bearer someAuthorizationToken',
            'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/json'
          },
          body: {
            'assignmentId': somethingLike(assignmentId)
          }
        },
        willRespondWith: {
          status: 204
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
      const configValues = getAccessManagementServiceAPIOverrides(pactSetUp.provider.mockService.baseUrl);
      sandbox.stub(config, 'get').callsFake((prop) => {
        return configValues[prop];
      });

      const { deleteRoleByCaseAndRoleId } = requireReloaded('../../../../roleAccess/index');
      const req = mockReq({
        headers: {
          'Authorization': 'Bearer someAuthorizationToken',
          'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
          'content-type': 'application/json'
        },
        body: REQUEST_BODY
      });
      let returnedResponse = null;
      const response = mockRes();
      response.send = (ret) => {
        returnedResponse = ret;
      };

      try {
        await deleteRoleByCaseAndRoleId(req, response, next);
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
}
