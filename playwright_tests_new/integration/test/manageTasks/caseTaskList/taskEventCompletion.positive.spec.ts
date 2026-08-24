import { expect, test } from '../../../../E2E/fixtures';
import { applySessionCookiesAndExtractUserId } from '../../../helpers';
import {
  buildTaskEventCompletionTaskResponses,
  setupTaskEventCompletionRoutes,
  taskEventCompletionTestData,
  type TaskEventCompletionSubmissionCapture,
} from './taskEventCompletion.setup';

test.describe(
  `Task event completion positive path as ${taskEventCompletionTestData.userIdentifier}`,
  { tag: ['@integration', '@integration-manage-tasks'] },
  () => {
    test('submits the selected case event and completes the assigned task', async ({ caseDetailsPage, page }) => {
      const assigneeId = await applySessionCookiesAndExtractUserId(page, taskEventCompletionTestData.userIdentifier);
      const { completableTasksResponse, visibleTasks } = buildTaskEventCompletionTaskResponses(assigneeId);
      const submissionCapture: TaskEventCompletionSubmissionCapture = {
        completedTasks: [],
        submittedEvents: [],
      };

      await test.step('Mock the case details, task tab, event submit, and task completion routes', async () => {
        await setupTaskEventCompletionRoutes(page, {
          assigneeId,
          caseId: taskEventCompletionTestData.caseId,
          caseResponse: taskEventCompletionTestData.caseMockResponse,
          completableTasksResponse,
          eventId: taskEventCompletionTestData.eventId,
          eventTriggerResponse: taskEventCompletionTestData.eventTriggerResponse,
          submissionCapture,
          taskDetailsResponse: { task: completableTasksResponse.tasks[0] },
          taskId: taskEventCompletionTestData.taskId,
          visibleTasks,
        });
      });

      await test.step('Open the task tab and trigger the case event', async () => {
        await caseDetailsPage.openTasksTab('IA', 'Asylum', taskEventCompletionTestData.caseId);
        await caseDetailsPage.selectCaseAction(taskEventCompletionTestData.eventName, {
          expectedLocator: page.getByLabel(taskEventCompletionTestData.eventFieldLabel),
        });
        await caseDetailsPage.continueCaseEvent();
        await expect(caseDetailsPage.submitButton).toBeVisible();
      });

      await test.step('Submit the event and verify task completion by event', async () => {
        const eventSubmitResponse = page.waitForResponse(
          (response) =>
            response.request().method() === 'POST' &&
            response.url().includes(`/data/cases/${taskEventCompletionTestData.caseId}/events`)
        );
        const taskCompleteResponse = page.waitForResponse(
          (response) =>
            response.request().method() === 'POST' &&
            response.url().includes(`/workallocation/task/${taskEventCompletionTestData.taskId}/complete`) &&
            response.status() === 204
        );

        await caseDetailsPage.submitCaseEvent();
        await eventSubmitResponse;
        await taskCompleteResponse;

        expect(submissionCapture.submittedEvents).toHaveLength(1);
        expect(submissionCapture.submittedEvents[0].event).toMatchObject({
          id: taskEventCompletionTestData.eventId,
        });
        expect(submissionCapture.submittedEvents[0].event_token).toBe(`mock-${taskEventCompletionTestData.eventId}-event-token`);
        expect(submissionCapture.submittedEvents[0].data).toMatchObject({ [taskEventCompletionTestData.eventFieldId]: null });
        expect(submissionCapture.completedTasks).toEqual([
          {
            taskId: taskEventCompletionTestData.taskId,
            body: {
              actionByEvent: true,
              eventName: taskEventCompletionTestData.eventName,
            },
          },
        ]);
        await expect(page).toHaveURL(new RegExp(`/cases/case-details/IA/Asylum/${taskEventCompletionTestData.caseId}(?:$|#)`));
        await expect(caseDetailsPage.caseAlertSuccessMessage).toContainText(taskEventCompletionTestData.eventName);
      });
    });
  }
);
