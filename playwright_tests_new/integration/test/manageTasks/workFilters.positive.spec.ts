import { expect, test } from '../../../E2E/fixtures';
import { myCasesRoutePattern, setupManageTasksBaseRoutes } from '../../helpers';
import { buildMyCasesMock } from '../../mocks/myCases.mock';
import { buildTaskListMock, myActionsList } from '../../mocks/taskList.mock';
import {
  setupWorkFiltersUser,
  workFiltersDefaultLocations,
  workFiltersSupportedJurisdictionDetails,
  workFiltersSupportedJurisdictions,
  workFiltersUserId,
  workFiltersUserIdentifier,
} from './workFilters.setup';

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

test.beforeEach(async ({ page }) => {
  await setupWorkFiltersUser(page);
});

test.describe(`Work filters as ${workFiltersUserIdentifier}`, { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  test('show and hide work filters across My tasks, Available tasks, and My cases', async ({ taskListPage, page }) => {
    const taskListResponse = buildTaskListMock(6, workFiltersUserId, myActionsList);
    const myCasesResponse = buildMyCasesMock();

    await test.step('Mock task and case routes for each My work view', async () => {
      await setupManageTasksBaseRoutes(page, {
        taskListResponse,
        supportedJurisdictions: workFiltersSupportedJurisdictions,
        supportedJurisdictionDetails: workFiltersSupportedJurisdictionDetails,
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
    const taskListResponse = buildTaskListMock(6, workFiltersUserId, myActionsList);
    const taskRequests: SearchRequestPayload[] = [];

    await setupManageTasksBaseRoutes(page, {
      supportedJurisdictions: workFiltersSupportedJurisdictions,
      supportedJurisdictionDetails: workFiltersSupportedJurisdictionDetails,
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
        expect.objectContaining({ key: 'user', values: [workFiltersUserId] }),
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
      taskListResponse: buildTaskListMock(6, workFiltersUserId, myActionsList),
      supportedJurisdictions: workFiltersSupportedJurisdictions,
      supportedJurisdictionDetails: workFiltersSupportedJurisdictionDetails,
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

  test('My tasks restores default base locations using organisation service codes', async ({ taskListPage, page }) => {
    const taskListResponse = buildTaskListMock(6, workFiltersUserId, myActionsList);
    const fullLocationServiceCodes: string[] = [];

    await setupManageTasksBaseRoutes(page, {
      taskListResponse,
      supportedJurisdictions: workFiltersSupportedJurisdictions,
      supportedJurisdictionDetails: workFiltersSupportedJurisdictionDetails,
    });

    await page.route('**/workallocation/full-location*', async (route) => {
      const serviceCodes = new URL(route.request().url()).searchParams.get('serviceCodes');
      if (serviceCodes) {
        fullLocationServiceCodes.push(serviceCodes);
      }
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(workFiltersDefaultLocations),
      });
    });

    await taskListPage.gotoAndWaitForTaskRow('restoring work filter base locations');
    await expect.poll(() => fullLocationServiceCodes.length).toBeGreaterThan(0);
    expect(fullLocationServiceCodes.at(-1)?.split(',').sort()).toEqual(['CIVIL', 'IA']);

    await expect(page.getByText('Access tasks and cases.', { exact: true })).toBeVisible();

    await taskListPage.openFilterPanel();
    await expect(taskListPage.filterPanel.locator('.hmcts-filter__tag', { hasText: 'Taylor House' })).toBeVisible();
    await expect(
      taskListPage.filterPanel.locator('.hmcts-filter__tag', { hasText: 'Birmingham Civil and Family Justice Centre' })
    ).toBeVisible();
  });
});
