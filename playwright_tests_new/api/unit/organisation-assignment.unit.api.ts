import { expect, test } from '@playwright/test';

import { shouldPreferManageOrgInvitePrimaryForPrincipal } from '../../E2E/utils/professional-user/organisationAssignment.js';

test.describe('Organisation assignment path selection unit tests', { tag: '@svc-internal' }, () => {
  test('auto mode prefers manage-org primary for principals with manage-org roles', () => {
    expect(
      shouldPreferManageOrgInvitePrimaryForPrincipal('auto', {
        source: 'jwt-roles',
        roles: ['pui-user-manager', 'pui-organisation-manager'],
      })
    ).toBe(true);
  });

  test('auto mode preserves RD-first behavior for principals without manage-org roles', () => {
    expect(
      shouldPreferManageOrgInvitePrimaryForPrincipal('auto', {
        source: 'jwt-roles',
        roles: ['prd-admin'],
      })
    ).toBe(false);
  });

  test('explicit requested modes do not switch to manage-org primary implicitly', () => {
    expect(
      shouldPreferManageOrgInvitePrimaryForPrincipal('external', {
        source: 'jwt-roles',
        roles: ['pui-user-manager', 'pui-organisation-manager'],
      })
    ).toBe(false);
  });
});
