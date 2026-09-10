import { expect } from 'chai';
import config = require('config');
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { PactV3TestSetup } from '../settings/provider.mock';
import { getCaseworkerRefDataAPIOverrides } from '../utils/configOverride';
import { RealStaffRefDataAPI } from '../../../../staff-ref-data/real-staff-ref-data-api';

const { MatchersV3 } = require('@pact-foundation/pact');
const { like } = MatchersV3;
const pactSetUp = new PactV3TestSetup({ provider: 'referenceData_caseworkerRefUsers', port: 8000 });

const MockApp = require('../../pact-mocks/app');

describe('Caseworker ref data api, get all caseworkers', () => {
  const REQUEST_BODY = {
    userIds: [like('004b7164-0943-41b5-95fc-39794af4a9fe'), like('004b7164-0943-41b5-95fc-39794af4a9fe')],
  };

  const baseLocations = [{ location_id: like(1), location: like('National'), is_primary: like(true) }];
  const RESPONSE_BODY = [
    {
      email_id: like('test_person@test.gov.uk'),
      first_name: like('testfn'),
      last_name: like('testln'),
      id: like('004b7164-0943-41b5-95fc-39794af4a9fe'),
      base_location: baseLocations,
    },
  ];

  describe('get /caseworker', () => {
    const sandbox: sinon.SinonSandbox = sinon.createSandbox();
    let next;

    beforeEach(() => {
      next = sandbox.spy();
    });

    before(async () => {
      const interaction = {
        states: [{ description: 'A list of users for CRD request' }],
        uponReceiving: 'get list of caseworkers',
        withRequest: {
          method: 'POST',
          path: '/refdata/case-worker/users/fetchUsersById',
          headers: {
            Authorization: 'Bearer someAuthorizationToken',
            ServiceAuthorization: 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/json',
          },
          body: REQUEST_BODY,
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: RESPONSE_BODY,
        },
      };

      pactSetUp.provider.addInteraction(interaction);
    });

    afterEach(() => {
      sandbox.restore();
      sinon.reset();
      MockApp.stopServer();
    });

    it('returns the correct response', async () => {
      MockApp.setServerPort(9000);
      MockApp.init();

      MockApp.onPost('/am/role-assignments/query', (req, res) => {
        res.send({
          roleAssignmentResponse: [
            { actorId: '004b7164-0943-41b5-95fc-39794af4a9fe', roleCategory: 'case-worker' },
            { actorId: '004b7164-0943-41b5-95fc-39794af4a9fe', roleCategory: 'case-worker' },
          ],
        });
      });
      await MockApp.startServer();

      return pactSetUp.provider.executeTest(async (mockServer) => {
        const configValues = getCaseworkerRefDataAPIOverrides(mockServer.url);
        configValues['services.role_assignment.roleApi'] = 'http://localhost:9000';
        configValues.waSupportedJurisdictions = 'IA';
        sandbox.stub(Object.getPrototypeOf(config), 'get').callsFake((prop: string) => configValues[prop]);
        const req = mockReq({
          headers: {
            Authorization: 'Bearer someAuthorizationToken',
            ServiceAuthorization: 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/json',
          },
          body: { userIds: ['004b7164-0943-41b5-95fc-39794af4a9fe', '004b7164-0943-41b5-95fc-39794af4a9fe'] },
        });
        let returnedResponse = null;
        const response = mockRes();
        response.send = (ret) => {
          returnedResponse = ret;
        };

        try {
          await new RealStaffRefDataAPI().fetchUsersById(req, response, next);

          assertResponses(returnedResponse);
        } catch (err) {
          console.log(err.stack);
          throw new Error(err);
        }
      });
    });
  });
});

function assertResponses(dto: any) {
  expect(dto).to.be.an('array').with.length(1);
  expect(dto[0].email_id).to.equal('test_person@test.gov.uk');
  expect(dto[0].first_name).to.equal('testfn');
  expect(dto[0].last_name).to.equal('testln');
  expect(dto[0].id).to.equal('004b7164-0943-41b5-95fc-39794af4a9fe');
  expect(dto[0].base_location).to.be.an('array').with.length(1);
  expect(dto[0].base_location[0].location_id).to.equal(1);
  expect(dto[0].base_location[0].location).to.equal('National');
  expect(dto[0].base_location[0].is_primary).to.equal(true);
}
