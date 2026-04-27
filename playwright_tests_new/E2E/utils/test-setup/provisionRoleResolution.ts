import {
  DIVORCE_EXTERNAL_CORE_SOLICITOR_ROLE_NAMES,
  DIVORCE_EXTERNAL_NOC_SOLICITOR_ROLE_NAMES,
  EMPLOYMENT_EXTERNAL_CORE_SOLICITOR_ROLE_NAMES,
  type SolicitorRoleContext,
} from '../professional-user/roleStrategy.js';

export type DynamicSolicitorAlias =
  | 'SOLICITOR'
  | 'PROD_LIKE'
  | 'SEARCH_EMPLOYMENT_CASE'
  | 'EMPLOYMENT_DYNAMIC_CASEWORKER'
  | 'EMPLOYMENT_DYNAMIC_SOLICITOR'
  | 'USER_WITH_FLAGS';

type DivorceSolicitorRoleSet = 'external-core' | 'external-noc';

export const EMPLOYMENT_DYNAMIC_CASEWORKER_ROLES = ['caseworker', 'caseworker-employment', 'caseworker-employment-api'] as const;
export const EMPLOYMENT_DYNAMIC_SOLICITOR_ROLES = [...EMPLOYMENT_EXTERNAL_CORE_SOLICITOR_ROLE_NAMES] as const;
export const DIVORCE_FLAGS_DYNAMIC_SOLICITOR_ROLES = [...DIVORCE_EXTERNAL_NOC_SOLICITOR_ROLE_NAMES] as const;

function parseRoleList(value: string | undefined): string[] {
  if (!value) {
    return [];
  }
  return [
    ...new Set(
      value
        .split(',')
        .map((entry) => entry.trim())
        .filter(Boolean)
    ),
  ];
}

function hasScenarioRoleContext(roleContext?: SolicitorRoleContext): boolean {
  if (!roleContext) {
    return false;
  }
  return Boolean(roleContext.jurisdiction || roleContext.testType || roleContext.caseType?.trim());
}

function normaliseDivorceSolicitorRoleSet(value: string | undefined): DivorceSolicitorRoleSet | undefined {
  if (!value) {
    return undefined;
  }

  const normalised = value.trim().toLowerCase();
  switch (normalised) {
    case 'external-core':
    case 'external_core':
    case 'core':
    case 'documented':
      return 'external-core';
    case 'external-noc':
    case 'external_noc':
    case 'noc':
    case 'notice-of-change':
    case 'notice_of_change':
      return 'external-noc';
    default:
      return undefined;
  }
}

export function resolveDynamicDivorceSolicitorRoleNames(roleContext?: SolicitorRoleContext): string[] | undefined {
  const jurisdiction = roleContext?.jurisdiction?.trim().toLowerCase();
  if (jurisdiction !== 'divorce' && jurisdiction !== 'finrem') {
    return undefined;
  }

  const configuredRoleSet = normaliseDivorceSolicitorRoleSet(process.env.DYNAMIC_DIVORCE_SOLICITOR_ROLE_SET);
  if (!configuredRoleSet) {
    return undefined;
  }

  return configuredRoleSet === 'external-noc'
    ? [...DIVORCE_EXTERNAL_NOC_SOLICITOR_ROLE_NAMES]
    : [...DIVORCE_EXTERNAL_CORE_SOLICITOR_ROLE_NAMES];
}

function resolveAliasTemplateRoleNames(alias: DynamicSolicitorAlias): string[] | undefined {
  const fallbackTemplate = parseRoleList(process.env.ORG_USER_ASSIGNMENT_USER_ROLES);
  const explicitSolicitorTemplate = parseRoleList(process.env.DYNAMIC_SOLICITOR_TEMPLATE_ROLES);
  const explicitProdLikeTemplate = parseRoleList(process.env.DYNAMIC_PROD_LIKE_TEMPLATE_ROLES);

  if (alias === 'PROD_LIKE') {
    const resolved =
      explicitProdLikeTemplate.length > 0
        ? explicitProdLikeTemplate
        : explicitSolicitorTemplate.length > 0
          ? explicitSolicitorTemplate
          : fallbackTemplate;
    return resolved.length > 0 ? resolved : undefined;
  }

  if (alias === 'SOLICITOR') {
    return explicitSolicitorTemplate.length > 0 ? explicitSolicitorTemplate : undefined;
  }

  return undefined;
}

export function resolveProvisionRoleNamesForAlias({
  alias,
  roleContext,
  explicitRoleNames,
}: {
  alias: DynamicSolicitorAlias;
  roleContext?: SolicitorRoleContext;
  explicitRoleNames?: readonly string[];
}): string[] | undefined {
  if (explicitRoleNames && explicitRoleNames.length > 0) {
    return [...new Set(explicitRoleNames.map((entry) => entry.trim()).filter(Boolean))];
  }

  const aliasTemplateRoles = resolveAliasTemplateRoleNames(alias);
  if (aliasTemplateRoles && aliasTemplateRoles.length > 0) {
    return aliasTemplateRoles;
  }

  if (alias === 'SOLICITOR') {
    const divorceRoleSetRoles = resolveDynamicDivorceSolicitorRoleNames(roleContext);
    if (divorceRoleSetRoles && divorceRoleSetRoles.length > 0) {
      return divorceRoleSetRoles;
    }
  }

  if (hasScenarioRoleContext(roleContext)) {
    return undefined;
  }
  return undefined;
}

export function getAliasBaselineRoles({
  alias,
  roleContext,
}: {
  alias: DynamicSolicitorAlias;
  roleContext?: SolicitorRoleContext;
}): string[] {
  if (alias === 'EMPLOYMENT_DYNAMIC_CASEWORKER') {
    return [...EMPLOYMENT_DYNAMIC_CASEWORKER_ROLES];
  }
  if (alias === 'SEARCH_EMPLOYMENT_CASE' || alias === 'EMPLOYMENT_DYNAMIC_SOLICITOR') {
    return ['caseworker-employment', 'caseworker-employment-legalrep-solicitor', 'pui-case-manager'];
  }
  if (alias === 'USER_WITH_FLAGS') {
    return [...DIVORCE_EXTERNAL_NOC_SOLICITOR_ROLE_NAMES];
  }
  if (alias === 'SOLICITOR' && ['divorce', 'finrem'].includes(roleContext?.jurisdiction?.trim().toLowerCase() ?? '')) {
    return [...(resolveDynamicDivorceSolicitorRoleNames(roleContext) ?? DIVORCE_EXTERNAL_CORE_SOLICITOR_ROLE_NAMES)];
  }
  return [];
}
