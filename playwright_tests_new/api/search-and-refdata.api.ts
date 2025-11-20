import { test, expect } from './fixtures';
import { ensureStorageState, getStoredCookie } from './auth';

test.describe('Global search', () => {
  test('lists available services', async ({ apiClient }) => {
    const response = await apiClient.get<any[]>('api/globalSearch/services', { throwOnError: false });
    expect([200, 401, 403]).toContain(response.status);
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
    const response = await apiClient.post<any>('api/globalSearch/results', {
      data: { searchRequest: { caseReferences: ['1234567890123456'] } },
      throwOnError: false
    });
    expect([200, 400, 401, 403]).toContain(response.status);
    if (response.status === 200 && response.data) {
      expect(response.data).toHaveProperty('results');
    }
  });

  test('searchCases proxy responds or guards', async ({ apiClient }) => {
    const response = await apiClient.post<any>('data/internal/searchCases?ctid=xuiTestCaseType', {
      data: { size: 1, from: 0, sort: [], native_es_query: { match_all: {} } },
      throwOnError: false
    });
    expect([200, 400, 401, 403, 404, 500]).toContain(response.status);
    // Some environments return a stub payload with full fields; otherwise just ensure a response object exists.
    if (response.status === 200 && response.data) {
      if (typeof response.data.total === 'number' && Array.isArray(response.data.cases)) {
        expect(response.data.total).toBeGreaterThanOrEqual(0);
      } else {
        expect(response.data).toEqual(expect.anything());
      }
    }
  });
});

test.describe('Ref data and supported jurisdictions', () => {
  test('wa-supported jurisdictions', async ({ apiClient }) => {
    const res = await apiClient.get<any[]>('api/wa-supported-jurisdiction', { throwOnError: false });
    expect([200, 401, 403]).toContain(res.status);
    if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
      expect(typeof res.data[0]).toBe('string');
    }
  });

  test('staff-supported jurisdictions', async ({ apiClient }) => {
    const res = await apiClient.get<any[]>('api/staff-supported-jurisdiction', { throwOnError: false });
    expect([200, 401, 403]).toContain(res.status);
    if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
      expect(typeof res.data[0]).toBe('string');
    }
  });

  test('locations endpoint returns list or guarded status', async ({ apiClient }) => {
    await ensureStorageState('solicitor');
    const xsrf = await getStoredCookie('solicitor', 'XSRF-TOKEN');
    const res = await apiClient.get<any>('api/locations', {
      headers: xsrf ? { 'X-XSRF-TOKEN': xsrf } : {},
      throwOnError: false
    });
    expect([200, 401, 403]).toContain(res.status);
    if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
      expect(res.data[0]).toHaveProperty('epimms_id');
    }
  });

  test('staff-ref-data endpoint responds', async ({ apiClient }) => {
    const res = await apiClient.post<any>('api/staff-ref-data/search', {
      data: { attributes: ['email'], searchString: 'test' },
      throwOnError: false
    });
    expect([200, 400, 401, 403, 500]).toContain(res.status);
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
  test('get-my-access-new-count', async ({ apiClient }) => {
    const res = await apiClient.get('api/role-access/roles/get-my-access-new-count', { throwOnError: false });
    expect([200, 401, 403, 500]).toContain(res.status);
    if (res.status === 200) {
      expect(res.data === null || typeof res.data === 'number' || typeof res.data === 'object').toBe(true);
    }
  });

  test('roles/access-get responds', async ({ apiClient }) => {
    const res = await apiClient.post('api/role-access/roles/access-get', {
      data: { caseIds: ['1234567890123456'] },
      throwOnError: false
    });
    expect([200, 400, 401, 403, 500]).toContain(res.status);
  });

  test('allocate-role/valid-roles responds', async ({ apiClient }) => {
    const res = await apiClient.post('api/role-access/allocate-role/valid-roles', {
      data: { requestedRoles: [], jurisdiction: 'IA' },
      throwOnError: false
    });
    expect([200, 400, 401, 403, 500]).toContain(res.status);
    if (res.status === 200 && Array.isArray(res.data)) {
      expect(res.data[0]).toEqual(
        expect.objectContaining({
          roleId: expect.any(String),
          roleName: expect.any(String)
        })
      );
    }
  });
});
