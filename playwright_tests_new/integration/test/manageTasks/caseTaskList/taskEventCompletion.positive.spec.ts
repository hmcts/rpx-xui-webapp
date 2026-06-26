import { expect, test } from '../../../../E2E/fixtures';
import { applySessionCookiesAndExtractUserId } from '../../../helpers';
import { buildCaseEventTriggerMock } from '../../../mocks/caseEventTrigger.builder';
import { buildCaseDetailsTasksFromParams, buildCaseDetailsTasksMinimal } from '../../../mocks/caseDetailsTasks.builder';
import { buildAsylumCaseMock } from '../../../mocks/cases/asylumCase.mock';
import { setupTaskEventCompletionRoutes, type TaskEventCompletionSubmissionCapture } from './taskEventCompletion.setup';

const userIdentifier = 'STAFF_ADMIN';
const caseId = '1652161372854637';
const eventId = 'text';
const eventName = 'Test event';
const eventFieldId = 'TaskCompletionNote';
const eventFieldLabel = 'Completion note';
const taskId = '11111111-2222-4333-8444-555555555555';
const caseMockResponse = buildAsylumCaseMock({
  caseId,
  triggers: [{ id: eventId, name: eventName }],
});
const textFieldType = {
  id: 'Text',
  type: 'Text',
  min: null,
  max: null,
  regular_expression: null,
  fixed_list_items: [],
  complex_fields: [],
  collection_field_type: null,
};
const eventTriggerResponse = {
  ...buildCaseEventTriggerMock({
    caseId,
    eventId,
    eventName,
    description: 'Complete the selected case task event',
  }),
  case_fields: [
    {
      id: eventFieldId,
      label: eventFieldLabel,
      hidden: null,
      order: null,
      metadata: false,
      case_type_id: null,
      hint_text: null,
      field_type: textFieldType,
      security_classification: 'PUBLIC',
      live_from: null,
      live_until: null,
      show_condition: null,
      acls: [],
      complexACLs: [],
      display_context: 'OPTIONAL',
      display_context_parameter: null,
      retain_hidden_value: null,
      formatted_value: null,
      category_id: null,
    },
  ],
  wizard_pages: [
    {
      id: `${eventId}Page1`,
      label: eventName,
      order: 1,
      wizard_page_fields: [
        {
          case_field_id: eventFieldId,
          order: 1,
          page_column_no: null,
          complex_field_overrides: [],
        },
      ],
      show_condition: null,
      callback_url_mid_event: null,
      retries_timeout_mid_event: [],
    },
  ],
};

test.describe(
  `Task event completion positive path as ${userIdentifier}`,
  { tag: ['@integration', '@integration-manage-tasks'] },
  () => {
    test('submits the selected case event and completes the assigned task', async ({ caseDetailsPage, page }) => {
      const assigneeId = await applySessionCookiesAndExtractUserId(page, userIdentifier);
      const visibleTasks = buildCaseDetailsTasksMinimal({
        caseId,
        id: [taskId],
        titles: ['Task 1'],
        states: ['assigned'],
        assignees: [assigneeId],
      });
      const completableTasksResponse = {
        task_required_for_event: true,
        tasks: buildCaseDetailsTasksFromParams({
          caseId,
          tasks: [{ id: taskId, title: 'Task 1', state: 'assigned', assignee: assigneeId }],
        }),
      };
      const submissionCapture: TaskEventCompletionSubmissionCapture = {
        completedTasks: [],
        submittedEvents: [],
      };

      await test.step('Mock the case details, task tab, event submit, and task completion routes', async () => {
        await setupTaskEventCompletionRoutes(page, {
          assigneeId,
          caseId,
          caseResponse: caseMockResponse,
          completableTasksResponse,
          eventId,
          eventTriggerResponse,
          submissionCapture,
          taskDetailsResponse: { task: completableTasksResponse.tasks[0] },
          taskId,
          visibleTasks,
        });
      });

      await test.step('Open the task tab and trigger the case event', async () => {
        await caseDetailsPage.openTasksTab('IA', 'Asylum', caseId);
        await caseDetailsPage.selectCaseAction(eventName, { expectedLocator: page.getByLabel(eventFieldLabel) });
        await caseDetailsPage.continueCaseEvent();
        await expect(caseDetailsPage.submitButton).toBeVisible();
      });

      await test.step('Submit the event and verify task completion by event', async () => {
        const eventSubmitResponse = page.waitForResponse(
          (response) => response.request().method() === 'POST' && response.url().includes(`/data/cases/${caseId}/events`)
        );
        const taskCompleteResponse = page.waitForResponse(
          (response) =>
            response.request().method() === 'POST' &&
            response.url().includes(`/workallocation/task/${taskId}/complete`) &&
            response.status() === 204
        );

        await caseDetailsPage.submitCaseEvent();
        await eventSubmitResponse;
        await taskCompleteResponse;

        expect(submissionCapture.submittedEvents).toHaveLength(1);
        expect(submissionCapture.submittedEvents[0].event).toMatchObject({
          id: eventId,
        });
        expect(submissionCapture.submittedEvents[0].event_token).toBe(`mock-${eventId}-event-token`);
        expect(submissionCapture.submittedEvents[0].data).toMatchObject({ [eventFieldId]: null });
        expect(submissionCapture.completedTasks).toEqual([
          {
            taskId,
            body: {
              actionByEvent: true,
              eventName,
            },
          },
        ]);
        await expect(page).toHaveURL(new RegExp(`/cases/case-details/IA/Asylum/${caseId}(?:$|#)`));
        await expect(caseDetailsPage.caseAlertSuccessMessage).toContainText(eventName);
      });
    });
  }
);
