import { ApiClient } from '@hmcts/playwright-common';
import { expect, test } from '@playwright/test';

import {
  assignUserToOrganisationFlow,
  shouldPreferManageOrgInvitePrimaryForPrincipal,
} from '../../E2E/utils/professional-user/organisationAssignment.js';
import { hydrateAssignmentUserRolesResolutionFromIdamUserInfo } from '../../E2E/utils/professional-user/runtime.js';

test.describe.configure({ mode: 'serial' });

test.describe('Organisation assignment path selection unit tests', { tag: '@svc-internal' }, () => {
  const baseArgs = {
    organisationId: 'org-123',
    options: {
      user: {
        email: 'dynamic@example.test',
        password: 'secret',
        forename: 'Dynamic',
        surname: 'User',
        roleNames: ['caseworker'],
      },
      assignmentBearerToken: 'override-assignment-token',
      serviceToken: 'override-service-token',
    },
    requestedMode: 'auto' as const,
    modesToTry: ['external'] as const,
    roles: ['caseworker'],
    payload: {
      firstName: 'Dynamic',
      lastName: 'User',
      email: 'dynamic@example.test',
      roles: ['caseworker'],
      resendInvite: false,
    },
    assignmentRequestTimeoutMs: 5_000,
  };

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

  test('userinfo role hydration recovers manage-org-capable roles when JWT claims are unmapped', () => {
    expect(
      hydrateAssignmentUserRolesResolutionFromIdamUserInfo(
        {
          source: 'jwt-claims-unmapped',
        },
        {
          status: 200,
          body: {
            roles: ['pui-user-manager', 'pui-organisation-manager', 'prd-admin'],
          },
        }
      )
    ).toEqual({
      source: 'idam-userinfo-roles',
      roles: ['pui-user-manager', 'pui-organisation-manager', 'prd-admin'],
    });
  });

  test('external 409 conflict is not treated as success when reconciliation is skipped', async () => {
    const originalPost = ApiClient.prototype.post;
    const originalDispose = ApiClient.prototype.dispose;
    ApiClient.prototype.post = (async () => {
      throw new Error('Status Code: 409');
    }) as never;
    ApiClient.prototype.dispose = (async () => undefined) as never;

    try {
      await expect(
        assignUserToOrganisationFlow(baseArgs, {
          inviteUserViaManageOrgApi: async () => {
            throw new Error('should-not-invite');
          },
          isUserVisibleInOrganisationAssignment: async () => false,
          resolveAssignmentPrerequisites: async () => ({
            assignmentBearerToken: 'assignment-token',
            serviceToken: 'service-token',
            rdProfessionalApiPath: 'https://rd-professional.example',
            headers: {},
            assignmentUserRoles: {
              source: 'jwt-roles',
              roles: ['prd-admin'],
            },
          }),
          waitForUserPropagation: async () => ({
            verified: true,
            degraded: false,
            reason: 'ready',
          }),
          reconcileExistingOrganisationAssignment: async () => ({
            status: 'skipped',
          }),
          collectAssignmentFailureDiagnostics: async () => ({}),
        })
      ).rejects.toThrow(/could not be reconciled/i);
    } finally {
      ApiClient.prototype.post = originalPost;
      ApiClient.prototype.dispose = originalDispose;
    }
  });

  test('manage-org primary path forwards explicit assignment overrides', async () => {
    const inviteCalls: Array<{ assignmentBearerToken?: string; serviceToken?: string }> = [];

    const result = await assignUserToOrganisationFlow(baseArgs, {
      inviteUserViaManageOrgApi: async (params) => {
        inviteCalls.push({
          assignmentBearerToken: params.assignmentBearerToken,
          serviceToken: params.serviceToken,
        });
        return {
          status: 201,
          responseBody: { ok: true },
        };
      },
      isUserVisibleInOrganisationAssignment: async () => true,
      resolveAssignmentPrerequisites: async () => ({
        assignmentBearerToken: 'assignment-token',
        serviceToken: 'service-token',
        rdProfessionalApiPath: 'https://rd-professional.example',
        headers: {},
        assignmentUserRoles: {
          source: 'jwt-roles',
          roles: ['pui-user-manager', 'pui-organisation-manager'],
        },
      }),
      waitForUserPropagation: async () => ({
        verified: true,
        degraded: false,
        reason: 'ready',
      }),
      reconcileExistingOrganisationAssignment: async () => ({
        status: 200,
      }),
      collectAssignmentFailureDiagnostics: async () => ({}),
    });

    expect(inviteCalls).toEqual([
      {
        assignmentBearerToken: 'override-assignment-token',
        serviceToken: 'override-service-token',
      },
    ]);
    expect(result.responseBody).toEqual({
      assignmentPath: 'manage-org-invite-primary',
      payload: { ok: true },
    });
  });

  test('manage-org fallback forwards explicit assignment overrides after RD failure', async () => {
    const originalPost = ApiClient.prototype.post;
    const originalDispose = ApiClient.prototype.dispose;
    const originalFallbackFlag = process.env.PROFESSIONAL_USER_ENABLE_MANAGE_ORG_FALLBACK;
    const originalPrimaryFlag = process.env.PROFESSIONAL_USER_ASSIGNMENT_USE_MANAGE_ORG_PRIMARY;
    const inviteCalls: Array<{ assignmentBearerToken?: string; serviceToken?: string }> = [];
    process.env.PROFESSIONAL_USER_ENABLE_MANAGE_ORG_FALLBACK = 'true';
    process.env.PROFESSIONAL_USER_ASSIGNMENT_USE_MANAGE_ORG_PRIMARY = 'false';
    ApiClient.prototype.post = (async () => {
      throw new Error('Status Code: 403');
    }) as never;
    ApiClient.prototype.dispose = (async () => undefined) as never;

    try {
      const result = await assignUserToOrganisationFlow(
        {
          ...baseArgs,
          requestedMode: 'external',
        },
        {
          inviteUserViaManageOrgApi: async (params) => {
            inviteCalls.push({
              assignmentBearerToken: params.assignmentBearerToken,
              serviceToken: params.serviceToken,
            });
            return {
              status: 201,
              responseBody: { ok: true },
            };
          },
          isUserVisibleInOrganisationAssignment: async () => false,
          resolveAssignmentPrerequisites: async () => ({
            assignmentBearerToken: 'assignment-token',
            serviceToken: 'service-token',
            rdProfessionalApiPath: 'https://rd-professional.example',
            headers: {},
            assignmentUserRoles: {
              source: 'jwt-roles',
              roles: ['prd-admin'],
            },
          }),
          waitForUserPropagation: async () => ({
            verified: true,
            degraded: false,
            reason: 'ready',
          }),
          reconcileExistingOrganisationAssignment: async () => ({
            status: 200,
          }),
          collectAssignmentFailureDiagnostics: async () => ({}),
        }
      );

      expect(inviteCalls).toEqual([
        {
          assignmentBearerToken: 'override-assignment-token',
          serviceToken: 'override-service-token',
        },
      ]);
      expect(result.responseBody).toEqual({
        fallback: 'manage-org-invite',
        payload: { ok: true },
      });
    } finally {
      if (typeof originalFallbackFlag === 'string') {
        process.env.PROFESSIONAL_USER_ENABLE_MANAGE_ORG_FALLBACK = originalFallbackFlag;
      } else {
        delete process.env.PROFESSIONAL_USER_ENABLE_MANAGE_ORG_FALLBACK;
      }
      if (typeof originalPrimaryFlag === 'string') {
        process.env.PROFESSIONAL_USER_ASSIGNMENT_USE_MANAGE_ORG_PRIMARY = originalPrimaryFlag;
      } else {
        delete process.env.PROFESSIONAL_USER_ASSIGNMENT_USE_MANAGE_ORG_PRIMARY;
      }
      ApiClient.prototype.post = originalPost;
      ApiClient.prototype.dispose = originalDispose;
    }
  });
});
