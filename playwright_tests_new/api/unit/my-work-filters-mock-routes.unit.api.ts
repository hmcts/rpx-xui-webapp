import { expect, test } from '@playwright/test';
import { myCasesRoutePattern } from '../../integration/helpers/manageTasksMockRoutes.helper.js';
import { myWorkSelectableLocations, setupMyWorkFilterRoutes } from '../../integration/helpers/myWorkFiltersMockRoutes.helper.js';

type RegisteredRoute = {
  pattern: string | RegExp;
  handler: (route: {
    fulfill: (payload: unknown) => Promise<void>;
    request: () => { url: () => string; method: () => string; postDataJSON: () => unknown };
  }) => Promise<void>;
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

function getLastRegisteredRoute(routes: RegisteredRoute[], pattern: string | RegExp) {
  return routes.filter((route) => route.pattern === pattern).at(-1);
}

async function invokeRoute(
  route: RegisteredRoute,
  request: Partial<ReturnType<RegisteredRoute['handler'] extends (route: infer T) => Promise<void> ? T['request'] : never>> = {}
) {
  const fulfillCalls: unknown[] = [];
  const fakeRequest = {
    method: () => 'POST',
    postDataJSON: () => ({}),
    url: () => 'http://localhost/mock',
    ...request,
  };

  await route.handler({
    fulfill: async (payload: unknown) => {
      fulfillCalls.push(payload);
    },
    request: () => fakeRequest,
  });

  return fulfillCalls;
}

test.describe('my work filters mock routes helper', { tag: '@svc-internal' }, () => {
  test('registers my work bootstrap routes with the supplied role assignments', async () => {
    const fakePage = createFakePage();

    await setupMyWorkFilterRoutes(fakePage as never, {
      roleAssignmentInfo: [
        {
          jurisdiction: 'IA',
          roleType: 'ORGANISATION',
          baseLocation: '20001',
        },
      ],
    });

    expect(fakePage.initScripts).toHaveLength(2);
    expect(fakePage.routes.map(({ pattern }) => pattern)).toEqual(
      expect.arrayContaining([
        '**/api/user/details*',
        myCasesRoutePattern,
        '**/aggregated/caseworkers/**/jurisdictions*',
        '**/workallocation/region-location*',
        '**/workallocation/full-location*',
        '**/api/locations/getLocationsById*',
      ])
    );

    const userDetailsRoute = getLastRegisteredRoute(fakePage.routes, '**/api/user/details*');
    const myCasesRoute = getLastRegisteredRoute(fakePage.routes, myCasesRoutePattern);
    const aggregatedJurisdictionsRoute = getLastRegisteredRoute(fakePage.routes, '**/aggregated/caseworkers/**/jurisdictions*');
    const fullLocationRoute = getLastRegisteredRoute(fakePage.routes, '**/workallocation/full-location*');

    expect(userDetailsRoute).toBeTruthy();
    expect(myCasesRoute).toBeTruthy();
    expect(aggregatedJurisdictionsRoute).toBeTruthy();
    expect(fullLocationRoute).toBeTruthy();

    const userDetailsPayload = (await invokeRoute(userDetailsRoute!))[0] as { body: string };
    const myCasesPayload = (await invokeRoute(myCasesRoute!))[0] as { body: string };
    const aggregatedJurisdictionsPayload = (await invokeRoute(aggregatedJurisdictionsRoute!))[0] as { body: string };
    const fullLocationPayload = (await invokeRoute(fullLocationRoute!))[0] as { body: string };

    expect(JSON.parse(userDetailsPayload.body)).toEqual(
      expect.objectContaining({
        userInfo: expect.objectContaining({
          id: 'wave2-my-work-user',
          roles: expect.arrayContaining(['caseworker-ia', 'caseworker-ia-caseofficer', 'caseworker-ia-admofficer']),
        }),
        roleAssignmentInfo: [
          {
            jurisdiction: 'IA',
            roleType: 'ORGANISATION',
            baseLocation: '20001',
          },
        ],
      })
    );

    expect(JSON.parse(myCasesPayload.body)).toEqual(
      expect.objectContaining({
        cases: expect.any(Array),
      })
    );
    expect(JSON.parse(myCasesPayload.body).cases).toHaveLength(2);
    expect(JSON.parse(aggregatedJurisdictionsPayload.body)).toEqual([
      { id: 'IA', name: 'Immigration and Asylum', caseTypes: [] },
      { id: 'SSCS', name: 'Social security and child support', caseTypes: [] },
      { id: 'CIVIL', name: 'Civil', caseTypes: [] },
    ]);
    expect(JSON.parse(fullLocationPayload.body)).toEqual(myWorkSelectableLocations);
  });
});
