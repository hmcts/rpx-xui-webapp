import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies, myWorkSelectableLocations, setupMyWorkFilterRoutes } from '../../helpers';
import { buildMyCasesMock } from '../../mocks/myCases.mock';

type SearchParameter = {
  key?: string;
  values?: string[];
};

type SearchRequestPayload = {
  searchRequest?: {
    search_parameters?: SearchParameter[];
  };
};

const authenticatedUserIdentifier = 'STAFF_ADMIN';
const myWorkFilterTabs = [
  {
    name: 'Available tasks',
    urlPattern: /\/work\/my-work\/available(?:\?.*)?$/,
    view: 'AvailableTasks',
  },
  {
    name: 'My cases',
    urlPattern: /\/work\/my-work\/my-cases(?:\?.*)?$/,
  },
  {
    name: 'My tasks',
    urlPattern: /\/work\/my-work\/list(?:\?.*)?$/,
    view: 'MyTasks',
  },
] as const;

test.describe('My work filter parity', { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  test.beforeEach(async ({ page }) => {
    await applySessionCookies(page, authenticatedUserIdentifier);
  });

  test('shows the work filter across the My work tabs and collapses it after Apply', async ({ taskListPage, page }) => {
    await setupMyWorkFilterRoutes(page, {
      roleAssignmentInfo: [
        {
          jurisdiction: 'IA',
          substantive: 'Y',
          roleType: 'ORGANISATION',
          baseLocation: '20001',
          isCaseAllocator: false,
        },
        {
          jurisdiction: 'SSCS',
          substantive: 'Y',
          roleType: 'ORGANISATION',
          baseLocation: '30001',
          isCaseAllocator: false,
        },
      ],
    });

    await test.step('Open the My tasks view and verify the initial work filter state', async () => {
      await taskListPage.gotoAndWaitForTaskRow('opening My tasks filter parity');
      await expect(taskListPage.myWorkFilterToggle).toContainText('Show work filter');
      await expect(taskListPage.filterPanel).toBeHidden();

      await taskListPage.openFilterPanel();
      await expect(taskListPage.myWorkFilterToggle).toContainText('Hide work filter');
      await taskListPage.expectWorkFilterControls();
      await taskListPage.waitForServiceFilterOptionVisible('Immigration and Asylum');
      await taskListPage.waitForServiceFilterOptionVisible('Social security and child support');
      await expect(taskListPage.filterPanel.locator('#locations:visible').first()).toBeVisible();

      await taskListPage.applyCurrentFilters();
      await expect(taskListPage.myWorkFilterToggle).toContainText('Show work filter');
      await expect(taskListPage.filterPanel).toBeHidden();
    });

    await test.step('Verify the same Services and Locations filter surface on Available tasks, My cases, and My tasks', async () => {
      for (const { name: tabName, urlPattern, view } of myWorkFilterTabs) {
        if (view) {
          await taskListPage.clickTaskTabAndWaitForView(tabName, view, `${tabName} filter parity`);
        } else {
          await Promise.all([
            page.waitForURL(urlPattern, { timeout: 30_000 }),
            taskListPage.taskTableTabs.filter({ hasText: tabName }).first().click(),
          ]);
        }
        await taskListPage.waitForTaskListShellReady(`${tabName} filter parity`);
        await expect(taskListPage.myWorkFilterToggle).toContainText('Show work filter');

        await taskListPage.openFilterPanel();
        await expect(taskListPage.myWorkFilterToggle).toContainText('Hide work filter');
        await taskListPage.expectWorkFilterControls({ typesOfWorkVisible: tabName === 'My cases' ? 'ignore' : true });
        await taskListPage.waitForServiceFilterOptionVisible('Immigration and Asylum');
        await taskListPage.waitForServiceFilterOptionVisible('Social security and child support');
        await expect(taskListPage.filterPanel.locator('#locations:visible').first()).toBeVisible();

        await taskListPage.applyCurrentFilters();
        await expect(taskListPage.myWorkFilterToggle).toContainText('Show work filter');
        await expect(taskListPage.filterPanel).toBeHidden();
      }
    });
  });

  test('requires at least one service before applying the My cases filter', async ({ taskListPage, page }) => {
    await setupMyWorkFilterRoutes(page, {
      roleAssignmentInfo: [
        {
          jurisdiction: 'IA',
          substantive: 'Y',
          roleType: 'ORGANISATION',
          baseLocation: '20001',
          isCaseAllocator: false,
        },
        {
          jurisdiction: 'CIVIL',
          substantive: 'Y',
          roleType: 'ORGANISATION',
          isCaseAllocator: false,
        },
      ],
    });

    await taskListPage.gotoMyCases();
    await taskListPage.openFilterPanel();

    await taskListPage.clearServicesFilters();
    await taskListPage.applyCurrentFilters();

    await taskListPage.openFilterPanel();
    await expect(taskListPage.selectServicesError).toBeVisible();
    await expect(taskListPage.selectServicesError).toContainText('Select a service');
  });

  test('applies the My cases filter again after re-selecting Immigration and Asylum', async ({ taskListPage, page }) => {
    await setupMyWorkFilterRoutes(page, {
      roleAssignmentInfo: [
        {
          jurisdiction: 'IA',
          substantive: 'Y',
          roleType: 'ORGANISATION',
          baseLocation: '20001',
          isCaseAllocator: false,
        },
        {
          jurisdiction: 'CIVIL',
          substantive: 'Y',
          roleType: 'ORGANISATION',
          isCaseAllocator: false,
        },
      ],
    });

    await test.step('Open My cases and trigger the legacy validation state', async () => {
      await taskListPage.gotoMyCases();
      await taskListPage.openFilterPanel();

      const civilServiceFilter = await taskListPage.waitForServiceFilterOptionVisible('Civil');
      await civilServiceFilter.uncheck();
      await expect(civilServiceFilter).not.toBeChecked();
      const immigrationServiceFilter = await taskListPage.waitForServiceFilterOptionVisible('Immigration and Asylum');
      await immigrationServiceFilter.uncheck();
      await expect(immigrationServiceFilter).not.toBeChecked();

      await taskListPage.applyCurrentFilters();
      await taskListPage.openFilterPanel();
      await expect(taskListPage.selectServicesError).toBeVisible();
      await expect(taskListPage.selectServicesError).toContainText('Select a service');
    });

    await test.step('Re-select Immigration and Asylum and verify the filter can be applied again', async () => {
      const immigrationServiceFilter = await taskListPage.waitForServiceFilterOptionVisible('Immigration and Asylum');
      await immigrationServiceFilter.check();
      await expect(immigrationServiceFilter).toBeChecked();
      const civilServiceFilter = await taskListPage.waitForServiceFilterOptionVisible('Civil');
      await expect(civilServiceFilter).not.toBeChecked();

      await taskListPage.applyCurrentFilters();
      await expect(taskListPage.myWorkFilterToggle).toHaveText('Show work filter');
      await expect(taskListPage.filterPanel).toBeHidden();

      await taskListPage.openFilterPanel();
      const reopenedImmigrationServiceFilter = await taskListPage.waitForServiceFilterOptionVisible('Immigration and Asylum');
      await expect(reopenedImmigrationServiceFilter).toBeChecked();
      const reopenedCivilServiceFilter = await taskListPage.waitForServiceFilterOptionVisible('Civil');
      await expect(reopenedCivilServiceFilter).not.toBeChecked();
    });
  });

  test('filters the My cases screen using the task list work filter', async ({ taskListPage, page, tableUtils }) => {
    const myCasesResponse = buildMyCasesMock();
    const filteredMyCasesResponse = {
      cases: [myCasesResponse.cases[0]],
      total_records: 1,
      unique_cases: 1,
    };
    const myCasesRequests: SearchRequestPayload[] = [];

    await setupMyWorkFilterRoutes(page, {
      myCasesRouteHandler: async (route) => {
        const request = route.request().postDataJSON() as SearchRequestPayload;
        myCasesRequests.push(request);
        const searchParameters = request.searchRequest?.search_parameters ?? [];
        const hasIaServiceFilter = searchParameters.some(
          (parameter) => parameter.key === 'services' && parameter.values?.includes('IA')
        );
        const hasIaLocationFilter = searchParameters.some(
          (parameter) => parameter.key === 'locations' && parameter.values?.includes('20001')
        );

        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(hasIaServiceFilter && hasIaLocationFilter ? filteredMyCasesResponse : myCasesResponse),
        });
      },
      roleAssignmentInfo: [
        {
          jurisdiction: 'IA',
          substantive: 'Y',
          roleType: 'ORGANISATION',
          baseLocation: '20001',
          isCaseAllocator: false,
        },
        {
          jurisdiction: 'SSCS',
          substantive: 'Y',
          roleType: 'ORGANISATION',
          baseLocation: '30001',
          isCaseAllocator: false,
        },
      ],
    });

    await test.step('Open My cases and narrow the work filter to Immigration and Asylum', async () => {
      await taskListPage.gotoMyCases();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.openFilterPanel();

      const sscsServiceFilter = await taskListPage.waitForServiceFilterOptionVisible('Social security and child support');
      await sscsServiceFilter.uncheck();
      await expect(sscsServiceFilter).not.toBeChecked();

      const sscsLocationTag = taskListPage.visibleSelectedLocationTags.filter({ hasText: 'SSCS Court Center 1' }).first();
      if (await sscsLocationTag.isVisible().catch(() => false)) {
        await sscsLocationTag.click();
      }
      await taskListPage.expectSelectedLocations(['IA Court Center 1']);
      await taskListPage.applyCurrentFilters();
      await expect(taskListPage.filterPanel).toBeHidden();
    });

    await test.step('Verify My cases reloads with the selected service and location filters', async () => {
      await expect
        .poll(
          () =>
            myCasesRequests.some((request) => {
              const searchParameters = request.searchRequest?.search_parameters ?? [];
              return (
                searchParameters.some((parameter) => parameter.key === 'services' && parameter.values?.includes('IA')) &&
                searchParameters.some((parameter) => parameter.key === 'locations' && parameter.values?.includes('20001'))
              );
            }),
          { message: 'filtered My cases request was sent' }
        )
        .toBe(true);

      const latestRequest = myCasesRequests.at(-1);
      expect(latestRequest?.searchRequest?.search_parameters).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ key: 'services', values: ['IA'] }),
          expect.objectContaining({ key: 'locations', values: ['20001'] }),
        ])
      );

      await expect(taskListPage.myCasesResultsAmount).toContainText('Showing 1 results');
      const table = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
      expect(table).toHaveLength(1);
      expect(table[0]['Case name']).toBe(filteredMyCasesResponse.cases[0].case_name);
      expect(table[0]['Service']).toBe(filteredMyCasesResponse.cases[0].expectedServiceLabel);
    });
  });

  for (const scenario of [
    {
      expectedFullLocationServiceCodes: ['SSCS'],
      expectedVisibleServices: ['Social security and child support'],
      name: 'CASE roles do not leak into the filter when IA is case-scoped and SSCS is organisational',
      roleAssignmentInfo: [
        {
          jurisdiction: 'IA',
          substantive: 'Y',
          roleType: 'CASE',
          baseLocation: '20001',
          isCaseAllocator: false,
        },
        {
          jurisdiction: 'SSCS',
          substantive: 'Y',
          roleType: 'ORGANISATION',
          baseLocation: '30001',
          isCaseAllocator: false,
        },
      ],
      unexpectedServices: ['Immigration and Asylum', 'Civil'],
    },
    {
      expectedFullLocationServiceCodes: ['IA'],
      expectedVisibleServices: ['Immigration and Asylum'],
      name: 'CASE roles do not leak into the filter when SSCS is case-scoped and IA is organisational',
      roleAssignmentInfo: [
        {
          jurisdiction: 'IA',
          substantive: 'Y',
          roleType: 'ORGANISATION',
          baseLocation: '20001',
          isCaseAllocator: false,
        },
        {
          jurisdiction: 'SSCS',
          substantive: 'Y',
          roleType: 'CASE',
          baseLocation: '30001',
          isCaseAllocator: false,
        },
      ],
      unexpectedServices: ['Social security and child support', 'Civil'],
    },
  ]) {
    test(scenario.name, async ({ taskListPage, page }) => {
      const fullLocationServiceCodeCalls: string[][] = [];

      await setupMyWorkFilterRoutes(page, {
        fullLocationRouteHandler: async (route) => {
          const requestUrl = new URL(route.request().url());
          const rawServiceCodes = requestUrl.searchParams.get('serviceCodes') ?? '';
          fullLocationServiceCodeCalls.push(
            rawServiceCodes
              .split(',')
              .map((serviceCode) => serviceCode.trim())
              .filter(Boolean)
              .sort()
          );

          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(myWorkSelectableLocations),
          });
        },
        roleAssignmentInfo: scenario.roleAssignmentInfo,
      });

      await taskListPage.goto();
      await taskListPage.openFilterPanel();

      for (const expectedServiceLabel of scenario.expectedVisibleServices) {
        await taskListPage.waitForServiceFilterOptionVisible(expectedServiceLabel);
      }

      for (const unexpectedServiceLabel of scenario.unexpectedServices) {
        await expect(taskListPage.filterPanel.getByLabel(unexpectedServiceLabel)).toHaveCount(0);
      }

      expect(fullLocationServiceCodeCalls).toContainEqual([...scenario.expectedFullLocationServiceCodes].sort());
    });
  }
});
