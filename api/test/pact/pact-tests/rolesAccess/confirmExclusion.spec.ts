import { expect } from 'chai';

import { somethingLike } from '@pact-foundation/pact/src/dsl/matchers';
import * as config from 'config';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { PactV3TestSetup } from '../settings/provider.mock';
import { getAccessManagementServiceAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';

const pactSetUp = new PactV3TestSetup({ provider: 'am_roleAssignment_confirmExclusion', port: 8000 });

const REQUEST_BODY = {
  caseId: '123456789',
  jurisdiction: 'IA',
  state: 5,
  exclusionOption: 'Exclude another person',
  personRole: 'Judicial',
  person: {
    id: '123',
    name: 'Test user',
    domain: 'Judicial'
  },
  exclusionDescription: ['testing exclusion']
};

const ROLE_ASSIGNMENTS_BODY = {
  roleRequest: somethingLike({
    assignerId: somethingLike('123'),
    replaceExisting: somethingLike(false)
  }),
  requestedRoles: somethingLike([
    {
      roleType: somethingLike('CASE'),
      grantType: somethingLike('EXCLUDED'),
      classification: somethingLike('RESTRICTED'),
      attributes: somethingLike({
        caseId: somethingLike('123456789'),
        jurisdiction: somethingLike('IA'),
        notes: somethingLike(['testing exclusion'])
      }),
      roleCategory: 'JUDICIAL',
      roleName: somethingLike('conflict-of-interest'),
      actorIdType: somethingLike('IDAM'),
      actorId: somethingLike('123')
    }
  ])
};

const RESPONSE_BODY = {
  data: { exclusionDescription: somethingLike(['exclusion confirmed']) }
};

describe('access management service, confirm exclusion', () => {
  describe('confirm exclusion /am/role-assignments', () => {
    const sandbox: sinon.SinonSandbox = sinon.createSandbox();
    let next;

    beforeEach(() => {
      next = sandbox.spy();
    });

    before(async () => {
      const interaction = {
        states: [{ description: 'An actor with provided id is available in role assignment service' }],
        uponReceiving: 'confirm role assignment for exclusion',
        withRequest: {
          method: 'POST',
          path: '/am/role-assignments',
          headers: {
            'Authorization': 'Bearer someAuthorizationToken',
            'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/json'
          },
          body: ROLE_ASSIGNMENTS_BODY
        },
        willRespondWith: {
          status: 200,
          headers: {
            'content-type': 'application/vnd.uk.gov.hmcts.role-assignment-service.post-assignment-query-request+json;charset=UTF-8;version=2.0'
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
        const configValues = getAccessManagementServiceAPIOverrides(mockServer.url);
        sandbox.stub(config, 'get').callsFake((prop) => {
          return configValues[prop];
        });

        const { confirmUserExclusion } = requireReloaded('../../../../roleAccess/exclusionService');
        const req = mockReq({
          headers: {
            'Authorization': 'Bearer someAuthorizationToken',
            'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/json'
          },
          session: { passport: { user: { userinfo: { id: '123' } } } },
          body: REQUEST_BODY
        });

        let returnedResponse = null;
        const response = mockRes();
        response.send = (ret) => {
          returnedResponse = ret;
        };

        try {
          await confirmUserExclusion(req, response, next);
          assertResponses(returnedResponse);
        } catch (err) {
          throw new Error(err);
        }
      });
    });
  });
});

function assertResponses(dto: any) {
  expect(dto.data.exclusionDescription[0]).to.be.equal('exclusion confirmed');
}
