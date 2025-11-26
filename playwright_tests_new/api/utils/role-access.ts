import { withXsrf } from './apiTestUtils';
import { ROLE_ASSIGNEE_ID, ROLE_ASSIGNEE_ALT_ID, ROLE_ACCESS_CASE_ID } from '../data/testIds';
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

export interface SeededRoleAccessData {
  caseId?: string;
  assigneeId?: string;
}

/**
 * Attempts to derive a caseId and assigneeId for role-access happy paths.
 * Best-effort: tries tasks, then searchCases, and uses current user or first caseworker as assignee.
 */
export async function seedRoleAccessData(apiClient: any): Promise<SeededRoleAccessData> {
  const data: SeededRoleAccessData = {};
  const tryPaths = async (fns: Array<() => Promise<void>>) => {
    for (const fn of fns) {
      try {
        await fn();
        if (data.caseId && data.assigneeId) {
          return;
        }
      } catch {
        // ignore and continue
      }
    }
  };

  try {
    // Current user
    const userRes = await apiClient.get<{ userInfo?: { uid?: string; id?: string } }>('api/user/details', {
      throwOnError: false
    });
    const userId = userRes.status === 200 ? userRes.data?.userInfo?.id ?? userRes.data?.userInfo?.uid : undefined;
    data.assigneeId = userId;
  } catch {
    // ignore
  }

  await tryPaths([
    // Try searchCases first (CCD)
    async () => {
      const searchRes = await apiClient.post<any>('data/internal/searchCases?ctid=xuiTestCaseType', {
        data: { size: 5, from: 0, sort: [], native_es_query: { match_all: {} } },
        throwOnError: false
      });
      const caseHit =
        searchRes.status === 200 && Array.isArray(searchRes.data?.cases) && searchRes.data.cases.length > 0
          ? searchRes.data.cases[0]
          : undefined;
      const ref = caseHit?.reference ?? caseHit?.caseReference ?? caseHit?.id;
      if (typeof ref === 'string') {
        data.caseId = data.caseId ?? ref;
      }
    },
    // Try tasks (AllWork)
    async () => {
      const taskRes = await apiClient.post<any>('workallocation/task', {
        data: {
          searchRequest: {
            search_by: 'caseworker',
            sorting_parameters: [{ sort_by: 'dueDate', sort_order: 'asc' }],
            search_parameters: [],
            pagination_parameters: { page_number: 1, page_size: 20 }
          },
          view: 'AllWork'
        },
        throwOnError: false
      });
      const caseIdFromTask =
        taskRes.status === 200 && Array.isArray(taskRes.data?.tasks) && taskRes.data.tasks.length > 0
          ? taskRes.data.tasks[0]?.case_id ?? taskRes.data.tasks[0]?.caseId
          : undefined;
      if (caseIdFromTask) data.caseId = data.caseId ?? caseIdFromTask;
      const assignee = taskRes.status === 200 && Array.isArray(taskRes.data?.tasks) && taskRes.data.tasks.length > 0
        ? taskRes.data.tasks.find((t: any) => t?.assignee)?.assignee ?? taskRes.data.tasks[0]?.assignee
        : undefined;
      if (assignee && !data.assigneeId) data.assigneeId = assignee;
    },
    // Fallback: searchCases
    async () => {
      const searchRes = await apiClient.post<any>('data/internal/searchCases?ctid=xuiTestCaseType', {
        data: { size: 1, from: 0, sort: [], native_es_query: { match_all: {} } },
        throwOnError: false
      });
      const caseHit =
        searchRes.status === 200 && Array.isArray(searchRes.data?.cases) && searchRes.data.cases.length > 0
          ? searchRes.data.cases[0]
          : undefined;
      const ref = caseHit?.reference ?? caseHit?.caseReference ?? caseHit?.id;
      if (typeof ref === 'string') {
        data.caseId = data.caseId ?? ref;
      }
    },
    // Another caseworker as assignee
    async () => {
      const cwRes = await apiClient.get<Array<{ idamId?: string }>>('workallocation/caseworker', { throwOnError: false });
      if (cwRes.status === 200 && Array.isArray(cwRes.data) && cwRes.data.length) {
        data.assigneeId = data.assigneeId ?? cwRes.data[0]?.idamId;
      }
    }
  ]);

  // Final fallback values to avoid skips
  if (!data.caseId) data.caseId = ROLE_ACCESS_CASE_ID ?? '1234567890123456';
  if (!data.assigneeId) {
    data.assigneeId = process.env.DEFAULT_ASSIGNEE_ID ?? ROLE_ASSIGNEE_ID ?? ROLE_ASSIGNEE_ALT_ID;
  }

  return data;
}
