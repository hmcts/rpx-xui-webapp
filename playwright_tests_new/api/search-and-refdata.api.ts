import { promises as fs } from 'node:fs';

import { request } from '@playwright/test';

import { config } from '../common/apiTestConfig';
import { ensureStorageState } from './utils/auth';
import { test, expect } from './fixtures';
import { ROLE_ACCESS_CASE_ID, resolveRoleAccessCaseId } from './data/testIds';
import { expectStatus, StatusSets, withRetry, withXsrf } from './utils/apiTestUtils';
import { AuthenticationError } from './utils/errors';
import { seedRoleAccessCaseId } from './utils/role-access';
import { RoleAssignmentContainer } from './utils/types';
import {
  applyExpiredCookies,
  assertGlobalSearchResults,
  assertGlobalSearchServices,
  assertLocationsResponse,
  assertManageLabellingResponse,
  assertMyAccessCount,
  assertRoleAccessByCaseIdResponse,
  assertRoleAccessGetResponse,
  assertRoleAssignmentsIfPresent,
  assertSearchCasesResponse,
  assertStaffRefDataResponse,
  assertSupportedJurisdictions,
  assertValidRolesResponse,
  buildExpiredCookies,
} from './utils/searchRefDataUtils';

test.describe('Global search', () => {
  test('lists available services', async ({ apiClient }) => {
    const response = await withRetry(
      () =>
        apiClient.get<Array<{ serviceId: string; serviceName: string }>>('api/globalSearch/services', {
          throwOnError: false,
        }),
      { retries: 1, retryStatuses: [502, 504] }
    );
    expectStatus(response.status, StatusSets.guardedBasic);
    assertGlobalSearchServices(response.status, response.data);
  });

  test('returns results payload or guarded status', async ({ apiClient }) => {
    const response = await apiClient.post<{ results?: unknown }>('api/globalSearch/results', {
      data: { searchRequest: { caseReferences: ['1234567890123456'] } },
      throwOnError: false,
    });
    expectStatus(response.status, StatusSets.globalSearch);
    assertGlobalSearchResults(response.status, response.data);
  });

  test('searchCases proxy responds or guards', async ({ apiClient }) => {
    const response = await withRetry(
      () =>
        apiClient.post<{ total?: number; cases?: unknown[] }>('data/internal/searchCases?ctid=xuiTestCaseType', {
          data: { size: 1, from: 0, sort: [], native_es_query: { match_all: {} } },
          throwOnError: false,
        }),
      { retries: 1, retryStatuses: [502, 504] }
    );
    expectStatus(response.status, [200, 400, 401, 403, 404, 500, 502, 504]);
    assertSearchCasesResponse(response.status, response.data);
  });
});

test.describe('Ref data and supported jurisdictions', () => {
  test('wa-supported jurisdictions', async ({ apiClient }) => {
    const res = await apiClient.get<string[]>('api/wa-supported-jurisdiction', { throwOnError: false });
    expectStatus(res.status, StatusSets.guardedBasic);
    assertSupportedJurisdictions(res.status, res.data);
  });

  test('staff-supported jurisdictions', async ({ apiClient }) => {
    const res = await apiClient.get<string[]>('api/staff-supported-jurisdiction', { throwOnError: false });
    expectStatus(res.status, StatusSets.guardedBasic);
    assertSupportedJurisdictions(res.status, res.data);
  });

  test('locations endpoint returns list or guarded status', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const res = await apiClient.get<Array<{ epimms_id?: string }>>('api/locations', {
        headers,
        throwOnError: false,
      });
      expectStatus(res.status, StatusSets.guardedBasic);
      assertLocationsResponse(res.status, res.data);
    });
  });

  test('staff-ref-data endpoint responds', async ({ apiClient }) => {
    const res = await apiClient.post<{ staff?: Array<{ known_as?: string; email_id?: string }> }>('api/staff-ref-data/search', {
      data: { attributes: ['email'], searchString: 'test' },
      throwOnError: false,
    });
    expectStatus(res.status, [200, 400, 401, 403, 500]);
    assertStaffRefDataResponse(res.status, res.data);
  });
});

