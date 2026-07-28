import { expect, test } from '@playwright/test';
import {
  type TaskEventCompletionSubmissionCapture,
  setupTaskEventCompletionRoutes,
} from '../../integration/test/manageTasks/caseTaskList/taskEventCompletion.setup.js';

type RegisteredRoute = {
  pattern: string | RegExp;
  handler: (route: {
    fulfill: (payload: unknown) => Promise<void>;
    request: () => {
      postDataJSON?: () => Record<string, unknown>;
      url: () => string;
    };
  }) => Promise<void>;
};

function createFakePage() {
  const routes: RegisteredRoute[] = [];

  return {
    routes,
    async route(pattern: string | RegExp, handler: RegisteredRoute['handler']) {
      routes.push({ pattern, handler });
    },
  };
}

async function invokeRoute(route: RegisteredRoute, requestBody: Record<string, unknown> = {}, requestUrl = '') {
  const fulfillCalls: unknown[] = [];

  await route.handler({
    fulfill: async (payload: unknown) => {
      fulfillCalls.push(payload);
    },
    request: () => ({
      postDataJSON: () => requestBody,
      url: () => requestUrl,
    }),
  });

  return fulfillCalls;
}

test.describe('task event completion route setup helper', { tag: '@svc-internal' }, () => {
  test('registers the expected routes and fulfils them with the supplied payloads', async () => {
    const fakePage = createFakePage();
    const caseResponse = { caseId: '1234567890123456' };
    const eventTriggerResponse = { id: 'text', name: 'Test event' };
    const visibleTasks = [{ id: 'task-1', title: 'Task 1' }];
    const completableTasksResponse = { task_required_for_event: true, tasks: [] };

    await setupTaskEventCompletionRoutes(fakePage as never, {
      assigneeId: 'staff-admin-integration-user',
      caseId: '1234567890123456',
      caseResponse,
      completableTasksResponse,
      eventId: 'text',
      eventTriggerResponse,
      visibleTasks,
    });

    expect(fakePage.routes.map(({ pattern }) => pattern)).toEqual([
      '**/data/internal/cases/1234567890123456*',
      '**/data/internal/cases/1234567890123456/event-triggers/text*',
      '**/workallocation/caseworker/getUsersByServiceName*',
      '**/aggregated/caseworkers/**/jurisdictions*',
      '**/workallocation/case/task/1234567890123456*',
      '**/workallocation/case/tasks/1234567890123456/event/text/caseType/Asylum/jurisdiction/IA*',
      '**/data/case-types/Asylum/validate*',
    ]);

    const fulfilledBodies = await Promise.all(fakePage.routes.map((route) => invokeRoute(route)));

    expect(fulfilledBodies).toEqual([
      [
        {
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(caseResponse),
        },
      ],
      [
        {
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(eventTriggerResponse),
        },
      ],
      [
        {
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([
            {
              email: 'test@example.com',
              firstName: 'Test',
              idamId: 'staff-admin-integration-user',
              lastName: 'User',
              location: {
                id: 227101,
                locationName: 'Newport (South Wales) Immigration and Asylum Tribunal',
              },
              roleCategory: 'LEGAL_OPERATIONS',
              service: 'IA',
            },
          ]),
        },
      ],
      [
        {
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([
            {
              id: 'IA',
              name: 'Immigration and Asylum',
              caseTypes: [],
            },
          ]),
        },
      ],
      [
        {
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(visibleTasks),
        },
      ],
      [
        {
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(completableTasksResponse),
        },
      ],
      [
        {
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            data: {},
            _links: {
              self: {
                href: '',
              },
            },
          }),
        },
      ],
    ]);
  });

  test('optionally captures submitted event and task-completion calls', async () => {
    const fakePage = createFakePage();
    const caseResponse = { caseId: '1234567890123456' };
    const eventTriggerResponse = { id: 'text', name: 'Test event' };
    const capture: TaskEventCompletionSubmissionCapture = {
      completedTasks: [],
      submittedEvents: [],
    };

    await setupTaskEventCompletionRoutes(fakePage as never, {
      assigneeId: 'staff-admin-integration-user',
      caseId: '1234567890123456',
      caseResponse,
      completableTasksResponse: { task_required_for_event: true, tasks: [{ id: 'task-1' }] },
      eventId: 'text',
      eventTriggerResponse,
      submissionCapture: capture,
      taskDetailsResponse: { task: { id: 'task-1' } },
      taskId: 'task-1',
      visibleTasks: [{ id: 'task-1', title: 'Task 1' }],
    });

    expect(fakePage.routes.map(({ pattern }) => pattern)).toEqual([
      '**/data/internal/cases/1234567890123456*',
      '**/data/internal/cases/1234567890123456/event-triggers/text*',
      '**/workallocation/caseworker/getUsersByServiceName*',
      '**/aggregated/caseworkers/**/jurisdictions*',
      '**/workallocation/case/task/1234567890123456*',
      '**/workallocation/case/tasks/1234567890123456/event/text/caseType/Asylum/jurisdiction/IA*',
      '**/data/case-types/Asylum/validate*',
      '**/workallocation/task/task-1',
      '**/workallocation/task/task-1/roles',
      '**/data/internal/cases/1234567890123456/event-triggers/text/validate*',
      '**/data/cases/1234567890123456/events*',
      '**/workallocation/task/*/complete*',
    ]);

    await invokeRoute(fakePage.routes[10], { event: { id: 'text' } }, 'https://example.test/data/cases/1234567890123456/events');
    await invokeRoute(
      fakePage.routes[11],
      { actionByEvent: true, eventName: 'Test event' },
      'https://example.test/workallocation/task/task-1/complete'
    );

    expect(capture).toEqual({
      submittedEvents: [{ event: { id: 'text' } }],
      completedTasks: [
        {
          taskId: 'task-1',
          body: { actionByEvent: true, eventName: 'Test event' },
        },
      ],
    });
  });
});
