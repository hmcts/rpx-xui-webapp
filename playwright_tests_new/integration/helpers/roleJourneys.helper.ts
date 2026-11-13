import type { Page, Request } from '@playwright/test';
import { buildRolesAndAccessUserDetails, setupRolesAndAccessMockRoutes } from './rolesAndAccessMockRoutes.helper';
import { buildSupportedAMRoleAssignments, defaultStaffAMMenuRole } from './amRoleAssignmentMock.helper';
import { buildEntityToUsersAccessView, type WorkAllocationAccessScenarioRecord } from './workAllocationAccessScenarios.helper';
import { replacementCaseworker, roleCaseId, roleRecords } from '../mocks/roleJourneys.mock';

export async function captureExclusionMutations(page: Page, status = 200) {
  const requests: Request[] = [];
  const successfulRequests: Request[] = [];
  await page.route(/\/api\/role-access\/exclusions\/(delete|confirm)$/, async (route) => {
    const request = route.request();
    requests.push(request);
    await route.fulfill({ status, contentType: 'application/json', body: '{}' });
    if (status >= 200 && status < 300) {
      successfulRequests.push(request);
    }
  });
  return { requests, successfulRequests };
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
  return captureExclusionMutations(page, options.status);
}

type ReadbackTarget = { operation: 'confirm'; personId: string } | { operation: 'delete'; assignmentId: string };

export async function setupRoleReadback(
  page: Page,
  records: WorkAllocationAccessScenarioRecord[],
  successfulRequests: Request[],
  target: ReadbackTarget
): Promise<void> {
  const initialView = buildEntityToUsersAccessView(roleRecords, roleCaseId);
  const changedView = buildEntityToUsersAccessView(records, roleCaseId);
  const currentView = () => {
    const matched = successfulRequests.some((request) => {
      if (request.method() !== 'POST') {
        return false;
      }
      const body = request.postDataJSON() as {
        caseId?: string;
        person?: { id?: string };
        roleExclusion?: { id?: string };
      };
      const path = new URL(request.url()).pathname;
      return target.operation === 'confirm'
        ? path === '/api/role-access/exclusions/confirm' && body.caseId === roleCaseId && body.person?.id === target.personId
        : path === '/api/role-access/exclusions/delete' && body.roleExclusion?.id === target.assignmentId;
    });
    return matched ? changedView : initialView;
  };
  await page.route('**/api/role-access/roles/post*', async (route) => {
    await route.fulfill({ json: currentView().roles });
  });
  await page.route('**/api/role-access/exclusions/post*', async (route) => {
    await route.fulfill({ json: currentView().exclusions });
  });
}
