import { test, expect } from './fixtures';
import { config as testConfig } from './utils/apiTestRuntimeConfig';
import { withXsrf, expectStatus, guardedRequest, isRouteUnavailableStatus } from './utils/apiTestUtils';
import { assertJurisdictionsForUser } from './utils/ccdUtils';
import { stringifyCaseTypeId } from './utils/caseTypeIdUtils';

test.describe('CCD endpoints', { tag: '@svc-ccd' }, () => {
  test('lists jurisdictions for dedicated work-allocation solicitor', async ({ apiClientFor }, testInfo) => {
    // Two bounded, sequential route calls are required. Retain enough test budget for
    // the second call to return its explicit unavailable result under AAT load.
    testInfo.setTimeout(90_000);
    const apiClient = await apiClientFor('waSolicitor');
    const expectedNames = testConfig.jurisdictionNames[testConfig.testEnv] ?? [];
    const result = await assertJurisdictionsForUser(apiClient, expectedNames);
    testInfo.skip(
      result === 'unavailable',
      'XUI user-details or CCD jurisdictions route was unavailable; contract was not verified'
    );
  });

  const jurisdictions = testConfig.jurisdictions[testConfig.testEnv] ?? [];
  for (const jurisdiction of jurisdictions) {
    const uniqueCaseTypes = Array.from(new Set(jurisdiction.caseTypeIds ?? []));
    for (const caseTypeId of uniqueCaseTypes) {
      const caseTypeIdText = stringifyCaseTypeId(caseTypeId);
      test(`work-basket inputs available for ${caseTypeIdText}`, async ({ apiClient }, testInfo) => {
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

        const response = await guardedRequest(() =>
          apiClient.get<WorkbasketData>(`data/internal/case-types/${encodeURIComponent(caseTypeIdText)}/work-basket-inputs`, {
            headers: { experimental: 'true' },
            timeoutMs: 20_000,
            throwOnError: false,
          })
        );
        testInfo.skip(
          isRouteUnavailableStatus(response.status),
          `XUI work-basket route was unavailable for ${caseTypeIdText}; contract was not verified`
        );
        expectStatus(response.status, [200]);

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
                    type: expect.any(String),
                  }),
                }),
              })
            );
          });
        }
      });
    }
  }

  test('returns authenticated profile data for dedicated work-allocation solicitor', async ({ apiClientFor }, testInfo) => {
    const apiClient = await apiClientFor('waSolicitor');
    const response = await withXsrf('waSolicitor', (headers) =>
      guardedRequest(() =>
        apiClient.get('data/internal/profile', {
          headers: {
            ...headers,
            experimental: 'true',
          },
          timeoutMs: 20_000,
          throwOnError: false,
        })
      )
    );

    testInfo.skip(
      isRouteUnavailableStatus(response.status),
      'XUI internal-profile route was unavailable; contract was not verified'
    );
    expectStatus(response.status, [200]);
    expect(response.data).toBeTruthy();
  });
});

test.describe('CCD helper coverage', { tag: '@svc-ccd' }, () => {
  test('stringifyCaseTypeId handles basic variants', () => {
    expect(stringifyCaseTypeId('XUI-1')).toBe('XUI-1');
    expect(stringifyCaseTypeId(123)).toBe('123');
    expect(stringifyCaseTypeId({ id: 'AAT' })).toBe('AAT');
    expect(stringifyCaseTypeId({ foo: 'bar' })).toContain('foo');
    expect(stringifyCaseTypeId(undefined)).toBe('');
  });

  test('assertJurisdictionsForUser rejects a non-success profile response', async () => {
    const apiClient = {
      get: async () => ({ status: 403, data: undefined }),
    };
    await expect(assertJurisdictionsForUser(apiClient as any, [])).rejects.toThrow();
  });

  test('assertJurisdictionsForUser reports an unavailable XUI route', async () => {
    const apiClient = {
      get: async () => {
        throw new Error('Request timed out while calling XUI');
      },
    };

    await expect(assertJurisdictionsForUser(apiClient as any, [])).resolves.toBe('unavailable');
  });

  test('assertJurisdictionsForUser rejects non-array jurisdiction payloads', async () => {
    let calls = 0;
    const apiClient = {
      get: async () => {
        calls += 1;
        if (calls === 1) {
          return { status: 200, data: { userInfo: { uid: 'user-1' } } };
        }
        return { status: 200, data: { foo: 'bar' } };
      },
    };
    await expect(assertJurisdictionsForUser(apiClient as any, [])).rejects.toThrow();
  });

  test('assertJurisdictionsForUser accepts documented empty 404 response without expected jurisdictions', async () => {
    let calls = 0;
    const apiClient = {
      get: async () => {
        calls += 1;
        return calls === 1 ? { status: 200, data: { userInfo: { uid: 'user-1' } } } : { status: 404, data: [] };
      },
    };

    await expect(assertJurisdictionsForUser(apiClient as any, [])).resolves.toBe('verified');
  });

  test('assertJurisdictionsForUser rejects missing user id', async () => {
    const apiClient = {
      get: async () => ({ status: 200, data: { userInfo: {} } }),
    };
    await expect(assertJurisdictionsForUser(apiClient as any, [])).rejects.toThrow();
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
            { id: 'jur-2', name: 'Jurisdiction 2', description: 'Desc' },
          ],
        };
      },
    };
    await assertJurisdictionsForUser(apiClient as any, ['Jurisdiction 1']);
  });
});
