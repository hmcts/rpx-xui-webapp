import { expect } from 'chai';
import * as config from 'config';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { PactV3TestSetup } from '../settings/provider.mock';
import { getRdCommonDataAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';

const { Matchers } = require('@pact-foundation/pact');
const { somethingLike } = Matchers;
const pactSetUp = new PactV3TestSetup({ provider: 'referenceData_commonData', port: 8000 });

const serviceId = 'IA';

describe('RD get case flag ref data', async () => {
  const RESPONSE_BODY = {
    name: somethingLike('caseflag example'),
    hearingRelevant: somethingLike(true),
    flagComment: somethingLike(false),
    flagCode: somethingLike('xflag'),
    isParent: somethingLike(false),
    Path: somethingLike(['/flag1']),
    childFlags: somethingLike([]),
    defaultStatus: somethingLike('Active'),
    externallyAvailable: somethingLike(false)
  };

  describe('get case flag ref data', () => {
    const sandbox: sinon.SinonSandbox = sinon.createSandbox();
    let next;

    beforeEach(() => {
      next = sandbox.spy();
    });

    before(async () => {
      const interaction = {
        states: [{ description: 'get case flag ref data' }],
        uponReceiving: 'a service id',
        withRequest: {
          method: 'GET',
          path: `/refdata/commondata/caseflags/service-id=${serviceId}`,
          // query also present on API but not on current function, e.g. ?flag-type=PARTY
          headers: {
            'Authorization': 'Bearer someAuthorizationToken',
            'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/json'
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
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
        const configValues = getRdCommonDataAPIOverrides(mockServer.url);
        sandbox.stub(config, 'get').callsFake((prop) => {
          return configValues[prop];
        });
        const { getCaseFlagRefData } = requireReloaded('../../../../prd/caseFlag');
        const req = mockReq({
          headers: {
            'Authorization': 'Bearer someAuthorizationToken',
            'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/json'
          },
          query: { serviceId }
        });
        let returnedResponse = null;
        const response = mockRes();
        response.send = (ret) => {
          returnedResponse = ret;
        };

        await getCaseFlagRefData(req, response, next);
        assertResponses(returnedResponse);
      });
    });
  });
});

function assertResponses(dto: any) {
  expect(dto.name).to.be.equal('caseflag example');
  expect(dto.hearingRelevant).to.be.equal(true);
  expect(dto.flagComment).to.be.equal(false);
  expect(dto.flagCode).to.be.equal('xflag');
  expect(dto.isParent).to.be.equal(false);
  expect(dto.Path[0]).to.be.equal('/flag1');
  expect(dto.defaultStatus).to.be.equal('Active');
  expect(dto.externallyAvailable).to.be.equal(false);
}
