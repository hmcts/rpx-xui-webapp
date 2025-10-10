
import * as chai from 'chai';
import { expect } from 'chai';
import * as sinonChai from 'sinon-chai';
import { http } from '../lib/http';
import 'mocha';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { ALL_LOCATIONS } from './constants/locations';
import {
  handleLocationGet,
  commonGetFullLocation,
  getFullLocationsForServices,
  getRegionLocationsForServices
} from './locationService';
import * as configurationModule from '../configuration';
import * as refDataUtils from '../ref-data/ref-data-utils';
import * as util from './util';

chai.use(sinonChai);

describe('Location Service', () => {
  let sandbox: sinon.SinonSandbox;
  const res = mockRes({ status: 200, data: ALL_LOCATIONS });

  // Mock data for tests
  const mockCourtVenues = [
    { epimms_id: '123456', site_name: 'Test Court 1', is_case_management_location: 'Y', region_id: 'region1' },
    { epimms_id: '789012', site_name: 'Test Court 2', is_case_management_location: 'N', region_id: 'region1' },
    { epimms_id: '345678', site_name: 'Test Court 3', is_case_management_location: 'Y', region_id: 'region2' }
  ];

  const mockLocationResponse = {
    data: {
      court_venues: mockCourtVenues
    }
  };

  const mockServiceRefDataMapping = [
    { service: 'IA', serviceCodes: ['BFA1', 'BFA2'] },
    { service: 'CIVIL', serviceCodes: ['AAA6', 'AAA7'] }
  ];

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('handleLocationGet()', () => {
    it('should make a get request', async () => {
      const path = '/location';
      const req = mockReq();
      sandbox.stub(http, 'get').resolves(res);
      const { data } = await handleLocationGet(path, req);
      expect(data).to.equal(ALL_LOCATIONS);
    });

    it('should handle HTTP errors', async () => {
      const path = '/location';
      const req = mockReq();
      const error = new Error('Network error');
      sandbox.stub(http, 'get').rejects(error);

      try {
        await handleLocationGet(path, req);
        expect.fail('Should have thrown an error');
      } catch (err) {
        expect(err).to.equal(error);
      }
    });

    it('should pass correct headers', async () => {
      const path = '/location';
      const req = mockReq({
        headers: {
          authorization: 'Bearer token123',
          'user-roles': 'caseworker'
        }
      });
      const httpStub = sandbox.stub(http, 'get').resolves(res);

      await handleLocationGet(path, req);

      expect(httpStub).to.have.been.calledWith(path, sinon.match({
        headers: sinon.match.object
      }));
    });
  });

  describe('commonGetFullLocation()', () => {
    let getConfigValueStub: sinon.SinonStub;
    let getServiceRefDataMappingListStub: sinon.SinonStub;
    let prepareGetLocationsUrlStub: sinon.SinonStub;
    let httpStub: sinon.SinonStub;

    beforeEach(() => {
      getConfigValueStub = sandbox.stub(configurationModule, 'getConfigValue').returns('http://localhost:8080');
      getServiceRefDataMappingListStub = sandbox.stub(refDataUtils, 'getServiceRefDataMappingList').returns(mockServiceRefDataMapping);
      prepareGetLocationsUrlStub = sandbox.stub(util, 'prepareGetLocationsUrl').returns('http://localhost:8080/locations/BFA1');
      httpStub = sandbox.stub(http, 'get').resolves(mockLocationResponse);
    });

    it('should return filtered case management locations when allLocations is true', async () => {
      const req = mockReq({
        query: { serviceCodes: 'IA' }
      });

      const result = await commonGetFullLocation(req, true);

      // Since we call the API twice (for BFA1 and BFA2), we get duplicates
      expect(result).to.have.length(4); // 2 case management locations × 2 service codes
      expect(result.filter((venue) => venue.id === '123456')).to.have.length(2);
      expect(result.filter((venue) => venue.id === '345678')).to.have.length(2);
      expect(httpStub).to.have.been.calledTwice; // Called for BFA1 and BFA2
    });

    it('should return all locations when allLocations is false', async () => {
      const req = mockReq({
        query: { serviceCodes: 'IA' }
      });

      const result = await commonGetFullLocation(req, false);

      // Should be deduplicated to 3 unique venues
      expect(result).to.have.length(3);
      expect(result.map((v) => v.epimms_id)).to.include.members(['123456', '789012', '345678']);
    });

    it('should handle multiple service codes', async () => {
      const req = mockReq({
        query: { serviceCodes: 'IA,CIVIL' }
      });

      await commonGetFullLocation(req, false);

      expect(httpStub).to.have.callCount(4); // 2 calls for IA (BFA1, BFA2) + 2 calls for CIVIL (AAA6, AAA7)
    });

    it('should deduplicate locations when allLocations is false', async () => {
      // Mock response with duplicate venues
      const duplicateResponse = {
        data: {
          court_venues: [
            { epimms_id: '123456', site_name: 'Test Court 1', is_case_management_location: 'Y', region_id: 'region1' },
            { epimms_id: '123456', site_name: 'Test Court 1', is_case_management_location: 'Y', region_id: 'region1' }
          ]
        }
      };
      httpStub.resolves(duplicateResponse);

      const req = mockReq({
        query: { serviceCodes: 'IA' }
      });

      const result = await commonGetFullLocation(req, false);

      expect(result).to.have.length(1); // Should be deduplicated
    });

    it('should handle empty service codes', async () => {
      const req = mockReq({
        query: { serviceCodes: '' }
      });

      const result = await commonGetFullLocation(req, false);

      expect(result).to.deep.equal([]);
      expect(httpStub).not.to.have.been.called;
    });

    it('should handle HTTP errors gracefully', async () => {
      const req = mockReq({
        query: { serviceCodes: 'IA' }
      });
      httpStub.rejects(new Error('Service unavailable'));

      try {
        await commonGetFullLocation(req, false);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.equal('Service unavailable');
      }
    });
  });

  describe('getFullLocationsForServices()', () => {
    let getConfigValueStub: sinon.SinonStub;
    let getServiceRefDataMappingListStub: sinon.SinonStub;
    let prepareGetLocationsUrlStub: sinon.SinonStub;
    let httpStub: sinon.SinonStub;

    beforeEach(() => {
      getConfigValueStub = sandbox.stub(configurationModule, 'getConfigValue').returns('http://localhost:8080');
      getServiceRefDataMappingListStub = sandbox.stub(refDataUtils, 'getServiceRefDataMappingList').returns(mockServiceRefDataMapping);
      prepareGetLocationsUrlStub = sandbox.stub(util, 'prepareGetLocationsUrl').returns('http://localhost:8080/locations/BFA1');
      httpStub = sandbox.stub(http, 'get').resolves(mockLocationResponse);
    });

    it('should return court venues for bookable services', async () => {
      const req = mockReq({
        body: { bookableServices: ['IA'] }
      });

      const result = await getFullLocationsForServices(req);

      expect(result).to.have.length(6); // 3 venues × 2 service codes = 6 total (with duplicates)
      expect(httpStub).to.have.been.calledTwice; // Called for BFA1 and BFA2
    });

    it('should handle multiple bookable services', async () => {
      const req = mockReq({
        body: { bookableServices: ['IA', 'CIVIL'] }
      });

      const result = await getFullLocationsForServices(req);

      expect(result).to.have.length(12); // 3 venues × 4 service codes = 12 total
      expect(httpStub).to.have.callCount(4); // Called for all 4 service codes
    });

    it('should handle empty bookable services', async () => {
      const req = mockReq({
        body: { bookableServices: [] }
      });

      const result = await getFullLocationsForServices(req);

      expect(result).to.deep.equal([]);
      expect(httpStub).not.to.have.been.called;
    });

    it('should handle services not in mapping', async () => {
      const req = mockReq({
        body: { bookableServices: ['UNKNOWN_SERVICE'] }
      });

      const result = await getFullLocationsForServices(req);

      expect(result).to.deep.equal([]);
      expect(httpStub).not.to.have.been.called;
    });

    it('should handle HTTP errors', async () => {
      const req = mockReq({
        body: { bookableServices: ['IA'] }
      });
      httpStub.rejects(new Error('API Error'));

      try {
        await getFullLocationsForServices(req);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.equal('API Error');
      }
    });
  });

  describe('getRegionLocationsForServices()', () => {
    let getConfigValueStub: sinon.SinonStub;
    let getServiceRefDataMappingListStub: sinon.SinonStub;
    let prepareGetLocationsUrlStub: sinon.SinonStub;
    let httpStub: sinon.SinonStub;

    beforeEach(() => {
      getConfigValueStub = sandbox.stub(configurationModule, 'getConfigValue').returns('http://localhost:8080');
      getServiceRefDataMappingListStub = sandbox.stub(refDataUtils, 'getServiceRefDataMappingList').returns(mockServiceRefDataMapping);
      prepareGetLocationsUrlStub = sandbox.stub(util, 'prepareGetLocationsUrl').returns('http://localhost:8080/locations/BFA1');
      httpStub = sandbox.stub(http, 'get').resolves(mockLocationResponse);
    });

    it('should return region locations mapping', async () => {
      const req = mockReq({
        body: { serviceIds: ['IA'] }
      });

      const result = await getRegionLocationsForServices(req);

      expect(result).to.have.length(2); // 2 unique regions
      expect(result).to.deep.include({
        regionId: 'region1',
        locations: ['123456', '789012', '123456', '789012'] // Duplicated for each service code
      });
      expect(result).to.deep.include({
        regionId: 'region2',
        locations: ['345678', '345678'] // Duplicated for each service code
      });
    });

    it('should handle multiple service IDs', async () => {
      const req = mockReq({
        body: { serviceIds: ['IA', 'CIVIL'] }
      });

      const result = await getRegionLocationsForServices(req);

      expect(result).to.have.length(2); // Still 2 unique regions
      expect(httpStub).to.have.callCount(4); // Called for all 4 service codes
    });

    it('should handle empty service IDs', async () => {
      const req = mockReq({
        body: { serviceIds: [] }
      });

      const result = await getRegionLocationsForServices(req);

      expect(result).to.deep.equal([]);
      expect(httpStub).not.to.have.been.called;
    });

    it('should handle services not in mapping', async () => {
      const req = mockReq({
        body: { serviceIds: ['UNKNOWN_SERVICE'] }
      });

      const result = await getRegionLocationsForServices(req);

      expect(result).to.deep.equal([]);
      expect(httpStub).not.to.have.been.called;
    });

    it('should group locations by region correctly', async () => {
      // Mock response with venues from same region
      const sameRegionResponse = {
        data: {
          court_venues: [
            { epimms_id: '111', site_name: 'Court A', region_id: 'region1' },
            { epimms_id: '222', site_name: 'Court B', region_id: 'region1' },
            { epimms_id: '333', site_name: 'Court C', region_id: 'region2' }
          ]
        }
      };
      httpStub.resolves(sameRegionResponse);

      const req = mockReq({
        body: { serviceIds: ['IA'] }
      });

      const result = await getRegionLocationsForServices(req);

      expect(result).to.have.length(2);
      const region1 = result.find((r) => r.regionId === 'region1');
      const region2 = result.find((r) => r.regionId === 'region2');

      expect(region1.locations).to.include('111');
      expect(region1.locations).to.include('222');
      expect(region2.locations).to.include('333');
    });

    it('should handle HTTP errors', async () => {
      const req = mockReq({
        body: { serviceIds: ['IA'] }
      });
      httpStub.rejects(new Error('Network Error'));

      try {
        await getRegionLocationsForServices(req);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.equal('Network Error');
      }
    });

    it('should handle empty court venues response', async () => {
      const emptyResponse = {
        data: {
          court_venues: []
        }
      };
      httpStub.resolves(emptyResponse);

      const req = mockReq({
        body: { serviceIds: ['IA'] }
      });

      const result = await getRegionLocationsForServices(req);

      expect(result).to.deep.equal([]);
    });
  });
});
