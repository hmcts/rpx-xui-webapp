import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { http } from '../lib/http';
import * as healthCheck from './index';

// Import sinon-chai using require to avoid ES module issues
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('health check', () => {
  let httpGetStub: sinon.SinonStub;

  beforeEach(() => {
    httpGetStub = sinon.stub(http, 'get').resolves({});
  });

  afterEach(() => {
    httpGetStub.restore();
  });

  describe('getPromises()', () => {
    it('Should take in a path and return an array.', () => {
      const path = '/cases';
      expect(healthCheck.getPromises(path)).to.be.an('array');
      expect(httpGetStub).to.have.been.called;
    });
  });

  describe('healthCheckRoute()', () => {
    it('Should call getPromises() with path.', async () => {
      const requestQueryPath = '/cases';
      const req = mockReq({
        query: {
          path: requestQueryPath
        }
      });

      const res = mockRes();

      await healthCheck.healthCheckRoute(req, res);
      expect(httpGetStub).to.have.been.called;
      expect(res.send).to.have.been.calledWith({ healthState: true });
    });
  });
});
