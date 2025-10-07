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

const groupId = '1234567890123456';

const RESPONSE_BODY = {
  groupDetails: {
    groupComments: somethingLike('string'),
    groupLinkType: somethingLike('string'),
    groupName: somethingLike('string'),
    groupReason: somethingLike('string')
  },
  hearingsInGroup: [{
    caseRef: somethingLike('string'),
    hearingId: somethingLike(0),
    hearingOrder: somethingLike(0),
    hmctsInternalCaseName: somethingLike('string')
  }]
};

describe('Hearings, get single hearing linked group for given groupId', () => {
  describe('GET /linkedHearingGroup/{groupId}', () => {
    const sandbox: sinon.SinonSandbox = sinon.createSandbox();
    let next;

    beforeEach(() => {
      next = sandbox.spy();
    });

    before(async () => {
      const interaction: V3Interaction = {
        states: [{ description: 'Get single hearing linked group for given id' }],
        uponReceiving: 'get single hearing linked group for given id',
        withRequest: {
          method: 'GET',
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

        const { getLinkedHearingGroup } = requireReloaded('../../../../hearings/hmc.index.ts');

        const req = mockReq({
          headers: {
            'Authorization': 'Bearer someAuthorizationToken',
            'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/json'
          },
          query: {
            groupId
          }
        });
        let returnedResponse = null;
        const response = mockRes();
        response.send = (ret) => {
          returnedResponse = ret;
        };

        try {
          await getLinkedHearingGroup(req, response, next);
        } catch (err) {
          throw new Error(err);
        }

        assertResponses(returnedResponse);
      });
    });
  });
});

function assertResponses(dto: any) {
  expect(dto.groupDetails.groupComments).to.be.equal('string');
  expect(dto.groupDetails.groupLinkType).to.be.equal('string');
  expect(dto.groupDetails.groupName).to.be.equal('string');
  expect(dto.groupDetails.groupReason).to.be.equal('string');

  expect(dto.hearingsInGroup[0].caseRef).to.be.equal('string');
  expect(dto.hearingsInGroup[0].hearingId).to.be.equal(0);
  expect(dto.hearingsInGroup[0].hearingOrder).to.be.equal(0);
  expect(dto.hearingsInGroup[0].hmctsInternalCaseName).to.be.equal('string');
}
