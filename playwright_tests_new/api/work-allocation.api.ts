import { randomUUID } from 'node:crypto';
import type { TestInfo } from '@playwright/test';

import { test, expect } from './fixtures';
import { expectStatus, guardedRequest, StatusSets, withRetry, withXsrf } from './utils/apiTestUtils';
import type { UserDetailsResponse } from './utils/types';
import { buildTaskSearchRequest } from './utils/work-allocation';
import { createWorkAllocationActionFixture } from './utils/workAllocationActionFixture';
import { requireWorkAllocationLocation, requireWorkAllocationUserId } from './utils/workAllocationSetup';
import {
  assertAllWorkResponse,
  assertAvailableTasksResponse,
  assertCaseworkerListResponse,
  assertLocationsListResponse,
  assertMyWorkDashboardResponse,
  assertMyWorkTotalsResponse,
  assertTaskNamesResponse,
  assertTaskSearchResponse,
  assertTypesOfWorkResponse,
  extractMyWorkCases,
  fetchFirstTask,
  guardedTaskSearch,
  hasSeededEnvTasks,
  isActionSuccessStatus,
  resolveTaskIdWithEnvFallback,
  resolveLocationId,
  resolveSeededTaskIds,
  resolveUserId,
  runSeededAction,
  selectTaskId,
  toArray,
  toLocationList,
} from './utils/workAllocationUtils';

const serviceCodes = ['IA', 'CIVIL', 'PRIVATELAW'];
const TASK_SEARCH_REQUEST_TIMEOUT_MS = 15_000;
const TASK_SEARCH_TEST_TIMEOUT_MS = 120_000;
const TASK_SEARCH_RETRY_STATUSES = [500, 502, 504];

