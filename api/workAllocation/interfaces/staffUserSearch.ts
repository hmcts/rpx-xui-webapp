export const STAFF_USER_ROLE_CATEGORIES = ['ADMIN', 'CTSC', 'LEGAL_OPERATIONS', 'JUDICIAL'] as const;

export type StaffUserRoleCategory = typeof STAFF_USER_ROLE_CATEGORIES[number];

export interface StaffUserSearchRequest {
  searchTerm: string;
  caseType: string;
  jurisdiction: string;
  roleCategories: StaffUserRoleCategory[];
}

export interface StaffUserSearchResult {
  idamId: string;
  displayName: string;
  emailId?: string;
}

export enum StaffUserSearchErrorCode {
  INVALID_SEARCH_TERM = 'INVALID_SEARCH_TERM',
  INVALID_SEARCH_CONTEXT = 'INVALID_SEARCH_CONTEXT',
  INVALID_ROLE_CATEGORIES = 'INVALID_ROLE_CATEGORIES',
}

export type StaffUserSearchRequestValidationResult =
  | { valid: true; request: StaffUserSearchRequest }
  | { valid: false; errorCode: StaffUserSearchErrorCode };

export function validateStaffUserSearchRequest(request: unknown): StaffUserSearchRequestValidationResult {
  if (!isRecord(request)) {
    return invalidRequest(StaffUserSearchErrorCode.INVALID_SEARCH_TERM);
  }

  const searchTerm = normaliseRequiredString(request.searchTerm);
  if (!searchTerm || searchTerm.length < 3) {
    return invalidRequest(StaffUserSearchErrorCode.INVALID_SEARCH_TERM);
  }

  const caseType = normaliseRequiredString(request.caseType);
  const jurisdiction = normaliseRequiredString(request.jurisdiction);
  if (!caseType || !jurisdiction) {
    return invalidRequest(StaffUserSearchErrorCode.INVALID_SEARCH_CONTEXT);
  }

  if (!isStaffUserRoleCategories(request.roleCategories)) {
    return invalidRequest(StaffUserSearchErrorCode.INVALID_ROLE_CATEGORIES);
  }

  return {
    valid: true,
    request: {
      searchTerm,
      caseType,
      jurisdiction,
      roleCategories: request.roleCategories,
    },
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function normaliseRequiredString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function isStaffUserRoleCategories(value: unknown): value is StaffUserRoleCategory[] {
  return Array.isArray(value)
    && value.length > 0
    && value.every((roleCategory) => STAFF_USER_ROLE_CATEGORIES.includes(roleCategory));
}

function invalidRequest(errorCode: StaffUserSearchErrorCode): StaffUserSearchRequestValidationResult {
  return { valid: false, errorCode };
}
