import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { HttpMock } from '../common/httpMock';
import { http } from '../lib/http';
import * as proxy from '../lib/proxy';
import { handleTaskGet, handleTaskPost, handleTaskSearch, handleTaskRolesGet, handleGetTasksByCaseId } from './taskService';
import * as util from './util';
import { ASSIGNED_TASKS, JUDICIAL_MY_TASKS } from './constants/mock.data';
import { TASK_ROLES as TASK_ROLES_MOCK } from './constants/task-roles.mock.data';

// Import sinon-chai using require to avoid ES module issues
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('workAllocation.taskService', () => {
  let sandbox: sinon.SinonSandbox;
  let spy: any;
  let setHeadersStub: sinon.SinonStub;
  let httpMockGetStub: sinon.SinonStub;
  let httpMockInstanceStub: sinon.SinonStub;
  let handlePostStub: sinon.SinonStub;
  const res = mockRes({ status: 200, data: 'ok' });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    setHeadersStub = sandbox.stub(proxy, 'setHeaders');
    httpMockGetStub = sandbox.stub();
    httpMockInstanceStub = sandbox.stub(HttpMock, 'getInstance');
    httpMockInstanceStub.returns({ get: httpMockGetStub } as any);
    handlePostStub = sandbox.stub(util, 'handlePost');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('handleTaskGet', () => {
    beforeEach(() => {
      setHeadersStub.returns({
        'Accept': 'application/json',
        'Authorization': 'Bearer token',
        'Content-Type': 'application/json'
      });
    });

    it('should make a get request', async () => {
      spy = sandbox.stub(http, 'get').resolves(res);
      const path = '/task/123456';
      const req = mockReq();
      const response = await handleTaskGet(path, req);
      expect(response).to.equal('ok'); // Returns just the data.
      const args = spy.getCall(0).args;
      expect(args[0]).to.equal(path); // Correct url.
    });

    it('should set headers correctly with Content-Type and remove Accept header', async () => {
      spy = sandbox.stub(http, 'get').resolves(res);
      const path = '/task/123456';
      const req = mockReq();
      const mockHeaders = {
        'Accept': 'application/json',
        'Authorization': 'Bearer token',
        'Content-Type': 'text/html'
      };
      setHeadersStub.returns(mockHeaders);

      await handleTaskGet(path, req);

      expect(setHeadersStub).to.have.been.calledWith(req);
      const expectedHeaders = {
        'Authorization': 'Bearer token',
        'Content-Type': 'application/json'
      };
      expect(spy).to.have.been.calledWith(path, { headers: expectedHeaders });
    });

    it('should handle HTTP errors and propagate them', async () => {
      const error = new Error('Network error');
      spy = sandbox.stub(http, 'get').rejects(error);
      const path = '/task/123456';
      const req = mockReq();

      try {
        await handleTaskGet(path, req);
        expect.fail('Should have thrown an error');
      } catch (err) {
        expect(err).to.equal(error);
      }
    });

    it('should handle 404 errors', async () => {
      const error = { response: { status: 404, data: 'Not found' } };
      spy = sandbox.stub(http, 'get').rejects(error);
      const path = '/task/nonexistent';
      const req = mockReq();

      try {
        await handleTaskGet(path, req);
        expect.fail('Should have thrown an error');
      } catch (err) {
        expect(err).to.equal(error);
      }
    });

    it('should handle 500 errors', async () => {
      const error = { response: { status: 500, data: 'Internal server error' } };
      spy = sandbox.stub(http, 'get').rejects(error);
      const path = '/task/123456';
      const req = mockReq();

      try {
        await handleTaskGet(path, req);
        expect.fail('Should have thrown an error');
      } catch (err) {
        expect(err).to.equal(error);
      }
    });

    it('should return task data when response contains tasks', async () => {
      const mockTaskData = JUDICIAL_MY_TASKS;
      spy = sandbox.stub(http, 'get').resolves({ status: 200, data: mockTaskData });
      const path = '/task/search';
      const req = mockReq();

      const response = await handleTaskGet(path, req);

      expect(response).to.deep.equal(mockTaskData);
    });
  });

  describe('handleTaskRolesGet', () => {
    beforeEach(() => {
      setHeadersStub.returns({
        'Accept': 'application/json',
        'Authorization': 'Bearer token123',
        'Content-Type': 'application/json'
      });
    });

    it('should make a get request and return full response', async () => {
      const mockResponse = { status: 200, data: TASK_ROLES_MOCK };
      spy = sandbox.stub(http, 'get').resolves(mockResponse);
      const path = '/task/roles';
      const req = mockReq();

      const response = await handleTaskRolesGet(path, req);

      expect(response).to.equal(mockResponse); // Returns the entire response
      expect(spy).to.have.been.calledWith(path, { headers: sinon.match.object });
    });

    it('should set headers correctly with Content-Type and remove Accept header', async () => {
      spy = sandbox.stub(http, 'get').resolves(res);
      const path = '/task/roles';
      const req = mockReq();
      const mockHeaders = {
        'Accept': 'application/xml',
        'Authorization': 'Bearer token123',
        'User-Agent': 'test-agent'
      };
      setHeadersStub.returns(mockHeaders);

      await handleTaskRolesGet(path, req);

      expect(setHeadersStub).to.have.been.calledWith(req);
      const expectedHeaders = {
        'Authorization': 'Bearer token123',
        'User-Agent': 'test-agent',
        'Content-Type': 'application/json'
      };
      expect(spy).to.have.been.calledWith(path, { headers: expectedHeaders });
    });

    it('should handle authentication errors', async () => {
      const error = { response: { status: 401, data: 'Unauthorized' } };
      spy = sandbox.stub(http, 'get').rejects(error);
      const path = '/task/roles';
      const req = mockReq();

      try {
        await handleTaskRolesGet(path, req);
        expect.fail('Should have thrown an error');
      } catch (err) {
        expect(err).to.equal(error);
      }
    });

    it('should handle forbidden errors', async () => {
      const error = { response: { status: 403, data: 'Forbidden' } };
      spy = sandbox.stub(http, 'get').rejects(error);
      const path = '/task/roles';
      const req = mockReq();

      try {
        await handleTaskRolesGet(path, req);
        expect.fail('Should have thrown an error');
      } catch (err) {
        expect(err).to.equal(error);
      }
    });

    it('should return empty roles when no roles found', async () => {
      const emptyResponse = { status: 200, data: [] };
      spy = sandbox.stub(http, 'get').resolves(emptyResponse);
      const path = '/task/roles';
      const req = mockReq();

      const response = await handleTaskRolesGet(path, req);

      expect(response).to.deep.equal(emptyResponse);
    });
  });

  describe('handleTaskSearch', () => {
    beforeEach(() => {
      setHeadersStub.returns({
        'Authorization': 'Bearer searchtoken',
        'Content-Type': 'application/json'
      });
    });

    it('should make a post request', async () => {
      spy = sandbox.stub(http, 'post').resolves(res);
      const path = '/task';
      const payload = { search: 'criteria' };
      const req = mockReq();
      const response = await handleTaskSearch(path, payload, req);
      expect(response).to.be.an('object'); // Returns the entire response.
      expect(response.data).to.equal('ok');
      const args = spy.getCall(0).args;
      expect(args[0]).to.equal(path); // Correct url.
      expect(args[1]).to.equal(payload); // Correct search criteria posted.
    });

    it('should set headers correctly', async () => {
      spy = sandbox.stub(http, 'post').resolves(res);
      const path = '/task/search';
      const payload = { search: 'criteria' };
      const req = mockReq();
      const mockHeaders = { 'Authorization': 'Bearer token' };
      setHeadersStub.returns(mockHeaders);

      await handleTaskSearch(path, payload, req);

      expect(setHeadersStub).to.have.been.calledWith(req);
      expect(spy).to.have.been.calledWith(path, payload, { headers: mockHeaders });
    });

    it('should handle complex search payloads', async () => {
      const mockSearchResponse = { status: 200, data: ASSIGNED_TASKS };
      spy = sandbox.stub(http, 'post').resolves(mockSearchResponse);
      const path = '/task/search';
      const complexPayload = {
        searchRequest: {
          cftTaskStates: ['assigned', 'unassigned'],
          jurisdiction: ['IA'],
          location: ['231596'],
          user: '38eb0c5e-29c7-453e-b92d-f2029aaed6c3',
          taskTypes: ['reviewAppealSkeletonArgument', 'reviewTheAppeal']
        },
        sortingParameters: [{ sortBy: 'dueDate', sortOrder: 'asc' }],
        paginationParameters: { pageNumber: 0, pageSize: 25 }
      };
      const req = mockReq();

      const response = await handleTaskSearch(path, complexPayload, req);

      expect(response).to.deep.equal(mockSearchResponse);
      expect(spy).to.have.been.calledWith(path, complexPayload, sinon.match.object);
    });

    it('should handle empty search results', async () => {
      const emptyResponse = { status: 200, data: { tasks: [] } };
      spy = sandbox.stub(http, 'post').resolves(emptyResponse);
      const path = '/task/search';
      const payload = { search: 'nonexistent' };
      const req = mockReq();

      const response = await handleTaskSearch(path, payload, req);

      expect(response).to.deep.equal(emptyResponse);
    });

    it('should handle search errors', async () => {
      const error = { response: { status: 400, data: 'Bad search request' } };
      spy = sandbox.stub(http, 'post').rejects(error);
      const path = '/task/search';
      const payload = { invalidField: 'value' };
      const req = mockReq();

      try {
        await handleTaskSearch(path, payload, req);
        expect.fail('Should have thrown an error');
      } catch (err) {
        expect(err).to.equal(error);
      }
    });

    it('should handle null or undefined payload', async () => {
      spy = sandbox.stub(http, 'post').resolves(res);
      const path = '/task/search';
      const req = mockReq();

      await handleTaskSearch(path, null, req);

      expect(spy).to.have.been.calledWith(path, null, sinon.match.object);
    });
  });

  describe('handleTaskPost', () => {
    beforeEach(() => {
      setHeadersStub.returns({
        'Authorization': 'Bearer posttoken',
        'Content-Type': 'application/json'
      });
    });

    it('should make a post request', async () => {
      handlePostStub.resolves(res);
      const path = '/task/123456/assign';
      const payload = { assignee: { name: 'bob', id: 2 } };
      const req = mockReq();
      const response = await handleTaskPost(path, payload, req);
      expect(response).to.be.an('object'); // Returns the entire response.
      expect(response.data).to.equal('ok');
      expect(handlePostStub).to.have.been.calledWith(path, payload, req);
    });

    it('should call handlePost utility function', async () => {
      handlePostStub.resolves(res);
      const path = '/task/123456/complete';
      const payload = { completion: { completionOptions: { result: 'completed' } } };
      const req = mockReq();

      const response = await handleTaskPost(path, payload, req);

      expect(handlePostStub).to.have.been.calledWith(path, payload, req);
      expect(response).to.equal(res);
    });

    it('should handle task assignment operations', async () => {
      const assignResponse = { status: 200, data: { message: 'Task assigned successfully' } };
      handlePostStub.resolves(assignResponse);
      const path = '/task/0d22d836-b25a-11eb-a18c-f2d58a9b7ba1/assign';
      const assignPayload = {
        userId: '38eb0c5e-29c7-453e-b92d-f2029aaed6c3'
      };
      const req = mockReq();

      const response = await handleTaskPost(path, assignPayload, req);

      expect(response).to.deep.equal(assignResponse);
      expect(handlePostStub).to.have.been.calledWith(path, assignPayload, req);
    });

    it('should handle task unassignment operations', async () => {
      const unassignResponse = { status: 200, data: { message: 'Task unassigned successfully' } };
      handlePostStub.resolves(unassignResponse);
      const path = '/task/0d22d836-b25a-11eb-a18c-f2d58a9b7ba1/unassign';
      const req = mockReq();

      const response = await handleTaskPost(path, {}, req);

      expect(response).to.deep.equal(unassignResponse);
    });

    it('should handle task completion operations', async () => {
      const completeResponse = { status: 200, data: { message: 'Task completed successfully' } };
      handlePostStub.resolves(completeResponse);
      const path = '/task/0d22d836-b25a-11eb-a18c-f2d58a9b7ba1/complete';
      const completePayload = {
        completionOptions: {
          assignee: '38eb0c5e-29c7-453e-b92d-f2029aaed6c3',
          completionMode: 'Auto'
        }
      };
      const req = mockReq();

      const response = await handleTaskPost(path, completePayload, req);

      expect(response).to.deep.equal(completeResponse);
    });

    it('should handle task claim operations', async () => {
      const claimResponse = { status: 200, data: { message: 'Task claimed successfully' } };
      handlePostStub.resolves(claimResponse);
      const path = '/task/0d22d836-b25a-11eb-a18c-f2d58a9b7ba1/claim';
      const req = mockReq();

      const response = await handleTaskPost(path, {}, req);

      expect(response).to.deep.equal(claimResponse);
    });

    it('should handle task cancellation operations', async () => {
      const cancelResponse = { status: 200, data: { message: 'Task cancelled successfully' } };
      handlePostStub.resolves(cancelResponse);
      const path = '/task/0d22d836-b25a-11eb-a18c-f2d58a9b7ba1/cancel';
      const cancelPayload = {
        cancelRequest: {
          reason: 'No longer needed'
        }
      };
      const req = mockReq();

      const response = await handleTaskPost(path, cancelPayload, req);

      expect(response).to.deep.equal(cancelResponse);
    });

    it('should handle errors from handlePost', async () => {
      const error = { response: { status: 422, data: 'Unprocessable entity' } };
      handlePostStub.rejects(error);
      const path = '/task/123456/assign';
      const payload = { assignee: { invalid: 'data' } };
      const req = mockReq();

      try {
        await handleTaskPost(path, payload, req);
        expect.fail('Should have thrown an error');
      } catch (err) {
        expect(err).to.equal(error);
      }
    });

    it('should handle conflict errors for task assignment', async () => {
      const error = { response: { status: 409, data: 'Task already assigned' } };
      handlePostStub.rejects(error);
      const path = '/task/123456/assign';
      const payload = { assignee: { name: 'john', id: 4 } };
      const req = mockReq();

      try {
        await handleTaskPost(path, payload, req);
        expect.fail('Should have thrown an error');
      } catch (err) {
        expect(err).to.equal(error);
      }
    });
  });
});
