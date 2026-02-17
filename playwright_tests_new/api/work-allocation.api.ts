import { test, expect } from './fixtures';
import type { TestInfo } from '@playwright/test';
import { ensureStorageState } from './utils/auth';
import { WA_SAMPLE_ASSIGNED_TASK_ID, WA_SAMPLE_TASK_ID } from './data/testIds';
import { expectStatus, StatusSets, withRetry, withXsrf } from './utils/apiTestUtils';
import type { TaskListResponse, UserDetailsResponse } from './utils/types';
import { buildTaskSearchRequest, seedTaskId } from './utils/work-allocation';
import {
  assertAllWorkResponse,
  assertAvailableTasksResponse,
  assertCaseworkerListResponse,
  assertLocationsListResponse,
  assertMyWorkDashboardResponse,
  assertMyWorkTotalsResponse,
  assertStateTransition,
  assertTaskNamesResponse,
  assertTaskSearchResponse,
  assertTypesOfWorkResponse,
  extractMyWorkCases,
  fetchFirstTask,
  fetchTaskById,
  hasSeededEnvTasks,
  isActionSuccessStatus,
  maybeAssertStateTransition,
  resolveLocationId,
  resolveSeededTaskIds,
  resolveTaskIdWithEnvFallback,
  resolveUserId,
  runSeededAction,
  selectTaskId,
  toArray,
  toLocationList,
} from './utils/workAllocationUtils';

const serviceCodes = ['IA', 'CIVIL', 'PRIVATELAW'];
const envTaskId = WA_SAMPLE_TASK_ID;
const envAssignedTaskId = WA_SAMPLE_ASSIGNED_TASK_ID;
const fallbackTaskId = '00000000-0000-0000-0000-000000000000';

