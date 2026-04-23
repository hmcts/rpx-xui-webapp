import { expect, test } from '../../../../E2E/fixtures';
import { applySessionCookiesAndExtractUserId } from '../../../helpers';
import { setupTaskActionEndpointMocks } from '../../../helpers/taskActionApiMocks.helper';
import { openCaseDetailsTasksTab, setupCaseTaskManageLinksRoutes } from '../../../helpers/caseTaskManageLinksMockRoutes.helper';
import { buildCaseTaskManageLinksCaseworkers, type CaseTaskManageLinksState } from '../../../mocks/caseTaskManageLinks.mock';

const userIdentifier = 'STAFF_ADMIN';
const caseId = '1617708245335311';
const claimTaskId = 'f782bde3-8d51-11eb-a9a4-06d032acc761';
const managedTaskId = 'f782bde3-8d51-11eb-a9a4-06d032acc762';
const claimTaskTitle = 'Assign to me from case details';
const managedTaskTitle = 'Reassign and unassign from case details';
const taskDueDate = '2030-05-20T12:00:00.000Z';

const getTaskRecordByTitle = (rows: Record<string, string>[], title: string) => rows.find((row) => row['Title']?.includes(title));

test.describe(
  `Case details task manage links as ${userIdentifier}`,
  { tag: ['@integration', '@integration-manage-tasks'] },
  () => {
    test('assigns an unassigned case task to the current user and refreshes the task card', async ({ caseDetailsPage, page }) => {
      const currentUserId = await applySessionCookiesAndExtractUserId(page, userIdentifier);
      const people = buildCaseTaskManageLinksCaseworkers(currentUserId);
      const taskState: CaseTaskManageLinksState = {
        managedTaskAssigneeId: people.existingAssignee.idamId,
      };
      let claimRequestBody: unknown;

      await test.step('Setup case-details task routes with a claimable task', async () => {
        await setupCaseTaskManageLinksRoutes(page, {
          caseId,
          claimTaskId,
          managedTaskId,
          claimTaskTitle,
          managedTaskTitle,
          taskDueDate,
          state: taskState,
          caseworkers: people.all,
        });

        await page.route(`**/workallocation/task/${claimTaskId}/claim*`, async (route) => {
          const request = route.request();
          if (request.method() !== 'POST') {
            await route.continue();
            return;
          }

          claimRequestBody = request.postDataJSON();
          taskState.claimTaskAssigneeId = currentUserId;

          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({}),
          });
        });
      });

      await test.step('Open the case Tasks tab and verify the claim link is shown', async () => {
        await openCaseDetailsTasksTab(page, caseDetailsPage, caseId);
        await expect(page.getByRole('heading', { name: 'Active tasks' })).toBeVisible();

        const claimTaskCard = caseDetailsPage.taskItem.filter({ hasText: claimTaskTitle }).first();
        await expect(claimTaskCard.locator('#action_claim')).toBeVisible();
      });

      await test.step('Claim the task and verify the refreshed task row plus success banner', async () => {
        const claimRequestPromise = page.waitForRequest(
          (request) => request.method() === 'POST' && request.url().includes(`/workallocation/task/${claimTaskId}/claim`)
        );

        await caseDetailsPage.taskItem.filter({ hasText: claimTaskTitle }).first().locator('#action_claim').click();
        await claimRequestPromise;

        expect(claimRequestBody).toEqual({});
        await expect(caseDetailsPage.caseAlertSuccessMessage).toContainText("You've assigned yourself a task.");

        const rows = await caseDetailsPage.getTaskKeyValueRows();
        const claimedTask = getTaskRecordByTitle(rows, claimTaskTitle);

        expect(claimedTask).toEqual(
          expect.objectContaining({
            'Assigned to': `${people.currentUser.firstName} ${people.currentUser.lastName}`,
          })
        );
        expect(claimedTask?.Manage).not.toContain('Assign to me');
      });
    });

    test('opens the reassign flow and loads matching people from the Tasks tab', async ({ caseDetailsPage, taskListPage, page }) => {
      const currentUserId = await applySessionCookiesAndExtractUserId(page, userIdentifier);
      const people = buildCaseTaskManageLinksCaseworkers(currentUserId);
      const taskState: CaseTaskManageLinksState = {
        managedTaskAssigneeId: people.existingAssignee.idamId,
      };

      await test.step('Setup case-details task routes and task-action resolvers', async () => {
        await setupTaskActionEndpointMocks(page, 'reassign', {
          taskId: managedTaskId,
          task_name: managedTaskTitle,
          due_date: taskDueDate,
          dueDate: taskDueDate,
          priority_date: taskDueDate,
          caseId,
          jurisdiction: 'IA',
          caseTypeId: 'Asylum',
          assigneeId: people.existingAssignee.idamId,
          newAssigneeId: people.replacementAssignee.idamId,
          includeSubmitActionMock: false,
        });

        await page.unroute('**/workallocation/caseworker/getUsersByServiceName*');
        await setupCaseTaskManageLinksRoutes(page, {
          caseId,
          claimTaskId,
          managedTaskId,
          claimTaskTitle,
          managedTaskTitle,
          taskDueDate,
          state: taskState,
          caseworkers: people.all,
        });

        await page.route('**/workallocation/caseworker/getUsersByServiceName*', async (route) => {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(people.all),
          });
        });
      });

      await test.step('Open the reassign flow from the case-details Tasks tab', async () => {
        await openCaseDetailsTasksTab(page, caseDetailsPage, caseId);

        await caseDetailsPage.taskItem.filter({ hasText: managedTaskTitle }).first().locator('#action_reassign').click();

        await expect(page).toHaveURL(new RegExp(`/work/${managedTaskId}/reassign\\?service=IA$`));
        await expect(page.locator('main')).toContainText('Choose a role type');
        await expect(page.locator('main')).toContainText('Reassign task');
      });

      await test.step('Load matching people for the selected role', async () => {
        await page.getByRole('radio', { name: 'Legal Ops' }).check({ force: true });
        await taskListPage.continueButton.click();

        await expect(page.locator('main')).toContainText('Find the person');
        const caseworkerSearchResponsePromise = page.waitForResponse(
          (response) =>
            response.request().method() === 'POST' &&
            response.url().includes('/workallocation/caseworker/getUsersByServiceName') &&
            response.request().postData()?.includes('"term":"Replacement"')
        );
        await taskListPage.reassignUserSearchInput.click();
        await taskListPage.reassignUserSearchInput.pressSequentially('Replacement');
        const caseworkerSearchResponse = await caseworkerSearchResponsePromise;
        const caseworkerSearchResults = (await caseworkerSearchResponse.json()) as Array<{ idamId?: string; firstName?: string }>;
        expect(caseworkerSearchResults).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              idamId: people.replacementAssignee.idamId,
            }),
          ])
        );
        await expect(taskListPage.reassignUserSearchInput).toHaveValue(/Replacement/i);
      });
    });

    test('unassigns a case task from the Tasks tab and refreshes the task card', async ({ caseDetailsPage, page }) => {
      const currentUserId = await applySessionCookiesAndExtractUserId(page, userIdentifier);
      const people = buildCaseTaskManageLinksCaseworkers(currentUserId);
      const taskState: CaseTaskManageLinksState = {
        managedTaskAssigneeId: people.existingAssignee.idamId,
      };
      let unassignRequestBody: unknown;

      await test.step('Setup case-details task routes and unassign resolvers', async () => {
        await setupTaskActionEndpointMocks(page, 'unassign', {
          taskId: managedTaskId,
          task_name: managedTaskTitle,
          due_date: taskDueDate,
          dueDate: taskDueDate,
          priority_date: taskDueDate,
          caseId,
          jurisdiction: 'IA',
          caseTypeId: 'Asylum',
          assigneeId: people.existingAssignee.idamId,
          unassignMode: 'unclaim',
          includeSubmitActionMock: false,
        });

        await setupCaseTaskManageLinksRoutes(page, {
          caseId,
          claimTaskId,
          managedTaskId,
          claimTaskTitle,
          managedTaskTitle,
          taskDueDate,
          state: taskState,
          caseworkers: people.all,
        });

        await page.route(`**/workallocation/task/${managedTaskId}/unclaim*`, async (route) => {
          const request = route.request();
          if (request.method() !== 'POST') {
            await route.continue();
            return;
          }

          unassignRequestBody = request.postDataJSON();
          taskState.managedTaskAssigneeId = undefined;

          await route.fulfill({
            status: 204,
            contentType: 'application/json',
            body: JSON.stringify({}),
          });
        });
      });

      await test.step('Open the unassign flow and verify the refreshed unassigned state', async () => {
        await openCaseDetailsTasksTab(page, caseDetailsPage, caseId);
        await caseDetailsPage.taskItem.filter({ hasText: managedTaskTitle }).first().locator('#action_unclaim').click();

        await expect(page).toHaveURL(new RegExp(`/work/${managedTaskId}/unclaim\\?service=IA$`));
        await expect(page.locator('main')).toContainText('Unassign task');
        await page.getByRole('button', { name: 'Unassign task' }).click();

        expect(unassignRequestBody).toEqual({ hasNoAssigneeOnComplete: false });
        await expect(caseDetailsPage.caseAlertSuccessMessage).toContainText("You've unassigned a task.");

        const rows = await caseDetailsPage.getTaskKeyValueRows();
        const managedTask = getTaskRecordByTitle(rows, managedTaskTitle);

        expect(managedTask?.['Assigned to']).toBeUndefined();
        expect(managedTask?.Manage).toContain('Assign to me');
      });
    });
  }
);
