import type { TaskListPage } from '../../../../E2E/page-objects/pages/exui/taskList.po';
import { expect, test } from '../../../../E2E/fixtures';
import { applySessionCookies, setupWorkFiltersMockRoutes } from '../../../helpers';
import { workFilterLocationSearchScenarios, type WorkFilterRoleAssignment } from '../../../mocks/workFilters.mock';

const userIdentifier = 'STAFF_ADMIN';

const defaultRoleAssignments: WorkFilterRoleAssignment[] = [
  { jurisdiction: 'IA', substantive: 'Y', roleType: 'ORGANISATION', baseLocation: '20001' },
  { jurisdiction: 'SSCS', substantive: 'Y', roleType: 'ORGANISATION', baseLocation: '30001' },
];

async function assertFilterSurfaceVisible(taskListPage: TaskListPage): Promise<void> {
  await expect(taskListPage.serviceFilterCheckboxes.first()).toBeVisible();
  await expect(taskListPage.locationSearchInput).toBeVisible();
}

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
});

test.describe(`Work filters as ${userIdentifier}`, { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  test('My tasks shows, hides, and reapplies the work filter panel', async ({ taskListPage, page }) => {
    await test.step('Setup work-filter routes', async () => {
      await setupWorkFiltersMockRoutes(page, { roleAssignments: defaultRoleAssignments });
    });

    await test.step('Open My tasks and verify the filter is collapsed by default', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await expect(taskListPage.taskListFilterToggle).toHaveText('Show work filter');
      await expect(taskListPage.locationFilterContainer).not.toBeVisible();
    });

    await test.step('Open the filter panel and verify service and location controls are rendered', async () => {
      await taskListPage.openFilterPanel();

      await expect(taskListPage.taskListFilterToggle).toHaveText('Hide work filter');
      await assertFilterSurfaceVisible(taskListPage);
    });

    await test.step('Apply the filters and verify the panel collapses again', async () => {
      await taskListPage.applyCurrentFilters();

      await expect(taskListPage.taskListFilterToggle).toHaveText('Show work filter');
      await expect(taskListPage.locationFilterContainer).not.toBeVisible();
    });
  });

  test('The work-filter surface stays available across My tasks, Available tasks, and My cases', async ({
    taskListPage,
    page,
  }) => {
    await test.step('Setup work-filter routes for all My work tabs', async () => {
      await setupWorkFiltersMockRoutes(page, { roleAssignments: defaultRoleAssignments });
    });

    await test.step('Verify the filter surface on My tasks', async () => {
      await taskListPage.goto();
      await taskListPage.openFilterPanel();
      await assertFilterSurfaceVisible(taskListPage);
      await taskListPage.applyCurrentFilters();
      await expect(taskListPage.taskListFilterToggle).toHaveText('Show work filter');
    });

    await test.step('Verify the filter surface on Available tasks', async () => {
      await taskListPage.clickTaskTabAndWaitForView(
        'Available tasks',
        'AvailableTasks',
        'opening Available tasks from My tasks work-filter coverage'
      );
      await taskListPage.waitForTaskListShellReady('available tasks work-filter coverage');
      await taskListPage.openFilterPanel();
      await assertFilterSurfaceVisible(taskListPage);
      await taskListPage.applyCurrentFilters();
      await expect(taskListPage.taskListFilterToggle).toHaveText('Show work filter');
    });

    await test.step('Verify the filter surface on My cases and when returning to My tasks', async () => {
      await taskListPage.taskTableTabs.filter({ hasText: 'My cases' }).first().click();
      await page.waitForURL(/\/work\/my-work\/my-cases(?:\?.*)?$/);
      await taskListPage.waitForTaskListShellReady('my cases work-filter coverage');
      await taskListPage.openFilterPanel();
      await assertFilterSurfaceVisible(taskListPage);
      await taskListPage.applyCurrentFilters();
      await expect(taskListPage.taskListFilterToggle).toHaveText('Show work filter');

      await taskListPage.clickTaskTabAndWaitForView(
        'My tasks',
        'MyTasks',
        'returning to My tasks from My cases work-filter coverage'
      );
      await taskListPage.waitForTaskListShellReady('returning to My tasks work-filter coverage');
      await taskListPage.openFilterPanel();
      await assertFilterSurfaceVisible(taskListPage);
    });
  });

  test('My tasks validates that at least one service stays selected', async ({ taskListPage, page }) => {
    await test.step('Setup work-filter routes with IA and Civil services', async () => {
      await setupWorkFiltersMockRoutes(page, {
        roleAssignments: [
          { jurisdiction: 'IA', substantive: 'Y', roleType: 'ORGANISATION', baseLocation: '20001' },
          { jurisdiction: 'CIVIL', substantive: 'Y', roleType: 'ORGANISATION' },
        ],
      });
    });

    await test.step('Clear every service and verify the mandatory validation message', async () => {
      await taskListPage.goto();
      await taskListPage.openFilterPanel();
      await taskListPage.setServiceFilterValue('Civil', false);
      await taskListPage.setServiceFilterValue('Immigration and Asylum', false);
      await taskListPage.applyCurrentFilters();
      await taskListPage.openFilterPanel();

      await expect(taskListPage.selectServicesError).toContainText('Select a service');
    });

    await test.step('Re-select a service and verify the filter can be applied again', async () => {
      await taskListPage.setServiceFilterValue('Immigration and Asylum', true);
      await taskListPage.applyCurrentFilters();

      await expect(taskListPage.taskListFilterToggle).toHaveText('Show work filter');
      await expect(taskListPage.locationFilterContainer).not.toBeVisible();
    });
  });

  for (const scenario of workFilterLocationSearchScenarios) {
    test(`Location filtering remains available for ${scenario.name}`, async ({ taskListPage, page }) => {
      await test.step('Setup work-filter routes for the location-search scenario', async () => {
        await setupWorkFiltersMockRoutes(page, {
          roleAssignments: scenario.roleAssignments,
        });
      });

      await test.step('Open the location filter and verify the search control is available', async () => {
        await taskListPage.goto();
        await taskListPage.openFilterPanel();
        await assertFilterSurfaceVisible(taskListPage);
      });
    });
  }
});
