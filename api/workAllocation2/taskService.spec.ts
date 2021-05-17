import 'mocha';

import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';

import { http } from '../lib/http';
import { handleTaskGet, handleTaskPost, handleTaskSearch } from './taskService';

chai.use(sinonChai);
describe('workAllocation.taskService', () => {

  let sandbox: sinon.SinonSandbox;
  let spy: any;
  const res = mockRes({ status: 200, data: 'ok' });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('handleTaskGet', () => {

    it('should make a get request', async () => {
      spy = sandbox.stub(http, 'get').resolves(res);
      const path = 'work-allocation/task/73335149-acd0-11eb-9261-be82ff3638a7';
      const req = mockReq();
      const response = await handleTaskGet(path, req);
      console.log(response);
      expect(response.id).to.equal('73335149-acd0-11eb-9261-be82ff3638a7'); // Returns just the data.
      // const args = spy.getCall(0).args;
      // expect(args[0]).to.equal(path);    // Correct url.
    });

  });

  describe('handleTaskSearch', () => {

    it('should make a post request', async () => {
      spy = sandbox.stub(http, 'post').resolves(res);
      const path = '/task';
      const payload = { search: 'criteria' };
      const req = mockReq();
      const response = await handleTaskSearch(path, payload, req);
      expect(response).to.be.an('object'); // Returns the entire response.
      // expect(response.data).to.equal('ok');
      // const args = spy.getCall(0).args;
      // expect(args[0]).to.equal(path);    // Correct url.
      // expect(args[1]).to.equal(payload); // Correct search criteria posted.
    });

  });

  describe('handleTaskPost', () => {

    it('should make a post request', async () => {
      spy = sandbox.stub(http, 'post').resolves(res);
      const path = '/task/123456/assign';
      const payload = { assignee: { name: 'bob', id: 2 } };
      const req = mockReq();
      const response = await handleTaskPost(path, payload, req);
      expect(response).to.be.an('object'); // Returns the entire response.
      // expect(response.data).to.equal('ok');
      // const args = spy.getCall(0).args;
      // expect(args[0]).to.equal(path);    // Correct url.
      // expect(args[1]).to.equal(payload); // Correct search criteria posted.
    });

  });

});
