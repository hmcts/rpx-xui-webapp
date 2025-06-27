import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import * as httpModule from '../lib/http';
import * as proxy from '../lib/proxy';
import * as configuration from '../configuration';
import * as userModule from '../user';
import * as roleAssignmentService from './roleAssignmentService';
import * as exclusionService from './exclusionService';
import * as refDataUtils from '../ref-data/ref-data-utils';
import * as crudService from '../common/crudService';
import * as dtos from './dtos/to-role-assignment-dto';
import * as index from './index';
import * as workAllocationUtil from '../workAllocation/util';
import { RoleCategory } from './models/allocate-role.enum';
import { Role, RefinedRole } from './models/roleType';
import { AxiosResponse, AxiosHeaders } from 'axios';

chai.use(sinonChai);

describe('roleAccess/index', () => {
  let sandbox: sinon.SinonSandbox;
  let req: any;
  let res: any;
  let next: sinon.SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = mockReq({ body: {}, session: { passport: { user: { userinfo: { id: 'user1', roleCategory: 'ADMIN' } } } } });
    res = mockRes();
    next = sandbox.stub();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getRolesByCaseId', () => {
    it('should return mapped roles', async () => {
      sandbox.stub(configuration, 'getConfigValue').returns('base');
      sandbox.stub(proxy, 'setHeaders').returns({});
      sandbox.stub(httpModule.http, 'post').resolves({ status: 200, data: { roleAssignmentResponse: [{ id: '1', actorId: 'a', roleName: 'r', roleCategory: 'ADMIN' }] } });
      sandbox.stub(index, 'mapResponseToCaseRoles').returns([{ roleName: 'r', roleId: 'r', roleCategory: RoleCategory.ADMIN, actions: [], actorId: 'a', email: '', end: '', id: '1', location: null, name: '', start: '' }]);
      sandbox.stub(roleAssignmentService, 'getSubstantiveRoles').resolves([{ roleCategory: RoleCategory.ADMIN, roleId: 'r', roleName: 'r', roleJurisdiction: { mandatory: false, values: [] } } as RefinedRole]);
      req.body = { caseId: 'c', jurisdiction: 'j', caseType: 't' };
      await index.getRolesByCaseId(req, res, next);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.called;
    });
    it('should return mapped roles using real mapResponseToCaseRoles', async () => {
      sandbox.stub(configuration, 'getConfigValue').returns('base');
      sandbox.stub(proxy, 'setHeaders').returns({});
      sandbox.stub(httpModule.http, 'post').resolves({ status: 200, data: { roleAssignmentResponse: [{ id: '1', actorId: 'a', roleName: 'r', roleCategory: 'ADMIN', attributes: {} }] } });
      sandbox.stub(roleAssignmentService, 'getSubstantiveRoles').resolves([{ roleCategory: RoleCategory.ADMIN, roleId: 'r', roleName: 'r', roleJurisdiction: { mandatory: false, values: [] } } as RefinedRole]);
      sandbox.stub(exclusionService, 'getEmail').returns('test@email');
      sandbox.stub(exclusionService, 'getUserName').returns('Test User');
      sandbox.stub(exclusionService, 'mapRoleCategory').returns(RoleCategory.ADMIN);
      req.body = { caseId: 'c', jurisdiction: 'j', caseType: 't' };
      await index.getRolesByCaseId(req, res, next);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWithMatch((roles) => roles[0].roleName === 'r' && roles[0].email === 'test@email' && roles[0].name === 'Test User');
    });
  });

  describe('getAccessRoles', () => {
    it('should return mapped roles using real mapResponseToCaseRoles', async () => {
      sandbox.stub(configuration, 'getConfigValue').returns('base');
      sandbox.stub(proxy, 'setHeaders').returns({});
      sandbox.stub(httpModule.http, 'post').resolves({ status: 200, data: { roleAssignmentResponse: [{ id: '1', actorId: 'a', roleName: 'r', roleCategory: 'ADMIN', attributes: {} }] } });
      sandbox.stub(exclusionService, 'getEmail').returns('test@email');
      sandbox.stub(exclusionService, 'getUserName').returns('Test User');
      sandbox.stub(exclusionService, 'mapRoleCategory').returns(RoleCategory.ADMIN);
      req.body = { caseId: 'c', jurisdiction: 'j', caseType: 't' };
      await index.getAccessRoles(req, res, next);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWithMatch((roles) => roles[0].roleName === 'r' && roles[0].email === 'test@email' && roles[0].name === 'Test User');
    });
  });

  describe('getAccessRolesByCaseId', () => {
    it('should filter out PROFESSIONAL roles using real mapResponseToCaseRoles', async () => {
      sandbox.stub(configuration, 'getConfigValue').returns('base');
      sandbox.stub(proxy, 'setHeaders').returns({});
      sandbox.stub(httpModule.http, 'post').resolves({ status: 200, data: { roleAssignmentResponse: [
        { id: '1', actorId: 'a', roleName: 'r', roleCategory: 'ADMIN', attributes: {} },
        { id: '2', actorId: 'b', roleName: 'p', roleCategory: 'PROFESSIONAL', attributes: {} }
      ] } });
      sandbox.stub(roleAssignmentService, 'getAllRoles').resolves({ status: 200, data: [
        { name: 'r', label: 'Role Label', description: '', category: '', substantive: false, patterns: [] },
        { name: 'p', label: 'Professional', description: '', category: '', substantive: false, patterns: [] }
      ] as Role[], statusText: '', headers: {}, config: { headers: new AxiosHeaders() } });
      sandbox.stub(exclusionService, 'getEmail').returns('test@email');
      sandbox.stub(exclusionService, 'getUserName').returns('Test User');
      sandbox.stub(exclusionService, 'mapRoleCategory').callsFake((cat) => cat === 'PROFESSIONAL' ? RoleCategory.PROFESSIONAL : RoleCategory.ADMIN);
      req.body = { caseId: 'c', assignmentId: '1' };
      await index.getAccessRolesByCaseId(req, res, next);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWithMatch((roles) => Array.isArray(roles) && roles.every(r => r.roleCategory !== 'PROFESSIONAL'));
    });
  });

  describe('getJudicialUsers', () => {
    it('should return empty array if no userIds', async () => {
      req.body = { userIds: [] };
      await index.getJudicialUsers(req, res, next);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith([]);
    });
    it('should call next on error', async () => {
      req.body = { userIds: ['u'], services: ['s'] };
      sandbox.stub(refDataUtils, 'getServiceRefDataMappingList').returns([{ service: 's', serviceCodes: ['sc'] }]);
      sandbox.stub(exclusionService, 'getJudicialUsersFromApi').throws();
      await index.getJudicialUsers(req, res, next);
      expect(next).to.have.been.called;
    });
    it('should return judicial users using real logic', async () => {
      req.body = { userIds: ['u1', 'u2'], services: ['s'] };
      sandbox.stub(refDataUtils, 'getServiceRefDataMappingList').returns([{ service: 's', serviceCodes: ['sc'] }]);
      sandbox.stub(exclusionService, 'getJudicialUsersFromApi').resolves({
        status: 200,
        statusText: '',
        headers: {},
        config: { headers: new AxiosHeaders() },
        data: [{
          title: 'Judge',
          knownAs: 'Judge 1',
          full_name: 'Judge 1',
          sidam_id: 'u1',
          email_id: 'judge1@email'
        }]
      });
      await index.getJudicialUsers(req, res, next);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWithMatch((users) => Array.isArray(users) && users[0].sidam_id === 'u1');
    });
  });

  describe('getMyAccessNewCount', () => {
    it('should return count of new assignments using real logic', async () => {
      req.session.roleAssignmentResponse = [{ isNew: true }, { isNew: false }];
      sandbox.stub(userModule, 'refreshRoleAssignmentForUser').resolves();
      sandbox.stub(workAllocationUtil, 'getMyAccessMappedCaseList').resolves([
        {
          id: '1',
          case_name: '',
          case_id: '',
          case_category: '',
          case_role: '',
          role_category: '',
          jurisdiction: '',
          location_id: '',
          startDate: '',
          endDate: '',
          assignee: '',
          isNew: true
        },
        {
          id: '2',
          case_name: '',
          case_id: '',
          case_category: '',
          case_role: '',
          role_category: '',
          jurisdiction: '',
          location_id: '',
          startDate: '',
          endDate: '',
          assignee: '',
          isNew: false
        }
      ]);
      await index.getMyAccessNewCount(req, res, next);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith({ count: 1 });
    });
    it('should call next on error', async () => {
      sandbox.stub(userModule, 'refreshRoleAssignmentForUser').throws();
      await index.getMyAccessNewCount(req, res, next);
      expect(next).to.have.been.called;
    });
  });

  describe('manageLabellingRoleAssignment', () => {
    it('should return 204 if no challengedAccessRequest using real logic', async () => {
      req.session.roleAssignmentResponse = [{ attributes: { caseId: 'x' } }];
      req.params = { caseId: 'y' };
      sandbox.stub(userModule, 'refreshRoleAssignmentForUser').resolves();
      await index.manageLabellingRoleAssignment(req, res, next);
      expect(res.status).to.have.been.calledWith(204);
    });
    it('should return 200 if challengedAccessRequest found using real logic', async () => {
      req.session.roleAssignmentResponse = [{ id: '1', attributes: { caseId: 'x', isNew: true } }];
      req.params = { caseId: 'x' };
      sandbox.stub(userModule, 'refreshRoleAssignmentForUser').resolves();
      await index.manageLabellingRoleAssignment(req, res, next);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith({ id: '1' });
    });
    it('should call next on error', async () => {
      sandbox.stub(userModule, 'refreshRoleAssignmentForUser').throws();
      await index.manageLabellingRoleAssignment(req, res, next);
      expect(next).to.have.been.called;
    });
  });

  describe('mapResponseToCaseRoles', () => {
    it('should map role assignments to case roles using real logic', () => {
      const reqMock = mockReq({});
      const roleAssignments = [{ id: '1', actorId: 'a', roleName: 'r', roleCategory: 'ADMIN', attributes: {} }];
      sandbox.stub(exclusionService, 'getEmail').returns('email');
      sandbox.stub(exclusionService, 'getUserName').returns('name');
      sandbox.stub(exclusionService, 'mapRoleCategory').returns(RoleCategory.ADMIN);
      const result = index.mapResponseToCaseRoles(roleAssignments, null, reqMock);
      expect(result[0].roleName).to.equal('r');
      expect(result[0].email).to.equal('email');
      expect(result[0].name).to.equal('name');
    });
    it('should filter by assignmentId using real logic', () => {
      const reqMock = mockReq({});
      const roleAssignments = [
        { id: '1', actorId: 'a', roleName: 'r', roleCategory: 'ADMIN', attributes: {} },
        { id: '2', actorId: 'b', roleName: 's', roleCategory: 'ADMIN', attributes: {} }
      ];
      sandbox.stub(exclusionService, 'getEmail').returns('email');
      sandbox.stub(exclusionService, 'getUserName').returns('name');
      sandbox.stub(exclusionService, 'mapRoleCategory').returns(RoleCategory.ADMIN);
      const result = index.mapResponseToCaseRoles(roleAssignments, '2', reqMock);
      expect(result.length).to.equal(1);
      expect(result[0].id).to.equal('2');
    });
  });

  describe('confirmAllocateRole', () => {
    it('should send post and return response using real logic', async () => {
      sandbox.stub(dtos, 'toRoleAssignmentBody').returns({ roleRequest: { assignerId: 'id', replaceExisting: false }, requestedRoles: [] });
      sandbox.stub(crudService, 'sendPost').resolves({ status: 200, data: {}, statusText: '', headers: {}, config: {} } as AxiosResponse);
      sandbox.stub(userModule, 'refreshRoleAssignmentForUser').resolves();
      await index.confirmAllocateRole(req, res, next);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.called;
    });
    it('should call next on error', async () => {
      sandbox.stub(dtos, 'toRoleAssignmentBody').throws();
      await index.confirmAllocateRole(req, res, next);
      expect(next).to.have.been.called;
    });
  });

  describe('getSpecificReason', () => {
    it('should return note if not JSON', () => {
      expect(index.getSpecificReason('reason')).to.equal('reason');
    });
    it('should parse JSON and return specificReason', () => {
      expect(index.getSpecificReason('{"specificReason":"abc"}')).to.equal('abc');
    });
  });

});