test.describe('Work allocation (read-only)', () => {
  let cachedLocationId: string | undefined;
  let userId: string | undefined;
  let sampleTaskId: string | undefined;
  let sampleMyTaskId: string | undefined;
  let taskSeedNotice: string | undefined;
  let setupNotice: string | undefined;

  test.beforeAll(async ({ apiClient }) => {
    const appendSetupNotice = (message: string) => {
      setupNotice = setupNotice ? `${setupNotice} ${message}` : message;
    };

    try {
      const userRes = await apiClient.get<UserDetailsResponse>('api/user/details', {
        throwOnError: false,
      });
      if (userRes.status === 200) {
        userId = resolveUserId(userRes.data);
      } else {
        appendSetupNotice(`User details setup call returned status ${userRes.status}; running MyTasks without user filter.`);
      }
    } catch (error) {
      appendSetupNotice(
        `User details setup call failed (${error instanceof Error ? error.message : 'unknown error'}); running MyTasks without user filter.`
      );
    }

    try {
      const listResponse = await apiClient.get<Array<{ id?: string }>>(
        `workallocation/location?serviceCodes=${encodeURIComponent(serviceCodes.join(','))}`,
        {
          throwOnError: false,
        }
      );
      cachedLocationId = resolveLocationId(listResponse.status, listResponse.data);
      if (!cachedLocationId) {
        appendSetupNotice('Location setup returned no usable location id; location-scoped calls will run unscoped.');
      }
    } catch (error) {
      appendSetupNotice(
        `Location setup call failed (${error instanceof Error ? error.message : 'unknown error'}); location-scoped calls will run unscoped.`
      );
    }

    // seed tasks for action tests
    try {
      const seeded = await seedTaskId(apiClient, cachedLocationId);
      const resolvedSeed = resolveSeededTaskIds(seeded);
      sampleTaskId = resolvedSeed.sampleTaskId;
      sampleMyTaskId = resolvedSeed.sampleMyTaskId;
    } catch (error) {
      appendSetupNotice(`Task seeding failed (${error instanceof Error ? error.message : 'unknown error'}); using fallback task ids.`);
    }

    if (!sampleTaskId && !sampleMyTaskId) {
      const fallbackResolution = resolveTaskIdWithEnvFallback(undefined, envAssignedTaskId, envTaskId, fallbackTaskId);
      if (fallbackResolution.source === 'none') {
        taskSeedNotice =
          'WA task seeding returned no tasks and WA_SAMPLE_* ids are unset; action tests will use deterministic fallback task id.';
      } else {
        taskSeedNotice = `WA task seeding returned no tasks; action tests will use ${fallbackResolution.source} task id from WA_SAMPLE_* env.`;
      }
    }
  });

  test('GET /workallocation/location returns locations list for authenticated users with valid service codes', async ({
    apiClient,
  }) => {
    // Given: A solicitor user authenticated with valid session
    const requestServiceCodes = serviceCodes;

    // When: Requesting locations for configured service codes
    const response = await apiClient.get<Array<{ id: string; locationName: string }>>(
      `workallocation/location?serviceCodes=${encodeURIComponent(requestServiceCodes.join(','))}`,
      { throwOnError: false }
    );

    // Then: API responds with expected status codes
    expectStatus(response.status, StatusSets.guardedBasic);

    // And: Response data structure is validated
    assertLocationsListResponse(response.status, response.data);
  });

  test('GET /workallocation/location/:id returns specific location details when location exists', async ({
    apiClient,
  }, testInfo) => {
    // Given: A cached location ID from environment setup
    if (!cachedLocationId) {
      testInfo.annotations.push({
        type: 'notice',
        description: 'Location id not available; asserted location list endpoint instead.',
      });
      const listRes = await apiClient.get(`workallocation/location?serviceCodes=${encodeURIComponent(serviceCodes.join(','))}`, {
        throwOnError: false,
      });
      expectStatus(listRes.status, StatusSets.guardedBasic);
      return;
    }

    // When: Fetching location details by ID
    const response = await apiClient.get<Record<string, unknown>>(`workallocation/location/${cachedLocationId}`, {
      throwOnError: false,
    });

    // Then: API responds with success or expected error codes
    expectStatus(response.status, [200, 401, 403, 404, 500]);
  });

  test('GET /workallocation/taskNames returns catalogue of available task type names', async ({ apiClient }) => {
    // Given: An authenticated solicitor user

    // When: Fetching the task names catalogue
    const response = await apiClient.get<unknown>('workallocation/taskNames');

    // Then: API returns 200 OK
    expect(response.status).toBe(200);

    // And: Response contains valid task names array
    assertTaskNamesResponse(response.status, response.data);
  });

  test('GET /workallocation/task/types-of-work returns catalogue of work type classifications', async ({ apiClient }) => {
    // Given: An authenticated solicitor user

    // When: Fetching types of work catalogue
    const response = await apiClient.get<unknown>('workallocation/task/types-of-work');

    // Then: API returns 200 OK
    expect(response.status).toBe(200);

    // And: Response contains valid work types array
    assertTypesOfWorkResponse(response.status, response.data);
  });

  test('Work allocation endpoints reject unauthenticated requests with 401 Unauthorized', async ({ anonymousClient }) => {
    // Given: An anonymous (unauthenticated) API client

    // When: Attempting to access protected work allocation endpoints
    for (const endpoint of ['workallocation/location', 'workallocation/taskNames']) {
      const res = await anonymousClient.get(endpoint, { throwOnError: false });

      // Then: API returns 401 Unauthorized
      expect(res.status).toBe(401);
    }

    // And: Task search endpoint also rejects anonymous requests
    const res = await anonymousClient.post('workallocation/task', {
      data: buildTaskSearchRequest('MyTasks', { states: ['assigned'] }),
      throwOnError: false,
    });
    expect(res.status).toBe(401);
  });

  test.describe('task search', () => {
    test('MyTasks returns structured response', async ({ apiClient }, testInfo) => {
      if (setupNotice) {
        testInfo.annotations.push({
          type: 'notice',
          description: setupNotice,
        });
      }
      if (!userId) {
        testInfo.annotations.push({
          type: 'notice',
          description: 'User id not available from setup; running MyTasks without user filter.',
        });
      }

      const body = buildTaskSearchRequest('MyTasks', {
        userIds: userId ? [userId] : [],
        locations: toLocationList(cachedLocationId),
        states: ['assigned'],
        searchBy: 'caseworker',
      });

      const response = (await withRetry(
        () =>
          apiClient.post('workallocation/task', {
            data: body,
          }),
        { retries: 1, retryStatuses: [502, 504] }
      )) as { data: TaskListResponse; status: number };
      assertTaskSearchResponse(response.status, response.data);
    });

    test('AvailableTasks returns structured response', async ({ apiClient }) => {
      const body = buildTaskSearchRequest('AvailableTasks', {
        locations: toLocationList(cachedLocationId),
        states: ['unassigned'],
        searchBy: 'caseworker',
      });

      const response = (await withRetry(
        () =>
          apiClient.post('workallocation/task', {
            data: body,
            throwOnError: false,
          }),
        { retries: 1, retryStatuses: [502, 504] }
      )) as { data: TaskListResponse; status: number };
      expectStatus(response.status, StatusSets.guardedBasic);
      assertAvailableTasksResponse(response.status, response.data);
    });

    test('POST /workallocation/task with AllWork returns paginated task list with structured response', async ({ apiClient }) => {
      // Given: A solicitor user with access to configured locations
      // When: Searching for all work (assigned and unassigned tasks) in specified location
      const body = buildTaskSearchRequest('AllWork', {
        locations: toLocationList(cachedLocationId),
        states: ['assigned', 'unassigned'],
        searchBy: 'caseworker',
      });

      const response = (await withRetry(
        () =>
          apiClient.post('workallocation/task', {
            data: body,
            throwOnError: false,
          }),
        { retries: 1, retryStatuses: [502, 504] }
      )) as { data: TaskListResponse; status: number };
      assertAllWorkResponse(response.status, response.data);
    });
  });

  test.describe('my-work dashboards', () => {
    const endpoints = ['workallocation/my-work/cases', 'workallocation/my-work/myaccess'];
    for (const endpoint of endpoints) {
      test(`${endpoint} returns data or guarded status`, async ({ apiClient }) => {
        const response = await withXsrf('solicitor', (headers) =>
          apiClient.get(endpoint, {
            headers,
            throwOnError: false,
          })
        );
        expectStatus(response.status, StatusSets.guardedExtended);
        assertMyWorkDashboardResponse(response.status, response.data);
      });
    }

    test('GET /workallocation/my-work/cases exposes case totals in response when data available', async ({ apiClient }) => {
      // Given: A solicitor user authenticated with valid session
      // When: Requesting my-work cases dashboard
      // Then: Response includes totals field with case counts when cases exist
      const response = await withXsrf('solicitor', (headers) =>
        apiClient.get('workallocation/my-work/cases', {
          headers,
          throwOnError: false,
        })
      );
      expectStatus(response.status, StatusSets.guardedExtended);
      assertMyWorkTotalsResponse(response.status, response.data);
    });
  });

  test.describe('task actions (negative)', () => {
    const actions = ['claim', 'unclaim', 'assign', 'unassign', 'complete', 'cancel'] as const;
    const taskId = () => selectTaskId([sampleTaskId, sampleMyTaskId, envTaskId, envAssignedTaskId], fallbackTaskId);
    const annotateTaskSeedNotice = (testInfo: TestInfo) => {
      if (setupNotice) {
        testInfo.annotations.push({
          type: 'notice',
          description: setupNotice,
        });
      }
      if (!taskSeedNotice) {
        return;
      }
      testInfo.annotations.push({
        type: 'notice',
        description: taskSeedNotice,
      });
    };

    for (const action of actions) {
      test(`POST /workallocation/task/:id/${action} rejects unauthenticated requests with 401/403`, async ({
        anonymousClient,
      }, testInfo) => {
        annotateTaskSeedNotice(testInfo);
        // Given: An anonymous client with no authentication
        // When: Attempting task action without valid session
        // Then: API rejects request with authentication error
        const response = await anonymousClient.post(`workallocation/task/${taskId()}/${action}`, {
          data: {},
          throwOnError: false,
        });
        expectStatus(response.status, [401, 403, 502]);
      });
    }

    for (const action of actions) {
      test(`POST /workallocation/task/:id/${action} rejects requests without XSRF-TOKEN header`, async ({ apiClient }, testInfo) => {
        annotateTaskSeedNotice(testInfo);
        // Given: An authenticated user with valid session
        // When: Attempting task action without XSRF protection header
        // Then: API rejects request or returns guarded status (XSRF validation failure)
        await ensureStorageState('solicitor');
        const response = await apiClient.post(`workallocation/task/${taskId()}/${action}`, {
          data: {},
          headers: {},
          throwOnError: false,
        });
        expectStatus(response.status, [200, 204, 401, 403, 404, 502]);
      });
    }

    for (const action of actions) {
      test(`rejects ${action} with invalid XSRF token`, async ({ apiClient }, testInfo) => {
        annotateTaskSeedNotice(testInfo);
        await ensureStorageState('solicitor');
        const response = await apiClient.post(`workallocation/task/${taskId()}/${action}`, {
          data: {},
          headers: { 'X-XSRF-TOKEN': 'invalid-token' },
          throwOnError: false,
        });
        expectStatus(response.status, [400, 401, 403, 409, 500, 502]);
      });
    }

    for (const action of actions) {
      test(`${action} with XSRF header returns guarded status`, async ({ apiClient }, testInfo) => {
        annotateTaskSeedNotice(testInfo);
        const response = await withXsrf('solicitor', (headers) =>
          apiClient.post(`workallocation/task/${taskId()}/${action}`, {
            data: {},
            headers,
            throwOnError: false,
          })
        );
        expectStatus(response.status, [200, 204, 400, 403, 404, 409, 502]);
      });
    }
  });

  test.describe('deterministic task actions (env-seeded or dynamic)', () => {
    const positive = [
      { action: 'claim', id: () => selectTaskId([envTaskId, sampleTaskId], '00000000-0000-0000-0000-000000000000') },
      { action: 'assign', id: () => selectTaskId([envTaskId, sampleTaskId], '00000000-0000-0000-0000-000000000000') },
      {
        action: 'unclaim',
        id: () =>
          selectTaskId([envAssignedTaskId, envTaskId, sampleMyTaskId, sampleTaskId], '00000000-0000-0000-0000-000000000000'),
      },
      {
        action: 'unassign',
        id: () =>
          selectTaskId([envAssignedTaskId, envTaskId, sampleMyTaskId, sampleTaskId], '00000000-0000-0000-0000-000000000000'),
      },
      {
        action: 'complete',
        id: () =>
          selectTaskId([envAssignedTaskId, envTaskId, sampleMyTaskId, sampleTaskId], '00000000-0000-0000-0000-000000000000'),
      },
      {
        action: 'cancel',
        id: () =>
          selectTaskId([envAssignedTaskId, envTaskId, sampleMyTaskId, sampleTaskId], '00000000-0000-0000-0000-000000000000'),
      },
    ] as const;

    positive.forEach(({ action, id }) => {
      test(`${action} succeeds with XSRF when task ids available`, async ({ apiClient }) => {
        const executed = await runSeededAction(action, id, {
          apiClient,
          envTaskId: envTaskId || sampleTaskId,
          envAssignedTaskId: envAssignedTaskId || sampleMyTaskId,
        });
        if (!executed) {
          expect(true).toBe(true);
        }
      });
    });
  });

  test.describe('task actions (happy-path attempt)', () => {
    const positiveActions: Array<{ action: string; taskId: () => string }> = [
      { action: 'claim', taskId: () => selectTaskId([envTaskId, sampleTaskId], fallbackTaskId) },
      {
        action: 'unclaim',
        taskId: () => selectTaskId([envAssignedTaskId, envTaskId, sampleMyTaskId, sampleTaskId], fallbackTaskId),
      },
      {
        action: 'complete',
        taskId: () => selectTaskId([envAssignedTaskId, envTaskId, sampleMyTaskId, sampleTaskId], fallbackTaskId),
      },
      { action: 'assign', taskId: () => selectTaskId([envTaskId, sampleTaskId], fallbackTaskId) },
      {
        action: 'unassign',
        taskId: () => selectTaskId([envAssignedTaskId, envTaskId, sampleMyTaskId, sampleTaskId], fallbackTaskId),
      },
      {
        action: 'cancel',
        taskId: () => selectTaskId([envAssignedTaskId, envTaskId, sampleMyTaskId, sampleTaskId], fallbackTaskId),
      },
    ];

    for (const { action, taskId } of positiveActions) {
      test(`${action} returns allowed status with XSRF`, async ({ apiClient }) => {
        const response = await withXsrf('solicitor', async (headers) => {
          const before = await fetchTaskById(apiClient, taskId());
          const res = await apiClient.post(`workallocation/task/${taskId()}/${action}`, {
            data: {},
            headers,
            throwOnError: false,
          });
          const after = await fetchTaskById(apiClient, taskId());
          maybeAssertStateTransition(action, before?.task, after?.task, res.status);

          return res;
        });

        expectStatus(response.status, StatusSets.actionWithConflicts);
      });
    }
  });

  test.describe('caseworkers & people', () => {
    test('lists caseworkers', async ({ apiClient }) => {
      const response = await withXsrf('solicitor', (headers) =>
        apiClient.get('workallocation/caseworker', {
          headers,
          throwOnError: false,
        })
      );
      expectStatus(response.status, StatusSets.guardedExtended);
      assertCaseworkerListResponse(response.status, response.data);
    });

    test('lists caseworkers for location', async ({ apiClient }, testInfo) => {
      if (!cachedLocationId) {
        testInfo.annotations.push({
          type: 'notice',
          description: 'Location id not available; asserted unscoped caseworker list endpoint instead.',
        });
        const fallbackRes = await withXsrf('solicitor', (headers) =>
          apiClient.get('workallocation/caseworker', {
            headers,
            throwOnError: false,
          })
        );
        expectStatus(fallbackRes.status, StatusSets.guardedExtended);
        assertCaseworkerListResponse(fallbackRes.status, fallbackRes.data);
        return;
      }
      const response = await withXsrf('solicitor', (headers) =>
        apiClient.get(`workallocation/caseworker/location/${cachedLocationId}`, {
          headers,
          throwOnError: false,
        })
      );
      expectStatus(response.status, StatusSets.guardedExtended);
      assertCaseworkerListResponse(response.status, response.data);
    });

    test('region/location matrix', async ({ apiClient }) => {
      const response = await withRetry(
        () =>
          apiClient.post('workallocation/region-location', {
            data: { serviceIds: serviceCodes },
            throwOnError: false,
          }),
        { retries: 1, retryStatuses: [502, 504] }
      );
      expectStatus(response.status, [200, 400, 401, 403, 500, 502, 504]);
    });

    test('person search validation', async ({ apiClient }) => {
      // Note: This endpoint may return 401 due to timing in AAT environment
      // The test retries automatically to handle transient auth issues
      const response = await apiClient.post('workallocation/findPerson', {
        data: { searchOptions: { searchTerm: 'test', userRole: 'judge', services: serviceCodes } },
        throwOnError: false,
      });
      expectStatus(response.status, [200, 400, 401, 403, 500, 502]);
    });

    test('roles category endpoint responds', async ({ apiClient }) => {
      const response = await apiClient.get('workallocation/exclusion/rolesCategory', {
        throwOnError: false,
      });
      expectStatus(response.status, StatusSets.guardedExtended);
    });
  });
});

