import type { Page, Route } from '@playwright/test';
import { setupTaskListBootstrapRoutes, taskListRoutePattern } from './taskListMockRoutes.helper';

export const myCasesRoutePattern = /\/workallocation\/my-work\/cases(?:\?.*)?$/;
export const myAccessRoutePattern = /\/workallocation\/my-work\/myaccess(?:\?.*)?$/;

const defaultTaskListResponse = { tasks: [], total_records: 0 };

type BaseManageTaskRouteOptions = {
  taskListResponse?: unknown;
  taskListHandler?: (route: Route) => Promise<void>;
  supportedJurisdictions?: string[];
  supportedJurisdictionDetails?: Array<{ serviceId: string; serviceName: string }>;
};

export async function setupManageTasksBaseRoutes(page: Page, options: BaseManageTaskRouteOptions = {}): Promise<void> {
  await setupTaskListBootstrapRoutes(page, options.supportedJurisdictions, options.supportedJurisdictionDetails);

  await page.route('**/api/role-access/roles/getJudicialUsers*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: '[]',
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
