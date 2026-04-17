import type { Page } from '@playwright/test';
import { buildAsylumCaseMock } from '../mocks/cases/asylumCase.mock';
import { buildCaseDetailsTasksFromParams } from '../mocks/caseDetailsTasks.builder';
import {
  TASK_EVENT_CASE_ID,
  TASK_EVENT_CASE_TYPE,
  TASK_EVENT_ID,
  TASK_EVENT_JURISDICTION,
  buildTaskEventPayload,
  buildTaskEventTask,
  buildTaskEventTriggerMock,
  buildTaskEventUserDetails,
  type TaskEventTask,
} from '../mocks/taskEventCompletion.mock';
import { setupCaseTaskListMockRoute } from './taskListMockRoutes.helper';

type TaskEventCompletionMockRouteOptions = {
  caseId?: string;
  caseType?: string;
  eventId?: string;
  eventTasks: TaskEventTask[];
  jurisdiction?: string;
  sessionUserId: string;
};

export async function setupTaskEventCompletionMockRoutes(
  page: Page,
  options: TaskEventCompletionMockRouteOptions
): Promise<void> {
  const caseId = options.caseId ?? TASK_EVENT_CASE_ID;
  const caseType = options.caseType ?? TASK_EVENT_CASE_TYPE;
  const jurisdiction = options.jurisdiction ?? TASK_EVENT_JURISDICTION;
  const eventId = options.eventId ?? TASK_EVENT_ID;
  const userDetails = buildTaskEventUserDetails(options.sessionUserId);
  const eventTrigger = buildTaskEventTriggerMock();
  const eventTasks = options.eventTasks.map((task) =>
    buildTaskEventTask({
      ...task,
      case_id: caseId,
      case_type_id: caseType,
      jurisdiction,
    })
  );
  const caseTaskResponse = buildCaseDetailsTasksFromParams({
    caseId,
    tasks: eventTasks.map((task, index) => ({
      assignee: task.assignee,
      caseId,
      caseTypeId: caseType,
      dueDate: `2026-01-${String(index + 10).padStart(2, '0')}T10:00:00Z`,
      id: task.id,
      jurisdiction,
      state: task.task_state,
      title: task.task_title,
    })),
  });

  await page.addInitScript((seededUserInfo) => {
    window.sessionStorage.setItem('userDetails', JSON.stringify(seededUserInfo));
  }, userDetails.userInfo);

  await page.route(new RegExp(`/data/internal/cases/${caseId}(?:\\?.*)?$`), async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(
        buildAsylumCaseMock({
          caseId,
          caseTypeId: caseType,
          jurisdictionId: jurisdiction,
          triggers: [
            {
              id: eventId,
              name: eventTrigger.name,
            },
          ],
        })
      ),
    });
  });

  await page.route(`**/data/internal/cases/${caseId}/event-triggers/${eventId}*`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(eventTrigger),
    });
  });

  await page.route(`**/data/internal/cases/${caseId}/event-triggers/${eventId}/validate*`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(eventTrigger),
    });
  });

  await page.route(
    `**/workallocation/case/tasks/${caseId}/event/${eventId}/caseType/${caseType}/jurisdiction/${jurisdiction}*`,
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(buildTaskEventPayload(eventTasks)),
      });
    }
  );

  await page.route('**/api/user/details*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(userDetails),
    });
  });

  await setupCaseTaskListMockRoute(page, caseId, caseTaskResponse);
}
