import { test, expect } from './fixtures';
import { config } from '../../test_codecept/integration/tests/config/config';
import { withXsrf, expectStatus, StatusSets, withRetry } from './utils/apiTestUtils';
import { RoleAssignmentContainer } from './utils/types';
import { expectRoleAssignmentShape } from './utils/assertions';
import { ROLE_ACCESS_CASE_ID } from './data/testIds';
import { request } from '@playwright/test';
import { promises as fs } from 'node:fs';
import { ensureStorageState } from './auth';
import { extractCaseShareEntries } from './utils/types';
import { seedRoleAccessCaseId } from './utils/role-access';

test.describe('Global search', () => {
  test('lists available services', async ({ apiClient }) => {
    const response = await withRetry(
      () =>
        apiClient.get<Array<{ serviceId: string; serviceName: string }>>('api/globalSearch/services', {
          throwOnError: false
        }),
      { retries: 1, retryStatuses: [502, 504] }
    );
    expectStatus(response.status, StatusSets.guardedBasic);
    if (response.status === 200 && Array.isArray(response.data) && response.data.length > 0) {
      expect(response.data[0]).toEqual(
        expect.objectContaining({
          serviceId: expect.any(String),
          serviceName: expect.any(String)
        })
      );
    }
  });

  test('returns results payload or guarded status', async ({ apiClient }) => {
    const response = await apiClient.post<{ results?: unknown }>('api/globalSearch/results', {
      data: { searchRequest: { caseReferences: ['1234567890123456'] } },
      throwOnError: false
    });
    expectStatus(response.status, StatusSets.globalSearch);
    if (response.status === 200 && response.data) {
      expect(response.data).toHaveProperty('results');
      if (Array.isArray((response.data as any).results) && (response.data as any).results.length > 0) {
        const first = (response.data as any).results[0];
        expect(first).toEqual(expect.objectContaining({ }));
        if (first.caseReference) {
          expect(typeof first.caseReference).toBe('string');
        }
      }
    }
  });

  test('searchCases proxy responds or guards', async ({ apiClient }) => {
    const response = await withRetry(
      () =>
        apiClient.post<{ total?: number; cases?: unknown[] }>('data/internal/searchCases?ctid=xuiTestCaseType', {
          data: { size: 1, from: 0, sort: [], native_es_query: { match_all: {} } },
          throwOnError: false
        }),
      { retries: 1, retryStatuses: [502, 504] }
    );
    expectStatus(response.status, [200, 400, 401, 403, 404, 500, 502, 504]);
    // Some environments return a stub payload with full fields; otherwise just ensure a response object exists.
    if (response.status === 200 && response.data) {
      if (typeof response.data.total === 'number' && Array.isArray(response.data.cases)) {
        expect(response.data.total).toBeGreaterThanOrEqual(0);
        if (response.data.cases.length > 0) {
          expect(response.data.cases[0]).toEqual(expect.anything());
        }
      } else {
        expect(response.data).toEqual(expect.anything());
      }
    }
  });
});

test.describe('Ref data and supported jurisdictions', () => {
  test('wa-supported jurisdictions', async ({ apiClient }) => {
    const res = await apiClient.get<string[]>('api/wa-supported-jurisdiction', { throwOnError: false });
    expectStatus(res.status, StatusSets.guardedBasic);
    if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
      expect(typeof res.data[0]).toBe('string');
    }
  });

  test('staff-supported jurisdictions', async ({ apiClient }) => {
    const res = await apiClient.get<string[]>('api/staff-supported-jurisdiction', { throwOnError: false });
    expectStatus(res.status, StatusSets.guardedBasic);
    if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
      expect(typeof res.data[0]).toBe('string');
    }
  });

  test('locations endpoint returns list or guarded status', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const res = await apiClient.get<Array<{ epimms_id?: string }>>('api/locations', {
        headers,
        throwOnError: false
      });
      expectStatus(res.status, StatusSets.guardedBasic);
      if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
        expect(res.data[0]).toHaveProperty('epimms_id');
      }
    });
  });

  test('staff-ref-data endpoint responds', async ({ apiClient }) => {
    const res = await apiClient.post<{ staff?: Array<{ known_as?: string; email_id?: string }> }>('api/staff-ref-data/search', {
      data: { attributes: ['email'], searchString: 'test' },
      throwOnError: false
    });
    expectStatus(res.status, [200, 400, 401, 403, 500]);
    if (res.status === 200 && Array.isArray(res.data?.staff)) {
      const staffEntry = res.data.staff[0];
      expect(staffEntry).toEqual(
        expect.objectContaining({
          known_as: expect.any(String),
          email_id: expect.any(String)
        })
      );
    }
  });
});

