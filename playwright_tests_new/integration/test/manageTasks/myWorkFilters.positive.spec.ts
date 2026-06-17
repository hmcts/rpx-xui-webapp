import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies, myWorkSelectableLocations, setupMyWorkFilterRoutes } from '../../helpers';

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
      await expect(taskListPage.taskListFilterToggle).toContainText('Show work filter');
      await expect(taskListPage.filterPanel).toBeHidden();

      await taskListPage.openFilterPanel();
      await expect(taskListPage.taskListFilterToggle).toContainText('Hide work filter');
      await taskListPage.expectWorkFilterControls();
      await taskListPage.waitForServiceFilterOptionVisible('Immigration and Asylum');
      await taskListPage.waitForServiceFilterOptionVisible('Social security and child support');
      await expect(taskListPage.filterPanel.locator('#locations:visible').first()).toBeVisible();

      await taskListPage.applyCurrentFilters();
      await expect(taskListPage.taskListFilterToggle).toContainText('Show work filter');
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
        await expect(taskListPage.taskListFilterToggle).toContainText('Show work filter');

        await taskListPage.openFilterPanel();
        await expect(taskListPage.taskListFilterToggle).toContainText('Hide work filter');
        await taskListPage.expectWorkFilterControls({ typesOfWorkVisible: tabName !== 'My cases' });
        await taskListPage.waitForServiceFilterOptionVisible('Immigration and Asylum');
        await taskListPage.waitForServiceFilterOptionVisible('Social security and child support');
        await expect(taskListPage.filterPanel.locator('#locations:visible').first()).toBeVisible();

        await taskListPage.applyCurrentFilters();
        await expect(taskListPage.taskListFilterToggle).toContainText('Show work filter');
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
      await expect(taskListPage.taskListFilterToggle).toHaveText('Show work filter');
      await expect(taskListPage.filterPanel).toBeHidden();

      await taskListPage.openFilterPanel();
      const reopenedImmigrationServiceFilter = await taskListPage.waitForServiceFilterOptionVisible('Immigration and Asylum');
      await expect(reopenedImmigrationServiceFilter).toBeChecked();
      const reopenedCivilServiceFilter = await taskListPage.waitForServiceFilterOptionVisible('Civil');
      await expect(reopenedCivilServiceFilter).not.toBeChecked();
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
