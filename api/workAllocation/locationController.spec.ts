import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import { http } from '../lib/http';
import { ALL_LOCATIONS } from './constants/locations';
import { getLocationById, mapLocations, getLocations, getFullLocations, getLocationsByRegion } from './locationController';
import * as locationService from './locationService';

chai.use(sinonChai);

describe('workAllocation', () => {
  const SUCCESS_RESPONSE = { status: 200, data: ALL_LOCATIONS };
  let sandbox: sinon.SinonSandbox;
  let next: any;
  let res: any;

  const GET = 'get';

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    next = sandbox.spy();
    res = mockRes(SUCCESS_RESPONSE);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getLocationById', () => {
    const LOCATION_ID = 42;

    it('should handle an exception being thrown', async () => {
      sandbox.stub(http, GET).resolves(res);
      const req = mockReq({
        params: {
          locationId: LOCATION_ID
        }
      });
      const response = mockRes();

      response.send.throws();

      await getLocationById(req, response, next);

      expect(next).to.have.been.calledWith();
    });
  });

  describe('mapLocations', () => {
    it('should make a get request and respond appropriately locations', async () => {
      sandbox.stub(http, GET).resolves(res);

      const locations = mapLocations([{ epimms_id: '1', site_name: 'full name', venue_name: 'name1', is_case_management_location: 'Y' }]);

      expect(locations[0].id).to.equal('1');
      expect(locations[0].locationName).to.equal('full name');
    });

    it('should handle an exception being thrown', async () => {
      sandbox.stub(http, GET).resolves(res);
      const req = mockReq();
      const response = mockRes();

      response.send.throws();

      await getLocationById(req, response, next);

      expect(next).to.have.been.calledWith();
    });
  });

  describe('getLocations', () => {
    it('should respond with locations and status 200', async () => {
      const mockLocations = [{ id: '1', locationName: 'Test Location' }];
      const req = mockReq({ query: { serviceCodes: 'BFA1' } });
      const response = mockRes();
      sandbox.stub(locationService, 'commonGetFullLocation').resolves(mockLocations);

      await getLocations(req, response, next);

      expect(response.send).to.have.been.calledWith(mockLocations);
      expect(response.status).to.have.been.calledWith(200);
      expect(next).not.to.have.been.called;
    });

    it('should call next with error if exception thrown', async () => {
      const error = new Error('Test error');
      const req = mockReq({ query: { serviceCodes: 'BFA1' } });
      const response = mockRes();
      sandbox.stub(locationService, 'commonGetFullLocation').rejects(error);

      await getLocations(req, response, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('getFullLocations', () => {
    it('should respond with full locations and status 200', async () => {
      const mockLocations = [{ id: '2', locationName: 'Full Location' }];
      const req = mockReq({ query: { serviceCodes: 'BFA1' } });
      const response = mockRes();
      sandbox.stub(locationService, 'commonGetFullLocation').resolves(mockLocations);

      await getFullLocations(req, response, next);

      expect(response.send).to.have.been.calledWith(mockLocations);
      expect(response.status).to.have.been.calledWith(200);
      expect(next).not.to.have.been.called;
    });

    it('should call next with error if exception thrown', async () => {
      const error = new Error('Full error');
      const req = mockReq({ query: { serviceCodes: 'BFA1' } });
      const response = mockRes();
      sandbox.stub(locationService, 'commonGetFullLocation').rejects(error);

      await getFullLocations(req, response, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('getLocationsByRegion', () => {
    it('should respond with region locations and status 200', async () => {
      const mockRegionLocations = [{ regionId: '1', locations: ['1', '2'] }];
      const req = mockReq({ body: { serviceIds: ['BFA1'] } });
      const response = mockRes();
      sandbox.stub(locationService, 'getRegionLocationsForServices').resolves(mockRegionLocations);

      await getLocationsByRegion(req, response, next);

      expect(response.send).to.have.been.calledWith(mockRegionLocations);
      expect(response.status).to.have.been.calledWith(200);
      expect(next).not.to.have.been.called;
    });

    it('should call next with error if exception thrown', async () => {
      const error = new Error('Region error');
      const req = mockReq({ body: { serviceIds: ['BFA1'] } });
      const response = mockRes();
      sandbox.stub(locationService, 'getRegionLocationsForServices').rejects(error);

      await getLocationsByRegion(req, response, next);

      expect(next).to.have.been.calledWith(error);
    });
  });
});
