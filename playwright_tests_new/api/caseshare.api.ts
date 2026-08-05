import { test, expect } from './fixtures';
import { ROLE_ACCESS_CASE_ID, resolveRoleAccessCaseId } from './data/testIds';
import { withXsrf } from './utils/apiTestUtils';
import { expectCaseShareShape } from './utils/assertions';
import { assertCaseShareEntries, resolveEntries } from './utils/caseShareUtils';
import { resolveHeader } from './utils/nodeAppUtils';

const configuredCaseShareCaseIds = ROLE_ACCESS_CASE_ID ? resolveRoleAccessCaseId(ROLE_ACCESS_CASE_ID) : undefined;

const CASESHARE_ENDPOINTS = [
  {
    path: 'api/caseshare/orgs',
    property: 'organisations',
    schema: expect.objectContaining({
      organisationIdentifier: expect.any(String),
      name: expect.any(String),
    }),
  },
  {
    path: 'api/caseshare/users',
    property: 'users',
    schema: expect.objectContaining({
      idamId: expect.any(String),
      email: expect.any(String),
    }),
  },
  {
    path: 'api/caseshare/cases',
    query: configuredCaseShareCaseIds ? { case_ids: configuredCaseShareCaseIds } : undefined,
    requiresConfiguredCaseIds: true,
    property: 'cases',
    schema: expect.objectContaining({
      caseId: expect.any(String),
      sharedWith: expect.any(Array),
    }),
  },
  {
    path: 'api/caseshare/case-assignments',
    query: configuredCaseShareCaseIds ? { case_ids: configuredCaseShareCaseIds } : undefined,
    requiresConfiguredCaseIds: true,
    property: 'sharedCases',
    schema: expect.objectContaining({
      caseId: expect.any(String),
      sharedWith: expect.any(Array),
    }),
  },
] as const;

test.describe('Case share endpoints', { tag: '@svc-case-share' }, () => {
  for (const { path, query, requiresConfiguredCaseIds, property, schema } of CASESHARE_ENDPOINTS) {
    test(`GET ${path} returns a usable contract`, async ({ apiClient }) => {
      await withXsrf('solicitor', async (headers) => {
        const response = await apiClient.get(path, {
          headers: { ...headers, experimental: 'true' },
          query,
          throwOnError: false,
        });
        if (requiresConfiguredCaseIds && !configuredCaseShareCaseIds) {
          expect(response.status).toBe(400);
          return;
        }

        expect(response.status).toBe(200);
        expect(response.data).toBeTruthy();
        expect(resolveHeader(response.headers, 'content-type') ?? '').toContain('application/json');
        expect(typeof response.data).not.toBe('string');
        expect(resolveEntries(response.data, property), `${path} should return ${property} entries`).not.toHaveLength(0);
        assertCaseShareEntries(response.data, property, schema);
      });
    });
  }
});

test.describe('Case share helper coverage', { tag: '@svc-case-share' }, () => {
  test('assertCaseShareEntries covers function and object schemas', () => {
    const casesPayload = { cases: [{ caseId: 'case-1', sharedWith: [] }] };
    assertCaseShareEntries(casesPayload, 'cases', expectCaseShareShape);

    const orgPayload = { organisations: [{ organisationIdentifier: 'org-1', name: 'Org' }] };
    assertCaseShareEntries(
      orgPayload,
      'organisations',
      expect.objectContaining({
        organisationIdentifier: expect.any(String),
        name: expect.any(String),
      })
    );
  });

  test('resolveEntries handles array payloads', () => {
    const data = [{ caseId: 'case-1' }];
    expect(resolveEntries(data, 'cases')).toEqual(data);
  });

  test('resolveEntries handles direct property payloads', () => {
    const data = { cases: [{ caseId: 'case-2' }] };
    expect(resolveEntries(data, 'cases')).toEqual(data.cases);
  });

  test('resolveEntries handles nested payloads', () => {
    const data = { payload: { cases: [{ caseId: 'case-3' }] } };
    expect(resolveEntries(data, 'cases')).toEqual(data.payload.cases);
  });

  test('resolveEntries handles missing payloads', () => {
    expect(resolveEntries({ foo: 'bar' }, 'cases')).toEqual([]);
    expect(resolveEntries(undefined as any, 'cases')).toEqual([]);
  });
});
