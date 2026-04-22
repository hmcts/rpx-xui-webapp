import type { Page } from '@playwright/test';
import { buildAsylumCaseMock } from '../mocks/cases/asylumCase.mock';
import {
  buildFindPersonResults,
  buildRolesAccessCaseRoles,
  buildRolesAccessExclusions,
  buildRolesAccessUserDetailsMock,
  filterJudicialPeopleByIds,
  rolesAccessLegalOpsCaseworker,
  type RolesAccessRoleAssignment,
  type RolesAccessRoleExclusion,
  type RolesAccessCaseRole,
} from '../mocks/rolesAccess.mock';

export type RolesAccessMockRoutesConfig = {
  caseId: string;
  roleAssignmentInfo: RolesAccessRoleAssignment[];
  withExistingRoles?: boolean;
};

async function clearRolesAccessRoutes(page: Page, caseId: string): Promise<void> {
  const routePatterns = [
    `**/data/internal/cases/${caseId}*`,
    '**/api/user/details*',
    '**/api/role-access/roles/manageLabellingRoleAssignment/**',
    '**/api/role-access/roles/access-get-by-caseId*',
    '**/workallocation/caseworker/getUsersByServiceName*',
    '**/api/role-access/roles/post',
    '**/api/role-access/exclusions/post',
    '**/api/role-access/roles/getJudicialUsers*',
    '**/workallocation/exclusion/rolesCategory*',
    '**/workallocation/findPerson*',
    '**/api/role-access/allocate-role/reallocate',
    '**/api/role-access/allocate-role/delete',
    '**/api/role-access/exclusions/confirm',
  ];

  for (const routePattern of routePatterns) {
    await page.unroute(routePattern);
  }
}

export async function setupRolesAccessMockRoutes(page: Page, config: RolesAccessMockRoutesConfig): Promise<void> {
  let currentCaseRoles: RolesAccessCaseRole[] = config.withExistingRoles === false ? [] : buildRolesAccessCaseRoles();
  let currentExclusions: RolesAccessRoleExclusion[] = config.withExistingRoles === false ? [] : buildRolesAccessExclusions();
  const caseMockResponse = buildAsylumCaseMock({ caseId: config.caseId });
  const userDetails = buildRolesAccessUserDetailsMock({
    roleAssignmentInfo: config.roleAssignmentInfo,
  });

  await clearRolesAccessRoutes(page, config.caseId);

  await page.route(`**/data/internal/cases/${config.caseId}*`, async (route) => {
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

  await page.route('**/api/role-access/roles/manageLabellingRoleAssignment/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });

  await page.route('**/api/role-access/roles/access-get-by-caseId*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route('**/workallocation/caseworker/getUsersByServiceName*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([rolesAccessLegalOpsCaseworker]),
    });
  });

  await page.route('**/api/role-access/roles/post', async (route) => {
    const requestBody = (route.request().postDataJSON() as { assignmentId?: string }) ?? {};
    const matchingRole = currentCaseRoles.find((role) => role.id === requestBody.assignmentId);

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(matchingRole ? [matchingRole] : currentCaseRoles),
    });
  });

  await page.route('**/api/role-access/exclusions/post', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(currentExclusions),
    });
  });

  await page.route('**/api/role-access/roles/getJudicialUsers*', async (route) => {
    const requestBody = (route.request().postDataJSON() as { userIds?: string[] }) ?? {};

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(filterJudicialPeopleByIds(requestBody.userIds ?? [])),
    });
  });

  await page.route('**/workallocation/exclusion/rolesCategory*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { roleId: 'judicial', roleName: 'Judicial' },
        { roleId: 'legalOps', roleName: 'Legal Ops' },
        { roleId: 'admin', roleName: 'Admin' },
      ]),
    });
  });

  await page.route('**/workallocation/findPerson*', async (route) => {
    const requestBody =
      (route.request().postDataJSON() as {
        searchOptions?: { searchTerm?: string; userRole?: string };
      }) ?? {};

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(
        buildFindPersonResults(requestBody.searchOptions?.searchTerm ?? '', requestBody.searchOptions?.userRole ?? 'Judicial')
      ),
    });
  });

  await page.route('**/api/role-access/allocate-role/reallocate', async (route) => {
    const requestBody =
      (route.request().postDataJSON() as {
        assignmentId?: string;
        person?: { id?: string };
      }) ?? {};

    if (requestBody.assignmentId && requestBody.person?.id) {
      currentCaseRoles = currentCaseRoles.map((role) =>
        role.id === requestBody.assignmentId ? { ...role, actorId: requestBody.person.id ?? role.actorId } : role
      );
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });

  await page.route('**/api/role-access/allocate-role/delete', async (route) => {
    const requestBody = (route.request().postDataJSON() as { assigmentId?: string }) ?? {};
    currentCaseRoles = currentCaseRoles.filter((role) => role.id !== requestBody.assigmentId);

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });

  await page.route('**/api/role-access/exclusions/confirm', async (route) => {
    const requestBody =
      (route.request().postDataJSON() as {
        exclusionDescription?: string;
        person?: { id?: string };
      }) ?? {};

    currentExclusions = [
      ...currentExclusions,
      {
        actorId: requestBody.person?.id ?? 'judicial-replacement-2',
        added: '2030-01-16T12:00:00.000Z',
        id: 'new-exclusion-1',
        name: '',
        notes: requestBody.exclusionDescription ?? 'Wave 2 exclusion',
        type: 'EXCLUDED',
        userType: 'JUDICIAL',
      },
    ];

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });
}
