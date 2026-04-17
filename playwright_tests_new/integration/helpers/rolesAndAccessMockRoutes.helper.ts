import type { Page } from '@playwright/test';
import nodeAppDataModels from '../../api/data/nodeAppDataModels';
import { buildAsylumCaseMock } from '../mocks/cases/asylumCase.mock';
import { buildEntityToUsersAccessView, type WorkAllocationAccessScenarioRecord } from './workAllocationAccessScenarios.helper';

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

  userDetails.roleAssignmentInfo = [
    {
      jurisdiction: options.jurisdiction ?? 'IA',
      isCaseAllocator: options.isCaseAllocator ?? true,
      substantive: true,
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

  await page.route(`**data/internal/cases/${options.caseId}*`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(caseMockResponse),
    });
  });

  await page.route('**/api/user/details*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(userDetails),
    });
  });

  await page.route('**/workallocation/caseworker/getUsersByServiceName*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(entityView.caseworkers),
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