test.describe('Role access / AM', () => {
  let roleAccessCaseId = ROLE_ACCESS_CASE_ID;
  const hasCaseOfficer = !!config.users?.[config.testEnv as keyof typeof config.users]?.caseOfficer_r1;
  test.beforeAll(async ({ apiClient }) => {
    if (!roleAccessCaseId) {
      const seeded = await seedRoleAccessCaseId(apiClient);
      roleAccessCaseId = resolveRoleAccessCaseId(seeded);
    }
  });
  test('rejects unauthenticated role access calls', async ({ anonymousClient }) => {
    const res = await anonymousClient.post('api/role-access/allocate-role/confirm', {
      data: {},
      throwOnError: false,
    });
    expectStatus(res.status, [401, 403]);
  });

  test('rejects role access mutation with invalid CSRF token', async ({ apiClient }) => {
    const res = await apiClient.post('api/role-access/allocate-role/confirm', {
      data: {},
      headers: { 'X-XSRF-TOKEN': 'invalid-token' },
      throwOnError: false,
    });
    expectStatus(res.status, StatusSets.allocateRole);
  });

  test('get-my-access-new-count', async ({ apiClient }) => {
    const res = await withRetry(
      () =>
        apiClient.get<{ count?: number } | number>('api/role-access/roles/get-my-access-new-count', {
          throwOnError: false,
        }),
      { retries: 1, retryStatuses: [502, 504] }
    );
    expectStatus(res.status, [200, 401, 403, 500, 502, 504]);
    assertMyAccessCount(res.status, res.data);
  });

  test('roles/access-get responds', async ({ apiClient }) => {
    const res = await withRetry(
      () =>
        apiClient.post<RoleAssignmentContainer>('api/role-access/roles/access-get', {
          data: { caseIds: [roleAccessCaseId] },
          throwOnError: false,
        }),
      { retries: 1, retryStatuses: [502, 504] }
    );
    expectStatus(res.status, [200, 400, 401, 403, 404, 500]);
    assertRoleAccessGetResponse(res.status, res.data);
  });

  test('allocate-role/valid-roles responds', async ({ apiClient }) => {
    const res = await apiClient.post<Array<{ roleId: string; roleName: string }>>('api/role-access/allocate-role/valid-roles', {
      data: { requestedRoles: [], jurisdiction: 'IA' },
      throwOnError: false,
    });
    expectStatus(res.status, [200, 400, 401, 403, 404, 500, 502, 504]);
    assertValidRolesResponse(res.status, res.data);
  });

  test('roles/access-get-by-caseId responds with roles when present', async ({ apiClient }) => {
    const res = await apiClient.post<RoleAssignmentContainer>('api/role-access/roles/access-get-by-caseId', {
      data: { case_id: roleAccessCaseId },
      throwOnError: false,
    });
    expectStatus(res.status, [200, 400, 401, 403, 404, 500]);
    assertRoleAccessByCaseIdResponse(res.status, res.data);
  });

  test('specific-access approval flow guarded with XSRF', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const res = await apiClient.post('api/role-access/allocate-role/specific-access-approval', {
        data: { caseId: '123', assignerId: 'abc', specificAccessReason: 'test' },
        headers,
        throwOnError: false,
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
          assigneeId: 'test-user',
        },
        headers,
        throwOnError: false,
      });
      expectStatus(res.status, StatusSets.allocateRole);
      assertRoleAssignmentsIfPresent(res.status, res.data);
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
          assigneeId: 'test-user',
        },
        headers,
        throwOnError: false,
      });
      expectStatus(res.status, StatusSets.allocateRole);
    });
  });

  test('allocate-role/delete responds with XSRF header', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const res = await apiClient.post<RoleAssignmentContainer>('api/role-access/allocate-role/delete', {
        data: { assignmentId: 'test-assignment' },
        headers,
        throwOnError: false,
      });
      expectStatus(res.status, StatusSets.allocateRole);
      assertRoleAssignmentsIfPresent(res.status, res.data);
    });
  });

  test('exclusions/confirm responds with XSRF header', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const res = await apiClient.post<RoleAssignmentContainer>('api/role-access/exclusions/confirm', {
        data: {},
        headers,
        throwOnError: false,
      });
      expectStatus(res.status, StatusSets.allocateRole);
      assertRoleAssignmentsIfPresent(res.status, res.data);
    });
  });

  test('roles/post responds with XSRF header', async ({ apiClient }) => {
    await withXsrf('solicitor', async (headers) => {
      const res = await apiClient.post<RoleAssignmentContainer>('api/role-access/roles/post', {
        data: { caseId: roleAccessCaseId, caseType: 'xuiTestCaseType', jurisdiction: 'DIVORCE' },
        headers,
        throwOnError: false,
      });
      expectStatus(res.status, StatusSets.allocateRole);
      assertRoleAssignmentsIfPresent(res.status, res.data);
    });
  });

  test('role access confirm rejects case officer without solicitor role', async ({ apiClientFor }, testInfo) => {
    if (!hasCaseOfficer) {
      testInfo.annotations.push({
        type: 'notice',
        description: 'Case officer not configured for this environment.',
      });
      expect(hasCaseOfficer).toBe(false);
      return;
    }
    try {
      const client = await apiClientFor('caseOfficer_r1');
      const res = await client.post('api/role-access/allocate-role/confirm', {
        data: { caseId: roleAccessCaseId, caseType: 'xuiTestCaseType', jurisdiction: 'DIVORCE' },
        throwOnError: false,
      });
      expectStatus(res.status, [401, 403, 500]);
    } catch (error) {
      if (error instanceof AuthenticationError) {
        testInfo.annotations.push({
          type: 'notice',
          description: `Skipping case-officer role check in ${config.testEnv}: ${error.message}`,
        });
        test.skip(true, `caseOfficer_r1 cannot authenticate in ${config.testEnv}`);
        return;
      }
      throw error;
    }
  });

  test('role access confirm returns guarded status for stale session', async () => {
    const statePath = await ensureStorageState('solicitor');
    const raw = await fs.readFile(statePath, 'utf8');
    const state = JSON.parse(raw);
    const expiredCookies = buildExpiredCookies(state);

    const ctx = await request.newContext({
      baseURL: config.baseUrl.replace(/\/+$/, ''),
      ignoreHTTPSErrors: true,
      storageState: { cookies: expiredCookies as any, origins: [] },
    });
    const res = await ctx.post('api/role-access/allocate-role/confirm', {
      data: { caseId: roleAccessCaseId },
      failOnStatusCode: false,
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
            throwOnError: false,
          })
        ),
      { retries: 1, retryStatuses: [502, 504] }
    );
    expectStatus(res.status, StatusSets.allocateRole);
    assertManageLabellingResponse(res.status, res.data);
  });
});

