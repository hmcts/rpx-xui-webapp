import { faker } from '@faker-js/faker';
import { expect, type Page, type Route } from '@playwright/test';

export type UiTaskAction = 'cancel' | 'complete' | 'go' | 'reassign' | 'unassign';
export type UnassignMode = 'unclaim' | 'assign-null';

export interface TaskActionMockOptions {
  taskId: string;
  task_name?: string;
  due_date?: string;
  dueDate?: string;
  minor_priority?: number;
  major_priority?: number;
  priority_date?: string;
  caseId: string;
  jurisdiction?: string;
  caseTypeId?: string;
  assigneeId?: string;
  newAssigneeId?: string;
  unassignMode?: UnassignMode;
  includeSubmitActionMock?: boolean;
}

export interface ExpectedApiCall {
  purpose: string;
  method: 'GET' | 'POST';
  urlPattern: string;
  expectedRequestJson?: unknown;
  responseStatus: number;
  responseJson: unknown;
}

export interface TaskActionExpectation {
  action: UiTaskAction;
  actionId: string;
  actionLabel: string;
  apiCalls: ExpectedApiCall[];
  notes?: string[];
}

export interface CapturedTaskSubmission {
  mode: 'unclaim' | 'assign-null';
  requestJson?: unknown;
  status: number;
  url: string;
}

export const expectValidUnassignSubmission = (submission: CapturedTaskSubmission) => {
  if (submission.mode === 'assign-null') {
    expect(submission.requestJson).toEqual({ userId: null });
    return;
  }

  expect(submission.requestJson).toEqual({ hasNoAssigneeOnComplete: false });
};

const DEFAULT_TASK_ID = 'f782bde3-8d51-11eb-a9a4-06d032acc76d';

const buildTaskDetailsResponse = (options: TaskActionMockOptions) => {
  const taskId = options.taskId ?? DEFAULT_TASK_ID;
  const caseId = options.caseId;
  const jurisdiction = options.jurisdiction ?? 'IA';
  const caseTypeId = options.caseTypeId ?? 'Asylum';
  const assigneeId = options.assigneeId ?? '10bac6bf-80a7-4c81-b2db-516aba826be6';

  return {
    task: {
      id: taskId,
      name: options.task_name ?? 'Review the appeal',
      type: 'reviewTheAppeal',
      task_state: 'assigned',
      task_system: 'SELF',
      security_classification: 'PUBLIC',
      task_title: options.task_name ?? 'Review the appeal',
      created_date: faker.date.past({ years: 0.25 }).toISOString(),
      due_date: options.due_date ?? faker.date.future({ years: 0.25 }).toISOString(),
      dueDate: options.dueDate ?? faker.date.future({ years: 0.25 }).toISOString(),
      minor_priority: options.minor_priority ?? 500,
      major_priority: options.major_priority ?? 1000,
      priority_date: options.priority_date ?? faker.date.future({ years: 0.25 }).toISOString(),
      assignee: assigneeId,
      auto_assigned: false,
      execution_type: 'Case Management Task',
      jurisdiction,
      region: '1',
      location: '765324',
      location_name: 'Taylor House',
      case_type_id: caseTypeId,
      case_id: caseId,
      case_category: 'Protection',
      case_name: 'Bob Smith',
      warnings: false,
      actions: [
        { id: 'cancel', title: 'Cancel task' },
        { id: 'complete', title: 'Mark as done' },
        { id: 'go', title: 'Go to task' },
        { id: 'reassign', title: 'Reassign task' },
        { id: 'unclaim', title: 'Unassign task' },
      ],
    },
  };
};

const buildTaskRolesResponse = () => [
  {
    role_category: 'LEGAL_OPERATIONS',
    role_name: 'tribunal-caseworker',
    permissions: ['Own', 'Execute', 'Read', 'Manage', 'Cancel'],
    authorisations: ['IAC', 'SSCS'],
  },
  {
    role_category: 'JUDICIAL',
    role_name: 'judge',
    permissions: ['Execute', 'Read'],
    authorisations: ['IAC'],
  },
];

