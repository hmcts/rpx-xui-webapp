import { withXsrf } from './apiTestUtils';
import { ROLE_ACCESS_CASE_ID, resolveRoleAccessCaseId } from '../data/testIds';
import { extractCaseShareEntries } from './types';

/**
 * Attempts to derive a role-access caseId using the caseshare API.
 * Returns undefined if none found.
 */
type WithXsrfFn = typeof withXsrf;

export async function seedRoleAccessCaseId(
  apiClient: any,
  options: { withXsrfFn?: WithXsrfFn; caseId?: string } = {}
): Promise<string | undefined> {
  const withXsrfFn = options.withXsrfFn ?? withXsrf;
  const candidateCaseId = options.caseId ?? ROLE_ACCESS_CASE_ID;
  if (!candidateCaseId) {
    return undefined;
  }
  try {
    return await withXsrfFn('solicitor', async (headers) => {
      const caseId = resolveRoleAccessCaseId(candidateCaseId);
      const res = await apiClient.get('api/caseshare/cases', {
        headers,
        query: { case_ids: caseId },
        throwOnError: false,
      });
      const cases = extractCaseShareEntries(res.data, 'cases');
      const first = Array.isArray(cases) && cases.length > 0 ? (cases[0] as any) : undefined;
      const id = first?.caseId ?? first?.case_id;
      return typeof id === 'string' && id.trim().length > 0 ? id : undefined;
    });
  } catch {
    return undefined;
  }
}
