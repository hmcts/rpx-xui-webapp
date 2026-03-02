import { createLogger } from '@hmcts/playwright-common';
import type { TestInfo } from '@playwright/test';

import type {
  ProvisionedProfessionalUser,
  ProfessionalUserUtils,
  SolicitorRoleContext,
} from '../../utils/professional-user.utils';

type DynamicSolicitorAlias = 'SOLICITOR' | 'PROD_LIKE' | 'SEARCH_EMPLOYMENT_CASE' | 'USER_WITH_FLAGS';

type DynamicProvisionHandle = {
  user: ProvisionedProfessionalUser;
  cleanup: () => Promise<void>;
};

type CachedDynamicProvision = {
  user: ProvisionedProfessionalUser;
  previousUsername: string | undefined;
  previousPassword: string | undefined;
};

type ProvisionDynamicSolicitorArgs = {
  alias: DynamicSolicitorAlias;
  professionalUserUtils: ProfessionalUserUtils;
  roleContext?: SolicitorRoleContext;
  roleNames?: readonly string[];
  testInfo: TestInfo;
  mode?: 'internal' | 'external' | 'auto';
  assertEmploymentAssignmentPayloadAccepted?: boolean;
};

const logger = createLogger({
  serviceName: 'dynamic-solicitor-session',
  format: 'pretty',
});

const retryProvisionCache = new Map<string, CachedDynamicProvision>();
const truthyValues = new Set(['1', 'true', 'yes', 'on']);

const USER_ENV_VARS: Record<DynamicSolicitorAlias, { username: string; password: string }> = {
  SOLICITOR: {
    username: 'SOLICITOR_USERNAME',
    password: 'SOLICITOR_PASSWORD',
  },
  PROD_LIKE: {
    username: 'PROD_LIKE_USERNAME',
    password: 'PROD_LIKE_PASSWORD',
  },
  SEARCH_EMPLOYMENT_CASE: {
    username: 'SEARCH_EMPLOYMENT_CASE_USERNAME',
    password: 'SEARCH_EMPLOYMENT_CASE_PASSWORD',
  },
  USER_WITH_FLAGS: {
    username: 'USER_WITH_FLAGS_USERNAME',
    password: 'USER_WITH_FLAGS_PASSWORD',
  },
};

const EMPLOYMENT_ASSIGNMENT_REQUIRED_ROLES = [
  'caseworker',
  'caseworker-employment',
  'caseworker-employment-legalrep-solicitor',
  'pui-case-manager',
  'pui-user-manager',
  'pui-organisation-manager',
  'pui-finance-manager',
  'pui-caa',
] as const;

export const EMPLOYMENT_DYNAMIC_SOLICITOR_ROLES = [
  'caseworker',
  'caseworker-employment',
  'caseworker-employment-api',
  'caseworker-employment-englandwales',
  'caseworker-employment-leeds',
  'caseworker-employment-manchester',
  'caseworker-employment-scotland',
  'ccd-import',
  'caseworker-employment-legalrep-solicitor',
  'pui-case-manager',
  'pui-user-manager',
  'pui-organisation-manager',
  'pui-finance-manager',
  'pui-caa',
] as const;

const EMPLOYMENT_ASSIGNMENT_ROLES_UNFILTERED = [
  'caseworker',
  'caseworker-employment',
  'caseworker-employment-api',
  'caseworker-employment-englandwales',
  'caseworker-employment-leeds',
  'caseworker-employment-manchester',
  'caseworker-employment-scotland',
  'ccd-import',
  'caseworker-employment-legalrep-solicitor',
  'pui-case-manager',
  'pui-user-manager',
  'pui-organisation-manager',
  'pui-finance-manager',
  'pui-caa',
] as const;

const EMPLOYMENT_FILTERED_ASSIGNMENT_ROLES = [
  'caseworker-employment-api',
  'caseworker-employment-englandwales',
  'caseworker-employment-leeds',
  'caseworker-employment-manchester',
  'caseworker-employment-scotland',
  'ccd-import',
] as const;

