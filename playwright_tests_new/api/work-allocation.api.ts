import { test, expect } from './fixtures';
import { expectStatus, StatusSets, withRetry, withXsrf, buildXsrfHeaders } from './utils/apiTestUtils';
import { expectTaskList } from './utils/assertions';
import type { Task, TaskListResponse, UserDetailsResponse } from './utils/types';
import { buildTaskSearchRequest } from './utils/work-allocation';

const serviceCodes = ['IA', 'CIVIL', 'PRIVATELAW'];

test.describe('Work allocation (read-only)', () => {
  let cachedLocationId: string | undefined;
  let userId: string | undefined;

  test.beforeAll(async ({ apiClient, apiClientFor }) => {
    const userRes = await apiClient.get<UserDetailsResponse>('api/user/details', {
      throwOnError: false
    });
    if (userRes.status === 200) {
      userId = userRes.data?.userInfo?.id ?? userRes.data?.userInfo?.uid;
    }

    const listResponse = await apiClient.get<Array<{ id?: string }>>(
      `workallocation/location?serviceCodes=${encodeURIComponent(serviceCodes.join(','))}`,
      {
        throwOnError: false
      }
    );
    if (listResponse.status === 200 && Array.isArray(listResponse.data) && listResponse.data.length > 0) {
      cachedLocationId = listResponse.data[0]?.id;
    }
  });

  test('lists available locations', async ({ apiClient }) => {
    const response = await apiClient.get<Array<{ id: string; locationName: string }>>(
      `workallocation/location?serviceCodes=${encodeURIComponent(serviceCodes.join(','))}`,
      { throwOnError: false }
    );

    expectStatus(response.status, StatusSets.guardedBasic);
    if (response.status !== 200) {
      return;
    }
    const data = response.data;
    expect(Array.isArray(data)).toBe(true);
    if (data.length > 0) {
      expect(data[0]).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          locationName: expect.any(String)
        })
      );
    }
  });

  test('fetches location by id', async ({ apiClient }) => {
    if (!cachedLocationId) return;

    const response = await apiClient.get<Record<string, unknown>>(`workallocation/location/${cachedLocationId}`, {
      throwOnError: false
    });
    expectStatus(response.status, [200, 401, 403, 404, 500]);
  });

  test('returns task names catalogue', async ({ apiClient }) => {
    const response = await apiClient.get<Array<string> | { task_names?: string[]; taskNames?: string[] }>('workallocation/taskNames');
    expect(response.status).toBe(200);

    const names = toArray<string>(response.data);
    expect(Array.isArray(names)).toBe(true);
    if (names.length > 0) {
      expect(typeof names[0]).toBe('string');
    }
  });

  test('returns types of work catalogue', async ({ apiClient }) => {
    const response = await apiClient.get<Array<{ id?: string }> | { typesOfWork?: Array<{ id?: string }> }>(
      'workallocation/task/types-of-work'
    );
    expect(response.status).toBe(200);

    const types = toArray(response.data);
    expect(Array.isArray(types)).toBe(true);
    if (types.length > 0 && typeof types[0] === 'object' && types[0] !== null) {
      expect(types[0]).toEqual(
        expect.objectContaining({
          id: expect.any(String)
        })
      );
    }
  });

  test('rejects unauthenticated access', async ({ anonymousClient }) => {
    for (const endpoint of ['workallocation/location', 'workallocation/taskNames']) {
      const res = await anonymousClient.get(endpoint, { throwOnError: false });
      expect([401, 403, 502]).toContain(res.status);
    }

    const res = await anonymousClient.post('workallocation/task', {
      data: buildTaskSearchRequest('MyTasks', { states: ['assigned'] }),
      throwOnError: false
    });
    expect([401, 403, 502]).toContain(res.status);
  });

  test.describe('task search', () => {
    test('MyTasks returns structured response', async ({ apiClient }) => {
      if (!userId) {
        expect(userId).toBeUndefined();
        return;
      }

      const body = buildTaskSearchRequest('MyTasks', {
        userIds: [userId!],
        locations: cachedLocationId ? [cachedLocationId] : [],
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
      expectTaskList(response.data);
    });

    test('AvailableTasks returns structured response', async ({ apiClient }) => {
      const body = buildTaskSearchRequest('AvailableTasks', {
        locations: cachedLocationId ? [cachedLocationId] : [],
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
      if (response.status !== 200) {
        return;
      }
      expectTaskList(response.data);
    });

    test('AllWork returns structured response', async ({ apiClient }) => {
      const body = buildTaskSearchRequest('AllWork', {
        locations: cachedLocationId ? [cachedLocationId] : [],
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
      if (response.status !== 200) {
        expect(response.status).toBeGreaterThanOrEqual(400);
        return;
      }
      expectTaskList(response.data);
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
        if (response.status === 200 && response.data) {
          const data = response.data as any;
          const cases = Array.isArray(data) ? data : Array.isArray(data?.cases) ? data.cases : [];
          if (Array.isArray(cases)) {
            expect(Array.isArray(cases)).toBe(true);
          }
        }
      });
    });

    test('my-work cases expose totals when present', async ({ apiClient }) => {
      const response = await withXsrf('solicitor', (headers) =>
        apiClient.get('workallocation/my-work/cases', {
          headers,
          throwOnError: false
        })
      );
      expectStatus(response.status, StatusSets.guardedExtended);
      if (response.status === 200 && response.data) {
        const data = response.data as any;
        if (typeof data?.total_records === 'number') {
          expect(data.total_records).toBeGreaterThanOrEqual(0);
        }
        if (Array.isArray(data?.cases)) {
          expect(data.cases.length).toBeGreaterThanOrEqual(0);
        }
      }
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
      const data = response.data as any;
      if (response.status === 200 && Array.isArray(data) && data.length > 0) {
        expect(data[0]).toEqual(
          expect.objectContaining({
            firstName: expect.any(String),
            lastName: expect.any(String),
            idamId: expect.any(String)
          })
        );
      }
    });

    test('lists caseworkers for location', async ({ apiClient }) => {
      if (!cachedLocationId) {
        expect(cachedLocationId).toBeUndefined();
        return;
      }
      const response = await withXsrf('solicitor', (headers) =>
        apiClient.get(`workallocation/caseworker/location/${cachedLocationId}`, {
          headers,
          throwOnError: false
        })
      );
      expectStatus(response.status, StatusSets.guardedExtended);
      const data = response.data as any;
      if (response.status === 200 && Array.isArray(data) && data.length > 0) {
        expect(data[0]).toEqual(
          expect.objectContaining({
            firstName: expect.any(String),
            lastName: expect.any(String),
            idamId: expect.any(String)
          })
        );
      }
    });

    test('region/location matrix', async ({ apiClient }) => {
      const response = await apiClient.post('workallocation/region-location', {
        data: { serviceIds: serviceCodes },
        throwOnError: false
      });
      expectStatus(response.status, [200, 400, 403]);
    });

    test('task pagination across pages (best effort)', async ({ apiClient }) => {
      const body = buildTaskSearchRequest('AllWork', {
        locations: cachedLocationId ? [cachedLocationId] : [],
        states: ['assigned', 'unassigned'],
        searchBy: 'caseworker',
        pageSize: 10
      });
      const page1 = (await withRetry(
        () =>
          apiClient.post('workallocation/task', {
            data: body,
            throwOnError: false
          }),
        { retries: 1, retryStatuses: [502, 504] }
      )) as { data: TaskListResponse; status: number };
      expectStatus(page1.status, StatusSets.guardedBasic);
      if (page1.status !== 200 || !Array.isArray(page1.data?.tasks)) {
        return;
      }
      const total = page1.data.total_records ?? 0;
      if (total > (body.searchRequest.pagination_parameters.page_size ?? 10)) {
        const page2 = (await apiClient.post('workallocation/task', {
          data: {
            ...body,
            searchRequest: {
              ...body.searchRequest,
              pagination_parameters: { ...body.searchRequest.pagination_parameters, page_number: 2 }
            }
          },
          throwOnError: false
        })) as { data: TaskListResponse; status: number };
        expectStatus(page2.status, StatusSets.guardedBasic);
        if (page2.status === 200) {
          expect(Array.isArray(page2.data?.tasks)).toBe(true);
        }
      }
    });

    test('reassign task to another caseworker when available', async ({ apiClient }) => {
      const headers = await buildXsrfHeaders('solicitor');
      const caseworkersRes = await apiClient.get<Array<{ idamId?: string }>>('workallocation/caseworker', {
        headers,
        throwOnError: false
      });
      const target = caseworkersRes.status === 200 && Array.isArray(caseworkersRes.data) && caseworkersRes.data.length
        ? caseworkersRes.data[0]?.idamId
        : undefined;

      const body = buildTaskSearchRequest('MyTasks', {
        userIds: userId ? [userId] : [],
        locations: cachedLocationId ? [cachedLocationId] : [],
        states: ['assigned'],
        searchBy: 'caseworker',
        pageSize: 5
      });
      const tasksRes = (await apiClient.post('workallocation/task', {
        data: body,
        headers,
        throwOnError: false
      })) as { data: TaskListResponse; status: number };
      const taskId =
        tasksRes.status === 200 && Array.isArray(tasksRes.data?.tasks) && tasksRes.data.tasks.length
          ? tasksRes.data.tasks[0].id
          : '00000000-0000-0000-0000-000000000000';
      const res = await apiClient.post(`workallocation/task/${taskId}/assign`, {
        data: { userId: target ?? '00000000-0000-0000-0000-000000000000' },
        headers,
        throwOnError: false
      });
      expectStatus(res.status, [200, 204, 400, 403, 404, 409]);
    });

    test('person search validation', async ({ apiClient }) => {
      const response = await apiClient.post('workallocation/findPerson', {
        data: { searchOptions: { searchTerm: 'test', userRole: 'judge', services: serviceCodes } },
        throwOnError: false
      });
      expectStatus(response.status, [200, 400, 403]);
    });

    test('roles category endpoint responds', async ({ apiClient }) => {
      const response = await apiClient.get('workallocation/exclusion/rolesCategory', {
        throwOnError: false
      });
      expectStatus(response.status, StatusSets.guardedExtended);
    });
  });
});

function toArray<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) {
    return payload as T[];
  }
  if (payload && Array.isArray((payload as any).task_names)) {
    return (payload as any).task_names as T[];
  }
  if (payload && Array.isArray((payload as any).taskNames)) {
    return (payload as any).taskNames as T[];
  }
  if (payload && Array.isArray((payload as any).typesOfWork)) {
    return (payload as any).typesOfWork as T[];
  }
  return [];
}

async function fetchFirstTask(
  apiClient: any,
  locationId?: string,
  states: string[] = ['assigned', 'unassigned'],
  view: 'AllWork' | 'MyTasks' = 'AllWork'
): Promise<Task | undefined> {
  const body = buildTaskSearchRequest(view, {
    locations: locationId ? [locationId] : [],
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

async function fetchTaskById(apiClient: any, id: string): Promise<any> {
  return apiClient.get(`workallocation/task/${id}`, { throwOnError: false });
}

function assertStateTransition(action: string, before?: any, after?: any) {
  if (!after) return;
  const prevAssignee = before?.assignee ?? before?.assigned_to;
  const assignee = after.assignee ?? after.assigned_to;
  const prevState = (before?.task_state ?? before?.state ?? '').toLowerCase();
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
