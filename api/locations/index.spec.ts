import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import * as configuration from '../configuration';
import { SERVICE_REF_DATA_MAPPING } from '../configuration/references';
import { http } from '../lib/http';
import { getLocations, getServiceIdsByService, isValidServiceId } from './index';
import { mockLocations } from './locationTestData.spec';

// Import sinon-chai using require to avoid ES module issues
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
describe('Fee Pay Judge', () => {
  const GET = 'get';

  let sandbox: sinon.SinonSandbox;

  let spy: sinon.SinonSpy;
  let next: any;

  const cloneLocations = (locations: any[] = mockLocations): any[] => locations.map((location) => ({ ...location }));
  const mockHttpResponse = (locations: any[] = mockLocations): any => mockRes({ status: 200, data: cloneLocations(locations) });
  const getSentLocations = (response: any): any[] => response.send.firstCall.args[0];

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    next = sandbox.stub();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getLocations', () => {
    it('should return the location for user base location based on search term', async () => {
      spy = sandbox.stub(http, GET).resolves(mockHttpResponse());
      const req = mockReq({
        body: {
          searchTerm: 'Gla',
          serviceIds: ['IA', 'CIVIL', 'SSCS', 'BHA1', 'ABA1', 'AAA1'],
          locationType: 'hearing',
          userLocations: [
            { service: 'IA', locations: [{ id: '1234' }] },
            { service: 'CIVIL', locations: [{ id: '2345' }] },
          ],
          bookingLocations: ['1234', '2343'],
        },
      });

      const response = mockRes();

      try {
        await getLocations(req, response, next);
        // should equal 3, two for the two user base locations, one for the SSCS locations
        expect(getSentLocations(response).length).to.equal(3);
      } catch (err) {
        console.log(err.stack);
        throw new Error(err);
      }
    });

    it('should return all locations if there is no base location', async () => {
      spy = sandbox.stub(http, GET).resolves(mockHttpResponse());
      const req = mockReq({
        body: {
          searchTerm: 'Gla',
          serviceIds: ['IA', 'CIVIL', 'SSCS', 'BHA1', 'ABA1', 'AAA1'],
          locationType: 'hearing',
          userLocations: [],
          bookingLocations: ['1234', '2343'],
        },
      });

      const response = mockRes();

      try {
        await getLocations(req, response, next);
        // expect all locations to be given
        expect(getSentLocations(response).length).to.equal(mockLocations.length);
      } catch (err) {
        console.log(err.stack);
        throw new Error(err);
      }
    });

    it('should return no locations if there is no base location within user locations', async () => {
      spy = sandbox.stub(http, GET).resolves(mockHttpResponse());
      const req = mockReq({
        body: {
          searchTerm: 'Gla',
          serviceIds: ['IA', 'CIVIL', 'BHA1', 'ABA1', 'AAA1'],
          locationType: 'hearing',
          userLocations: [{ service: 'IA', locations: [] }],
          bookingLocations: [],
        },
      });

      const response = mockRes();

      try {
        await getLocations(req, response, next);
        // expect all civil locations, no IA locations to be given
        expect(getSentLocations(response).length).to.equal(2);
      } catch (err) {
        console.log(err.stack);
        throw new Error(err);
      }
    });

    it('should return locations for regions if there is region information', async () => {
      spy = sandbox.stub(http, GET).resolves(mockHttpResponse());
      const req = mockReq({
        body: {
          searchTerm: 'Gla',
          serviceIds: ['IA', 'CIVIL', 'BHA1', 'ABA1', 'AAA1'],
          locationType: 'hearing',
          userLocations: [{ service: 'IA', locations: [{ regionId: '11' }] }],
          bookingLocations: [],
        },
      });

      const response = mockRes();

      try {
        await getLocations(req, response, next);
        // expect all civil locations, no IA locations to be given
        expect(getSentLocations(response).length).to.equal(3);
      } catch (err) {
        console.log(err.stack);
        throw new Error(err);
      }
    });

    it('should return the possible locations for bookable filter', async () => {
      spy = sandbox.stub(http, GET).resolves(mockHttpResponse());
      const req = mockReq({
        body: {
          searchTerm: 'Gla',
          serviceIds: ['IA', 'CIVIL', 'SCSS', 'BHA1', 'ABA1', 'AAA1'],
          locationType: 'hearing',
          userLocations: [{ service: 'IA', locations: [{ id: '1234' }] }],
          bookingLocations: null,
        },
      });

      const response = mockRes();

      try {
        await getLocations(req, response, next);
        // should equal 4, only getting base location for IA
        expect(getSentLocations(response).length).to.equal(3);
      } catch (err) {
        console.log(err.stack);
        throw new Error(err);
      }
    });

    it('should pass mapped service codes to the location API when serviceIds are jurisdiction names', async () => {
      sandbox
        .stub(configuration, 'getConfigValue')
        .withArgs(SERVICE_REF_DATA_MAPPING)
        .returns([
          { service: 'IA', serviceCodes: ['BFA1'] },
          { service: 'CIVIL', serviceCodes: ['AAA6', 'AAA7'] },
        ]);
      spy = sandbox.stub(http, GET).resolves(mockHttpResponse());
      const req = mockReq({
        body: {
          searchTerm: 'Gla',
          serviceIds: ['IA', 'CIVIL'],
          locationType: 'hearing',
          userLocations: [],
          bookingLocations: [],
        },
      });

      const response = mockRes();

      try {
        await getLocations(req, response, next);
        expect(spy.firstCall.args[0]).to.contain(
          '/refdata/location/court-venues/venue-search?search-string=Gla&court-type-id=4,23,10&service_code=BFA1,AAA6,AAA7'
        );
      } catch (err) {
        console.log(err.stack);
        throw new Error(err);
      }
    });

    it('should pass service codes unchanged to the location API when serviceIds are already service codes', async () => {
      spy = sandbox.stub(http, GET).resolves(mockHttpResponse());
      const req = mockReq({
        body: {
          searchTerm: 'Gla',
          serviceIds: ['BFA1', 'AAA6'],
          locationType: 'hearing',
          userLocations: [],
          bookingLocations: [],
        },
      });

      const response = mockRes();

      try {
        await getLocations(req, response, next);
        expect(spy.firstCall.args[0]).to.contain(
          '/refdata/location/court-venues/venue-search?search-string=Gla&court-type-id=4,23,10&service_code=BFA1,AAA6'
        );
      } catch (err) {
        console.log(err.stack);
        throw new Error(err);
      }
    });

    it('should use the service_id response path when the new API response includes service_id', async () => {
      const locationsWithServiceId = cloneLocations().map((location) => ({
        ...location,
        service_id: 'BFA1',
      }));
      spy = sandbox.stub(http, GET).resolves(mockHttpResponse(locationsWithServiceId));
      const req = mockReq({
        body: {
          searchTerm: 'Gla',
          serviceIds: ['IA', 'CIVIL', 'SSCS'],
          locationType: 'hearing',
          userLocations: [{ service: 'IA', locations: [{ id: '1234' }] }],
          bookingLocations: [],
        },
      });

      const response = mockRes();

      try {
        await getLocations(req, response, next);
        expect(getSentLocations(response).map((location) => location.epimms_id)).to.deep.equal(['1234']);
      } catch (err) {
        console.log(err.stack);
        throw new Error(err);
      }
    });

    it('should not remove service_id results using the legacy court type cleanup', async () => {
      const serviceFilteredLocations = [
        {
          ...mockLocations[2],
          court_type_id: '99',
          service_id: 'ABA1',
        },
      ];
      spy = sandbox.stub(http, GET).resolves(mockHttpResponse(serviceFilteredLocations));
      const req = mockReq({
        body: {
          searchTerm: 'Gla',
          serviceIds: ['ABA1'],
          locationType: 'hearing',
          userLocations: [],
          bookingLocations: [],
        },
      });

      const response = mockRes();

      try {
        await getLocations(req, response, next);
        expect(getSentLocations(response)).to.deep.equal(serviceFilteredLocations);
      } catch (err) {
        console.log(err.stack);
        throw new Error(err);
      }
    });
  });

  describe('getServiceIdsByService', () => {
    it('should return deduplicated service codes from SERVICE_REF_DATA_MAPPING', () => {
      sandbox
        .stub(configuration, 'getConfigValue')
        .withArgs(SERVICE_REF_DATA_MAPPING)
        .returns([
          { service: 'IA', serviceCodes: ['BFA1'] },
          { service: 'CIVIL', serviceCodes: ['AAA6', 'AAA7'] },
          { service: 'SSCS', serviceCodes: ['BFA1', 'BBA3'] },
        ]);

      const serviceCodes = getServiceIdsByService(['IA', 'CIVIL', 'SSCS']);

      expect(serviceCodes).to.deep.equal(['BFA1', 'AAA6', 'AAA7', 'BBA3']);
    });

    it('should return default empty marker when no service mapping exists', () => {
      sandbox.stub(configuration, 'getConfigValue').withArgs(SERVICE_REF_DATA_MAPPING).returns([]);

      const serviceCodes = getServiceIdsByService(['UNKNOWN']);

      expect(serviceCodes).to.deep.equal(['']);
    });

    it('should keep valid service ids and map jurisdiction entries', () => {
      sandbox
        .stub(configuration, 'getConfigValue')
        .withArgs(SERVICE_REF_DATA_MAPPING)
        .returns([
          { service: 'IA', serviceCodes: ['BFA1'] },
          { service: 'CIVIL', serviceCodes: ['AAA6', 'AAA7'] },
        ]);

      const serviceCodes = getServiceIdsByService(['bfa1', 'IA', 'CIVIL']);

      expect(serviceCodes).to.deep.equal(['BFA1', 'AAA6', 'AAA7']);
    });
  });

  describe('isValidServiceId', () => {
    it('should return true for service ids that match 3 letters followed by a number', () => {
      expect(isValidServiceId('BFA1')).to.equal(true);
      expect(isValidServiceId('aaa6')).to.equal(true);
      expect(isValidServiceId(' BBA3 ')).to.equal(true);
    });

    it('should return false for non service id formats', () => {
      expect(isValidServiceId('IA')).to.equal(false);
      expect(isValidServiceId('CIVIL')).to.equal(false);
      expect(isValidServiceId('AB12')).to.equal(false);
      expect(isValidServiceId('AAA')).to.equal(false);
    });
  });
});