const buildCaseworkerResponse = (assigneeId: string) => [
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

const buildCaseTasksResponse = (options: TaskActionMockOptions) => {
  const details = buildTaskDetailsResponse(options);
  return [details.task];
};

const buildActionExpectation = (action: UiTaskAction, options: TaskActionMockOptions): TaskActionExpectation => {
  const taskId = options.taskId;
  const caseId = options.caseId;
  const assigneeId = options.assigneeId ?? '10bac6bf-80a7-4c81-b2db-516aba826be6';
  const newAssigneeId = options.newAssigneeId ?? '004b7164-0943-41b5-95fc-39794af4a9fe';
  const unassignMode = options.unassignMode ?? 'unclaim';
  const includeSubmitActionMock = options.includeSubmitActionMock ?? true;

  const sharedResolvers: ExpectedApiCall[] = [
    {
      purpose: 'Task action route resolver: load selected task details',
      method: 'GET',
      urlPattern: `**/workallocation/task/${taskId}`,
      responseStatus: 200,
      responseJson: buildTaskDetailsResponse(options),
    },
    {
      purpose: 'Task action route resolver: load task roles',
      method: 'GET',
      urlPattern: `**/workallocation/task/${taskId}/roles`,
      responseStatus: 200,
      responseJson: buildTaskRolesResponse(),
    },
    {
      purpose: 'Task action route resolver: load caseworkers for task jurisdiction',
      method: 'POST',
      urlPattern: '**/workallocation/caseworker/getUsersByServiceName*',
      expectedRequestJson: { services: ['IA'] },
      responseStatus: 200,
      responseJson: buildCaseworkerResponse(assigneeId),
    },
  ];

  switch (action) {
    case 'cancel':
      return {
        action,
        actionId: 'action_cancel',
        actionLabel: 'Cancel task',
        apiCalls: [
          ...sharedResolvers,
          ...(includeSubmitActionMock
            ? [
                {
                  purpose: 'Submit cancel action',
                  method: 'POST' as const,
                  urlPattern: `**/workallocation/task/${taskId}/cancel*`,
                  expectedRequestJson: {},
                  responseStatus: 204,
                  responseJson: {},
                },
              ]
            : []),
        ],
      };

    case 'complete':
      return {
        action,
        actionId: 'action_complete',
        actionLabel: 'Mark as done',
        apiCalls: [
          ...sharedResolvers,
          ...(includeSubmitActionMock
            ? [
                {
                  purpose: 'Submit complete action',
                  method: 'POST' as const,
                  urlPattern: `**/workallocation/task/${taskId}/complete*`,
                  expectedRequestJson: { hasNoAssigneeOnComplete: false },
                  responseStatus: 204,
                  responseJson: {},
                },
              ]
            : []),
        ],
      };

    case 'reassign':
      return {
        action,
        actionId: 'action_reassign',
        actionLabel: 'Reassign task',
        apiCalls: [
          ...sharedResolvers,
          ...(includeSubmitActionMock
            ? [
                {
                  purpose: 'Submit reassign action (confirm screen)',
                  method: 'POST' as const,
                  urlPattern: `**/workallocation/task/${taskId}/assign*`,
                  expectedRequestJson: { userId: newAssigneeId },
                  responseStatus: 204,
                  responseJson: {},
                },
              ]
            : []),
        ],
      };

    case 'unassign':
      return {
        action,
        actionId: 'action_unclaim',
        actionLabel: 'Unassign task',
        apiCalls: [
          ...sharedResolvers,
          ...(includeSubmitActionMock
            ? [
                unassignMode === 'assign-null'
                  ? {
                      purpose: 'Manager unassign path (assign null user)',
                      method: 'POST' as const,
                      urlPattern: `**/workallocation/task/${taskId}/assign*`,
                      expectedRequestJson: { userId: null },
                      responseStatus: 204,
                      responseJson: {},
                    }
                  : {
                      purpose: 'Self-unassign path',
                      method: 'POST' as const,
                      urlPattern: `**/workallocation/task/${taskId}/unclaim*`,
                      expectedRequestJson: { hasNoAssigneeOnComplete: false },
                      responseStatus: 204,
                      responseJson: {},
                    },
              ]
            : []),
        ],
        notes:
          unassignMode === 'assign-null'
            ? ['`assign-null` mode represents manager unassign flow where UI posts to `/assign` with `{ userId: null }`.']
            : ['`unclaim` mode represents current assignee releasing their own task.'],
      };

    case 'go':
      return {
        action,
        actionId: 'action_go',
        actionLabel: 'Go to task',
        apiCalls: [
          {
            purpose: 'No task-action POST is fired; UI navigates directly to case details tasks tab',
            method: 'POST',
            urlPattern: `**/workallocation/case/task/${caseId}*`,
            expectedRequestJson: { refined: true },
            responseStatus: 200,
            responseJson: buildCaseTasksResponse(options),
          },
        ],
        notes: [
          'GO action is navigation-only in UI (`/cases/case-details/.../tasks`) and does not call `/workallocation/task/:taskId/:action`.',
        ],
      };

    default:
      return {
        action,
        actionId: 'action_unknown',
        actionLabel: 'Unknown action',
        apiCalls: [],
      };
  }
};

export const getTaskActionExpectation = (action: UiTaskAction, options: TaskActionMockOptions): TaskActionExpectation => {
  return buildActionExpectation(action, options);
};

export const setupTaskActionEndpointMocks = async (
  page: Page,
  action: UiTaskAction,
  options: TaskActionMockOptions
): Promise<TaskActionExpectation> => {
  const expectation = getTaskActionExpectation(action, options);

  for (const apiCall of expectation.apiCalls) {
    await page.route(apiCall.urlPattern, async (route) => {
      const request = route.request();
      if (request.method() !== apiCall.method) {
        await route.continue();
        return;
      }

      await route.fulfill({
        status: apiCall.responseStatus,
        contentType: 'application/json',
        body: JSON.stringify(apiCall.responseJson),
      });
    });
  }

  return expectation;
};

export const setupUnassignSubmissionCapture = async (
  page: Page,
  options: {
    taskId: string;
    status: number;
    responseJson?: unknown;
  }
): Promise<{ submissionPromise: Promise<CapturedTaskSubmission> }> => {
  const unclaimPattern = `**/workallocation/task/${options.taskId}/unclaim*`;
  const assignPattern = `**/workallocation/task/${options.taskId}/assign*`;
  let resolved = false;
  let resolveSubmission: (value: CapturedTaskSubmission) => void;

  const submissionPromise = new Promise<CapturedTaskSubmission>((resolve) => {
    resolveSubmission = resolve;
  });

  const captureSubmission = async (route: Route, mode: 'unclaim' | 'assign-null') => {
    const request = route.request();
    if (request.method() !== 'POST') {
      await route.continue();
      return;
    }

    let requestJson: unknown;
    try {
      requestJson = request.postDataJSON();
    } catch {
      requestJson = undefined;
    }

    if (!resolved) {
      resolved = true;
      resolveSubmission({
        mode,
        requestJson,
        status: options.status,
        url: request.url(),
      });
    }

    await route.fulfill({
      status: options.status,
      contentType: 'application/json',
      body: JSON.stringify(options.responseJson ?? {}),
    });
  };

  await page.route(unclaimPattern, async (route) => captureSubmission(route, 'unclaim'));
  await page.route(assignPattern, async (route) => captureSubmission(route, 'assign-null'));

  return { submissionPromise };
};

/**
 * Example usage in a Playwright test:
 *
 * const expectation = await setupTaskActionEndpointMocks(page, 'cancel', {
 *   taskId: 'f782bde3-8d51-11eb-a9a4-06d032acc76d',
 *   caseId: '1617708245335311',
 * });
 *
 * // expectation.apiCalls contains endpoint + expected JSON contract for assertions/logging.
 */
export const testTaskActionMockContract = async (
  page: Page,
  action: UiTaskAction,
  options: TaskActionMockOptions
): Promise<TaskActionExpectation> => {
  return setupTaskActionEndpointMocks(page, action, options);
};

export const singleUsersGetByRoleMockResponse = [
  {
    email: 'auto_test1@example.com',
    firstName: 'test',
    idamId: faker.string.uuid(),
    lastName: 'Legal Operations',
    location: {
      id: 231596,
      locationName: 'Birmingham',
      services: ['CIVIL', 'PUBLICLAW', 'PRIVATELAW', 'IA'],
    },
    roleCategory: 'LEGAL_OPERATIONS',
    service: 'IA',
  },
  {
    email: 'auto_test2@example.com',
    firstName: 'test',
    idamId: faker.string.uuid(),
    lastName: 'Judiciary',
    location: {
      id: 231596,
      locationName: 'Birmingham',
      services: ['CIVIL', 'PUBLICLAW', 'PRIVATELAW', 'IA'],
    },
    roleCategory: 'JUDICIARY',
    service: 'IA',
  },
];
