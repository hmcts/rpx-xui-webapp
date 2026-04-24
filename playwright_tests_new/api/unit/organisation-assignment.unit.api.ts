import { ApiClient } from '@hmcts/playwright-common';
import { expect, test } from '@playwright/test';

import {
  assignUserToOrganisationFlow,
  shouldPreferManageOrgInvitePrimaryForPrincipal,
} from '../../E2E/utils/professional-user/organisationAssignment.js';
import {
  buildHeaders,
  filterSupportedOrganisationAssignmentRoles,
  hydrateAssignmentUserRolesResolutionFromIdamUserInfo,
} from '../../E2E/utils/professional-user/runtime.js';

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

  test('auto mode accepts hydrated IDAM userinfo manage-org roles when JWT claims are unmapped', () => {
    expect(
      shouldPreferManageOrgInvitePrimaryForPrincipal('auto', {
        source: 'idam-userinfo-roles',
        roles: ['pui-user-manager', 'pui-organisation-manager'],
      })
    ).toBe(true);
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

  test('supported organisation-assignment target roles can be derived separately from hydrated principal roles', () => {
    expect(
      filterSupportedOrganisationAssignmentRoles([
        'prd-aac-system',
        'pui-user-manager',
        'prd-admin',
        'pui-organisation-manager',
        'payments-refund',
      ])
    ).toEqual(['pui-user-manager', 'pui-organisation-manager']);
  });

  test('userinfo role hydration preserves unsupported privileged principal roles for downstream auth context', () => {
    expect(
      hydrateAssignmentUserRolesResolutionFromIdamUserInfo(
        {
          source: 'jwt-claims-unmapped',
        },
        {
          status: 200,
          body: {
            roles: ['prd-aac-system', 'prd-admin', 'payments-refund', 'xui-approver-userdata'],
          },
        }
      )
    ).toEqual({
      source: 'idam-userinfo-roles',
      roles: ['prd-aac-system', 'prd-admin', 'payments-refund', 'xui-approver-userdata'],
    });
  });

  test('raw hydrated principal roles are still forwarded into auth headers when required', () => {
    const hydrated = hydrateAssignmentUserRolesResolutionFromIdamUserInfo(
      {
        source: 'jwt-claims-unmapped',
      },
      {
        status: 200,
        body: {
          roles: ['pui-user-manager', 'prd-admin'],
        },
      }
    );

    expect(buildHeaders('assignment-token', 'service-token', hydrated.roles)).toEqual({
      Authorization: 'Bearer assignment-token',
      ServiceAuthorization: 'Bearer service-token',
      accept: 'application/json',
      'content-type': 'application/json',
      'x-user-roles': 'pui-user-manager,prd-admin',
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

  test('auto mode falls back to RD assignment when manage-org primary fails', async () => {
    const originalPost = ApiClient.prototype.post;
    const originalDispose = ApiClient.prototype.dispose;
    const originalPrimaryFlag = process.env.PROFESSIONAL_USER_ASSIGNMENT_USE_MANAGE_ORG_PRIMARY;
    const originalFallbackFlag = process.env.PROFESSIONAL_USER_ENABLE_MANAGE_ORG_FALLBACK;
    const inviteCalls: Array<{ assignmentBearerToken?: string; serviceToken?: string }> = [];
    delete process.env.PROFESSIONAL_USER_ASSIGNMENT_USE_MANAGE_ORG_PRIMARY;
    delete process.env.PROFESSIONAL_USER_ENABLE_MANAGE_ORG_FALLBACK;

    ApiClient.prototype.post = (async () =>
      ({
        status: 201,
        data: { userIdentifier: 'rd-user-id' },
      }) as never) as never;
    ApiClient.prototype.dispose = (async () => undefined) as never;

    try {
      const result = await assignUserToOrganisationFlow(baseArgs, {
        inviteUserViaManageOrgApi: async (params) => {
          inviteCalls.push({
            assignmentBearerToken: params.assignmentBearerToken,
            serviceToken: params.serviceToken,
          });
          throw new Error('Manage-org invite failed with status 403: Forbidden');
        },
        isUserVisibleInOrganisationAssignment: async () => false,
        resolveAssignmentPrerequisites: async () => ({
          assignmentBearerToken: 'assignment-token',
          serviceToken: 'service-token',
          rdProfessionalApiPath: 'https://rd-professional.example',
          headers: {},
          assignmentUserRoles: {
            source: 'idam-userinfo-roles',
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
      expect(result).toMatchObject({
        mode: 'external',
        requestedMode: 'auto',
        attemptedModes: ['external'],
        status: 201,
        userIdentifier: 'rd-user-id',
      });
    } finally {
      if (typeof originalPrimaryFlag === 'string') {
        process.env.PROFESSIONAL_USER_ASSIGNMENT_USE_MANAGE_ORG_PRIMARY = originalPrimaryFlag;
      } else {
        delete process.env.PROFESSIONAL_USER_ASSIGNMENT_USE_MANAGE_ORG_PRIMARY;
      }
      if (typeof originalFallbackFlag === 'string') {
        process.env.PROFESSIONAL_USER_ENABLE_MANAGE_ORG_FALLBACK = originalFallbackFlag;
      } else {
        delete process.env.PROFESSIONAL_USER_ENABLE_MANAGE_ORG_FALLBACK;
      }
      ApiClient.prototype.post = originalPost;
      ApiClient.prototype.dispose = originalDispose;
    }
  });

  test('explicit manage-org primary failure still allows manage-org fallback after RD failure', async () => {
    const originalPost = ApiClient.prototype.post;
    const originalDispose = ApiClient.prototype.dispose;
    const originalFallbackFlag = process.env.PROFESSIONAL_USER_ENABLE_MANAGE_ORG_FALLBACK;
    const originalPrimaryFlag = process.env.PROFESSIONAL_USER_ASSIGNMENT_USE_MANAGE_ORG_PRIMARY;
    const originalRdFallbackFlag = process.env.PROFESSIONAL_USER_ENABLE_RD_FALLBACK_AFTER_MANAGE_ORG;
    const inviteCalls: Array<{ assignmentBearerToken?: string; serviceToken?: string }> = [];

    process.env.PROFESSIONAL_USER_ENABLE_MANAGE_ORG_FALLBACK = 'true';
    process.env.PROFESSIONAL_USER_ASSIGNMENT_USE_MANAGE_ORG_PRIMARY = 'true';
    process.env.PROFESSIONAL_USER_ENABLE_RD_FALLBACK_AFTER_MANAGE_ORG = 'true';

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
            if (inviteCalls.length === 1) {
              throw new Error('Manage-org invite failed with status 403: Forbidden');
            }
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
      if (typeof originalRdFallbackFlag === 'string') {
        process.env.PROFESSIONAL_USER_ENABLE_RD_FALLBACK_AFTER_MANAGE_ORG = originalRdFallbackFlag;
      } else {
        delete process.env.PROFESSIONAL_USER_ENABLE_RD_FALLBACK_AFTER_MANAGE_ORG;
      }
      ApiClient.prototype.post = originalPost;
      ApiClient.prototype.dispose = originalDispose;
    }
  });

  test('auto mode keeps manage-org fallback available after non-permission primary failure', async () => {
    const originalPost = ApiClient.prototype.post;
    const originalDispose = ApiClient.prototype.dispose;
    const originalFallbackFlag = process.env.PROFESSIONAL_USER_ENABLE_MANAGE_ORG_FALLBACK;
    const originalPrimaryFlag = process.env.PROFESSIONAL_USER_ASSIGNMENT_USE_MANAGE_ORG_PRIMARY;
    const inviteCalls: Array<{ assignmentBearerToken?: string; serviceToken?: string }> = [];

    process.env.PROFESSIONAL_USER_ENABLE_MANAGE_ORG_FALLBACK = 'true';
    delete process.env.PROFESSIONAL_USER_ASSIGNMENT_USE_MANAGE_ORG_PRIMARY;

    ApiClient.prototype.post = (async () => {
      throw new Error('Status Code: 403');
    }) as never;
    ApiClient.prototype.dispose = (async () => undefined) as never;

    try {
      const result = await assignUserToOrganisationFlow(baseArgs, {
        inviteUserViaManageOrgApi: async (params) => {
          inviteCalls.push({
            assignmentBearerToken: params.assignmentBearerToken,
            serviceToken: params.serviceToken,
          });
          if (inviteCalls.length === 1) {
            throw new Error('Manage-org invite failed with status 500: Internal Server Error');
          }
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
            source: 'idam-userinfo-roles',
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

  test('auto mode keeps manage-org fallback available after message-only primary failure', async () => {
    const originalPost = ApiClient.prototype.post;
    const originalDispose = ApiClient.prototype.dispose;
    const originalFallbackFlag = process.env.PROFESSIONAL_USER_ENABLE_MANAGE_ORG_FALLBACK;
    const originalPrimaryFlag = process.env.PROFESSIONAL_USER_ASSIGNMENT_USE_MANAGE_ORG_PRIMARY;
    const inviteCalls: Array<{ assignmentBearerToken?: string; serviceToken?: string }> = [];

    process.env.PROFESSIONAL_USER_ENABLE_MANAGE_ORG_FALLBACK = 'true';
    delete process.env.PROFESSIONAL_USER_ASSIGNMENT_USE_MANAGE_ORG_PRIMARY;

    ApiClient.prototype.post = (async () => {
      throw new Error('Status Code: 403');
    }) as never;
    ApiClient.prototype.dispose = (async () => undefined) as never;

    try {
      const result = await assignUserToOrganisationFlow(baseArgs, {
        inviteUserViaManageOrgApi: async (params) => {
          inviteCalls.push({
            assignmentBearerToken: params.assignmentBearerToken,
            serviceToken: params.serviceToken,
          });
          if (inviteCalls.length === 1) {
            throw new Error('token is expired');
          }
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
            source: 'idam-userinfo-roles',
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
