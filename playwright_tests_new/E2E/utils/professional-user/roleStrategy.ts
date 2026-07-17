export const DEFAULT_SOLICITOR_ROLE_PROFILE = 'minimal';

export const MINIMAL_SOLICITOR_ROLE_NAMES = [
  'caseworker',
  'caseworker-privatelaw',
  'caseworker-privatelaw-solicitor',
  'pui-case-manager',
] as const;

export const ORG_ADMIN_SOLICITOR_ROLE_NAMES = [...MINIMAL_SOLICITOR_ROLE_NAMES, 'pui-organisation-manager'] as const;

export const EXTENDED_SOLICITOR_ROLE_NAMES = [
  ...ORG_ADMIN_SOLICITOR_ROLE_NAMES,
  'pui-user-manager',
  'pui-caa',
  'payments',
] as const;

export const SOLICITOR_ROLE_NAMES = MINIMAL_SOLICITOR_ROLE_NAMES;

export const DIVORCE_EXTERNAL_CORE_SOLICITOR_ROLE_NAMES = [
  'caseworker',
  'caseworker-divorce',
  'caseworker-divorce-financialremedy',
  'caseworker-divorce-financialremedy-solicitor',
  'pui-case-manager',
] as const;

export const DIVORCE_EXTERNAL_NOC_SOLICITOR_ROLE_NAMES = [
  ...DIVORCE_EXTERNAL_CORE_SOLICITOR_ROLE_NAMES,
  'caseworker-divorce-solicitor',
] as const;

export const DIVORCE_EXTERNAL_SOLICITOR_ROLE_NAMES = DIVORCE_EXTERNAL_CORE_SOLICITOR_ROLE_NAMES;

export const EMPLOYMENT_EXTERNAL_CORE_SOLICITOR_ROLE_NAMES = [
  'caseworker',
  'caseworker-employment',
  'caseworker-employment-legalrep-solicitor',
  'pui-case-manager',
] as const;

export const SOLICITOR_ROLE_NAMES_BY_JURISDICTION = {
  prl: MINIMAL_SOLICITOR_ROLE_NAMES,
  divorce: DIVORCE_EXTERNAL_SOLICITOR_ROLE_NAMES,
  finrem: DIVORCE_EXTERNAL_SOLICITOR_ROLE_NAMES,
  probate: ['caseworker', 'caseworker-probate', 'caseworker-probate-solicitor', 'pui-case-manager'],
  ia: ['caseworker', 'caseworker-ia', 'caseworker-ia-legalrep-solicitor', 'pui-case-manager'],
  publiclaw: ['caseworker', 'caseworker-publiclaw', 'caseworker-publiclaw-solicitor', 'pui-case-manager'],
  civil: ['caseworker', 'caseworker-civil', 'caseworker-civil-solicitor', 'pui-case-manager'],
  employment: EMPLOYMENT_EXTERNAL_CORE_SOLICITOR_ROLE_NAMES,
} as const;

export const SOLICITOR_ROLE_AUGMENT_BY_TEST_TYPE = {
  provisioning: [],
  'case-create': [],
  'manage-org': ['pui-organisation-manager', 'pui-user-manager', 'pui-caa'],
  'invite-user': ['pui-user-manager', 'pui-caa'],
  finance: ['pui-finance-manager'],
  'full-access': ['pui-organisation-manager', 'pui-user-manager', 'pui-caa', 'pui-finance-manager', 'payments'],
} as const;

export const CASEWORKER_DIVORCE_ROLE_NAMES = [
  'caseworker',
  'caseworker-divorce',
  'caseworker-divorce-judge',
  'caseworker-divorce-courtadmin-la',
  'caseworker-divorce-superuser',
] as const;

const SOLICITOR_ROLE_PROFILES = {
  minimal: MINIMAL_SOLICITOR_ROLE_NAMES,
  'org-admin': ORG_ADMIN_SOLICITOR_ROLE_NAMES,
  extended: EXTENDED_SOLICITOR_ROLE_NAMES,
} as const satisfies Record<SolicitorRoleProfile, readonly string[]>;

const SOLICITOR_ROLE_PROFILE_AUGMENT = {
  minimal: [],
  'org-admin': ['pui-organisation-manager'],
  extended: ['pui-organisation-manager', 'pui-user-manager', 'pui-caa', 'payments'],
} as const satisfies Record<SolicitorRoleProfile, readonly string[]>;

export type SolicitorRoleProfile = 'minimal' | 'org-admin' | 'extended';
export type SolicitorJurisdiction = keyof typeof SOLICITOR_ROLE_NAMES_BY_JURISDICTION;
export type SolicitorTestType = keyof typeof SOLICITOR_ROLE_AUGMENT_BY_TEST_TYPE;
export type SolicitorRoleContext = {
  testType?: SolicitorTestType | string;
  jurisdiction?: SolicitorJurisdiction | string;
  caseType?: string;
};

export type SolicitorRoleSelectionSource = 'explicit-roleNames' | 'context-driven' | 'profile';

type ResolvedSolicitorRoleContext = {
  testType?: SolicitorTestType;
  jurisdiction?: SolicitorJurisdiction;
  caseType?: string;
};

export type SolicitorRoleSelectionResolution = {
  source: SolicitorRoleSelectionSource;
  roleProfile: SolicitorRoleProfile;
  roleNames: string[];
  context: ResolvedSolicitorRoleContext;
};

