import type { Page } from '@playwright/test';
import nodeAppDataModels from '../../api/data/nodeAppDataModels';
import { buildAsylumCaseMock } from '../mocks/cases/asylumCase.mock';
import { buildEntityToUsersAccessView, type WorkAllocationAccessScenarioRecord } from './workAllocationAccessScenarios.helper';
import { buildXuiAppShellEnvironmentConfigMock, setupXuiAppShellBaseRoutes } from './xuiAppShellMockRoutes.helper';
import { setupCaseworkerJurisdictionsRoute } from './caseworkerJurisdictionMockRoutes.helper';

type RolesAndAccessMockRouteOptions = {
  caseId: string;
  records?: WorkAllocationAccessScenarioRecord[];
  caseResponse?: unknown;
  jurisdiction?: string;
  isCaseAllocator?: boolean;
};

export function buildRolesAndAccessUserDetails(
  options: {
    jurisdiction?: string;
    isCaseAllocator?: boolean;
  } = {}
) {
  const userDetails = nodeAppDataModels.getUserDetails_oauth();
  const roles = ((userDetails.userInfo.roles ?? []) as string[]).filter((role) => role !== 'case-allocator');
  if (options.isCaseAllocator !== false) {
    roles.push('case-allocator');
  }
  userDetails.userInfo.roles = roles;

  userDetails.roleAssignmentInfo = [
    {
      jurisdiction: options.jurisdiction ?? 'IA',
      isCaseAllocator: options.isCaseAllocator ?? true,
      substantive: 'Y',
      roleType: 'ORGANISATION',
    },
  ];

  return userDetails;
}

export async function setupRolesAndAccessMockRoutes(
  page: Page,
  options: RolesAndAccessMockRouteOptions
): Promise<ReturnType<typeof buildEntityToUsersAccessView>> {
  const records = options.records ?? [];
  const entityView = buildEntityToUsersAccessView(records, options.caseId);
  const caseMockResponse = options.caseResponse ?? buildAsylumCaseMock({ caseId: options.caseId });
  const userDetails = buildRolesAndAccessUserDetails({
    jurisdiction: options.jurisdiction,
    isCaseAllocator: options.isCaseAllocator,
  });
  const jurisdiction = options.jurisdiction ?? 'IA';

  await setupXuiAppShellBaseRoutes(page, {
    userDetails: { roles: userDetails.userInfo.roles as string[] },
    environmentConfig: { ccdGatewayUrl: '', launchDarklyClientId: '' },
    waSupportedJurisdictions: [jurisdiction],
  });
  await page.route(/\/external\/config\/ui(?:\/|\?|$)/, async (route) => {
    await route.fulfill({
      json: {
        ...buildXuiAppShellEnvironmentConfigMock({ ccdGatewayUrl: '', launchDarklyClientId: '' }),
        hearingJurisdictionConfig: { hearingJurisdictions: { '.+': [] }, hearingAmendment: { '.+': [] } },
      },
    });
  });
  await page.route('**/*launchdarkly.com/**', async (route) => {
    await route.fulfill({ status: 202, body: '' });
  });
  await page.route('**/*launchdarkly.com/sdk/eval**', async (route) => {
    await route.fulfill({
      json: {
        MC_Work_Allocation: { value: true, version: 1 },
        'mc-work-allocation-active-feature': { value: 'WorkAllocationRelease2', version: 1 },
      },
    });
  });
  await page.route('**/*launchdarkly.com/sdk/goals/**', async (route) => {
    await route.fulfill({ json: [] });
  });
  await page.route('**/activity*', async (route) => {
    await route.fulfill({ json: [] });
  });
  await page.route(/\/api\/configuration\?configurationKey=termsAndConditionsEnabled(?:&|$)/, async (route) => {
    await route.fulfill({ json: false });
  });
  await page.route('**/api/monitoring-tools*', async (route) => {
    await route.fulfill({ json: [] });
  });
  await page.route('**/aggregated/activity/cases/*/activity*', async (route) => {
    await route.fulfill({ json: [] });
  });
  await page.route(`**/workallocation/case/task/${options.caseId}`, async (route) => {
    await route.fulfill({ json: [] });
  });
  await setupCaseworkerJurisdictionsRoute(page, [jurisdiction]);

  await page.route(
    (url) => url.pathname === `/data/internal/cases/${options.caseId}`,
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(caseMockResponse),
      });
    }
  );

  await page.route('**/api/user/details*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(userDetails),
    });
  });

  await page.route('**/workallocation/caseworker/getUsersByServiceName*', async (route) => {
    const requestBody = (route.request().postDataJSON() as { services?: string[] }) ?? {};
    const requestedServices = Array.isArray(requestBody.services) ? requestBody.services : [];
    const filteredCaseworkers = requestedServices.includes(jurisdiction)
      ? entityView.caseworkers.filter((caseworker) => requestedServices.includes(caseworker.service))
      : [];

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(filteredCaseworkers),
    });
  });

  // Leaving this route as prior implementation to keep consistent
  await page.route('**/workallocation/caseworker/getUsersByIdamIds*', async (route) => {
    const requestBody = (route.request().postDataJSON() as { services?: string[] }) ?? {};
    const requestedServices = Array.isArray(requestBody.services) ? requestBody.services : [];
    const filteredCaseworkers = requestedServices.includes(options.jurisdiction ?? 'IA')
      ? entityView.caseworkers.filter((caseworker) => requestedServices.includes(caseworker.service))
      : [];

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(filteredCaseworkers),
    });
  });

  await page.route('**/workallocation/caseworker/getUserByIdamId*', async (route) => {
    const requestBody = (route.request().postDataJSON() as { services?: string[] }) ?? {};
    const requestedServices = Array.isArray(requestBody.services) ? requestBody.services : [];
    const filteredCaseworkers = requestedServices.includes(options.jurisdiction ?? 'IA')
      ? entityView.caseworkers.filter((caseworker) => requestedServices.includes(caseworker.service))
      : [];

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(filteredCaseworkers[0]),
    });
  });

  await page.route('**/api/role-access/roles/post*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(entityView.roles),
    });
  });

  await page.route('**/api/role-access/exclusions/post*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(entityView.exclusions),
    });
  });

  await page.route('**/api/role-access/roles/getJudicialUsers*', async (route) => {
    const requestBody = (route.request().postDataJSON() as { userIds?: string[]; services?: string[] }) ?? {};
    const requestedUserIds = Array.isArray(requestBody.userIds) ? requestBody.userIds : [];
    const requestedServices = Array.isArray(requestBody.services) ? requestBody.services : [];
    const filteredJudicialUsers =
      requestedUserIds.length > 0 && requestedServices.includes(options.jurisdiction ?? 'IA')
        ? entityView.judicialUsers.filter((user) => requestedUserIds.includes(user.sidam_id))
        : [];

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(filteredJudicialUsers),
    });
  });

  return entityView;
}
