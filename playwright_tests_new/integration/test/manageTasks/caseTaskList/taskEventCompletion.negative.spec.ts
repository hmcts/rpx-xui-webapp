import { faker } from '@faker-js/faker';
import { expect, test } from '../../../../E2E/fixtures';
import { applySessionCookiesAndExtractUserId } from '../../../helpers';
import { buildCaseEventTriggerMock } from '../../../mocks/caseEventTrigger.builder';
import { buildCaseDetailsTasksFromParams, buildCaseDetailsTasksMinimal } from '../../../mocks/caseDetailsTasks.builder';
import { buildAsylumCaseMock } from '../../../mocks/cases/asylumCase.mock';
import { setupTaskEventCompletionRoutes } from './taskEventCompletion.setup';

const userIdentifier = 'STAFF_ADMIN';
const caseId = faker.number.int({ min: 1_000_000_000, max: 9_999_999_999 }).toString();
const eventId = 'text';
const eventName = 'Test event';
const caseMockResponse = buildAsylumCaseMock({
  caseId,
  triggers: [{ id: eventId, name: eventName }],
});
const eventTriggerResponse = buildCaseEventTriggerMock({
  caseId,
  eventId,
  eventName,
  description: 'Complete the selected case task event',
});
const tasksTabPath = `/cases/case-details/IA/Asylum/${caseId}/tasks`;

test.describe(`Task event completion as ${userIdentifier}`, { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  test('shows the no task available validation when the selected event has no completable tasks', async ({
    caseDetailsPage,
    page,
  }) => {
    const assigneeId = await applySessionCookiesAndExtractUserId(page, userIdentifier);
    const visibleTasks = buildCaseDetailsTasksMinimal({
      caseId,
      titles: ['Task 1'],
      states: ['assigned'],
      assignees: [assigneeId],
    });
    const noCompletableTasksResponse = {
      task_required_for_event: true,
      tasks: [],
    };

    await test.step('Mock the case details, task tab, and completable-task responses', async () => {
      await setupTaskEventCompletionRoutes(page, {
        assigneeId,
        caseId,
        caseResponse: caseMockResponse,
        completableTasksResponse: noCompletableTasksResponse,
        eventId,
        eventTriggerResponse: eventTriggerResponse,
        visibleTasks,
      });
    });

    await test.step('Open the task tab and trigger the event completion flow', async () => {
      await caseDetailsPage.openTasksTab('IA', 'Asylum', caseId);
      await caseDetailsPage.selectCaseAction(eventName, { expectedLocator: caseDetailsPage.generalProblemHeading });
    });

    await test.step('Verify the no task available validation content', async () => {
      await expect(page).toHaveURL(/\/no-tasks-available$/);
      await expect(caseDetailsPage.generalProblemHeading).toHaveText(/There is a problem/i);
      await expect(page.locator('.govuk-error-summary__body')).toContainText('No task available');
      await expect(page.getByRole('heading', { name: 'No task available' })).toBeVisible();
      await expect(page.getByText('You should have an assigned task for this event, but something has gone wrong')).toBeVisible();
      const returnToTasksLink = page.getByRole('link', { name: 'Return to tasks tab' });
      await expect(returnToTasksLink).toBeVisible();
      await expect(returnToTasksLink).toHaveAttribute('href', tasksTabPath);
    });
  });

  test('shows the task assignment required validation when only unassigned completable tasks exist', async ({
    caseDetailsPage,
    page,
  }) => {
    const assigneeId = await applySessionCookiesAndExtractUserId(page, userIdentifier);
    const visibleTasks = buildCaseDetailsTasksMinimal({
      caseId,
      titles: ['Task 1'],
      states: ['assigned'],
      assignees: [assigneeId],
    });
    const unassignedCompletableTasks = buildCaseDetailsTasksFromParams({
      caseId,
      tasks: [
        { id: 'task-1', title: 'Task 1', state: 'unassigned', assignee: '' },
        { id: 'task-2', title: 'Task 2', state: 'unassigned', assignee: '' },
      ],
    });
    const unassignedCompletableTasksResponse = {
      task_required_for_event: true,
      tasks: unassignedCompletableTasks,
    };

    await test.step('Mock the case details, task tab, and unassigned completable-task responses', async () => {
      await setupTaskEventCompletionRoutes(page, {
        assigneeId,
        caseId,
        caseResponse: caseMockResponse,
        completableTasksResponse: unassignedCompletableTasksResponse,
        eventId,
        eventTriggerResponse: eventTriggerResponse,
        visibleTasks,
      });
    });

    await test.step('Open the task tab and trigger the event completion flow', async () => {
      await page.goto(`/cases/case-details/IA/Asylum/${caseId}/tasks`);
      await caseDetailsPage.taskListContainer.waitFor();
      await caseDetailsPage.exuiSpinnerComponent.wait();
      await caseDetailsPage.selectCaseAction(eventName, { expectedLocator: caseDetailsPage.generalProblemHeading });
    });

    await test.step('Verify the task assignment required validation content', async () => {
      await expect(page).toHaveURL(/\/task-unassigned$/);
      await expect(caseDetailsPage.generalProblemHeading).toHaveText(/There is a problem/i);
      await expect(page.locator('.govuk-error-summary__body')).toContainText('Task assignment required');
      await expect(page.getByRole('heading', { name: 'Task assignment required' })).toBeVisible();
      await expect(
        page.getByText('You must assign one of the available tasks from the task tab to continue with your work.')
      ).toBeVisible();
      const returnToTasksLink = page.getByRole('link', { name: 'Return to tasks tab to assign a task' });
      await expect(returnToTasksLink).toBeVisible();
      await expect(returnToTasksLink).toHaveAttribute('href', tasksTabPath);
    });
  });
});