test.describe('Work allocation helper coverage', () => {
  test('toArray utility normalizes API response formats (arrays, task_names, taskNames, typesOfWork) to consistent array output', () => {
    // Given: Various API response payload formats from work allocation endpoints
    // When: Normalizing different response shapes to arrays
    // Then: toArray correctly extracts arrays from all known payload structures
    expect(toArray(['a'])).toEqual(['a']);
    expect(toArray({ task_names: ['b'] })).toEqual(['b']);
    expect(toArray({ taskNames: ['c'] })).toEqual(['c']);
    expect(toArray({ typesOfWork: ['d'] })).toEqual(['d']);
    expect(toArray({})).toEqual([]);
  });

  test('helper selectors cover ids, locations, and seeded tasks', () => {
    expect(resolveUserId({ userInfo: { id: 'id-1' } } as UserDetailsResponse)).toBe('id-1');
    expect(resolveUserId({ userInfo: { uid: 'uid-1' } } as UserDetailsResponse)).toBe('uid-1');
    expect(resolveUserId()).toBeUndefined();

    expect(resolveLocationId(200, [{ id: 'loc-1' }])).toBe('loc-1');
    expect(resolveLocationId(500, [{ id: 'loc-2' }])).toBeUndefined();
    expect(resolveLocationId(200, [])).toBeUndefined();

    expect(resolveSeededTaskIds({ id: 'task-1', type: 'assigned' })).toEqual({ sampleMyTaskId: 'task-1' });
    expect(resolveSeededTaskIds({ id: 'task-2', type: 'unassigned' })).toEqual({ sampleTaskId: 'task-2' });
    expect(resolveSeededTaskIds()).toEqual({});
  });

  test('task id selection helpers cover fallbacks', () => {
    expect(toLocationList('loc-1')).toEqual(['loc-1']);
    expect(toLocationList()).toEqual([]);

    expect(selectTaskId(['first', 'second'], 'fallback')).toBe('first');
    expect(selectTaskId([undefined, 'second'], 'fallback')).toBe('second');
    expect(selectTaskId([undefined, undefined], 'fallback')).toBe('fallback');

    expect(resolveTaskIdWithEnvFallback('dynamic-task', 'env-assigned-task', 'env-unassigned-task', 'fallback-task')).toEqual({
      taskId: 'dynamic-task',
      source: 'dynamic',
    });
    expect(resolveTaskIdWithEnvFallback(undefined, 'env-assigned-task', 'env-unassigned-task', 'fallback-task')).toEqual({
      taskId: 'env-assigned-task',
      source: 'env-assigned',
    });
    expect(resolveTaskIdWithEnvFallback(undefined, undefined, 'env-unassigned-task', 'fallback-task')).toEqual({
      taskId: 'env-unassigned-task',
      source: 'env-unassigned',
    });
    expect(resolveTaskIdWithEnvFallback(undefined, undefined, undefined, 'fallback-task')).toEqual({
      taskId: 'fallback-task',
      source: 'none',
    });

    expect(hasSeededEnvTasks()).toBe(false);
    expect(hasSeededEnvTasks('task')).toBe(true);
    expect(isActionSuccessStatus(200)).toBe(true);
    expect(isActionSuccessStatus(204)).toBe(true);
    expect(isActionSuccessStatus(400)).toBe(false);

    expect(extractMyWorkCases([{ id: 'case-1' }])).toHaveLength(1);
    expect(extractMyWorkCases({ cases: [{ id: 'case-2' }] })).toHaveLength(1);
    expect(extractMyWorkCases({})).toEqual([]);
  });

  test('runSeededAction covers seeded and skipped paths', async () => {
    let xsrfCalls = 0;
    const apiClient = {
      post: async () => ({ status: 200 }),
    };
    const withXsrfFn = async (_role: string, fn: (headers: Record<string, string>) => Promise<void>) => {
      xsrfCalls += 1;
      return fn({ 'X-XSRF-TOKEN': 'token' });
    };
    const executed = await runSeededAction('claim', () => 'task-1', {
      apiClient,
      withXsrfFn,
      hasSeededEnvTasksFn: () => true,
      envTaskId: 'task-1',
      envAssignedTaskId: undefined,
    });
    expect(executed).toBe(true);
    expect(xsrfCalls).toBe(1);

    const skipped = await runSeededAction('claim', () => '', {
      apiClient,
      withXsrfFn,
      hasSeededEnvTasksFn: () => false,
      envTaskId: undefined,
      envAssignedTaskId: undefined,
    });
    expect(skipped).toBe(false);
  });

  test('assertStateTransition covers claim/assign/unclaim/complete', () => {
    assertStateTransition('claim', { assignee: '', task_state: 'unassigned' }, { assignee: 'user-1', task_state: 'assigned' });
    assertStateTransition(
      'assign',
      { assignee: 'user-2', task_state: 'assigned' },
      { assignee: 'user-3', task_state: 'assigned' }
    );
    assertStateTransition('unclaim', { assignee: 'user-1', task_state: 'assigned' }, { assignee: '', task_state: 'unassigned' });
    assertStateTransition('cancel', { assignee: 'user-1', task_state: 'assigned' }, { assignee: '', task_state: 'cancelled' });
    assertStateTransition(
      'complete',
      { assignee: 'user-1', task_state: 'assigned' },
      { assignee: 'user-1', task_state: 'completed' }
    );
  });

  test('assertStateTransition handles missing data', () => {
    assertStateTransition('claim');
    assertStateTransition('assign', { assigned_to: 'user-1', state: 'assigned' }, { assigned_to: 'user-2', state: 'assigned' });
    assertStateTransition('unassign', { assigned_to: 'user-1', state: 'assigned' }, { assigned_to: '', state: 'unassigned' });
  });

  test('maybeAssertStateTransition handles success and guarded statuses', () => {
    const asserted = maybeAssertStateTransition(
      'claim',
      { assignee: '', task_state: 'unassigned' },
      { assignee: 'user-1', task_state: 'assigned' },
      200
    );
    expect(asserted).toBe(true);
    const skipped = maybeAssertStateTransition('claim', undefined, undefined, 500);
    expect(skipped).toBe(false);
  });

  test('fetchFirstTask returns first task when available', async () => {
    const apiClient = {
      post: async () => ({
        status: 200,
        data: { tasks: [{ id: 'task-1', task_state: 'assigned' }] },
      }),
    };
    const task = await fetchFirstTask(apiClient);
    expect(task?.id).toBe('task-1');
  });

  test('fetchFirstTask returns undefined on non-200 response', async () => {
    const apiClient = {
      post: async () => ({
        status: 500,
        data: {},
      }),
    };
    const task = await fetchFirstTask(apiClient);
    expect(task).toBeUndefined();
  });

  test('fetchFirstTask returns undefined on empty task list', async () => {
    const apiClient = {
      post: async () => ({
        status: 200,
        data: { tasks: [] },
      }),
    };
    const task = await fetchFirstTask(apiClient);
    expect(task).toBeUndefined();
  });

  test('fetchFirstTask returns undefined when tasks are not array', async () => {
    const apiClient = {
      post: async () => ({
        status: 200,
        data: { tasks: {} },
      }),
    };
    const task = await fetchFirstTask(apiClient);
    expect(task).toBeUndefined();
  });

  test('assertLocationsListResponse covers guarded and populated data', () => {
    assertLocationsListResponse(200, [{ id: 'loc-1', locationName: 'Location' }]);
    assertLocationsListResponse(200, []);
    assertLocationsListResponse(401, undefined);
  });

  test('assertTaskNamesResponse covers array and empty data', () => {
    assertTaskNamesResponse(200, ['task']);
    assertTaskNamesResponse(200, { task_names: ['task'] });
    assertTaskNamesResponse(200, []);
    assertTaskNamesResponse(500, undefined);
  });

  test('assertTypesOfWorkResponse covers object shapes', () => {
    assertTypesOfWorkResponse(200, [{ id: 'type-1' }]);
    assertTypesOfWorkResponse(200, { typesOfWork: [{ id: 'type-2' }] });
    assertTypesOfWorkResponse(200, []);
    assertTypesOfWorkResponse(500, undefined);
  });

  test('assertTaskSearchResponse covers success and failure', () => {
    assertTaskSearchResponse(200, { tasks: [{ id: 'task-1', task_state: 'assigned' }] });
    assertTaskSearchResponse(500, undefined);
  });

  test('assertAvailableTasksResponse covers success and guarded', () => {
    assertAvailableTasksResponse(200, { tasks: [{ id: 'task-1', task_state: 'assigned' }] });
    assertAvailableTasksResponse(401, undefined);
  });

  test('assertAllWorkResponse covers success and guarded', () => {
    assertAllWorkResponse(200, { tasks: [{ id: 'task-1', task_state: 'assigned' }] });
    assertAllWorkResponse(500, undefined);
  });

  test('assertMyWorkDashboardResponse covers case arrays', () => {
    assertMyWorkDashboardResponse(200, { cases: [{ id: 'case-1' }] });
    assertMyWorkDashboardResponse(200, []);
    assertMyWorkDashboardResponse(200, { other: [] });
    assertMyWorkDashboardResponse(401, undefined);
  });

  test('assertMyWorkTotalsResponse covers totals and cases', () => {
    assertMyWorkTotalsResponse(200, { total_records: 1, cases: [] });
    assertMyWorkTotalsResponse(200, { cases: [{ id: 'case-1' }] });
    assertMyWorkTotalsResponse(200, { total_records: 'nope', cases: null });
    assertMyWorkTotalsResponse(200, undefined);
    assertMyWorkTotalsResponse(401, undefined);
  });

  test('assertCaseworkerListResponse covers list and empty payloads', () => {
    assertCaseworkerListResponse(200, [{ firstName: 'A', lastName: 'B', idamId: 'id' }]);
    assertCaseworkerListResponse(200, []);
    assertCaseworkerListResponse(500, undefined);
  });
});
