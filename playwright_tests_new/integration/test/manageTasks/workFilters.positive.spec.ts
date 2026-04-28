import { expect, test } from '../../../E2E/fixtures';
import { myCasesRoutePattern, setupManageTasksBaseRoutes } from '../../helpers';
import {
  buildWorkFiltersFullLocationResponses,
  buildWorkFiltersLocationSearchRequest,
  buildWorkFiltersLocationSearchResponse,
  type LocationSearchRequest,
  type WorkFiltersLocationSearchRequestBody,
  workFiltersLocationSearchScenarios,
} from '../../mocks/workFiltersLocationSearch.mock';
import { buildMyCasesMock } from '../../mocks/myCases.mock';
import { buildTaskListMock, myActionsList } from '../../mocks/taskList.mock';
import {
  setupWorkFiltersUser,
  workFiltersDefaultLocations,
  workFiltersLocationSearchSupportedJurisdictionDetails,
  workFiltersLocationSearchSupportedJurisdictions,
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

test.describe(`Work filters as ${workFiltersUserIdentifier}`, { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  test('show and hide work filters across My tasks, Available tasks, and My cases', async ({ taskListPage, page }) => {
    const taskListResponse = buildTaskListMock(6, workFiltersUserId, myActionsList);
    const myCasesResponse = buildMyCasesMock();

    await setupWorkFiltersUser(page);

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
      await taskListPage.expectWorkFilterControls();

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
      await taskListPage.expectWorkFilterControls();
    });

    await test.step('My cases keeps services and location search while keeping work types hidden', async () => {
      await taskListPage.gotoMyCases({ allowServiceDown: false });
      await taskListPage.waitForTaskListShellReady('my cases filter view');
      await taskListPage.expectWorkFilterControls({ typesOfWorkVisible: false });
    });
  });

  test('My tasks applies selected services and work types to the search request', async ({ taskListPage, page, tableUtils }) => {
    const baseTaskListResponse = buildTaskListMock(2, workFiltersUserId, myActionsList);
    const unfilteredTasks = [
      {
        ...baseTaskListResponse.tasks[0],
        case_name: 'Unfiltered IA task',
        case_name_field: 'Unfiltered IA task',
        case_category: 'Protection',
        case_category_field: 'Protection',
        case_management_category: 'Protection',
        location_name: 'Taylor House',
        location_field: 'Taylor House',
        task_title: 'Review application',
        task_field: 'Review application',
      },
      {
        ...baseTaskListResponse.tasks[1],
        case_name: 'Unfiltered secondary task',
        case_name_field: 'Unfiltered secondary task',
        case_category: 'Civil',
        case_category_field: 'Civil',
        case_management_category: 'Civil',
        location_name: 'Birmingham Civil and Family Justice Centre',
        location_field: 'Birmingham Civil and Family Justice Centre',
        task_title: 'Review hearing bundle',
        task_field: 'Review hearing bundle',
      },
    ];
    const taskListResponse = { tasks: unfilteredTasks, total_records: unfilteredTasks.length };
    const taskRequests: SearchRequestPayload[] = [];
    let selectedService: string | null = null;
    let selectedWorkType: string | null = null;
    const filteredTask = {
      ...baseTaskListResponse.tasks[0],
      case_name: 'Filtered work task',
      case_name_field: 'Filtered work task',
      case_category: 'Protection',
      case_category_field: 'Protection',
      case_management_category: 'Protection',
      location_name: 'Taylor House',
      location_field: 'Taylor House',
      task_title: 'Review filtered task',
      task_field: 'Review filtered task',
    };

    await setupWorkFiltersUser(page);

    await setupManageTasksBaseRoutes(page, {
      supportedJurisdictions: workFiltersSupportedJurisdictions,
      supportedJurisdictionDetails: workFiltersSupportedJurisdictionDetails,
      taskListHandler: async (route) => {
        const request = route.request().postDataJSON() as SearchRequestPayload;
        taskRequests.push(request);
        const searchParameters = request.searchRequest?.search_parameters ?? [];
        const shouldReturnFilteredTask =
          Boolean(selectedService && selectedWorkType) &&
          searchParameters.some(
            (parameter) => parameter.key === 'jurisdiction' && parameter.values?.includes(selectedService ?? '')
          ) &&
          searchParameters.some(
            (parameter) => parameter.key === 'work_type' && parameter.values?.includes(selectedWorkType ?? '')
          );
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(
            shouldReturnFilteredTask
              ? {
                  tasks: [
                    {
                      ...filteredTask,
                      jurisdiction: selectedService,
                      work_type_id: selectedWorkType,
                    },
                  ],
                  total_records: 1,
                }
              : taskListResponse
          ),
        });
      },
    });

    await taskListPage.gotoAndWaitForTaskRow('capturing My tasks filter requests');
    selectedService = await taskListPage.selectOnlyFirstServiceFilter();
    expect(selectedService).toBeTruthy();

    selectedWorkType = await taskListPage.selectOnlyFirstTypeOfWorkFilter();
    expect(selectedWorkType).toBeTruthy();

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

    await expect.poll(() => taskListPage.getResultsText()).toBe('Showing 1 to 1 of 1 results');

    const table = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
    expect(table).toHaveLength(1);
    expect(table[0]['Case name']).toBe(filteredTask.case_name);
    expect(table[0]['Location']).toBe(filteredTask.location_name);
    expect(table[0]['Task']).toBe(filteredTask.task_title);
  });

  test('My cases request honours persisted service and location filters from local storage', async ({
    taskListPage,
    page,
    tableUtils,
  }) => {
    const myCasesResponse = buildMyCasesMock();
    const filteredMyCasesResponse = {
      cases: [myCasesResponse.cases[0]],
      total_records: 1,
      unique_cases: 1,
    };
    const myCasesRequests: SearchRequestPayload[] = [];

    await setupWorkFiltersUser(page);

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
      const request = route.request().postDataJSON() as SearchRequestPayload;
      myCasesRequests.push(request);
      const searchParameters = request.searchRequest?.search_parameters ?? [];
      const usesPersistedFilters =
        searchParameters.some((parameter) => parameter.key === 'services' && parameter.values?.includes('IA')) &&
        searchParameters.some((parameter) => parameter.key === 'locations' && parameter.values?.includes('765324'));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(usesPersistedFilters ? filteredMyCasesResponse : myCasesResponse),
      });
    });

    await taskListPage.gotoMyCases({ allowServiceDown: false });
    await expect.poll(() => myCasesRequests.length).toBeGreaterThan(0);

    const latestRequest = myCasesRequests.at(-1);
    expect(latestRequest?.searchRequest?.search_parameters).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ key: 'services', values: ['IA'] }),
        expect.objectContaining({ key: 'locations', values: ['765324'] }),
      ])
    );

    await expect(taskListPage.myCasesResultsAmount).toContainText('Showing 1 results');
    const table = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
    expect(table).toHaveLength(1);
    expect(table[0]['Case name']).toBe(filteredMyCasesResponse.cases[0].case_name);
    expect(table[0]['Service']).toBe(filteredMyCasesResponse.cases[0].expectedServiceLabel);
  });

  test('My tasks restores default base locations using organisation service codes', async ({ taskListPage, page }) => {
    const taskListResponse = buildTaskListMock(6, workFiltersUserId, myActionsList);
    const fullLocationServiceCodes: string[] = [];

    await setupWorkFiltersUser(page);

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

    await taskListPage.expectAccessTasksAndCasesTextVisible();

    await taskListPage.expectSelectedFilterTagsVisible(['Taylor House', 'Birmingham Civil and Family Justice Centre']);
  });

  for (const scenario of workFiltersLocationSearchScenarios) {
    test(`My tasks location search keeps organisation-only scope when ${scenario.scenarioName}`, async ({
      taskListPage,
      page,
    }) => {
      const taskListResponse = buildTaskListMock(6, workFiltersUserId, myActionsList);
      const fullLocationRequests: string[] = [];
      const locationSearchRequests: LocationSearchRequest[] = [];
      const fullLocationResponses = buildWorkFiltersFullLocationResponses();

      await setupWorkFiltersUser(page, {
        roles: ['caseworker-ia', 'caseworker-ia-caseofficer', 'caseworker-sscs'],
        roleAssignments: scenario.roleAssignments,
      });

      await setupManageTasksBaseRoutes(page, {
        taskListResponse,
        supportedJurisdictions: workFiltersLocationSearchSupportedJurisdictions,
        supportedJurisdictionDetails: workFiltersLocationSearchSupportedJurisdictionDetails,
      });

      await page.unroute('**/workallocation/full-location*').catch(() => undefined);
      await page.route('**/workallocation/full-location*', async (route) => {
        const serviceCodes = new URL(route.request().url()).searchParams.get('serviceCodes') ?? '';
        fullLocationRequests.push(serviceCodes);
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(fullLocationResponses[serviceCodes] ?? []),
        });
      });

      await page.unroute('**/api/locations/getLocations*').catch(() => undefined);
      await page.route('**/api/locations/getLocations*', async (route) => {
        const requestBody = route.request().postDataJSON() as WorkFiltersLocationSearchRequestBody;
        locationSearchRequests.push(buildWorkFiltersLocationSearchRequest(requestBody));

        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(buildWorkFiltersLocationSearchResponse(requestBody)),
        });
      });

      await taskListPage.gotoAndWaitForTaskRow(`verifying ${scenario.scenarioName}`);

      await taskListPage.openFilterPanel();
      if (scenario.expectedFullLocationServiceCodes) {
        await expect.poll(() => fullLocationRequests.length).toBeGreaterThan(0);
        expect(fullLocationRequests.at(-1)?.split(',').sort()).toEqual([...scenario.expectedFullLocationServiceCodes].sort());
      } else {
        await expect.poll(() => fullLocationRequests.length).toBe(0);
      }

      await taskListPage.expectSelectedLocations(scenario.expectedInitialLocations);
      await taskListPage.removeAllSelectedLocations();
      await taskListPage.expectSelectedLocations([]);

      await taskListPage.searchForLocation('Court');
      await expect(taskListPage.allWorkLocationSearchInput).toHaveValue('Court');
      await expect
        .poll(() => locationSearchRequests.find((request) => request.searchTerm === 'Court') ?? null)
        .toEqual(
          expect.objectContaining({
            searchTerm: 'Court',
            serviceIds: [...scenario.expectedServiceCodes].sort(),
          })
        );
      await expect
        .poll(
          async () =>
            (await taskListPage.allWorkLocationSearchResults.allTextContents())
              .map((location) => location.trim())
              .filter(Boolean)
              .sort(),
          { message: `location search results for ${scenario.scenarioName}` }
        )
        .toEqual([...scenario.expectedSearchResults].sort());
    });
  }
});
