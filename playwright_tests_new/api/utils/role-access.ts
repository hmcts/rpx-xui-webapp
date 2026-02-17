import { withXsrf } from './apiTestUtils';
import { extractCaseShareEntries } from './types';

/**
 * Attempts to derive a role-access caseId using the caseshare API.
 * Returns undefined if none found.
 */
type WithXsrfFn = typeof withXsrf;

export async function seedRoleAccessCaseId(
  apiClient: any,
  options: { withXsrfFn?: WithXsrfFn } = {}
): Promise<string | undefined> {
  const withXsrfFn = options.withXsrfFn ?? withXsrf;
  try {
    return await withXsrfFn('solicitor', async (headers) => {
      const res = await apiClient.get('caseshare/cases', { headers, throwOnError: false });
      const cases = extractCaseShareEntries(res.data, 'cases');
      const first = Array.isArray(cases) && cases.length > 0 ? (cases[0] as any) : undefined;
      const id = first?.caseId ?? first?.case_id;
      return typeof id === 'string' && id.trim().length > 0 ? id : undefined;
    });
  } catch {
    return undefined;
  }
}
