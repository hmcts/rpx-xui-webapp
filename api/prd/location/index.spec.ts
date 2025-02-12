import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import { http } from '../../lib/http';
import { mockLocations } from './locationTestData.spec';
import { getLocationById, getLocations } from './index';

chai.use(sinonChai);
describe('prd Locations', () => {
  const GET = 'get';

  let sandbox: sinon.SinonSandbox;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
          locationType: 'hearing'
        }
      });

      const response = mockRes({
        data: mockLocations
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
    it('should return a location based on epimms_id', async () => {
      spy = sandbox.stub(http, GET).resolves(getLocationByIdRes);
      const req = mockReq({
        query: {
          epimms_id: '2345',
          serviceCode: 'ABA1'
        }
      });

      const response = mockRes({
        data: mockLocations.slice(2, 3)
      });

      try {
        await getLocationById(req, response, next);
        expect(response.data[0].court_venue_id).to.equal('10052');
        expect(response.data[0]).to.deep.equal(mockLocations[2]);
        expect(response.send).to.have.been.calledWith(sinon.match(spy));
      } catch (err) {
        console.log(err.stack);
        throw new Error(err);
      }
    });
  });
});
