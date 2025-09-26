import { expect } from 'chai';
import * as config from 'config';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { PactV3TestSetup } from '../settings/provider.mock';
import { getHearingsAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';
import { Matchers, V3Interaction } from '@pact-foundation/pact';

const { somethingLike } = Matchers;
const pactSetUp = new PactV3TestSetup({ provider: 'hmc_hearingGroup', port: 8000 });

const groupId = '123456789';

const RESPONSE_BODY = somethingLike({});

describe('Hearings, delete single hearing linked group by a given groupId', () => {
  describe('DELEETE /linkedHearingGroup/{groupId}', () => {
    const sandbox: sinon.SinonSandbox = sinon.createSandbox();
    let next;

    beforeEach(() => {
      next = sandbox.spy();
    });

    before(async () => {
      const interaction: V3Interaction = {
        states: [{ description: 'delete single hearing linked group for given groupId' }],
        uponReceiving: 'delete single hearing linked group for given groupId',
        withRequest: {
          method: 'DELETE',
          path: `/linkedHearingGroup/${groupId}`,
          headers: {
            'Authorization': 'Bearer someAuthorizationToken',
            'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/json'
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'content-type': 'application/json'
          },
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
        const configValues = getHearingsAPIOverrides(mockServer.url);
        sandbox.stub(config, 'get').callsFake((prop) => {
          return configValues[prop];
        });

        const { deleteLinkedHearingGroup } = requireReloaded('../../../../hearings/hmc.index.ts');

        const req = mockReq({
          headers: {
            'Authorization': 'Bearer someAuthorizationToken',
            'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/json'
          },
          query: {
            hearingGroupId: groupId
          }
        });
        let returnedResponse = null;
        const response = mockRes();
        response.send = (ret) => {
          returnedResponse = ret;
        };

        try {
          await deleteLinkedHearingGroup(req, response, next);
        } catch (err) {
          throw new Error(err);
        }

        assertResponses(returnedResponse);
      });
    });
  });
});

function assertResponses(dto: any) {
  expect(dto).to.be.eql({});
}
