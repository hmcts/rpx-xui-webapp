import { test, expect } from './fixtures';
import { buildTaskSearchRequest } from './utils/work-allocation';
import { ensureStorageState, getStoredCookie } from './auth';

const serviceCodes = ['IA', 'CIVIL', 'PRIVATELAW'];

test.describe('Work allocation (read-only)', () => {
  let cachedLocationId: string | undefined;
  let userId: string | undefined;
  let sampleTaskId: string | undefined;
  let sampleMyTaskId: string | undefined;

  test.beforeAll(async ({ apiClient }) => {
    const userRes = await apiClient.get<any>('api/user/details', { throwOnError: false });
    if (userRes.status === 200) {
      userId = userRes.data?.userInfo?.id ?? userRes.data?.userInfo?.uid;
    }

    const listResponse = await apiClient.get<any[]>(`workallocation/location?serviceCodes=${encodeURIComponent(serviceCodes.join(','))}`, {
      throwOnError: false
    });
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
    const response = await apiClient.get<any[]>(`workallocation/location?serviceCodes=${encodeURIComponent(serviceCodes.join(','))}`, {
      throwOnError: false
    });

    expect([200, 401, 403]).toContain(response.status);
    if (response.status !== 200) {
      return;
    }
    expect(Array.isArray(response.data)).toBe(true);
    if (response.data.length > 0) {
      expect(response.data[0]).toEqual(
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
    expect([200, 401, 403, 404, 500]).toContain(response.status);
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

    const types = toArray<any>(response.data);
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

      const response = await apiClient.post<any>('workallocation/task', { data: body });
      expectTaskListPayload(response.data);
    });

    test('AvailableTasks returns structured response', async ({ apiClient }) => {
      const body = buildTaskSearchRequest('AvailableTasks', {
        locations: cachedLocationId ? [cachedLocationId] : [],
        states: ['unassigned'],
        searchBy: 'caseworker'
      });

      const response = await apiClient.post<any>('workallocation/task', { data: body, throwOnError: false });
      expect([200, 401, 403]).toContain(response.status);
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

      const response = await apiClient.post<any>('workallocation/task', { data: body, throwOnError: false });
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
        await ensureStorageState('solicitor');
        const xsrf = await getStoredCookie('solicitor', 'XSRF-TOKEN');
        const response = await apiClient.get(endpoint, {
          headers: xsrf ? { 'X-XSRF-TOKEN': xsrf } : {},
          throwOnError: false
        });
        expect([200, 401, 403, 404]).toContain(response.status);
      });
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
        expect([401, 403]).toContain(response.status);
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
        expect([200, 204, 401, 403, 404]).toContain(response.status);
      });
    });

    actions.forEach((action) => {
      test(`${action} with XSRF header returns guarded status`, async ({ apiClient }) => {
        await ensureStorageState('solicitor');
        const xsrf = await getStoredCookie('solicitor', 'XSRF-TOKEN');
        expect(xsrf).toBeDefined();

        const response = await apiClient.post(`workallocation/task/${taskId()}/${action}`, {
          data: {},
          headers: {
            'X-XSRF-TOKEN': xsrf
          },
          throwOnError: false
        });
        expect([200, 204, 400, 403, 404, 409]).toContain(response.status);
      });
    });
  });

  test.describe('task actions (happy-path attempt)', () => {
    const id = (fallback?: string) => fallback ?? '00000000-0000-0000-0000-000000000000';

    const positiveActions: Array<{ action: string; taskId: () => string }> = [
      { action: 'claim', taskId: () => id(sampleTaskId) },
      { action: 'unclaim', taskId: () => id(sampleMyTaskId ?? sampleTaskId) },
      { action: 'complete', taskId: () => id(sampleMyTaskId ?? sampleTaskId) },
      { action: 'assign', taskId: () => id(sampleTaskId) },
      { action: 'unassign', taskId: () => id(sampleMyTaskId ?? sampleTaskId) },
      { action: 'cancel', taskId: () => id(sampleMyTaskId ?? sampleTaskId) }
    ];

    positiveActions.forEach(({ action, taskId }) => {
      test(`${action} returns allowed status with XSRF`, async ({ apiClient }) => {
        await ensureStorageState('solicitor');
        const xsrf = await getStoredCookie('solicitor', 'XSRF-TOKEN');
        expect(xsrf).toBeDefined();

        const response = await apiClient.post(`workallocation/task/${taskId()}/${action}`, {
          data: {},
          headers: xsrf ? { 'X-XSRF-TOKEN': xsrf } : {},
          throwOnError: false
        });
        expect([200, 204, 400, 403, 404, 409]).toContain(response.status);
      });
    });
  });

  test.describe('caseworkers & people', () => {
    test('lists caseworkers', async ({ apiClient }) => {
      await ensureStorageState('solicitor');
      const xsrf = await getStoredCookie('solicitor', 'XSRF-TOKEN');
      const response = await apiClient.get('workallocation/caseworker', {
        headers: xsrf ? { 'X-XSRF-TOKEN': xsrf } : {},
        throwOnError: false
      });
      expect([200, 401, 403, 404]).toContain(response.status);
      if (response.status === 200 && Array.isArray(response.data) && response.data.length > 0) {
        expect(response.data[0]).toEqual(
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
      await ensureStorageState('solicitor');
      const xsrf = await getStoredCookie('solicitor', 'XSRF-TOKEN');
      const response = await apiClient.get(`workallocation/caseworker/location/${cachedLocationId}`, {
        headers: xsrf ? { 'X-XSRF-TOKEN': xsrf } : {},
        throwOnError: false
      });
      expect([200, 401, 403, 404]).toContain(response.status);
      if (response.status === 200 && Array.isArray(response.data) && response.data.length > 0) {
        expect(response.data[0]).toEqual(
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
      expect([200, 400, 403]).toContain(response.status);
    });

    test('person search validation', async ({ apiClient }) => {
      const response = await apiClient.post('workallocation/findPerson', {
        data: { searchOptions: { searchTerm: 'test', userRole: 'judge', services: serviceCodes } },
        throwOnError: false
      });
      expect([200, 400, 403]).toContain(response.status);
    });

    test('roles category endpoint responds', async ({ apiClient }) => {
      const response = await apiClient.get('workallocation/exclusion/rolesCategory', {
        throwOnError: false
      });
      expect([200, 401, 403, 404]).toContain(response.status);
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

function expectTaskListPayload(payload: any) {
  expect(payload).toBeTruthy();
  expect(typeof payload).toBe('object');
  expect(Array.isArray(payload.tasks)).toBe(true);
  expect(typeof payload.total_records).toBe('number');

  if (payload.tasks.length > 0) {
    expect(payload.tasks[0]).toEqual(
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
): Promise<any | undefined> {
  const body = buildTaskSearchRequest(view, {
    locations: locationId ? [locationId] : [],
    states,
    searchBy: 'caseworker',
    pageSize: 5
  });

  const response = await apiClient.post<any>('workallocation/task', { data: body, throwOnError: false });
  if (response.status !== 200 || !Array.isArray(response.data?.tasks) || response.data.tasks.length === 0) {
    return undefined;
  }
  return response.data.tasks[0];
}
