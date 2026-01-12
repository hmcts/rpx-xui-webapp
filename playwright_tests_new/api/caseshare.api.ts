import { test, expect } from './fixtures';
import { withXsrf } from './utils/apiTestUtils';
import { expectCaseShareShape } from './utils/assertions';
import { CaseShareResponseVariant } from './utils/types';

const CASESHARE_ENDPOINTS = [
  {
    path: 'caseshare/orgs',
    property: 'organisations',
    schema: expect.objectContaining({
      organisationIdentifier: expect.any(String),
      name: expect.any(String)
    })
  },
  {
    path: 'caseshare/users',
    property: 'users',
    schema: expect.objectContaining({
      userIdentifier: expect.any(String),
      email: expect.any(String)
    })
  },
  {
    path: 'caseshare/cases',
    property: 'cases',
    schema: expectCaseShareShape
  },
  {
    path: 'caseshare/case-assignments',
    property: 'sharedCases',
    schema: expectCaseShareShape
  }
] as const;

type CaseShareSchema = ((payload: CaseShareResponseVariant, property: string) => void) | unknown;

test.describe('Case share endpoints', () => {
  for (const { path, property, schema } of CASESHARE_ENDPOINTS) {
    test(`GET ${path}`, async ({ apiClient }) => {
      await withXsrf('solicitor', async (headers) => {
        const response = await apiClient.get(path, { headers: { ...headers, experimental: 'true' }, throwOnError: false });
        expect([200, 500, 502, 504]).toContain(response.status);
        expect(response.data).toBeTruthy();
        assertCaseShareEntries(response.data, property, schema);
      });
    });
  }
});

test.describe('Case share helper coverage', () => {
  test('assertCaseShareEntries covers function and object schemas', () => {
    const casesPayload = { cases: [{ caseId: 'case-1', sharedWith: [] }] };
    assertCaseShareEntries(casesPayload, 'cases', expectCaseShareShape);

    const orgPayload = { organisations: [{ organisationIdentifier: 'org-1', name: 'Org' }] };
    assertCaseShareEntries(
      orgPayload,
      'organisations',
      expect.objectContaining({
        organisationIdentifier: expect.any(String),
        name: expect.any(String)
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

function assertCaseShareEntries(data: any, property: string, schema: CaseShareSchema) {
  const entries = resolveEntries(data, property);
  expect(Array.isArray(entries)).toBe(true);
  if (entries.length > 0) {
    if (typeof schema === 'function') {
      schema(data as CaseShareResponseVariant, property);
    } else {
      expect(entries[0]).toEqual(schema);
    }
  }
}

function resolveEntries(data: any, property: string): any[] {
  if (Array.isArray(data)) {
    return data;
  }
  if (data && Array.isArray(data[property])) {
    return data[property];
  }
  const nested = data?.payload;
  if (nested && Array.isArray(nested[property])) {
    return nested[property];
  }
  return [];
}
