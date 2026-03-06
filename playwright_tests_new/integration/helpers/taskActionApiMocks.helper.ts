import type { Page } from '@playwright/test';

export type UiTaskAction = 'cancel' | 'complete' | 'go' | 'reassign' | 'unassign';
export type UnassignMode = 'unclaim' | 'assign-null';

export interface TaskActionMockOptions {
  taskId: string;
  caseId: string;
  jurisdiction?: string;
  caseTypeId?: string;
  assigneeId?: string;
  newAssigneeId?: string;
  unassignMode?: UnassignMode;
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
      name: 'Review the appeal',
      type: 'reviewTheAppeal',
      task_state: 'assigned',
      task_system: 'SELF',
      security_classification: 'PUBLIC',
      task_title: 'Review the appeal',
      created_date: '2021-06-30T16:53:10+0100',
      due_date: '2021-06-30T16:53:10+0100',
      dueDate: '2021-06-30T16:53:10+0100',
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
          {
            purpose: 'Submit cancel action',
            method: 'POST',
            urlPattern: `**/workallocation/task/${taskId}/cancel*`,
            expectedRequestJson: {},
            responseStatus: 204,
            responseJson: {},
          },
        ],
      };

    case 'complete':
      return {
        action,
        actionId: 'action_complete',
        actionLabel: 'Mark as done',
        apiCalls: [
          ...sharedResolvers,
          {
            purpose: 'Submit complete action',
            method: 'POST',
            urlPattern: `**/workallocation/task/${taskId}/complete*`,
            expectedRequestJson: { hasNoAssigneeOnComplete: false },
            responseStatus: 204,
            responseJson: {},
          },
        ],
      };

    case 'reassign':
      return {
        action,
        actionId: 'action_reassign',
        actionLabel: 'Reassign task',
        apiCalls: [
          ...sharedResolvers,
          {
            purpose: 'Submit reassign action (confirm screen)',
            method: 'POST',
            urlPattern: `**/workallocation/task/${taskId}/assign*`,
            expectedRequestJson: { userId: newAssigneeId },
            responseStatus: 204,
            responseJson: {},
          },
        ],
      };

    case 'unassign':
      return {
        action,
        actionId: 'action_unclaim',
        actionLabel: 'Unassign task',
        apiCalls: [
          ...sharedResolvers,
          unassignMode === 'assign-null'
            ? {
                purpose: 'Manager unassign path (assign null user)',
                method: 'POST',
                urlPattern: `**/workallocation/task/${taskId}/assign*`,
                expectedRequestJson: { userId: null },
                responseStatus: 204,
                responseJson: {},
              }
            : {
                purpose: 'Self-unassign path',
                method: 'POST',
                urlPattern: `**/workallocation/task/${taskId}/unclaim*`,
                expectedRequestJson: {},
                responseStatus: 204,
                responseJson: {},
              },
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
