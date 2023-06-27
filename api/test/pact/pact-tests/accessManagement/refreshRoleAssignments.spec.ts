import { expect } from 'chai';
import * as config from 'config';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { PactTestSetup } from '../settings/provider.mock';
import { getAccessManagementRoleMappingServiceAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';

const { Matchers } = require('@pact-foundation/pact');
const { somethingLike } = Matchers;
const pactSetUp = new PactTestSetup({ provider: 'am_orgRoleMapping_refresh', port: 8000 });

const actorId = '004b7164-0943-41b5-95fc-39794af4a9fe';

describe('access management service, refresh role assignments for judicial user', () => {
  const sandbox: sinon.SinonSandbox = sinon.createSandbox();
  let next;

  beforeEach(() => {
    next = sandbox.spy();
  });
  const RESPONSE_BODY = {
    roleAssignmentResponse: [
        {
            "substantive": "N",
            "primaryLocation": "231596",
            "jurisdiction": "PRIVATELAW",
            "isCaseAllocator": false,
            "roleType": "ORGANISATION",
            "roleName": "hearing-viewer",
            "roleCategory": "JUDICIAL",
            "beginTime": "2017-04-01T00:00:00Z"
        },
        {
            "substantive": "Y",
            "contractType": "Salaried",
            "primaryLocation": "231596",
            "jurisdiction": "PRIVATELAW",
            "region": "2",
            "workTypes": "hearing_work,decision_making_work,applications",
            "isCaseAllocator": false,
            "roleType": "ORGANISATION",
            "roleName": "judge",
            "roleCategory": "JUDICIAL",
            "beginTime": "2017-04-01T00:00:00Z"
        },
        {
            "substantive": "N",
            "contractType": "Salaried",
            "isCaseAllocator": false,
            "roleType": "ORGANISATION",
            "roleName": "hmcts-judiciary",
            "roleCategory": "JUDICIAL",
            "beginTime": "2017-04-01T00:00:00Z"
        },
        {
            "substantive": "Y",
            "contractType": "Salaried",
            "primaryLocation": "231596",
            "jurisdiction": "CIVIL",
            "region": "2",
            "workTypes": "hearing_work,decision_making_work,applications",
            "isCaseAllocator": false,
            "roleType": "ORGANISATION",
            "roleName": "judge",
            "roleCategory": "JUDICIAL",
            "beginTime": "2017-04-01T00:00:00Z"
        }
    ]
  };

  describe('get /am/role-mapping/judicial/refresh', () => {
    const sandbox: sinon.SinonSandbox = sinon.createSandbox();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let next;

    beforeEach(() => {
      next = sandbox.spy();
    });

    before(async () => {
      await pactSetUp.provider.setup();
      const interaction = {
        state: 'An actor with provided id is available in role assignment service',
        uponReceiving: 'get roles assignments for actorId',
        withRequest: {
          method: 'POST',
          path: `/am/role-mapping/judicial/refresh`,
          headers: {
            'Authorization': 'Bearer someAuthorizationToken',
            'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/json'
          },
          body: { refreshRequest: { userIds: ['004b7164-0943-41b5-95fc-39794af4a9fe'] } }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/vnd.uk.gov.hmcts.role-assignment-service.get-assignments+json;charset=UTF-8;version=1.0'
          },
          body: RESPONSE_BODY
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
      const configValues = getAccessManagementRoleMappingServiceAPIOverrides(pactSetUp.provider.mockService.baseUrl);
      sandbox.stub(config, 'get').callsFake((prop) => {
        return configValues[prop];
      });

      const { refreshRoleAssignments } = requireReloaded('../../../../accessManagement/index');

      const req = mockReq({
        headers: {
          'Authorization': 'Bearer someAuthorizationToken',
          'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
          'content-type': 'application/json'
        },
        body: {
          userId: actorId
        }
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let returnedResponse = null;
      const response = mockRes();
      response.send = (ret) => {
        returnedResponse = ret;
      };

      // let roleAssignments = null;
      try {
        await refreshRoleAssignments(req, response, next);
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
    const roleAssignmentResponse = dto.roleAssignmentResponse;
    expect(roleAssignmentResponse[0].substantive).to.be.equal('N');
    expect(roleAssignmentResponse[0].primaryLocation).to.be.equal('231596');
    expect(roleAssignmentResponse[0].jurisdiction).to.be.equal('PRIVATELAW');
    expect(roleAssignmentResponse[0].isCaseAllocator).to.be.equal(false);
    expect(roleAssignmentResponse[0].roleType).to.be.equal('ORGANISATION');
    expect(roleAssignmentResponse[0].roleName).to.be.equal('hearing-viewer');
    expect(roleAssignmentResponse[0].roleCategory).to.be.equal('JUDICIAL');
    expect(roleAssignmentResponse[0].beginTime).to.be.equal('2017-04-01T00:00:00Z');
}

