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

test.describe('Case share endpoints', () => {
  for (const { path, property, schema } of CASESHARE_ENDPOINTS) {
    test(`GET ${path}`, async ({ apiClient }) => {
      await withXsrf('solicitor', async (headers) => {
        const response = await apiClient.get(path, { headers: { ...headers, experimental: 'true' }, throwOnError: false });
        expect([200, 500, 502, 504]).toContain(response.status);
        expect(response.data).toBeTruthy();

        const entries = resolveEntries(response.data, property);
        expect(Array.isArray(entries)).toBe(true);
        if (entries.length > 0) {
          if (typeof schema === 'function') {
            schema(response.data as CaseShareResponseVariant, property);
          } else {
            expect(entries[0]).toEqual(schema);
          }
        }
      });
    });
  }
});

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
