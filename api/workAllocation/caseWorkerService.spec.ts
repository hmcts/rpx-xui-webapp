import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import { http } from '../lib/http';
import * as proxy from '../lib/proxy';
import {
  handleCaseWorkerDetails,
  handleCaseWorkerForLocation,
  handleCaseWorkerForLocationAndService,
  handleCaseWorkerForService,
  handleCaseWorkerGetAll,
  handleUsersGet,
  handleNewUsersGet,
  handlePostSearch,
  handlePostRoleAssignments,
  handlePostRoleAssignmentsWithNewUsers,
  handleCaseWorkersForServicesPost,
  handlePostCaseWorkersRefData,
  handlePostJudicialWorkersRefData,
  getUserIdsFromRoleApiResponse,
  getUserIdsFromJurisdictionRoleResponse
} from './caseWorkerService';

chai.use(sinonChai);

describe('CaseWorker Service', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(console, 'warn');
    sandbox.stub(proxy, 'setHeaders').returns({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer token'
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('handleUsersGet', () => {
    it('should make a get request and return users data', async () => {
      const mockUsers = [{ id: '1', name: 'User 1' }, { id: '2', name: 'User 2' }];
      const mockResponse = { status: 200, data: mockUsers };
      sandbox.stub(http, 'get').resolves(mockResponse);
      const path = '/users';
      const req = mockReq();
      
      const data = await handleUsersGet(path, req);
      
      expect(data).to.deep.equal(mockUsers);
      expect(http.get).to.have.been.calledOnce;
      expect(http.get).to.have.been.calledWith(path, { headers: sinon.match.object });
    });

    it('should handle errors when getting users', async () => {
      const error = new Error('Network error');
      sandbox.stub(http, 'get').rejects(error);
      const path = '/users';
      const req = mockReq();
      
      await expect(handleUsersGet(path, req)).to.be.rejectedWith(error);
    });
  });

  describe('handleNewUsersGet', () => {
    it('should make a get request with provided headers and return users data', async () => {
      const mockUsers = [{ id: '1', name: 'User 1' }];
      const mockResponse = { status: 200, data: mockUsers };
      sandbox.stub(http, 'get').resolves(mockResponse);
      const path = '/new-users';
      const headers = { 'Authorization': 'Bearer custom-token' };
      
      const data = await handleNewUsersGet(path, headers);
      
      expect(data).to.deep.equal(mockUsers);
      expect(http.get).to.have.been.calledOnce;
      expect(http.get).to.have.been.calledWith(path, { headers });
    });

    it('should handle null headers', async () => {
      const mockUsers = [];
      const mockResponse = { status: 200, data: mockUsers };
      sandbox.stub(http, 'get').resolves(mockResponse);
      const path = '/new-users';
      
      const data = await handleNewUsersGet(path, null);
      
      expect(data).to.deep.equal(mockUsers);
      expect(http.get).to.have.been.calledWith(path, { headers: null });
    });
  });

  describe('existing tests', () => {
    it('should make a get request', async () => {
      const mockCaseworkers = [{}, {}, {}];
      const res = mockRes({ status: 200, data: mockCaseworkers });
      sandbox.stub(http, 'get').resolves(res);
      const path = '/getCaseWorkers';
      const req = mockReq();
      const data = await handleCaseWorkerGetAll(path, req);
      expect(data).to.equal(mockCaseworkers);
    });

    it('get caseworkers for Location', async () => {
      const mockCaseworkers = [{}, {}];
      const res = mockRes({ status: 200, data: mockCaseworkers });
      sandbox.stub(http, 'get').resolves(res);
      const path = '/getCaseWorkersForLocation';
      const req = mockReq();
      const data = await handleCaseWorkerForLocation(path, req);
      expect(data).to.equal(mockCaseworkers);
    });

    it('get caseworkers for Service', async () => {
      const mockCaseworkers = [{}];
      const res = mockRes({ status: 200, data: mockCaseworkers });
      sandbox.stub(http, 'get').resolves(res);
      const path = '/getCaseWorkersForService';
      const req = mockReq();
      const data = await handleCaseWorkerForService(path, req);
      expect(data).to.equal(mockCaseworkers);
    });

    it('handle CaseWorker For Location And Service', async () => {
      const mockCaseworkers = [{}];
      const res = mockRes({ status: 200, data: mockCaseworkers });
      sandbox.stub(http, 'get').resolves(res);
      const path = '/handleCaseWorkerForLocationAndService';
      const req = mockReq();
      const data = await handleCaseWorkerForLocationAndService(path, req);
      expect(data).to.equal(mockCaseworkers);
    });

    it('handle Case Worker Details', async () => {
      const mockCaseworkers = [{}];
      const res = mockRes({ status: 200, data: mockCaseworkers });
      sandbox.stub(http, 'get').resolves(res);
      const path = '/handleCaseWorkerDetails';
      const req = mockReq();
      const data = await handleCaseWorkerDetails(path, req);
      expect(data).to.equal(mockCaseworkers);
    });

    it('should handle error when getting all caseworkers', async () => {
      const error = new Error('Network error');
      sandbox.stub(http, 'get').rejects(error);
      const path = '/getCaseWorkers';
      const req = mockReq();
      
      await expect(handleCaseWorkerGetAll(path, req)).to.be.rejectedWith(error);
    });

    it('should handle error when getting caseworkers for location', async () => {
      const error = new Error('Service unavailable');
      sandbox.stub(http, 'get').rejects(error);
      const path = '/getCaseWorkersForLocation';
      const req = mockReq();
      
      await expect(handleCaseWorkerForLocation(path, req)).to.be.rejectedWith(error);
    });

    it('should handle error when getting caseworkers for service', async () => {
      const error = new Error('Authorization failed');
      sandbox.stub(http, 'get').rejects(error);
      const path = '/getCaseWorkersForService';
      const req = mockReq();
      
      await expect(handleCaseWorkerForService(path, req)).to.be.rejectedWith(error);
    });

    it('should handle error when getting caseworkers for location and service', async () => {
      const error = new Error('Bad request');
      sandbox.stub(http, 'get').rejects(error);
      const path = '/handleCaseWorkerForLocationAndService';
      const req = mockReq();
      
      await expect(handleCaseWorkerForLocationAndService(path, req)).to.be.rejectedWith(error);
    });

    it('should handle error when getting case worker details', async () => {
      const error = new Error('Not found');
      sandbox.stub(http, 'get').rejects(error);
      const path = '/handleCaseWorkerDetails';
      const req = mockReq();
      
      await expect(handleCaseWorkerDetails(path, req)).to.be.rejectedWith(error);
    });
  });

  describe('handlePostSearch', () => {
    it('should make a post request with payload', async () => {
      const mockResponse = { status: 200, data: { results: [] } };
      sandbox.stub(http, 'post').resolves(mockResponse);
      const path = '/search';
      const payload = { query: 'test' };
      const req = mockReq();
      
      const response = await handlePostSearch(path, payload, req);
      
      expect(response).to.deep.equal(mockResponse);
      expect(http.post).to.have.been.calledOnce;
      expect(http.post).to.have.been.calledWith(path, payload, { headers: sinon.match.object });
    });

    it('should handle string payload', async () => {
      const mockResponse = { status: 200, data: { results: [] } };
      sandbox.stub(http, 'post').resolves(mockResponse);
      const path = '/search';
      const payload = 'string payload';
      const req = mockReq();
      
      const response = await handlePostSearch(path, payload, req);
      
      expect(response).to.deep.equal(mockResponse);
      expect(http.post).to.have.been.calledWith(path, payload, { headers: sinon.match.object });
    });

    it('should handle post request errors', async () => {
      const error = new Error('Post failed');
      sandbox.stub(http, 'post').rejects(error);
      const path = '/search';
      const payload = { query: 'test' };
      const req = mockReq();
      
      await expect(handlePostSearch(path, payload, req)).to.be.rejectedWith(error);
    });
  });

  describe('handlePostRoleAssignments', () => {
    it('should make a post request with MAX_RECORDS size', async () => {
      const mockResponse = {
        status: 200,
        data: {
          roleAssignmentResponse: [{ id: '1' }, { id: '2' }]
        }
      };
      sandbox.stub(http, 'post').resolves(mockResponse);
      const path = '/role-assignments';
      const payload = { jurisdiction: 'SSCS' };
      const req = mockReq();
      
      const response = await handlePostRoleAssignments(path, payload, req);
      
      expect(response).to.deep.equal(mockResponse);
      expect(http.post).to.have.been.calledOnce;
      const callArgs = (http.post as sinon.SinonStub).getCall(0).args;
      expect(callArgs[0]).to.equal(path);
      expect(callArgs[1]).to.deep.equal(payload);
      expect(callArgs[2].headers.pageNumber).to.equal(0);
      expect(callArgs[2].headers.size).to.equal(100000);
    });

    it('should handle response with MAX_RECORDS (100000 items)', async () => {
      const roleAssignments = Array(100000).fill({ id: 'test' });
      const mockResponse = {
        status: 200,
        data: {
          roleAssignmentResponse: roleAssignments
        }
      };
      sandbox.stub(http, 'post').resolves(mockResponse);
      const path = '/role-assignments';
      const payload = { jurisdiction: 'SSCS' };
      const req = mockReq();
      
      const response = await handlePostRoleAssignments(path, payload, req);
      
      // Verify the function completes successfully even with MAX_RECORDS
      expect(response).to.deep.equal(mockResponse);
      expect(response.data.roleAssignmentResponse).to.have.length(100000);
    });

    it('should handle empty response', async () => {
      const mockResponse = {
        status: 200,
        data: {
          roleAssignmentResponse: []
        }
      };
      sandbox.stub(http, 'post').resolves(mockResponse);
      const path = '/role-assignments';
      const payload = {};
      const req = mockReq();
      
      const response = await handlePostRoleAssignments(path, payload, req);
      
      expect(response.data.roleAssignmentResponse).to.be.empty;
    });
  });

  describe('handlePostRoleAssignmentsWithNewUsers', () => {
    it('should make a post request with provided headers', async () => {
      const mockResponse = {
        status: 200,
        data: {
          roleAssignmentResponse: [{ id: '1' }]
        }
      };
      sandbox.stub(http, 'post').resolves(mockResponse);
      const path = '/role-assignments';
      const payload = { jurisdiction: 'SSCS' };
      const headers = { 'Authorization': 'Bearer token' };
      
      const response = await handlePostRoleAssignmentsWithNewUsers(path, payload, headers);
      
      expect(response).to.deep.equal(mockResponse);
      expect(http.post).to.have.been.calledWith(path, payload, { headers });
    });

    it('should handle response with MAX_RECORDS (100000 items) for new users', async () => {
      const roleAssignments = Array(100000).fill({ id: 'test' });
      const mockResponse = {
        status: 200,
        data: {
          roleAssignmentResponse: roleAssignments
        }
      };
      sandbox.stub(http, 'post').resolves(mockResponse);
      const path = '/role-assignments';
      const payload = { jurisdiction: 'SSCS' };
      const headers = {};
      
      const response = await handlePostRoleAssignmentsWithNewUsers(path, payload, headers);
      
      // Verify the function completes successfully even with MAX_RECORDS
      expect(response).to.deep.equal(mockResponse);
      expect(response.data.roleAssignmentResponse).to.have.length(100000);
    });
  });

  describe('handleCaseWorkersForServicesPost', () => {
    it('should make multiple post requests for each payload', async () => {
      const payloads = [
        { 
          attributes: { jurisdiction: ['SSCS'] },
          roleName: ['caseworker'],
          roleType: ['ctsc'],
          validAt: new Date().toISOString()
        },
        { 
          attributes: { jurisdiction: ['IA'] },
          roleName: ['caseworker'],
          roleType: ['ctsc'],
          validAt: new Date().toISOString()
        }
      ];
      const mockResponses = [
        { status: 200, data: { roleAssignmentResponse: [{ id: '1' }] } },
        { status: 200, data: { roleAssignmentResponse: [{ id: '2' }] } }
      ];
      const httpStub = sandbox.stub(http, 'post');
      httpStub.onCall(0).resolves(mockResponses[0]);
      httpStub.onCall(1).resolves(mockResponses[1]);
      const path = '/caseworkers';
      const req = mockReq();
      
      const result = await handleCaseWorkersForServicesPost(path, payloads, req);
      
      expect(result).to.have.length(2);
      expect(result[0]).to.deep.equal({ jurisdiction: 'SSCS', data: mockResponses[0].data });
      expect(result[1]).to.deep.equal({ jurisdiction: 'IA', data: mockResponses[1].data });
      expect(httpStub).to.have.been.calledTwice;
    });

    it('should handle empty payloads array', async () => {
      const payloads: any[] = [];
      const path = '/caseworkers';
      const req = mockReq();
      
      const result = await handleCaseWorkersForServicesPost(path, payloads, req);
      
      expect(result).to.be.empty;
    });

    it('should handle response with MAX_RECORDS (100000 items) for any service', async () => {
      const payloads = [
        { 
          attributes: { jurisdiction: ['SSCS'] },
          roleName: ['caseworker'],
          roleType: ['ctsc'],
          validAt: new Date().toISOString()
        }
      ];
      const roleAssignments = Array(100000).fill({ id: 'test' });
      const mockResponse = {
        status: 200,
        data: { roleAssignmentResponse: roleAssignments }
      };
      sandbox.stub(http, 'post').resolves(mockResponse);
      const path = '/caseworkers';
      const req = mockReq();
      
      const result = await handleCaseWorkersForServicesPost(path, payloads, req);
      
      // Verify the function completes successfully even with MAX_RECORDS
      expect(result).to.have.length(1);
      expect(result[0].jurisdiction).to.equal('SSCS');
      expect(result[0].data.roleAssignmentResponse).to.have.length(100000);
    });

    it('should handle post request error in loop', async () => {
      const payloads = [
        { 
          attributes: { jurisdiction: ['SSCS'] },
          roleName: ['caseworker'],
          roleType: ['ctsc'],
          validAt: new Date().toISOString()
        },
        { 
          attributes: { jurisdiction: ['IA'] },
          roleName: ['caseworker'],
          roleType: ['ctsc'],
          validAt: new Date().toISOString()
        }
      ];
      const httpStub = sandbox.stub(http, 'post');
      httpStub.onCall(0).resolves({ status: 200, data: { roleAssignmentResponse: [] } });
      httpStub.onCall(1).rejects(new Error('Service error'));
      const path = '/caseworkers';
      const req = mockReq();
      
      await expect(handleCaseWorkersForServicesPost(path, payloads, req)).to.be.rejectedWith('Service error');
    });
  });

  describe('handlePostCaseWorkersRefData', () => {
    it('should make post requests for each jurisdiction with userIds', async () => {
      const userIdsByJurisdiction = [
        { jurisdiction: 'SSCS', userIds: ['user1', 'user2'] },
        { jurisdiction: 'IA', userIds: ['user3'] }
      ];
      const mockResponses = [
        { status: 200, data: [{ id: 'user1', name: 'User 1' }] },
        { status: 200, data: [{ id: 'user3', name: 'User 3' }] }
      ];
      const httpStub = sandbox.stub(http, 'post');
      httpStub.onCall(0).resolves(mockResponses[0]);
      httpStub.onCall(1).resolves(mockResponses[1]);
      const path = '/caseworkers/ref-data';
      const req = mockReq();
      
      const result = await handlePostCaseWorkersRefData(path, userIdsByJurisdiction, req);
      
      expect(result).to.have.length(2);
      expect(result[0]).to.deep.equal({ jurisdiction: 'SSCS', data: mockResponses[0].data });
      expect(result[1]).to.deep.equal({ jurisdiction: 'IA', data: mockResponses[1].data });
      expect(httpStub).to.have.been.calledTwice;
      expect(httpStub.firstCall.args[1]).to.deep.equal({ userIds: ['user1', 'user2'] });
      expect(httpStub.secondCall.args[1]).to.deep.equal({ userIds: ['user3'] });
    });

    it('should skip jurisdictions with empty userIds', async () => {
      const userIdsByJurisdiction = [
        { jurisdiction: 'SSCS', userIds: ['user1'] },
        { jurisdiction: 'IA', userIds: [] },
        { jurisdiction: 'CIVIL', userIds: null }
      ];
      const mockResponse = { status: 200, data: [{ id: 'user1' }] };
      sandbox.stub(http, 'post').resolves(mockResponse);
      const path = '/caseworkers/ref-data';
      const req = mockReq();
      
      const result = await handlePostCaseWorkersRefData(path, userIdsByJurisdiction, req);
      
      expect(result).to.have.length(1);
      expect(result[0].jurisdiction).to.equal('SSCS');
      expect(http.post).to.have.been.calledOnce;
      expect(console.warn).to.have.been.calledTwice;
      expect(console.warn).to.have.been.calledWith('Jurisdiction IA user list is empty');
      expect(console.warn).to.have.been.calledWith('Jurisdiction CIVIL user list is empty');
    });

    it('should handle empty userIdsByJurisdiction array', async () => {
      const userIdsByJurisdiction = [];
      const path = '/caseworkers/ref-data';
      const req = mockReq();
      sandbox.stub(http, 'post');
      
      const result = await handlePostCaseWorkersRefData(path, userIdsByJurisdiction, req);
      
      expect(result).to.be.empty;
      expect(http.post).to.not.have.been.called;
    });
  });

  describe('handlePostJudicialWorkersRefData', () => {
    it('should make a post request with userIds payload', async () => {
      const mockResponse = { status: 200, data: [{ id: 'user1', name: 'Judge 1' }] };
      sandbox.stub(http, 'post').resolves(mockResponse);
      const path = '/judicial-workers/ref-data';
      const userIds = ['user1', 'user2'];
      const req = mockReq();
      
      const response = await handlePostJudicialWorkersRefData(path, userIds, req);
      
      expect(response).to.deep.equal(mockResponse);
      expect(http.post).to.have.been.calledOnce;
      expect(http.post).to.have.been.calledWith(path, { userIds }, { headers: sinon.match.object });
    });

    it('should handle empty userIds array', async () => {
      const mockResponse = { status: 200, data: [] };
      sandbox.stub(http, 'post').resolves(mockResponse);
      const path = '/judicial-workers/ref-data';
      const userIds = [];
      const req = mockReq();
      
      const response = await handlePostJudicialWorkersRefData(path, userIds, req);
      
      expect(response.data).to.be.empty;
      expect(http.post).to.have.been.calledWith(path, { userIds: [] }, { headers: sinon.match.object });
    });

    it('should handle null userIds', async () => {
      const mockResponse = { status: 200, data: [] };
      sandbox.stub(http, 'post').resolves(mockResponse);
      const path = '/judicial-workers/ref-data';
      const userIds = null;
      const req = mockReq();
      
      await handlePostJudicialWorkersRefData(path, userIds, req);
      
      expect(http.post).to.have.been.calledWith(path, { userIds: null }, { headers: sinon.match.object });
    });
  });

  describe('getUserIdsFromRoleApiResponse', () => {
    it('should extract userIds from roleAssignmentResponse', () => {
      const response = {
        roleAssignmentResponse: [
          { actorId: 'user1', roleId: 'role1' },
          { actorId: 'user2', roleId: 'role2' },
          { actorId: 'user3', roleId: 'role3' }
        ]
      };
      
      const userIds = getUserIdsFromRoleApiResponse(response);
      
      expect(userIds).to.deep.equal(['user1', 'user2', 'user3']);
    });

    it('should handle duplicate actorIds', () => {
      const response = {
        roleAssignmentResponse: [
          { actorId: 'user1', roleId: 'role1' },
          { actorId: 'user1', roleId: 'role2' },
          { actorId: 'user2', roleId: 'role3' }
        ]
      };
      
      const userIds = getUserIdsFromRoleApiResponse(response);
      
      expect(userIds).to.deep.equal(['user1', 'user1', 'user2']);
    });

    it('should return empty array for null response', () => {
      const userIds = getUserIdsFromRoleApiResponse(null);
      
      expect(userIds).to.be.empty;
    });

    it('should return empty array for undefined response', () => {
      const userIds = getUserIdsFromRoleApiResponse(undefined);
      
      expect(userIds).to.be.empty;
    });

    it('should return empty array when roleAssignmentResponse is missing', () => {
      const response = { someOtherField: 'value' };
      
      const userIds = getUserIdsFromRoleApiResponse(response);
      
      expect(userIds).to.be.empty;
    });

    it('should return empty array when roleAssignmentResponse is null', () => {
      const response = { roleAssignmentResponse: null };
      
      const userIds = getUserIdsFromRoleApiResponse(response);
      
      expect(userIds).to.be.empty;
    });

    it('should handle empty roleAssignmentResponse', () => {
      const response = { roleAssignmentResponse: [] };
      
      const userIds = getUserIdsFromRoleApiResponse(response);
      
      expect(userIds).to.be.empty;
    });
  });

  describe('getUserIdsFromJurisdictionRoleResponse', () => {
    it('should extract userIds grouped by jurisdiction', () => {
      const response = [
        {
          jurisdiction: 'SSCS',
          data: {
            roleAssignmentResponse: [
              { actorId: 'user1', roleId: 'role1' },
              { actorId: 'user2', roleId: 'role2' }
            ]
          }
        },
        {
          jurisdiction: 'IA',
          data: {
            roleAssignmentResponse: [
              { actorId: 'user3', roleId: 'role3' }
            ]
          }
        }
      ];
      
      const result = getUserIdsFromJurisdictionRoleResponse(response);
      
      expect(result).to.have.length(2);
      expect(result[0]).to.deep.equal({ jurisdiction: 'SSCS', userIds: ['user1', 'user2'] });
      expect(result[1]).to.deep.equal({ jurisdiction: 'IA', userIds: ['user3'] });
    });

    it('should handle empty response array', () => {
      const response = [];
      
      const result = getUserIdsFromJurisdictionRoleResponse(response);
      
      expect(result).to.be.empty;
    });

    it('should handle jurisdictions with empty roleAssignmentResponse', () => {
      const response = [
        {
          jurisdiction: 'SSCS',
          data: {
            roleAssignmentResponse: []
          }
        }
      ];
      
      const result = getUserIdsFromJurisdictionRoleResponse(response);
      
      expect(result).to.have.length(1);
      expect(result[0]).to.deep.equal({ jurisdiction: 'SSCS', userIds: [] });
    });

    it('should handle null or undefined data fields', () => {

      const response = [
        {
          jurisdiction: 'SSCS',
          data: null
        }
      ];
      
      expect(() => getUserIdsFromJurisdictionRoleResponse(response)).to.throw();
    });
  });
});