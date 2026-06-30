import type { Page } from '@playwright/test';
import { buildCaseEventTriggerMock } from '../../../mocks/caseEventTrigger.builder';
import { buildCaseDetailsTasksFromParams, buildCaseDetailsTasksMinimal } from '../../../mocks/caseDetailsTasks.builder';
import { buildAsylumCaseMock } from '../../../mocks/cases/asylumCase.mock';

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

const caseId = '1652161372854637';
const eventId = 'text';
const eventName = 'Test event';
const eventFieldId = 'TaskCompletionNote';
const eventFieldLabel = 'Completion note';
const taskId = '11111111-2222-4333-8444-555555555555';

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

export const taskEventCompletionTestData = {
  userIdentifier: 'STAFF_ADMIN',
  caseId,
  eventId,
  eventName,
  eventFieldId,
  eventFieldLabel,
  taskId,
  caseMockResponse: buildAsylumCaseMock({
    caseId,
    triggers: [{ id: eventId, name: eventName }],
  }),
  eventTriggerResponse: {
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
  },
};

export function buildTaskEventCompletionTaskResponses(assigneeId: string) {
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

  return { completableTasksResponse, visibleTasks };
}

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
      roleCategories: ['LEGAL_OPERATIONS'],
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
