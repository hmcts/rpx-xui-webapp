import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { http } from '../lib/http';
import * as proxy from '../lib/proxy';
import * as configuration from '../configuration';
import * as user from '../user';
import * as lau from '../services/lau';
import { SERVICES_ROLE_ASSIGNMENT_API_PATH } from '../configuration/references';
import { challengedAccessRouter, challengedAccessUpdateAttributes } from './';

// Import sinon-chai using require to avoid ES module issues
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('Challenged Access', (): void => {
  let sandbox: sinon.SinonSandbox;
  let res;
  let req;
  let next: sinon.SinonStub;
  let httpPostStub: sinon.SinonStub;
  let setHeadersStub: sinon.SinonStub;
  let getConfigValueStub: sinon.SinonStub;
  let refreshRoleAssignmentForUserStub: sinon.SinonStub;
  let logAccessRequestStub: sinon.SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    next = sandbox.stub();
    httpPostStub = sandbox.stub(http, 'post');
    setHeadersStub = sandbox.stub(proxy, 'setHeaders');
    getConfigValueStub = sandbox.stub(configuration, 'getConfigValue');
    refreshRoleAssignmentForUserStub = sandbox.stub(user, 'refreshRoleAssignmentForUser');
    logAccessRequestStub = sandbox.stub(lau, 'logAccessRequest');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('challengedAccessRouter', () => {
    beforeEach(() => {
      req = mockReq({
        body: {
          actorId: 'user-123',
          roleType: 'CASE',
          roleName: 'case-manager',
          classification: 'PUBLIC',
          grantType: 'SPECIFIC',
          roleCategory: 'LEGAL_OPERATIONS',
          readOnly: false,
          beginTime: '2024-01-01T00:00:00Z',
          endTime: '2024-12-31T23:59:59Z',
          attributes: {
            caseId: 'case-123',
            accessReason: 'urgent review required'
          }
        },
        session: {
          passport: {
            user: {
              userinfo: {
                id: 'user-123',
                uid: 'user-123',
                email: 'test@example.com'
              }
            }
          }
        }
      });
      res = mockRes();
      getConfigValueStub.withArgs(SERVICES_ROLE_ASSIGNMENT_API_PATH).returns('http://role-assignment-api');
      setHeadersStub.returns({
        'content-type': 'application/json',
        'accept': 'application/json',
        'authorization': 'Bearer token'
      });
    });

    it('should successfully create role assignment and return response', async () => {
      const mockResponse = {
        status: 201,
        data: {
          roleAssignmentResponse: {
            requestedRoles: [{
              id: 'role-123',
              actorIdType: 'IDAM',
              actorId: 'user-123',
              roleType: 'CASE',
              roleName: 'case-manager',
              classification: 'PUBLIC',
              grantType: 'SPECIFIC',
              roleCategory: 'LEGAL_OPERATIONS',
              readOnly: false,
              beginTime: '2024-01-01T00:00:00Z',
              endTime: '2024-12-31T23:59:59Z',
              attributes: {
                caseId: 'case-123',
                accessReason: 'urgent review required'
              }
            }]
          }
        }
      };

      httpPostStub.resolves(mockResponse);
      refreshRoleAssignmentForUserStub.resolves();

      await challengedAccessRouter(req, res, next);

      expect(getConfigValueStub).to.have.been.calledWith(SERVICES_ROLE_ASSIGNMENT_API_PATH);
      expect(setHeadersStub).to.have.been.calledWith(req);
      expect(httpPostStub).to.have.been.calledOnce;
      expect(httpPostStub.firstCall.args[0]).to.equal('http://role-assignment-api/am/role-assignments');
      expect(httpPostStub.firstCall.args[1]).to.deep.equal(req.body);

      // Verify accept header was removed
      const headers = httpPostStub.firstCall.args[2].headers;
      expect(headers).to.not.have.property('accept');
      expect(headers).to.have.property('content-type', 'application/json');
      expect(headers).to.have.property('authorization', 'Bearer token');

      expect(refreshRoleAssignmentForUserStub).to.have.been.calledWith(
        req.session.passport.user.userinfo,
        req
      );
      expect(logAccessRequestStub).to.have.been.calledWith(req, true);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.send).to.have.been.calledWith(mockResponse.data);
      expect(next).to.not.have.been.called;
    });

    it('should handle HTTP 200 response successfully', async () => {
      const mockResponse = {
        status: 200,
        data: {
          roleAssignmentResponse: {
            requestedRoles: []
          }
        }
      };

      httpPostStub.resolves(mockResponse);
      refreshRoleAssignmentForUserStub.resolves();

      await challengedAccessRouter(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(mockResponse.data);
      expect(next).to.not.have.been.called;
    });

    it('should handle errors from HTTP request and call next', async () => {
      const error = new Error('Role assignment service unavailable');
      httpPostStub.rejects(error);

      await challengedAccessRouter(req, res, next);

      expect(next).to.have.been.calledWith(error);
      expect(res.status).to.not.have.been.called;
      expect(res.send).to.not.have.been.called;
      expect(refreshRoleAssignmentForUserStub).to.not.have.been.called;
      expect(logAccessRequestStub).to.not.have.been.called;
    });

    it('should handle errors from refreshRoleAssignmentForUser and call next', async () => {
      const mockResponse = {
        status: 201,
        data: { roleAssignmentResponse: {} }
      };
      const refreshError = new Error('Failed to refresh role assignments');

      httpPostStub.resolves(mockResponse);
      refreshRoleAssignmentForUserStub.rejects(refreshError);

      await challengedAccessRouter(req, res, next);

      expect(httpPostStub).to.have.been.calledOnce;
      expect(refreshRoleAssignmentForUserStub).to.have.been.calledOnce;
      expect(next).to.have.been.calledWith(refreshError);
      expect(res.status).to.not.have.been.called;
      expect(res.send).to.not.have.been.called;
    });

    it('should remove accept header from request headers', async () => {
      const headersWithAccept = {
        'content-type': 'application/json',
        'accept': 'application/json',
        'authorization': 'Bearer token'
      };
      setHeadersStub.returns(headersWithAccept);
      httpPostStub.resolves({ status: 201, data: {} });
      refreshRoleAssignmentForUserStub.resolves();

      await challengedAccessRouter(req, res, next);

      expect(headersWithAccept).to.not.have.property('accept');
      expect(headersWithAccept).to.have.property('content-type');
      expect(headersWithAccept).to.have.property('authorization');
    });

    it('should handle missing config value', async () => {
      getConfigValueStub.withArgs(SERVICES_ROLE_ASSIGNMENT_API_PATH).returns(undefined);

      await challengedAccessRouter(req, res, next);

      expect(httpPostStub.firstCall.args[0]).to.equal('undefined/am/role-assignments');
    });

    it('should call logAccessRequest as fire and forget', async () => {
      const mockResponse = { status: 201, data: {} };
      httpPostStub.resolves(mockResponse);
      refreshRoleAssignmentForUserStub.resolves();

      await challengedAccessRouter(req, res, next);

      expect(logAccessRequestStub).to.have.been.calledWith(req, true);
      // Verify it's called but we don't await it
      expect(logAccessRequestStub.callCount).to.equal(1);
    });
  });

  describe('challengedAccessUpdateAttributes', () => {
    let mockRoleAssignment;

    beforeEach(() => {
      mockRoleAssignment = {
        id: 'role-assignment-123',
        actorIdType: 'IDAM',
        actorId: 'user-123',
        roleType: 'CASE',
        roleName: 'case-manager',
        classification: 'PUBLIC',
        grantType: 'SPECIFIC',
        roleCategory: 'LEGAL_OPERATIONS',
        readOnly: false,
        beginTime: '2024-01-01T00:00:00Z',
        endTime: '2024-12-31T23:59:59Z',
        attributes: {
          caseId: 'case-123',
          jurisdiction: 'IA',
          caseType: 'Asylum'
        }
      };

      req = mockReq({
        body: {
          caseId: 'case-123',
          attributesToUpdate: {
            accessReason: 'urgent review required',
            requestedRole: 'case-manager'
          }
        },
        session: {
          passport: {
            user: {
              userinfo: {
                id: 'user-123',
                uid: 'user-123',
                email: 'test@example.com'
              }
            }
          }
        }
      });
      res = mockRes();
      getConfigValueStub.withArgs(SERVICES_ROLE_ASSIGNMENT_API_PATH).returns('http://role-assignment-api');
      setHeadersStub.returns({
        'content-type': 'application/json',
        'accept': 'application/json',
        'authorization': 'Bearer token'
      });
    });

    it('should successfully update role assignment attributes using user id', async () => {
      const queryResponse = {
        status: 200,
        data: {
          roleAssignmentResponse: [{ ...mockRoleAssignment }]
        }
      };

      const updateResponse = {
        status: 200,
        data: {
          roleAssignmentResponse: {
            requestedRoles: [mockRoleAssignment]
          }
        }
      };

      httpPostStub.onFirstCall().resolves(queryResponse);
      httpPostStub.onSecondCall().resolves(updateResponse);
      refreshRoleAssignmentForUserStub.resolves();

      await challengedAccessUpdateAttributes(req, res, next);

      // Verify query call
      expect(httpPostStub.firstCall.args[0]).to.equal('http://role-assignment-api/am/role-assignments/query');
      expect(httpPostStub.firstCall.args[1]).to.deep.equal({
        actorId: ['user-123'],
        attributes: {
          caseId: ['case-123']
        }
      });

      // Verify update call
      expect(httpPostStub.secondCall.args[0]).to.equal('http://role-assignment-api/am/role-assignments');

      const updatePayload = httpPostStub.secondCall.args[1];
      expect(updatePayload.roleRequest.assignerId).to.equal('user-123');
      expect(updatePayload.roleRequest.process).to.equal('challenged-access');
      expect(updatePayload.roleRequest.reference).to.equal('case-123/case-manager/user-123');
      expect(updatePayload.roleRequest.replaceExisting).to.be.true;

      const updatedRole = updatePayload.requestedRoles[0];
      expect(updatedRole).to.not.have.property('id');
      expect(updatedRole.attributes).to.deep.equal({
        caseId: 'case-123',
        jurisdiction: 'IA',
        caseType: 'Asylum',
        accessReason: 'urgent review required',
        requestedRole: 'case-manager'
      });
      expect(updatedRole.notes).to.have.length(1);
      expect(updatedRole.notes[0].userId).to.equal('user-123');
      expect(updatedRole.notes[0].comment).to.equal('urgent review required');
      expect(updatedRole.notes[0].time).to.be.instanceOf(Date);

      expect(refreshRoleAssignmentForUserStub).to.have.been.calledWith(
        req.session.passport.user.userinfo,
        req
      );
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(updateResponse.data);
      expect(next).to.not.have.been.called;
    });

    it('should successfully update role assignment attributes using user uid when id is not available', async () => {
      req.session.passport.user.userinfo = {
        uid: 'user-uid-456',
        email: 'test@example.com'
      };

      const queryResponse = {
        status: 200,
        data: {
          roleAssignmentResponse: [{ ...mockRoleAssignment, actorId: 'user-uid-456' }]
        }
      };

      const updateResponse = {
        status: 200,
        data: { roleAssignmentResponse: {} }
      };

      httpPostStub.onFirstCall().resolves(queryResponse);
      httpPostStub.onSecondCall().resolves(updateResponse);
      refreshRoleAssignmentForUserStub.resolves();

      await challengedAccessUpdateAttributes(req, res, next);

      // Verify query uses uid
      expect(httpPostStub.firstCall.args[1].actorId).to.deep.equal(['user-uid-456']);

      // Verify update uses uid
      const updatePayload = httpPostStub.secondCall.args[1];
      expect(updatePayload.roleRequest.assignerId).to.equal('user-uid-456');
      expect(updatePayload.roleRequest.reference).to.equal('case-123/case-manager/user-uid-456');
    });

    it('should handle query errors and call next', async () => {
      const error = new Error('Query failed');
      httpPostStub.onFirstCall().rejects(error);

      await challengedAccessUpdateAttributes(req, res, next);

      expect(httpPostStub).to.have.been.calledOnce;
      expect(next).to.have.been.calledWith(error);
      expect(res.status).to.not.have.been.called;
      expect(res.send).to.not.have.been.called;
      expect(refreshRoleAssignmentForUserStub).to.not.have.been.called;
    });

    it('should handle update errors and call next', async () => {
      const queryResponse = {
        status: 200,
        data: {
          roleAssignmentResponse: [{ ...mockRoleAssignment }]
        }
      };
      const updateError = new Error('Update failed');

      httpPostStub.onFirstCall().resolves(queryResponse);
      httpPostStub.onSecondCall().rejects(updateError);

      await challengedAccessUpdateAttributes(req, res, next);

      expect(httpPostStub).to.have.been.calledTwice;
      expect(next).to.have.been.calledWith(updateError);
      expect(res.status).to.not.have.been.called;
      expect(res.send).to.not.have.been.called;
      expect(refreshRoleAssignmentForUserStub).to.not.have.been.called;
    });

    it('should handle errors from refreshRoleAssignmentForUser and call next', async () => {
      const queryResponse = {
        status: 200,
        data: {
          roleAssignmentResponse: [{ ...mockRoleAssignment }]
        }
      };
      const updateResponse = {
        status: 200,
        data: { roleAssignmentResponse: {} }
      };
      const refreshError = new Error('Refresh failed');

      httpPostStub.onFirstCall().resolves(queryResponse);
      httpPostStub.onSecondCall().resolves(updateResponse);
      refreshRoleAssignmentForUserStub.rejects(refreshError);

      await challengedAccessUpdateAttributes(req, res, next);

      expect(httpPostStub).to.have.been.calledTwice;
      expect(refreshRoleAssignmentForUserStub).to.have.been.calledOnce;
      expect(next).to.have.been.calledWith(refreshError);
      expect(res.status).to.not.have.been.called;
      expect(res.send).to.not.have.been.called;
    });

    it('should remove accept header from request headers', async () => {
      const headersWithAccept = {
        'content-type': 'application/json',
        'accept': 'application/json',
        'authorization': 'Bearer token'
      };
      setHeadersStub.returns(headersWithAccept);

      const queryResponse = {
        status: 200,
        data: {
          roleAssignmentResponse: [{ ...mockRoleAssignment }]
        }
      };
      const updateResponse = { status: 200, data: {} };

      httpPostStub.onFirstCall().resolves(queryResponse);
      httpPostStub.onSecondCall().resolves(updateResponse);
      refreshRoleAssignmentForUserStub.resolves();

      await challengedAccessUpdateAttributes(req, res, next);

      expect(headersWithAccept).to.not.have.property('accept');
      expect(headersWithAccept).to.have.property('content-type');
      expect(headersWithAccept).to.have.property('authorization');
    });

    it('should handle HTTP 201 response from update successfully', async () => {
      const queryResponse = {
        status: 200,
        data: {
          roleAssignmentResponse: [{ ...mockRoleAssignment }]
        }
      };
      const updateResponse = {
        status: 201,
        data: {
          roleAssignmentResponse: {
            requestedRoles: [mockRoleAssignment]
          }
        }
      };

      httpPostStub.onFirstCall().resolves(queryResponse);
      httpPostStub.onSecondCall().resolves(updateResponse);
      refreshRoleAssignmentForUserStub.resolves();

      await challengedAccessUpdateAttributes(req, res, next);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.send).to.have.been.calledWith(updateResponse.data);
    });

    it('should properly merge existing and new attributes', async () => {
      const roleWithExistingAttrs = {
        ...mockRoleAssignment,
        attributes: {
          caseId: 'case-123',
          jurisdiction: 'IA',
          caseType: 'Asylum',
          existingAttribute: 'should-remain'
        }
      };

      const queryResponse = {
        status: 200,
        data: {
          roleAssignmentResponse: [roleWithExistingAttrs]
        }
      };
      const updateResponse = { status: 200, data: {} };

      httpPostStub.onFirstCall().resolves(queryResponse);
      httpPostStub.onSecondCall().resolves(updateResponse);
      refreshRoleAssignmentForUserStub.resolves();

      await challengedAccessUpdateAttributes(req, res, next);

      const updatePayload = httpPostStub.secondCall.args[1];
      const updatedRole = updatePayload.requestedRoles[0];

      expect(updatedRole.attributes).to.deep.equal({
        caseId: 'case-123',
        jurisdiction: 'IA',
        caseType: 'Asylum',
        existingAttribute: 'should-remain',
        accessReason: 'urgent review required',
        requestedRole: 'case-manager'
      });
    });

    it('should handle missing config value', async () => {
      getConfigValueStub.withArgs(SERVICES_ROLE_ASSIGNMENT_API_PATH).returns(undefined);

      const queryResponse = {
        status: 200,
        data: {
          roleAssignmentResponse: [{ ...mockRoleAssignment }]
        }
      };

      httpPostStub.onFirstCall().resolves(queryResponse);

      await challengedAccessUpdateAttributes(req, res, next);

      expect(httpPostStub.firstCall.args[0]).to.equal('undefined/am/role-assignments/query');
    });

    it('should handle empty role assignment response', async () => {
      const queryResponse = {
        status: 200,
        data: {
          roleAssignmentResponse: []
        }
      };

      httpPostStub.onFirstCall().resolves(queryResponse);

      await challengedAccessUpdateAttributes(req, res, next);

      expect(next).to.have.been.calledOnce;
      expect(next.firstCall.args[0]).to.be.an('error');
    });

    it('should use current timestamp for notes', async () => {
      const before = new Date();

      const queryResponse = {
        status: 200,
        data: {
          roleAssignmentResponse: [{ ...mockRoleAssignment }]
        }
      };
      const updateResponse = { status: 200, data: {} };

      httpPostStub.onFirstCall().resolves(queryResponse);
      httpPostStub.onSecondCall().resolves(updateResponse);
      refreshRoleAssignmentForUserStub.resolves();

      await challengedAccessUpdateAttributes(req, res, next);

      const after = new Date();
      const updatePayload = httpPostStub.secondCall.args[1];
      const noteTime = updatePayload.requestedRoles[0].notes[0].time;

      expect(noteTime.getTime()).to.be.at.least(before.getTime());
      expect(noteTime.getTime()).to.be.at.most(after.getTime());
    });
  });
});
