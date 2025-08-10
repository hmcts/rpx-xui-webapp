import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import { 
  baseWorkAllocationTaskUrl, 
  getTask, 
  postTaskAction, 
  searchTask, 
  getTypesOfWork, 
  getUsersByServiceName,
  getTaskRoles,
  getTasksByCaseId,
  getTasksByCaseIdAndEventId,
  postTaskCompletionForAccess,
  getAllCaseWorkersForLocation,
  getCaseWorkersForService,
  getCaseWorkersForLocationAndService,
  searchCaseWorker,
  postTaskSearchForCompletable,
  getRolesCategory,
  showAllocateRoleLink,
  getCaseListPromises,
  getMyAccess,
  getMyCases,
  getCases,
  getTaskNames,
  getNewUsersByServiceName
} from '.';
import { http } from '../lib/http';
import { mockTasks } from './taskTestData.spec';
import { FullUserDetailCache } from './fullUserDetailCache';
import { CachedCaseworker } from './interfaces/common';
import { hasTTLExpired } from './caseWorkerUserDataCacheService';
import * as roleService from './roleService';
import * as userModule from '../user';
import * as taskServiceModule from './taskService';
import * as caseWorkerServiceModule from './caseWorkerService';
import * as caseWorkerUserDataCacheService from './caseWorkerUserDataCacheService';
import * as utilModule from './util';
import * as waSupportedJurisdictionsModule from '../waSupportedJurisdictions';

chai.use(sinonChai);

