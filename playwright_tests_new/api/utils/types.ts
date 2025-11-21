// Shared, permissive interfaces for API payloads used in Playwright tests.
// Fields are optional to avoid brittleness across environments.

export interface UserInfo {
  uid?: string;
  id?: string;
  roles?: string[];
  email?: string;
  given_name?: string;
  family_name?: string;
  [key: string]: unknown;
}

export interface UserDetailsResponse {
  userInfo?: UserInfo;
  roleAssignmentInfo?: RoleAssignment[];
  canShareCases?: boolean;
  sessionTimeout?: {
    idleModalDisplayTime?: number;
    pattern?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface Task {
  id?: string;
  task_state?: string;
  state?: string;
  assignee?: string | null;
  assigned_to?: string | null;
  [key: string]: unknown;
}

export interface TaskListResponse {
  tasks?: Task[];
  total_records?: number;
  [key: string]: unknown;
}

export interface RoleAssignment {
  roleCategory?: string;
  roleName?: string;
  roleId?: string;
  actorId?: string;
  actions?: unknown[];
  [key: string]: unknown;
}

export interface RoleAssignmentContainer {
  roleAssignmentResponse?: RoleAssignment[];
  [key: string]: unknown;
}

export interface CaseShareOrganisation {
  organisationIdentifier?: string;
  name?: string;
  [key: string]: unknown;
}

export interface CaseShareUser {
  userIdentifier?: string;
  email?: string;
  [key: string]: unknown;
}

export interface CaseShareCase {
  caseId?: string;
  sharedWith?: unknown[];
  [key: string]: unknown;
}

export interface CaseShareResponseVariant {
  organisations?: CaseShareOrganisation[];
  users?: CaseShareUser[];
  cases?: CaseShareCase[];
  sharedCases?: CaseShareCase[];
  payload?: CaseShareResponseVariant;
  [key: string]: unknown;
}

export interface AddressLookupResponse {
  results?: Array<{
    DPA?: {
      POSTCODE?: string;
      ADDRESS?: string;
      POST_TOWN?: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  }>;
  header?: unknown;
  [key: string]: unknown;
}

export function isTaskList(payload: unknown): payload is TaskListResponse {
  return !!payload && typeof payload === 'object' && Array.isArray((payload as any).tasks);
}

export function isAddressLookup(payload: unknown): payload is AddressLookupResponse {
  return !!payload && typeof payload === 'object' && Array.isArray((payload as any).results);
}

export function extractCaseShareEntries(payload: CaseShareResponseVariant, property: string): unknown[] {
  if (!payload || typeof payload !== 'object') return [];
  const direct = (payload as any)[property];
  if (Array.isArray(direct)) return direct;
  const nested = (payload as any).payload;
  if (nested && typeof nested === 'object' && Array.isArray((nested as any)[property])) {
    return (nested as any)[property];
  }
  return [];
}
