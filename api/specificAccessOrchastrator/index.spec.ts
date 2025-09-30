import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import { getConfigValue } from '../configuration';
import { SERVICES_ROLE_ASSIGNMENT_API_PATH, TEST_USER_ID } from '../configuration/references';
import { http } from '../lib/http';
import { EnhancedRequest } from '../lib/models';
import * as accessManagement from '../accessManagement';
import * as commonCrudService from '../common/crudService';
import * as roleAccess from '../roleAccess';
import * as user from '../user';
import * as workAllocation from '../workAllocation';
import * as lau from '../services/lau';
import { getTaskType, orchestrationRequestMoreInformation, orchestrationSpecificAccessRequest, postCreateTask, specificAccessRequestCreateAmRole, specificAccessRequestUpdateAttributes } from './index';

chai.use(sinonChai);

describe('postCreateTask', () => {
  let sandbox: sinon.SinonSandbox;
  let req: EnhancedRequest;
  let next;
  const data = {
    status: 204,
    statusText: 'No Content',
    data: '',
    duration: 2496
  };

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = mockReq({
      body: {}
    });
    next = sandbox.stub();
    sandbox.stub(http, 'post').resolves({
      data
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should create task successfully', async () => {
    const createTask = { caseId: '101', jurisdiction: 'IA', caseType: 'caseType', taskType: 'access_requests', dueDate: '2022-06-30T16:53:10+0100', name: 'name', roleAssignmentId: 'example' };
    const response = await postCreateTask(req, next, createTask);
    expect(response.data).to.deep.equal(data);
  });

  it('should handle errors when creating task fails', async () => {
    const createTask = { caseId: '101', jurisdiction: 'IA', caseType: 'caseType', taskType: 'access_requests', dueDate: '2022-06-30T16:53:10+0100', name: 'name', roleAssignmentId: 'example' };
    const error = new Error('Failed to create task');
    (error as any).status = 500;
    sandbox.restore();
    sandbox.stub(http, 'post').rejects(error);

    const response = await postCreateTask(req, next, createTask);

    expect(next).to.have.been.calledWith(error);
    expect(response).to.deep.equal(error);
  });
});

