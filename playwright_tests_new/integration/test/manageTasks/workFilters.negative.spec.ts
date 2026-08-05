import { expect, test } from '../../../E2E/fixtures';
import { setupManageTasksBaseRoutes } from '../../helpers';
import { buildTaskListMock, myActionsList } from '../../mocks/taskList.mock';
import {
  setupWorkFiltersUser,
  workFiltersSupportedJurisdictionDetails,
  workFiltersSupportedJurisdictions,
  workFiltersUserId,
  workFiltersUserIdentifier,
  warmWorkFiltersSession,
} from './workFilters.setup';

const WORK_FILTERS_SESSION_BOOTSTRAP_TIMEOUT_MS =
  Number.parseInt(process.env.PW_WORK_FILTERS_SESSION_BOOTSTRAP_TIMEOUT_MS ?? '', 10) || 180_000;

test.beforeAll(async ({}, testInfo) => {
  testInfo.setTimeout(WORK_FILTERS_SESSION_BOOTSTRAP_TIMEOUT_MS);
  await warmWorkFiltersSession();
});

test.beforeEach(async ({ page }) => {
  await setupWorkFiltersUser(page);
});

test.describe(
  `Work filters validation as ${workFiltersUserIdentifier}`,
  { tag: ['@integration', '@integration-manage-tasks'] },
  () => {
    test('My tasks requires at least one service before filters can be applied', async ({ taskListPage, page }) => {
      await setupManageTasksBaseRoutes(page, {
        taskListResponse: buildTaskListMock(6, workFiltersUserId, myActionsList),
        supportedJurisdictions: workFiltersSupportedJurisdictions,
        supportedJurisdictionDetails: workFiltersSupportedJurisdictionDetails,
      });

      await taskListPage.gotoAndWaitForTaskRow('validating mandatory services on My tasks');
      await taskListPage.openFilterPanel();
      await taskListPage.clearServicesFilters();
      await taskListPage.applyCurrentFilters();

      await expect(taskListPage.selectServicesError).toBeVisible();
      await expect(taskListPage.selectServicesError).toContainText('Select a service');
    });
  }
);