export const DIVORCE_FLAGS_DYNAMIC_SOLICITOR_ROLES = [
  'caseworker',
  'caseworker-divorce',
  'caseworker-divorce-solicitor',
  'caseworker-divorce-financialremedy',
  'caseworker-divorce-financialremedy-solicitor',
  'pui-case-manager',
  'pui-user-manager',
  'pui-organisation-manager',
  'pui-finance-manager',
  'pui-caa',
] as const;

function toRetryCacheKey(testInfo: TestInfo, alias: DynamicSolicitorAlias): string {
  return `${testInfo.project.name}::${testInfo.file}::${testInfo.title}::${alias}`;
}

function hasRetriesRemaining(testInfo: TestInfo): boolean {
  return testInfo.retry < testInfo.project.retries;
}

function shouldPreserveProvisionForRetry(testInfo: TestInfo): boolean {
  const failed = testInfo.status !== testInfo.expectedStatus;
  return failed && hasRetriesRemaining(testInfo);
}

function restoreEnvCredential(key: string, previousValue: string | undefined): void {
  if (typeof previousValue === 'undefined') {
    delete process.env[key];
    return;
  }
  process.env[key] = previousValue;
}

function isTruthy(value: string | undefined): boolean {
  return truthyValues.has((value ?? '').trim().toLowerCase());
}

function shouldRunEmploymentAssignmentPreflight(assertEmploymentAssignmentPayloadAccepted: boolean): boolean {
  if (!assertEmploymentAssignmentPayloadAccepted) {
    return false;
  }
  return isTruthy(process.env.PW_EMPLOYMENT_ASSIGNMENT_PREFLIGHT);
}

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
    const resolved = explicitSolicitorTemplate.length > 0 ? explicitSolicitorTemplate : fallbackTemplate;
    return resolved.length > 0 ? resolved : undefined;
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

  if (hasScenarioRoleContext(roleContext)) {
    return undefined;
  }

  return resolveAliasTemplateRoleNames(alias);
}