export function resolveSolicitorRoleStrategy(options: {
  roleNames?: readonly string[];
  roleProfile?: SolicitorRoleProfile;
  roleContext?: SolicitorRoleContext;
}): SolicitorRoleSelectionResolution {
  const roleProfile = resolveSolicitorRoleProfile(options.roleProfile);
  const resolvedContext = resolveSolicitorRoleContext(options.roleContext);
  const explicitRoles = uniqueStringList(options.roleNames);
  if (explicitRoles.length > 0) {
    return {
      source: 'explicit-roleNames',
      roleProfile,
      roleNames: explicitRoles,
      context: resolvedContext,
    };
  }

  if (resolvedContext.jurisdiction || resolvedContext.testType || resolvedContext.caseType) {
    const baseRoles = resolvedContext.jurisdiction
      ? SOLICITOR_ROLE_NAMES_BY_JURISDICTION[resolvedContext.jurisdiction]
      : SOLICITOR_ROLE_PROFILES[roleProfile];
    const testTypeRoles = resolvedContext.testType ? SOLICITOR_ROLE_AUGMENT_BY_TEST_TYPE[resolvedContext.testType] : [];
    const profileRoles = SOLICITOR_ROLE_PROFILE_AUGMENT[roleProfile];

    return {
      source: 'context-driven',
      roleProfile,
      roleNames: uniqueStringList([...baseRoles, ...testTypeRoles, ...profileRoles]),
      context: resolvedContext,
    };
  }

  return {
    source: 'profile',
    roleProfile,
    roleNames: uniqueStringList(SOLICITOR_ROLE_PROFILES[roleProfile]),
    context: resolvedContext,
  };
}

export function normaliseSolicitorTestType(value: string | undefined): SolicitorTestType | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.trim().toLowerCase();
  switch (normalized) {
    case 'provisioning':
    case 'dynamic-user':
    case 'dynamic_user':
      return 'provisioning';
    case 'case-create':
    case 'case_create':
    case 'create-case':
    case 'create_case':
      return 'case-create';
    case 'manage-org':
    case 'manage_org':
    case 'organisation-management':
    case 'organisation_management':
      return 'manage-org';
    case 'invite-user':
    case 'invite_user':
    case 'invite':
      return 'invite-user';
    case 'finance':
      return 'finance';
    case 'full-access':
    case 'full_access':
    case 'all-roles':
    case 'all_roles':
      return 'full-access';
    default:
      return undefined;
  }
}

function resolveSolicitorRoleContext(context?: SolicitorRoleContext): ResolvedSolicitorRoleContext {
  const caseType = firstNonEmpty(context?.caseType, process.env.SOLICITOR_CASE_TYPE);
  const inferredJurisdiction = inferSolicitorJurisdictionFromCaseType(caseType);
  const jurisdiction =
    normaliseSolicitorJurisdiction(firstNonEmpty(context?.jurisdiction, process.env.SOLICITOR_JURISDICTION)) ??
    inferredJurisdiction;
  const testType = normaliseSolicitorTestType(firstNonEmpty(context?.testType, process.env.SOLICITOR_TEST_TYPE));

  return {
    jurisdiction,
    testType,
    caseType,
  };
}

function resolveSolicitorRoleProfile(roleProfile?: SolicitorRoleProfile): SolicitorRoleProfile {
  const rawValue = firstNonEmpty(roleProfile, process.env.SOLICITOR_ROLE_PROFILE);
  switch (rawValue?.trim().toLowerCase()) {
    case 'extended':
      return 'extended';
    case 'org-admin':
    case 'org_admin':
    case 'organisation-manager':
    case 'organisation_manager':
      return 'org-admin';
    case 'minimal':
    default:
      return DEFAULT_SOLICITOR_ROLE_PROFILE;
  }
}

function normaliseSolicitorJurisdiction(value: string | undefined): SolicitorJurisdiction | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.trim().toLowerCase();
  switch (normalized) {
    case 'prl':
    case 'private-law':
    case 'private_law':
    case 'privatelaw':
      return 'prl';
    case 'divorce':
    case 'div':
      return 'divorce';
    case 'finrem':
    case 'financial-remedy':
    case 'financial_remedy':
    case 'financialremedy':
      return 'finrem';
    case 'probate':
      return 'probate';
    case 'ia':
    case 'immigration':
    case 'immigration-asylum':
    case 'immigration_and_asylum':
      return 'ia';
    case 'publiclaw':
    case 'public-law':
    case 'public_law':
      return 'publiclaw';
    case 'civil':
      return 'civil';
    case 'employment':
    case 'employment-claims':
    case 'employment_claims':
      return 'employment';
    default:
      return undefined;
  }
}

function inferSolicitorJurisdictionFromCaseType(caseType: string | undefined): SolicitorJurisdiction | undefined {
  if (!caseType) {
    return undefined;
  }

  const normalized = caseType.trim().toLowerCase();
  if (normalized.includes('private') || normalized.includes('prl') || normalized.includes('privatelaw')) {
    return 'prl';
  }
  if (normalized.includes('financial') || normalized.includes('finrem')) {
    return 'finrem';
  }
  if (normalized.includes('divorce')) {
    return 'divorce';
  }
  if (normalized.includes('probate')) {
    return 'probate';
  }
  if (normalized.includes('immigration') || normalized.includes('asylum')) {
    return 'ia';
  }
  if (normalized.includes('publiclaw') || normalized.includes('public-law')) {
    return 'publiclaw';
  }
  if (normalized.includes('civil')) {
    return 'civil';
  }
  if (normalized.includes('employment')) {
    return 'employment';
  }
  return undefined;
}

function firstNonEmpty(...values: Array<string | undefined>): string | undefined {
  for (const value of values) {
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed.length > 0) {
        return trimmed;
      }
    }
  }

  return undefined;
}

function uniqueStringList(values: readonly string[] | undefined): string[] {
  if (!values) {
    return [];
  }

  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}
