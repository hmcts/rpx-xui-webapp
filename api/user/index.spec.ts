import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { LEGAL_OPS_TYPE } from './constants';
import {
  addUserRolesIfUnique,
  extractRoleCategories,
  getActiveRoleAssignments,
  getRoleAssignmentInfo,
  getSyntheticRole,
  getSyntheticRoles,
  getUserDetails,
  getUserRoleAssignments,
  refreshRoleAssignmentForUser,
  setUserRoles
} from './index';
import { RoleAssignment } from './interfaces/roleAssignment';
import { http } from '../lib/http';
import * as proxy from '../lib/proxy';
import * as config from '../configuration';
import * as util from '../lib/util';
import * as appInsights from '../lib/appInsights';
import * as utils from '../utils';
import * as userUtils from './utils';
import * as nodeLib from '@hmcts/rpx-xui-node-lib';

// Import sinon-chai using require to avoid ES module issues
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('Index', () => {
  let roleAssignments: RoleAssignment[];
  let mockUserInfo: any;
  let mockRoleAssignments: RoleAssignment[];
  let mockReqData: any;
  let mockUserId: string;

  beforeEach(() => {
    roleAssignments = [{
      id: '478c83f8-0ed0-4651-b8bf-cd2b1e206ac2',
      actorIdType: 'IDAM',
      actorId: 'c5a983be-ca99-4b8a-97f7-23be33c3fd22',
      roleType: 'ORGANISATION',
      roleName: 'ROLE',
      classification: 'PUBLIC',
      grantType: 'STANDARD',
      roleCategory: LEGAL_OPS_TYPE,
      readOnly: false,
      created: new Date(2021, 9, 8),
      attributes: {
        baseLocation: '231596',
        jurisdiction: 'IA'
      }
    }];
    mockUserInfo = { roles: ['caseworker-test', 'caseworker-test2'], roleCategory: null };
    mockRoleAssignments = [{
      id: '1',
      roleCategory: 'ADMIN',
      roleName: 'test role',
      roleType: 'ORGANISATION',
      attributes: {
        isCaseAllocator: false
      }
    },
    {
      id: '2',
      roleCategory: 'ADMIN',
      roleName: 'test role 2',
      roleType: 'ORGANISATION',
      attributes: {
        isCaseAllocator: false
      }
    },
    {
      id: '3',
      roleCategory: 'ADMIN',
      roleName: 'test role 3',
      roleType: 'UNIMPORTANT',
      attributes: {
        isCaseAllocator: true
      }
    }];
    mockReqData = { session: { roleAssignmentResponse: mockRoleAssignments } };
    mockUserId = '123';
  });

  describe('getActiveRoleAssignments', () => {
    const today = new Date();
    const tomorrow = new Date(today);
    const yesterday = new Date(today);

    it('should return role assignment if end date is empty', async () => {
      const activeRoleAssignments = getActiveRoleAssignments(roleAssignments, new Date());
      expect(activeRoleAssignments.length).to.equal(1);
    });

    it('should return role assignment if end date is tomorrow (not expired)', async () => {
      tomorrow.setDate(tomorrow.getDate() + 1);
      roleAssignments[0].endTime = tomorrow;
      const activeRoleAssignments = getActiveRoleAssignments(roleAssignments, new Date());
      expect(activeRoleAssignments.length).to.equal(1);
    });

    it('should return role assignment if end date is now (not expired)', async () => {
      roleAssignments[0].endTime = today;
      const activeRoleAssignments = getActiveRoleAssignments(roleAssignments, today);
      expect(activeRoleAssignments.length).to.equal(1);
    });

    it('should return role assignment if end date is now (expired)', async () => {
      roleAssignments[0].endTime = today;
      const activeRoleAssignments = getActiveRoleAssignments(roleAssignments, new Date());
      expect(activeRoleAssignments.length).to.equal(0);
    });

    it('should return role assignment if end date is yesterday (expired)', async () => {
      yesterday.setDate(yesterday.getDate() - 1);
      roleAssignments[0].endTime = yesterday;
      const activeRoleAssignments = getActiveRoleAssignments(roleAssignments, new Date());
      expect(activeRoleAssignments.length).to.equal(0);
    });

    const filterDate = new Date(2022, 10, 20);

    it('should return role assignment if end date is empty and filter date 20 Oct 2022', async () => {
      const activeRoleAssignments = getActiveRoleAssignments(roleAssignments, filterDate);
      expect(activeRoleAssignments.length).to.equal(1);
    });

    it('should return role assignment if end date is 20 Oct 2022 filter date 20 Oct 2022', async () => {
      roleAssignments[0].endTime = filterDate;
      const activeRoleAssignments = getActiveRoleAssignments(roleAssignments, filterDate);
      expect(activeRoleAssignments.length).to.equal(1);
    });

    it('should return role assignment if end date is end date is 21 Oct 2022 filter date 20 Oct 2022', async () => {
      roleAssignments[0].endTime = new Date(2022, 10, 21);
      const activeRoleAssignments = getActiveRoleAssignments(roleAssignments, filterDate);
      expect(activeRoleAssignments.length).to.equal(1);
    });

    it('should return role assignment if end date is is 19 Oct 2022 filter date 20 Oct 2022', async () => {
      roleAssignments[0].endTime = new Date(2022, 10, 19);
      const activeRoleAssignments = getActiveRoleAssignments(roleAssignments, filterDate);
      expect(activeRoleAssignments.length).to.equal(0);
    });
  });

  describe('setUserRoles', () => {
    it('should set user roles correctly', async () => {
      const mockUserRoles = [{
        roleName: 'test role',
        roleCategory: 'ADMIN',
        roleType: 'ORGANISATION',
        isCaseAllocator: false,
        beginTime: undefined,
        endTime: undefined
      },
      {
        roleName: 'test role 2',
        roleCategory: 'ADMIN',
        roleType: 'ORGANISATION',
        isCaseAllocator: false,
        beginTime: undefined,
        endTime: undefined
      },
      {
        roleName: 'test role 3',
        roleCategory: 'ADMIN',
        roleType: 'UNIMPORTANT',
        // is case allocator not true because not organisation type
        isCaseAllocator: false,
        beginTime: undefined,
        endTime: undefined
      }];
      expect(setUserRoles(mockUserInfo, mockReqData, mockUserId)).to.deep.equal(mockUserRoles);
      expect(mockUserInfo.roleCategory).to.equal('ADMIN');
      expect(mockUserInfo.roles).to.deep.equal(['caseworker-test', 'caseworker-test2', 'test role', 'test role 2']);
    });
  });

  describe('addUserRolesIfUnique', () => {
    it('should handle an empty list', async () => {
      addUserRolesIfUnique(mockUserInfo, []);
      expect(mockUserInfo.roles).to.deep.equal(['caseworker-test', 'caseworker-test2']);
    });

    it('should add unique user roles', async () => {
      addUserRolesIfUnique(mockUserInfo, ['test role 1']);
      expect(mockUserInfo.roles).to.deep.equal(['caseworker-test', 'caseworker-test2', 'test role 1']);
      addUserRolesIfUnique(mockUserInfo, ['test role 2']);
      expect(mockUserInfo.roles).to.deep.equal(['caseworker-test', 'caseworker-test2', 'test role 1', 'test role 2']);
    });

    it('should not add non-unique user roles', async () => {
      addUserRolesIfUnique(mockUserInfo, ['caseworker-test']);
      expect(mockUserInfo.roles).to.deep.equal(['caseworker-test', 'caseworker-test2']);
    });
  });

  describe('getUserDetails', () => {
    let sandbox: sinon.SinonSandbox;
    let req: any;
    let res: any;
    let next: sinon.SinonStub;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      req = mockReq();
      res = mockRes();
      next = sandbox.stub();
      sandbox.stub(appInsights, 'trackTrace');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return empty object with 200 status when no passport user exists', async () => {
      req.session = {};

      await getUserDetails(req, res, next);

      expect(res.send).to.have.been.calledWith({});
      expect(res.status).to.have.been.calledWith(200);
    });

    it('should return 400 when user details are invalid', async () => {
      req.session = {
        passport: {
          user: {
            userinfo: { id: 'test', roles: ['test'] }
          }
        }
      };
      sandbox.stub(userUtils, 'userDetailsValid').returns(false);

      await getUserDetails(req, res, next);

      expect(res.send).to.have.been.calledWith('User details are invalid. This needs to be investigated');
      expect(res.status).to.have.been.calledWith(400);
    });

    it('should return 400 when bearer token contains dangerous code', async () => {
      req.session = {
        passport: {
          user: {
            userinfo: { id: 'test', roles: ['test'] },
            tokenset: { accessToken: '<script>alert(1)</script>' }
          }
        }
      };
      sandbox.stub(userUtils, 'userDetailsValid').returns(true);
      sandbox.stub(config, 'getConfigValue').returns([]);
      sandbox.stub(nodeLib, 'getUserSessionTimeout').returns({
        idleModalDisplayTime: 10,
        totalIdleTime: 20,
        pattern: 'caseworker'
      });
      sandbox.stub(utils, 'containsDangerousCode').returns(true);

      const getUserRoleAssignmentsStub = sandbox.stub();
      getUserRoleAssignmentsStub.resolves([]);
      sandbox.stub({ getUserRoleAssignments }, 'getUserRoleAssignments').value(getUserRoleAssignmentsStub);

      await getUserDetails(req, res, next);

      expect(res.send).to.have.been.calledWith('Invalid bearer token');
      expect(res.status).to.have.been.calledWith(400);
    });

    it('should successfully return user details with roles and permissions', async () => {
      const mockRoleAssignmentInfo = [{
        jurisdiction: 'IA',
        baseLocation: '123456',
        isCaseAllocator: false,
        roleType: 'ORGANISATION',
        roleName: 'case-worker',
        roleCategory: 'LEGAL_OPERATIONS'
      }];

      req.session = {
        passport: {
          user: {
            userinfo: {
              id: 'test-user',
              roles: ['caseworker', 'pui-case-manager'],
              roleCategory: null
            },
            tokenset: { accessToken: 'valid-token' }
          }
        },
        roleAssignmentResponse: [{
          id: '1',
          substantive: 'Y',
          jurisdiction: 'IA',
          roleName: 'case-worker',
          roleType: 'ORGANISATION',
          attributes: {}
        }]
      };

      sandbox.stub(userUtils, 'userDetailsValid').returns(true);
      const getConfigStub = sandbox.stub(config, 'getConfigValue');
      getConfigStub.withArgs('sessionTimeouts').returns([{ roleId: 'caseworker', idleMinutes: 20 }]);
      getConfigStub.withArgs('caseSharePermissions').returns('pui-case-manager,pui-organisation-manager');

      sandbox.stub(nodeLib, 'getUserSessionTimeout').returns({
        idleModalDisplayTime: 10,
        totalIdleTime: 20,
        pattern: 'caseworker'
      });
      sandbox.stub(utils, 'containsDangerousCode').returns(false);

      await getUserDetails(req, res, next);

      expect(res.send).to.have.been.calledOnce;
      const callArgs = res.send.getCall(0).args[0];

      // Verify the response structure and values
      expect(callArgs).to.have.property('canShareCases', true);
      expect(callArgs).to.have.property('sessionTimeout');
      // The actual sessionTimeout will be what getUserSessionTimeout returns
      expect(callArgs.sessionTimeout).to.exist;
      expect(callArgs).to.have.property('roleAssignmentInfo');
      expect(callArgs).to.have.property('userInfo');
      expect(callArgs.userInfo).to.include({
        id: 'test-user',
        token: 'Bearer valid-token'
      });

      // Verify that original roles are present
      expect(callArgs.userInfo.roles).to.include('caseworker');
      expect(callArgs.userInfo.roles).to.include('pui-case-manager');
      // Note: synthetic roles would be added if roleAssignmentResponse had appropriate data
    });

    it('should handle errors and call next', async () => {
      const error = new Error('Test error');
      req.session = {
        passport: {
          user: {
            userinfo: { id: 'test', roles: ['test'] }
          }
        }
      };

      sandbox.stub(userUtils, 'userDetailsValid').throws(error);

      await getUserDetails(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('getSyntheticRoles', () => {
    it('should return empty array when no role assignments provided', () => {
      const result = getSyntheticRoles([]);
      expect(result).to.deep.equal([]);
    });

    it('should return empty array when no substantive organisation roles', () => {
      const roleAssignments = [
        {
          id: '1',
          substantive: 'N',
          jurisdiction: 'IA',
          roleName: 'case-worker',
          roleType: 'ORGANISATION',
          attributes: {}
        },
        {
          id: '2',
          substantive: 'Y',
          jurisdiction: 'IA',
          roleName: 'case-worker',
          roleType: 'CASE',
          attributes: {}
        }
      ];

      const result = getSyntheticRoles(roleAssignments);
      expect(result).to.deep.equal([]);
    });

    it('should return synthetic roles for valid substantive organisation roles', () => {
      const roleAssignments = [
        {
          id: '1',
          substantive: 'Y',
          jurisdiction: 'IA',
          roleName: 'case-worker',
          roleType: 'ORGANISATION',
          attributes: {}
        },
        {
          id: '2',
          substantive: 'Y',
          jurisdiction: 'CIVIL',
          roleName: 'judge',
          roleType: 'ORGANISATION',
          attributes: {}
        }
      ];

      const result = getSyntheticRoles(roleAssignments);
      expect(result).to.deep.equal(['ia-case-worker', 'civil-judge']);
    });

    it('should return unique synthetic roles when duplicates exist', () => {
      const roleAssignments = [
        {
          id: '1',
          substantive: 'Y',
          jurisdiction: 'IA',
          roleName: 'case-worker',
          roleType: 'ORGANISATION',
          attributes: {}
        },
        {
          id: '2',
          substantive: 'Y',
          jurisdiction: 'IA',
          roleName: 'case-worker',
          roleType: 'ORGANISATION',
          attributes: {}
        }
      ];

      const result = getSyntheticRoles(roleAssignments);
      expect(result).to.deep.equal(['ia-case-worker']);
    });

    it('should filter out expired role assignments', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const roleAssignments = [
        {
          id: '1',
          substantive: 'Y',
          jurisdiction: 'IA',
          roleName: 'case-worker',
          roleType: 'ORGANISATION',
          endTime: yesterday,
          attributes: {}
        }
      ];

      const result = getSyntheticRoles(roleAssignments);
      expect(result).to.deep.equal([]);
    });
  });

  describe('getSyntheticRole', () => {
    it('should return empty string when jurisdiction is null', () => {
      const result = getSyntheticRole(null, 'case-worker');
      expect(result).to.equal('');
    });

    it('should return empty string when roleName is null', () => {
      const result = getSyntheticRole('IA', null);
      expect(result).to.equal('');
    });

    it('should return empty string when both are null', () => {
      const result = getSyntheticRole(null, null);
      expect(result).to.equal('');
    });

    it('should return formatted synthetic role when both values provided', () => {
      const result = getSyntheticRole('IA', 'Case-Worker');
      expect(result).to.equal('ia-case-worker');
    });

    it('should handle uppercase jurisdiction and roleName', () => {
      const result = getSyntheticRole('CIVIL', 'JUDGE');
      expect(result).to.equal('civil-judge');
    });
  });

  describe('refreshRoleAssignmentForUser', () => {
    let sandbox: sinon.SinonSandbox;
    let req: any;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      req = mockReq();
      req.session = {};
      sandbox.stub(appInsights, 'trackTrace');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return empty array when userInfo is null', async () => {
      const result = await refreshRoleAssignmentForUser(null, req);
      expect(result).to.deep.equal([]);
    });

    it('should successfully fetch and process role assignments', async () => {
      const mockUserInfo = { id: 'user123', roles: ['caseworker'] };
      const mockResponse = {
        data: {
          roleAssignmentResponse: [
            {
              id: '1',
              roleName: 'case-worker',
              roleType: 'ORGANISATION',
              roleCategory: 'LEGAL_OPERATIONS'
            }
          ]
        },
        headers: { etag: 'etag123' }
      };

      sandbox.stub(config, 'getConfigValue').returns('http://role-assignment-api');
      sandbox.stub(proxy, 'setHeaders').returns({ 'Content-Type': 'application/json' });
      sandbox.stub(http, 'get').resolves(mockResponse);
      sandbox.stub(userUtils, 'isCurrentUserCaseAllocator').returns(false);

      const result = await refreshRoleAssignmentForUser(mockUserInfo, req);

      // setUserRoles returns the transformed role assignment info
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(1);
      expect(result[0]).to.include({ roleName: 'case-worker' });
      expect(req.session.roleRequestEtag).to.equal('etag123');
    });

    it('should use uid when id is not present', async () => {
      const mockUserInfo = { uid: 'user456', roles: ['caseworker'] };
      const mockResponse = {
        data: { roleAssignmentResponse: [] },
        headers: {}
      };

      sandbox.stub(config, 'getConfigValue').returns('http://role-assignment-api');
      sandbox.stub(proxy, 'setHeaders').returns({});
      const httpGetStub = sandbox.stub(http, 'get').resolves(mockResponse);

      // setUserRoles is called internally and doesn't need to be stubbed

      await refreshRoleAssignmentForUser(mockUserInfo, req);

      expect(httpGetStub).to.have.been.calledWith(
        'http://role-assignment-api/am/role-assignments/actors/user456'
      );
    });

    it('should add If-None-Match header when etag exists in session', async () => {
      const mockUserInfo = { id: 'user123', roles: ['caseworker'] };
      req.session.roleRequestEtag = 'existing-etag';

      const mockResponse = {
        data: { roleAssignmentResponse: [] },
        headers: {}
      };

      sandbox.stub(config, 'getConfigValue').returns('http://role-assignment-api');
      const setHeadersStub = sandbox.stub(proxy, 'setHeaders').returns({ accept: 'application/json' });
      const httpGetStub = sandbox.stub(http, 'get').resolves(mockResponse);

      // setUserRoles is called internally and doesn't need to be stubbed

      await refreshRoleAssignmentForUser(mockUserInfo, req);

      const expectedHeaders = { 'If-None-Match': 'existing-etag' };
      expect(httpGetStub).to.have.been.calledWith(
        sinon.match.string,
        { headers: expectedHeaders }
      );
    });

    it('should handle 304 Not Modified response', async () => {
      const mockUserInfo = { id: 'user123', roles: ['caseworker'] };
      const error304 = { status: 304 };

      // Set up cached role assignments in session
      req.session.roleAssignmentResponse = [{
        id: '1',
        roleName: 'cached-role',
        roleType: 'ORGANISATION',
        attributes: {}
      }];

      sandbox.stub(config, 'getConfigValue').returns('http://role-assignment-api');
      sandbox.stub(proxy, 'setHeaders').returns({});
      sandbox.stub(http, 'get').rejects(error304);
      sandbox.stub(userUtils, 'isCurrentUserCaseAllocator').returns(false);

      const result = await refreshRoleAssignmentForUser(mockUserInfo, req);

      // Should return the transformed cached data
      expect(result).to.be.an('array');
      expect(result[0]).to.include({ roleName: 'cached-role' });
    });

    it('should handle other errors and return empty array', async () => {
      const mockUserInfo = { id: 'user123', roles: ['caseworker'] };
      const error = new Error('Network error');

      sandbox.stub(config, 'getConfigValue').returns('http://role-assignment-api');
      sandbox.stub(proxy, 'setHeaders').returns({});
      sandbox.stub(http, 'get').rejects(error);

      const result = await refreshRoleAssignmentForUser(mockUserInfo, req);

      expect(result).to.deep.equal([]);
    });
  });

  describe('extractRoleCategories', () => {
    it('should return undefined when input is null', () => {
      const result = extractRoleCategories(null);
      expect(result).to.be.undefined;
    });

    it('should return undefined when input is undefined', () => {
      const result = extractRoleCategories(undefined);
      expect(result).to.be.undefined;
    });

    it('should return empty array when input is empty array', () => {
      const result = extractRoleCategories([]);
      expect(result).to.deep.equal([]);
    });

    it('should extract role categories from valid role assignments', () => {
      const roleAssignments = [
        { roleCategory: 'JUDICIAL' },
        { roleCategory: 'LEGAL_OPERATIONS' },
        { roleCategory: null },
        { roleCategory: 'ADMIN' }
      ];

      const result = extractRoleCategories(roleAssignments);
      expect(result).to.deep.equal(['JUDICIAL', 'LEGAL_OPERATIONS', 'ADMIN']);
    });

    it('should handle role assignments without roleCategory property', () => {
      const roleAssignments = [
        { roleName: 'test' },
        { roleCategory: 'JUDICIAL' },
        {}
      ];

      const result = extractRoleCategories(roleAssignments);
      expect(result).to.deep.equal(['JUDICIAL']);
    });
  });

  describe('getRoleAssignmentInfo', () => {
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return empty array when roleAssignmentResponse is null', () => {
      const result = getRoleAssignmentInfo(null);
      expect(result).to.deep.equal([]);
    });

    it('should return empty array when roleAssignmentResponse is undefined', () => {
      const result = getRoleAssignmentInfo(undefined);
      expect(result).to.deep.equal([]);
    });

    it('should transform role assignments correctly', () => {
      const mockRoleAssignments = [
        {
          id: '1',
          roleType: 'ORGANISATION',
          roleName: 'case-allocator',
          roleCategory: 'LEGAL_OPERATIONS',
          beginTime: new Date('2023-01-01'),
          endTime: new Date('2023-12-31'),
          attributes: {
            jurisdiction: 'IA',
            baseLocation: '123456'
          }
        }
      ];

      sandbox.stub(userUtils, 'isCurrentUserCaseAllocator').returns(true);

      const result = getRoleAssignmentInfo(mockRoleAssignments);

      expect(result).to.have.lengthOf(1);
      expect(result[0]).to.deep.include({
        jurisdiction: 'IA',
        baseLocation: '123456',
        isCaseAllocator: true,
        roleType: 'ORGANISATION',
        roleName: 'case-allocator',
        roleCategory: 'LEGAL_OPERATIONS'
      });
      expect(result[0].beginTime).to.deep.equal(new Date('2023-01-01'));
      expect(result[0].endTime).to.deep.equal(new Date('2023-12-31'));
    });

    it('should handle role assignments without attributes', () => {
      const mockRoleAssignments = [
        {
          id: '1',
          roleType: 'CASE',
          roleName: 'judge',
          attributes: {}
        }
      ];

      sandbox.stub(userUtils, 'isCurrentUserCaseAllocator').returns(false);

      const result = getRoleAssignmentInfo(mockRoleAssignments);

      expect(result).to.have.lengthOf(1);
      expect(result[0]).to.deep.include({
        isCaseAllocator: false,
        roleType: 'CASE',
        roleName: 'judge'
      });
    });
  });

  describe('getUserRoleAssignments', () => {
    let sandbox: sinon.SinonSandbox;
    let req: any;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      req = mockReq();
      req.session = {};
      req.query = {};
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should use cached role assignments when refreshRoleAssignments is false', async () => {
      const cachedRoleAssignments = [
        { id: '1', roleName: 'cached-role' }
      ];
      req.session.roleAssignmentResponse = cachedRoleAssignments;
      req.query.refreshRoleAssignments = 'false';

      sandbox.stub(userUtils, 'isCurrentUserCaseAllocator').returns(false);

      const result = await getUserRoleAssignments({ id: 'user123' }, req);

      // Should return transformed role assignment info
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(1);
      expect(result[0]).to.include({ roleName: 'cached-role' });
    });

    it('should use cached role assignments when no refresh query param', async () => {
      const cachedRoleAssignments = [
        { id: '1', roleName: 'cached-role' }
      ];
      req.session.roleAssignmentResponse = cachedRoleAssignments;

      sandbox.stub(userUtils, 'isCurrentUserCaseAllocator').returns(false);

      const result = await getUserRoleAssignments({ id: 'user123' }, req);

      // Should return transformed role assignment info
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(1);
      expect(result[0]).to.include({ roleName: 'cached-role' });
    });

    it('should refresh role assignments when refreshRoleAssignments is true', async () => {
      req.query.refreshRoleAssignments = 'true';

      const mockResponse = {
        data: {
          roleAssignmentResponse: [
            {
              id: '1',
              roleName: 'fresh-role',
              roleType: 'ORGANISATION',
              attributes: {}
            }
          ]
        },
        headers: { etag: 'new-etag' }
      };

      sandbox.stub(config, 'getConfigValue').returns('http://role-assignment-api');
      sandbox.stub(proxy, 'setHeaders').returns({});
      sandbox.stub(http, 'get').resolves(mockResponse);
      sandbox.stub(userUtils, 'isCurrentUserCaseAllocator').returns(false);

      const result = await getUserRoleAssignments({ id: 'user123' }, req);

      expect(result).to.be.an('array');
      expect(result[0]).to.include({ roleName: 'fresh-role' });
    });

    it('should refresh when no cached role assignments exist', async () => {
      const mockResponse = {
        data: {
          roleAssignmentResponse: [
            {
              id: '1',
              roleName: 'fresh-role',
              roleType: 'ORGANISATION',
              attributes: {}
            }
          ]
        },
        headers: {}
      };

      sandbox.stub(config, 'getConfigValue').returns('http://role-assignment-api');
      sandbox.stub(proxy, 'setHeaders').returns({});
      sandbox.stub(http, 'get').resolves(mockResponse);
      sandbox.stub(userUtils, 'isCurrentUserCaseAllocator').returns(false);

      const result = await getUserRoleAssignments({ id: 'user123' }, req);

      expect(result).to.be.an('array');
      expect(result[0]).to.include({ roleName: 'fresh-role' });
    });
  });
});
