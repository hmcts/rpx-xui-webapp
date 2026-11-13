import type { Page, Request } from '@playwright/test';
import { buildRolesAndAccessUserDetails, setupRolesAndAccessMockRoutes } from './rolesAndAccessMockRoutes.helper';
import { buildSupportedAMRoleAssignments, defaultStaffAMMenuRole } from './amRoleAssignmentMock.helper';
import { buildEntityToUsersAccessView, type WorkAllocationAccessScenarioRecord } from './workAllocationAccessScenarios.helper';
import { replacementCaseworker, roleCaseId, roleRecords } from '../mocks/roleJourneys.mock';

export async function captureRoleMutations(page: Page, status = 200): Promise<Request[]> {
  const requests: Request[] = [];
  await page.route(
    /\/api\/role-access\/(allocate-role\/(delete|reallocate|confirm)|exclusions\/(delete|confirm))$/,
    async (route) => {
      requests.push(route.request());
      await route.fulfill({ status, contentType: 'application/json', body: '{}' });
    }
  );
  return requests;
}

export async function setupRoleJourney(page: Page, options: { status?: number; isCaseAllocator?: boolean } = {}) {
  await setupRolesAndAccessMockRoutes(page, {
    caseId: roleCaseId,
    records: roleRecords,
    isCaseAllocator: options.isCaseAllocator,
  });
  const userDetails = buildRolesAndAccessUserDetails({ isCaseAllocator: options.isCaseAllocator });
  userDetails.userInfo.roles = [
    ...(userDetails.userInfo.roles as string[]).filter((role) => role !== 'caseworker-ia-iacjudge'),
    'caseworker-ia-caseofficer',
    defaultStaffAMMenuRole,
  ];
  userDetails.userInfo.roleCategories = ['LEGAL_OPERATIONS'];
  userDetails.roleAssignmentInfo.push(...buildSupportedAMRoleAssignments([defaultStaffAMMenuRole], ['IA']));
  userDetails.userInfo.id = '11111111-1111-4111-8111-111111111111';
  userDetails.userInfo.forename = 'Synthetic';
  userDetails.userInfo.surname = 'Allocator';
  userDetails.userInfo.email = 'role-allocator@example.invalid';
  await page.route('**/api/user/details*', async (route) => {
    await route.fulfill({ json: userDetails });
  });
  await page.route('**/workallocation/caseworker/getUsersByServiceName*', async (route) => {
    await route.fulfill({ json: [replacementCaseworker] });
  });
  await page.route('**/workallocation/exclusion/rolesCategory*', async (route) => {
    await route.fulfill({ json: [{ roleId: 'LEGAL_OPERATIONS', roleName: 'Legal Ops' }] });
  });
  return { requests: await captureRoleMutations(page, options.status) };
}

export async function setupRoleReadback(page: Page, records: WorkAllocationAccessScenarioRecord[]): Promise<void> {
  const entityView = buildEntityToUsersAccessView(records, roleCaseId);
  await page.route('**/api/role-access/roles/post*', async (route) => {
    await route.fulfill({ json: entityView.roles });
  });
  await page.route('**/api/role-access/exclusions/post*', async (route) => {
    await route.fulfill({ json: entityView.exclusions });
  });
}
