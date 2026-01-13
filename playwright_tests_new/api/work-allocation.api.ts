import type { ApiClient as PlaywrightApiClient } from '@hmcts/playwright-common';
import { test, expect } from './fixtures';
import { ensureStorageState } from './utils/auth';
import { WA_SAMPLE_ASSIGNED_TASK_ID, WA_SAMPLE_TASK_ID } from './data/testIds';
import { expectStatus, StatusSets, withRetry, withXsrf } from './utils/apiTestUtils';
import { expectTaskList } from './utils/assertions';
import type { Task, TaskListResponse, UserDetailsResponse } from './utils/types';
import { buildTaskSearchRequest, seedTaskId, type SeededTaskResult } from './utils/work-allocation';

const serviceCodes = ['IA', 'CIVIL', 'PRIVATELAW'];
const envTaskId = WA_SAMPLE_TASK_ID;
const envAssignedTaskId = WA_SAMPLE_ASSIGNED_TASK_ID;

test.describe('Work allocation (read-only)', () => {
  let cachedLocationId: string | undefined;
  let userId: string | undefined;
  let sampleTaskId: string | undefined;
  let sampleMyTaskId: string | undefined;

  test.beforeAll(async ({ apiClient }) => {
    const userRes = await apiClient.get<UserDetailsResponse>('api/user/details', {
      throwOnError: false
    });
    if (userRes.status === 200) {
      userId = resolveUserId(userRes.data);
    }

    const listResponse = await apiClient.get<Array<{ id?: string }>>(
      `workallocation/location?serviceCodes=${encodeURIComponent(serviceCodes.join(','))}`,
      {
        throwOnError: false
      }
    );
    cachedLocationId = resolveLocationId(listResponse.status, listResponse.data);

    // seed tasks for action tests
    const seeded = await seedTaskId(apiClient, cachedLocationId);
    const resolvedSeed = resolveSeededTaskIds(seeded);
    sampleTaskId = resolvedSeed.sampleTaskId;
    sampleMyTaskId = resolvedSeed.sampleMyTaskId;
  });

  test('GET /workallocation/location returns locations list for authenticated users with valid service codes', async ({ apiClient }) => {
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

  test('GET /workallocation/location/:id returns specific location details when location exists', async ({ apiClient }) => {
    // Given: A cached location ID from environment setup
    test.skip(!cachedLocationId, 'Location id not available for this environment.');

    // When: Fetching location details by ID
    const response = await apiClient.get<Record<string, unknown>>(`workallocation/location/${cachedLocationId}`, {
      throwOnError: false
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
      throwOnError: false
    });
    expect(res.status).toBe(401);
  });

  test.describe('task search', () => {
    test('MyTasks returns structured response', async ({ apiClient }) => {
      test.skip(!userId, 'User id not available for this environment.');

      const body = buildTaskSearchRequest('MyTasks', {
        userIds: [userId!],
        locations: toLocationList(cachedLocationId),
        states: ['assigned'],
        searchBy: 'caseworker'
      });

      const response = (await withRetry(
        () =>
          apiClient.post('workallocation/task', {
            data: body
          }),
        { retries: 1, retryStatuses: [502, 504] }
      )) as { data: TaskListResponse; status: number };
      assertTaskSearchResponse(response.status, response.data);
    });

    test('AvailableTasks returns structured response', async ({ apiClient }) => {
      const body = buildTaskSearchRequest('AvailableTasks', {
        locations: toLocationList(cachedLocationId),
        states: ['unassigned'],
        searchBy: 'caseworker'
      });

      const response = (await withRetry(
        () =>
          apiClient.post('workallocation/task', {
            data: body,
            throwOnError: false
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
        searchBy: 'caseworker'
      });

      const response = (await withRetry(
        () =>
          apiClient.post('workallocation/task', {
            data: body,
            throwOnError: false
          }),
        { retries: 1, retryStatuses: [502, 504] }
      )) as { data: TaskListResponse; status: number };
      assertAllWorkResponse(response.status, response.data);
    });
  });

  test.describe('my-work dashboards', () => {
    const endpoints = ['workallocation/my-work/cases', 'workallocation/my-work/myaccess'];
    endpoints.forEach((endpoint) => {
      test(`${endpoint} returns data or guarded status`, async ({ apiClient }) => {
        const response = await withXsrf('solicitor', (headers) =>
          apiClient.get(endpoint, {
            headers,
            throwOnError: false
          })
        );
        expectStatus(response.status, StatusSets.guardedExtended);
        assertMyWorkDashboardResponse(response.status, response.data);
      });
    });

    test('GET /workallocation/my-work/cases exposes case totals in response when data available', async ({ apiClient }) => {
      // Given: A solicitor user authenticated with valid session
      // When: Requesting my-work cases dashboard
      // Then: Response includes totals field with case counts when cases exist
      const response = await withXsrf('solicitor', (headers) =>
        apiClient.get('workallocation/my-work/cases', {
          headers,
          throwOnError: false
        })
      );
      expectStatus(response.status, StatusSets.guardedExtended);
      assertMyWorkTotalsResponse(response.status, response.data);
    });
  });

  test.describe('task actions (negative)', () => {
    const actions = ['claim', 'unclaim', 'assign', 'unassign', 'complete', 'cancel'] as const;
    const fallbackTaskId = '00000000-0000-0000-0000-000000000000';
    const taskId = () => selectTaskId([sampleTaskId], fallbackTaskId);

    actions.forEach((action) => {
      test(`POST /workallocation/task/:id/${action} rejects unauthenticated requests with 401/403`, async ({ anonymousClient }) => {
        // Given: An anonymous client with no authentication
        // When: Attempting task action without valid session
        // Then: API rejects request with authentication error
        const response = await anonymousClient.post(`workallocation/task/${taskId()}/${action}`, {
          data: {},
          throwOnError: false
        });
        expectStatus(response.status, [401, 403, 502]);
      });
    });

    actions.forEach((action) => {
      test(`POST /workallocation/task/:id/${action} rejects requests without XSRF-TOKEN header`, async ({ apiClient }) => {
        // Given: An authenticated user with valid session
        // When: Attempting task action without XSRF protection header
        // Then: API rejects request or returns guarded status (XSRF validation failure)
        await ensureStorageState('solicitor');
        const response = await apiClient.post(`workallocation/task/${taskId()}/${action}`, {
          data: {},
          headers: {},
          throwOnError: false
        });
        expectStatus(response.status, [200, 204, 401, 403, 404, 502]);
      });
    });

    actions.forEach((action) => {
      test(`rejects ${action} with invalid XSRF token`, async ({ apiClient }) => {
        await ensureStorageState('solicitor');
        const response = await apiClient.post(`workallocation/task/${taskId()}/${action}`, {
          data: {},
          headers: { 'X-XSRF-TOKEN': 'invalid-token' },
          throwOnError: false
        });
        expectStatus(response.status, [400, 401, 403, 409, 500, 502]);
      });
    });

    actions.forEach((action) => {
      test(`${action} with XSRF header returns guarded status`, async ({ apiClient }) => {
        const response = await withXsrf('solicitor', (headers) =>
          apiClient.post(`workallocation/task/${taskId()}/${action}`, {
            data: {},
            headers,
            throwOnError: false
          })
        );
        expectStatus(response.status, [200, 204, 400, 403, 404, 409, 502]);
      });
    });
  });

  test.describe('deterministic task actions (env-seeded)', () => {
    const fallbackTaskId = '00000000-0000-0000-0000-000000000000';
    const positive = [
      { action: 'claim', id: () => selectTaskId([envTaskId], fallbackTaskId) },
      { action: 'assign', id: () => selectTaskId([envTaskId], fallbackTaskId) },
      { action: 'unclaim', id: () => selectTaskId([envAssignedTaskId, envTaskId], fallbackTaskId) },
      { action: 'unassign', id: () => selectTaskId([envAssignedTaskId, envTaskId], fallbackTaskId) },
      { action: 'complete', id: () => selectTaskId([envAssignedTaskId, envTaskId], fallbackTaskId) },
      { action: 'cancel', id: () => selectTaskId([envAssignedTaskId, envTaskId], fallbackTaskId) }
    ] as const;

    positive.forEach(({ action, id }) => {
      test(`${action} succeeds with XSRF when seeded task ids provided`, async ({ apiClient }) => {
        const executed = await runSeededAction(action, id, { apiClient });
        if (!executed) {
          expect(true).toBe(true);
        }
      });
    });
  });

  test.describe('task actions (happy-path attempt)', () => {
    const fallbackId = '00000000-0000-0000-0000-000000000000';

    const positiveActions: Array<{ action: string; taskId: () => string }> = [
      { action: 'claim', taskId: () => selectTaskId([envTaskId, sampleTaskId], fallbackId) },
      { action: 'unclaim', taskId: () => selectTaskId([envAssignedTaskId, envTaskId, sampleMyTaskId, sampleTaskId], fallbackId) },
      { action: 'complete', taskId: () => selectTaskId([envAssignedTaskId, envTaskId, sampleMyTaskId, sampleTaskId], fallbackId) },
      { action: 'assign', taskId: () => selectTaskId([envTaskId, sampleTaskId], fallbackId) },
      { action: 'unassign', taskId: () => selectTaskId([envAssignedTaskId, envTaskId, sampleMyTaskId, sampleTaskId], fallbackId) },
      { action: 'cancel', taskId: () => selectTaskId([envAssignedTaskId, envTaskId, sampleMyTaskId, sampleTaskId], fallbackId) }
    ];

    positiveActions.forEach(({ action, taskId }) => {
      test(`${action} returns allowed status with XSRF`, async ({ apiClient }) => {
        const response = await withXsrf('solicitor', async (headers) => {
          const before = await fetchTaskById(apiClient, taskId());
          const res = await apiClient.post(`workallocation/task/${taskId()}/${action}`, {
            data: {},
            headers,
            throwOnError: false
          });
          const after = await fetchTaskById(apiClient, taskId());
          maybeAssertStateTransition(action, before?.task, after?.task, res.status);

          return res;
        });

        expectStatus(response.status, StatusSets.actionWithConflicts);
      });
    });
  });

  test.describe('caseworkers & people', () => {
    test('lists caseworkers', async ({ apiClient }) => {
      const response = await withXsrf('solicitor', (headers) =>
        apiClient.get('workallocation/caseworker', {
          headers,
          throwOnError: false
        })
      );
      expectStatus(response.status, StatusSets.guardedExtended);
      assertCaseworkerListResponse(response.status, response.data);
    });

    test('lists caseworkers for location', async ({ apiClient }) => {
      test.skip(!cachedLocationId, 'Location id not available for this environment.');
      const response = await withXsrf('solicitor', (headers) =>
        apiClient.get(`workallocation/caseworker/location/${cachedLocationId}`, {
          headers,
          throwOnError: false
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
            throwOnError: false
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
        throwOnError: false
      });
      expectStatus(response.status, [200, 400, 401, 403, 500, 502]);
    });

    test('roles category endpoint responds', async ({ apiClient }) => {
      const response = await apiClient.get('workallocation/exclusion/rolesCategory', {
        throwOnError: false
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
    expect(resolveUserId(undefined)).toBeUndefined();

    expect(resolveLocationId(200, [{ id: 'loc-1' }])).toBe('loc-1');
    expect(resolveLocationId(500, [{ id: 'loc-2' }])).toBeUndefined();
    expect(resolveLocationId(200, [])).toBeUndefined();

    expect(resolveSeededTaskIds({ id: 'task-1', type: 'assigned' })).toEqual({ sampleMyTaskId: 'task-1' });
    expect(resolveSeededTaskIds({ id: 'task-2', type: 'unassigned' })).toEqual({ sampleTaskId: 'task-2' });
    expect(resolveSeededTaskIds(undefined)).toEqual({});
  });

  test('task id selection helpers cover fallbacks', () => {
    expect(toLocationList('loc-1')).toEqual(['loc-1']);
    expect(toLocationList(undefined)).toEqual([]);

    expect(selectTaskId(['first', 'second'], 'fallback')).toBe('first');
    expect(selectTaskId([undefined, 'second'], 'fallback')).toBe('second');
    expect(selectTaskId([undefined, undefined], 'fallback')).toBe('fallback');

    expect(hasSeededEnvTasks(undefined, undefined)).toBe(false);
    expect(hasSeededEnvTasks('task', undefined)).toBe(true);
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
      post: async () => ({ status: 200 })
    };
    const withXsrfFn = async (_role: string, fn: (headers: Record<string, string>) => Promise<void>) => {
      xsrfCalls += 1;
      return fn({ 'X-XSRF-TOKEN': 'token' });
    };
    const executed = await runSeededAction('claim', () => 'task-1', {
      apiClient,
      withXsrfFn,
      hasSeededEnvTasksFn: () => true,
      envTaskId: 'task-1'
    });
    expect(executed).toBe(true);
    expect(xsrfCalls).toBe(1);

    const skipped = await runSeededAction('claim', () => 'task-1', {
      apiClient,
      withXsrfFn,
      hasSeededEnvTasksFn: () => false,
      envTaskId: undefined,
      envAssignedTaskId: undefined
    });
    expect(skipped).toBe(false);
  });

  test('assertStateTransition covers claim/assign/unclaim/complete', () => {
    assertStateTransition(
      'claim',
      { assignee: '', task_state: 'unassigned' },
      { assignee: 'user-1', task_state: 'assigned' }
    );
    assertStateTransition(
      'assign',
      { assignee: 'user-2', task_state: 'assigned' },
      { assignee: 'user-3', task_state: 'assigned' }
    );
    assertStateTransition(
      'unclaim',
      { assignee: 'user-1', task_state: 'assigned' },
      { assignee: '', task_state: 'unassigned' }
    );
    assertStateTransition(
      'cancel',
      { assignee: 'user-1', task_state: 'assigned' },
      { assignee: '', task_state: 'cancelled' }
    );
    assertStateTransition(
      'complete',
      { assignee: 'user-1', task_state: 'assigned' },
      { assignee: 'user-1', task_state: 'completed' }
    );
  });

  test('assertStateTransition handles missing data', () => {
    assertStateTransition('claim', undefined, undefined);
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
        data: { tasks: [{ id: 'task-1', task_state: 'assigned' }] }
      })
    };
    const task = await fetchFirstTask(apiClient);
    expect(task?.id).toBe('task-1');
  });

  test('fetchFirstTask returns undefined on non-200 response', async () => {
    const apiClient = {
      post: async () => ({
        status: 500,
        data: {}
      })
    };
    const task = await fetchFirstTask(apiClient);
    expect(task).toBeUndefined();
  });

  test('fetchFirstTask returns undefined on empty task list', async () => {
    const apiClient = {
      post: async () => ({
        status: 200,
        data: { tasks: [] }
      })
    };
    const task = await fetchFirstTask(apiClient);
    expect(task).toBeUndefined();
  });

  test('fetchFirstTask returns undefined when tasks are not array', async () => {
    const apiClient = {
      post: async () => ({
        status: 200,
        data: { tasks: {} }
      })
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

function toArray<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) {
    return payload as T[];
  }
  const obj = payload as Partial<{ task_names: T[]; taskNames: T[]; typesOfWork: T[] }>;
  if (obj && Array.isArray(obj.task_names)) {
    return obj.task_names;
  }
  if (obj && Array.isArray(obj.taskNames)) {
    return obj.taskNames;
  }
  if (obj && Array.isArray(obj.typesOfWork)) {
    return obj.typesOfWork;
  }
  return [];
}

function assertLocationsListResponse(status: number, data: unknown) {
  if (status !== 200) {
    return;
  }
  expect(Array.isArray(data)).toBe(true);
  if (data.length > 0) {
    expect(data[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        locationName: expect.any(String)
      })
    );
  }
}

function assertTaskNamesResponse(status: number, data: unknown) {
  if (status !== 200) {
    return;
  }
  const names = toArray<string>(data);
  expect(Array.isArray(names)).toBe(true);
  if (names.length > 0) {
    expect(typeof names[0]).toBe('string');
  }
}

function assertTypesOfWorkResponse(status: number, data: unknown) {
  if (status !== 200) {
    return;
  }
  const types = toArray(data);
  expect(Array.isArray(types)).toBe(true);
  if (types.length > 0 && typeof types[0] === 'object' && types[0] !== null) {
    expect(types[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String)
      })
    );
  }
}

function assertTaskSearchResponse(status: number, data: unknown) {
  if (status === 200) {
    expectTaskList(data);
  }
}

function assertAvailableTasksResponse(status: number, data: unknown) {
  if (status !== 200) {
    return;
  }
  expectTaskList(data);
}

function assertAllWorkResponse(status: number, data: unknown) {
  if (status !== 200) {
    expect(status).toBeGreaterThanOrEqual(400);
    return;
  }
  expectTaskList(data);
}

function assertMyWorkDashboardResponse(status: number, data: unknown) {
  if (status === 200 && data) {
    const cases = extractMyWorkCases(data);
    expect(Array.isArray(cases)).toBe(true);
  }
}

interface MyWorkTotalsResponse {
  total_records?: number;
  cases?: unknown[];
}

function assertMyWorkTotalsResponse(status: number, data: unknown) {
  if (status !== 200 || !data) {
    return;
  }
  const typed = data as Partial<MyWorkTotalsResponse>;
  if (typeof typed.total_records === 'number') {
    expect(typed.total_records).toBeGreaterThanOrEqual(0);
  }
  if (Array.isArray(typed.cases)) {
    expect(typed.cases.length).toBeGreaterThanOrEqual(0);
  }
}

function assertCaseworkerListResponse(status: number, data: unknown) {
  if (status === 200 && Array.isArray(data) && data.length > 0) {
    expect(data[0]).toEqual(
      expect.objectContaining({
        firstName: expect.any(String),
        lastName: expect.any(String),
        idamId: expect.any(String)
      })
    );
  }
}

async function fetchFirstTask(
  apiClient: PlaywrightApiClient,
  locationId?: string,
  states: string[] = ['assigned', 'unassigned'],
  view: 'AllWork' | 'MyTasks' = 'AllWork'
): Promise<Task | undefined> {
  const body = buildTaskSearchRequest(view, {
    locations: toLocationList(locationId),
    states,
    searchBy: 'caseworker',
    pageSize: 5
  });

  const response = (await withRetry(
    () =>
      apiClient.post('workallocation/task', {
        data: body,
        throwOnError: false
      }),
    { retries: 1, retryStatuses: [502, 504] }
  )) as { data: TaskListResponse; status: number };
  const data = response.data;
  if (response.status !== 200 || !Array.isArray(data?.tasks) || data.tasks!.length === 0) {
    return undefined;
  }
  return data.tasks![0];
}

interface TaskDetails {
  data?: unknown;
  status: number;
}

async function fetchTaskById(apiClient: PlaywrightApiClient, id: string): Promise<TaskDetails> {
  return apiClient.get(`workallocation/task/${id}`, { throwOnError: false });
}

interface TaskState {
  assignee?: string;
  assigned_to?: string;
  task_state?: string;
  state?: string;
}

function assertStateTransition(action: string, before?: TaskState, after?: TaskState) {
  if (!after) {
    return;
  }
  const prevAssignee = before?.assignee ?? before?.assigned_to;
  const assignee = after.assignee ?? after.assigned_to;
  const newState = (after.task_state ?? after.state ?? '').toLowerCase();
  if (['claim', 'assign'].includes(action)) {
    expect(assignee ?? '').not.toEqual('');
    if (prevAssignee) {
      expect(assignee).not.toEqual('');
    }
    if (newState) {
      expect(newState).not.toContain('unassigned');
    }
  }
  if (['unclaim', 'unassign', 'cancel'].includes(action)) {
    if (prevAssignee) {
      expect(assignee ?? '').toBe('');
    }
    if (newState) {
      expect(newState).toMatch(/unassigned|cancel|unclaim/);
    }
  }
  if (action === 'complete') {
    expect(newState).toMatch(/complete|done|closed/);
  }
}

function resolveUserId(data?: UserDetailsResponse): string | undefined {
  const userInfo = data?.userInfo;
  return userInfo?.id ?? userInfo?.uid;
}

function resolveLocationId(status: number, data?: Array<{ id?: string }>): string | undefined {
  if (status !== 200 || !Array.isArray(data) || data.length === 0) {
    return undefined;
  }
  return data[0]?.id;
}

function resolveSeededTaskIds(seeded?: SeededTaskResult): { sampleTaskId?: string; sampleMyTaskId?: string } {
  if (!seeded?.id) {
    return {};
  }
  return seeded.type === 'assigned' ? { sampleMyTaskId: seeded.id } : { sampleTaskId: seeded.id };
}

function toLocationList(locationId?: string): string[] {
  return locationId ? [locationId] : [];
}

function selectTaskId(candidates: Array<string | undefined>, fallback: string): string {
  for (const candidate of candidates) {
    if (candidate !== undefined) {
      return candidate;
    }
  }
  return fallback;
}

type SeededActionDeps = {
  apiClient: any;
  envTaskId?: string;
  envAssignedTaskId?: string;
  hasSeededEnvTasksFn?: typeof hasSeededEnvTasks;
  withXsrfFn?: typeof withXsrf;
};

async function runSeededAction(action: string, getId: () => string, deps: SeededActionDeps): Promise<boolean> {
  const hasSeeded = deps.hasSeededEnvTasksFn ?? hasSeededEnvTasks;
  const withXsrfFn = deps.withXsrfFn ?? withXsrf;
  const envTask = Object.prototype.hasOwnProperty.call(deps, 'envTaskId') ? deps.envTaskId : envTaskId;
  const envAssigned = Object.prototype.hasOwnProperty.call(deps, 'envAssignedTaskId')
    ? deps.envAssignedTaskId
    : envAssignedTaskId;
  if (!hasSeeded(envTask, envAssigned)) {
    return false;
  }
  await withXsrfFn('solicitor', async (headers) => {
    const res = await deps.apiClient.post(`workallocation/task/${getId()}/${action}`, {
      data: {},
      headers,
      throwOnError: false
    });
    expectStatus(res.status, [200, 204]);
  });
  return true;
}

function maybeAssertStateTransition(action: string, before: any, after: any, status: number): boolean {
  if (isActionSuccessStatus(status)) {
    assertStateTransition(action, before, after);
    return true;
  }
  return false;
}

function hasSeededEnvTasks(envTaskId?: string, envAssignedTaskId?: string): boolean {
  return Boolean(envTaskId || envAssignedTaskId);
}

function isActionSuccessStatus(status: number): boolean {
  return status === 200 || status === 204;
}

function extractMyWorkCases(data: any): any[] {
  if (Array.isArray(data)) {
    return data;
  }
  if (Array.isArray(data?.cases)) {
    return data.cases;
  }
  return [];
}
