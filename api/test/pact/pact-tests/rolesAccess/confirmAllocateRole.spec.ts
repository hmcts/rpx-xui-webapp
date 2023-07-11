import * as config from 'config';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { PactTestSetup } from '../settings/provider.mock';
import { getAccessManagementServiceAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';
import { somethingLike } from '@pact-foundation/pact/src/dsl/matchers';

const pactSetUp = new PactTestSetup({ provider: 'am_roleAssignment_confirmAllocateRole', port: 8000 });

const MockApp = require('../../../../../test/nodeMock/app');

const REQUEST_BODY = {
  caseId: somethingLike('1234123412341234'),
  jurisdiction: somethingLike('IA'),
  assignmentId: somethingLike('a123456'),
  state: somethingLike(1),
  typeOfRole: somethingLike({
    id: somethingLike('lead-judge'),
    name: somethingLike('Lead judge')
  }),
  allocateTo: somethingLike('Reserve to me'),
  personToBeRemoved: somethingLike({
    id: somethingLike('p111111'),
    name: somethingLike('test1'),
    domain: somethingLike('')
  }),
  person: somethingLike({
    id: somethingLike('p222222'),
    name: somethingLike('test2'),
    domain: somethingLike('')
  }),
  durationOfRole: somethingLike('7 days'),
  action: somethingLike('allocate'),
  period: somethingLike({
    startDate: somethingLike('11-07-2023'),
    endDate: somethingLike('18-07-2023')
  }),
  roleCategory: somethingLike('LEGAL_OPERATIONS')
};

const ROLE_ASSIGNMENT_BODY = {
  roleRequest: somethingLike({
    assignerId: somethingLike('123'),
    replaceExisting: somethingLike(false)
  }),
  requestedRoles: somethingLike([{
    roleType: somethingLike('CASE'),
    grantType: somethingLike('SPECIFIC'),
    classification: somethingLike('PUBLIC'),
    attributes: {
      caseId: somethingLike('1234123412341234'),
      jurisdiction: somethingLike('IA')
    },
    roleName: somethingLike('lead-judge'),
    roleCategory: somethingLike('LEGAL_OPERATIONS'),
    actorIdType: somethingLike('IDAM'),
    actorId: somethingLike('123'),
    beginTime: somethingLike('11-07-2023'),
    endTime: somethingLike('18-07-2023')
  }])
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
          body: ROLE_ASSIGNMENT_BODY
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
      MockApp.stopServer();
    });

    it('returns the correct response', async () => {
      MockApp.setServerPort(8080);
      MockApp.init();

      MockApp.onGet('/am/role-assignments/actors/123', (req, res) => {
        res.send({
          roleAssignmentResponse: [
            { actorId: '004b7164-0943-41b5-95fc-39794af4a9fe', roleCategory: 'case-worker' },
          ]
        });
      });
      await MockApp.startServer();

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
          caseId: '1234123412341234',
          jurisdiction: 'IA',
          assignmentId: 'a123456',
          state: 1,
          typeOfRole: {
            id: 'lead-judge',
            name: 'Lead judge'
          },
          allocateTo: 'Reserve to me',
          personToBeRemoved: {
            id: 'p111111',
            name: 'test1',
            domain: ''
          },
          person: {
            id: 'p222222',
            name: 'test2',
            domain: ''
          },
          durationOfRole: '7 days',
          action: 'allocate',
          period: {
            startDate: '11-07-2023',
            endDate: '18-07-2023'
          },
          roleCategory: 'LEGAL_OPERATIONS'
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
