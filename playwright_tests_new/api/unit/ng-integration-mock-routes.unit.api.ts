import { expect, test } from '@playwright/test';
import {
  buildNgIntegrationClientContextMock,
  buildNgIntegrationEnvironmentConfigMock,
  buildNgIntegrationUserDetailsMock,
  setupNgIntegrationBaseRoutes,
} from '../../integration/helpers/ngIntegrationMockRoutes.helper.js';

type RegisteredRoute = {
  pattern: string | RegExp;
  handler: (route: { fulfill: (payload: unknown) => Promise<void> }) => Promise<void>;
};

function createFakePage() {
  const routes: RegisteredRoute[] = [];
  const initScripts: unknown[] = [];

  return {
    initScripts,
    routes,
    async addInitScript(handler: unknown, args: unknown[]) {
      initScripts.push({ handler, args });
    },
    async route(pattern: string | RegExp, handler: RegisteredRoute['handler']) {
      routes.push({ pattern, handler });
    },
  };
}

async function invokeRoute(route: RegisteredRoute) {
  const fulfillCalls: unknown[] = [];

  await route.handler({
    fulfill: async (payload: unknown) => {
      fulfillCalls.push(payload);
    },
  });

  return fulfillCalls;
}

test.describe('ng integration mock routes helper', { tag: '@svc-internal' }, () => {
  test('builds user details with explicit role-assignment data', () => {
    const userDetails = buildNgIntegrationUserDetailsMock({
      userId: 'wave2-user-id',
      roleAssignmentInfo: [{ jurisdiction: 'IA', roleType: 'ORGANISATION' }],
      roles: ['caseworker-ia'],
    });

    expect(userDetails.userInfo).toEqual(
      expect.objectContaining({
        id: 'wave2-user-id',
        uid: 'wave2-user-id',
        roles: ['caseworker-ia'],
      })
    );
    expect(userDetails.roleAssignmentInfo).toEqual([{ jurisdiction: 'IA', roleType: 'ORGANISATION' }]);
  });

  test('builds environment config with work-allocation defaults enabled', () => {
    const environmentConfig = buildNgIntegrationEnvironmentConfigMock({
      accessManagementEnabled: true,
      waWorkflowApi: '/workallocation',
    });

    expect(environmentConfig).toEqual(
      expect.objectContaining({
        accessManagementEnabled: true,
        waWorkflowApi: '/workallocation',
        oidcEnabled: true,
      })
    );
  });

  test('seeds the expected client-context feature flags', () => {
    const clientContext = buildNgIntegrationClientContextMock({
      'feature-refunds': false,
      'feature-wave2-test-flag': true,
    });

    expect(clientContext).toEqual({
      client_context: {
        feature_flags: expect.objectContaining({
          MC_Work_Allocation: true,
          'feature-refunds': false,
          'feature-wave2-test-flag': true,
          'mc-work-allocation-active-feature': 'WorkAllocationRelease2',
        }),
        user_language: {
          language: 'en',
        },
      },
    });
  });

  test('registers the base ng-integration routes and seeds session storage', async () => {
    const fakePage = createFakePage();

    await setupNgIntegrationBaseRoutes(fakePage as never, {
      userDetails: {
        userId: 'wave2-user-id',
        roles: ['caseworker-ia'],
      },
      clientContextFeatureFlags: {
        'feature-wave2-test-flag': true,
      },
    });

    expect(fakePage.initScripts).toHaveLength(1);
    expect(fakePage.routes.map(({ pattern }) => pattern)).toEqual([
      '**/api/user/details*',
      '**/assets/config/config.json*',
      /\/external\/config\/ui(?:\/|\?|$)/,
      '**/api/role-access/roles/manageLabellingRoleAssignment/**',
      '**/api/role-access/roles/access-get-by-caseId*',
      '**/api/wa-supported-jurisdiction/get*',
      '**/workallocation/caseworker/getUsersByServiceName*',
      '**/api/prd/judicial/searchJudicialUserByIdamId*',
      '**/api/role-access/roles/getJudicialUsers*',
      '**/api/role-access/roles/get-my-access-new-count*',
    ]);

    const fulfilledBodies = await Promise.all(fakePage.routes.map(invokeRoute));
    const firstRoutePayload = fulfilledBodies[0][0] as { body: string };
    const firstRouteBody = JSON.parse(firstRoutePayload.body) as {
      userInfo?: { id?: string; roles?: string[] };
    };

    expect(firstRoutePayload).toEqual(
      expect.objectContaining({
        status: 200,
        contentType: 'application/json',
      })
    );
    expect(firstRouteBody.userInfo).toEqual(
      expect.objectContaining({
        id: 'wave2-user-id',
        roles: ['caseworker-ia'],
      })
    );
    expect(fulfilledBodies[9]).toEqual([
      {
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ count: 0 }),
      },
    ]);
  });
});