describe('orchestrationSpecificAccessRequest', () => {
  let sandbox: sinon.SinonSandbox;
  let res;
  let req;
  let next;
  const data = {
    roleAssignmentResponse: {
      roleRequest: {
        id: '37cb4517-20b7-4709-adea-472986e78088',
        authenticatedUserId: getConfigValue(TEST_USER_ID),
        correlationId: 'dec7ca0c-b6d8-4b43-a855-018f766321a4',
        assignerId: getConfigValue(TEST_USER_ID),
        requestType: 'CREATE',
        process: 'specific-access',
        reference: `1651667946523483/specific-access-admin/${getConfigValue(TEST_USER_ID)}`,
        replaceExisting: true,
        status: 'APPROVED',
        created: '2022-05-10T10:59:01.308613Z',
        log: 'Request has been approved',
        byPassOrgDroolRule: true
      },
      requestedRoles: [{
        attributes: {
          caseId: 101,
          jurisdiction: 'jurisdiction',
          caseType: 'caseType'
        }
      }]
    }
  };

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    res = mockRes();
    req = mockReq({
      params: {}
    });
    next = sandbox.stub();
    const postSpy = sandbox.stub(http, 'post');
    postSpy.onCall(0).resolves({
      data, status: 201
    });
    postSpy.onCall(1).resolves({
      data, status: 204
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should call orchestrationSpecificAccessRequest successfully', async () => {
    await orchestrationSpecificAccessRequest(req, res, next);
    expect(res.send).to.have.been.calledWith(sinon.match(data));
  });

  it('should get task type from role category', async () => {
    expect(getTaskType('JUDICIAL')).to.deep.equal('reviewSpecificAccessRequestJudiciary');
    expect(getTaskType('LEGAL_OPERATIONS')).to.deep.equal('reviewSpecificAccessRequestLegalOps');
    expect(getTaskType('ADMIN')).to.deep.equal('reviewSpecificAccessRequestAdmin');
  });

  it('should handle non-201 response from createAmRole', async () => {
    sandbox.restore();
    const postSpy = sandbox.stub(http, 'post');
    postSpy.onCall(0).resolves({
      data: { error: 'Bad request' }, status: 400
    });

    await orchestrationSpecificAccessRequest(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.send).to.have.been.calledWith({ data: { error: 'Bad request' }, status: 400 });
  });

  it('should handle non-204 response from task creation', async () => {
    sandbox.restore();
    const postSpy = sandbox.stub(http, 'post');
    const deleteSpy = sandbox.stub(commonCrudService, 'sendDelete').resolves({
      status: 204,
      data: null,
      statusText: 'No Content',
      headers: {},
      config: {}
    } as any);

    const data = {
      roleAssignmentResponse: {
        roleRequest: {
          id: '37cb4517-20b7-4709-adea-472986e78088'
        },
        requestedRoles: [{
          id: 'roleId123',
          roleCategory: 'JUDICIAL',
          attributes: {
            caseId: 101,
            jurisdiction: 'jurisdiction',
            caseType: 'caseType'
          }
        }]
      }
    };

    postSpy.onCall(0).resolves({ data, status: 201 });
    postSpy.onCall(1).resolves({ status: 400, data: 'Task creation failed' });

    await orchestrationSpecificAccessRequest(req, res, next);

    expect(deleteSpy).to.have.been.called;
    expect(res.status).to.have.been.calledWith(400);
  });

  it('should handle failed role deletion after task creation failure', async () => {
    sandbox.restore();
    const postSpy = sandbox.stub(http, 'post');
    const deleteSpy = sandbox.stub(commonCrudService, 'sendDelete').resolves({
      status: 500,
      data: 'Delete failed',
      statusText: 'Internal Server Error',
      headers: {},
      config: {}
    } as any);

    const data = {
      roleAssignmentResponse: {
        roleRequest: {
          id: '37cb4517-20b7-4709-adea-472986e78088'
        },
        requestedRoles: [{
          id: 'roleId123',
          roleCategory: 'JUDICIAL',
          attributes: {
            caseId: 101,
            jurisdiction: 'jurisdiction',
            caseType: 'caseType'
          }
        }]
      }
    };

    postSpy.onCall(0).resolves({ data, status: 201 });
    postSpy.onCall(1).resolves({ status: 400, data: 'Task creation failed' });

    await orchestrationSpecificAccessRequest(req, res, next);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.send).to.have.been.calledWith({ status: 500, data: 'Delete failed', statusText: 'Internal Server Error', headers: {}, config: {} });
  });

  it('should refresh role assignment and log access request on success', async () => {
    const refreshStub = sandbox.stub(user, 'refreshRoleAssignmentForUser').resolves();
    const logStub = sandbox.stub(lau, 'logAccessRequest').resolves();

    req.session = {
      passport: {
        user: {
          userinfo: {
            id: 'userId123'
          }
        }
      }
    };

    await orchestrationSpecificAccessRequest(req, res, next);

    expect(refreshStub).to.have.been.calledWith({ id: 'userId123' }, req);
    expect(logStub).to.have.been.calledWith(req, true);
  });

  it('should handle errors in orchestrationSpecificAccessRequest', async () => {
    sandbox.restore();

    // Set up successful AM role creation
    const postSpy = sandbox.stub(http, 'post');
    postSpy.onCall(0).resolves({
      data: {
        roleAssignmentResponse: {
          roleRequest: { id: 'test-id' },
          requestedRoles: [{
            id: 'roleId123',
            roleCategory: 'JUDICIAL',
            attributes: {
              caseId: 101,
              jurisdiction: 'jurisdiction',
              caseType: 'caseType'
            }
          }]
        }
      },
      status: 201
    });
    postSpy.onCall(1).resolves({ status: 204 });

    const testError = new Error('Unexpected error');
    sandbox.stub(user, 'refreshRoleAssignmentForUser').rejects(testError);

    req.session = {
      passport: {
        user: {
          userinfo: {
            id: 'userId123'
          }
        }
      }
    };

    const result = await orchestrationSpecificAccessRequest(req, res, next);

    expect(next).to.have.been.calledWith(testError);
    expect(result).to.deep.equal(testError);
  });
});

describe('specificAccessRequestCreateAmRole', () => {
  let sandbox: sinon.SinonSandbox;
  let res;
  let req;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    res = mockRes();
    req = mockReq({
      body: { roleRequest: { id: 'test123' } },
      headers: { accept: 'application/json' }
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should create AM role successfully', async () => {
    const mockResponse = { data: { id: 'created123' }, status: 201 };
    sandbox.stub(http, 'post').resolves(mockResponse);

    const response = await specificAccessRequestCreateAmRole(req, res);

    expect(response).to.deep.equal(mockResponse);
  });

  it('should handle errors when creating AM role', async () => {
    const error = new Error('Failed to create role');
    (error as any).status = 400;
    sandbox.stub(http, 'post').rejects(error);

    await specificAccessRequestCreateAmRole(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.send).to.have.been.calledWith(error);
  });
});

