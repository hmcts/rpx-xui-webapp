import { expect } from 'chai';
import { LEGAL_OPS_TYPE } from './constants';
import { getActiveRoleAssignments } from './index';
import { RoleAssignment } from './interfaces/roleAssignment';

describe('Index', () => {
  let roleAssignments: RoleAssignment[];
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
        primaryLocation: '231596',
        jurisdiction: 'IA'
      }
    }]
  });


  describe('getActiveRoleAssignments', () => {
    it('should return role assignment if end date is empty', async () => {
      const activeRoleAsignments = getActiveRoleAssignments(roleAssignments);
      expect(activeRoleAsignments.length).to.equal(1);
    });

    it('should return role assignment if end date is tomorrow (not expired)', async () => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      roleAssignments[0].endTime = tomorrow;
      const activeRoleAsignments = getActiveRoleAssignments(roleAssignments);
      expect(activeRoleAsignments.length).to.equal(1);
    });

    it('should return role assignment if end date is yesterday (expired)', async () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      roleAssignments[0].endTime = yesterday;
      const activeRoleAsignments = getActiveRoleAssignments(roleAssignments);
      expect(activeRoleAsignments.length).to.equal(0);
    });
  });
});

