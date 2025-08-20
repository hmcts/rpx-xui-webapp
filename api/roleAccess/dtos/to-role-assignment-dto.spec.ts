import { expect } from 'chai';
import * as sinon from 'sinon';
import { UserInfo } from '../../auth/interfaces/UserInfo';
import { PersonRole } from '../../workAllocation/interfaces/person';
import { AllocateRoleData } from '../models/allocate-role-state-data.interface';
import { AllocateTo, DurationOfRole, Period, RoleCategory } from '../models/allocate-role.enum';
import {
  getActorId,
  toDenySARoleAssignmentBody,
  toDenySADletionRequestedRoleBody,
  toRoleAssignmentBody,
  toSARoleAssignmentBody,
  toSARequestRoleAssignmentBody
} from './to-role-assignment-dto';

describe('to-role-assignment-dto', () => {
  let sandbox: sinon.SinonSandbox;
  let clock: sinon.SinonFakeTimers;
  const mockDate = new Date('2029-01-15T10:00:00.000Z');

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    clock = sinon.useFakeTimers(mockDate);
  });

  afterEach(() => {
    sandbox.restore();
    clock.restore();
  });

  describe('toRoleAssignmentBody', () => {
    it('should create role assignment body with allocate to me', () => {
      const currentUserId = 'user123';
      const allocateRoleData: AllocateRoleData = {
        caseId: 'case123',
        action: 'allocate',
        typeOfRole: { id: 'lead-judge', name: 'Lead Judge' },
        allocateTo: AllocateTo.ALLOCATE_TO_ME,
        durationOfRole: DurationOfRole.SEVEN_DAYS,
        period: {
          startDate: new Date('2029-01-01'),
          endDate: new Date('2029-01-08')
        },
        jurisdiction: 'IA',
        roleCategory: RoleCategory.JUDICIAL
      };

      const result = toRoleAssignmentBody(currentUserId, allocateRoleData);

      expect(result).to.deep.equal({
        roleRequest: {
          assignerId: 'user123',
          replaceExisting: false
        },
        requestedRoles: [{
          roleType: 'CASE',
          grantType: 'SPECIFIC',
          classification: 'RESTRICTED',
          attributes: {
            caseId: 'case123',
            jurisdiction: 'IA'
          },
          roleName: 'lead-judge',
          roleCategory: RoleCategory.JUDICIAL,
          actorIdType: 'IDAM',
          actorId: 'user123',
          beginTime: new Date('2029-01-01'),
          endTime: new Date('2029-01-08')
        }]
      });
    });

    it('should create role assignment body with allocate to another person', () => {
      const currentUserId = 'user123';
      const allocateRoleData: AllocateRoleData = {
        caseId: 'case456',
        action: 'allocate',
        typeOfRole: { id: 'case-manager', name: 'Case Manager' },
        allocateTo: AllocateTo.ALLOCATE_TO_ANOTHER_PERSON,
        person: { id: 'user456', name: 'John Doe', email: 'john@example.com', domain: PersonRole.LEGAL_OPERATIONS },
        durationOfRole: DurationOfRole.INDEFINITE,
        period: {
          startDate: new Date('2029-02-01')
        },
        jurisdiction: 'SSCS',
        roleCategory: RoleCategory.LEGAL_OPERATIONS
      };

      const result = toRoleAssignmentBody(currentUserId, allocateRoleData);

      expect(result.requestedRoles[0].actorId).to.equal('user456');
      expect(result.requestedRoles[0].roleName).to.equal('case-manager');
      expect(result.requestedRoles[0].roleCategory).to.equal(RoleCategory.LEGAL_OPERATIONS);
      expect(result.requestedRoles[0].endTime).to.be.undefined;
    });
  });

  describe('toSARoleAssignmentBody', () => {
    it('should create specific access role assignment body with default values', () => {
      const currentUserId = 'user123';
      const specificAccessData = {
        specificAccessStateData: {
          caseId: 'case789',
          action: 'grant',
          requestedRole: 'specific-access-legal-ops',
          actorId: 'user789',
          roleCategory: RoleCategory.LEGAL_OPERATIONS,
          accessReason: 'Urgent case review',
          typeOfRole: { id: 'specific-access', name: 'Specific Access' },
          allocateTo: AllocateTo.ALLOCATE_TO_ANOTHER_PERSON,
          durationOfRole: DurationOfRole.SEVEN_DAYS,
          period: {
            startDate: new Date('2029-01-20')
          }
        },
        period: {
          startDate: new Date('2029-01-20'),
          endDate: new Date('2029-01-27')
        }
      };

      const result = toSARoleAssignmentBody(currentUserId, specificAccessData);

      expect(result.roleRequest).to.deep.equal({
        assignerId: 'user123',
        replaceExisting: true,
        process: 'specific-access',
        reference: 'case789/specific-access-legal-ops/user789'
      });
      expect(result.requestedRoles).to.have.lengthOf(2);
      expect(result.requestedRoles[0].roleName).to.equal('specific-access-granted');
      expect(result.requestedRoles[0].grantType).to.equal('BASIC');
      expect(result.requestedRoles[0].endTime).to.deep.equal(new Date('2029-01-27'));
      expect(result.requestedRoles[1].roleName).to.equal('specific-access-legal-ops');
      expect(result.requestedRoles[1].grantType).to.equal('SPECIFIC');
    });

    it('should handle specific-access-judicial conversion to specific-access-judiciary', () => {
      const currentUserId = 'user123';
      const specificAccessData = {
        specificAccessStateData: {
          caseId: 'case999',
          action: 'grant',
          requestedRole: 'specific-access-judicial',
          actorId: 'user999',
          roleCategory: RoleCategory.JUDICIAL,
          accessReason: 'Review required',
          typeOfRole: { id: 'specific-access', name: 'Specific Access' },
          allocateTo: AllocateTo.ALLOCATE_TO_ANOTHER_PERSON,
          durationOfRole: DurationOfRole.ANOTHER_PERIOD,
          period: {
            startDate: new Date('2029-01-15')
          }
        },
        period: {
          startDate: new Date('2029-01-15')
        }
      };

      const result = toSARoleAssignmentBody(currentUserId, specificAccessData);

      expect(result.roleRequest.reference).to.equal('case999/specific-access-judiciary/user999');
      expect(result.requestedRoles[0].attributes.requestedRole).to.equal('specific-access-judiciary');
      expect(result.requestedRoles[1].roleName).to.equal('specific-access-judiciary');
    });

    it('should handle no end date by setting default one month ahead', () => {
      const currentUserId = 'user123';
      const specificAccessData = {
        specificAccessStateData: {
          caseId: 'case111',
          action: 'grant',
          requestedRole: 'specific-access-admin',
          actorId: 'user111',
          roleCategory: RoleCategory.ADMIN,
          accessReason: 'Admin access',
          typeOfRole: { id: 'specific-access', name: 'Specific Access' },
          allocateTo: AllocateTo.ALLOCATE_TO_ANOTHER_PERSON,
          durationOfRole: DurationOfRole.INDEFINITE,
          period: {
            startDate: new Date('2029-01-15')
          }
        },
        period: {
          startDate: new Date('2029-01-15')
        }
      };

      const result = toSARoleAssignmentBody(currentUserId, specificAccessData);

      const expectedEndDate = new Date('2029-02-15T10:00:00.000Z');
      expect(result.requestedRoles[0].endTime).to.deep.equal(expectedEndDate);
    });

    it('should include extra attributes when provided', () => {
      const currentUserId = 'user123';
      const specificAccessData = {
        specificAccessStateData: {
          caseId: 'case222',
          action: 'grant',
          requestedRole: 'specific-access-ctsc',
          actorId: 'user222',
          roleCategory: RoleCategory.CTSC,
          accessReason: 'CTSC support',
          typeOfRole: { id: 'specific-access', name: 'Specific Access' },
          allocateTo: AllocateTo.ALLOCATE_TO_ANOTHER_PERSON,
          durationOfRole: DurationOfRole.SEVEN_DAYS,
          period: {
            startDate: new Date('2029-01-15')
          }
        },
        period: {
          startDate: new Date('2029-01-15'),
          endDate: new Date('2029-01-22')
        }
      };
      const extraAttributesForBasicRole = { customField1: 'value1', isUrgent: true };
      const extraAttributesForSpecificRole = { customField2: 'value2', priority: 'high' };

      const result = toSARoleAssignmentBody(
        currentUserId,
        specificAccessData,
        extraAttributesForBasicRole,
        extraAttributesForSpecificRole
      );

      expect(result.requestedRoles[0].attributes).to.include({
        caseId: 'case222',
        requestedRole: 'specific-access-ctsc',
        customField1: 'value1',
        isUrgent: true
      });
      expect(result.requestedRoles[1].attributes).to.include({
        caseId: 'case222',
        requestedRole: 'specific-access-ctsc',
        customField2: 'value2',
        priority: 'high'
      });
    });

    it('should correctly format notes with access reason', () => {
      const currentUserId = 'user123';
      const specificAccessData = {
        specificAccessStateData: {
          caseId: 'case333',
          action: 'grant',
          requestedRole: 'specific-access-legal-ops',
          actorId: 'user333',
          roleCategory: RoleCategory.LEGAL_OPERATIONS,
          accessReason: 'Emergency review needed',
          typeOfRole: { id: 'specific-access', name: 'Specific Access' },
          allocateTo: AllocateTo.ALLOCATE_TO_ANOTHER_PERSON,
          durationOfRole: DurationOfRole.SEVEN_DAYS,
          period: {
            startDate: new Date('2029-01-15')
          }
        },
        period: {
          startDate: new Date('2029-01-15'),
          endDate: new Date('2029-01-22')
        }
      };

      const result = toSARoleAssignmentBody(currentUserId, specificAccessData);

      expect(result.requestedRoles[0].notes[0].comment).to.equal('{"specificReason":Emergency review needed}');
      expect(result.requestedRoles[0].notes[0].time).to.equal(mockDate.toISOString());
      expect(result.requestedRoles[0].notes[0].userId).to.equal('user333');
    });
  });

  describe('toDenySARoleAssignmentBody', () => {
    it('should create deny role assignment body for JUDICIAL category', () => {
      const currentUser: UserInfo = {
        id: 'reviewer123',
        roleCategory: 'JUDICIAL',
        name: 'Judge Reviewer'
      };
      const allocateRoleData: AllocateRoleData = {
        caseId: 'case444',
        action: 'deny',
        roleCategory: RoleCategory.JUDICIAL,
        assigneeId: 'user444',
        specificAccessReason: 'Insufficient justification',
        requestCreated: new Date('2029-01-10'),
        accessReason: 'Denied',
        comment: 'Please provide more details',
        typeOfRole: { id: 'specific-access', name: 'Specific Access' },
        allocateTo: AllocateTo.ALLOCATE_TO_ANOTHER_PERSON,
        durationOfRole: DurationOfRole.SEVEN_DAYS,
        period: {
          startDate: new Date('2029-01-15')
        }
      };

      const result = toDenySARoleAssignmentBody(currentUser, allocateRoleData);

      expect(result.roleRequest.reference).to.equal('case444/specific-access-judiciary/user444');
      expect(result.requestedRoles[0].roleName).to.equal('specific-access-denied');
      expect(result.requestedRoles[0].attributes.requestedRole).to.equal('specific-access-judiciary');
      expect(result.requestedRoles[0].attributes.infoRequired).to.be.false;
      expect(result.requestedRoles[0].endTime).to.deep.equal(new Date('2029-01-29T00:00:00.000Z'));
    });

    it('should handle LEGAL_OPERATIONS category', () => {
      const currentUser: UserInfo = {
        uid: 'reviewer456',
        roleCategory: 'LEGAL_OPERATIONS',
        name: 'Legal Ops Reviewer'
      };
      const allocateRoleData: AllocateRoleData = {
        caseId: 'case555',
        action: 'deny',
        roleCategory: RoleCategory.LEGAL_OPERATIONS,
        assigneeId: 'user555',
        specificAccessReason: 'Not authorized',
        requestCreated: new Date('2029-01-11'),
        accessReason: 'Request more information',
        comment: 'Need manager approval',
        typeOfRole: { id: 'specific-access', name: 'Specific Access' },
        allocateTo: AllocateTo.ALLOCATE_TO_ANOTHER_PERSON,
        durationOfRole: DurationOfRole.SEVEN_DAYS,
        period: {
          startDate: new Date('2029-01-15')
        }
      };

      const result = toDenySARoleAssignmentBody(currentUser, allocateRoleData);

      expect(result.roleRequest.assignerId).to.equal('reviewer456');
      expect(result.requestedRoles[0].attributes.requestedRole).to.equal('specific-access-legal-ops');
      expect(result.requestedRoles[0].attributes.infoRequired).to.be.true;
      expect(result.requestedRoles[0].attributes.infoRequiredComment).to.equal('Need manager approval');
    });

    it('should handle ADMIN category', () => {
      const currentUser: UserInfo = {
        id: 'reviewer789',
        roleCategory: 'ADMIN',
        name: 'Admin Reviewer'
      };
      const allocateRoleData: AllocateRoleData = {
        caseId: 'case666',
        action: 'deny',
        roleCategory: RoleCategory.ADMIN,
        assigneeId: 'user666',
        specificAccessReason: 'Invalid request',
        requestCreated: new Date('2029-01-12'),
        accessReason: 'Denied',
        comment: 'Does not meet criteria',
        typeOfRole: { id: 'specific-access', name: 'Specific Access' },
        allocateTo: AllocateTo.ALLOCATE_TO_ANOTHER_PERSON,
        durationOfRole: DurationOfRole.SEVEN_DAYS,
        period: {
          startDate: new Date('2029-01-15')
        }
      };

      const result = toDenySARoleAssignmentBody(currentUser, allocateRoleData);

      expect(result.requestedRoles[0].attributes.requestedRole).to.equal('specific-access-admin');
    });

    it('should handle CTSC category', () => {
      const currentUser: UserInfo = {
        id: 'reviewer012',
        roleCategory: 'CTSC',
        name: 'CTSC Reviewer'
      };
      const allocateRoleData: AllocateRoleData = {
        caseId: 'case777',
        action: 'deny',
        roleCategory: RoleCategory.CTSC,
        assigneeId: 'user777',
        specificAccessReason: 'Not required',
        requestCreated: new Date('2029-01-13'),
        accessReason: 'Denied',
        comment: 'Alternative solution available',
        typeOfRole: { id: 'specific-access', name: 'Specific Access' },
        allocateTo: AllocateTo.ALLOCATE_TO_ANOTHER_PERSON,
        durationOfRole: DurationOfRole.SEVEN_DAYS,
        period: {
          startDate: new Date('2029-01-15')
        }
      };

      const result = toDenySARoleAssignmentBody(currentUser, allocateRoleData);

      expect(result.requestedRoles[0].attributes.requestedRole).to.equal('specific-access-ctsc');
    });

    it('should handle unknown role category', () => {
      const currentUser: UserInfo = {
        id: 'reviewer345',
        roleCategory: 'UNKNOWN',
        name: 'Unknown Reviewer'
      };
      const allocateRoleData: AllocateRoleData = {
        caseId: 'case888',
        action: 'deny',
        roleCategory: 'UNKNOWN' as RoleCategory,
        assigneeId: 'user888',
        specificAccessReason: 'Test',
        requestCreated: new Date('2029-01-14'),
        accessReason: 'Denied',
        comment: 'Test comment',
        typeOfRole: { id: 'specific-access', name: 'Specific Access' },
        allocateTo: AllocateTo.ALLOCATE_TO_ANOTHER_PERSON,
        durationOfRole: DurationOfRole.SEVEN_DAYS,
        period: {
          startDate: new Date('2029-01-15')
        }
      };

      const result = toDenySARoleAssignmentBody(currentUser, allocateRoleData);

      expect(result.requestedRoles[0].attributes.requestedRole).to.be.undefined;
    });

    it('should include extra attributes when provided', () => {
      const currentUser: UserInfo = {
        id: 'reviewer678',
        roleCategory: 'JUDICIAL',
        name: 'Judge Reviewer'
      };
      const allocateRoleData: AllocateRoleData = {
        caseId: 'case999',
        action: 'deny',
        roleCategory: RoleCategory.JUDICIAL,
        assigneeId: 'user999',
        specificAccessReason: 'Test reason',
        requestCreated: new Date('2029-01-14'),
        accessReason: 'Denied',
        comment: 'Test denial',
        typeOfRole: { id: 'specific-access', name: 'Specific Access' },
        allocateTo: AllocateTo.ALLOCATE_TO_ANOTHER_PERSON,
        durationOfRole: DurationOfRole.SEVEN_DAYS,
        period: {
          startDate: new Date('2029-01-15')
        }
      };
      const extraAttributes = { additionalInfo: 'test', priority: 'low' };

      const result = toDenySARoleAssignmentBody(currentUser, allocateRoleData, extraAttributes);

      expect(result.requestedRoles[0].attributes).to.include({
        additionalInfo: 'test',
        priority: 'low'
      });
    });

    it('should set correct note with timestamp', () => {
      const currentUser: UserInfo = {
        id: 'reviewer901',
        roleCategory: 'JUDICIAL',
        name: 'Judge Reviewer'
      };
      const allocateRoleData: AllocateRoleData = {
        caseId: 'case101',
        action: 'deny',
        roleCategory: RoleCategory.JUDICIAL,
        assigneeId: 'user101',
        specificAccessReason: 'Test',
        requestCreated: new Date('2029-01-14'),
        accessReason: 'Denied',
        comment: 'Denial reason here',
        typeOfRole: { id: 'specific-access', name: 'Specific Access' },
        allocateTo: AllocateTo.ALLOCATE_TO_ANOTHER_PERSON,
        durationOfRole: DurationOfRole.SEVEN_DAYS,
        period: {
          startDate: new Date('2029-01-15')
        }
      };

      const result = toDenySARoleAssignmentBody(currentUser, allocateRoleData);

      expect(result.requestedRoles[0].notes[0].comment).to.equal('Denial reason here');
      expect(result.requestedRoles[0].notes[0].time).to.deep.equal(mockDate);
      expect(result.requestedRoles[0].notes[0].userId).to.equal('reviewer901');
    });
  });

  describe('toDenySADletionRequestedRoleBody', () => {
    it('should create deletion request body with correct structure', () => {
      const requestId = 'request123';

      const result = toDenySADletionRequestedRoleBody(requestId);

      expect(result).to.deep.equal({
        pathVariables: {
          process: 'staff-organisational-role-mapping',
          reference: 'request123'
        },
        queryParams: null,
        body: {
          userIds: ['request123']
        },
        multipart: false
      });
    });

    it('should handle different request IDs', () => {
      const requestId = 'complex-request-456-xyz';

      const result = toDenySADletionRequestedRoleBody(requestId);

      expect(result.pathVariables.reference).to.equal('complex-request-456-xyz');
      expect(result.body.userIds).to.deep.equal(['complex-request-456-xyz']);
    });
  });

  describe('toSARequestRoleAssignmentBody', () => {
    it('should create request role assignment body with end date', () => {
      const allocateRoleData: AllocateRoleData = {
        caseId: 'case202',
        action: 'request',
        person: { id: 'person202', name: 'Jane Doe', email: 'jane@example.com', domain: PersonRole.LEGAL_OPERATIONS },
        requestedRole: 'specific-access-legal-ops',
        roleCategory: RoleCategory.LEGAL_OPERATIONS,
        specificReason: 'Need access for review',
        period: {
          startDate: new Date('2029-01-20'),
          endDate: new Date('2029-01-27')
        },
        typeOfRole: { id: 'specific-access', name: 'Specific Access' },
        allocateTo: AllocateTo.ALLOCATE_TO_ANOTHER_PERSON,
        durationOfRole: DurationOfRole.SEVEN_DAYS
      };

      const result = toSARequestRoleAssignmentBody(allocateRoleData);

      expect(result.roleRequest).to.deep.equal({
        assignerId: 'person202',
        replaceExisting: true,
        process: 'specific-access',
        reference: 'case202/specific-access-legal-ops/person202'
      });
      expect(result.requestedRoles[0].roleName).to.equal('specific-access-requested');
      expect(result.requestedRoles[0].beginTime).to.deep.equal(mockDate);
      expect(result.requestedRoles[0].endTime).to.deep.equal(new Date('2029-01-27'));
    });

    it('should handle no end date by setting default one month ahead', () => {
      const allocateRoleData: AllocateRoleData = {
        caseId: 'case303',
        action: 'request',
        person: { id: 'person303', name: 'John Smith', email: 'john@example.com', domain: PersonRole.ADMIN },
        requestedRole: 'specific-access-admin',
        roleCategory: RoleCategory.ADMIN,
        specificReason: 'Admin access required',
        period: {
          startDate: new Date('2029-01-15')
        },
        typeOfRole: { id: 'specific-access', name: 'Specific Access' },
        allocateTo: AllocateTo.ALLOCATE_TO_ANOTHER_PERSON,
        durationOfRole: DurationOfRole.INDEFINITE
      };

      const result = toSARequestRoleAssignmentBody(allocateRoleData);

      const expectedEndDate = new Date('2029-02-15T10:00:00.000Z');
      expect(result.requestedRoles[0].endTime).to.deep.equal(expectedEndDate);
    });

    it('should handle null period by setting default one month ahead', () => {
      const allocateRoleData: AllocateRoleData = {
        caseId: 'case404',
        action: 'request',
        person: { id: 'person404', name: 'Test User', email: 'test@example.com', domain: PersonRole.CTSC },
        requestedRole: 'specific-access-ctsc',
        roleCategory: RoleCategory.CTSC,
        specificReason: 'CTSC support needed',
        period: null as any,
        typeOfRole: { id: 'specific-access', name: 'Specific Access' },
        allocateTo: AllocateTo.ALLOCATE_TO_ANOTHER_PERSON,
        durationOfRole: DurationOfRole.ANOTHER_PERIOD
      };

      const result = toSARequestRoleAssignmentBody(allocateRoleData);

      const expectedEndDate = new Date('2029-02-15T10:00:00.000Z');
      expect(result.requestedRoles[0].endTime).to.deep.equal(expectedEndDate);
    });

    it('should include extra attributes when provided', () => {
      const allocateRoleData: AllocateRoleData = {
        caseId: 'case505',
        action: 'request',
        person: { id: 'person505', name: 'Extra User', email: 'extra@example.com', domain: PersonRole.JUDICIAL },
        requestedRole: 'specific-access-judicial',
        roleCategory: RoleCategory.JUDICIAL,
        specificReason: 'Judicial review',
        period: {
          startDate: new Date('2029-01-20'),
          endDate: new Date('2029-01-25')
        },
        typeOfRole: { id: 'specific-access', name: 'Specific Access' },
        allocateTo: AllocateTo.ALLOCATE_TO_ANOTHER_PERSON,
        durationOfRole: DurationOfRole.SEVEN_DAYS
      };
      const extraAttributes = { urgency: 'high', department: 'legal' };

      const result = toSARequestRoleAssignmentBody(allocateRoleData, extraAttributes);

      expect(result.requestedRoles[0].attributes).to.include({
        caseId: 'case505',
        requestedRole: 'specific-access-judicial',
        urgency: 'high',
        department: 'legal'
      });
    });

    it('should format notes with specific reason', () => {
      const allocateRoleData: AllocateRoleData = {
        caseId: 'case606',
        action: 'request',
        person: { id: 'person606', name: 'Note User', email: 'note@example.com', domain: PersonRole.LEGAL_OPERATIONS },
        requestedRole: 'specific-access-legal-ops',
        roleCategory: RoleCategory.LEGAL_OPERATIONS,
        specificReason: 'Complex case requiring specialist review',
        period: {
          startDate: new Date('2029-01-20'),
          endDate: new Date('2029-01-27')
        },
        typeOfRole: { id: 'specific-access', name: 'Specific Access' },
        allocateTo: AllocateTo.ALLOCATE_TO_ANOTHER_PERSON,
        durationOfRole: DurationOfRole.SEVEN_DAYS
      };

      const result = toSARequestRoleAssignmentBody(allocateRoleData);

      expect(result.requestedRoles[0].notes[0].comment).to.equal('{"specificReason":Complex case requiring specialist review}');
      expect(result.requestedRoles[0].notes[0].time).to.equal(mockDate.toISOString());
      expect(result.requestedRoles[0].notes[0].userId).to.equal('person606');
    });
  });

  describe('getActorId', () => {
    it('should return current user ID when allocate to me', () => {
      const currentUserId = 'current123';
      const allocateRoleData: AllocateRoleData = {
        caseId: 'case707',
        action: 'allocate',
        allocateTo: AllocateTo.ALLOCATE_TO_ME,
        typeOfRole: { id: 'lead-judge', name: 'Lead Judge' },
        durationOfRole: DurationOfRole.SEVEN_DAYS,
        period: {
          startDate: new Date('2029-01-15')
        }
      };

      const result = getActorId(currentUserId, allocateRoleData);

      expect(result).to.equal('current123');
    });

    it('should return person ID when allocate to another person', () => {
      const currentUserId = 'current456';
      const allocateRoleData: AllocateRoleData = {
        caseId: 'case808',
        action: 'allocate',
        allocateTo: AllocateTo.ALLOCATE_TO_ANOTHER_PERSON,
        person: { id: 'person808', name: 'Other Person', email: 'other@example.com', domain: PersonRole.ADMIN },
        typeOfRole: { id: 'case-manager', name: 'Case Manager' },
        durationOfRole: DurationOfRole.INDEFINITE,
        period: {
          startDate: new Date('2029-01-15')
        }
      };

      const result = getActorId(currentUserId, allocateRoleData);

      expect(result).to.equal('person808');
    });

    it('should throw error when person is not defined for allocate to another', () => {
      const currentUserId = 'current789';
      const allocateRoleData: AllocateRoleData = {
        caseId: 'case909',
        action: 'allocate',
        allocateTo: AllocateTo.ALLOCATE_TO_ANOTHER_PERSON,
        typeOfRole: { id: 'hearing-judge', name: 'Hearing Judge' },
        durationOfRole: DurationOfRole.ANOTHER_PERIOD,
        period: {
          startDate: new Date('2029-01-15')
        }
      };

      expect(() => getActorId(currentUserId, allocateRoleData)).to.throw(TypeError);
    });
  });
});
