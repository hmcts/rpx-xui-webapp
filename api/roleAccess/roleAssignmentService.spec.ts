import { expect } from 'chai';

import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { http } from '../lib/http';
import * as config from '../configuration';
import * as proxyLib from '../lib/proxy';
import * as utils from '../utils';
import * as roleUtils from './utils';
import {
  getAllRoles,
  getSubstantiveRoles,
  getPossibleRoles,
  getRoleByAssignmentId,
  getRolesByCaseId
} from './roleAssignmentService';
import { Role, RefinedRole, RolesByService } from './models/roleType';

describe('roleAssignmentService', () => {
  let sandbox: sinon.SinonSandbox;
  let req: any;
  let res: any;
  let next: sinon.SinonStub;

  const mockRoles: Role[] = [
    {
      id: 'role-1',
      name: 'case-manager',
      label: 'Case Manager',
      description: 'Case Management Role',
      category: 'LEGAL_OPERATIONS',
      substantive: true,
      patterns: [
        {
          roleType: { mandatory: true, values: ['CASE'] },
          grantType: { mandatory: false, values: ['STANDARD'] },
          classification: { mandatory: false, values: ['PUBLIC'] },
          attributes: {
            jurisdiction: { mandatory: true, values: ['IA', 'SSCS'] }
          }
        }
      ]
    },
    {
      id: 'role-2',
      name: 'judge',
      label: 'Judge',
      description: 'Judicial Role',
      category: 'JUDICIAL',
      substantive: true,
      patterns: [
        {
          roleType: { mandatory: true, values: ['CASE'] },
          grantType: { mandatory: false, values: ['STANDARD'] },
          classification: { mandatory: false, values: ['PUBLIC'] },
          attributes: {
            jurisdiction: { mandatory: true, values: ['DIVORCE'] }
          }
        }
      ]
    },
    {
      id: 'role-3',
      name: 'admin',
      label: 'Administrator',
      description: 'Admin Role',
      category: 'ADMIN',
      substantive: false,
      patterns: [
        {
          roleType: { mandatory: true, values: ['ORGANISATION'] },
          grantType: { mandatory: false, values: ['STANDARD'] },
          classification: { mandatory: false, values: ['PUBLIC'] },
          attributes: {
            jurisdiction: { mandatory: true, values: ['ADMIN'] }
          }
        }
      ]
    }
  ];

  const mockRefinedRoles: RefinedRole[] = [
    {
      roleCategory: 'LEGAL_OPERATIONS',
      roleId: 'case-manager',
      roleName: 'Case Manager',
      roleJurisdiction: { mandatory: true, values: ['IA', 'SSCS'] }
    },
    {
      roleCategory: 'JUDICIAL',
      roleId: 'judge',
      roleName: 'Judge',
      roleJurisdiction: { mandatory: true, values: ['DIVORCE'] }
    }
  ];

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = mockReq({
      session: {},
      headers: {
        'ServiceAuthorization': 's2s-token',
        'Authorization': 'Bearer user-token'
      }
    });
    res = mockRes();
    next = sandbox.stub();

    sandbox.stub(config, 'getConfigValue').returns('http://role-assignment-api');
    sandbox.stub(proxyLib, 'setHeaders').returns({
      'ServiceAuthorization': 's2s-token',
      'Authorization': 'Bearer user-token'
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getAllRoles', () => {
    it('should fetch all roles successfully', async () => {
      const httpGetStub = sandbox.stub(http, 'get').resolves({ data: mockRoles });

      const result = await getAllRoles(req);

      expect(httpGetStub).to.have.been.calledWith(
        'http://role-assignment-api/am/role-assignments/roles',
        { headers: { 'ServiceAuthorization': 's2s-token', 'Authorization': 'Bearer user-token' } }
      );
      expect(result.data).to.deep.equal(mockRoles);
    });

    it('should handle http errors', async () => {
      const error = new Error('Network error');
      sandbox.stub(http, 'get').rejects(error);

      try {
        await getAllRoles(req);
        expect.fail('Should have thrown error');
      } catch (err) {
        expect(err).to.equal(error);
      }
    });
  });

  describe('getRolesByCaseId', () => {
    it('should fetch roles by case id successfully', async () => {
      const httpGetStub = sandbox.stub(http, 'get').resolves({ data: mockRoles });

      const result = await getRolesByCaseId(req);

      expect(httpGetStub).to.have.been.calledWith(
        'http://role-assignment-api/am/role-assignments/roles',
        { headers: { 'ServiceAuthorization': 's2s-token', 'Authorization': 'Bearer user-token' } }
      );
      expect(result.data).to.deep.equal(mockRoles);
    });
  });

  describe('getSubstantiveRoles', () => {
    it('should return cached substantive roles when valid', async () => {
      req.session.subStantiveRoles = mockRefinedRoles;
      sandbox.stub(roleUtils, 'substantiveRolesValid').returns(true);

      const result = await getSubstantiveRoles(req);

      expect(result).to.deep.equal(mockRefinedRoles);
    });

    it('should fetch and filter substantive roles when not cached', async () => {
      sandbox.stub(http, 'get').resolves({ data: mockRoles });
      sandbox.stub(roleUtils, 'substantiveRolesValid').returns(false);

      const result = await getSubstantiveRoles(req);

      expect(result).to.have.lengthOf(2);
      expect(result[0]).to.deep.equal({
        roleCategory: 'LEGAL_OPERATIONS',
        roleId: 'case-manager',
        roleName: 'Case Manager',
        roleJurisdiction: { mandatory: true, values: ['IA', 'SSCS'] }
      });
      expect(result[1]).to.deep.equal({
        roleCategory: 'JUDICIAL',
        roleId: 'judge',
        roleName: 'Judge',
        roleJurisdiction: { mandatory: true, values: ['DIVORCE'] }
      });
      expect(req.session.subStantiveRoles).to.deep.equal(result);
    });

    it('should handle roles with no patterns', async () => {
      const rolesWithNoPatterns = [{
        ...mockRoles[0],
        patterns: []
      }];
      sandbox.stub(http, 'get').resolves({ data: rolesWithNoPatterns });

      const result = await getSubstantiveRoles(req);

      expect(result).to.have.lengthOf(0);
    });

    it('should handle roles with patterns but no attributes', async () => {
      const rolesWithNoAttributes = [{
        ...mockRoles[0],
        patterns: [{
          roleType: { mandatory: true, values: ['CASE'] },
          grantType: { mandatory: false, values: ['STANDARD'] },
          classification: { mandatory: false, values: ['PUBLIC'] },
          attributes: null
        }]
      }];
      sandbox.stub(http, 'get').resolves({ data: rolesWithNoAttributes });

      const result = await getSubstantiveRoles(req);

      expect(result).to.have.lengthOf(1);
      expect(result[0].roleJurisdiction).to.be.null;
    });
  });

  describe('getPossibleRoles', () => {
    beforeEach(() => {
      sandbox.stub(utils, 'allContainOnlySafeCharacters').returns(true);
    });

    it('should return roles filtered by service ids', async () => {
      req.body = { serviceIds: ['IA', 'SSCS'] };
      sandbox.stub(http, 'get').resolves({ data: mockRoles });

      await getPossibleRoles(req, res, next);

      const expectedResponse: RolesByService[] = [
        {
          service: 'IA',
          roles: [{
            roleCategory: 'LEGAL_OPERATIONS',
            roleId: 'case-manager',
            roleName: 'Case Manager',
            roleJurisdiction: { mandatory: true, values: ['IA', 'SSCS'] }
          }]
        },
        {
          service: 'SSCS',
          roles: [{
            roleCategory: 'LEGAL_OPERATIONS',
            roleId: 'case-manager',
            roleName: 'Case Manager',
            roleJurisdiction: { mandatory: true, values: ['IA', 'SSCS'] }
          }]
        }
      ];

      expect(res.send).to.have.been.calledWith(expectedResponse);
      expect(res.status).to.have.been.calledWith(200);
    });

    it('should handle request with no service ids', async () => {
      req.body = {};
      sandbox.stub(http, 'get').resolves({ data: mockRoles });

      await getPossibleRoles(req, res, next);

      expect(res.send).to.have.been.calledWith([]);
      expect(res.status).to.have.been.calledWith(200);
    });

    it('should handle invalid service ids', async () => {
      req.body = { serviceIds: ['<script>alert("xss")</script>'] };
      sandbox.restore();
      sandbox = sinon.createSandbox();
      sandbox.stub(utils, 'allContainOnlySafeCharacters').returns(false);

      await getPossibleRoles(req, res, next);

      expect(res.send).to.have.been.calledWith('Invalid service id');
      expect(res.status).to.have.been.calledWith(400);
    });

    it('should handle errors and call next', async () => {
      const error = new Error('Test error');
      req.body = { serviceIds: ['IA'] };
      sandbox.stub(http, 'get').rejects(error);

      await getPossibleRoles(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });

    it('should filter roles without matching jurisdictions', async () => {
      req.body = { serviceIds: ['PROBATE'] };
      sandbox.stub(http, 'get').resolves({ data: mockRoles });

      await getPossibleRoles(req, res, next);

      const expectedResponse: RolesByService[] = [
        {
          service: 'PROBATE',
          roles: []
        }
      ];

      expect(res.send).to.have.been.calledWith(expectedResponse);
      expect(res.status).to.have.been.calledWith(200);
    });

    it('should handle roles with no jurisdiction values', async () => {
      const rolesWithNoJurisdiction = [{
        ...mockRoles[0],
        patterns: [{
          ...mockRoles[0].patterns[0],
          attributes: {
            jurisdiction: { mandatory: true, values: null }
          }
        }]
      }];
      req.body = { serviceIds: ['IA'] };
      sandbox.stub(http, 'get').resolves({ data: rolesWithNoJurisdiction });

      await getPossibleRoles(req, res, next);

      const expectedResponse: RolesByService[] = [
        {
          service: 'IA',
          roles: []
        }
      ];

      expect(res.send).to.have.been.calledWith(expectedResponse);
    });
  });

  describe('getRoleByAssignmentId', () => {
    it('should return role by assignment id', async () => {
      req.body = { assignmentId: 'role-1' };
      sandbox.stub(http, 'get').resolves({ data: mockRoles });

      await getRoleByAssignmentId(req, res, next);

      expect(res.send).to.have.been.calledWith(mockRoles[0]);
      expect(res.status).to.have.been.calledWith(200);
    });

    it('should return undefined when role not found', async () => {
      req.body = { assignmentId: 'non-existent-role' };
      sandbox.stub(http, 'get').resolves({ data: mockRoles });

      await getRoleByAssignmentId(req, res, next);

      expect(res.send).to.have.been.calledWith(undefined);
      expect(res.status).to.have.been.calledWith(200);
    });

    it('should handle errors and call next', async () => {
      const error = new Error('Test error');
      req.body = { assignmentId: 'role-1' };
      sandbox.stub(http, 'get').rejects(error);

      await getRoleByAssignmentId(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });

    it('should handle empty response data', async () => {
      req.body = { assignmentId: 'role-1' };
      sandbox.stub(http, 'get').resolves({ data: [] });

      await getRoleByAssignmentId(req, res, next);

      expect(res.send).to.have.been.calledWith(undefined);
      expect(res.status).to.have.been.calledWith(200);
    });
  });

  describe('filterRoleAssignments', () => {
    it('should filter non-substantive roles', async () => {
      sandbox.stub(http, 'get').resolves({ data: mockRoles });

      const result = await getSubstantiveRoles(req);

      expect(result).to.have.lengthOf(2);
      expect(result.every((role) => role.roleId !== 'admin')).to.be.true;
    });

    it('should filter roles without CASE roleType', async () => {
      const rolesWithoutCaseType = [
        {
          ...mockRoles[0],
          substantive: true,
          patterns: [{
            ...mockRoles[0].patterns[0],
            roleType: { mandatory: true, values: ['ORGANISATION'] }
          }]
        }
      ];
      sandbox.stub(http, 'get').resolves({ data: rolesWithoutCaseType });

      const result = await getSubstantiveRoles(req);

      expect(result).to.have.lengthOf(0);
    });
  });
});
