
import * as chai from 'chai';
import { expect } from 'chai';
import * as sinonChai from 'sinon-chai';
import { NextFunction } from 'express';
import 'mocha';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { http } from '../lib/http';
import * as log4jui from '../lib/log4jui';
import * as proxyLib from '../lib/proxy';

chai.use(sinonChai);

describe('crudService', () => {
  const dummyData = {
    crudId: 'dummy',
    documentId: 'dummy',
    page: 1,
    rectangles: []
  };

  let sandbox;
  let mockLogger;
  let crudService;
  const req = mockReq();
  const res = mockRes({
    data: 'ok'
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    mockLogger = {
      info: sandbox.stub(),
      error: sandbox.stub(),
      warn: sandbox.stub(),
      debug: sandbox.stub()
    };

    // Stub log4jui.getLogger BEFORE importing the module to ensure our mock is used
    sandbox.stub(log4jui, 'getLogger').returns(mockLogger);

    sandbox.stub(proxyLib, 'setHeaders').returns({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer token'
    });

    // Clear the module cache to ensure fresh import
    delete require.cache[require.resolve('./crudService')];

    // Re-import the module after mocks are set up
    crudService = require('./crudService');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('handleGet', () => {
    it('should make a get request', async () => {
      sandbox.stub(http, 'get').resolves(res);
      const crudPath = '/crud/12345';
      const next = sinon.mock() as NextFunction;
      const response = await crudService.handleGet(crudPath, req, next);
      expect(response.data).to.equal('ok');
    });

    it('should log info message on successful request', async () => {
      sandbox.stub(http, 'get').resolves(res);
      const crudPath = '/crud/12345';
      const next = sinon.stub();

      await crudService.handleGet(crudPath, req, next);

      expect(mockLogger.info).to.have.been.calledOnce;
      expect(mockLogger.info).to.have.been.calledWith('handle get:', crudPath);
    });

    it('should handle error and log error message', async () => {
      const error = {
        status: 404,
        statusText: 'Not Found',
        data: { message: 'Resource not found' }
      };
      sandbox.stub(http, 'get').rejects(error);
      const crudPath = '/crud/12345';
      const next = sinon.stub();

      await crudService.handleGet(crudPath, req, next);

      expect(mockLogger.error).to.have.been.calledOnce;
      expect(mockLogger.error).to.have.been.calledWith(
        'handleGet: 404 /crud/12345',
        'Not Found',
        'Not Found',
        JSON.stringify({ message: 'Resource not found' })
      );
      expect(next).to.have.been.calledWith(error);
    });

    it('should handle error with missing status', async () => {
      const error = {
        statusText: 'Internal Server Error',
        data: {}
      };
      sandbox.stub(http, 'get').rejects(error);
      const crudPath = '/crud/12345';
      const next = sinon.stub();

      await crudService.handleGet(crudPath, req, next);

      expect(mockLogger.error).to.have.been.calledOnce;
      expect(mockLogger.error.args[0][0]).to.include('handleGet: undefined');
      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('handlePost', () => {
    it('should make a post request', async () => {
      sandbox.stub(http, 'post').resolves(res);
      const crudPath = '/crud/12345';
      const response = await crudService.handlePost(crudPath, dummyData, req);
      expect(response.data).to.equal('ok');
    });

    it('should log info message on successful request', async () => {
      sandbox.stub(http, 'post').resolves(res);
      const crudPath = '/crud/12345';

      await crudService.handlePost(crudPath, dummyData, req);

      expect(mockLogger.info).to.have.been.calledOnce;
      expect(mockLogger.info).to.have.been.calledWith('handlePost:', crudPath);
    });

    it('should pass headers from setHeaders', async () => {
      const postStub = sandbox.stub(http, 'post').resolves(res);
      const crudPath = '/crud/12345';

      await crudService.handlePost(crudPath, dummyData, req);

      expect(postStub).to.have.been.calledWith(crudPath, dummyData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer token'
        }
      });
    });
  });

  describe('handlePut', () => {
    it('should make a put request', async () => {
      sandbox.stub(http, 'put').resolves(res);
      const crudPath = '/crud/12345';
      const next = sinon.mock() as NextFunction;
      const response = await crudService.handlePut(crudPath, dummyData, req, next);
      expect(response.data).to.equal('ok');
    });

    it('should log info message on successful request', async () => {
      sandbox.stub(http, 'put').resolves(res);
      const crudPath = '/crud/12345';
      const next = sinon.stub();

      await crudService.handlePut(crudPath, dummyData, req, next);

      expect(mockLogger.info).to.have.been.calledOnce;
      expect(mockLogger.info).to.have.been.calledWith('handle put:', crudPath);
    });

    it('should handle error and call next', async () => {
      const error = new Error('Put failed');
      sandbox.stub(http, 'put').rejects(error);
      const crudPath = '/crud/12345';
      const next = sinon.stub();

      await crudService.handlePut(crudPath, dummyData, req, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('handleDelete', () => {
    it('should make a delete request', async () => {
      sandbox.stub(http, 'delete').resolves(res);
      const crudPath = '/crud/12345';
      const next = sinon.mock() as NextFunction;
      const response = await crudService.handleDelete(crudPath, {}, req, next);
      expect(response.data).to.equal('ok');
    });

    it('should log info message on successful request', async () => {
      sandbox.stub(http, 'delete').resolves(res);
      const crudPath = '/crud/12345';
      const next = sinon.stub();
      const body = { id: '123' };

      await crudService.handleDelete(crudPath, body, req, next);

      expect(mockLogger.info).to.have.been.calledOnce;
      expect(mockLogger.info).to.have.been.calledWith('handle delete:', crudPath);
    });

    it('should handle error and call next', async () => {
      const error = new Error('Delete failed');
      sandbox.stub(http, 'delete').rejects(error);
      const crudPath = '/crud/12345';
      const next = sinon.stub();

      await crudService.handleDelete(crudPath, {}, req, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('sendGet', () => {
    it('should make a get request with custom headers', async () => {
      const getStub = sandbox.stub(http, 'get').resolves(res);
      const crudPath = '/crud/12345';
      const customHeaders = { 'X-Custom': 'header' };

      const response = await crudService.sendGet(crudPath, req, customHeaders);

      expect(response.data).to.equal('ok');
      expect(getStub).to.have.been.calledWith(crudPath, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer token',
          'X-Custom': 'header'
        }
      });
    });

    it('should log info message on successful request', async () => {
      sandbox.stub(http, 'get').resolves(res);
      const crudPath = '/crud/12345';

      await crudService.sendGet(crudPath, req);

      expect(mockLogger.info).to.have.been.calledOnce;
      expect(mockLogger.info).to.have.been.calledWith('sendGet to:', crudPath);
    });

    it('should handle error and log error message', async () => {
      const error = {
        status: 500,
        statusText: 'Internal Server Error',
        data: { error: 'Server error' }
      };
      sandbox.stub(http, 'get').rejects(error);
      const crudPath = '/crud/12345';

      try {
        await crudService.sendGet(crudPath, req);
        expect.fail('Should have thrown error');
      } catch (e) {
        expect(e).to.equal(error);
        expect(mockLogger.error).to.have.been.calledOnce;
        expect(mockLogger.error).to.have.been.calledWith(
          'sendGet: 500 /crud/12345',
          'Internal Server Error',
          JSON.stringify({ error: 'Server error' })
        );
      }
    });
  });

  describe('sendPost', () => {
    it('should make a post request', async () => {
      sandbox.stub(http, 'post').resolves(res);
      const crudPath = '/crud/12345';

      const response = await crudService.sendPost(crudPath, dummyData, req);

      expect(response.data).to.equal('ok');
    });

    it('should log info message on successful request', async () => {
      sandbox.stub(http, 'post').resolves(res);
      const crudPath = '/crud/12345';

      await crudService.sendPost(crudPath, dummyData, req);

      expect(mockLogger.info).to.have.been.calledOnce;
      expect(mockLogger.info).to.have.been.calledWith('sendPost to:', crudPath);
    });

    it('should handle error with next function', async () => {
      const error = {
        status: 400,
        statusText: 'Bad Request',
        data: { validation: 'failed' }
      };
      sandbox.stub(http, 'post').rejects(error);
      const crudPath = '/crud/12345';
      const next = sinon.stub();

      await crudService.sendPost(crudPath, dummyData, req, next);

      expect(mockLogger.error).to.have.been.calledOnce;
      expect(mockLogger.error).to.have.been.calledWith(
        'sendPost: 400 /crud/12345',
        'Bad Request',
        JSON.stringify({ validation: 'failed' })
      );
      expect(next).to.have.been.calledWith(error);
    });

    it('should throw error when next is not provided', async () => {
      const error = {
        status: 403,
        statusText: 'Forbidden',
        data: null
      };
      sandbox.stub(http, 'post').rejects(error);
      const crudPath = '/crud/12345';

      try {
        await crudService.sendPost(crudPath, dummyData, req);
        expect.fail('Should have thrown error');
      } catch (e) {
        expect(e).to.equal(error);
        expect(mockLogger.error).to.have.been.calledOnce;
      }
    });
  });

  describe('handlePostBlob', () => {
    it('should make a post request with arraybuffer response type', async () => {
      const postStub = sandbox.stub(http, 'post').resolves(res);
      const crudPath = '/crud/12345/blob';
      const next = sinon.stub();

      const response = await crudService.handlePostBlob(crudPath, dummyData, req, next);

      expect(response.data).to.equal('ok');
      expect(postStub).to.have.been.calledWith(crudPath, dummyData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer token'
        },
        responseType: 'arraybuffer'
      });
    });

    it('should log info message on successful request', async () => {
      sandbox.stub(http, 'post').resolves(res);
      const crudPath = '/crud/12345/blob';
      const next = sinon.stub();

      await crudService.handlePostBlob(crudPath, dummyData, req, next);

      expect(mockLogger.info).to.have.been.calledOnce;
      expect(mockLogger.info).to.have.been.calledWith('handle post blob:', crudPath);
    });

    it('should handle error and call next', async () => {
      const error = new Error('Blob post failed');
      sandbox.stub(http, 'post').rejects(error);
      const crudPath = '/crud/12345/blob';
      const next = sinon.stub();

      await crudService.handlePostBlob(crudPath, dummyData, req, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('sendPut', () => {
    it('should make a put request', async () => {
      sandbox.stub(http, 'put').resolves(res);
      const crudPath = '/crud/12345';

      const response = await crudService.sendPut(crudPath, dummyData, req);

      expect(response.data).to.equal('ok');
    });

    it('should log info message on successful request', async () => {
      sandbox.stub(http, 'put').resolves(res);
      const crudPath = '/crud/12345';

      await crudService.sendPut(crudPath, dummyData, req);

      expect(mockLogger.info).to.have.been.calledOnce;
      expect(mockLogger.info).to.have.been.calledWith('send put request to:', crudPath);
    });

    it('should handle error and log error message', async () => {
      const error = {
        status: 409,
        statusText: 'Conflict',
        data: { conflict: 'Version mismatch' }
      };
      sandbox.stub(http, 'put').rejects(error);
      const crudPath = '/crud/12345';

      try {
        await crudService.sendPut(crudPath, dummyData, req);
        expect.fail('Should have thrown error');
      } catch (e) {
        expect(e).to.equal(error);
        expect(mockLogger.error).to.have.been.calledOnce;
        expect(mockLogger.error).to.have.been.calledWith(
          409,
          'Conflict',
          JSON.stringify({ conflict: 'Version mismatch' })
        );
      }
    });

    it('should handle error with missing data', async () => {
      const error = {
        status: 422,
        statusText: 'Unprocessable Entity',
        data: undefined
      };
      sandbox.stub(http, 'put').rejects(error);
      const crudPath = '/crud/12345';

      try {
        await crudService.sendPut(crudPath, dummyData, req);
        expect.fail('Should have thrown error');
      } catch (e) {
        expect(e).to.equal(error);
        expect(mockLogger.error).to.have.been.calledOnce;
        expect(mockLogger.error).to.have.been.calledWith(
          422,
          'Unprocessable Entity',
          undefined // JSON.stringify(undefined) returns undefined (not a string)
        );
      }
    });
  });

  describe('sendDelete', () => {
    it('should make a delete request and remove accept header', async () => {
      const deleteStub = sandbox.stub(http, 'delete').resolves(res);
      const crudPath = '/crud/12345';
      const body = { id: '12345' };

      // Mock setHeaders to return headers with accept
      (proxyLib.setHeaders as sinon.SinonStub).returns({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token',
        'accept': 'application/json'
      });

      const response = await crudService.sendDelete(crudPath, body, req);

      expect(response.data).to.equal('ok');
      expect(deleteStub).to.have.been.calledWith(crudPath, {
        data: body,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer token'
        }
      });
    });

    it('should log info message on successful request', async () => {
      sandbox.stub(http, 'delete').resolves(res);
      const crudPath = '/crud/12345';

      await crudService.sendDelete(crudPath, {}, req);

      expect(mockLogger.info).to.have.been.calledOnce;
      expect(mockLogger.info).to.have.been.calledWith('send delete request to:', crudPath);
    });

    it('should handle error and log error message', async () => {
      const error = {
        status: 401,
        statusText: 'Unauthorized',
        data: { message: 'Invalid token' }
      };
      sandbox.stub(http, 'delete').rejects(error);
      const crudPath = '/crud/12345';

      try {
        await crudService.sendDelete(crudPath, {}, req);
        expect.fail('Should have thrown error');
      } catch (e) {
        expect(e).to.equal(error);
        expect(mockLogger.error).to.have.been.calledOnce;
        expect(mockLogger.error).to.have.been.calledWith(
          401,
          'Unauthorized',
          JSON.stringify({ message: 'Invalid token' })
        );
      }
    });

    it('should handle error with null data', async () => {
      const error = {
        status: 500,
        statusText: 'Server Error',
        data: null
      };
      sandbox.stub(http, 'delete').rejects(error);
      const crudPath = '/crud/12345';

      try {
        await crudService.sendDelete(crudPath, {}, req);
        expect.fail('Should have thrown error');
      } catch (e) {
        expect(e).to.equal(error);
        expect(mockLogger.error).to.have.been.calledWith(
          500,
          'Server Error',
          'null'
        );
      }
    });
  });
});
