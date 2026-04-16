import type { Page } from '@playwright/test';
import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies, myCasesRoutePattern, setupManageTasksBaseRoutes } from '../../helpers';
import { buildHearingsUserDetailsMock } from '../../mocks/hearings.mock';
import { buildMyCasesMock } from '../../mocks/myCases.mock';
import { buildTaskListMock, myActionsList } from '../../mocks/taskList.mock';

type SearchParameter = {
  key?: string;
  values?: string[];
};

type SearchRequestPayload = {
  searchRequest?: {
    search_parameters?: SearchParameter[];
  };
  view?: string;
};

const userIdentifier = 'STAFF_ADMIN';
const supportedJurisdictions = ['IA', 'CIVIL'];
const supportedJurisdictionDetails = [
  { serviceId: 'CIVIL', serviceName: 'Civil' },
  { serviceId: 'IA', serviceName: 'Immigration and Asylum' },
];

async function seedManageTasksUser(page: Page) {
  const userDetails = buildHearingsUserDetailsMock(['caseworker-ia', 'caseworker-ia-caseofficer', 'caseworker-civil']);

  userDetails.userInfo.id = 'staff-admin-integration-user';
  userDetails.userInfo.uid = 'staff-admin-integration-user';
  userDetails.userInfo.roleCategory = 'LEGAL_OPERATIONS';
  userDetails.roleAssignmentInfo = [
    { jurisdiction: 'IA', substantive: 'Y', roleType: 'ORGANISATION', baseLocation: '765324' },
    { jurisdiction: 'CIVIL', substantive: 'Y', roleType: 'ORGANISATION', baseLocation: '231596' },
  ];

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
}

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
  await seedManageTasksUser(page);
});

test.describe(`Work filters as ${userIdentifier}`, { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  test('show and hide work filters across My tasks, Available tasks, and My cases', async ({ taskListPage, page }) => {
    const taskListResponse = buildTaskListMock(6, 'staff-admin-integration-user', myActionsList);
    const myCasesResponse = buildMyCasesMock();

    await test.step('Mock task and case routes for each My work view', async () => {
      await setupManageTasksBaseRoutes(page, {
        taskListResponse,
        supportedJurisdictions,
        supportedJurisdictionDetails,
      });

      await page.route(myCasesRoutePattern, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(myCasesResponse),
        });
      });
    });

    await test.step('My tasks filter opens, shows controls, and hides after apply', async () => {
      await taskListPage.gotoAndWaitForTaskRow('opening My tasks filters');
      await expect(taskListPage.taskListFilterToggle).toContainText('Show work filter');

      await taskListPage.openFilterPanel();

      await expect(taskListPage.taskListFilterToggle).toContainText('Hide work filter');
      await expect(taskListPage.filterPanel.getByText('Services', { exact: true })).toBeVisible();
      await expect(taskListPage.filterPanel.getByText('Search for a location by name', { exact: true })).toBeVisible();
      await expect(taskListPage.filterPanel.getByText('Types of work', { exact: true })).toBeVisible();

      await taskListPage.applyCurrentFilters();

      await expect(taskListPage.filterPanel).toBeHidden();
      await expect(taskListPage.taskListFilterToggle).toContainText('Show work filter');
    });

    await test.step('Available tasks keeps the same services, location, and work type controls', async () => {
      await taskListPage.clickTaskTabAndWaitForView(
        'Available tasks',
        'AvailableTasks',
        'checking filter fields on Available tasks'
      );
      await taskListPage.waitForTaskListShellReady('available tasks filter view');
      await taskListPage.openFilterPanel();

      await expect(taskListPage.filterPanel.getByText('Services', { exact: true })).toBeVisible();
      await expect(taskListPage.filterPanel.getByText('Search for a location by name', { exact: true })).toBeVisible();
      await expect(taskListPage.filterPanel.getByText('Types of work', { exact: true })).toBeVisible();
    });

    await test.step('My cases keeps services and location search while keeping work types hidden', async () => {
      await taskListPage.gotoMyCases();
      await taskListPage.waitForTaskListShellReady('my cases filter view');
      await taskListPage.openFilterPanel();

      await expect(taskListPage.filterPanel.getByText('Services', { exact: true })).toBeVisible();
      await expect(taskListPage.filterPanel.getByText('Search for a location by name', { exact: true })).toBeVisible();
      await expect(taskListPage.filterPanel.locator('#types-of-work')).toBeHidden();
    });
  });

  test('My tasks applies selected services and work types to the search request', async ({ taskListPage, page }) => {
    const taskListResponse = buildTaskListMock(6, 'staff-admin-integration-user', myActionsList);
    const taskRequests: SearchRequestPayload[] = [];

    await setupManageTasksBaseRoutes(page, {
      supportedJurisdictions,
      supportedJurisdictionDetails,
      taskListHandler: async (route) => {
        taskRequests.push(route.request().postDataJSON() as SearchRequestPayload);
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(taskListResponse),
        });
      },
    });

    await taskListPage.gotoAndWaitForTaskRow('capturing My tasks filter requests');
    await taskListPage.openFilterPanel();

    await taskListPage.clearServicesFilters();
    const selectedService = await taskListPage.serviceFilterCheckboxes.first().getAttribute('value');
    expect(selectedService).toBeTruthy();
    await taskListPage.serviceFilterCheckboxes.first().check({ force: true });

    await taskListPage.clearTypesOfWorkFilters();
    const selectedWorkType = await taskListPage.typesOfWorkFilterCheckboxes.first().getAttribute('value');
    expect(selectedWorkType).toBeTruthy();
    await taskListPage.typesOfWorkFilterCheckboxes.first().check({ force: true });

    const initialRequestCount = taskRequests.length;
    await taskListPage.applyCurrentFilters();
    await expect.poll(() => taskRequests.length).toBe(initialRequestCount + 1);

    const latestRequest = taskRequests.at(-1);
    expect(latestRequest?.searchRequest?.search_parameters).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ key: 'user', values: ['staff-admin-integration-user'] }),
        expect.objectContaining({ key: 'state', values: ['assigned'] }),
        expect.objectContaining({ key: 'jurisdiction', values: [selectedService] }),
        expect.objectContaining({ key: 'work_type', values: [selectedWorkType] }),
      ])
    );
  });

  test('My cases request honours persisted service and location filters from local storage', async ({ taskListPage, page }) => {
    const myCasesResponse = buildMyCasesMock();
    const myCasesRequests: SearchRequestPayload[] = [];

    await page.addInitScript(() => {
      window.localStorage.setItem(
        'locations',
        JSON.stringify({
          fields: [
            { name: 'services', value: ['IA'] },
            { name: 'locations', value: [{ epimms_id: '765324' }] },
          ],
        })
      );
    });

    await setupManageTasksBaseRoutes(page, {
      taskListResponse: buildTaskListMock(6, 'staff-admin-integration-user', myActionsList),
      supportedJurisdictions,
      supportedJurisdictionDetails,
    });

    await page.route(myCasesRoutePattern, async (route) => {
      myCasesRequests.push(route.request().postDataJSON() as SearchRequestPayload);
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(myCasesResponse),
      });
    });

    await taskListPage.gotoMyCases();
    await expect.poll(() => myCasesRequests.length).toBeGreaterThan(0);

    const latestRequest = myCasesRequests.at(-1);
    expect(latestRequest?.searchRequest?.search_parameters).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ key: 'services', values: ['IA'] }),
        expect.objectContaining({ key: 'locations', values: ['765324'] }),
      ])
    );
  });
});
