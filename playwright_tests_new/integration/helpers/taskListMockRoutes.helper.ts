import type { Page } from '@playwright/test';
import nodeAppDataModels from '../../api/data/nodeAppDataModels';
import {
  assertValidWorkAllocationCaseTaskMock,
  assertValidWorkAllocationTaskListMock,
} from './workAllocationMockValidation.helper';
import { setupCaseworkerJurisdictionsRoute, type SupportedJurisdictionDetail } from './caseworkerJurisdictionMockRoutes.helper';

export const taskListRoutePattern = /\/workallocation\/task(?:\?.*)?$/;
const defaultSupportedJurisdictionsMock = ['IA', 'SSCS', 'Other'];
type TaskMockRouteOptions = {
  bootstrapUser?: TaskListBootstrapUserOptions;
  skipValidation?: boolean;
  status?: number;
};

export type TaskListBootstrapRoleAssignment = Record<string, unknown> & {
  baseLocation?: string;
  bookable?: boolean | string;
  jurisdiction: string;
  region?: string;
  roleName?: string;
  roleType: string;
  substantive?: boolean | string;
};

export type TaskListBootstrapUserOptions = {
  replaceRoleAssignments?: boolean;
  roleAssignments?: TaskListBootstrapRoleAssignment[];
  roleCategory?: string;
  roles?: string[];
  userId?: string;
};

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const supportedJurisdictionDisplayNames: Record<string, string> = {
  CIVIL: 'Civil',
  EMPLOYMENT: 'Employment',
  IA: 'Immigration and Asylum',
  PRIVATELAW: 'Private Law',
  PUBLICLAW: 'Public Law',
  SSCS: 'Social security and child support',
};

export function buildSupportedJurisdictionDetails(
  supportedJurisdictions: string[],
  supportedJurisdictionDetails: SupportedJurisdictionDetail[] = []
): SupportedJurisdictionDetail[] {
  return supportedJurisdictions.map((serviceId) => {
    const explicitDetail = supportedJurisdictionDetails.find((detail) => detail.serviceId === serviceId);
    return explicitDetail ?? { serviceId, serviceName: supportedJurisdictionDisplayNames[serviceId] ?? serviceId };
  });
}

export const defaultSupportedJurisdictionDetailsMock: SupportedJurisdictionDetail[] = buildSupportedJurisdictionDetails(
  defaultSupportedJurisdictionsMock
);

const defaultTaskListLocationMock = {
  epimms_id: '765324',
  site_name: 'Taylor House',
  region_id: '1',
  region: 'London',
  postcode: 'EC1R 4QU',
  court_address: '88 Rosebery Avenue, London',
  is_case_management_location: 'Y',
  is_hearing_location: 'Y',
};

