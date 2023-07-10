import * as config from 'config';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { PactTestSetup } from '../settings/provider.mock';
import { getAccessManagementServiceAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';
import { somethingLike } from '@pact-foundation/pact/src/dsl/matchers';

const pactSetUp = new PactTestSetup({ provider: 'am_roleAssignment_confirmAllocateRole', port: 8000 });

const REQUEST_BODY = {
  caseId: somethingLike('1234123412341234'),
  jurisdiction: somethingLike('IA'),
  assignmentId: somethingLike('a123456'),
  state: somethingLike(1),
  typeOfRole: somethingLike({
    id: 'lead-judge',
    name: 'Lead judge'
  }),
  allocateTo: somethingLike('Reserve to me'),
  personToBeRemoved: somethingLike({
    id: 'p111111',
    name: 'test1',
    domain: ''
  }),
  person: somethingLike({
    id: 'p222222',
    name: 'test2',
    domain: ''
  }),
  durationOfRole: somethingLike('7 days'),
  action: somethingLike('allocate'),
  period: somethingLike({
    startDate: new Date(),
    endDate: new Date()
  }),
  roleCategory: somethingLike('LEGAL_OPERATIONS')
};

describe.only('access management service, confirm allocate role', () => {
  describe('confirm allocate role /allocate-role/confirm', () => {
    const sandbox: sinon.SinonSandbox = sinon.createSandbox();
    let next;

    beforeEach(() => {
      next = sandbox.spy();
    });

    before(async() => {
      await pactSetUp.provider.setup();
      const interaction = {
        state: 'An actor with provided id is available in role assignment service',
        uponReceiving: 'confirm role allocation',
        withRequest: {
          method: 'POST',
          path: '/am/role-assignments',
          headers: {
            'Authorization': 'Bearer someAuthorizationToken',
            'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/json'
          },
          body: REQUEST_BODY
        },
        willRespondWith: {
          status: 200,
          headers: {
            'content-type': 'application/vnd.uk.gov.hmcts.role-assignment-service.post-assignment-query-request+json;charset=UTF-8;version=2.0'
          },
          body: {}
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

      const { confirmAllocateRole } = requireReloaded('../../../../roleAccess/index');
      const req = mockReq({
        headers: {
          'Authorization': 'Bearer someAuthorizationToken',
          'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
          'content-type': 'application/json'
        },
        session: { passport: { user: { userinfo: { id: '123' } } } },
        body: {
          roleRequest: {
            assignerId: '123',
            replaceExisting: false
          },
          requestedRoles: [{
            roleType: 'CASE',
            grantType: 'SPECIFIC',
            classification: 'PUBLIC',
            attributes: {
              caseId: '1234123412341234',
              jurisdiction: 'IA'
            },
            roleName: 'lead-judge',
            roleCategory: 'LEGAL_OPERATIONS',
            actorIdType: 'IDAM',
            actorId: '123',
            beginTime: new Date(),
            endTime: new Date()
          }]
        }
      });
      let returnedResponse = null;
      const response = mockRes();
      response.send = (ret) => {
        returnedResponse = ret;
      };

      try {
        await confirmAllocateRole(req, response, next);
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