export async function provisionDynamicSolicitorForAlias({
  alias,
  professionalUserUtils,
  roleContext,
  roleNames,
  testInfo,
  mode = 'external',
  assertEmploymentAssignmentPayloadAccepted = false,
}: ProvisionDynamicSolicitorArgs): Promise<DynamicProvisionHandle> {
  const organisationId = process.env.TEST_SOLICITOR_ORGANISATION_ID?.trim();
  if (!organisationId) {
    throw new Error('Missing dynamic-user prerequisite: TEST_SOLICITOR_ORGANISATION_ID');
  }

  const envKeys = USER_ENV_VARS[alias];
  const cacheKey = toRetryCacheKey(testInfo, alias);
  const cached = retryProvisionCache.get(cacheKey);
  if (cached) {
    process.env[envKeys.username] = cached.user.email;
    process.env[envKeys.password] = cached.user.password;
    await testInfo.attach(`${alias.toLowerCase()}-dynamic-user.json`, {
      body: JSON.stringify(
        {
          alias,
          reusedFromRetryCache: true,
          email: cached.user.email,
          forename: cached.user.forename,
          surname: cached.user.surname,
          roleNames: cached.user.roleNames,
          organisationAssignment: cached.user.organisationAssignment,
        },
        null,
        2
      ),
      contentType: 'application/json',
    });
    return {
      user: cached.user,
      cleanup: async () => {
        if (shouldPreserveProvisionForRetry(testInfo)) {
          logger.info('Preserving dynamic user for next retry attempt', {
            alias,
            email: cached.user.email,
            retry: testInfo.retry,
            retriesConfigured: testInfo.project.retries,
          });
          return;
        }

        restoreEnvCredential(envKeys.username, cached.previousUsername);
        restoreEnvCredential(envKeys.password, cached.previousPassword);

        try {
          await professionalUserUtils.cleanupOrganisationAssignment({
            user: cached.user,
            userIdentifier: cached.user.organisationAssignment.userIdentifier,
            organisationId,
            rolesToRemove: cached.user.organisationAssignment.roles,
          });
        } catch (error) {
          logger.warn('Failed to cleanup dynamic solicitor organisation assignment', {
            alias,
            email: cached.user.email,
            error: error instanceof Error ? error.message : String(error),
          });
        }

        try {
          await professionalUserUtils.cleanupIdamAccount({
            user: cached.user,
          });
        } catch (error) {
          logger.warn('Failed to cleanup dynamic solicitor IDAM account', {
            alias,
            email: cached.user.email,
            error: error instanceof Error ? error.message : String(error),
          });
        }

        retryProvisionCache.delete(cacheKey);
      },
    };
  }

  const previousUsername = process.env[envKeys.username];
  const previousPassword = process.env[envKeys.password];
  const resolvedRoleNames = resolveProvisionRoleNamesForAlias({
    alias,
    roleContext,
    explicitRoleNames: roleNames,
  });

  if (shouldRunEmploymentAssignmentPreflight(assertEmploymentAssignmentPayloadAccepted)) {
    await runEmploymentAssignmentPreflight({
      professionalUserUtils,
      organisationId: organisationId!,
      testInfo,
    });
  } else if (assertEmploymentAssignmentPayloadAccepted) {
    logger.info('Skipping employment assignment preflight (set PW_EMPLOYMENT_ASSIGNMENT_PREFLIGHT=1 to enable).', {
      alias,
      organisationId,
    });
  }

  const user = await professionalUserUtils.createSolicitorUserForOrganisation({
    organisationId: organisationId!,
    roleContext,
    roleNames: resolvedRoleNames,
    mode,
    resendInvite: false,
    outputCreatedUserData: process.env.PW_DYNAMIC_USER_OUTPUT_CREATED_DATA === '1',
  });

  assertDynamicUserRoleContract({
    alias,
    roleContext,
    resolvedRoleNames,
    user,
  });

  process.env[envKeys.username] = user.email;
  process.env[envKeys.password] = user.password;
  retryProvisionCache.set(cacheKey, {
    user,
    previousUsername,
    previousPassword,
  });

  await testInfo.attach(`${alias.toLowerCase()}-dynamic-user.json`, {
    body: JSON.stringify(
      {
        alias,
        email: user.email,
        forename: user.forename,
        surname: user.surname,
        roleNames: user.roleNames,
        organisationAssignment: user.organisationAssignment,
      },
      null,
      2
    ),
    contentType: 'application/json',
  });

  return {
    user,
    cleanup: async () => {
      const provision = retryProvisionCache.get(cacheKey) ?? {
        user,
        previousUsername,
        previousPassword,
      };
      if (shouldPreserveProvisionForRetry(testInfo)) {
        logger.info('Preserving dynamic user for next retry attempt', {
          alias,
          email: provision.user.email,
          retry: testInfo.retry,
          retriesConfigured: testInfo.project.retries,
        });
        return;
      }

      restoreEnvCredential(envKeys.username, provision.previousUsername);
      restoreEnvCredential(envKeys.password, provision.previousPassword);

      retryProvisionCache.delete(cacheKey);

      try {
        await professionalUserUtils.cleanupOrganisationAssignment({
          user: provision.user,
          userIdentifier: provision.user.organisationAssignment.userIdentifier,
          organisationId,
          rolesToRemove: provision.user.organisationAssignment.roles,
        });
      } catch (error) {
        logger.warn('Failed to cleanup dynamic solicitor organisation assignment', {
          alias,
          email: provision.user.email,
          error: error instanceof Error ? error.message : String(error),
        });
      }

      try {
        await professionalUserUtils.cleanupIdamAccount({
          user: provision.user,
        });
      } catch (error) {
        logger.warn('Failed to cleanup dynamic solicitor IDAM account', {
          alias,
          email: provision.user.email,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    },
  };
}

function assertIncludesRoles(actualRoles: readonly string[], expectedRoles: readonly string[], errorContext: string): void {
  const missing = expectedRoles.filter((role) => !actualRoles.includes(role));
  if (missing.length > 0) {
    throw new Error(`${errorContext}: missing role(s): ${missing.join(', ')}. Actual roles: ${actualRoles.join(', ')}`);
  }
}

function getAliasBaselineRoles({
  alias,
  roleContext,
}: {
  alias: DynamicSolicitorAlias;
  roleContext?: SolicitorRoleContext;
}): string[] {
  if (alias === 'SEARCH_EMPLOYMENT_CASE') {
    return ['caseworker-employment', 'caseworker-employment-legalrep-solicitor', 'pui-case-manager'];
  }
  if (alias === 'USER_WITH_FLAGS') {
    return ['caseworker-divorce-solicitor', 'pui-case-manager'];
  }
  if (alias === 'SOLICITOR' && roleContext?.jurisdiction === 'divorce') {
    return ['caseworker-divorce-solicitor', 'pui-case-manager'];
  }
  return [];
}

function assertDynamicUserRoleContract({
  alias,
  roleContext,
  resolvedRoleNames,
  user,
}: {
  alias: DynamicSolicitorAlias;
  roleContext?: SolicitorRoleContext;
  resolvedRoleNames?: readonly string[];
  user: ProvisionedProfessionalUser;
}): void {
  if (resolvedRoleNames && resolvedRoleNames.length > 0) {
    assertIncludesRoles(user.roleNames, resolvedRoleNames, `Dynamic ${alias} IDAM role contract mismatch`);
  }

  const baselineRoles = getAliasBaselineRoles({ alias, roleContext });
  if (baselineRoles.length > 0) {
    assertIncludesRoles(user.roleNames, baselineRoles, `Dynamic ${alias} baseline IDAM role contract mismatch`);
  }

  if (alias === 'SEARCH_EMPLOYMENT_CASE') {
    assertIncludesRoles(
      user.organisationAssignment.roles,
      EMPLOYMENT_ASSIGNMENT_REQUIRED_ROLES,
      `Dynamic ${alias} assignment role contract mismatch`
    );
    for (const filteredRole of EMPLOYMENT_FILTERED_ASSIGNMENT_ROLES) {
      if (user.organisationAssignment.roles.includes(filteredRole)) {
        throw new Error(
          `Dynamic ${alias} assignment role contract mismatch: filtered role '${filteredRole}' was present in assignment payload.`
        );
      }
    }
  }
}

async function runEmploymentAssignmentPreflight({
  professionalUserUtils,
  organisationId,
  testInfo,
}: {
  professionalUserUtils: ProfessionalUserUtils;
  organisationId: string;
  testInfo: TestInfo;
}): Promise<void> {
  const preflight = await professionalUserUtils.createSolicitorUserForOrganisation({
    organisationId,
    roleNames: EMPLOYMENT_ASSIGNMENT_ROLES_UNFILTERED,
    roleContext: {
      jurisdiction: 'employment',
      testType: 'case-create',
    },
    mode: 'external',
    resendInvite: false,
    outputCreatedUserData: false,
  });

  try {
    await testInfo.attach('employment-assignment-preflight.json', {
      body: JSON.stringify(
        {
          email: preflight.email,
          status: preflight.organisationAssignment.status,
          mode: preflight.organisationAssignment.mode,
          requestedRoles: EMPLOYMENT_ASSIGNMENT_ROLES_UNFILTERED,
          assignedRoles: preflight.organisationAssignment.roles,
        },
        null,
        2
      ),
      contentType: 'application/json',
    });

    const status = preflight.organisationAssignment.status;
    if (![200, 201, 202, 409].includes(status)) {
      throw new Error(`Employment assignment preflight failed: unexpected assignment status ${status}.`);
    }
    if (preflight.organisationAssignment.mode !== 'external') {
      throw new Error(
        `Employment assignment preflight failed: expected external mode, got ${preflight.organisationAssignment.mode}.`
      );
    }
    for (const filteredRole of EMPLOYMENT_FILTERED_ASSIGNMENT_ROLES) {
      if (preflight.organisationAssignment.roles.includes(filteredRole)) {
        throw new Error(`Employment assignment preflight failed: filtered role '${filteredRole}' present in assignment payload.`);
      }
    }
  } finally {
    await professionalUserUtils
      .cleanupOrganisationAssignment({
        user: preflight,
        userIdentifier: preflight.organisationAssignment.userIdentifier,
        organisationId,
        rolesToRemove: preflight.organisationAssignment.roles,
      })
      .catch(() => undefined);
    await professionalUserUtils
      .cleanupIdamAccount({
        user: preflight,
      })
      .catch(() => undefined);
  }
}
