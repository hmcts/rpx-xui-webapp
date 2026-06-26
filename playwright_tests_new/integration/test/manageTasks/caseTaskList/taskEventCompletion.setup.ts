import type { Page } from '@playwright/test';

type TaskEventCompletionRouteOptions = {
  assigneeId: string;
  caseId: string;
  caseResponse: unknown;
  completableTasksResponse: unknown;
  eventId: string;
  eventTriggerResponse: unknown;
  submissionCapture?: TaskEventCompletionSubmissionCapture;
  taskDetailsResponse?: unknown;
  taskId?: string;
  visibleTasks: unknown;
};

export type TaskEventCompletionSubmissionCapture = {
  completedTasks: Array<{
    body: Record<string, unknown> | undefined;
    taskId: string;
  }>;
  submittedEvents: Array<Record<string, unknown>>;
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

function buildCaseworkerJurisdictionsResponse() {
  return [
    {
      id: 'IA',
      name: 'Immigration and Asylum',
      caseTypes: [],
    },
  ];
}

function buildTaskRolesResponse() {
  return [
    {
      role_category: 'LEGAL_OPERATIONS',
      role_name: 'tribunal-caseworker',
      permissions: ['Own', 'Execute', 'Read', 'Manage', 'Cancel'],
      authorisations: ['IAC'],
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
    submissionCapture,
    taskDetailsResponse,
    taskId,
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

  await page.route('**/aggregated/caseworkers/**/jurisdictions*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(buildCaseworkerJurisdictionsResponse()),
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

  await page.route('**/data/case-types/Asylum/validate*', async (route) => {
    const requestBody = route.request().postDataJSON?.() as { data?: unknown } | undefined;
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: requestBody?.data ?? {},
        _links: {
          self: {
            href: route.request().url(),
          },
        },
      }),
    });
  });

  if (taskId && taskDetailsResponse) {
    await page.route(`**/workallocation/task/${taskId}`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(taskDetailsResponse),
      });
    });

    await page.route(`**/workallocation/task/${taskId}/roles`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(buildTaskRolesResponse()),
      });
    });
  }

  if (!submissionCapture) {
    return;
  }

  await page.route(`**/data/internal/cases/${caseId}/event-triggers/${eventId}/validate*`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(eventTriggerResponse),
    });
  });

  await page.route(`**/data/cases/${caseId}/events*`, async (route) => {
    submissionCapture.submittedEvents.push(route.request().postDataJSON?.() as Record<string, unknown>);
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(caseResponse),
    });
  });

  await page.route('**/workallocation/task/*/complete*', async (route) => {
    const taskId = new URL(route.request().url()).pathname.match(/\/workallocation\/task\/([^/]+)\/complete/)?.[1] ?? '';
    submissionCapture.completedTasks.push({
      taskId,
      body: route.request().postDataJSON?.() as Record<string, unknown> | undefined,
    });
    await route.fulfill({
      status: 204,
    });
  });
}
