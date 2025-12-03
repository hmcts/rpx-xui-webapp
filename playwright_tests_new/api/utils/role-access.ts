import { withXsrf } from './apiTestUtils';
import { extractCaseShareEntries } from './types';

/**
 * Attempts to derive a role-access caseId using the caseshare API.
 * Returns undefined if none found.
 */
export async function seedRoleAccessCaseId(apiClient: any): Promise<string | undefined> {
  try {
    return await withXsrf('solicitor', async (headers) => {
      const res = await apiClient.get('caseshare/cases', { headers, throwOnError: false });
      const cases = extractCaseShareEntries(res.data as any, 'cases');
      const first = Array.isArray(cases) && cases.length > 0 ? (cases[0] as any) : undefined;
      const id = first?.caseId ?? first?.case_id;
      return typeof id === 'string' && id.trim().length > 0 ? id : undefined;
    });
  } catch {
    return undefined;
  }
}
