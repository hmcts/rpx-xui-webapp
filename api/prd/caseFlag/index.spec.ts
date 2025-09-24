import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinonChai from 'sinon-chai';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { NextFunction } from 'express';
import * as crudService from '../../common/crudService';
import { getCaseFlagRefData } from './index';
import { CASE_FLAG_REFERENCE_VALUES } from './data/caseFlagReference.mock.data';

chai.use(sinonChai);

describe('Case Flag', () => {
  let sandbox: sinon.SinonSandbox;
  let req: any;
  let res: any;
  let next: sinon.SinonStub<any[], any>;
  let handleGetStub: sinon.SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = mockReq();
    res = mockRes();
    next = sandbox.stub();

    handleGetStub = sandbox.stub(crudService, 'handleGet');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getCaseFlagRefData', () => {
    it('should successfully fetch case flag reference data with valid serviceId', async () => {
      const serviceId = 'AAA7';
      req.query = { serviceId };

      const mockResponse = {
        status: 200,
        data: CASE_FLAG_REFERENCE_VALUES
      };

      handleGetStub.resolves(mockResponse);

      await getCaseFlagRefData(req, res, next);

      expect(handleGetStub).to.have.been.calledOnce;
      expect(handleGetStub).to.have.been.calledWith(
        sinon.match((url) => url.endsWith(`/refdata/commondata/caseflags/service-id=${serviceId}`)),
        req,
        next
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(CASE_FLAG_REFERENCE_VALUES);
      expect(next).to.not.have.been.called;
    });

    it('should handle empty response data', async () => {
      const serviceId = 'AAA7';
      req.query = { serviceId };

      const mockResponse = {
        status: 200,
        data: []
      };

      handleGetStub.resolves(mockResponse);

      await getCaseFlagRefData(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith([]);
      expect(next).to.not.have.been.called;
    });

    it('should handle missing serviceId in query parameters', async () => {
      req.query = {};

      const mockResponse = {
        status: 200,
        data: CASE_FLAG_REFERENCE_VALUES
      };

      handleGetStub.resolves(mockResponse);

      await getCaseFlagRefData(req, res, next);

      expect(handleGetStub).to.have.been.calledWith(
        sinon.match((url) => url.endsWith('/refdata/commondata/caseflags/service-id=undefined')),
        req,
        next
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(CASE_FLAG_REFERENCE_VALUES);
      expect(next).to.not.have.been.called;
    });

    it('should handle empty serviceId in query parameters', async () => {
      req.query = { serviceId: '' };

      const mockResponse = {
        status: 200,
        data: CASE_FLAG_REFERENCE_VALUES
      };

      handleGetStub.resolves(mockResponse);

      await getCaseFlagRefData(req, res, next);

      expect(handleGetStub).to.have.been.calledWith(
        sinon.match((url) => url.endsWith('/refdata/commondata/caseflags/service-id=')),
        req,
        next
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(CASE_FLAG_REFERENCE_VALUES);
      expect(next).to.not.have.been.called;
    });

    it('should handle 404 not found response', async () => {
      const serviceId = 'INVALID';
      req.query = { serviceId };

      const mockResponse = {
        status: 404,
        data: { error: 'Service not found' }
      };

      handleGetStub.resolves(mockResponse);

      await getCaseFlagRefData(req, res, next);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.send).to.have.been.calledWith({ error: 'Service not found' });
      expect(next).to.not.have.been.called;
    });

    it('should handle 400 bad request response', async () => {
      const serviceId = 'AAA7';
      req.query = { serviceId };

      const mockResponse = {
        status: 400,
        data: { error: 'Bad Request', message: 'Invalid service ID format' }
      };

      handleGetStub.resolves(mockResponse);

      await getCaseFlagRefData(req, res, next);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.send).to.have.been.calledWith({ error: 'Bad Request', message: 'Invalid service ID format' });
      expect(next).to.not.have.been.called;
    });

    it('should handle 500 internal server error response', async () => {
      const serviceId = 'AAA7';
      req.query = { serviceId };

      const mockResponse = {
        status: 500,
        data: { error: 'Internal Server Error' }
      };

      handleGetStub.resolves(mockResponse);

      await getCaseFlagRefData(req, res, next);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.send).to.have.been.calledWith({ error: 'Internal Server Error' });
      expect(next).to.not.have.been.called;
    });

    it('should handle errors thrown by handleGet and call next', async () => {
      const serviceId = 'AAA7';
      req.query = { serviceId };

      const error = new Error('Network error');
      handleGetStub.rejects(error);

      await getCaseFlagRefData(req, res, next);

      expect(next).to.have.been.calledWith(error);
      expect(res.status).to.not.have.been.called;
      expect(res.send).to.not.have.been.called;
    });

    it('should construct correct URL with special characters in serviceId', async () => {
      const serviceId = 'AAA7-TEST&SERVICE';
      req.query = { serviceId };

      const mockResponse = {
        status: 200,
        data: CASE_FLAG_REFERENCE_VALUES
      };

      handleGetStub.resolves(mockResponse);

      await getCaseFlagRefData(req, res, next);

      expect(handleGetStub).to.have.been.calledWith(
        sinon.match((url) => url.endsWith(`/refdata/commondata/caseflags/service-id=${serviceId}`)),
        req,
        next
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(CASE_FLAG_REFERENCE_VALUES);
    });

    it('should handle null data in response', async () => {
      const serviceId = 'AAA7';
      req.query = { serviceId };

      const mockResponse = {
        status: 200,
        data: null
      };

      handleGetStub.resolves(mockResponse);

      await getCaseFlagRefData(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(null);
      expect(next).to.not.have.been.called;
    });

    it('should handle undefined data in response', async () => {
      const serviceId = 'AAA7';
      req.query = { serviceId };

      const mockResponse = {
        status: 200,
        data: undefined
      };

      handleGetStub.resolves(mockResponse);

      await getCaseFlagRefData(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(undefined);
      expect(next).to.not.have.been.called;
    });

    it('should handle multiple serviceIds in query parameters', async () => {
      req.query = { serviceId: ['AAA7', 'BBB8'] };

      const mockResponse = {
        status: 200,
        data: CASE_FLAG_REFERENCE_VALUES
      };

      handleGetStub.resolves(mockResponse);

      await getCaseFlagRefData(req, res, next);

      expect(handleGetStub).to.have.been.calledWith(
        sinon.match((url) => url.endsWith('/refdata/commondata/caseflags/service-id=AAA7,BBB8')),
        req,
        next
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(CASE_FLAG_REFERENCE_VALUES);
      expect(next).to.not.have.been.called;
    });

    it('should handle partial response data structure', async () => {
      const serviceId = 'AAA7';
      req.query = { serviceId };

      const partialData = [{
        name: 'Partial Flag',
        flagCode: 'PF001'
      }];

      const mockResponse = {
        status: 200,
        data: partialData
      };

      handleGetStub.resolves(mockResponse);

      await getCaseFlagRefData(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(partialData);
      expect(next).to.not.have.been.called;
    });

    it('should handle timeout errors gracefully', async () => {
      const serviceId = 'AAA7';
      req.query = { serviceId };

      const timeoutError = new Error('Request timeout');
      timeoutError.name = 'TimeoutError';
      handleGetStub.rejects(timeoutError);

      await getCaseFlagRefData(req, res, next);

      expect(next).to.have.been.calledWith(timeoutError);
      expect(res.status).to.not.have.been.called;
      expect(res.send).to.not.have.been.called;
    });
  });
});