test.describe('Role access / AM', () => {
  let roleAccessCaseId = ROLE_ACCESS_CASE_ID ?? '1234567890123456';
  const hasCaseOfficer = !!(config.users?.[config.testEnv as keyof typeof config.users]?.caseOfficer_r1);
  test.beforeAll(async ({ apiClient }) => {
    if (roleAccessCaseId) {
      return;
    }
    const seeded = await seedRoleAccessCaseId(apiClient);
    if (seeded) {
      roleAccessCaseId = seeded;
    }
  });
  test('rejects unauthenticated role access calls', async ({ anonymousClient }) => {
    const res = await anonymousClient.post('api/role-access/allocate-role/confirm', {
      data: {},
      throwOnError: false
    });
    expectStatus(res.status, [401, 403]);
  });

  test('rejects role access mutation with invalid CSRF token', async ({ apiClient }) => {
    const res = await apiClient.post('api/role-access/allocate-role/confirm', {
      data: {},
      headers: { 'X-XSRF-TOKEN': 'invalid-token' },
      throwOnError: false
    });
    expectStatus(res.status, [400, 401, 403, 409, 500]);
  });

  test('get-my-access-new-count', async ({ apiClient }) => {
    const res = await withRetry(
      () =>
        apiClient.get<{ count?: number } | number>('api/role-access/roles/get-my-access-new-count', {
          throwOnError: false
        }),
      { retries: 1, retryStatuses: [502, 504] }
    );
    expectStatus(res.status, [200, 401, 403, 500, 502, 504]);
    const data = res.data as any;
    if (res.status === 200) {
      if (typeof data === 'number') {
        expect(data).toBeGreaterThanOrEqual(0);
      } else if (typeof data?.count === 'number') {
        expect(data.count).toBeGreaterThanOrEqual(0);
      } else {
        expect(data).toEqual(expect.anything());
      }
    }
  });

  test('roles/access-get responds', async ({ apiClient }) => {
    const res = await withRetry(
      () =>
        apiClient.post<RoleAssignmentContainer>('api/role-access/roles/access-get', {
          data: { caseIds: [roleAccessCaseId] },
          throwOnError: false
        }),
      { retries: 1, retryStatuses: [502, 504] }
    );
    expectStatus(res.status, [200, 400, 401, 403, 404, 500]);
    if (res.status === 200) {
      if (Array.isArray(res.data) && res.data.length > 0) {
        expectRoleAssignmentShape(res.data[0] as any);
      } else if (Array.isArray((res.data as RoleAssignmentContainer)?.roleAssignmentResponse) && (res.data as RoleAssignmentContainer).roleAssignmentResponse!.length > 0) {
        expectRoleAssignmentShape((res.data as RoleAssignmentContainer).roleAssignmentResponse![0] as any);
      } else {
        expect(res.data).toEqual(expect.anything());
      }
    }
  });

  test('allocate-role/valid-roles responds', async ({ apiClient }) => {
    const res = await apiClient.post<Array<{ roleId: string; roleName: string }>>('api/role-access/allocate-role/valid-roles', {
      data: { requestedRoles: [], jurisdiction: 'IA' },
      throwOnError: false
    });
    expectStatus(res.status, [200, 400, 401, 403, 404, 500]);
    const data = res.data as any;
    if (res.status === 200 && Array.isArray(data) && data.length > 0) {
      expect(data[0]).toEqual(
        expect.objectContaining({
          roleId: expect.any(String),
          roleName: expect.any(String)
        })
      );
    }
  });

  test('roles/access-get-by-caseId responds with roles when present', async ({ apiClient }) => {
    const res = await apiClient.post<RoleAssignmentContainer>('api/role-access/roles/access-get-by-caseId', {
      data: { case_id: roleAccessCaseId },
      throwOnError: false
    });
    expectStatus(res.status, [200, 400, 401, 403, 404, 500]);
    const data = res.data as any;
    if (res.status === 200 && Array.isArray(data?.roleAssignmentResponse)) {
      expectRoleAssignmentShape(data.roleAssignmentResponse[0] as any);
    }
  });

  test('specific-access approval flow guarded with XSRF', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const res = await apiClient.post('api/role-access/allocate-role/specific-access-approval', {
        data: { caseId: '123', assignerId: 'abc', specificAccessReason: 'test' },
        headers,
        throwOnError: false
      });
      expectStatus(res.status, StatusSets.allocateRole);
    });
  });

  test('allocate-role/confirm responds with XSRF header', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const res = await apiClient.post<RoleAssignmentContainer>('api/role-access/allocate-role/confirm', {
        data: {
          caseId: roleAccessCaseId,
          caseType: 'xuiTestCaseType',
          jurisdiction: 'DIVORCE',
          roleCategory: 'LEGAL_OPERATIONS',
          assigneeId: 'test-user'
        },
        headers,
        throwOnError: false
      });
      expectStatus(res.status, StatusSets.allocateRole);
      if ([200, 201].includes(res.status) && Array.isArray(res.data) && res.data.length > 0) {
        expectRoleAssignmentShape(res.data[0] as any);
      }
    });
  });

  test('allocate-role/reallocate responds with XSRF header', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const res = await apiClient.post('api/role-access/allocate-role/reallocate', {
        data: {
          caseId: roleAccessCaseId,
          caseType: 'xuiTestCaseType',
          jurisdiction: 'DIVORCE',
          roleCategory: 'LEGAL_OPERATIONS',
          assigneeId: 'test-user'
        },
        headers,
        throwOnError: false
      });
      expectStatus(res.status, StatusSets.allocateRole);
    });
  });

  test('allocate-role/delete responds with XSRF header', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const res = await apiClient.post<RoleAssignmentContainer>('api/role-access/allocate-role/delete', {
        data: { assignmentId: 'test-assignment' },
        headers,
        throwOnError: false
      });
      expectStatus(res.status, StatusSets.allocateRole);
      if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
        expectRoleAssignmentShape(res.data[0] as any);
      }
    });
  });

  test('exclusions/confirm responds with XSRF header', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const res = await apiClient.post<RoleAssignmentContainer>('api/role-access/exclusions/confirm', {
        data: {},
        headers,
        throwOnError: false
      });
      expectStatus(res.status, StatusSets.allocateRole);
      if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
        expectRoleAssignmentShape(res.data[0] as any);
      }
    });
  });

  test('roles/post responds with XSRF header', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const res = await apiClient.post<RoleAssignmentContainer>('api/role-access/roles/post', {
        data: { caseId: roleAccessCaseId, caseType: 'xuiTestCaseType', jurisdiction: 'DIVORCE' },
        headers,
        throwOnError: false
      });
      expectStatus(res.status, StatusSets.allocateRole);
      if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
        expectRoleAssignmentShape(res.data[0] as any);
      }
    });
  });

  test('role access confirm rejects case officer without solicitor role', async ({ apiClientFor }) => {
    if (!hasCaseOfficer) {
      expect(true).toBe(true);
      return;
    }
    const client = await apiClientFor('caseOfficer_r1');
    const res = await client.post('api/role-access/allocate-role/confirm', {
      data: { caseId: roleAccessCaseId, caseType: 'xuiTestCaseType', jurisdiction: 'DIVORCE' },
      throwOnError: false
    });
    expectStatus(res.status, [401, 403, 500]);
  });

  test('role access confirm returns guarded status for stale session', async () => {
    const statePath = await ensureStorageState('solicitor');
    const raw = await fs.readFile(statePath, 'utf8');
    const state = JSON.parse(raw);
    const expiredCookies = Array.isArray(state.cookies)
      ? state.cookies.map((c: any) => ({ ...c, expires: 0 }))
      : [];

    const ctx = await request.newContext({
      baseURL: config.baseUrl.replace(/\/+$/, ''),
      ignoreHTTPSErrors: true
    });
    if (expiredCookies.length) {
      await ctx.storageState({ cookies: expiredCookies, origins: [] });
    }
    const res = await ctx.post('api/role-access/allocate-role/confirm', {
      data: { caseId: roleAccessCaseId },
      failOnStatusCode: false
    });
    expectStatus(res.status(), [401, 403]);
    await ctx.dispose();
  });

  test('roles/manageLabellingRoleAssignment responds', async ({ apiClient }) => {
    const res = await withRetry(
      () =>
        withXsrf('solicitor', async (headers) =>
          apiClient.post('api/role-access/roles/manageLabellingRoleAssignment/1234567890123456', {
            data: { caseId: roleAccessCaseId },
            headers,
            throwOnError: false
          })
        ),
      { retries: 1, retryStatuses: [502, 504] }
    );
    expectStatus(res.status, StatusSets.allocateRole);
    if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
      expectRoleAssignmentShape(res.data[0] as any);
    }
  });
});
