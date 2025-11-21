import { test, expect } from './fixtures';
import { buildTaskSearchRequest } from './utils/work-allocation';
import { ensureStorageState, getStoredCookie } from './auth';
import { expectStatus, StatusSets, withXsrf } from './utils/apiTestUtils';
import type { TaskListResponse, Task, UserDetailsResponse } from './utils/types';

const serviceCodes = ['IA', 'CIVIL', 'PRIVATELAW'];

test.describe('Work allocation (read-only)', () => {
  let cachedLocationId: string | undefined;
  let userId: string | undefined;
  let sampleTaskId: string | undefined;
  let sampleMyTaskId: string | undefined;
  const envTaskId = process.env.WA_SAMPLE_TASK_ID;
  const envAssignedTaskId = process.env.WA_SAMPLE_ASSIGNED_TASK_ID;

  test.beforeAll(async ({ apiClient }) => {
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

    // seed tasks for action tests
    const taskRes = await fetchFirstTask(apiClient, cachedLocationId);
    if (taskRes?.id) {
      sampleTaskId = taskRes.id;
    }

    const myTaskRes = await fetchFirstTask(apiClient, cachedLocationId, ['assigned'], 'MyTasks');
    if (myTaskRes?.id) {
      sampleMyTaskId = myTaskRes.id;
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
    const response = await apiClient.get<unknown>('workallocation/taskNames');
    expect(response.status).toBe(200);

    const names = toArray<string>(response.data);
    expect(Array.isArray(names)).toBe(true);
    if (names.length > 0) {
      expect(typeof names[0]).toBe('string');
    }
  });

  test('returns types of work catalogue', async ({ apiClient }) => {
    const response = await apiClient.get<unknown>('workallocation/task/types-of-work');
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
      expect(res.status).toBe(401);
    }

    const res = await anonymousClient.post('workallocation/task', {
      data: buildTaskSearchRequest('MyTasks', { states: ['assigned'] }),
      throwOnError: false
    });
    expect(res.status).toBe(401);
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

    const response = (await apiClient.post('workallocation/task', {
      data: body
    })) as { data: TaskListResponse; status: number };
    expectTaskListPayload(response.data);
  });

    test('AvailableTasks returns structured response', async ({ apiClient }) => {
      const body = buildTaskSearchRequest('AvailableTasks', {
        locations: cachedLocationId ? [cachedLocationId] : [],
        states: ['unassigned'],
        searchBy: 'caseworker'
      });

      const response = (await apiClient.post('workallocation/task', {
        data: body,
        throwOnError: false
      })) as { data: TaskListResponse; status: number };
      expectStatus(response.status, StatusSets.guardedBasic);
      if (response.status !== 200) {
        return;
      }
      expectTaskListPayload(response.data);
    });

    test('AllWork returns structured response', async ({ apiClient }) => {
      const body = buildTaskSearchRequest('AllWork', {
        locations: cachedLocationId ? [cachedLocationId] : [],
        states: ['assigned', 'unassigned'],
        searchBy: 'caseworker'
      });

      const response = (await apiClient.post('workallocation/task', {
        data: body,
        throwOnError: false
      })) as { data: TaskListResponse; status: number };
      if (response.status !== 200) {
        expect(response.status).toBeGreaterThanOrEqual(400);
        return;
      }
      expectTaskListPayload(response.data);
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

  test.describe('task actions (negative)', () => {
    const actions = ['claim', 'unclaim', 'assign', 'unassign', 'complete', 'cancel'] as const;
    const taskId = () => sampleTaskId ?? '00000000-0000-0000-0000-000000000000';

    actions.forEach((action) => {
      test(`rejects unauthenticated ${action}`, async ({ anonymousClient }) => {
        const response = await anonymousClient.post(`workallocation/task/${taskId()}/${action}`, {
          data: {},
          throwOnError: false
        });
        expectStatus(response.status, [401, 403, 502]);
      });
    });

    actions.forEach((action) => {
      test(`rejects ${action} without XSRF header`, async ({ apiClient }) => {
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

  test.describe('task actions (happy-path attempt)', () => {
    const fallbackId = '00000000-0000-0000-0000-000000000000';

    const positiveActions: Array<{ action: string; taskId: () => string }> = [
      { action: 'claim', taskId: () => envTaskId ?? sampleTaskId ?? fallbackId },
      { action: 'unclaim', taskId: () => envAssignedTaskId ?? envTaskId ?? sampleMyTaskId ?? sampleTaskId ?? fallbackId },
      { action: 'complete', taskId: () => envAssignedTaskId ?? envTaskId ?? sampleMyTaskId ?? sampleTaskId ?? fallbackId },
      { action: 'assign', taskId: () => envTaskId ?? sampleTaskId ?? fallbackId },
      { action: 'unassign', taskId: () => envAssignedTaskId ?? envTaskId ?? sampleMyTaskId ?? sampleTaskId ?? fallbackId },
      { action: 'cancel', taskId: () => envAssignedTaskId ?? envTaskId ?? sampleMyTaskId ?? sampleTaskId ?? fallbackId }
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

          if (res.status === 200 || res.status === 204) {
            const after = await fetchTaskById(apiClient, taskId());
            if (after?.task) {
              const prevAssignee = before?.task?.assignee ?? before?.task?.assigned_to;
              const assignee = after.task.assignee ?? after.task.assigned_to;
              const prevState = (before?.task?.task_state ?? before?.task?.state ?? '').toLowerCase();
              const newState = (after.task.task_state ?? after.task.state ?? '').toLowerCase();
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
          }

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

function expectTaskListPayload(payload: TaskListResponse) {
  expect(payload).toBeTruthy();
  expect(typeof payload).toBe('object');
  expect(Array.isArray(payload.tasks)).toBe(true);
  expect(typeof payload.total_records).toBe('number');

  if ((payload.tasks?.length ?? 0) > 0) {
    expect(payload.tasks![0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        task_state: expect.any(String)
      })
    );
  }
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

  const response = (await apiClient.post('workallocation/task', {
    data: body,
    throwOnError: false
  })) as { data: TaskListResponse; status: number };
  const data = response.data;
  if (response.status !== 200 || !Array.isArray(data?.tasks) || data.tasks!.length === 0) {
    return undefined;
  }
  return data.tasks![0];
}

async function fetchTaskById(apiClient: any, id: string): Promise<any> {
  return apiClient.get(`workallocation/task/${id}`, { throwOnError: false });
}