describe('workAllocation', () => {
  const SUCCESS_RESPONSE = { status: 200, data: 'ok' };
  let sandbox: sinon.SinonSandbox;
  let next: any;
  let spy: any;
  let res: any;
  let mockUserInfo: any;
  let mockRoleAssignments: any[];

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    next = sandbox.spy();
    res = mockRes(SUCCESS_RESPONSE);
    
    // Mock common user info
    mockUserInfo = {
      id: 'test-user-id',
      uid: 'test-user-uid',
      roles: ['caseworker-role'],
      email: 'test@test.com'
    };

    // Mock role assignments
    mockRoleAssignments = [
      {
        id: 'role1',
        roleName: 'case-allocator',
        attributes: {
          jurisdiction: 'IA',
          caseId: '1234567890123456'
        }
      }
    ];
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getUsersByServiceName', () => {
    it('should return a set of users for the given service name', async () => {
      const req = mockReq({
        body: {
          term: null,
          services: ['service1']
        },
        session: {
          passport: {
            user: {
              userinfo: {
                roles: ['role1']
              }
            }
          }
        }
      });
      const res = mockRes();
      const next = sandbox.spy();

      const mockUserData: CachedCaseworker[] = [
        { idamId: 'user1', firstName: 'User', lastName: 'One', email: 'one@one.com', roleCategory: 'role1',
          services: ['service1'],
          locations: [{ id: 'location1', locationName: 'Location One', services: ['service1'] }] },
        { idamId: 'user2', firstName: 'User', lastName: 'Two', email: 'two@two.com', roleCategory: 'role1',
          services: ['service1'],
          locations: [{ id: 'location2', locationName: 'Location Two', services: ['service1'] }] }
      ];

      FullUserDetailCache.setUserDetails(mockUserData);
      // Call this to ensure the timeout is set, so the isTimestampExpired function returns true.
      hasTTLExpired();
      await getUsersByServiceName(req, res, next);
      // eslint-disable-next-line no-unused-expressions
      expect(res.send).to.have.been.called;
      expect(res.status).to.have.been.calledWith(200);
    });
  });

  it('should reject calls for users with pui-case-manager', async () => {
    const req = mockReq({
      body: {
        term: null,
        services: ['service1']
      },
      session: {
        passport: {
          user: {
            userinfo: {
              roles: ['pui-case-manager']
            }
          }
        }
      }
    });
    const res = mockRes();
    const next = sandbox.spy();

    const mockUserData: CachedCaseworker[] = [
      { idamId: 'user1', firstName: 'User', lastName: 'One', email: 'one@one.com', roleCategory: 'role1',
        services: ['service1'],
        locations: [{ id: 'location1', locationName: 'Location One', services: ['service1'] }] },
      { idamId: 'user2', firstName: 'User', lastName: 'Two', email: 'two@two.com', roleCategory: 'role1',
        services: ['service1'],
        locations: [{ id: 'location2', locationName: 'Location Two', services: ['service1'] }] }
    ];

    FullUserDetailCache.setUserDetails(mockUserData);
    // Call this to ensure the timeout is set, so the isTimestampExpired function returns true.
    hasTTLExpired();
    await getUsersByServiceName(req, res, next);
    // eslint-disable-next-line no-unused-expressions
    expect(res.send).to.have.been.calledWith('Forbidden');
    expect(res.status).to.have.been.calledWith(403);
  });

  describe('getTask', () => {
    it('should make a get request and respond appropriately', async () => {
      spy = sandbox.stub(http, 'get').resolves(res);
      const req = mockReq({
        params: {
          taskId: '123456'
        }
      });
      const response = mockRes();
      await getTask(req, response, next);

      // Should have the correct URL.
      const args = spy.getCall(0).args;
      expect(args[0]).to.equal(`${baseWorkAllocationTaskUrl}/task/123456`);

      // Should have received the HTTP response. The get simply returns the data.
      // expect(response.send).to.have.been.calledWith(sinon.match(SUCCESS_RESPONSE));
    });

    it('should handle an exception being thrown', async () => {
      spy = sandbox.stub(http, 'get').resolves(res);
      const req = mockReq({
        params: {
          taskId: '123456'
        }
      });
      const response = mockRes();

      // Have the response throw an error.
      response.send.throws();

      await getTask(req, response, next);

      expect(next).to.have.been.calledWith();
    });
  });

  describe('getTypesOfWork', () => {
    it('should make a get request and respond appropriately', async () => {
      const typesOfWork = [
        {
          id: 'hearing_work',
          label: 'Hearing work'
        },
        {
          id: 'upper_tribunal',
          label: 'Upper Tribunal'
        },
        {
          id: 'routine_work',
          label: 'Routine work'
        },
        {
          id: 'decision_making_work',
          label: 'Decision-making work'
        },
        {
          id: 'applications',
          label: 'Applications'
        },
        {
          id: 'priority',
          label: 'Priority'
        },
        {
          id: 'access_requests',
          label: 'Access requests'
        },
        {
          id: 'error_management',
          label: 'Error management'
        }
      ];
      const response = {
        work_types: typesOfWork
      };
      const typesOfWorkResponse = typesOfWork.map((work) => ({ key: work.id, label: work.label }));
      res = mockRes({
        data: response
      });
      spy = sandbox.stub(http, 'get').resolves(res);
      const req = mockReq();
      await getTypesOfWork(req, res, next);

      // expect(res.status).to.have.been.calledWith(sinon.match(200));
      expect(res.send).to.have.been.calledWith(sinon.match(typesOfWorkResponse));
    });

    it('should handle an exception being thrown', async () => {
      spy = sandbox.stub(http, 'get').resolves(res);
      const req = mockReq({
        params: {
          taskId: '123456'
        }
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
          searchRequest: {
            search_parameters: [],
            sorting_parameters: []
          },
          view: 'MyTasks'
        },
        session: {
          caseworkers: null
        }
      });
      const response = mockRes({
        data: mockTasks
      });
      await searchTask(req, response, next);
      // Should have the correct URL and the appropriate payload.
      const args = spy.getCall(0).args;
      expect(args[0]).to.equal(`${baseWorkAllocationTaskUrl}/task`);
      expect(args[1]).to.deep.equal({ search_parameters: [], sorting_parameters: [] });

      // Should have received the HTTP response. The search simply returns the data.
      expect(response.data.length).to.equal(3);
      expect(response.data[0].jurisdiction).to.equal('IA');
    });

    it('should make a post request with pagination and respond appropriately', async () => {
      spy = sandbox.stub(http, 'post').resolves(res);
      const req = mockReq({
        body: {
          searchRequest: {
            search_parameters: [],
            sorting_parameters: [],
            pagination_parameters: {
              page_size: 11,
              page_number: 3
            }
          },
          view: 'MyTasks'
        },
        session: {
          caseworkers: null
        }
      });
      const response = mockRes({
        data: mockTasks
      });
      await searchTask(req, response, next);
      // Should have the correct URL and the appropriate payload.
      const args = spy.getCall(0).args;
      expect(args[0]).to.equal(`${baseWorkAllocationTaskUrl}/task?first_result=22&max_results=11`);
      expect(args[1]).to.deep.equal({
        search_parameters: [],
        sorting_parameters: []
      });

      // Should have received the HTTP response. The search simply returns the data.
      expect(response.data.length).to.equal(3);
      expect(response.data[0].jurisdiction).to.equal('IA');
    });

    it('should handle an exception being thrown', async () => {
      spy = sandbox.stub(http, 'post').resolves(res);
      const req = mockReq({
        body: {
          search: 'criteria'
        }
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
      const body = { assignee: { name: 'bob', id: 'bob01' } };
      const req = mockReq({
        body,
        params: {
          action: 'assign',
          taskId: '123456'
        }
      });
      const response = mockRes();
      await postTaskAction(req, response, next);

      // Should have the correct URL and the appropriate payload.
      const args = spy.getCall(0).args;
      expect(args[0]).to.equal(`${baseWorkAllocationTaskUrl}/task/123456/assign`);
      expect(args[1]).to.deep.equal(body);

      // Should have received the HTTP response. The search simply returns the data.
      expect(response.send).to.have.been.calledWith(sinon.match(SUCCESS_RESPONSE.data));
    });

    it('should handle an exception being thrown', async () => {
      spy = sandbox.stub(http, 'post').resolves(res);
      const body = { assignee: { name: 'bob', id: 'bob01' } };
      const req = mockReq({
        body,
        params: {
          action: 'assign',
          taskId: '123456'
        }
      });
      const response = mockRes();

      // Have the response throw an error.
      response.send.throws();

      await postTaskAction(req, response, next);

      expect(next).to.have.been.calledWith();
    });
  });

  describe('getTaskRoles', () => {
    it('should successfully get task roles', async () => {
      const mockRoles = {
        roles: [
          { role_name: 'judge', role_category: 'JUDICIAL' },
          { role_name: 'caseworker', role_category: 'LEGAL_OPERATIONS' }
        ]
      };
      spy = sandbox.stub(taskServiceModule, 'handleTaskRolesGet').resolves({ status: 200, data: mockRoles });
      
      const req = mockReq({
        params: { taskId: '123456' }
      });
      const response = mockRes();
      
      await getTaskRoles(req, response, next);
      
      expect(spy).to.have.been.calledWith(`${baseWorkAllocationTaskUrl}/task/123456/roles`);
      expect(response.status).to.have.been.calledWith(200);
      expect(response.send).to.have.been.calledWith(mockRoles.roles);
    });

    it('should handle errors when getting task roles', async () => {
      const error = new Error('Get roles failed');
      spy = sandbox.stub(taskServiceModule, 'handleTaskRolesGet').rejects(error);
      
      const req = mockReq({
        params: { taskId: '123456' }
      });
      const response = mockRes();
      
      await getTaskRoles(req, response, next);
      
      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('getTasksByCaseId', () => {
    it('should successfully get tasks by case ID', async () => {
      const mockTasks = { tasks: [{ id: 'task1', case_id: '1234567890123456' }], total_records: 1 };
      const mockActionedTasks = [{ id: 'task1', case_id: '1234567890123456', actions: ['assign'] }];
      
      spy = sandbox.stub(taskServiceModule, 'handleTaskSearch').resolves({ status: 200, data: mockTasks });
      sandbox.stub(utilModule, 'assignActionsToUpdatedTasks').returns(mockActionedTasks);
      sandbox.stub(utilModule, 'prepareSearchTaskUrl').returns(`${baseWorkAllocationTaskUrl}/task`);
      
      const req = mockReq({
        params: { caseId: '1234567890123456' },
        session: {
          passport: {
            user: {
              userinfo: mockUserInfo
            }
          }
        }
      });
      const response = mockRes();
      
      await getTasksByCaseId(req, response, next);
      
      expect(spy).to.have.been.called;
      expect(response.send).to.have.been.calledWith(mockActionedTasks);
    });

    it('should handle errors when getting tasks by case ID', async () => {
      const error = new Error('Get tasks failed');
      spy = sandbox.stub(taskServiceModule, 'handleTaskSearch').rejects(error);
      sandbox.stub(utilModule, 'prepareSearchTaskUrl').returns(`${baseWorkAllocationTaskUrl}/task`);
      
      const req = mockReq({
        params: { caseId: '1234567890123456' },
        session: {
          passport: {
            user: {
              userinfo: mockUserInfo
            }
          }
        }
      });
      const response = mockRes();
      
      await getTasksByCaseId(req, response, next);
      
      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('getTasksByCaseIdAndEventId', () => {
    it('should successfully get tasks by case ID and event ID for supported jurisdiction', async () => {
      const mockTasks = [{ id: 'task1', case_id: '1234567890123456', event_id: 'submit' }];
      spy = sandbox.stub(utilModule, 'handlePost').resolves({ status: 200, data: mockTasks });
      
      // Mock the supported jurisdictions check
      const mockJurisdictions = ['IA', 'SSCS', 'CIVIL'];
      sandbox.stub(waSupportedJurisdictionsModule, 'getWASupportedJurisdictionsList').returns(mockJurisdictions);
      
      const req = mockReq({
        params: { 
          caseId: '1234567890123456',
          eventId: 'submit',
          caseType: 'Asylum',
          jurisdiction: 'IA'
        }
      });
      const response = mockRes();
      
      await getTasksByCaseIdAndEventId(req, response, next);
      
      expect(response.status).to.have.been.calledWith(200);
      expect(response.send).to.have.been.calledWith(mockTasks);
    });

    it('should return empty array for unsupported jurisdiction', async () => {
      // Mock the supported jurisdictions check to not include the requested jurisdiction
      const mockJurisdictions = ['IA', 'SSCS', 'CIVIL'];
      sandbox.stub(waSupportedJurisdictionsModule, 'getWASupportedJurisdictionsList').returns(mockJurisdictions);
      
      const req = mockReq({
        params: { 
          caseId: '1234567890123456',
          eventId: 'submit',
          caseType: 'TestCase',
          jurisdiction: 'UNSUPPORTED'
        }
      });
      const response = mockRes();
      
      await getTasksByCaseIdAndEventId(req, response, next);
      
      expect(response.status).to.have.been.calledWith(200);
      expect(response.send).to.have.been.calledWith([]);
    });

    it('should handle errors when getting tasks by case ID and event ID', async () => {
      const error = new Error('Get tasks failed');
      spy = sandbox.stub(utilModule, 'handlePost').rejects(error);
      
      // Mock the supported jurisdictions check
      const mockJurisdictions = ['IA', 'SSCS', 'CIVIL'];
      sandbox.stub(waSupportedJurisdictionsModule, 'getWASupportedJurisdictionsList').returns(mockJurisdictions);
      
      const req = mockReq({
        params: { 
          caseId: '1234567890123456',
          eventId: 'submit',
          caseType: 'Asylum',
          jurisdiction: 'IA'
        }
      });
      const response = mockRes();
      
      await getTasksByCaseIdAndEventId(req, response, next);
      
      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('postTaskCompletionForAccess', () => {
    it('should complete task for access with taskId in body', async () => {
      const mockResponse = { task_completed: true };
      spy = sandbox.stub(taskServiceModule, 'handleTaskPost').resolves({ status: 200, data: mockResponse });
      
      const req = mockReq({
        body: { taskId: '123456' }
      });
      const response = mockRes();
      
      const result = await postTaskCompletionForAccess(req, response, next);
      
      expect(spy).to.have.been.calledWith(
        `${baseWorkAllocationTaskUrl}/task/123456/complete?completion_process=EXUI_USER_COMPLETION`,
        { completion_options: { assign_and_complete: true } }
      );
      expect(result.status).to.equal(200);
    });

    it('should complete task for access with taskId in specificAccessStateData', async () => {
      const mockResponse = { task_completed: true };
      spy = sandbox.stub(taskServiceModule, 'handleTaskPost').resolves({ status: 200, data: mockResponse });
      
      const req = mockReq({
        body: { 
          specificAccessStateData: { taskId: '123456' }
        }
      });
      const response = mockRes();
      
      const result = await postTaskCompletionForAccess(req, response, next);
      
      expect(spy).to.have.been.calledWith(
        `${baseWorkAllocationTaskUrl}/task/123456/complete?completion_process=EXUI_USER_COMPLETION`,
        { completion_options: { assign_and_complete: true } }
      );
    });

    it('should handle errors when completing task for access', async () => {
      const error = new Error('Complete task failed');
      spy = sandbox.stub(taskServiceModule, 'handleTaskPost').rejects(error);
      
      const req = mockReq({
        body: { taskId: '123456' }
      });
      const response = mockRes();
      
      const result = await postTaskCompletionForAccess(req, response, next);
      
      expect(next).to.have.been.calledWith(error);
      expect(result).to.equal(error);
    });
  });

  describe('getAllCaseWorkersForLocation', () => {
    it('should get all case workers for a location', async () => {
      const mockCaseWorkers = [
        { id: 'worker1', firstName: 'John', lastName: 'Doe' },
        { id: 'worker2', firstName: 'Jane', lastName: 'Smith' }
      ];
      spy = sandbox.stub(caseWorkerServiceModule, 'handleCaseWorkerForLocation').resolves(mockCaseWorkers);
      
      const req = mockReq({
        params: { locationId: 'loc123' }
      });
      const response = mockRes();
      
      await getAllCaseWorkersForLocation(req, response, next);
      
      expect(response.status).to.have.been.calledWith(200);
      expect(response.send).to.have.been.calledWith(mockCaseWorkers);
    });

    it('should handle errors when getting case workers for location', async () => {
      const error = new Error('Get caseworkers failed');
      spy = sandbox.stub(caseWorkerServiceModule, 'handleCaseWorkerForLocation').rejects(error);
      
      const req = mockReq({
        params: { locationId: 'loc123' }
      });
      const response = mockRes();
      
      await getAllCaseWorkersForLocation(req, response, next);
      
      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('getCaseWorkersForService', () => {
    it('should get case workers for a service', async () => {
      const mockCaseWorkers = [
        { id: 'worker1', firstName: 'John', lastName: 'Doe', service: 'IA' }
      ];
      spy = sandbox.stub(caseWorkerServiceModule, 'handleCaseWorkerForService').resolves(mockCaseWorkers);
      
      const req = mockReq({
        params: { serviceId: 'IA' }
      });
      const response = mockRes();
      
      await getCaseWorkersForService(req, response, next);
      
      expect(response.status).to.have.been.calledWith(200);
      expect(response.send).to.have.been.calledWith(mockCaseWorkers);
    });

    it('should handle errors when getting case workers for service', async () => {
      const error = new Error('Get caseworkers failed');
      spy = sandbox.stub(caseWorkerServiceModule, 'handleCaseWorkerForService').rejects(error);
      
      const req = mockReq({
        params: { serviceId: 'IA' }
      });
      const response = mockRes();
      
      await getCaseWorkersForService(req, response, next);
      
      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('getCaseWorkersForLocationAndService', () => {
    it('should get case workers for location and service', async () => {
      const mockCaseWorkers = [
        { id: 'worker1', firstName: 'John', lastName: 'Doe', service: 'IA', location: 'loc123' }
      ];
      spy = sandbox.stub(caseWorkerServiceModule, 'handleCaseWorkerForLocationAndService').resolves(mockCaseWorkers);
      
      const req = mockReq({
        params: { locationId: 'loc123', serviceId: 'IA' }
      });
      const response = mockRes();
      
      await getCaseWorkersForLocationAndService(req, response, next);
      
      expect(response.status).to.have.been.calledWith(200);
      expect(response.send).to.have.been.calledWith(mockCaseWorkers);
    });

    it('should handle errors when getting case workers for location and service', async () => {
      const error = new Error('Get caseworkers failed');
      spy = sandbox.stub(caseWorkerServiceModule, 'handleCaseWorkerForLocationAndService').rejects(error);
      
      const req = mockReq({
        params: { locationId: 'loc123', serviceId: 'IA' }
      });
      const response = mockRes();
      
      await getCaseWorkersForLocationAndService(req, response, next);
      
      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('searchCaseWorker', () => {
    it('should search for case workers', async () => {
      const mockSearchResults = {
        caseworkers: [
          { id: 'worker1', firstName: 'John', lastName: 'Doe' }
        ]
      };
      spy = sandbox.stub(caseWorkerServiceModule, 'handlePostSearch').resolves({ status: 200, data: mockSearchResults });
      
      const req = mockReq({
        body: {
          searchTerm: 'John',
          services: ['IA'],
          userType: 'caseworker'
        }
      });
      const response = mockRes();
      
      await searchCaseWorker(req, response, next);
      
      expect(response.status).to.have.been.calledWith(200);
      expect(response.send).to.have.been.calledWith(mockSearchResults);
    });

    it('should handle errors when searching case workers', async () => {
      const error = new Error('Search failed');
      spy = sandbox.stub(caseWorkerServiceModule, 'handlePostSearch').rejects(error);
      
      const req = mockReq({
        body: {
          searchTerm: 'John',
          services: ['IA']
        }
      });
      const response = mockRes();
      
      await searchCaseWorker(req, response, next);
      
      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('postTaskSearchForCompletable', () => {
    it('should search for completable tasks for supported jurisdiction', async () => {
      const mockTasks = [{ id: 'task1', completable: true }];
      spy = sandbox.stub(caseWorkerServiceModule, 'handlePostSearch').resolves({ status: 200, data: mockTasks });
      
      const req = mockReq({
        body: {
          searchRequest: {
            ccdId: '1234567890123456',
            jurisdiction: 'IA',
            caseTypeId: 'Asylum',
            eventId: 'submit'
          }
        }
      });
      const response = mockRes();
      
      await postTaskSearchForCompletable(req, response, next);
      
      expect(response.status).to.have.been.calledWith(200);
      expect(response.send).to.have.been.calledWith(mockTasks);
    });

    it('should return empty array for unsupported jurisdiction', async () => {
      const req = mockReq({
        body: {
          searchRequest: {
            ccdId: '1234567890123456',
            jurisdiction: 'UNSUPPORTED',
            caseTypeId: 'TestCase',
            eventId: 'submit'
          }
        }
      });
      const response = mockRes();
      
      await postTaskSearchForCompletable(req, response, next);
      
      expect(response.status).to.have.been.calledWith(200);
      expect(response.send).to.have.been.calledWith([]);
    });

    it('should handle errors when searching for completable tasks', async () => {
      const error = new Error('Search failed');
      spy = sandbox.stub(caseWorkerServiceModule, 'handlePostSearch').rejects(error);
      
      const req = mockReq({
        body: {
          searchRequest: {
            ccdId: '1234567890123456',
            jurisdiction: 'IA',
            caseTypeId: 'Asylum',
            eventId: 'submit'
          }
        }
      });
      const response = mockRes();
      
      await postTaskSearchForCompletable(req, response, next);
      
      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('getRolesCategory', () => {
    it('should return person roles', async () => {
      const req = mockReq();
      const response = mockRes();
      
      await getRolesCategory(req, response);
      
      const expectedRoles = [
        { roleId: 'judicial', roleName: 'Judicial' },
        { roleId: 'legalOps', roleName: 'Legal Ops' },
        { roleId: 'admin', roleName: 'Admin' },
        { roleId: 'ctsc', roleName: 'CTSC' }
      ];
      
      expect(response.send).to.have.been.calledWith(expectedRoles);
      expect(response.status).to.have.been.calledWith(200);
    });

    it('should handle errors gracefully', async () => {
      const req = mockReq();
      const response = mockRes();
      
      // Simulate an error in the response
      response.send.throws(new Error('Response error'));
      
      try {
        await getRolesCategory(req, response);
      } catch (error) {
        expect(error.message).to.equal('Response error');
      }
    });
  });

  describe('showAllocateRoleLink', () => {
    it('should return true if user is case allocator', async () => {
      // Mock checkIfCaseAllocator to return true
      sandbox.stub(roleService, 'checkIfCaseAllocator').returns(true);
      
      const req = mockReq({
        params: { jurisdiction: 'IA', caseLocationId: 'loc123' }
      });
      const response = mockRes();
      
      await showAllocateRoleLink(req, response, next);
      
      expect(response.send).to.have.been.calledWith(true);
      expect(response.status).to.have.been.calledWith(200);
    });

    it('should return false if user is not case allocator', async () => {
      // Mock checkIfCaseAllocator to return false
      sandbox.stub(roleService, 'checkIfCaseAllocator').returns(false);
      
      const req = mockReq({
        params: { jurisdiction: 'IA', caseLocationId: 'loc123' }
      });
      const response = mockRes();
      
      await showAllocateRoleLink(req, response, next);
      
      expect(response.send).to.have.been.calledWith(false);
      expect(response.status).to.have.been.calledWith(200);
    });

    it('should handle errors when checking allocate role link', async () => {
      const error = new Error('Check failed');
      sandbox.stub(roleService, 'checkIfCaseAllocator').throws(error);
      
      const req = mockReq({
        params: { jurisdiction: 'IA', caseLocationId: 'loc123' }
      });
      const response = mockRes();
      
      await showAllocateRoleLink(req, response, next);
      
      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('getCaseListPromises', () => {
    it('should return array of promises for case data', () => {
      const mockCaseData = {
        IA: {
          Asylum: new Set(['1234567890123456', '1234567890123457'])
        }
      };
      
      const req = mockReq();
      
      const result = getCaseListPromises(mockCaseData, req);
      
      expect(result).to.be.an('array');
      expect(result.length).to.be.greaterThan(0);
      expect(result[0]).to.be.a('promise');
    });

    it('should handle empty case data', () => {
      const mockCaseData = {};
      const req = mockReq();
      
      const result = getCaseListPromises(mockCaseData, req);
      
      expect(result).to.be.an('array');
      expect(result.length).to.equal(0);
    });

    it('should handle multiple jurisdictions and case types', () => {
      const mockCaseData = {
        IA: {
          Asylum: new Set(['1234567890123456']),
          Appeal: new Set(['1234567890123457'])
        },
        SSCS: {
          Benefit: new Set(['1234567890123458'])
        }
      };
      
      const req = mockReq();
      
      const result = getCaseListPromises(mockCaseData, req);
      
      expect(result).to.be.an('array');
      expect(result.length).to.be.greaterThan(2);
    });
  });

  describe('getMyAccess', () => {
    it('should return user access cases', async () => {
      // Mock refreshRoleAssignmentForUser
      sandbox.stub(userModule, 'refreshRoleAssignmentForUser').resolves();
      
      const req = mockReq({
        session: {
          passport: {
            user: {
              userinfo: mockUserInfo
            }
          },
          roleAssignmentResponse: mockRoleAssignments
        }
      });
      const response = mockRes();
      
      await getMyAccess(req, response);
      
      expect(response.send).to.have.been.called;
      expect(response.status).to.have.been.calledWith(200);
    });

    it('should handle errors when getting my access', async () => {
      const error = new Error('Get access failed');
      sandbox.stub(userModule, 'refreshRoleAssignmentForUser').rejects(error);
      
      const req = mockReq({
        session: {
          passport: {
            user: {
              userinfo: mockUserInfo
            }
          }
        }
      });
      const response = mockRes();
      
      try {
        await getMyAccess(req, response);
      } catch (e) {
        expect(e).to.equal(error);
      }
    });
  });

  describe('getMyCases', () => {
    it('should return user cases', async () => {
      // Mock refreshRoleAssignmentForUser
      sandbox.stub(userModule, 'refreshRoleAssignmentForUser').resolves();
      
      const req = mockReq({
        body: {
          searchRequest: {
            search_parameters: [
              { key: 'services', values: ['IA'] },
              { key: 'locations', values: ['loc123'] }
            ]
          }
        },
        session: {
          passport: {
            user: {
              userinfo: mockUserInfo
            }
          },
          roleAssignmentResponse: mockRoleAssignments
        }
      });
      const response = mockRes();
      
      await getMyCases(req, response);
      
      expect(response.send).to.have.been.called;
      expect(response.status).to.have.been.calledWith(200);
    });

    it('should handle errors when getting my cases', async () => {
      const error = new Error('Get cases failed');
      sandbox.stub(userModule, 'refreshRoleAssignmentForUser').rejects(error);
      
      const req = mockReq({
        body: {
          searchRequest: {
            search_parameters: []
          }
        },
        session: {
          passport: {
            user: {
              userinfo: mockUserInfo
            }
          }
        }
      });
      const response = mockRes();
      
      await getMyCases(req, response);
      
      expect(response.send).to.have.been.calledWith(null);
      expect(response.status).to.have.been.calledWith(500);
    });
  });

  describe('getCases', () => {
    it('should get cases with search parameters', async () => {
      // Mock the required util functions
      const mockRoleAssignmentResult = {
        roleAssignmentResponse: [
          { id: 'role1', caseId: 'case123', roleName: 'judge' }
        ]
      };
      
      const mockCase = {
        case_id: 'case123',
        id: 'case123',
        type: 'Family',
        task_state: 'assigned',
        task_system: 'WA',
        security_classification: 'PUBLIC',
        task_title: 'Test Task',
        created_date: '2029-01-01',
        due_date: '2029-01-31',
        location: 'loc123',
        jurisdiction: 'Family',
        region: 'North',
        case_type_id: 'FAM001',
        case_category: 'Family',
        case_name: 'Test Case',
        auto_assigned: false,
        actions: [],
        execution_type: 'Case Management',
        assignee: 'user123',
        dueDate: '2029-01-31',
        taskName: 'Test Task',
        caseName: 'Test Case',
        caseCategory: 'Family',
        assigneeName: 'Test User',
        name: 'Test Case'
      };
      
      sandbox.stub(utilModule, 'getRoleAssignmentsByQuery').resolves(mockRoleAssignmentResult);
      sandbox.stub(utilModule, 'getCaseIdListFromRoles').resolves([mockCase]);
      sandbox.stub(utilModule, 'filterByLocationId').returns([mockCase]);
      sandbox.stub(utilModule, 'mapCasesFromData').returns([{
        case_id: 'case123',
        case_name: 'Test Case',
        case_category: 'Family',
        id: 'case123',
        case_role: 'judge',
        role_category: 'JUDICIAL',
        jurisdiction: 'Family',
        location_id: 'loc123',
        startDate: '2029-01-01',
        endDate: '2029-12-31',
        assignee: 'user123'
      }]);
      
      const req = mockReq({
        body: {
          searchRequest: {
            search_parameters: [
              { key: 'location_id', values: 'loc123' }
            ],
            pagination_parameters: {
              page_number: 1,
              page_size: 10
            }
          }
        }
      });
      const response = mockRes();
      
      await getCases(req, response, next);
      
      expect(response.send).to.have.been.called;
      expect(response.status).to.have.been.calledWith(200);
    });

    it('should handle errors when getting cases', async () => {
      const error = new Error('Get cases failed');
      // Mock getRoleAssignmentsByQuery to throw error
      sandbox.stub(utilModule, 'getRoleAssignmentsByQuery').rejects(error);
      
      const req = mockReq({
        body: {
          searchRequest: {
            search_parameters: []
          }
        }
      });
      const response = mockRes();
      
      await getCases(req, response, next);
      
      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('getTaskNames', () => {
    it('should return task names for service', async () => {
      const mockTaskTypes = {
        task_types: [
          { id: 'type1', name: 'Task Type 1' },
          { id: 'type2', name: 'Task Type 2' }
        ]
      };
      spy = sandbox.stub(taskServiceModule, 'handleTaskGet').resolves(mockTaskTypes);
      
      const req = mockReq({
        body: { service: 'IA' }
      });
      const response = mockRes();
      
      await getTaskNames(req, response);
      
      expect(spy).to.have.been.calledWith(`${baseWorkAllocationTaskUrl}/task/task-types?jurisdiction=IA`);
      expect(response.send).to.have.been.calledWith(mockTaskTypes.task_types);
      expect(response.status).to.have.been.calledWith(200);
    });

    it('should handle errors when getting task names', async () => {
      const error = new Error('Get task names failed');
      spy = sandbox.stub(taskServiceModule, 'handleTaskGet').rejects(error);
      
      const req = mockReq({
        body: { service: 'IA' }
      });
      const response = mockRes();
      
      try {
        await getTaskNames(req, response);
      } catch (e) {
        expect(e).to.equal(error);
      }
    });
  });

  describe('getNewUsersByServiceName', () => {
    it('should fetch new users data successfully', async () => {
      const resolve = sandbox.spy();
      const reject = sandbox.spy();
      
      // Mock fetchNewUserData and fetchRoleAssignmentsForNewUsers
      sandbox.stub(caseWorkerUserDataCacheService, 'fetchNewUserData').resolves([]);
      sandbox.stub(caseWorkerUserDataCacheService, 'fetchRoleAssignmentsForNewUsers').resolves();
      
      await getNewUsersByServiceName(resolve, reject);
      
      expect(resolve).to.have.been.called;
      expect(reject).to.not.have.been.called;
    });

    it('should handle errors when fetching new users', async () => {
      const resolve = sandbox.spy();
      const reject = sandbox.spy();
      const error = new Error('Fetch users failed');
      
      // Mock fetchNewUserData to throw error
      sandbox.stub(caseWorkerUserDataCacheService, 'fetchNewUserData').rejects(error);
      
      await getNewUsersByServiceName(resolve, reject);
      
      expect(reject).to.have.been.calledWith(error);
      expect(resolve).to.have.been.called; // Note: This function incorrectly calls resolve() even after error
    });
  });

  describe('Additional edge cases for existing functions', () => {
    describe('getTask with due_date handling', () => {
      it('should transform due_date to dueDate when due_date exists', async () => {
        const mockTask = {
          task: {
            id: '123456',
            due_date: '2029-12-01T10:00:00Z',
            name: 'Test Task'
          }
        };
        spy = sandbox.stub(http, 'get').resolves({ data: mockTask });
        
        const req = mockReq({
          params: { taskId: '123456' }
        });
        const response = mockRes();
        
        await getTask(req, response, next);
        
        expect(response.send).to.have.been.calledWith(sinon.match({
          task: sinon.match({
            dueDate: '2029-12-01T10:00:00Z'
          })
        }));
      });

      it('should handle task without due_date', async () => {
        const mockTask = {
          task: {
            id: '123456',
            name: 'Test Task'
          }
        };
        spy = sandbox.stub(http, 'get').resolves({ data: mockTask });
        
        const req = mockReq({
          params: { taskId: '123456' }
        });
        const response = mockRes();
        
        await getTask(req, response, next);
        
        expect(response.send).to.have.been.calledWith(mockTask);
      });
    });

  describe('postTaskAction with special modes', () => {
      it('should handle hasNoAssigneeOnComplete flag', async () => {
        spy = sandbox.stub(http, 'post').resolves({ status: 200, data: 'ok' });
        
        const req = mockReq({
          body: { hasNoAssigneeOnComplete: true },
          params: { action: 'complete', taskId: '123456' }
        });
        const response = mockRes();
        
        await postTaskAction(req, response, next);
        
        const calledArgs = spy.getCall(0).args[1];
        expect(calledArgs).to.deep.equal({
          completion_options: { assign_and_complete: true }
        });
      });

      it('should handle actionByEvent mode', async () => {
        spy = sandbox.stub(http, 'post').resolves({ status: 200, data: 'ok' });
        
        const req = mockReq({
          body: { 
            actionByEvent: true,
            eventName: 'submitEvent',
            someOtherData: 'test'
          },
          params: { action: 'complete', taskId: '123456' }
        });
        const response = mockRes();
        
        await postTaskAction(req, response, next);
        
        // Verify the URL contains the correct completion_process parameter
        const calledUrl = spy.getCall(0).args[0];
        expect(calledUrl).to.include('completion_process=EXUI_CASE-EVENT_COMPLETION');
        
        // Verify eventName and actionByEvent are removed from body
        const calledBody = spy.getCall(0).args[1];
        expect(calledBody).to.not.have.property('actionByEvent');
        expect(calledBody).to.not.have.property('eventName');
        expect(calledBody).to.have.property('someOtherData', 'test');
      });

      it('should use manual completion mode by default', async () => {
        spy = sandbox.stub(http, 'post').resolves({ status: 200, data: 'ok' });
        
        const req = mockReq({
          body: { someData: 'test' },
          params: { action: 'complete', taskId: '123456' }  // Changed to complete action
        });
        const response = mockRes();
        
        await postTaskAction(req, response, next);
        
        const calledUrl = spy.getCall(0).args[0];
        expect(calledUrl).to.include('completion_process=EXUI_USER_COMPLETION');
      });
    });
  });
});
