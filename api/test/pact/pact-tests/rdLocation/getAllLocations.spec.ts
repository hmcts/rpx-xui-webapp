import { expect } from 'chai';
import config = require('config');
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { PactV3TestSetup } from '../settings/provider.mock';
import { getLocationsRefDataAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';

const { MatchersV3 } = require('@pact-foundation/pact');
const { like } = MatchersV3;
const pactSetUp = new PactV3TestSetup({ provider: 'referenceData_location', port: 8000 });

const serviceCode = 'BFA1';
const service = 'IA';

describe('Locations ref data api, get all locations for service', () => {
  const RESPONSE_BODY = {
    court_venues: [
      {
        is_case_management_location: like('Y'),
        epimms_id: like('12345'),
        site_name: like('siteName1'),
      },
    ],
  };

  describe('get /locations}', () => {
    const sandbox: sinon.SinonSandbox = sinon.createSandbox();
    let next;

    beforeEach(() => {
      next = sandbox.spy();
    });

    before(async () => {
      const interaction = {
        states: [{ description: 'Court Venues exist for the service code provided' }],
        uponReceiving: 'get list of court venues for given service code',
        withRequest: {
          method: 'GET',
          path: '/refdata/location/court-venues/services',
          query: {
            service_code: serviceCode,
          },
          headers: {
            Authorization: 'Bearer someAuthorizationToken',
            ServiceAuthorization: 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/json',
          },
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
    });

    it('returns the correct response', async () => {
      return pactSetUp.provider.executeTest(async (mockServer) => {
        const configValues = getLocationsRefDataAPIOverrides(mockServer.url);
        configValues.serviceRefDataMapping = [{ service: 'IA', serviceCodes: [serviceCode] }];
        sandbox.stub(Object.getPrototypeOf(config), 'get').callsFake((prop: string) => configValues[prop]);
        const { getLocations } = requireReloaded('../../../../workAllocation/locationController');

        const req = mockReq({
          headers: {
            Authorization: 'Bearer someAuthorizationToken',
            ServiceAuthorization: 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/json',
          },
          query: { serviceCodes: service },
        });
        let returnedResponse = null;
        const response = mockRes();
        response.send = (ret) => {
          returnedResponse = ret;
        };

        try {
          await getLocations(req, response, next);

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
  expect(dto[0].id).to.equal('12345');
  expect(dto[0].locationName).to.equal('siteName1');
}
