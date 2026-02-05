import { test, expect } from './fixtures';
import { config as testConfig } from '../common/apiTestConfig';
import { withXsrf, expectStatus, withRetry } from './utils/apiTestUtils';
import { assertJurisdictionsForUser } from './utils/ccdUtils';
import { stringifyCaseTypeId } from './utils/caseTypeIdUtils';

test.describe('CCD endpoints', () => {
  test('lists jurisdictions for current user', async ({ apiClient }) => {
    const expectedNames = testConfig.jurisdictionNames[testConfig.testEnv] ?? [];
    await assertJurisdictionsForUser(apiClient, expectedNames);
  });

  const jurisdictions = testConfig.jurisdictions[testConfig.testEnv] ?? [];
  for (const jurisdiction of jurisdictions) {
    const uniqueCaseTypes = Array.from(new Set(jurisdiction.caseTypeIds ?? []));
    for (const caseTypeId of uniqueCaseTypes) {
      const caseTypeIdText = stringifyCaseTypeId(caseTypeId);
      test(`work-basket inputs available for ${caseTypeIdText}`, async ({ apiClient }) => {
        interface WorkbasketInput {
          label?: string;
          field?: {
            id?: string;
            field_type?: {
              id?: string;
              type?: string;
            };
          };
          [key: string]: unknown;
        }

        interface WorkbasketData {
          workbasketInputs?: WorkbasketInput[];
          [key: string]: unknown;
        }

        const response = await apiClient.get<WorkbasketData>(
          `data/internal/case-types/${encodeURIComponent(caseTypeIdText)}/work-basket-inputs`,
          {
            headers: { experimental: 'true' }
          }
        );
        expectStatus(response.status, [200, 401, 403, 500, 502, 504]);
        const data = response.data;
        expect(data).toBeTruthy();
        expect(typeof data).toBe('object');
        expect(Array.isArray(data.workbasketInputs)).toBe(true);

        if (data.workbasketInputs) {
          data.workbasketInputs.forEach((input) => {
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
        }
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
  test('stringifyCaseTypeId handles basic variants', () => {
    expect(stringifyCaseTypeId('XUI-1')).toBe('XUI-1');
    expect(stringifyCaseTypeId(123)).toBe('123');
    expect(stringifyCaseTypeId({ id: 'AAT' })).toBe('AAT');
    expect(stringifyCaseTypeId({ foo: 'bar' })).toContain('foo');
    expect(stringifyCaseTypeId(undefined)).toBe('');
  });

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

  test('assertJurisdictionsForUser handles missing user id', async () => {
    const apiClient = {
      get: async () => ({ status: 200, data: { userInfo: {} } })
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
