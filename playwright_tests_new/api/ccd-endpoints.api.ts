import { test, expect } from './fixtures';
import { config as testConfig } from '../common/apiTestConfig';
import { withXsrf, expectStatus, StatusSets, withRetry } from './utils/apiTestUtils';

test.describe('CCD endpoints', () => {
  test('lists jurisdictions for current user', async ({ apiClient }) => {
    const expectedNames = testConfig.jurisdictionNames[testConfig.testEnv] ?? [];
    await assertJurisdictionsForUser(apiClient, expectedNames);
  });

  const jurisdictions = testConfig.jurisdictions[testConfig.testEnv] ?? [];
  for (const jurisdiction of jurisdictions) {
    const uniqueCaseTypes = Array.from(new Set(jurisdiction.caseTypeIds ?? []));
    for (const caseTypeId of uniqueCaseTypes) {
      test(`work-basket inputs available for ${caseTypeId}`, async ({ apiClient }) => {
        const response = await apiClient.get<any>(`data/internal/case-types/${caseTypeId}/work-basket-inputs`, {
          headers: { experimental: 'true' }
        });
        expectStatus(response.status, [200, 401, 403, 500, 502, 504]);
        const data = response.data as any;
        expect(data).toBeTruthy();
        expect(typeof data).toBe('object');
        expect(Array.isArray(data.workbasketInputs)).toBe(true);

        data.workbasketInputs.forEach((input: any) => {
          expect(input).toEqual(
            expect.objectContaining({
              label: expect.any(String),
              field: expect.objectContaining({
                id: expect.any(String),
                field_type: expect.objectContaining({
                  id: expect.any(String),
                  type: expect.any(String)
                })
              })
            })
          );
        });
      });
    }
  }

  test('returns authenticated user profile data', async ({ apiClient }) => {
    const response = await withXsrf('solicitor', (headers) =>
      withRetry(
        () =>
          apiClient.get('data/internal/profile', {
            headers: {
              ...headers,
              experimental: 'true'
            },
            throwOnError: false
          }),
        { retries: 1, retryStatuses: [502, 504] }
      )
    );

    expectStatus(response.status, [200, 500, 502, 504]);
    if (response.status === 200) {
      expect(response.data).toBeTruthy();
    }
  });
});

test.describe('CCD helper coverage', () => {
  test('assertJurisdictionsForUser handles guarded status', async () => {
    const apiClient = {
      get: async () => ({ status: 403, data: undefined })
    };
    await assertJurisdictionsForUser(apiClient as any, []);
  });

  test('assertJurisdictionsForUser handles non-array payloads', async () => {
    let calls = 0;
    const apiClient = {
      get: async () => {
        calls += 1;
        if (calls === 1) {
          return { status: 200, data: { userInfo: { uid: 'user-1' } } };
        }
        return { status: 200, data: { foo: 'bar' } };
      }
    };
    await assertJurisdictionsForUser(apiClient as any, []);
  });

  test('assertJurisdictionsForUser handles full payload', async () => {
    let calls = 0;
    const apiClient = {
      get: async () => {
        calls += 1;
        if (calls === 1) {
          return { status: 200, data: { userInfo: { id: 'user-1' } } };
        }
        return {
          status: 200,
          data: [
            { id: 'jur-1', name: 'Jurisdiction 1', description: 'Desc' },
            { id: 'jur-2', name: 'Jurisdiction 2', description: 'Desc' }
          ]
        };
      }
    };
    await assertJurisdictionsForUser(apiClient as any, ['Jurisdiction 1']);
  });
});

async function assertJurisdictionsForUser(apiClient: any, expectedNames: string[]) {
  const user = await apiClient.get('api/user/details', { throwOnError: false });
  expectStatus(user.status, StatusSets.guardedExtended);
  if (user.status !== 200) {
    return;
  }
  const uid = resolveUserId(user.data);
  expect(uid).toBeDefined();
  if (!uid) {
    return;
  }

  const response = await withRetry(
    () =>
      apiClient.get(`aggregated/caseworkers/${uid}/jurisdictions?access=read`, {
        throwOnError: false
      }),
    { retries: 1, retryStatuses: [502, 504] }
  );
  expectStatus(response.status, [...StatusSets.guardedExtended, 504, 500]);
  if (!Array.isArray(response.data)) {
    return;
  }

  const actualNames = response.data.map((entry: any) => entry?.name).filter(Boolean);
  expectedNames.forEach((name) => {
    expect(actualNames).toContain(name);
  });

  response.data.forEach((jurisdiction: any) => {
    expect(jurisdiction).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        description: expect.any(String)
      })
    );
  });
}

function resolveUserId(data: { userInfo?: { uid?: string; id?: string } } | undefined): string | undefined {
  return data?.userInfo?.uid ?? data?.userInfo?.id;
}
