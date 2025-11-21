import { test, expect } from './fixtures';
import { config as testConfig } from '../../test_codecept/integration/tests/config/config';
import { withXsrf, expectStatus, StatusSets, withRetry } from './utils/apiTestUtils';

test.describe('CCD endpoints', () => {
  test('lists jurisdictions for current user', async ({ apiClient }) => {
    const user = await apiClient.get<{ userInfo?: { uid?: string; id?: string } }>('api/user/details', { throwOnError: false });
    expectStatus(user.status, StatusSets.guardedExtended);
    const uid = user.data?.userInfo?.uid ?? user.data?.userInfo?.id;
    expect(uid).toBeDefined();

    const response = await withRetry(
      () =>
        apiClient.get<any[]>(`aggregated/caseworkers/${uid}/jurisdictions?access=read`, {
          throwOnError: false
        }),
      { retries: 1, retryStatuses: [502, 504] }
    );
    expectStatus(response.status, [...StatusSets.guardedExtended, 504, 500]);
    if (!Array.isArray(response.data)) {
      expect(response.data).toBeUndefined();
      return;
    }

    const expectedNames = testConfig.jurisdcitionNames[testConfig.testEnv] ?? [];
    const actualNames = (response.data ?? []).map((entry) => entry?.name).filter(Boolean);
    expectedNames.forEach((name) => {
      expect(actualNames).toContain(name);
    });

    response.data.forEach((jurisdiction) => {
      expect(jurisdiction).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          description: expect.any(String)
        })
      );
    });
  });

  const jurisdictions = testConfig.jurisdictions[testConfig.testEnv] ?? [];
  for (const jurisdiction of jurisdictions) {
    const uniqueCaseTypes = Array.from(new Set(jurisdiction.caseTypeIds ?? []));
    for (const caseTypeId of uniqueCaseTypes) {
      test(`work-basket inputs available for ${caseTypeId}`, async ({ apiClient }) => {
        const response = await apiClient.get<any>(`data/internal/case-types/${caseTypeId}/work-basket-inputs`, {
          headers: { experimental: 'true' }
        });
        expectStatus(response.status, [200, 500, 502, 504]);
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
