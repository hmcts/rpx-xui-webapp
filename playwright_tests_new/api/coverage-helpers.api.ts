import { test, expect } from '@playwright/test';

import { expectStatus, withRetry, __test__ as apiTestUtilsTest } from './utils/apiTestUtils';
import { resolveRoleAccessCaseId } from './data/testIds';
import { __test__ as fixturesTest } from './fixtures';
import { buildTaskSearchRequest, seedTaskId } from './utils/work-allocation';
import { seedRoleAccessCaseId } from './utils/role-access';

test.describe('Helper utilities and retry logic', { tag: '@svc-internal' }, () => {
  test('expectStatus and withRetry cover success and retry paths', async () => {
    expectStatus(200, [200, 201]);
    expect(() => expectStatus(500, [200])).toThrow();

    let attempts = 0;
    const res = await withRetry(
      async () => {
        attempts += 1;
        return { status: attempts === 1 ? 502 : 200 };
      },
      { retries: 1, retryStatuses: [502] }
    );
    expect(res.status).toBe(200);
    expect(attempts).toBe(2);

    let errors = 0;
    await expect(
      withRetry(
        async () => {
          errors += 1;
          throw new Error('boom');
        },
        { retries: 1 }
      )
    ).rejects.toThrow('boom');
    expect(errors).toBe(2);

    const defaultRes = await withRetry(async () => ({ status: 200 }));
    expect(defaultRes.status).toBe(200);

    await expect(withRetry(async () => ({ status: 200 }), { retries: -1 })).rejects.toThrow('withRetry failed unexpectedly');
  });

  test('buildXsrfHeadersWith covers token present and missing', async () => {
    const tokenHeaders = await apiTestUtilsTest.buildXsrfHeadersWith('solicitor', {
      ensureStorageState: async () => 'state',
      getStoredCookie: async () => 'token',
    });
    expect(tokenHeaders).toEqual({ 'X-XSRF-TOKEN': 'token' });

    const emptyHeaders = await apiTestUtilsTest.buildXsrfHeadersWith('solicitor', {
      ensureStorageState: async () => 'state',
      getStoredCookie: async () => undefined,
    });
    expect(emptyHeaders).toEqual({});
  });

  test('buildTaskSearchRequest covers empty and full option sets', () => {
    const minimal = buildTaskSearchRequest('AllWork');
    expect(minimal.searchRequest.search_parameters).toEqual([]);

    const full = buildTaskSearchRequest('MyTasks', {
      userIds: ['user-1'],
      locations: ['loc-1'],
      jurisdictions: ['J1'],
      taskTypes: ['type-1'],
      states: ['assigned'],
      pageNumber: 2,
      pageSize: 10,
      searchBy: 'caseworker',
    });
    expect(full.searchRequest.search_parameters).toHaveLength(5);
    expect(full.searchRequest.search_parameters.map((entry) => entry.key)).toEqual([
      'user',
      'location',
      'jurisdiction',
      'taskType',
      'state',
    ]);
  });

  test('seedTaskId covers assigned, unassigned, and missing tasks', async () => {
    let calls = 0;
    const apiClient = {
      post: async () => {
        calls += 1;
        if (calls === 1) {
          return { status: 200, data: { tasks: [{ id: 'assigned-task' }] } };
        }
        return { status: 200, data: { tasks: [{ id: 'unassigned-task' }] } };
      },
    };
    const assigned = await seedTaskId(apiClient, 'loc-1');
    expect(assigned).toEqual({ id: 'assigned-task', type: 'assigned' });

    const apiClientFallback = {
      post: async () => ({ status: 200, data: { tasks: [] } }),
    };
    const missing = await seedTaskId(apiClientFallback);
    expect(missing).toBeUndefined();

    let fallbackCalls = 0;
    const apiClientSecond = {
      post: async () => {
        fallbackCalls += 1;
        return fallbackCalls === 1
          ? { status: 200, data: { tasks: [] } }
          : { status: 200, data: { tasks: [{ id: 'unassigned-task' }] } };
      },
    };
    const unassigned = await seedTaskId(apiClientSecond);
    expect(unassigned).toEqual({ id: 'unassigned-task', type: 'unassigned' });

    const apiClientError = {
      post: async () => ({ status: 500, data: { tasks: [{ id: 'task-3' }] } }),
    };
    const errorResult = await seedTaskId(apiClientError);
    expect(errorResult).toBeUndefined();

    const apiClientNoId = {
      post: async () => ({ status: 200, data: { tasks: [{}] } }),
    };
    const noId = await seedTaskId(apiClientNoId);
    expect(noId).toBeUndefined();
  });

  test('seedRoleAccessCaseId covers success and failure paths', async () => {
    const headers = { 'X-XSRF-TOKEN': 'token' };
    const withXsrfFn = async <T>(_role: string, fn: (h: Record<string, string>) => Promise<T>) => fn(headers);

    const apiClient = {
      get: async () => ({
        data: { cases: [{ caseId: 'case-1' }, { case_id: 'case-2' }] },
      }),
    };

    const resolved = await seedRoleAccessCaseId(apiClient, { withXsrfFn });
    expect(resolved).toBe('case-1');

    const apiClientCaseId = {
      get: async () => ({
        data: { cases: [{ case_id: 'case-2' }] },
      }),
    };
    const resolvedCaseId = await seedRoleAccessCaseId(apiClientCaseId, { withXsrfFn });
    expect(resolvedCaseId).toBe('case-2');

    const apiClientEmpty = {
      get: async () => ({
        data: { cases: [{}] },
      }),
    };
    const resolvedEmpty = await seedRoleAccessCaseId(apiClientEmpty, { withXsrfFn });
    expect(resolvedEmpty).toBeUndefined();

    const failing = await seedRoleAccessCaseId(apiClient, {
      withXsrfFn: async () => {
        throw new Error('boom');
      },
    });
    expect(failing).toBeUndefined();
  });

  test('fixture helpers cover default headers and request recovery', async () => {
    const headers = await fixturesTest.buildDefaultHeaders('solicitor', {
      shouldAutoInjectXsrf: () => true,
      getStoredCookie: async () => 'token',
    });
    expect(headers['X-XSRF-TOKEN']).toBe('token');

    const noXsrf = await fixturesTest.buildDefaultHeaders('solicitor', {
      shouldAutoInjectXsrf: () => false,
      getStoredCookie: async () => 'token',
    });
    expect(noXsrf['X-XSRF-TOKEN']).toBeUndefined();

    const anonymous = await fixturesTest.buildDefaultHeaders('anonymous', {
      shouldAutoInjectXsrf: () => true,
      getStoredCookie: async () => 'token',
    });
    expect(anonymous['X-XSRF-TOKEN']).toBeUndefined();

    let calls = 0;
    const fakeContext: any = {};
    const requestFactory = async () => {
      calls += 1;
      if (calls === 1) {
        throw new Error('Unexpected end of JSON input');
      }
      return fakeContext;
    };
    const recovered = await fixturesTest.buildRequestContext(
      'solicitor',
      'state-1',
      {},
      {
        requestFactory,
        ensureStorageState: async () => 'state-2',
        unlink: async () => {},
      }
    );
    expect(recovered).toBe(fakeContext);

    let unlinkCalls = 0;
    let unlinkFactoryCalls = 0;
    const unlinkFactory = async () => {
      unlinkFactoryCalls += 1;
      if (unlinkFactoryCalls === 1) {
        throw new Error('Unexpected end of JSON input');
      }
      return fakeContext;
    };
    const recoveredAfterUnlink = await fixturesTest.buildRequestContext(
      'solicitor',
      'state-1',
      {},
      {
        requestFactory: unlinkFactory,
        ensureStorageState: async () => 'state-2',
        unlink: async () => {
          unlinkCalls += 1;
          throw new Error('unlink failed');
        },
      }
    );
    expect(recoveredAfterUnlink).toBe(fakeContext);
    expect(unlinkCalls).toBe(1);

    const failingFactory = async () => {
      throw new Error('boom');
    };
    await expect(
      fixturesTest.buildRequestContext('solicitor', 'state-1', {}, { requestFactory: failingFactory })
    ).rejects.toThrow('boom');
  });

  test('resolveRoleAccessCaseId returns env or default', () => {
    expect(resolveRoleAccessCaseId('case-1')).toBe('case-1');
    expect(resolveRoleAccessCaseId()).toBe('1234567890123456');
  });
});