export async function setupTaskListBootstrapRoutes(
  page: Page,
  supportedJurisdictions: string[] = defaultSupportedJurisdictionsMock,
  supportedJurisdictionDetails: SupportedJurisdictionDetail[] = defaultSupportedJurisdictionDetailsMock,
  userOptions: TaskListBootstrapUserOptions = {}
): Promise<void> {
  const resolvedSupportedJurisdictionDetails = buildSupportedJurisdictionDetails(
    supportedJurisdictions,
    supportedJurisdictionDetails
  );
  const userDetails = nodeAppDataModels.getUserDetails_oauth();
  if (userOptions.userId) {
    userDetails.userInfo.id = userOptions.userId;
    userDetails.userInfo.uid = userOptions.userId;
  }
  const existingRoles = Array.isArray(userDetails.userInfo.roles)
    ? userDetails.userInfo.roles.filter((role): role is string => typeof role === 'string')
    : [];
  userDetails.userInfo.roles = Array.from(new Set([...existingRoles, ...(userOptions.roles ?? []), 'task-supervisor']));
  userDetails.userInfo.roleCategory = userOptions.roleCategory ?? 'LEGAL_OPERATIONS';
  const routeRoleAssignments =
    userOptions.roleAssignments ??
    supportedJurisdictions.map((jurisdiction) => ({
      jurisdiction,
      roleName: 'task-supervisor',
      roleType: 'ORGANISATION',
      substantive: 'Y',
    }));
  userDetails.roleAssignmentInfo = [
    ...(userOptions.replaceRoleAssignments
      ? []
      : Array.isArray(userDetails.roleAssignmentInfo)
        ? userDetails.roleAssignmentInfo
        : []),
    ...routeRoleAssignments,
  ];

  await page.addInitScript((seededUserInfo) => {
    window.sessionStorage.setItem('userDetails', JSON.stringify(seededUserInfo));
  }, userDetails.userInfo);

  await page.route('**/auth/isAuthenticated*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(true),
    });
  });

  await page.route('**/api/user/details*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(userDetails),
    });
  });

  await page.route('**/api/organisation*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        name: 'Playwright Organisation',
        organisationIdentifier: 'PLAYWRIGHT_ORG',
        status: 'ACTIVE',
        contactInformation: [],
        paymentAccount: [],
      }),
    });
  });

  await page.route('**/api/role-access/roles/getJudicialUsers*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route('**/api/role-access/roles/get-my-access-new-count*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ count: 0 }),
    });
  });

  await page.route('**/workallocation/caseworker/getUsersByServiceName*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await setupCaseworkerJurisdictionsRoute(page, supportedJurisdictions, resolvedSupportedJurisdictionDetails);

  await page.route('**/api/wa-supported-jurisdiction/get*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(supportedJurisdictions),
    });
  });

  await page.route('**/api/wa-supported-jurisdiction/detail*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(resolvedSupportedJurisdictionDetails),
    });
  });

  await page.route('**/workallocation/task/types-of-work*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { key: 'applications', label: 'Applications' },
        { key: 'hearing_work', label: 'Hearing work' },
        { key: 'routine_work', label: 'Routine work' },
      ]),
    });
  });

  await page.route('**/api/healthCheck*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ healthState: true }),
    });
  });

  await page.route('**/workallocation/location*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([defaultTaskListLocationMock]),
    });
  });

  await page.route('**/workallocation/region-location*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route('**/workallocation/full-location*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });
}

/**
 * Sets up mock API routes for Task List tests.
 *
 * Mocks the health-check and work-allocation task endpoints so tests run
 * without a live backend, preventing flakiness from downstream service
 * unavailability.
 *
 * @param page            - Playwright Page object
 * @param taskListResponse - The mock task list payload to return from the task endpoint
 *
 * @example
 * ```typescript
 * await setupTaskListMockRoutes(page, buildMyTaskListMock(userId, 160));
 * ```
 */
export async function setupTaskListMockRoutes(
  page: Page,
  taskListResponse: unknown,
  options: TaskMockRouteOptions = {}
): Promise<void> {
  if (!options.skipValidation) {
    assertValidWorkAllocationTaskListMock(taskListResponse);
  }

  await setupTaskListBootstrapRoutes(
    page,
    defaultSupportedJurisdictionsMock,
    defaultSupportedJurisdictionDetailsMock,
    options.bootstrapUser
  );

  await page.route(taskListRoutePattern, async (route) => {
    await route.fulfill({
      status: options.status ?? 200,
      contentType: 'application/json',
      body: JSON.stringify(taskListResponse),
    });
  });
}

export function buildCaseTaskListRoutePattern(caseId: string): RegExp {
  return new RegExp(`/workallocation/case/task/${escapeRegex(caseId)}(?:\\?.*)?$`);
}

export async function setupCaseTaskListMockRoute(
  page: Page,
  caseId: string,
  caseTaskResponse: unknown,
  options: TaskMockRouteOptions = {}
): Promise<void> {
  if (!options.skipValidation) {
    assertValidWorkAllocationCaseTaskMock(caseTaskResponse);
  }

  await page.route(buildCaseTaskListRoutePattern(caseId), async (route) => {
    await route.fulfill({
      status: options.status ?? 200,
      contentType: 'application/json',
      body: JSON.stringify(caseTaskResponse),
    });
  });
}
