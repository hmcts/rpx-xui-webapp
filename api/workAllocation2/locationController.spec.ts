import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';

import { http } from '../lib/http';
import { ALL_LOCATIONS } from './constants/locations';
import { getLocationById, mapLocations } from './locationController';

chai.use(sinonChai);
describe('workAllocation', () => {

  const SUCCESS_RESPONSE = {status: 200, data: ALL_LOCATIONS};
  let sandbox: sinon.SinonSandbox;
  let next: any;
  let spy: any;
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
      spy = sandbox.stub(http, GET).resolves(res);
      const req = mockReq({
        params: {
          locationId: LOCATION_ID,
        },
      });
      const response = mockRes();

      response.send.throws();

      await getLocationById(req, response, next);

      expect(next).to.have.been.calledWith();
    });
  });

  describe('mapLocations', () => {

    it('should make a get request and respond appropriately locations', async () => {

      spy = sandbox.stub(http, GET).resolves(res);
      const req = mockReq();
      const response = mockRes();

      const locations = mapLocations([{epimms_id: '1', site_name: 'full name', venue_name: 'name1', is_case_management_location: 'Y'}]);

      expect(locations[0].id).to.equal('1');
      expect(locations[0].locationName).to.equal('full name');
    });

    it('should handle an exception being thrown', async () => {

      spy = sandbox.stub(http, GET).resolves(res);
      const req = mockReq();
      const response = mockRes();

      response.send.throws();

      await getLocationById(req, response, next);

      expect(next).to.have.been.calledWith();
    });
  });
});
