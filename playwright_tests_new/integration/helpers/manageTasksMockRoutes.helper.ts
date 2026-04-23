import type { Page, Route } from '@playwright/test';
import {
  buildHearingsAppConfigMock,
  buildHearingsEnvironmentConfigMock,
  buildHearingsUserDetailsMock,
} from '../mocks/hearings.mock';
import { setupTaskListBootstrapRoutes, taskListRoutePattern } from './taskListMockRoutes.helper';

export const myCasesRoutePattern = /\/workallocation\/my-work\/cases(?:\?.*)?$/;
export const myAccessRoutePattern = /\/workallocation\/my-work\/myaccess(?:\?.*)?$/;

const defaultTaskListResponse = { tasks: [], total_records: 0 };

type BaseManageTaskRouteOptions = {
  taskListResponse?: unknown;
  taskListHandler?: (route: Route) => Promise<void>;
  supportedJurisdictions?: string[];
  supportedJurisdictionDetails?: Array<{ serviceId: string; serviceName: string }>;
  userDetails?: ReturnType<typeof buildHearingsUserDetailsMock>;
};

export async function setupManageTasksBaseRoutes(page: Page, options: BaseManageTaskRouteOptions = {}): Promise<void> {
  const userDetails = options.userDetails ?? buildHearingsUserDetailsMock(['caseworker-ia', 'caseworker-ia-caseofficer']);
  const appConfig = buildHearingsAppConfigMock();
  const environmentConfig = buildHearingsEnvironmentConfigMock();

  await page.addInitScript((seededUserInfo) => {
    window.sessionStorage.setItem('userDetails', JSON.stringify(seededUserInfo));
  }, userDetails.userInfo);

  await page.route('**/api/user/details*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(userDetails),
    });
  });

  await page.route('**/assets/config/config.json*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(appConfig),
    });
  });

  await page.route(/\/external\/config\/ui(?:\/|\?|$)/, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(environmentConfig),
    });
  });

  await page.route('**/auth/isAuthenticated*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: 'true',
    });
  });

  await page.route('**/api/configuration*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: 'false',
    });
  });

  await page.route('**/api/monitoring-tools*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        key: '',
        connectionString: '',
      }),
    });
  });

  await page.route('**/api/organisation*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        name: 'HMCTS Test Organisation',
        organisationIdentifier: 'ORG123456',
        contactInformation: [],
        status: 'ACTIVE',
        sraId: 'SRA000001',
        sraRegulated: false,
        superUser: {
          firstName: 'Test',
          lastName: 'User',
          email: 'test.user@example.com',
        },
        paymentAccount: [],
      }),
    });
  });

  await setupTaskListBootstrapRoutes(page, options.supportedJurisdictions, options.supportedJurisdictionDetails);

  await page.route('**/api/role-access/roles/getJudicialUsers*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: '[]',
    });
  });

  await page.route('**/api/role-access/roles/manageLabellingRoleAssignment/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });

  await page.route('**/aggregated/caseworkers/**/jurisdictions*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: 'IA',
          name: 'Immigration and Asylum',
        },
      ]),
    });
  });

  await page.route('**/api/role-access/roles/get-my-access-new-count*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ count: 0 }),
    });
  });

  await page.route(taskListRoutePattern, async (route) => {
    if (options.taskListHandler) {
      await options.taskListHandler(route);
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(options.taskListResponse ?? defaultTaskListResponse),
    });
  });
}

type MyCasesRouteOptions = BaseManageTaskRouteOptions & {
  status?: number;
};

export async function setupMyCasesRoutes(page: Page, myCasesResponse: unknown, options: MyCasesRouteOptions = {}): Promise<void> {
  await setupManageTasksBaseRoutes(page, options);

  await page.route(myCasesRoutePattern, async (route) => {
    await route.fulfill({
      status: options.status ?? 200,
      contentType: 'application/json',
      body: JSON.stringify(myCasesResponse),
    });
  });
}

type MyAccessRouteOptions = BaseManageTaskRouteOptions & {
  status?: number;
  newCount?: number;
};

export async function setupMyAccessRoutes(
  page: Page,
  myAccessResponse: unknown,
  options: MyAccessRouteOptions = {}
): Promise<void> {
  await setupManageTasksBaseRoutes(page, options);

  await page.route('**/api/role-access/roles/get-my-access-new-count*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ count: options.newCount ?? 0 }),
    });
  });

  await page.route(myAccessRoutePattern, async (route) => {
    await route.fulfill({
      status: options.status ?? 200,
      contentType: 'application/json',
      body: JSON.stringify(myAccessResponse),
    });
  });
}
