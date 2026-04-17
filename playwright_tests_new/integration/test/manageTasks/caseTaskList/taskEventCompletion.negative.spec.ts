import { faker } from '@faker-js/faker';
import { expect, test } from '../../../../E2E/fixtures';
import { applySessionCookiesAndExtractUserId } from '../../../helpers';
import { buildCaseEventTriggerMock } from '../../../mocks/caseEventTrigger.builder';
import { buildCaseDetailsTasksFromParams, buildCaseDetailsTasksMinimal } from '../../../mocks/caseDetailsTasks.builder';
import { buildAsylumCaseMock } from '../../../mocks/cases/asylumCase.mock';

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
      await page.route(`**/data/internal/cases/${caseId}*`, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(caseMockResponse),
        });
      });

      await page.route(`**/data/internal/cases/${caseId}/event-triggers/${eventId}*`, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(eventTriggerResponse),
        });
      });

      await page.route('**/workallocation/caseworker/getUsersByServiceName*', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([
            {
              email: 'test@example.com',
              firstName: 'Test',
              idamId: assigneeId,
              lastName: 'User',
              location: {
                id: 227101,
                locationName: 'Newport (South Wales) Immigration and Asylum Tribunal',
              },
              roleCategory: 'LEGAL_OPERATIONS',
              service: 'IA',
            },
          ]),
        });
      });

      await page.route(`**/workallocation/case/task/${caseId}*`, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(visibleTasks),
        });
      });

      await page.route(
        `**/workallocation/case/tasks/${caseId}/event/${eventId}/caseType/Asylum/jurisdiction/IA*`,
        async (route) => {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(noCompletableTasksResponse),
          });
        }
      );
    });

    await test.step('Open the task tab and trigger the event completion flow', async () => {
      await page.goto(`/cases/case-details/IA/Asylum/${caseId}/tasks`);
      await caseDetailsPage.taskListContainer.waitFor();
      await caseDetailsPage.exuiSpinnerComponent.wait();
      await caseDetailsPage.selectCaseAction(eventName, { expectedLocator: caseDetailsPage.generalProblemHeading });
    });

    await test.step('Verify the no task available validation content', async () => {
      await expect(caseDetailsPage.generalProblemHeading).toHaveText(/There is a problem/i);
      await expect(page.locator('.govuk-error-summary')).toContainText('No task available');
      await expect(page.locator('.govuk-form-group--error')).toContainText(
        'You should have an assigned task for this event, but something has gone wrong'
      );
      await expect(page.getByRole('link', { name: 'Return to tasks tab' })).toBeVisible();
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
      await page.route(`**/data/internal/cases/${caseId}*`, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(caseMockResponse),
        });
      });

      await page.route(`**/data/internal/cases/${caseId}/event-triggers/${eventId}*`, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(eventTriggerResponse),
        });
      });

      await page.route('**/workallocation/caseworker/getUsersByServiceName*', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([
            {
              email: 'test@example.com',
              firstName: 'Test',
              idamId: assigneeId,
              lastName: 'User',
              location: {
                id: 227101,
                locationName: 'Newport (South Wales) Immigration and Asylum Tribunal',
              },
              roleCategory: 'LEGAL_OPERATIONS',
              service: 'IA',
            },
          ]),
        });
      });

      await page.route(`**/workallocation/case/task/${caseId}*`, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(visibleTasks),
        });
      });

      await page.route(
        `**/workallocation/case/tasks/${caseId}/event/${eventId}/caseType/Asylum/jurisdiction/IA*`,
        async (route) => {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(unassignedCompletableTasksResponse),
          });
        }
      );
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
      await expect(page.locator('.govuk-error-summary')).toContainText('Task assignment required');
      await expect(page.locator('.govuk-form-group--error')).toContainText('You must assign one');
      await expect(page.getByRole('link', { name: 'Return to tasks tab' })).toBeVisible();
    });
  });
});
