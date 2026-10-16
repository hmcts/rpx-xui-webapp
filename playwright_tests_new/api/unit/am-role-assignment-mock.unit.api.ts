import { expect, test } from '@playwright/test';
import {
  buildSupportedAMRoleAssignments,
  defaultStaffAMMenuRole,
  ensureSupportedAMRoleAssignment,
  isSupportedAMMenuAssignment,
  resolveAMRoleCategory,
  uniqueRoles,
} from '../../integration/helpers/amRoleAssignmentMock.helper.js';

test.describe('AM role assignment mock helper', { tag: '@svc-internal' }, () => {
  test('builds supported AM role assignments for each jurisdiction', () => {
    expect(buildSupportedAMRoleAssignments(['hmcts-admin', 'hmcts-ctsc'], ['IA', 'CIVIL'])).toEqual([
      expect.objectContaining({
        jurisdiction: 'IA',
        roleCategory: 'ADMIN',
        roleName: 'hmcts-admin',
        roleType: 'ORGANISATION',
      }),
      expect.objectContaining({
        jurisdiction: 'CIVIL',
        roleCategory: 'ADMIN',
        roleName: 'hmcts-admin',
        roleType: 'ORGANISATION',
      }),
      expect.objectContaining({
        jurisdiction: 'IA',
        roleCategory: 'CTSC',
        roleName: 'hmcts-ctsc',
        roleType: 'ORGANISATION',
      }),
      expect.objectContaining({
        jurisdiction: 'CIVIL',
        roleCategory: 'CTSC',
        roleName: 'hmcts-ctsc',
        roleType: 'ORGANISATION',
      }),
    ]);
  });

  test('enriches an existing organisation assignment without adding another service', () => {
    const assignments = ensureSupportedAMRoleAssignment(
      [
        { jurisdiction: 'IA', roleType: 'CASE', substantive: 'Y' },
        { jurisdiction: 'SSCS', roleType: 'ORGANISATION', substantive: 'Y', baseLocation: '30001' },
      ],
      defaultStaffAMMenuRole,
      ['IA']
    );

    expect(assignments).toEqual([
      { jurisdiction: 'IA', roleType: 'CASE', substantive: 'Y' },
      {
        jurisdiction: 'SSCS',
        roleType: 'ORGANISATION',
        substantive: 'Y',
        baseLocation: '30001',
        roleCategory: 'LEGAL_OPERATIONS',
        roleName: defaultStaffAMMenuRole,
      },
    ]);
  });

  test('keeps existing role names and appends a fallback AM assignment when none can be enriched', () => {
    const assignments = ensureSupportedAMRoleAssignment(
      [{ jurisdiction: 'IA', roleName: 'task-supervisor', roleType: 'ORGANISATION', substantive: 'Y' }],
      defaultStaffAMMenuRole,
      ['CIVIL']
    );

    expect(assignments).toEqual([
      { jurisdiction: 'IA', roleName: 'task-supervisor', roleType: 'ORGANISATION', substantive: 'Y' },
      expect.objectContaining({
        jurisdiction: 'CIVIL',
        roleCategory: 'LEGAL_OPERATIONS',
        roleName: defaultStaffAMMenuRole,
        roleType: 'ORGANISATION',
      }),
    ]);
  });

  test('does not treat a matching role name as supported without the AM category and type contract', () => {
    const assignments = ensureSupportedAMRoleAssignment(
      [{ jurisdiction: 'IA', roleName: defaultStaffAMMenuRole, roleType: 'CASE', substantive: 'Y' }],
      defaultStaffAMMenuRole,
      ['IA']
    );

    expect(isSupportedAMMenuAssignment(assignments[0], defaultStaffAMMenuRole)).toBe(false);
    expect(assignments).toEqual([
      { jurisdiction: 'IA', roleName: defaultStaffAMMenuRole, roleType: 'CASE', substantive: 'Y' },
      expect.objectContaining({
        jurisdiction: 'IA',
        roleCategory: 'LEGAL_OPERATIONS',
        roleName: defaultStaffAMMenuRole,
        roleType: 'ORGANISATION',
      }),
    ]);
  });

  test('maps known AM role names and de-duplicates user roles', () => {
    expect(resolveAMRoleCategory('hmcts-judiciary')).toBe('JUDICIAL');
    expect(uniqueRoles(['caseworker-ia', defaultStaffAMMenuRole, 'caseworker-ia'])).toEqual([
      'caseworker-ia',
      defaultStaffAMMenuRole,
    ]);
  });
});