describe('getTaskType', () => {
  it('should return correct task type for CTSC role category', () => {
    expect(getTaskType('CTSC')).to.deep.equal('reviewSpecificAccessRequestCTSC');
  });

  it('should return undefined for unknown role category', () => {
    expect(getTaskType('UNKNOWN')).to.be.undefined;
  });
});

describe('orchestrationRequestMoreInformation', () => {
  let sandbox: sinon.SinonSandbox;
  let res;
  let req;
  let next;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    res = mockRes();
    req = mockReq({});
    next = sandbox.stub();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should handle successful request for more information', async () => {
    const mockDenyRoleResponse = {
      status: 201,
      data: {
        roleAssignmentResponse: {
          requestedRoles: [
            { id: 'role1', roleName: 'specific-access-denied' }
          ]
        }
      },
      statusText: 'Created',
      headers: {},
      config: {}
    } as any;

    const mockTaskResponse = { status: 204, data: {}, statusText: 'No Content', headers: {}, config: {} } as any;

    sandbox.stub(roleAccess, 'createSpecificAccessDenyRole').resolves(mockDenyRoleResponse);
    sandbox.stub(roleAccess, 'deleteSpecificAccessRequestedRole').resolves({ status: 204, data: null, statusText: 'No Content', headers: {}, config: {} } as any);
    sandbox.stub(workAllocation, 'postTaskCompletionForAccess').resolves(mockTaskResponse);
    sandbox.stub(lau, 'logAccessRequest').resolves();

    const result = await orchestrationRequestMoreInformation(req, res, next);

    expect(res.send).to.have.been.calledWith({});
    expect(res.status).to.have.been.calledWith(204);
  });

  it('should handle non-201 response from createSpecificAccessDenyRole', async () => {
    const mockResponse = { status: 400, data: 'Bad request', statusText: 'Bad Request', headers: {}, config: {} } as any;
    sandbox.stub(roleAccess, 'createSpecificAccessDenyRole').resolves(mockResponse);

    const result = await orchestrationRequestMoreInformation(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
  });

  it('should handle null response from createSpecificAccessDenyRole', async () => {
    sandbox.stub(roleAccess, 'createSpecificAccessDenyRole').resolves(null);

    const result = await orchestrationRequestMoreInformation(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
  });

  it('should handle failed deletion of requested role', async () => {
    const mockDenyRoleResponse = {
      status: 201,
      data: {
        roleAssignmentResponse: {
          requestedRoles: [
            { id: 'role1', roleName: 'specific-access-denied' }
          ]
        }
      },
      statusText: 'Created',
      headers: {},
      config: {}
    } as any;

    const mockDeleteResponse = { status: 500, data: 'Delete failed', statusText: 'Internal Server Error', headers: {}, config: {} } as any;

    sandbox.stub(roleAccess, 'createSpecificAccessDenyRole').resolves(mockDenyRoleResponse);
    sandbox.stub(roleAccess, 'deleteSpecificAccessRequestedRole').resolves(mockDeleteResponse);
    const deleteSpecificAccessRolesStub = sandbox.stub(accessManagement, 'deleteSpecificAccessRoles').resolves(res);

    await orchestrationRequestMoreInformation(req, res, next);

    expect(deleteSpecificAccessRolesStub).to.have.been.calledWith(
      req, res, next, mockDeleteResponse, mockDenyRoleResponse.data.roleAssignmentResponse.requestedRoles
    );
  });

  it('should handle failed task completion', async () => {
    const mockDenyRoleResponse = {
      status: 201,
      data: {
        roleAssignmentResponse: {
          requestedRoles: [
            { id: 'role1', roleName: 'specific-access-denied' }
          ]
        }
      },
      statusText: 'Created',
      headers: {},
      config: {}
    } as any;

    const mockTaskResponse = { status: 500, data: 'Task completion failed', statusText: 'Internal Server Error', headers: {}, config: {} } as any;

    sandbox.stub(roleAccess, 'createSpecificAccessDenyRole').resolves(mockDenyRoleResponse);
    sandbox.stub(roleAccess, 'deleteSpecificAccessRequestedRole').resolves({ status: 204, data: null, statusText: 'No Content', headers: {}, config: {} } as any);
    sandbox.stub(workAllocation, 'postTaskCompletionForAccess').resolves(mockTaskResponse);
    const restoreDeletedRoleStub = sandbox.stub(accessManagement, 'restoreDeletedRole').resolves(res);

    await orchestrationRequestMoreInformation(req, res, next);

    expect(restoreDeletedRoleStub).to.have.been.calledWith(
      req, res, next, mockTaskResponse, mockDenyRoleResponse.data.roleAssignmentResponse.requestedRoles
    );
  });

  it('should handle and throw errors', async () => {
    const error = new Error('Unexpected error');
    (error as any).status = 500;
    (error as any).statusText = 'Internal Server Error';
    (error as any).data = { message: 'Error details' };

    sandbox.stub(roleAccess, 'createSpecificAccessDenyRole').rejects(error);

    try {
      await orchestrationRequestMoreInformation(req, res, next);
      expect.fail('Should have thrown an error');
    } catch (e) {
      expect(e).to.deep.equal(error);
    }
  });
});

