import 'mocha';

import * as chai from 'chai'
import {expect} from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai'
import {mockReq, mockRes} from 'sinon-express-mock';

import {http} from '../lib/http';
import {baseUrl, getLocationById, getLocations} from './locationController';

chai.use(sinonChai);
describe('workAllocation', () => {

  const SUCCESS_RESPONSE = {status: 200, data: 'ok'};
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

    it('should make a get request and respond appropriately', async () => {

      spy = sandbox.stub(http, GET).resolves(res);
      const req = mockReq({
        params: {
          locationId: LOCATION_ID
        }
      });
      const response = mockRes();

      // Call production code
      await getLocationById(req, response, next);

      // Should have the correct URL.
      const args = spy.getCall(0).args;
      expect(args[0]).to.equal(`${baseUrl}/location/${LOCATION_ID}`);

      // Should have received the HTTP response. The get simply returns the data.
      expect(response.send).to.have.been.calledWith(sinon.match(SUCCESS_RESPONSE.data));
    });

    it('should handle an exception being thrown', async () => {
      spy = sandbox.stub(http, GET).resolves(res);
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

  describe('getLocations', () => {

    it('should make a get request and respond appropriately', async () => {

      spy = sandbox.stub(http, GET).resolves(res);
      const req = mockReq();
      const response = mockRes();

      await getLocations(req, response, next);

      // Should have the correct URL.
      const args = spy.getCall(0).args;
      expect(args[0]).to.equal(`${baseUrl}/location`);

      // Should have received the HTTP response. The get simply returns the data.
      expect(response.send).to.have.been.calledWith(sinon.match(SUCCESS_RESPONSE.data));
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
