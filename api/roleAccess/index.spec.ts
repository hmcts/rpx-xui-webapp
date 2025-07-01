import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { Response } from 'express';
import { EnhancedRequest } from '../lib/models';
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
import { AxiosResponse, AxiosHeaders } from 'axios';

import { RoleCategory, AllocateTo, DurationOfRole } from './models/allocate-role.enum';
import { AllocateRoleData } from './models/allocate-role-state-data.interface';
import { Role, RefinedRole } from './models/roleType';
import { RoleRequestPayload } from './models/role-request.model';
import { CaseRoleRequestPayload } from './models/caseRoleRequestPayload';
import { JudicialUserDto } from './dtos/judicial-user-dto';

describe('roleAccess/index', () => {
  let sandbox: sinon.SinonSandbox;
  let req: EnhancedRequest;
  let res: Response;
  let next: sinon.SinonStub;

  // Helper function to create mock AllocateRoleData
  const createMockAllocateRoleData = (overrides?: Partial<AllocateRoleData>): AllocateRoleData => {
    return {
      caseId: '1234567890123456',
      jurisdiction: 'SSCS',
      assignmentId: 'assignment-123',
      action: 'action',
      typeOfRole: { id: 'lead-judge', name: 'Lead judge' },
      allocateTo: AllocateTo.ALLOCATE_TO_ME,
      personToBeRemoved: null,
      person: {
        id: 'user-123',
        name: 'Test User',
        email: 'test.user@example.com',
        domain: ''
      },
      durationOfRole: DurationOfRole.SEVEN_DAYS,
      period: {
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      },
      roleCategory: RoleCategory.JUDICIAL,
      ...overrides
    };
  };

  // Helper function to create mock RoleRequestPayload
  const createMockRoleRequestPayload = (): RoleRequestPayload => {
    return {
      roleRequest: {
        assignerId: 'assigner-123',
        replaceExisting: false,
        process: 'role-assignment',
        reference: 'test-reference'
      },
      requestedRoles: [
        {
          actorIdType: 'IDAM',
          actorId: 'user-123',
          roleType: 'CASE',
          roleName: 'lead-judge',
          classification: 'PUBLIC',
          grantType: 'SPECIFIC',
          roleCategory: RoleCategory.JUDICIAL,
          readOnly: false,
          beginTime: new Date(),
          endTime: null,
          attributes: {
            caseId: '1234567890123456',
            jurisdiction: 'SSCS',
            caseType: 'Benefit'
          },
          notes: [{
            userId: 'assigner-123',
            time: new Date(),
            comment: 'Test allocation'
          }]
        }
      ]
    };
  };

  // Helper function to create mock CaseRoleRequestPayload
  const createMockCaseRoleRequestPayload = (): CaseRoleRequestPayload => {
    return {
      queryRequests: [
        {
          attributes: {
            caseId: ['1234567890123456'],
            jurisdiction: ['SSCS'],
            caseType: ['Benefit']
          }
        }
      ]
    };
  };

  // Helper function to create mock JudicialUserDto
  const createMockJudicialUser = (id: string): JudicialUserDto => {
    return {
      title: 'Judge',
      knownAs: `Judge ${id}`,
      full_name: `Judge ${id} Full Name`,
      sidam_id: id,
      email_id: `judge.${id}@example.com`
    };
  };

  // Helper function to create mock Role
  const createMockRole = (name: string, category: string = 'JUDICIAL'): Role => {
    return {
      name: name,
      label: `${name} Label`,
      description: `Description for ${name}`,
      category: category,
      substantive: true,
      patterns: [
        {
          roleType: { mandatory: true, values: ['CASE'] },
          grantType: { mandatory: true, values: ['STANDARD'] },
          classification: { mandatory: true, values: ['PUBLIC'] },
          attributes: {
            jurisdiction: { mandatory: true, values: ['SSCS'] }
          }
        }
      ]
    };
  };

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    req = {
      body: {},
      params: {},
      query: {},
      session: {
        passport: {
          user: {
            userinfo: {
              id: 'user-123',
              name: 'Test User',
              email: 'test.user@example.com',
              roleCategory: 'ADMIN'
            }
          }
        }
      }
    } as EnhancedRequest;

    res = {
      status: sandbox.stub().returnsThis(),
      send: sandbox.stub()
    } as unknown as Response;

    next = sandbox.stub();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getRolesByCaseId', () => {
    it('should return mapped roles with proper models', async () => {
      const mockCaseRolePayload = createMockCaseRoleRequestPayload();
      const mockRoleAssignments = [
        {
          id: 'assignment-1',
          actorId: 'user-123',
          roleName: 'lead-judge',
          roleCategory: 'JUDICIAL',
          grantType: 'SPECIFIC',
          classification: 'PUBLIC',
          attributes: {
            caseId: '1234567890123456',
            jurisdiction: 'SSCS',
            caseType: 'Benefit'
          },
          beginTime: new Date(),
          endTime: null,
          notes: 'Test role assignment'
        }
      ];

      sandbox.stub(configuration, 'getConfigValue').returns('http://role-assignment-api');
      sandbox.stub(proxy, 'setHeaders').returns({});
      sandbox.stub(httpModule.http, 'post').resolves({
        status: 200,
        data: {
          roleAssignmentResponse: mockRoleAssignments
        }
      });

      const mockRefinedRoles: RefinedRole[] = [
        {
          roleCategory: RoleCategory.JUDICIAL,
          roleId: 'lead-judge',
          roleName: 'lead-judge',
          roleJurisdiction: {
            mandatory: false,
            values: ['SSCS']
          }
        }
      ];

      sandbox.stub(roleAssignmentService, 'getSubstantiveRoles').resolves(mockRefinedRoles);
      sandbox.stub(exclusionService, 'getEmail').returns('test.user@example.com');
      sandbox.stub(exclusionService, 'getUserName').returns('Test User');
      sandbox.stub(exclusionService, 'mapRoleCategory').returns(RoleCategory.JUDICIAL);

      req.body = mockCaseRolePayload.queryRequests[0].attributes;

      await index.getRolesByCaseId(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      const sentData = (res.send as sinon.SinonStub).firstCall.args[0];
      expect(sentData).to.be.an('array');
      expect(sentData[0]).to.include({
        roleName: 'lead-judge',
        email: 'test.user@example.com',
        name: 'Test User',
        roleCategory: RoleCategory.JUDICIAL
      });
    });

    it('should handle empty role assignments', async () => {
      sandbox.stub(configuration, 'getConfigValue').returns('http://role-assignment-api');
      sandbox.stub(proxy, 'setHeaders').returns({});
      sandbox.stub(httpModule.http, 'post').resolves({
        status: 200,
        data: { roleAssignmentResponse: [] }
      });
      sandbox.stub(roleAssignmentService, 'getSubstantiveRoles').resolves([]);

      req.body = createMockCaseRoleRequestPayload().queryRequests[0].attributes;

      await index.getRolesByCaseId(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith([]);
    });

    it('should handle errors properly', async () => {
      const error = new Error('API Error');
      sandbox.stub(configuration, 'getConfigValue').returns('http://role-assignment-api');
      sandbox.stub(proxy, 'setHeaders').returns({});
      sandbox.stub(httpModule.http, 'post').rejects(error);

      req.body = createMockCaseRoleRequestPayload().queryRequests[0].attributes;

      await index.getRolesByCaseId(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('getAccessRoles', () => {
    it('should return access roles with proper type mapping', async () => {
      const mockRoleAssignments = [
        {
          id: 'assignment-1',
          actorId: 'user-123',
          roleName: 'specific-access-granted',
          roleCategory: 'ADMIN',
          grantType: 'BASIC',
          classification: 'PRIVATE',
          attributes: {
            caseId: '1234567890123456',
            specificAccessReason: 'Urgent case review'
          }
        },
        {
          id: 'assignment-2',
          actorId: 'user-456',
          roleName: 'case-manager',
          roleCategory: 'LEGAL_OPERATIONS',
          grantType: 'STANDARD',
          classification: 'PUBLIC',
          attributes: {
            caseId: '1234567890123456'
          }
        }
      ];

      sandbox.stub(configuration, 'getConfigValue').returns('http://role-assignment-api');
      sandbox.stub(proxy, 'setHeaders').returns({});
      sandbox.stub(httpModule.http, 'post').resolves({
        status: 200,
        data: { roleAssignmentResponse: mockRoleAssignments }
      });
      sandbox.stub(exclusionService, 'getEmail').callsFake((actorId) => `${actorId}@example.com`);
      sandbox.stub(exclusionService, 'getUserName').callsFake(() => 'User');
      sandbox.stub(exclusionService, 'mapRoleCategory').callsFake((cat) =>
        cat === 'LEGAL_OPERATIONS' ? RoleCategory.LEGAL_OPERATIONS : RoleCategory.ADMIN
      );

      req.body = { caseId: '1234567890123456', jurisdiction: 'SSCS', caseType: 'Benefit' };

      await index.getAccessRoles(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      const sentData = (res.send as sinon.SinonStub).firstCall.args[0];
      expect(sentData).to.be.an('array').with.lengthOf(2);
      expect(sentData[0].roleCategory).to.equal(RoleCategory.ADMIN);
      expect(sentData[1].roleCategory).to.equal(RoleCategory.LEGAL_OPERATIONS);
    });
  });

  describe('getAccessRolesByCaseId', () => {
    it('should filter out PROFESSIONAL roles and return with proper labels', async () => {
      const mockRoleAssignments = [
        {
          id: 'assignment-1',
          actorId: 'user-123',
          roleName: 'judge',
          roleCategory: 'JUDICIAL',
          attributes: {}
        },
        {
          id: 'assignment-2',
          actorId: 'user-456',
          roleName: 'solicitor',
          roleCategory: 'PROFESSIONAL',
          attributes: {}
        },
        {
          id: 'assignment-3',
          actorId: 'user-789',
          roleName: 'case-manager',
          roleCategory: 'ADMIN',
          attributes: {}
        }
      ];

      const mockRoles: Role[] = [
        createMockRole('judge', 'JUDICIAL'),
        createMockRole('solicitor', 'PROFESSIONAL'),
        createMockRole('case-manager', 'ADMIN')
      ];

      sandbox.stub(configuration, 'getConfigValue').returns('http://role-assignment-api');
      sandbox.stub(proxy, 'setHeaders').returns({});
      sandbox.stub(httpModule.http, 'post').resolves({
        status: 200,
        data: { roleAssignmentResponse: mockRoleAssignments }
      });

      const mockAxiosResponse: AxiosResponse<Role[]> = {
        status: 200,
        data: mockRoles,
        statusText: 'OK',
        headers: {},
        config: { headers: new AxiosHeaders() }
      };

      sandbox.stub(roleAssignmentService, 'getAllRoles').resolves(mockAxiosResponse);
      sandbox.stub(exclusionService, 'getEmail').returns('test@example.com');
      sandbox.stub(exclusionService, 'getUserName').returns('Test User');
      sandbox.stub(exclusionService, 'mapRoleCategory').callsFake((cat) => {
        switch (cat) {
          case 'JUDICIAL': return RoleCategory.JUDICIAL;
          case 'PROFESSIONAL': return RoleCategory.PROFESSIONAL;
          default: return RoleCategory.ADMIN;
        }
      });

      req.body = { caseId: '1234567890123456', assignmentId: null };

      await index.getAccessRolesByCaseId(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      const sentData = (res.send as sinon.SinonStub).firstCall.args[0];
      expect(sentData).to.be.an('array');
      expect(sentData.filter((r) => r.roleCategory === RoleCategory.PROFESSIONAL)).to.have.lengthOf(0);
      expect(sentData.filter((r) => r.roleCategory === RoleCategory.JUDICIAL)).to.have.lengthOf(1);
      expect(sentData.filter((r) => r.roleCategory === RoleCategory.ADMIN)).to.have.lengthOf(1);
    });
  });

  describe('getJudicialUsers', () => {
    it('should return empty array if no userIds provided', async () => {
      req.body = { userIds: [] };

      await index.getJudicialUsers(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith([]);
    });

    it('should return judicial users with proper DTO structure', async () => {
      const mockJudicialUsers: JudicialUserDto[] = [
        createMockJudicialUser('user-123'),
        createMockJudicialUser('user-456')
      ];

      req.body = { userIds: ['user-123', 'user-456'], services: ['SSCS'] };

      sandbox.stub(refDataUtils, 'getServiceRefDataMappingList').returns([
        { service: 'SSCS', serviceCodes: ['BBA3'] }
      ]);

      const mockAxiosResponse: AxiosResponse<JudicialUserDto[]> = {
        status: 200,
        data: mockJudicialUsers,
        statusText: 'OK',
        headers: {},
        config: { headers: new AxiosHeaders() }
      };

      sandbox.stub(exclusionService, 'getJudicialUsersFromApi').resolves(mockAxiosResponse);

      await index.getJudicialUsers(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      const sentData = (res.send as sinon.SinonStub).firstCall.args[0];
      expect(sentData).to.deep.equal(mockJudicialUsers);
    });

    it('should handle API errors', async () => {
      const error = new Error('Judicial API Error');
      req.body = { userIds: ['user-123'], services: ['SSCS'] };

      sandbox.stub(refDataUtils, 'getServiceRefDataMappingList').returns([
        { service: 'SSCS', serviceCodes: ['BBA3'] }
      ]);
      sandbox.stub(exclusionService, 'getJudicialUsersFromApi').rejects(error);

      await index.getJudicialUsers(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('confirmAllocateRole', () => {
    it('should allocate role using proper DTOs and models', async () => {
      const mockAllocateData = createMockAllocateRoleData();

      req.body = mockAllocateData;
      req.session.passport.user.userinfo.id = 'assigner-123';

      const toRoleAssignmentBodyStub = sandbox.stub(dtos, 'toRoleAssignmentBody');
      toRoleAssignmentBodyStub.returns({
        roleRequest: {
          assignerId: 'assigner-123',
          replaceExisting: false
        },
        requestedRoles: [{
          roleType: 'CASE',
          grantType: 'SPECIFIC',
          classification: 'RESTRICTED',
          attributes: {
            caseId: mockAllocateData.caseId,
            jurisdiction: mockAllocateData.jurisdiction
          },
          roleName: mockAllocateData.typeOfRole.id,
          roleCategory: mockAllocateData.roleCategory,
          actorIdType: 'IDAM',
          actorId: mockAllocateData.person.id,
          beginTime: mockAllocateData.period.startDate,
          endTime: mockAllocateData.period.endDate
        }]
      });

      const mockAxiosResponse: AxiosResponse = {
        status: 201,
        data: { roleAssignmentId: 'new-assignment-123' },
        statusText: 'Created',
        headers: {},
        config: { headers: new AxiosHeaders() }
      };

      sandbox.stub(crudService, 'sendPost').resolves(mockAxiosResponse);
      sandbox.stub(userModule, 'refreshRoleAssignmentForUser').resolves();

      await index.confirmAllocateRole(req, res, next);

      expect(toRoleAssignmentBodyStub).to.have.been.calledWith('assigner-123', mockAllocateData);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.send).to.have.been.calledWith({ roleAssignmentId: 'new-assignment-123' });
    });

    it('should handle specific access role allocation', async () => {
      const mockAllocateData = createMockAllocateRoleData({
        typeOfRole: { id: 'specific-access-admin', name: 'Specific access' },
        roleCategory: RoleCategory.ADMIN,
        period: {
          startDate: new Date(),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        },
        durationOfRole: DurationOfRole.ANOTHER_PERIOD
      });

      req.body = mockAllocateData;
      req.session.passport.user.userinfo.id = 'assigner-123';

      // confirmAllocateRole always uses toRoleAssignmentBody, not toSARoleAssignmentBody
      const toRoleAssignmentBodyStub = sandbox.stub(dtos, 'toRoleAssignmentBody');
      toRoleAssignmentBodyStub.returns({
        roleRequest: {
          assignerId: 'assigner-123',
          replaceExisting: false
        },
        requestedRoles: [{
          roleType: 'CASE',
          grantType: 'SPECIFIC',
          classification: 'RESTRICTED',
          attributes: {
            caseId: mockAllocateData.caseId,
            jurisdiction: mockAllocateData.jurisdiction
          },
          roleName: mockAllocateData.typeOfRole.id,
          roleCategory: mockAllocateData.roleCategory,
          actorIdType: 'IDAM',
          actorId: mockAllocateData.person.id,
          beginTime: mockAllocateData.period.startDate,
          endTime: mockAllocateData.period.endDate
        }]
      });

      sandbox.stub(crudService, 'sendPost').resolves({
        status: 201,
        data: { roleAssignmentId: 'specific-access-assignment-123' },
        statusText: 'Created',
        headers: {},
        config: { headers: new AxiosHeaders() }
      });
      sandbox.stub(userModule, 'refreshRoleAssignmentForUser').resolves();

      await index.confirmAllocateRole(req, res, next);

      expect(toRoleAssignmentBodyStub).to.have.been.calledWith('assigner-123', mockAllocateData);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.send).to.have.been.calledWith({ roleAssignmentId: 'specific-access-assignment-123' });
    });

    it('should handle errors in role allocation', async () => {
      const error = new Error('Allocation failed');
      req.body = createMockAllocateRoleData();

      sandbox.stub(dtos, 'toRoleAssignmentBody').throws(error);

      await index.confirmAllocateRole(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('getMyAccessNewCount', () => {
    it('should return count of new assignments with proper type checking', async () => {
      const mockRoleAssignments = [
        { id: '1', attributes: { isNew: true }, roleName: 'judge' },
        { id: '2', attributes: { isNew: false }, roleName: 'case-manager' },
        { id: '3', attributes: { isNew: true }, roleName: 'specific-access-admin' }
      ];

      req.session.roleAssignmentResponse = mockRoleAssignments;

      const mockCaseList = [
        {
          id: '1',
          case_name: 'Test Case 1',
          case_id: '1234567890123456',
          case_category: 'Benefit',
          case_role: 'judge',
          role_category: 'JUDICIAL',
          jurisdiction: 'SSCS',
          location_id: 'location-1',
          startDate: new Date(),
          endDate: null,
          assignee: 'Test User',
          isNew: true
        },
        {
          id: '2',
          case_name: 'Test Case 2',
          case_id: '1234567890123457',
          case_category: 'Benefit',
          case_role: 'case-manager',
          role_category: 'ADMIN',
          jurisdiction: 'SSCS',
          location_id: 'location-1',
          startDate: new Date(),
          endDate: null,
          assignee: 'Test User',
          isNew: false
        },
        {
          id: '3',
          case_name: 'Test Case 3',
          case_id: '1234567890123458',
          case_category: 'Benefit',
          case_role: 'specific-access-admin',
          role_category: 'ADMIN',
          jurisdiction: 'SSCS',
          location_id: 'location-1',
          startDate: new Date(),
          endDate: null,
          assignee: 'Test User',
          isNew: true
        }
      ];

      sandbox.stub(userModule, 'refreshRoleAssignmentForUser').resolves();
      sandbox.stub(workAllocationUtil, 'getMyAccessMappedCaseList').resolves(mockCaseList);

      await index.getMyAccessNewCount(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith({ count: 2 });
    });

    it('should handle errors when fetching new count', async () => {
      const error = new Error('Failed to refresh assignments');
      sandbox.stub(userModule, 'refreshRoleAssignmentForUser').rejects(error);

      await index.getMyAccessNewCount(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('manageLabellingRoleAssignment', () => {
    it('should return 204 if no challenged access request found', async () => {
      req.params = { caseId: '1234567890123456' };
      req.session.roleAssignmentResponse = [
        {
          id: '1',
          attributes: { caseId: '9999999999999999' },
          roleName: 'judge'
        }
      ];

      sandbox.stub(userModule, 'refreshRoleAssignmentForUser').resolves();

      await index.manageLabellingRoleAssignment(req, res, next);

      expect(res.status).to.have.been.calledWith(204);
    });

    it('should return 200 with assignment if challenged access request found', async () => {
      const caseId = '1234567890123456';
      const expectedAssignment = {
        id: 'assignment-123',
        attributes: {
          caseId: caseId,
          isNew: true,
          requestedRole: 'specific-access-admin'
        },
        roleName: 'challenged-access-judiciary'
      };

      req.params = { caseId };
      req.session.roleAssignmentResponse = [
        {
          id: 'assignment-other',
          attributes: { caseId: '9999999999999999' },
          roleName: 'judge'
        },
        expectedAssignment,
        {
          id: 'assignment-456',
          attributes: { caseId: caseId },
          roleName: 'case-manager'
        }
      ];

      sandbox.stub(userModule, 'refreshRoleAssignmentForUser').resolves();

      await index.manageLabellingRoleAssignment(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith({ id: 'assignment-123' });
    });

    it('should update isNew attribute to false after finding request', async () => {
      const caseId = '1234567890123456';
      const assignment = {
        id: 'assignment-123',
        attributes: {
          caseId: caseId,
          isNew: true
        },
        roleName: 'challenged-access-admin'
      };

      req.params = { caseId };
      req.session.roleAssignmentResponse = [assignment];

      sandbox.stub(userModule, 'refreshRoleAssignmentForUser').resolves();

      await index.manageLabellingRoleAssignment(req, res, next);

      expect(assignment.attributes.isNew).to.be.false;
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith({ id: 'assignment-123' });
    });

    it('should handle errors during labelling management', async () => {
      const error = new Error('Refresh failed');
      req.params = { caseId: '1234567890123456' };

      sandbox.stub(userModule, 'refreshRoleAssignmentForUser').rejects(error);

      await index.manageLabellingRoleAssignment(req, res, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('mapResponseToCaseRoles', () => {
    it('should properly map role assignments using exclusion models', () => {
      const mockRoleAssignments = [
        {
          id: 'assignment-1',
          actorId: 'user-123',
          roleName: 'lead-judge',
          roleCategory: 'JUDICIAL',
          attributes: {
            substantive: 'Y',
            caseId: '1234567890123456',
            jurisdiction: 'SSCS',
            location: 'location-123',
            specificAccessReason: 'Assigned as lead judge'
          },
          beginTime: '2023-01-01T00:00:00Z',
          endTime: '2023-12-31T23:59:59Z'
        },
        {
          id: 'assignment-2',
          actorId: 'user-456',
          roleName: 'hearing-judge',
          roleCategory: 'JUDICIAL',
          attributes: {
            caseId: '1234567890123456'
          }
        }
      ];

      sandbox.stub(exclusionService, 'getEmail').callsFake((actorId) =>
        actorId === 'user-123' ? 'judge.123@example.com' : 'judge.456@example.com'
      );
      sandbox.stub(exclusionService, 'getUserName').callsFake((actorId) => {
        const userNames = {
          'user-123': 'Judge Smith',
          'user-456': 'Judge Jones'
        };
        return userNames[actorId] || 'Unknown User';
      });
      sandbox.stub(exclusionService, 'mapRoleCategory').callsFake(() => RoleCategory.JUDICIAL);

      const result = (index as any).mapResponseToCaseRoles(mockRoleAssignments, null, req);

      expect(result).to.have.lengthOf(2);
      expect(result[0]).to.include({
        id: 'assignment-1',
        actorId: 'user-123',
        roleName: 'lead-judge',
        roleCategory: RoleCategory.JUDICIAL,
        email: 'judge.123@example.com',
        name: 'Judge Smith',
        location: null,
        start: '2023-01-01T00:00:00Z',
        end: '2023-12-31T23:59:59Z',
        notes: 'Assigned as lead judge'
      });
      expect(result[0].actions).to.be.an('array');
    });

    it('should filter by assignmentId when provided', () => {
      const mockRoleAssignments = [
        {
          id: 'assignment-1',
          actorId: 'user-123',
          roleName: 'judge',
          roleCategory: 'JUDICIAL',
          attributes: {}
        },
        {
          id: 'assignment-2',
          actorId: 'user-456',
          roleName: 'case-manager',
          roleCategory: 'ADMIN',
          attributes: {}
        }
      ];

      sandbox.stub(exclusionService, 'getEmail').returns('test@example.com');
      sandbox.stub(exclusionService, 'getUserName').returns('Test User');
      sandbox.stub(exclusionService, 'mapRoleCategory').callsFake((cat) =>
        cat === 'JUDICIAL' ? RoleCategory.JUDICIAL : RoleCategory.ADMIN
      );

      const result = (index as any).mapResponseToCaseRoles(mockRoleAssignments, 'assignment-2', req);

      expect(result).to.have.lengthOf(1);
      expect(result[0].id).to.equal('assignment-2');
      expect(result[0].roleCategory).to.equal(RoleCategory.ADMIN);
    });
  });

  describe('getSpecificReason', () => {
    it('should return plain text reason when not JSON', () => {
      const plainReason = 'This is a plain text reason';
      expect((index as any).getSpecificReason(plainReason)).to.equal(plainReason);
    });

    it('should parse JSON and return specificReason field', () => {
      const jsonReason = JSON.stringify({
        specificReason: 'Urgent case review required',
        additionalInfo: 'Extra details'
      });
      expect((index as any).getSpecificReason(jsonReason)).to.equal('Urgent case review required');
    });

    it('should return undefined if specificReason not present in JSON', () => {
      const jsonWithoutReason = JSON.stringify({
        otherField: 'Some value'
      });
      expect((index as any).getSpecificReason(jsonWithoutReason)).to.be.undefined;
    });
  });
});
