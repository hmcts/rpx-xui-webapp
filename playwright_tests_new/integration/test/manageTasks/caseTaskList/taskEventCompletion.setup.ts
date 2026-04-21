import type { Page } from '@playwright/test';

type TaskEventCompletionRouteOptions = {
  assigneeId: string;
  caseId: string;
  caseResponse: unknown;
  completableTasksResponse: unknown;
  eventId: string;
  eventTriggerResponse: unknown;
  visibleTasks: unknown;
};

function buildCaseworkerResponse(assigneeId: string) {
  return [
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
  ];
}

export async function setupTaskEventCompletionRoutes(
  page: Page,
  {
    assigneeId,
    caseId,
    caseResponse,
    completableTasksResponse,
    eventId,
    eventTriggerResponse,
    visibleTasks,
  }: TaskEventCompletionRouteOptions
): Promise<void> {
  await page.route(`**/data/internal/cases/${caseId}*`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(caseResponse),
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
      body: JSON.stringify(buildCaseworkerResponse(assigneeId)),
    });
  });

  await page.route(`**/workallocation/case/task/${caseId}*`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(visibleTasks),
    });
  });

  await page.route(`**/workallocation/case/tasks/${caseId}/event/${eventId}/caseType/Asylum/jurisdiction/IA*`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(completableTasksResponse),
    });
  });
}
