import type { Page } from '@playwright/test';
import type { CaseDetailsPage } from '../../../E2E/page-objects/pages/exui/caseDetails.po';
import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies, setupTaskEventCompletionMockRoutes } from '../../helpers';
import {
  TASK_EVENT_CASE_ID,
  TASK_EVENT_CASE_TYPE,
  TASK_EVENT_JURISDICTION,
  TASK_EVENT_NAME,
  buildTaskEventTask,
  type TaskEventTask,
} from '../../mocks/taskEventCompletion.mock';

const userIdentifier = 'STAFF_ADMIN';
const sessionUserId = 'task-event-user';

async function openTaskRequiredEvent(page: Page, caseDetailsPage: CaseDetailsPage, eventTasks: TaskEventTask[]) {
  await setupTaskEventCompletionMockRoutes(page, {
    eventTasks,
    sessionUserId,
  });

  await page.goto(`/cases/case-details/${TASK_EVENT_JURISDICTION}/${TASK_EVENT_CASE_TYPE}/${TASK_EVENT_CASE_ID}`);
  await expect(caseDetailsPage.container).toBeVisible();
  await caseDetailsPage.selectCaseDetailsTab('Tasks');
  await caseDetailsPage.selectCaseAction(TASK_EVENT_NAME);
  await expect(page.getByRole('heading', { name: /there is a problem/i }).first()).toBeVisible();
}

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
});

test.describe(
  `Task-required event completion as ${userIdentifier}`,
  { tag: ['@integration', '@integration-case-details'] },
  () => {
    test('Shows the no-task-available error when the Work Allocation event API returns no matching task', async ({
      page,
      caseDetailsPage,
    }) => {
      await test.step('Open the event with no task-required matches', async () => {
        await openTaskRequiredEvent(page, caseDetailsPage, []);
      });

      await test.step('Verify the no-task-available validation page', async () => {
        await expect(page.getByRole('heading', { level: 2, name: 'No task available' })).toBeVisible();
        await expect(
          page.getByText('You should have an assigned task for this event, but something has gone wrong.')
        ).toBeVisible();
        await expect(page.getByRole('link', { name: 'Return to tasks tab' })).toHaveAttribute(
          'href',
          `/cases/case-details/${TASK_EVENT_JURISDICTION}/${TASK_EVENT_CASE_TYPE}/${TASK_EVENT_CASE_ID}/tasks`
        );
      });
    });

    test('Shows the task-assignment-required error when the matching task is unassigned', async ({ page, caseDetailsPage }) => {
      await test.step('Open the event with one unassigned matching task', async () => {
        await openTaskRequiredEvent(page, caseDetailsPage, [
          buildTaskEventTask({
            assignee: undefined,
            id: 'task-unassigned-single',
            task_state: 'unassigned',
            task_title: 'Task 1',
          }),
        ]);
      });

      await test.step('Verify the task-assignment-required validation page', async () => {
        await expect(page.getByRole('heading', { level: 2, name: 'Task assignment required' })).toBeVisible();
        await expect(
          page.getByText('You must assign one of the available tasks from the task tab to continue with your work.')
        ).toBeVisible();
        await expect(page.getByRole('link', { name: 'Return to tasks tab to assign a task' })).toHaveAttribute(
          'href',
          `/cases/case-details/${TASK_EVENT_JURISDICTION}/${TASK_EVENT_CASE_TYPE}/${TASK_EVENT_CASE_ID}/tasks`
        );
      });
    });

    test('Shows the same task-assignment-required error when multiple matching tasks are unassigned', async ({
      page,
      caseDetailsPage,
    }) => {
      await test.step('Open the event with two unassigned matching tasks', async () => {
        await openTaskRequiredEvent(page, caseDetailsPage, [
          buildTaskEventTask({
            assignee: undefined,
            id: 'task-unassigned-1',
            task_state: 'unassigned',
            task_title: 'Task 1',
          }),
          buildTaskEventTask({
            assignee: undefined,
            id: 'task-unassigned-2',
            task_state: 'unassigned',
            task_title: 'Task 2',
          }),
        ]);
      });

      await test.step('Verify the multiple-unassigned path stays on the assignment-required validation page', async () => {
        await expect(page.getByRole('heading', { level: 2, name: 'Task assignment required' })).toBeVisible();
        await expect(
          page.getByText('You must assign one of the available tasks from the task tab to continue with your work.')
        ).toBeVisible();
        await expect(page.getByRole('link', { name: 'Return to tasks tab to assign a task' })).toBeVisible();
      });
    });
  }
);