test.describe('Search/refdata helper coverage', () => {
  test('assertGlobalSearchServices covers results and empty', () => {
    assertGlobalSearchServices(200, [{ serviceId: 'svc', serviceName: 'Service' }]);
    assertGlobalSearchServices(200, []);
    assertGlobalSearchServices(401, []);
  });

  test('assertGlobalSearchResults covers populated and empty results', () => {
    assertGlobalSearchResults(200, { results: [{ caseReference: '1234' }] });
    assertGlobalSearchResults(200, { results: [] });
    assertGlobalSearchResults(401, undefined);
  });

  test('assertSearchCasesResponse covers shaped and stubbed payloads', () => {
    assertSearchCasesResponse(200, { total: 1, cases: [{ id: 'case-1' }] });
    assertSearchCasesResponse(200, { foo: 'bar' });
    assertSearchCasesResponse(500, undefined);
  });

  test('assertSupportedJurisdictions covers string arrays', () => {
    assertSupportedJurisdictions(200, ['IA']);
    assertSupportedJurisdictions(200, []);
    assertSupportedJurisdictions(403, undefined);
  });

  test('assertLocationsResponse covers list and non-list payloads', () => {
    assertLocationsResponse(200, [{ epimms_id: '123' }]);
    assertLocationsResponse(200, []);
    assertLocationsResponse(401, undefined);
  });

  test('assertStaffRefDataResponse covers staff payloads', () => {
    assertStaffRefDataResponse(200, { staff: [{ known_as: 'Name', email_id: 'a@b.com' }] });
    assertStaffRefDataResponse(200, { staff: [] });
    assertStaffRefDataResponse(200, { staff: { name: 'Not array' } });
    assertStaffRefDataResponse(400, {});
  });

  test('assertMyAccessCount handles number and object responses', () => {
    assertMyAccessCount(200, 1);
    assertMyAccessCount(200, { count: 2 });
    assertMyAccessCount(200, { value: 'unknown' });
    assertMyAccessCount(401, undefined);
  });

  test('assertRoleAccessGetResponse handles array and container shapes', () => {
    assertRoleAccessGetResponse(200, [{ roleCategory: 'LEGAL', roleName: 'role' }]);
    assertRoleAccessGetResponse(200, { roleAssignmentResponse: [{ roleCategory: 'LEGAL', roleName: 'role' }] });
    assertRoleAccessGetResponse(200, []);
    assertRoleAccessGetResponse(200, { roleAssignmentResponse: [] });
    assertRoleAccessGetResponse(200, {});
    assertRoleAccessGetResponse(403, undefined);
  });

  test('assertValidRolesResponse handles roles array', () => {
    assertValidRolesResponse(200, [{ roleId: 'id', roleName: 'name' }]);
    assertValidRolesResponse(200, []);
    assertValidRolesResponse(400, undefined);
  });

  test('assertRoleAccessByCaseIdResponse handles roleAssignmentResponse', () => {
    assertRoleAccessByCaseIdResponse(200, { roleAssignmentResponse: [{ roleCategory: 'LEGAL', roleName: 'role' }] });
    assertRoleAccessByCaseIdResponse(200, { roleAssignmentResponse: [] });
    assertRoleAccessByCaseIdResponse(200, { roleAssignmentResponse: {} });
    assertRoleAccessByCaseIdResponse(500, undefined);
  });

  test('assertManageLabellingResponse handles guarded and success statuses', () => {
    assertManageLabellingResponse(200, [{ roleCategory: 'LEGAL', roleName: 'role' }]);
    assertManageLabellingResponse(403, undefined);
  });

  test('assertRoleAssignmentsIfPresent handles success and empty arrays', () => {
    assertRoleAssignmentsIfPresent(200, [{ roleCategory: 'LEGAL', roleName: 'role' }]);
    assertRoleAssignmentsIfPresent(201, [{ roleCategory: 'LEGAL', roleName: 'role' }]);
    assertRoleAssignmentsIfPresent(200, []);
    assertRoleAssignmentsIfPresent(400, undefined);
  });

  test('applyExpiredCookies handles empty and populated arrays', async () => {
    let calls = 0;
    const ctx = {
      storageState: async () => {
        calls += 1;
      },
    };
    await applyExpiredCookies(ctx, []);
    expect(calls).toBe(0);
    await applyExpiredCookies(ctx, [{ name: 'cookie', value: '1', expires: 0 }]);
    expect(calls).toBe(1);
  });

  test('buildExpiredCookies handles missing cookies', () => {
    expect(buildExpiredCookies({ cookies: [{ name: 'c', value: '1', expires: 0 }] })).toHaveLength(1);
    expect(buildExpiredCookies({})).toEqual([]);
  });
});
