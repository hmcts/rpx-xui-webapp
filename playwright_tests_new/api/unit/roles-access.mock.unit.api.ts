import { expect, test } from '@playwright/test';
import {
  buildFindPersonResults,
  buildRolesAccessCaseRoles,
  buildRolesAccessUserDetailsMock,
  filterJudicialPeopleByIds,
  rolesAccessAllocatorRoleAssignments,
  rolesAccessNonAllocatorRoleAssignments,
} from '../../integration/mocks/rolesAccess.mock.js';

test.describe('roles-access mocks', { tag: '@svc-internal' }, () => {
  test('adds the case-allocator role only for allocator-backed user details', () => {
    const allocatorUser = buildRolesAccessUserDetailsMock({
      roleAssignmentInfo: [...rolesAccessAllocatorRoleAssignments],
    });
    const nonAllocatorUser = buildRolesAccessUserDetailsMock({
      roleAssignmentInfo: [...rolesAccessNonAllocatorRoleAssignments],
    });

    expect(allocatorUser.userInfo.roles).toContain('case-allocator');
    expect(nonAllocatorUser.userInfo.roles).not.toContain('case-allocator');
    expect(allocatorUser.roleAssignmentInfo).toHaveLength(2);
  });

  test('builds role rows with roleId and manage actions needed by the live table links', () => {
    expect(buildRolesAccessCaseRoles()).toEqual([
      expect.objectContaining({
        id: 'judicial-role-1',
        roleId: 'lead-judge',
        actions: [
          { id: 'reallocate', title: 'Reallocate' },
          { id: 'remove', title: 'Remove Allocation' },
        ],
      }),
      expect.objectContaining({
        id: 'legal-ops-role-1',
        roleId: 'case-manager',
        actions: [
          { id: 'reallocate', title: 'Reallocate' },
          { id: 'remove', title: 'Remove Allocation' },
        ],
      }),
    ]);
  });

  test('filters judicial users by requested ids and search term', () => {
    expect(filterJudicialPeopleByIds(['judicial-person-1'])).toEqual([
      expect.objectContaining({
        sidam_id: 'judicial-person-1',
      }),
    ]);

    expect(buildFindPersonResults('Replacement', 'Judicial')).toEqual([
      expect.objectContaining({
        id: 'judicial-replacement-1',
        name: 'Replacement Judge',
      }),
    ]);
    expect(buildFindPersonResults('Replacement', 'Legal Ops')).toEqual([]);
  });
});
