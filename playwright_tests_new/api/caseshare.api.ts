import { test, expect } from './fixtures';
import { withXsrf } from './utils/apiTestUtils';

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
    schema: expect.objectContaining({
      caseId: expect.any(String),
      sharedWith: expect.any(Array)
    })
  },
  {
    path: 'caseshare/case-assignments',
    property: 'sharedCases',
    schema: expect.objectContaining({
      caseId: expect.any(String),
      sharedWith: expect.any(Array)
    })
  }
] as const;

test.describe('Case share endpoints', () => {
  for (const { path, property, schema } of CASESHARE_ENDPOINTS) {
    test(`GET ${path}`, async ({ apiClient }) => {
      await withXsrf('solicitor', async (headers) => {
        const response = await apiClient.get(path, { headers: { ...headers, experimental: 'true' } });
        expect(response.status).toBe(200);
        expect(response.data).toBeTruthy();

        const entries = resolveEntries(response.data, property);
        expect(Array.isArray(entries)).toBe(true);
        if (entries.length > 0) {
          expect(entries[0]).toEqual(schema);
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
