import { expect } from 'chai';

import * as config from 'config';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { PactV3TestSetup } from '../settings/provider.mock';
import { getHearingsAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';
import { Matchers, V3Interaction } from '@pact-foundation/pact';

const { somethingLike } = Matchers;
const pactSetUp = new PactV3TestSetup({ provider: 'hmc_hearingActuals', port: 8000 });

const hearingId = '1234567890123456';

const RESPONSE_BODY = {
  'body': somethingLike({}),
  'statusCode': somethingLike('string'),
  'statusCodeValue': somethingLike(0)
};

describe('Hearings, submit single hearing actuals completion for given hearingId', () => {
  describe('POST /hearingActualsCompletion/{hearingId}}', () => {
    const sandbox: sinon.SinonSandbox = sinon.createSandbox();
    let next;

    beforeEach(() => {
      next = sandbox.spy();
    });

    before(async () => {
      const interaction: V3Interaction = {
        states: [{ description: 'Submit hearing actuals completion by hearingId' }],
        uponReceiving: 'submit hearing actuals completion for given hearingId',
        withRequest: {
          method: 'POST',
          path: `/hearingActualsCompletion/${hearingId}`,
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

        const { submitHearingActuals } = requireReloaded('../../../../hearings/hmc.index.ts');

        const req = mockReq({
          headers: {
            'Authorization': 'Bearer someAuthorizationToken',
            'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/json'
          },
          params: {
            hearingId
          }
        });
        let returnedResponse = null;
        const response = mockRes();
        response.send = (ret) => {
          returnedResponse = ret;
        };

        try {
          await submitHearingActuals(req, response, next);
        } catch (err) {
          throw new Error(err);
        }

        assertResponses(returnedResponse);
      });
    });
  });
});

function assertResponses(dto: any) {
  expect(dto).to.be.eql(null);
  // expect(dto.statusCode).to.be.eql('string');
  // expect(dto.statusCodeValue).to.be.eql(0);
}
