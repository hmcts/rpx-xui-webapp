import 'mocha';

import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';

import { http } from '../lib/http';
import { handleCaseGet, handleCasePost, handleCaseSearch } from './caseService';

chai.use(sinonChai);
describe('workAllocation.caseService', () => {

  let sandbox: sinon.SinonSandbox;
  let spy: any;
  const res = mockRes({ status: 200, data: 'ok' });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('handleCaseGet', () => {

    it('should make a get request', async () => {
      spy = sandbox.stub(http, 'get').resolves(res);
      const path = '/case/123456';
      const req = mockReq();
      const response = await handleCaseGet(path, req);
      expect(response).to.equal('ok'); // Returns just the data.
      const args = spy.getCall(0).args;
      expect(args[0]).to.equal(path);    // Correct url.
    });

  });

  describe('handleCaseSearch', () => {

    it('should make a post request', async () => {
      spy = sandbox.stub(http, 'post').resolves(res);
      const path = '/case';
      const payload = { search: 'criteria' };
      const req = mockReq();
      const response = await handleCaseSearch(path, payload, req);
      expect(response).to.be.an('object'); // Returns the entire response.
      expect(response.data).to.equal('ok');
      const args = spy.getCall(0).args;
      expect(args[0]).to.equal(path);    // Correct url.
      expect(args[1]).to.equal(payload); // Correct search criteria posted.
    });

  });

  describe('handleCasePost', () => {

    it('should make a post request', async () => {
      spy = sandbox.stub(http, 'post').resolves(res);
      const path = '/case/123456/assign';
      const payload = { assignee: { name: 'bob', id: 2 } };
      const req = mockReq();
      const response = await handleCasePost(path, payload, req);
      expect(response).to.be.an('object'); // Returns the entire response.
      expect(response.data).to.equal('ok');
      const args = spy.getCall(0).args;
      expect(args[0]).to.equal(path);    // Correct url.
      expect(args[1]).to.equal(payload); // Correct search criteria posted.
    });

  });

});
