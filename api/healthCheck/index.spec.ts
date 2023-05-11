import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import * as healthCheck from './index';

chai.use(sinonChai);

describe('health check', () => {
  describe('getPromises()', () => {
    it('Should take in a path and return an array.', () => {
      const path = '/cases';
      expect(healthCheck.getPromises(path)).to.be.an('array');
    });
  });

  describe('healthCheckRoute()', () => {
    xit('Should call getPromises() with path.', async () => {
      const requestQueryPath = '/cases';
      const req = mockReq({
        query: {
          path: requestQueryPath
        }
      });

      const res = mockRes();

      const getPromisesStub = sinon.stub(healthCheck, 'getPromises');
      getPromisesStub.resolves([]);
      await healthCheck.healthCheckRoute(req, res);
      expect(getPromisesStub).to.be.calledWith(requestQueryPath);
      getPromisesStub.restore();
    });
  });
});
