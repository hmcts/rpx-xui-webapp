import * as chai from 'chai';
import { expect } from 'chai';
import { NextFunction } from 'express';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import { http } from '../lib/http';
import { handleDelete, handleGet, handlePost, handlePut } from './crudService';

chai.use(sinonChai);

describe('crudService', () => {
  const dummyData = {
    crudId: 'dummy',
    documentId: 'dummy',
    page: 1,
    rectangles: []
  };

  let sandbox;
  const req = mockReq();
  const res = mockRes({
    data: 'ok'
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('handleGet', () => {
    it('should make a get request', async () => {
      sandbox.stub(http, 'get').resolves(res);
      const crudPath = '/crud/12345';
      const next = sinon.mock() as NextFunction;
      const response = await handleGet(crudPath, req, next);
      expect(response.data).to.equal('ok');
    });
  });

  describe('handlePost', () => {
    it('should make a post request', async () => {
      sandbox.stub(http, 'post').resolves(res);
      const crudPath = '/crud/12345';
      const response = await handlePost(crudPath, dummyData, req);
      expect(response.data).to.equal('ok');
    });
  });

  describe('handlePut', () => {
    it('should make a put request', async () => {
      sandbox.stub(http, 'put').resolves(res);
      const crudPath = '/crud/12345';
      const next = sinon.mock() as NextFunction;
      const response = await handlePut(crudPath, dummyData, req, next);
      expect(response.data).to.equal('ok');
    });
  });

  describe('handleDelete', () => {
    it('should make a delete request', async () => {
      sandbox.stub(http, 'delete').resolves(res);
      const crudPath = '/crud/12345';
      const next = sinon.mock() as NextFunction;
      const response = await handleDelete(crudPath, {}, req, next);
      expect(response.data).to.equal('ok');
    });
  });
});
