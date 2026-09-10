import { expect } from 'chai';
import config = require('config');
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { PactV3TestSetup } from '../settings/provider.mock';
import { getCaseworkerRefDataAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';

const { MatchersV3 } = require('@pact-foundation/pact');
const { like } = MatchersV3;
const pactSetUp = new PactV3TestSetup({ provider: 'referenceData_caseworkerRefUsers', port: 8080 });

const MockApp = require('../../pact-mocks/app');

// TODO: Remove this Pact test once ticket EXUI-5159 is completed.
describe('Caseworker ref data api, get all caseworkers for a specific location and service', () => {
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
        uponReceiving: 'get list of caseworkers for location and service',
        withRequest: {
          method: 'GET',
          path: '/caseworker/location/1/service/IA',
          headers: {
            Authorization: 'Bearer someAuthorizationToken',
            ServiceAuthorization: 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/json',
          },
          body: null,
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
        const { getCaseWorkersForLocationAndService } = requireReloaded('../../../../workAllocation/index');

        const req = mockReq({
          headers: {
            Authorization: 'Bearer someAuthorizationToken',
            ServiceAuthorization: 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/json',
          },
          params: { locationId: '1', serviceId: 'IA' },
        });
        let returnedResponse = null;
        const response = mockRes();
        response.send = (ret) => {
          returnedResponse = ret;
        };

        await getCaseWorkersForLocationAndService(req, response, next);
        assertResponses(returnedResponse);
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