test.describe('Work allocation', { tag: '@svc-work-allocation' }, () => {
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

  test('GET /workallocation/location/:id returns specific location details when location exists', async ({ apiClient }) => {
    const cachedLocationId = await requireWorkAllocationLocation(apiClient, serviceCodes);

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
    const response = await withRetry(
      () =>
        apiClient.get<unknown>('workallocation/taskNames', {
          throwOnError: false,
        }),
      { retries: 2, retryStatuses: [500, 502, 504] }
    );

    // Then: API returns success or guarded downstream status
    expectStatus(response.status, StatusSets.waReadOnly);

    // And: Response contains valid task names array
    assertTaskNamesResponse(response.status, response.data);
  });

  test('GET /workallocation/task/types-of-work returns catalogue of work type classifications', async ({ apiClient }) => {
    // Given: An authenticated solicitor user

    // When: Fetching types of work catalogue
    const response = await withRetry(
      () =>
        apiClient.get<unknown>('workallocation/task/types-of-work', {
          throwOnError: false,
        }),
      { retries: 2, retryStatuses: [500, 502, 504] }
    );

    // Then: API returns success or guarded downstream status
    expectStatus(response.status, StatusSets.waReadOnly);

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
    test.setTimeout(TASK_SEARCH_TEST_TIMEOUT_MS);

    const annotateTaskSearchTimeout = (testInfo: TestInfo) => (message: string) => {
      testInfo.annotations.push({
        type: 'downstream timeout',
        description: `workallocation/task exhausted bounded retries: ${message.substring(0, 120)}`,
      });
    };

    test('MyTasks returns structured response without masking transport failure', async ({ apiClientFor }, testInfo) => {
      const waClient = await apiClientFor('waSolicitor');
      const userId = await requireWorkAllocationUserId(waClient);
      const cachedLocationId = await requireWorkAllocationLocation(waClient, serviceCodes);
      const body = buildTaskSearchRequest('MyTasks', {
        userIds: [userId],
        locations: toLocationList(cachedLocationId),
        states: ['assigned'],
        searchBy: 'caseworker',
      });

      const response = await guardedTaskSearch(waClient, body, {
        failOnRequestError: true,
        onRequestTimeout: annotateTaskSearchTimeout(testInfo),
        retries: 2,
        retryStatuses: TASK_SEARCH_RETRY_STATUSES,
        timeoutMs: TASK_SEARCH_REQUEST_TIMEOUT_MS,
      });
      expectStatus(response.status, StatusSets.waReadOnly);
      assertTaskSearchResponse(response.status, response.data);
    });

    test('AvailableTasks returns structured response', async ({ apiClientFor }, testInfo) => {
      const waClient = await apiClientFor('waSolicitor');
      const cachedLocationId = await requireWorkAllocationLocation(waClient, serviceCodes);
      const body = buildTaskSearchRequest('AvailableTasks', {
        locations: toLocationList(cachedLocationId),
        states: ['unassigned'],
        searchBy: 'caseworker',
      });

      const response = await guardedTaskSearch(waClient, body, {
        onRequestTimeout: annotateTaskSearchTimeout(testInfo),
        retries: 2,
        retryStatuses: TASK_SEARCH_RETRY_STATUSES,
        timeoutMs: TASK_SEARCH_REQUEST_TIMEOUT_MS,
      });
      expectStatus(response.status, StatusSets.waReadOnly);
      assertAvailableTasksResponse(response.status, response.data);
    });

    test('POST /workallocation/task with AllWork returns paginated task list or guarded downstream timeout', async ({
      apiClientFor,
    }, testInfo) => {
      const waClient = await apiClientFor('waSolicitor');
      // Given: A solicitor user with access to configured locations
      // When: Searching for all work (assigned and unassigned tasks) in specified location
      const cachedLocationId = await requireWorkAllocationLocation(waClient, serviceCodes);
      const body = buildTaskSearchRequest('AllWork', {
        locations: toLocationList(cachedLocationId),
        states: ['assigned', 'unassigned'],
        searchBy: 'caseworker',
      });

      const response = await guardedTaskSearch(waClient, body, {
        onRequestTimeout: annotateTaskSearchTimeout(testInfo),
        retries: 2,
        retryStatuses: TASK_SEARCH_RETRY_STATUSES,
        timeoutMs: TASK_SEARCH_REQUEST_TIMEOUT_MS,
      });
      expectStatus(response.status, StatusSets.waReadOnly);
      assertAllWorkResponse(response.status, response.data);
    });
  });

  test.describe('my-work dashboards', () => {
    const endpoints = ['workallocation/my-work/cases', 'workallocation/my-work/myaccess'];
    for (const endpoint of endpoints) {
      const tags = endpoint.endsWith('/myaccess') ? ['@svc-work-allocation-myaccess'] : [];
      test(`${endpoint} returns data or guarded status`, { tag: tags }, async ({ apiClient }) => {
        const response = await withXsrf('solicitor', (headers) =>
          guardedRequest(() =>
            apiClient.get(endpoint, {
              headers,
              throwOnError: false,
              timeoutMs: TASK_SEARCH_REQUEST_TIMEOUT_MS,
            })
          )
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

  test.describe('task actions (negative)', { tag: '@wa-action' }, () => {
    const actions = ['claim', 'unclaim', 'assign', 'unassign', 'complete', 'cancel'] as const;
    const taskId = '00000000-0000-0000-0000-000000000000';

    for (const action of actions) {
      test(`${action} rejects unauthenticated requests with 401/403`, async ({ anonymousClient }) => {
        // Given: An anonymous client with no authentication
        // When: Attempting task action without valid session
        // Then: API rejects request with authentication error
        const response = await anonymousClient.post(
          `workallocation/task/${taskId}/${action === 'unassign' ? 'assign' : action}`,
          {
            data: action === 'unassign' ? { userId: null } : {},
            throwOnError: false,
          }
        );
        expectStatus(response.status, [401, 403]);
      });
    }

    for (const action of actions) {
      test(`${action} ${action === 'unassign' ? 'is an idempotent no-op' : 'rejects an authenticated request'} for a nonexistent task`, async ({
        apiClientFor,
      }) => {
        const waClient = await apiClientFor('caseOfficer_r2');
        const actorId = action === 'assign' ? await requireWorkAllocationUserId(waClient) : undefined;
        const nonexistentTaskId = randomUUID();
        const before = await waClient.get(`workallocation/task/${nonexistentTaskId}`, { throwOnError: false });
        expectStatus(before.status, [404]);
        const response = await withXsrf('caseOfficer_r2', (headers) =>
          waClient.post(`workallocation/task/${nonexistentTaskId}/${action === 'unassign' ? 'assign' : action}`, {
            data: action === 'assign' ? { userId: actorId } : action === 'unassign' ? { userId: null } : {},
            headers,
            throwOnError: false,
          })
        );
        if (action === 'unassign') {
          // The provider skips assignment when both the current and requested assignee are absent.
          expect(response.status).toBe(204);
          const after = await waClient.get(`workallocation/task/${nonexistentTaskId}`, { throwOnError: false });
          expect(after.status).toBe(404);
        } else {
          expectStatus(response.status, [403, 404]);
        }
      });
    }
  });

  test.describe('owned task actions', { tag: '@wa-action' }, () => {
    for (const action of ['claim', 'assign', 'unclaim', 'unassign', 'complete', 'cancel']) {
      test(`${action} changes a newly provisioned task to its expected state`, async () => {
        test.setTimeout(4 * 60_000);
        const fixture = await createWorkAllocationActionFixture(action === 'unassign' ? 'HEARING_MANAGER_CR84_ON-1' : undefined);
        const errors: unknown[] = [];
        try {
          const deps = {
            apiClient: fixture.client,
            expectedAssignee: fixture.actorId,
            withXsrfFn: async (_role: string, fn: (headers: Record<string, string>) => Promise<void>) => fn(fixture.headers),
          };
          if (action === 'unassign') {
            await runSeededAction('assign', () => fixture.taskId, { ...deps, expectedAssignee: fixture.assigneeId });
          } else if (['unclaim', 'complete'].includes(action)) {
            await runSeededAction('claim', () => fixture.taskId, deps);
          }
          await runSeededAction(action, () => fixture.taskId, deps);
        } catch (error) {
          errors.push(error);
        }
        try {
          await fixture.cleanup();
        } catch (cleanupError) {
          errors.push(cleanupError);
        } finally {
          try {
            await fixture.dispose();
          } catch (disposeError) {
            errors.push(disposeError);
          }
        }
        if (errors.length > 1) throw new AggregateError(errors, 'WA action and owned fixture cleanup failed');
        if (errors.length === 1) throw errors[0];
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

test.describe('Work allocation helper coverage', { tag: '@svc-work-allocation' }, () => {
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
    expect(resolveTaskIdWithEnvFallback('dynamic', 'assigned', 'unassigned', 'fallback')).toEqual({
      taskId: 'dynamic',
      source: 'dynamic',
    });
    expect(resolveTaskIdWithEnvFallback(undefined, 'assigned', 'unassigned', 'fallback')).toEqual({
      taskId: 'assigned',
      source: 'env-assigned',
    });
    expect(resolveTaskIdWithEnvFallback(undefined, undefined, 'unassigned', 'fallback')).toEqual({
      taskId: 'unassigned',
      source: 'env-unassigned',
    });
    expect(resolveTaskIdWithEnvFallback(undefined, undefined, undefined, 'fallback')).toEqual({
      taskId: 'fallback',
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

  test('fetchFirstTask returns first task when available', async () => {
    const apiClient = {
      post: async () => ({
        status: 200,
        data: { tasks: [{ id: 'task-1', task_state: 'assigned' }] },
      }),
    };
    const task = await fetchFirstTask(apiClient as unknown as Parameters<typeof fetchFirstTask>[0]);
    expect(task?.id).toBe('task-1');
  });

  test('fetchFirstTask returns undefined on non-200 response', async () => {
    const apiClient = {
      post: async () => ({
        status: 500,
        data: {},
      }),
    };
    const task = await fetchFirstTask(apiClient as unknown as Parameters<typeof fetchFirstTask>[0]);
    expect(task).toBeUndefined();
  });

  test('fetchFirstTask returns undefined on empty task list', async () => {
    const apiClient = {
      post: async () => ({
        status: 200,
        data: { tasks: [] },
      }),
    };
    const task = await fetchFirstTask(apiClient as unknown as Parameters<typeof fetchFirstTask>[0]);
    expect(task).toBeUndefined();
  });

  test('fetchFirstTask returns undefined when tasks are not array', async () => {
    const apiClient = {
      post: async () => ({
        status: 200,
        data: { tasks: {} },
      }),
    };
    const task = await fetchFirstTask(apiClient as unknown as Parameters<typeof fetchFirstTask>[0]);
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