describe('specificAccessRequestUpdateAttributes', () => {
  let sandbox: sinon.SinonSandbox;
  let res;
  let req;
  let next;
  let spyDelete: any;
  let postSpy: any;
  const basePath = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
  const data = {
    roleAssignmentResponse: [{
      id: '37cb4517-20b7-4709-adea-472986e78088',
      roleName: 'specific-access-granted'
    }]
  };
  const data1 = {
    roleAssignmentResponse: [{
      id: '37cb4517-20b7-4709-adea-472986e78089',
      roleName: 'specific-access-ctsc'
    }]
  };
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    res = mockRes();
    req = mockReq({
      params: {}
    });
    req.session = {
      passport: {
        user: {
          userinfo: {
            id: 'someId'
          }
        }
      }
    };
    next = sandbox.stub();
    postSpy = sandbox.stub(http, 'post');
    postSpy.onCall(0).resolves({
      data, status: 201
    });
    postSpy.onCall(1).resolves({
      data1, status: 201
    });
    spyDelete = sinon.stub(http, 'delete').callsFake(() => {
      return Promise.resolve(res);
    });
  });

  afterEach(() => {
    postSpy.restore();
    spyDelete.restore();
    sandbox.restore();
  });

  it('should call delete successfully', async () => {
    await specificAccessRequestUpdateAttributes(req, res, next);
    expect(spyDelete).to.be.calledWith(`${basePath}/am/role-assignments/37cb4517-20b7-4709-adea-472986e78088`);
  });

  it('should not call delete', async () => {
    await specificAccessRequestUpdateAttributes(req, res, next);
    expect(spyDelete).not.to.be.calledWith(`${basePath}/am/role-assignments/37cb4517-20b7-4709-adea-472986e78089`);
  });

  it('should handle specific-access-denied role', async () => {
    const deniedData = {
      roleAssignmentResponse: [{
        id: '37cb4517-20b7-4709-adea-472986e78090',
        roleName: 'specific-access-denied',
        attributes: {
          specificAccessReason: { reason: 'Test reason' },
          requestedRole: 'case-worker'
        }
      }]
    };

    req.body = {
      caseId: 'case123',
      attributesToUpdate: {
        isNew: true
      }
    };

    postSpy.restore();
    spyDelete.restore();

    postSpy = sandbox.stub(http, 'post');
    postSpy.onCall(0).resolves({ data: deniedData, status: 200 });
    postSpy.onCall(1).resolves({ status: 201 });

    const refreshStub = sandbox.stub(user, 'refreshRoleAssignmentForUser').resolves();

    await specificAccessRequestUpdateAttributes(req, res, next);

    expect(postSpy).to.have.been.calledTwice;
    const secondCall = postSpy.getCall(1);
    const roleAssignmentUpdate = secondCall.args[1];

    expect(roleAssignmentUpdate.roleRequest.assignerId).to.equal('someId');
    expect(roleAssignmentUpdate.roleRequest.process).to.equal('specific-access');
    expect(roleAssignmentUpdate.roleRequest.reference).to.equal('case123/case-worker/someId');
    expect(roleAssignmentUpdate.requestedRoles[0].attributes.isNew).to.be.true;
    expect(roleAssignmentUpdate.requestedRoles[0].notes).to.exist;
    expect(refreshStub).to.have.been.called;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.send).to.have.been.calledWith([]);
  });

  it('should use uid when id is not available', async () => {
    req.session.passport.user.userinfo = { uid: 'uidValue' };
    req.body = { caseId: 'case123' };

    postSpy.restore();
    postSpy = sandbox.stub(http, 'post');
    postSpy.onCall(0).resolves({ data, status: 200 });

    await specificAccessRequestUpdateAttributes(req, res, next);

    const queryCall = postSpy.getCall(0);
    expect(queryCall.args[1].actorId).to.deep.equal(['uidValue']);
  });

  it('should handle errors in specificAccessRequestUpdateAttributes', async () => {
    const error = new Error('Query failed');
    postSpy.restore();
    sandbox.stub(http, 'post').rejects(error);

    await specificAccessRequestUpdateAttributes(req, res, next);

    expect(next).to.have.been.calledWith(error);
  });
});
