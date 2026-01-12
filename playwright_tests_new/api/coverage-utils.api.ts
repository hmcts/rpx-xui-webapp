import { test, expect } from '@playwright/test';

import {
  expectTaskList,
  expectRoleAssignmentShape,
  expectBookmarkShape,
  expectAnnotationShape,
  expectCaseShareShape,
  expectAddressLookupShape
} from './utils/assertions';
import { expectStatus, withRetry, __test__ as apiTestUtilsTest } from './utils/apiTestUtils';
import { resolveRoleAccessCaseId } from './data/testIds';
import { __test__ as fixturesTest } from './fixtures';
import { buildTaskSearchRequest, seedTaskId } from './utils/work-allocation';
import { seedRoleAccessCaseId } from './utils/role-access';
import { extractCaseShareEntries, isTaskList } from './utils/types';
import nodeAppDataModels from '../../test_codecept/dataModels/nodeApp';

test.describe('Coverage helpers', () => {
  test('expectTaskList covers empty and populated tasks', () => {
    expectTaskList({ tasks: [], total_records: 0 });
    expectTaskList({
      tasks: [{ id: 'task-1', task_state: 'assigned' }],
      total_records: 1
    });
  });

  test('expectRoleAssignmentShape covers optional fields', () => {
    expectRoleAssignmentShape({
      roleCategory: 'LEGAL',
      roleName: 'caseworker',
      actorId: 'user-1',
      actions: ['read']
    });
    expectRoleAssignmentShape({
      roleCategory: 'LEGAL',
      roleName: 'caseworker'
    });
  });

  test('expectBookmarkShape and expectAnnotationShape accept minimal payloads', () => {
    expectBookmarkShape({ id: 'bookmark-1', name: 'Bookmark', documentId: 'doc-1' });
    expectAnnotationShape({ id: 'anno-1', documentId: 'doc-1', annotationSetId: 'set-1' });
  });

  test('expectCaseShareShape handles property variants', () => {
    expectCaseShareShape(
      { organisations: [{ organisationIdentifier: 'org-1', name: 'Org' }] },
      'organisations'
    );
    expectCaseShareShape(
      { users: [{ userIdentifier: 'user-1', email: 'user@example.com' }] },
      'users'
    );
    expectCaseShareShape(
      { cases: [{ caseId: 'case-1', sharedWith: [] }] },
      'cases'
    );
    expectCaseShareShape(
      { sharedCases: [{ caseId: 'case-2', sharedWith: [] }] },
      'sharedCases'
    );
    expectCaseShareShape({ payload: {} }, 'unknown');
  });

  test('expectAddressLookupShape handles empty and populated responses', () => {
    expectAddressLookupShape({ results: [], header: {} });
    expectAddressLookupShape({
      results: [
        {
          DPA: {
            POSTCODE: 'E1 1AA',
            ADDRESS: '1 Example Street',
            POST_TOWN: 'London'
          }
        }
      ],
      header: {}
    });
  });

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

    await expect(withRetry(async () => ({ status: 200 }), { retries: -1 })).rejects.toThrow(
      'withRetry failed unexpectedly'
    );
  });

  test('buildXsrfHeadersWith covers token present and missing', async () => {
    const tokenHeaders = await apiTestUtilsTest.buildXsrfHeadersWith('solicitor', {
      ensureStorageState: async () => 'state',
      getStoredCookie: async () => 'token'
    });
    expect(tokenHeaders).toEqual({ 'X-XSRF-TOKEN': 'token' });

    const emptyHeaders = await apiTestUtilsTest.buildXsrfHeadersWith('solicitor', {
      ensureStorageState: async () => 'state',
      getStoredCookie: async () => undefined
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
      searchBy: 'caseworker'
    });
    expect(full.searchRequest.search_parameters).toHaveLength(5);
    expect(full.searchRequest.search_parameters.map((entry) => entry.key)).toEqual([
      'user',
      'location',
      'jurisdiction',
      'taskType',
      'state'
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
      }
    };
    const assigned = await seedTaskId(apiClient, 'loc-1');
    expect(assigned).toEqual({ id: 'assigned-task', type: 'assigned' });

    const apiClientFallback = {
      post: async () => ({ status: 200, data: { tasks: [] } })
    };
    const missing = await seedTaskId(apiClientFallback, undefined);
    expect(missing).toBeUndefined();

    let fallbackCalls = 0;
    const apiClientSecond = {
      post: async () => {
        fallbackCalls += 1;
        return fallbackCalls === 1
          ? { status: 200, data: { tasks: [] } }
          : { status: 200, data: { tasks: [{ id: 'unassigned-task' }] } };
      }
    };
    const unassigned = await seedTaskId(apiClientSecond, undefined);
    expect(unassigned).toEqual({ id: 'unassigned-task', type: 'unassigned' });
  });

  test('seedRoleAccessCaseId covers success and failure paths', async () => {
    const headers = { 'X-XSRF-TOKEN': 'token' };
    const withXsrfFn = async (_role: string, fn: (h: Record<string, string>) => Promise<string | undefined>) =>
      fn(headers);

    const apiClient = {
      get: async () => ({
        data: { cases: [{ caseId: 'case-1' }, { case_id: 'case-2' }] }
      })
    };

    const resolved = await seedRoleAccessCaseId(apiClient, { withXsrfFn });
    expect(resolved).toBe('case-1');

    const apiClientCaseId = {
      get: async () => ({
        data: { cases: [{ case_id: 'case-2' }] }
      })
    };
    const resolvedCaseId = await seedRoleAccessCaseId(apiClientCaseId, { withXsrfFn });
    expect(resolvedCaseId).toBe('case-2');

    const apiClientEmpty = {
      get: async () => ({
        data: { cases: [{}] }
      })
    };
    const resolvedEmpty = await seedRoleAccessCaseId(apiClientEmpty, { withXsrfFn });
    expect(resolvedEmpty).toBeUndefined();

    const failing = await seedRoleAccessCaseId(apiClient, {
      withXsrfFn: async () => {
        throw new Error('boom');
      }
    });
    expect(failing).toBeUndefined();
  });

  test('fixture helpers cover default headers and request recovery', async () => {
    const headers = await fixturesTest.buildDefaultHeaders('solicitor', {
      shouldAutoInjectXsrf: () => true,
      getStoredCookie: async () => 'token'
    });
    expect(headers['X-XSRF-TOKEN']).toBe('token');

    const noXsrf = await fixturesTest.buildDefaultHeaders('solicitor', {
      shouldAutoInjectXsrf: () => false,
      getStoredCookie: async () => 'token'
    });
    expect(noXsrf['X-XSRF-TOKEN']).toBeUndefined();

    const anonymous = await fixturesTest.buildDefaultHeaders('anonymous', {
      shouldAutoInjectXsrf: () => true,
      getStoredCookie: async () => 'token'
    });
    expect(anonymous['X-XSRF-TOKEN']).toBeUndefined();

    let calls = 0;
    const fakeContext = {};
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
        unlink: async () => {}
      }
    );
    expect(recovered).toBe(fakeContext);

    const failingFactory = async () => {
      throw new Error('boom');
    };
    await expect(
      fixturesTest.buildRequestContext('solicitor', 'state-1', {}, { requestFactory: failingFactory })
    ).rejects.toThrow('boom');
  });

  test('resolveRoleAccessCaseId returns env or default', () => {
    expect(resolveRoleAccessCaseId('case-1')).toBe('case-1');
    expect(resolveRoleAccessCaseId(undefined)).toBe('1234567890123456');
  });

  test('extractCaseShareEntries and isTaskList cover variants', () => {
    expect(isTaskList({ tasks: [] })).toBe(true);
    expect(isTaskList({})).toBe(false);

    const direct = extractCaseShareEntries({ cases: [{ caseId: 'case-1' }] }, 'cases');
    const nested = extractCaseShareEntries({ payload: { cases: [{ caseId: 'case-2' }] } }, 'cases');
    const empty = extractCaseShareEntries(null as any, 'cases');
    expect(direct).toHaveLength(1);
    expect(nested).toHaveLength(1);
    expect(empty).toEqual([]);
  });

  test('nodeApp data models cover oauth and oidc variants', () => {
    const oidc = nodeAppDataModels.getUserDetails_oidc();
    expect(oidc.userInfo.uid).toBeDefined();
    expect(Array.isArray(oidc.roleAssignmentInfo)).toBe(true);

    const oauth = nodeAppDataModels.getUserDetails_oauth();
    expect(oauth.userInfo.id).toBeDefined();
    expect(oauth.userInfo.active).toBe(true);

    const location = nodeAppDataModels.getUserDetailsLocationInfo();
    expect(location.jurisdiction).toBe('IA');
  });
});
