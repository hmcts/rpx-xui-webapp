export type DynamicUserIdentifier =
  | "SOLICITOR"
  | "PROD_LIKE"
  | "IAC_CaseOfficer_R2"
  | "STAFF_ADMIN";

export interface DynamicUserDefinition {
  /**
   * Identifier used inside Playwright tests (matches Codecept userIdentifier).
   */
  identifier: DynamicUserIdentifier;
  /**
   * Prefix that will be used to build the unique email & display names.
   */
  emailPrefix: string;
  /**
   * Environment variable that stores the password to assign to this persona.
   */
  passwordEnv: string;
  /**
   * Roles that will be created in SIDAM for this persona.
   */
  roleNames: string[];
  /**
   * Free text description used for logging.
   */
  description: string;
  /**
   * Fallback password when the env var is not defined.
   */
  fallbackPassword?: string;
  /**
   * Set to false to temporarily skip dynamic creation for this persona.
   */
  enableDynamic?: boolean;
  /**
   * Optional explanation logged when dynamic creation is disabled.
   */
  disableReason?: string;
}

const SOLICITOR_ROLE_NAMES = [
  "caseworker",
  "caseworker-divorce",
  "caseworker-divorce-financialremedy",
  "caseworker-divorce-financialremedy-solicitor",
  "caseworker-divorce-solicitor",
  "caseworker-ia",
  "caseworker-ia-legalrep-solicitor",
  "caseworker-probate",
  "caseworker-probate-authoriser",
  "caseworker-probate-solicitor",
  "caseworker-publiclaw",
  "caseworker-publiclaw-solicitor",
  "payments",
  "pui-caa",
  "pui-case-manager",
  "pui-finance-manager",
  "pui-organisation-manager",
  "pui-user-manager",
] as const;

const CASE_OFFICER_ROLES = [
  "caseworker",
  "caseworker-ia",
  "caseworker-ia-caseofficer",
  "caseworker-ia-admofficer",
  "task-supervisor",
  "case-allocator",
] as const;

const STAFF_ADMIN_ROLES = [
  "caseworker",
  "caseworker-ia",
  "caseworker-ia-admofficer",
  "staff-admin",
] as const;

export const dynamicUserDefinitions: Record<
  DynamicUserIdentifier,
  DynamicUserDefinition
> = {
  SOLICITOR: {
    identifier: "SOLICITOR",
    description: "Generic solicitor user for most UI journeys.",
    emailPrefix: "xui_solicitor",
    passwordEnv: "IDAM_SOLICITOR_USER_PASSWORD",
    fallbackPassword: "Password12!",
    roleNames: [...SOLICITOR_ROLE_NAMES],
    enableDynamic: false,
    disableReason:
      "Existing tests rely on seeded data for this account; dynamic creation would start with an empty profile.",
  },
  PROD_LIKE: {
    identifier: "PROD_LIKE",
    description: "Prod-like solicitor used by some regression tests.",
    emailPrefix: "xui_prod_like",
    passwordEnv: "IDAM_SOLICITOR_USER_PASSWORD",
    fallbackPassword: "Password12!",
    roleNames: [...SOLICITOR_ROLE_NAMES],
    enableDynamic: false,
    disableReason:
      "Prod-like solicitor depends on seeded cases; dynamic creation is disabled so tests can reuse the pre-populated account.",
  },
  IAC_CaseOfficer_R2: {
    identifier: "IAC_CaseOfficer_R2",
    description: "Immigration & Asylum case officer covering WA Release 2.",
    emailPrefix: "xui_iac_caseofficer_r2",
    passwordEnv: "IDAM_IAC_CASEOFFICER_PASSWORD",
    fallbackPassword: "Welcome01",
    roleNames: [...CASE_OFFICER_ROLES],
    enableDynamic: false,
    disableReason:
      "Dynamic creation disabled temporarily until IDAM testing-support allows WA role provisioning.",
  },
  STAFF_ADMIN: {
    identifier: "STAFF_ADMIN",
    description: "Staff admin persona for staff UI smoke tests.",
    emailPrefix: "xui_staff_admin",
    passwordEnv: "IDAM_STAFF_ADMIN_PASSWORD",
    fallbackPassword: "Welcome01",
    roleNames: [...STAFF_ADMIN_ROLES],
  },
  POC_SOLICITOR: {
    identifier: "POC_SOLICITOR",
    description: "Standalone solicitor reserved for the dynamic-user POC test.",
    emailPrefix: "xui_poc_solicitor",
    passwordEnv: "IDAM_SOLICITOR_USER_PASSWORD",
    fallbackPassword: "Password12!",
    roleNames: [...SOLICITOR_ROLE_NAMES],
  },
};

export function getDynamicUserDefinition(
  identifier: string
): DynamicUserDefinition | undefined {
  if (identifier in dynamicUserDefinitions) {
    return dynamicUserDefinitions[identifier as DynamicUserIdentifier];
  }
  return undefined;
}

export function listDynamicIdentifiers(): DynamicUserIdentifier[] {
  return Object.keys(dynamicUserDefinitions) as DynamicUserIdentifier[];
}
