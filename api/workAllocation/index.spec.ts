import * as chai from 'chai';
import {expect} from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import {mockReq, mockRes} from 'sinon-express-mock';

import {baseWorkflowTaskUrl, getTask, postTaskAction, searchTask} from '.';
import {http} from '../lib/http';

chai.use(sinonChai);

describe('workAllocation', () => {

  const SUCCESS_RESPONSE = {status: 200, data: 'ok'};
  let sandbox: sinon.SinonSandbox;
  let next: any;
  let spy: any;
  let res: any;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    next = sandbox.spy();
    res = mockRes(SUCCESS_RESPONSE);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getTask', () => {

    it('should make a get request and respond appropriately', async () => {

      spy = sandbox.stub(http, 'get').resolves(res);
      const req = mockReq({
        params: {
          taskId: '123456',
        },
      });
      const response = mockRes();
      await getTask(req, response, next);

      // Should have the correct URL.
      const args = spy.getCall(0).args;
      expect(args[0]).to.equal(`${baseWorkflowTaskUrl}/task/123456`);

      // Should have received the HTTP response. The get simply returns the data.
      expect(response.send).to.have.been.calledWith(sinon.match(SUCCESS_RESPONSE.data));
    });

    it('should handle an exception being thrown', async () => {
      spy = sandbox.stub(http, 'get').resolves(res);
      const req = mockReq({
        params: {
          taskId: '123456',
        },
      });
      const response = mockRes();

      // Have the response throw an error.
      response.send.throws();

      await getTask(req, response, next);

      expect(next).to.have.been.calledWith();
    });

  });

  describe('searchTask', () => {

    it('should make a post request and respond appropriately', async () => {
      spy = sandbox.stub(http, 'post').resolves(res);
      const req = mockReq({
        body: {
          searchRequest: {search_parameters: []},
          view: 'view',
        },
      });
      const response = mockRes();
      await searchTask(req, response, next);

      // Should have the correct URL and the appropriate payload.
      const args = spy.getCall(0).args;
      expect(args[0]).to.equal(`${baseWorkflowTaskUrl}/task`);
      expect(args[1]).to.deep.equal({search_parameters: []});

      // Should have received the HTTP response. The search simply returns the data.
      expect(response.send).to.have.been.calledWith(sinon.match(SUCCESS_RESPONSE.data));
    });

    it('should handle an exception being thrown', async () => {
      spy = sandbox.stub(http, 'post').resolves(res);
      const req = mockReq({
        body: {
          search: 'criteria',
        },
      });
      const response = mockRes();

      // Have the response throw an error.
      response.send.throws();

      await searchTask(req, response, next);

      expect(next).to.have.been.calledWith();
    });

  });

  describe('postTaskAction', () => {

    it('should make a post request and respond appropriately', async () => {
      spy = sandbox.stub(http, 'post').resolves(res);
      const body = {assignee: {name: 'bob', id: 'bob01'}};
      const req = mockReq({
        body,
        params: {
          action: 'assign',
          taskId: '123456',
        },
      });
      const response = mockRes();
      await postTaskAction(req, response, next);

      // Should have the correct URL and the appropriate payload.
      const args = spy.getCall(0).args;
      expect(args[0]).to.equal(`${baseWorkflowTaskUrl}/task/123456/assign`);
      expect(args[1]).to.deep.equal(body);

      // Should have received the HTTP response. The search simply returns the data.
      expect(response.send).to.have.been.calledWith(sinon.match(SUCCESS_RESPONSE.data));
    });

    it('should handle an exception being thrown', async () => {
      spy = sandbox.stub(http, 'post').resolves(res);
      const body = {assignee: {name: 'bob', id: 'bob01'}};
      const req = mockReq({
        body,
        params: {
          action: 'assign',
          taskId: '123456',
        },
      });
      const response = mockRes();

      // Have the response throw an error.
      response.send.throws();

      await postTaskAction(req, response, next);

      expect(next).to.have.been.calledWith();
    });

  });

});
