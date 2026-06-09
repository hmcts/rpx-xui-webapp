import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { http } from '../../lib/http';
import { mockLocations } from './locationTestData.spec';
import { getLocationById, getLocations } from './index';
import { toEpimmsLocation } from './models/location.model';

// Import sinon-chai using require to avoid ES module issues
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
describe('prd Locations', () => {
  const GET = 'get';

  let sandbox: sinon.SinonSandbox;

  let spy: sinon.SinonSpy;
  const getLocationsRes = mockRes({ status: 200, data: mockLocations });
  const getLocationByIdRes = mockRes({ status: 200, data: mockLocations });
  let next: any;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    next = sandbox.stub();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getLocations', () => {
    it('should return the location for user base location based on search term', async () => {
      spy = sandbox.stub(http, GET).resolves(getLocationsRes);
      const req = mockReq({
        query: {
          searchTerm: 'Gla',
          serviceIds: 'IA,CIVIL,SSCS,BHA1,ABA1,AAA1',
          locationType: 'hearing',
        },
      });

      const response = mockRes({
        data: mockLocations,
      });

      try {
        await getLocations(req, response, next);
        expect(response.data.length).to.equal(5);
      } catch (err) {
        console.log(err.stack);
        throw new Error(err);
      }
    });
  });

  describe('getLocationById', () => {
    it('should return a location based on epimms_id filtered by court type when service_id is not present', async () => {
      spy = sandbox.stub(http, GET).resolves(getLocationByIdRes);
      const req = mockReq({
        query: {
          epimms_id: '2345',
          serviceCode: 'ABA1',
        },
      });

      const response = mockRes();

      try {
        await getLocationById(req, response, next);
        expect(spy.firstCall.args[0]).to.contain('/refdata/location/court-venues?epimms_id=2345&service_code=ABA1');
        expect(response.status).to.have.been.calledWith(200);
        expect(response.send).to.have.been.calledWith([toEpimmsLocation(mockLocations[2])]);
      } catch (err) {
        console.log(err.stack);
        throw new Error(err);
      }
    });

    it('should not filter by court type when service_id is present in the location response', async () => {
      const locationsWithServiceId = mockLocations
        .filter((location) => location.epimms_id === '2345')
        .map((location) => ({
          ...location,
          service_id: 'ABA1',
        }));
      spy = sandbox.stub(http, GET).resolves(mockRes({ status: 200, data: locationsWithServiceId }));
      const req = mockReq({
        query: {
          epimms_id: '2345',
          serviceCode: 'ABA1',
        },
      });

      const response = mockRes();

      try {
        await getLocationById(req, response, next);
        expect(spy.firstCall.args[0]).to.contain('/refdata/location/court-venues?epimms_id=2345&service_code=ABA1');
        expect(response.status).to.have.been.calledWith(200);
        expect(response.send).to.have.been.calledWith([toEpimmsLocation(mockLocations[1])]);
      } catch (err) {
        console.log(err.stack);
        throw new Error(err);
      }
    });
  });
});
