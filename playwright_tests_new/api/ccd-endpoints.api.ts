import { test, expect } from './fixtures';
import { config as testConfig } from '../../test_codecept/integration/tests/config/config';
import { getStoredCookie, ensureStorageState } from './auth';

test.describe('CCD endpoints', () => {
  test('lists jurisdictions for current user', async ({ apiClient }) => {
    const user = await apiClient.get<any>('api/user/details', { throwOnError: false });
    expect(user.status).toBe(200);
    const uid = user.data?.userInfo?.uid ?? user.data?.userInfo?.id;
    expect(uid).toBeDefined();

    const response = await apiClient.get<any[]>(`aggregated/caseworkers/${uid}/jurisdictions?access=read`, {
      throwOnError: false
    });
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);

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
        expect(response.status).toBe(200);
        expect(response.data).toBeTruthy();
        expect(typeof response.data).toBe('object');
        expect(Array.isArray(response.data.workbasketInputs)).toBe(true);

        response.data.workbasketInputs.forEach((input) => {
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
    await ensureStorageState('solicitor');
    const xsrfToken = await getStoredCookie('solicitor', 'XSRF-TOKEN');
    if (!xsrfToken) {
      throw new Error('Unable to read XSRF token from stored session cookies.');
    }

    const response = await apiClient.get('data/internal/profile', {
      headers: {
        experimental: 'true',
        'X-XSRF-TOKEN': xsrfToken
      }
    });

    expect(response.status).toBe(200);
    expect(response.data).toBeTruthy();
  });
});
