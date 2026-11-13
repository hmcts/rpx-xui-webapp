import type { Page, Request } from '@playwright/test';
import { installSameOriginApiRouteClosure } from './mockSessionRouteClosure.helper';
import { buildSupportedAMRoleAssignments, defaultStaffAMMenuRole } from './amRoleAssignmentMock.helper';
import { buildRolesAndAccessUserDetails, setupRolesAndAccessMockRoutes } from './rolesAndAccessMockRoutes.helper';
import { buildEntityToUsersAccessView } from './workAllocationAccessScenarios.helper';
import {
  allocatedCaseworker,
  allocatedRecord,
  allocationCaseId,
  allocationOrganisation,
  existingJudicialRole,
  validAllocationRoles,
} from '../mocks/roleAllocation.mock';

export async function setupRoleAllocationMockRoutes(page: Page, options: { status?: number; isCaseAllocator?: boolean } = {}) {
  const routeClosure = await installSameOriginApiRouteClosure(page);
  await setupRolesAndAccessMockRoutes(page, {
    caseId: allocationCaseId,
    records: [existingJudicialRole],
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
  await page.route('**/api/organisation', (route) => route.fulfill({ json: allocationOrganisation }));
  await page.route('**/api/user/details*', (route) => route.fulfill({ json: userDetails }));
  await page.route('**/api/role-access/allocate-role/valid-roles*', (route) => route.fulfill({ json: validAllocationRoles }));
  await page.route('**/workallocation/caseworker/getUsersByServiceName*', (route) =>
    route.fulfill({ json: [allocatedCaseworker] })
  );

  const requests: Request[] = [];
  const existingView = buildEntityToUsersAccessView([existingJudicialRole], allocationCaseId);
  const allocatedView = buildEntityToUsersAccessView([existingJudicialRole, allocatedRecord], allocationCaseId);
  let confirmed = false;
  await page.route('**/api/role-access/roles/post*', (route) =>
    route.fulfill({ json: confirmed ? allocatedView.roles : existingView.roles })
  );
  await page.route('**/workallocation/caseworker/getUsersByIdamIds*', (route) =>
    route.fulfill({ json: confirmed ? allocatedView.caseworkers : [] })
  );
  await page.route('**/api/role-access/allocate-role/confirm', async (route) => {
    requests.push(route.request());
    confirmed = (options.status ?? 200) === 200;
    await route.fulfill({ status: options.status ?? 200, contentType: 'application/json', body: '{}' });
  });
  return { requests, ...routeClosure };
}
