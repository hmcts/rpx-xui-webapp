import { expect, test } from '@playwright/test';
import {
  buildSupportedJurisdictionDetails,
  setupTaskListBootstrapRoutes,
} from '../../integration/helpers/taskListMockRoutes.helper.js';

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

function getRegisteredRoute(routes: RegisteredRoute[], pattern: string | RegExp) {
  return routes.find((route) => route.pattern === pattern);
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

test.describe('task list bootstrap routes helper', { tag: '@svc-internal' }, () => {
  test('fills in supported jurisdiction display names from the shared defaults', () => {
    expect(buildSupportedJurisdictionDetails(['IA', 'SSCS', 'UNKNOWN'])).toEqual([
      { serviceId: 'IA', serviceName: 'Immigration and Asylum' },
      { serviceId: 'SSCS', serviceName: 'Social security and child support' },
      { serviceId: 'UNKNOWN', serviceName: 'UNKNOWN' },
    ]);
  });

  test('uses resolved service names for the bootstrap routes when explicit details are omitted', async () => {
    const fakePage = createFakePage();

    await setupTaskListBootstrapRoutes(fakePage as never, ['IA', 'CIVIL']);

    const detailedServicesRoute = getRegisteredRoute(fakePage.routes, '**/api/wa-supported-jurisdiction/detail*');
    const aggregatedJurisdictionsRoute = getRegisteredRoute(fakePage.routes, '**/aggregated/caseworkers/**/jurisdictions*');

    expect(detailedServicesRoute).toBeTruthy();
    expect(aggregatedJurisdictionsRoute).toBeTruthy();

    const detailedServicesPayload = (await invokeRoute(detailedServicesRoute!))[0] as { body: string };
    const aggregatedJurisdictionsPayload = (await invokeRoute(aggregatedJurisdictionsRoute!))[0] as { body: string };

    expect(JSON.parse(detailedServicesPayload.body)).toEqual([
      { serviceId: 'IA', serviceName: 'Immigration and Asylum' },
      { serviceId: 'CIVIL', serviceName: 'Civil' },
    ]);
    expect(JSON.parse(aggregatedJurisdictionsPayload.body)).toEqual([
      { id: 'IA', name: 'Immigration and Asylum', caseTypes: [] },
      { id: 'CIVIL', name: 'Civil', caseTypes: [] },
    ]);
  });

  test('keeps caller-supplied service labels ahead of the shared defaults', async () => {
    const fakePage = createFakePage();

    await setupTaskListBootstrapRoutes(fakePage as never, ['IA', 'SSCS'], [{ serviceId: 'IA', serviceName: 'Custom IA' }]);

    const detailedServicesRoute = getRegisteredRoute(fakePage.routes, '**/api/wa-supported-jurisdiction/detail*');
    const aggregatedJurisdictionsRoute = getRegisteredRoute(fakePage.routes, '**/aggregated/caseworkers/**/jurisdictions*');

    expect(detailedServicesRoute).toBeTruthy();
    expect(aggregatedJurisdictionsRoute).toBeTruthy();

    const detailedServicesPayload = (await invokeRoute(detailedServicesRoute!))[0] as { body: string };
    const aggregatedJurisdictionsPayload = (await invokeRoute(aggregatedJurisdictionsRoute!))[0] as { body: string };

    expect(JSON.parse(detailedServicesPayload.body)).toEqual([
      { serviceId: 'IA', serviceName: 'Custom IA' },
      { serviceId: 'SSCS', serviceName: 'Social security and child support' },
    ]);
    expect(JSON.parse(aggregatedJurisdictionsPayload.body)).toEqual([
      { id: 'IA', name: 'Custom IA', caseTypes: [] },
      { id: 'SSCS', name: 'Social security and child support', caseTypes: [] },
    ]);
  });
});
