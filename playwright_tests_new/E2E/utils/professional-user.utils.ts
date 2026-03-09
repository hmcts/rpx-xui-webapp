import { faker } from '@faker-js/faker';
import { ApiClient, IdamUtils, ServiceAuthUtils, createLogger } from '@hmcts/playwright-common';
import { request } from '@playwright/test';

import { firstAllowedNonEmpty } from './accountPolicy.js';
import { ensureUiStorageStateForUser } from './session-storage.utils.js';
import { resolveUiStoragePathForUser } from './storage-state.utils.js';

export const DEFAULT_SOLICITOR_PASSWORD = 'Password12!';
export const DEFAULT_CASEWORKER_DIVORCE_PASSWORD = 'Password12!';
export const DEFAULT_IDAM_CREATE_ATTEMPTS = 3;
export const DEFAULT_SOLICITOR_ROLE_PROFILE = 'minimal';
export const DEFAULT_IDAM_CLIENT_ID = 'xuiwebapp';
export const DEFAULT_PASSWORD_GRANT_SCOPE = 'openid profile roles manage-user create-user';
export const DEFAULT_ASSIGNMENT_SCOPE = 'openid profile roles';
export const DEFAULT_ORGANISATION_ASSIGNMENT_MODE = 'auto';

export const MINIMAL_SOLICITOR_ROLE_NAMES = [
  'caseworker',
  'caseworker-privatelaw',
  'caseworker-privatelaw-solicitor',
  'pui-case-manager',
];

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

const ORGANISATION_ASSIGNMENT_ALLOWED_ROLES = new Set<string>([
  'pui-case-manager',
  'pui-user-manager',
  'pui-organisation-manager',
  'pui-finance-manager',
  'pui-caa',
  'payments',
  'caseworker',
  'caseworker-divorce',
  'caseworker-divorce-solicitor',
  'caseworker-divorce-financialremedy',
  'caseworker-divorce-financialremedy-solicitor',
  'caseworker-probate',
  'caseworker-probate-solicitor',
  'caseworker-ia',
  'caseworker-ia-legalrep-solicitor',
  'caseworker-publiclaw',
  'caseworker-publiclaw-solicitor',
  'caseworker-civil',
  'caseworker-civil-solicitor',
  'caseworker-employment',
  'caseworker-employment-legalrep-solicitor',
  'caseworker-privatelaw',
  'caseworker-privatelaw-solicitor',
]);

type AssignmentUserRoleProfile = keyof typeof SOLICITOR_ROLE_AUGMENT_BY_TEST_TYPE;

type AssignmentUserRolesResolution = {
  roles?: string[];
  source: 'profile' | 'explicit' | 'token-claims' | 'none';
  profile?: AssignmentUserRoleProfile;
};

export type ProfessionalUserInfo = {
  id?: string;
  email: string;
  password: string;
  forename: string;
  surname: string;
  roleNames: string[];
};

export type UserPropagationOutcome = {
  verified: boolean;
  degraded: boolean;
  reason: 'idam-api-and-userinfo-probe' | 'idam-api-only' | 'no-probe-token';
};

export type OrganisationAssignmentMode = 'internal' | 'external';
export type OrganisationAssignmentStrategy = OrganisationAssignmentMode | 'auto';

export type OrganisationAssignmentResult = {
  organisationId: string;
  mode: OrganisationAssignmentMode;
  requestedMode: OrganisationAssignmentStrategy;
  attemptedModes: OrganisationAssignmentMode[];
  roles: string[];
  status: number;
  userIdentifier?: string;
  responseBody?: unknown;
};

export type ProvisionedProfessionalUser = ProfessionalUserInfo & {
  organisationAssignment: OrganisationAssignmentResult;
};
export type SolicitorRoleProfile = 'minimal' | 'org-admin' | 'extended';
export type SolicitorJurisdiction = keyof typeof SOLICITOR_ROLE_NAMES_BY_JURISDICTION;
export type SolicitorTestType = keyof typeof SOLICITOR_ROLE_AUGMENT_BY_TEST_TYPE;
export type SolicitorRoleContext = {
  testType?: SolicitorTestType | string; // NOSONAR - intentional escape hatch for unsupported test types
  jurisdiction?: SolicitorJurisdiction | string; // NOSONAR - intentional escape hatch for unsupported jurisdictions
  caseType?: string;
};

type CreateProfessionalUserOptions = {
  bearerToken?: string;
  password?: string;
  roleNames: readonly string[];
  emailPrefix: string;
  identity?: {
    email: string;
    forename: string;
    surname: string;
  };
  maxCreateAttempts?: number;
  roleSelection?: SolicitorRoleSelectionResolution;
  outputCreatedUserData?: boolean;
};

type CreateTypeSpecificOptions = {
  bearerToken?: string;
  roleNames?: readonly string[];
  roleProfile?: SolicitorRoleProfile;
  roleContext?: SolicitorRoleContext;
  maxCreateAttempts?: number;
  outputCreatedUserData?: boolean;
};

type AssignUserToOrganisationOptions = {
  user: ProfessionalUserInfo;
  organisationId: string;
  roles?: readonly string[];
  mode?: OrganisationAssignmentStrategy;
  assignmentBearerToken?: string;
  serviceToken?: string;
  rdProfessionalApiPath?: string;
  resendInvite?: boolean;
  requireServiceAuth?: boolean;
};

type CreateSolicitorUserForOrganisationOptions = {
  organisationId: string;
  idamBearerToken?: string;
  assignmentBearerToken?: string;
  serviceToken?: string;
  roleNames?: readonly string[];
  roleProfile?: SolicitorRoleProfile;
  roleContext?: SolicitorRoleContext;
  mode?: OrganisationAssignmentStrategy;
  rdProfessionalApiPath?: string;
  resendInvite?: boolean;
  requireServiceAuth?: boolean;
  maxCreateAttempts?: number;
  outputCreatedUserData?: boolean;
};

type OrganisationAssignmentPreflightOptions = {
  organisationId: string;
  mode?: OrganisationAssignmentStrategy;
  assignmentBearerToken?: string;
  serviceToken?: string;
  rdProfessionalApiPath?: string;
  requireServiceAuth?: boolean;
};

type CleanupOrganisationAssignmentOptions = {
  user: ProfessionalUserInfo;
  userIdentifier?: string;
  organisationId?: string;
  rolesToRemove: readonly string[];
  assignmentBearerToken?: string;
  serviceToken?: string;
  rdProfessionalApiPath?: string;
  requireServiceAuth?: boolean;
};

type CleanupIdamAccountOptions = {
  user: Pick<ProfessionalUserInfo, 'id' | 'email'>;
  bearerToken?: string;
  idamApiPath?: string;
};

const logger = createLogger({
  serviceName: 'professional-user-utils',
  format: 'pretty',
});
const IDAM_RETRYABLE_STATUSES = new Set([429, 500, 502, 503, 504]);
const USER_PROPAGATION_CHECK_MAX_ATTEMPTS = 6;
const USER_PROPAGATION_CHECK_RETRY_DELAY_MS = 1_000;
const EXTERNAL_ASSIGNMENT_RETRY_DELAY_MS = 2_000;
const DEFAULT_EXTERNAL_ASSIGNMENT_RETRY_ATTEMPTS = 12;
const MAX_EXTERNAL_ASSIGNMENT_RETRY_ATTEMPTS = 20;
const DEFAULT_ASSIGNMENT_REQUEST_TIMEOUT_MS = 20_000;
const SOLICITOR_ROLE_PROFILES: Record<SolicitorRoleProfile, readonly string[]> = {
  minimal: MINIMAL_SOLICITOR_ROLE_NAMES,
  'org-admin': ORG_ADMIN_SOLICITOR_ROLE_NAMES,
  extended: EXTENDED_SOLICITOR_ROLE_NAMES,
};
const SOLICITOR_ROLE_PROFILE_AUGMENT: Record<SolicitorRoleProfile, readonly string[]> = {
  minimal: [],
  'org-admin': ['pui-organisation-manager'],
  extended: ['pui-organisation-manager', 'pui-user-manager', 'pui-caa', 'payments'],
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
  return resolveSolicitorRoleSelection(options);
}

export class ProfessionalUserUtils {
  constructor(
    private readonly idamUtils: IdamUtils,
    private readonly serviceAuthUtils?: ServiceAuthUtils
  ) {}

  public async createSolicitorUser(options: CreateTypeSpecificOptions = {}): Promise<ProfessionalUserInfo> {
    const password = process.env.IDAM_SOLICITOR_USER_PASSWORD?.trim() || DEFAULT_SOLICITOR_PASSWORD;
    const roleSelection = resolveSolicitorRoleSelection({
      roleNames: options.roleNames,
      roleProfile: options.roleProfile,
      roleContext: options.roleContext,
    });
    return this.createUser({
      bearerToken: options.bearerToken,
      password,
      roleNames: roleSelection.roleNames,
      emailPrefix: 'solicitor',
      maxCreateAttempts: options.maxCreateAttempts,
      roleSelection,
      outputCreatedUserData: options.outputCreatedUserData,
    });
  }

  public async createCaseworkerDivorceUser(options: CreateTypeSpecificOptions = {}): Promise<ProfessionalUserInfo> {
    const password = process.env.IDAM_CASEWORKER_DIVORCE_PASSWORD?.trim() || DEFAULT_CASEWORKER_DIVORCE_PASSWORD;
    return this.createUser({
      bearerToken: options.bearerToken,
      password,
      roleNames: options.roleNames ?? CASEWORKER_DIVORCE_ROLE_NAMES,
      emailPrefix: 'caseworker_divorce',
      maxCreateAttempts: options.maxCreateAttempts,
      outputCreatedUserData: options.outputCreatedUserData,
    });
  }

  public async createSolicitorUserForOrganisation(
    options: CreateSolicitorUserForOrganisationOptions
  ): Promise<ProvisionedProfessionalUser> {
    const password = process.env.IDAM_SOLICITOR_USER_PASSWORD?.trim() || DEFAULT_SOLICITOR_PASSWORD;
    const roleSelection = resolveSolicitorRoleSelection({
      roleNames: options.roleNames,
      roleProfile: options.roleProfile,
      roleContext: options.roleContext,
    });
    const identity = createFakerIdentity('solicitor', roleSelection.context.jurisdiction);
    const plannedUser: ProfessionalUserInfo = {
      email: identity.email,
      password,
      forename: identity.forename,
      surname: identity.surname,
      roleNames: roleSelection.roleNames,
    };

    const assignmentMode = options.mode ?? DEFAULT_ORGANISATION_ASSIGNMENT_MODE;
    const resendInvite = options.resendInvite ?? false;

    // Requested sequence: create and activate user in SIDAM/IDAM first, then invite/assign in Manage Org.
    const createdUser = await this.createUserViaSidamFirst({
      bearerToken: options.idamBearerToken,
      password,
      roleNames: plannedUser.roleNames,
      emailPrefix: 'solicitor',
      identity,
      maxCreateAttempts: options.maxCreateAttempts,
      roleSelection,
      outputCreatedUserData: options.outputCreatedUserData,
    });

    const propagationOutcome = await this.waitForUserPropagation(createdUser);
    if (propagationOutcome.degraded) {
      logger.warn('User propagation completed in degraded mode before organisation assignment.', {
        email: createdUser.email,
        reason: propagationOutcome.reason,
      });
    }

    const organisationAssignment = await this.assignUserToOrganisation({
      user: createdUser,
      organisationId: options.organisationId,
      roles: createdUser.roleNames,
      mode: assignmentMode,
      assignmentBearerToken: options.assignmentBearerToken,
      serviceToken: options.serviceToken,
      rdProfessionalApiPath: options.rdProfessionalApiPath,
      resendInvite,
      requireServiceAuth: options.requireServiceAuth,
    });

    return {
      ...createdUser,
      organisationAssignment,
    };
  }

  public async assertOrganisationAssignmentPreflight(options: OrganisationAssignmentPreflightOptions): Promise<void> {
    const rdProfessionalApiPath = resolveRdProfessionalApiPath(options.rdProfessionalApiPath);
    const requestedMode = resolveOrganisationAssignmentMode(options.mode);
    const modesToTry = resolveAssignmentModesToTry(requestedMode);
    const assignmentBearerToken = await this.resolveAssignmentBearerToken(options.assignmentBearerToken);
    const serviceToken = await this.resolveServiceToken(options.serviceToken, options.requireServiceAuth ?? true);
    const assignmentUserRoles = resolveAssignmentUserRolesResolution(assignmentBearerToken);
    const headers = buildHeaders(assignmentBearerToken, serviceToken, assignmentUserRoles.roles);
    const client = new ApiClient({
      baseUrl: rdProfessionalApiPath,
      name: 'rd-professional-assignment-preflight',
    });

    let lastError: unknown;
    for (const mode of modesToTry) {
      const endpoint =
        mode === 'internal'
          ? `/refdata/internal/v1/organisations/${encodeURIComponent(options.organisationId)}/users/`
          : '/refdata/external/v1/organisations/users/';
      try {
        await client.post<Record<string, unknown>>(endpoint, {
          headers,
          // Intentionally invalid payload: validates endpoint/auth/claim processing without creating a user.
          data: {},
          responseType: 'json',
        });
        return;
      } catch (error) {
        lastError = error;
        const statusCode = parseStatusCode(error);
        if (statusCode !== undefined && statusCode < 500 && statusCode !== 401 && statusCode !== 403) {
          return;
        }
        const hasNextMode = mode !== modesToTry[modesToTry.length - 1];
        if (hasNextMode && shouldFallbackToAlternateAssignmentMode(statusCode)) {
          continue;
        }
      }
    }

    const statusCode = parseStatusCode(lastError);
    throw new Error(
      `Organisation assignment preflight failed for organisation ${options.organisationId} (requested mode: ${requestedMode}, status: ${
        statusCode ?? 'unknown'
      }). Organisation can be ACTIVE in Manage Org while RD Professional assignment endpoints are unhealthy/forbidden.`
    );
  }

  public async createUser({
    bearerToken,
    password,
    roleNames,
    emailPrefix,
    identity,
    maxCreateAttempts,
    roleSelection,
    outputCreatedUserData,
  }: CreateProfessionalUserOptions): Promise<ProfessionalUserInfo> {
    const token = await this.resolveBearerToken(bearerToken);
    const secret = password ?? DEFAULT_SOLICITOR_PASSWORD;
    const { email, forename, surname } = identity ?? createFakerIdentity(emailPrefix, roleSelection?.context.jurisdiction);
    const roleList = [...new Set(roleNames)];
    const attempts = maxCreateAttempts ?? DEFAULT_IDAM_CREATE_ATTEMPTS;

    let lastError: unknown;
    for (let attempt = 1; attempt <= attempts; attempt += 1) {
      try {
        const created = await this.idamUtils.createUser({
          bearerToken: token,
          password: secret,
          user: {
            email,
            forename,
            surname,
            roleNames: [...roleList],
          },
        });
        const createdUser = {
          id: created.id,
          email: created.email,
          password: secret,
          forename,
          surname,
          roleNames: [...roleList],
        };
        this.emitCreatedUserData({
          user: createdUser,
          roleSelection,
          createPath: 'idam-testing-support',
          outputCreatedUserData,
        });
        return createdUser;
      } catch (error) {
        lastError = error;
        const statusCode = parseStatusCode(error);
        if (statusCode === 409) {
          const updatedUser = await this.updateExistingUser({
            token,
            secret,
            email,
            forename,
            surname,
            roleNames: [...roleList],
          });
          this.emitCreatedUserData({
            user: updatedUser,
            roleSelection,
            createPath: 'idam-update-existing',
            outputCreatedUserData,
          });
          return updatedUser;
        }
        if (shouldFallbackToSidamAccounts(statusCode, error)) {
          logger.warn('IDAM /test/idam/users unavailable or rejected; falling back to /testing-support/accounts.', {
            email,
            statusCode,
          });
          const createdViaSidam = await this.createUserViaSidamAccounts({
            bearerToken: token,
            password: secret,
            email,
            forename,
            surname,
            roleNames: roleList,
          });
          const activatedViaSidam = await this.ensureUserAccountActive({
            token,
            user: createdViaSidam,
            roleNames: roleList,
          });
          this.emitCreatedUserData({
            user: activatedViaSidam,
            roleSelection,
            createPath: 'idam-api-testing-support',
            outputCreatedUserData,
          });
          return activatedViaSidam;
        }
        if (!isRetryableStatus(statusCode) || attempt === attempts) {
          throw error;
        }
        const waitMs = Math.min(200 * 2 ** (attempt - 1), 2_000);
        logger.warn('Transient IDAM create user failure; retrying', {
          email,
          attempt,
          attempts,
          statusCode,
          waitMs,
        });
        await sleep(waitMs);
      }
    }
    throw toError(lastError, 'Failed to create user in IDAM');
  }

  // Sequential IDAM creation retry with role-selection branching; extracting helpers would split tightly-coupled state
  private async createUserViaSidamFirst({
    // NOSONAR typescript:S3776
    bearerToken,
    password,
    roleNames,
    emailPrefix,
    identity,
    maxCreateAttempts,
    roleSelection,
    outputCreatedUserData,
  }: CreateProfessionalUserOptions): Promise<ProfessionalUserInfo> {
    let token: string | undefined;
    try {
      token = await this.resolveBearerToken(bearerToken);
    } catch (error) {
      logger.warn('Create-user bearer token hydration failed; continuing with SIDAM create-account flow.', {
        message: error instanceof Error ? error.message : String(error),
      });
    }
    const secret = password ?? DEFAULT_SOLICITOR_PASSWORD;
    let resolvedIdentity = identity ?? createFakerIdentity(emailPrefix, roleSelection?.context.jurisdiction);
    const roleList = [...new Set(roleNames)];
    const attempts = maxCreateAttempts ?? DEFAULT_IDAM_CREATE_ATTEMPTS;

    let lastError: unknown;
    for (let attempt = 1; attempt <= attempts; attempt += 1) {
      try {
        const createdViaSidam = await this.createUserViaSidamAccounts({
          bearerToken: token ?? '',
          password: secret,
          email: resolvedIdentity.email,
          forename: resolvedIdentity.forename,
          surname: resolvedIdentity.surname,
          roleNames: roleList,
        });
        const activatedViaSidam = token
          ? await this.ensureUserAccountActive({
              token,
              user: createdViaSidam,
              roleNames: roleList,
            })
          : createdViaSidam;
        this.emitCreatedUserData({
          user: activatedViaSidam,
          roleSelection,
          createPath: 'idam-api-testing-support',
          outputCreatedUserData,
        });
        return activatedViaSidam;
      } catch (error) {
        lastError = error;
        const statusCode = parseStatusCode(error);
        if (statusCode === 409) {
          if (!token) {
            if (attempt < attempts) {
              resolvedIdentity = createFakerIdentity(emailPrefix, roleSelection?.context.jurisdiction);
              logger.warn('SIDAM create returned 409 without create-user bearer token; regenerating identity and retrying.', {
                attempt,
                attempts,
                email: resolvedIdentity.email,
              });
              continue;
            }
            throw new Error(
              'SIDAM create returned 409 and create-user bearer token is unavailable to reconcile existing user. Provide CREATE_USER_BEARER_TOKEN/IDAM_SECRET or retry when IDAM token endpoint is healthy.'
            );
          }
          const updatedUser = await this.updateExistingUser({
            token,
            secret,
            email: resolvedIdentity.email,
            forename: resolvedIdentity.forename,
            surname: resolvedIdentity.surname,
            roleNames: [...roleList],
          });
          this.emitCreatedUserData({
            user: updatedUser,
            roleSelection,
            createPath: 'idam-update-existing',
            outputCreatedUserData,
          });
          return updatedUser;
        }
        if (!isRetryableStatus(statusCode) || attempt === attempts) {
          throw error;
        }
        const waitMs = Math.min(200 * 2 ** (attempt - 1), 2_000);
        logger.warn('Transient SIDAM create user failure; retrying', {
          email: resolvedIdentity.email,
          attempt,
          attempts,
          statusCode,
          waitMs,
        });
        await sleep(waitMs);
      }
    }
    throw toError(lastError, 'Failed to create user via SIDAM accounts');
  }

  // Multi-mode org assignment (internal/external/auto) with sequential fallback; shared state across modes prevents clean extraction
  public async assignUserToOrganisation(
    // NOSONAR typescript:S3776
    options: AssignUserToOrganisationOptions
  ): Promise<OrganisationAssignmentResult> {
    const requestedMode = resolveOrganisationAssignmentMode(options.mode);
    const modesToTry = resolveAssignmentModesToTry(requestedMode);
    const requestedRoles = [...new Set(options.roles ?? options.user.roleNames)];
    const roles = resolveOrganisationAssignmentRoles(requestedRoles);
    const removedRoles = requestedRoles.filter((role) => !roles.includes(role));
    if (removedRoles.length > 0) {
      logger.warn('Filtering non-assignable roles from organisation assignment payload.', {
        email: options.user.email,
        organisationId: options.organisationId,
        removedRoles,
        keptRoles: roles,
      });
    }
    const payload = {
      firstName: options.user.forename,
      lastName: options.user.surname,
      email: options.user.email,
      roles,
      resendInvite: options.resendInvite ?? false,
    };

    const attemptedModes: OrganisationAssignmentMode[] = [];
    if (shouldUseManageOrgInvitePrimary()) {
      try {
        const manageOrgPrimary = await this.inviteUserViaManageOrgApi({
          user: options.user,
          roles,
          resendInvite: options.resendInvite ?? false,
        });
        const requiresConflictVerification = manageOrgPrimary.status === 409;
        const conflictVerified =
          !requiresConflictVerification ||
          (await this.isUserVisibleInOrganisationAssignment({
            organisationId: options.organisationId,
            user: options.user,
            assignmentBearerToken: options.assignmentBearerToken,
            serviceToken: options.serviceToken,
            rdProfessionalApiPath: options.rdProfessionalApiPath,
            requireServiceAuth: options.requireServiceAuth,
          }));
        if (requiresConflictVerification && !conflictVerified) {
          logger.warn(
            'Manage-org invite returned 409, but RD Professional lookup could not confirm user assignment. Continuing with RD fallback.',
            {
              organisationId: options.organisationId,
              requestedMode,
              email: options.user.email,
            }
          );
        } else {
          logger.info('Organisation assignment succeeded via manage-org invite primary path.', {
            organisationId: options.organisationId,
            requestedMode,
            email: options.user.email,
            status: manageOrgPrimary.status,
          });
          return {
            organisationId: options.organisationId,
            mode: 'external',
            requestedMode,
            attemptedModes: ['external'],
            roles,
            status: manageOrgPrimary.status,
            userIdentifier: manageOrgPrimary.userIdentifier,
            responseBody: {
              assignmentPath: 'manage-org-invite-primary',
              payload: manageOrgPrimary.responseBody,
            },
          };
        }
      } catch (error) {
        if (!shouldFallbackToRdAfterManageOrgFailure()) {
          throw error;
        }
        logger.warn('Manage-org invite primary path failed; falling back to RD Professional assignment path.', {
          organisationId: options.organisationId,
          requestedMode,
          email: options.user.email,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    let client: ApiClient | undefined;
    try {
      const assignmentBearerToken = await this.resolveAssignmentBearerToken(options.assignmentBearerToken);
      const serviceToken = await this.resolveServiceToken(options.serviceToken, options.requireServiceAuth ?? true);
      const rdProfessionalApiPath = resolveRdProfessionalApiPath(options.rdProfessionalApiPath);
      client = new ApiClient({
        baseUrl: rdProfessionalApiPath,
        name: 'rd-professional-assignment',
      });
      const assignmentUserRoles = resolveAssignmentUserRolesResolution(assignmentBearerToken);
      const headers = buildHeaders(assignmentBearerToken, serviceToken, assignmentUserRoles.roles);
      logger.info('Resolved assignment principal roles for organisation assignment.', {
        organisationId: options.organisationId,
        requestedMode,
        source: assignmentUserRoles.source,
        profile: assignmentUserRoles.profile,
        roles: assignmentUserRoles.roles,
      });
      const assignmentRequestTimeoutMs = resolveAssignmentRequestTimeoutMs();
      let lastError: unknown;
      for (const mode of modesToTry) {
        const endpoint =
          mode === 'internal'
            ? `/refdata/internal/v1/organisations/${encodeURIComponent(options.organisationId)}/users/`
            : '/refdata/external/v1/organisations/users/';
        attemptedModes.push(mode);
        const modeAttempts = mode === 'external' ? resolveExternalAssignmentRetryAttempts() : 1;

        for (let attempt = 1; attempt <= modeAttempts; attempt += 1) {
          try {
            const response = await client.post<Record<string, unknown>>(endpoint, {
              headers,
              data: payload,
              responseType: 'json',
              timeout: assignmentRequestTimeoutMs,
            });
            return {
              organisationId: options.organisationId,
              mode,
              requestedMode,
              attemptedModes: [...attemptedModes],
              roles,
              status: response.status,
              userIdentifier: readUserIdentifier(response.data),
              responseBody: response.data,
            };
          } catch (error) {
            lastError = error;
            const statusCode = parseStatusCode(error);
            if (statusCode === 409 && mode === 'external') {
              const reconciledAssignment = await this.reconcileExistingOrganisationAssignment({
                client,
                rdProfessionalApiPath,
                organisationId: options.organisationId,
                user: options.user,
                roles,
                headers,
              });
              logger.warn('Organisation assignment returned idempotent conflict; reconciled existing assignment.', {
                organisationId: options.organisationId,
                attemptedMode: mode,
                requestedMode,
                username: options.user.email,
                userIdentifier: reconciledAssignment.userIdentifier,
                reconciliationStatus: reconciledAssignment.status,
              });
              return {
                organisationId: options.organisationId,
                mode,
                requestedMode,
                attemptedModes: [...attemptedModes],
                roles,
                status: 409,
                userIdentifier: reconciledAssignment.userIdentifier,
                responseBody: {
                  conflict: 'already-exists',
                  reconciliation: reconciledAssignment,
                },
              };
            }
            const hasNextMode = attemptedModes.length < modesToTry.length;
            const retryExternalUserVisibility = shouldRetryExternalAssignment(mode, statusCode) && attempt < modeAttempts;

            if (retryExternalUserVisibility) {
              const shouldLogRetry = attempt === 1 || attempt % 3 === 0 || attempt + 1 === modeAttempts;
              if (shouldLogRetry) {
                logger.warn(
                  'External organisation invite returned retryable status; waiting for propagation/transient recovery and retrying.',
                  {
                    organisationId: options.organisationId,
                    attemptedMode: mode,
                    attempt,
                    attempts: modeAttempts,
                    statusCode,
                    username: options.user.email,
                  }
                );
              }
              const propagationOutcome = await this.waitForUserPropagation(options.user);
              if (propagationOutcome.degraded) {
                logger.warn('External assignment retry is continuing after degraded propagation checks.', {
                  email: options.user.email,
                  reason: propagationOutcome.reason,
                  mode,
                });
              }
              await sleep(resolveExternalAssignmentRetryDelayMs());
              continue;
            }

            if (hasNextMode && shouldFallbackToAlternateAssignmentMode(statusCode)) {
              logger.warn('Organisation assignment attempt failed; trying fallback mode.', {
                organisationId: options.organisationId,
                attemptedMode: mode,
                nextMode: modesToTry[attemptedModes.length],
                statusCode,
                username: options.user.email,
                requestedMode,
              });
              break;
            }

            const diagnostics = await this.collectAssignmentFailureDiagnostics({
              error,
              assignmentBearerToken,
              serviceToken,
              rdProfessionalApiPath,
              endpoint,
              mode,
              organisationId: options.organisationId,
              user: options.user,
              roles,
              headers,
              assignmentUserRoles,
              requestedMode,
              attemptedModes: [...attemptedModes],
            });
            logger.error('Organisation assignment failed. PRD principal and role diagnostics:', diagnostics);
            if (shouldUseManageOrgInviteFallback(error)) {
              break;
            }
            throw error;
          }
        }
      }

      if (shouldUseManageOrgInviteFallback(lastError)) {
        const manageOrgFallback = await this.inviteUserViaManageOrgApi({
          user: options.user,
          roles,
          resendInvite: options.resendInvite ?? false,
        });
        logger.warn('Organisation assignment succeeded via manage-org invite fallback after RD Professional failure.', {
          organisationId: options.organisationId,
          requestedMode,
          attemptedModes,
          fallbackStatus: manageOrgFallback.status,
          email: options.user.email,
        });
        return {
          organisationId: options.organisationId,
          mode: 'external',
          requestedMode,
          attemptedModes: [...attemptedModes, 'external'],
          roles,
          status: manageOrgFallback.status,
          userIdentifier: manageOrgFallback.userIdentifier,
          responseBody: {
            fallback: 'manage-org-invite',
            payload: manageOrgFallback.responseBody,
          },
        };
      }

      throw toError(lastError, 'Organisation assignment failed.');
    } catch (error) {
      if (shouldUseManageOrgInviteFallback(error)) {
        const manageOrgFallback = await this.inviteUserViaManageOrgApi({
          user: options.user,
          roles,
          resendInvite: options.resendInvite ?? false,
        });
        logger.warn('Organisation assignment recovered via manage-org invite fallback after RD prerequisite failure.', {
          organisationId: options.organisationId,
          requestedMode,
          attemptedModes,
          fallbackStatus: manageOrgFallback.status,
          email: options.user.email,
        });
        return {
          organisationId: options.organisationId,
          mode: 'external',
          requestedMode,
          attemptedModes: [...attemptedModes, 'external'],
          roles,
          status: manageOrgFallback.status,
          userIdentifier: manageOrgFallback.userIdentifier,
          responseBody: {
            fallback: 'manage-org-invite',
            payload: manageOrgFallback.responseBody,
          },
        };
      }
      throw error;
    } finally {
      if (client) {
        await client.dispose();
      }
    }
  }

  private async inviteUserViaManageOrgApi(params: {
    user: ProfessionalUserInfo;
    roles: readonly string[];
    resendInvite: boolean;
  }): Promise<{
    status: number;
    userIdentifier?: string;
    responseBody: unknown;
  }> {
    const manageOrgBaseUrl = resolveManageOrgApiPath();
    const assignmentRequestTimeoutMs = resolveAssignmentRequestTimeoutMs();
    const invitePayload = {
      firstName: params.user.forename,
      lastName: params.user.surname,
      email: params.user.email,
      roles: [...params.roles],
      resendInvite: params.resendInvite,
    };

    const parseInviteResponse = async (
      apiContext: Awaited<ReturnType<typeof request.newContext>>
    ): Promise<{
      status: number;
      responseBody: unknown;
    }> => {
      const response = await apiContext.post('/api/inviteUser', {
        data: invitePayload,
        failOnStatusCode: false,
        timeout: assignmentRequestTimeoutMs,
      });
      const bodyText = await response.text();
      let responseBody: unknown = bodyText;
      try {
        responseBody = JSON.parse(bodyText);
      } catch {
        // manage-org may return plain text.
      }
      const isUserAlreadyExists =
        response.status() === 409 &&
        typeof responseBody === 'object' &&
        responseBody !== null &&
        JSON.stringify(responseBody).toLowerCase().includes('already exists');
      if (isUserAlreadyExists) {
        logger.info('Manage-org invite returned idempotent user-exists conflict; treating as success.', {
          email: params.user.email,
          status: response.status(),
        });
      } else if (!response.ok()) {
        const body = typeof responseBody === 'string' ? responseBody : JSON.stringify(responseBody);
        throw new Error(`Manage-org invite failed with status ${response.status()}: ${body}`);
      }
      return {
        status: response.status(),
        responseBody,
      };
    };

    const assignmentUiUser = firstNonEmpty(process.env.ORG_USER_ASSIGNMENT_UI_USER, 'ORG_USER_ASSIGNMENT');
    try {
      await ensureUiStorageStateForUser(assignmentUiUser, {
        strict: true,
        baseUrl: manageOrgBaseUrl,
      });
      const storagePath = resolveUiStoragePathForUser(assignmentUiUser);
      const apiContext = await request.newContext({
        baseURL: manageOrgBaseUrl,
        ignoreHTTPSErrors: true,
        storageState: storagePath,
      });
      try {
        const sessionInvite = await parseInviteResponse(apiContext);
        return {
          status: sessionInvite.status,
          userIdentifier: undefined,
          responseBody: sessionInvite.responseBody,
        };
      } finally {
        await apiContext.dispose();
      }
    } catch (error) {
      logger.warn('Manage-org session invite path unavailable; falling back to direct bearer invite call.', {
        email: params.user.email,
        assignmentUiUser,
        error: error instanceof Error ? error.message : String(error),
      });
    }

    const assignmentBearerToken = await this.resolveAssignmentBearerToken();
    const serviceToken = await this.resolveServiceToken(undefined, false);
    const assignmentUserRoles = resolveAssignmentUserRolesResolution(assignmentBearerToken);
    logger.info('Resolved assignment principal roles for manage-org bearer invite.', {
      email: params.user.email,
      source: assignmentUserRoles.source,
      profile: assignmentUserRoles.profile,
      roles: assignmentUserRoles.roles,
    });
    const apiContext = await request.newContext({
      baseURL: manageOrgBaseUrl,
      ignoreHTTPSErrors: true,
      extraHTTPHeaders: buildHeaders(assignmentBearerToken, serviceToken, assignmentUserRoles.roles),
    });
    try {
      const bearerInvite = await parseInviteResponse(apiContext);
      return {
        status: bearerInvite.status,
        userIdentifier: undefined,
        responseBody: bearerInvite.responseBody,
      };
    } finally {
      await apiContext.dispose();
    }
  }

  public async cleanupOrganisationAssignment(
    options: CleanupOrganisationAssignmentOptions
  ): Promise<{ status: number; removedRoles: string[] }> {
    const rdProfessionalApiPath = resolveRdProfessionalApiPath(options.rdProfessionalApiPath);
    const assignmentBearerToken = await this.resolveAssignmentBearerToken(options.assignmentBearerToken);
    const serviceToken = await this.resolveServiceToken(options.serviceToken, options.requireServiceAuth ?? true);
    const assignmentUserRoles = resolveAssignmentUserRolesResolution(assignmentBearerToken);

    const client = new ApiClient({
      baseUrl: rdProfessionalApiPath,
      name: 'rd-professional-cleanup',
    });

    const rolesToRemove = [...new Set(options.rolesToRemove)];
    const organisationId = firstNonEmpty(options.organisationId, process.env.TEST_SOLICITOR_ORGANISATION_ID);
    const userIdentifier = await this.resolveAssignmentUserIdentifier({
      rdProfessionalApiPath,
      organisationId: organisationId ?? '',
      user: {
        ...options.user,
        id: firstNonEmpty(options.userIdentifier, options.user.id),
      },
      headers: buildHeaders(assignmentBearerToken, serviceToken, assignmentUserRoles.roles),
    });
    if (!userIdentifier) {
      logger.warn('Skipping organisation assignment cleanup because user identifier could not be resolved.', {
        email: options.user.email,
      });
      return {
        status: 404,
        removedRoles: rolesToRemove,
      };
    }
    const endpoint = `/refdata/external/v1/organisations/users/${encodeURIComponent(userIdentifier)}`;
    const payload = {
      email: options.user.email,
      firstName: options.user.forename,
      lastName: options.user.surname,
      idamStatus: 'ACTIVE',
      rolesDelete: rolesToRemove.map((name) => ({ name })),
    };
    const headers = buildHeaders(assignmentBearerToken, serviceToken, assignmentUserRoles.roles);

    try {
      let response = await client.put<Record<string, unknown>>(endpoint, {
        headers,
        data: payload,
        throwOnError: false,
        responseType: 'json',
      });
      const responseBody = isRecord(response.data) ? response.data : undefined;
      const errorDescription = readStringProperty(responseBody, 'errorDescription');
      const shouldActivateAndRetry =
        response.status === 403 && errorDescription?.toLowerCase().includes('user status must be active');

      if (shouldActivateAndRetry) {
        const token = await this.resolveBearerToken();
        const reactivatedUser = await this.ensureUserAccountActive({
          token,
          user: {
            ...options.user,
            id: userIdentifier,
          },
          roleNames: options.user.roleNames.length > 0 ? options.user.roleNames : rolesToRemove,
        });

        const retryPayload = {
          ...payload,
          email: reactivatedUser.email,
          firstName: reactivatedUser.forename,
          lastName: reactivatedUser.surname,
        };
        response = await client.put<Record<string, unknown>>(endpoint, {
          headers,
          data: retryPayload,
          throwOnError: false,
          responseType: 'json',
        });
      }

      if ((response.status >= 200 && response.status < 300) || response.status === 404) {
        return {
          status: response.status,
          removedRoles: rolesToRemove,
        };
      }
      throw new Error(`Organisation assignment cleanup failed with status ${response.status}.`);
    } catch (error) {
      if (!isPlaywrightArtifactIoError(error)) {
        throw error;
      }
      logger.warn('Falling back to direct HTTP organisation cleanup after Playwright artifact I/O failure.', {
        email: options.user.email,
        userIdentifier,
        error: error instanceof Error ? error.message : String(error),
      });
      return this.cleanupOrganisationAssignmentViaHttp({
        rdProfessionalApiPath,
        endpoint,
        headers,
        payload,
        rolesToRemove,
        userIdentifier,
        user: options.user,
      });
    } finally {
      await client.dispose();
    }
  }

  public async cleanupIdamAccount(options: CleanupIdamAccountOptions): Promise<{ status: number; endpoint: string }> {
    const baseUrl = resolveIdamApiPathFromOverride(options.idamApiPath);
    const client = new ApiClient({
      baseUrl,
      name: 'idam-api-testing-support-cleanup',
    });

    const encodedEmail = encodeURIComponent(options.user.email);
    const endpointByEmail = `/testing-support/accounts/${encodedEmail}`;
    const deleteViaTestingSupport = async (): Promise<{
      status: number;
      endpoint: string;
    }> => {
      const response = await client.delete(endpointByEmail, {
        throwOnError: false,
      });
      if ([200, 204, 404].includes(response.status)) {
        return {
          status: response.status,
          endpoint: endpointByEmail,
        };
      }
      throw new Error(`IDAM testing-support cleanup failed with status ${response.status}.`);
    };

    try {
      try {
        return await deleteViaTestingSupport();
      } catch (testingSupportError) {
        const statusCode = parseStatusCode(testingSupportError);
        const userId = options.user.id?.trim();
        if (!userId) {
          throw testingSupportError;
        }
        if (statusCode !== 401 && statusCode !== 403 && statusCode !== 404) {
          throw testingSupportError;
        }

        const token = await this.resolveBearerToken(options.bearerToken);
        const endpointById = `/api/v2/users/${encodeURIComponent(userId)}`;
        const response = await client.delete(endpointById, {
          headers: {
            Authorization: withBearerPrefix(token),
          },
          throwOnError: false,
        });
        if ([200, 204, 404].includes(response.status)) {
          return {
            status: response.status,
            endpoint: endpointById,
          };
        }
        throw new Error(`IDAM v2 cleanup failed with status ${response.status}.`);
      }
    } catch (error) {
      if (!isPlaywrightArtifactIoError(error)) {
        throw error;
      }
      logger.warn('Falling back to direct HTTP IDAM cleanup after Playwright artifact I/O failure.', {
        email: options.user.email,
        error: error instanceof Error ? error.message : String(error),
      });
      return this.cleanupIdamAccountViaHttp({
        baseUrl,
        email: options.user.email,
        userId: options.user.id?.trim(),
        bearerToken: options.bearerToken,
      });
    } finally {
      await client.dispose();
    }
  }

  private async cleanupOrganisationAssignmentViaHttp(params: {
    rdProfessionalApiPath: string;
    endpoint: string;
    headers: Record<string, string>;
    payload: Record<string, unknown>;
    rolesToRemove: string[];
    userIdentifier: string;
    user: ProfessionalUserInfo;
  }): Promise<{ status: number; removedRoles: string[] }> {
    const putCleanup = async (payload: Record<string, unknown>): Promise<{ status: number; body: unknown }> => {
      const response = await fetch(new URL(params.endpoint, params.rdProfessionalApiPath), {
        method: 'PUT',
        headers: {
          ...params.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      return {
        status: response.status,
        body: await parseResponseBody(response),
      };
    };

    let response = await putCleanup(params.payload);
    const responseBody = isRecord(response.body) ? response.body : undefined;
    const errorDescription = readStringProperty(responseBody, 'errorDescription');
    const shouldActivateAndRetry =
      response.status === 403 && errorDescription?.toLowerCase().includes('user status must be active');

    if (shouldActivateAndRetry) {
      const token = await this.resolveBearerToken();
      const reactivatedUser = await this.ensureUserAccountActive({
        token,
        user: {
          ...params.user,
          id: params.userIdentifier,
        },
        roleNames: params.user.roleNames.length > 0 ? params.user.roleNames : params.rolesToRemove,
      });

      response = await putCleanup({
        ...params.payload,
        email: reactivatedUser.email,
        firstName: reactivatedUser.forename,
        lastName: reactivatedUser.surname,
      });
    }

    if ((response.status >= 200 && response.status < 300) || response.status === 404) {
      return {
        status: response.status,
        removedRoles: params.rolesToRemove,
      };
    }

    throw new Error(`Organisation assignment cleanup failed with status ${response.status}.`);
  }

  private async cleanupIdamAccountViaHttp(params: {
    baseUrl: string;
    email: string;
    userId?: string;
    bearerToken?: string;
  }): Promise<{ status: number; endpoint: string }> {
    const endpointByEmail = `/testing-support/accounts/${encodeURIComponent(params.email)}`;
    const responseByEmail = await fetch(new URL(endpointByEmail, params.baseUrl), {
      method: 'DELETE',
    });
    if ([200, 204, 404].includes(responseByEmail.status)) {
      return {
        status: responseByEmail.status,
        endpoint: endpointByEmail,
      };
    }

    if (!params.userId || ![401, 403, 404].includes(responseByEmail.status)) {
      throw new Error(`IDAM testing-support cleanup failed with status ${responseByEmail.status}.`);
    }

    const token = await this.resolveBearerToken(params.bearerToken);
    const endpointById = `/api/v2/users/${encodeURIComponent(params.userId)}`;
    const responseById = await fetch(new URL(endpointById, params.baseUrl), {
      method: 'DELETE',
      headers: {
        Authorization: withBearerPrefix(token),
      },
    });
    if ([200, 204, 404].includes(responseById.status)) {
      return {
        status: responseById.status,
        endpoint: endpointById,
      };
    }

    throw new Error(`IDAM v2 cleanup failed with status ${responseById.status}.`);
  }

  private async updateExistingUser(params: {
    token: string;
    secret: string;
    email: string;
    forename: string;
    surname: string;
    roleNames: string[];
  }): Promise<ProfessionalUserInfo> {
    const existing = await this.idamUtils.getUserInfo({
      bearerToken: params.token,
      email: params.email,
    });

    const updated = await this.idamUtils.updateUser({
      id: existing.id,
      bearerToken: params.token,
      password: params.secret,
      user: {
        email: params.email,
        forename: params.forename,
        surname: params.surname,
        roleNames: [...params.roleNames],
      },
    });

    return {
      id: updated.id,
      email: updated.email,
      password: params.secret,
      forename: params.forename,
      surname: params.surname,
      roleNames: [...params.roleNames],
    };
  }

  // SIDAM accounts API retry loop with role-assignment retries and propagation checks; all state tightly coupled across phases
  private async createUserViaSidamAccounts(params: {
    // NOSONAR typescript:S3776
    bearerToken: string;
    password: string;
    email: string;
    forename: string;
    surname: string;
    roleNames: readonly string[];
  }): Promise<ProfessionalUserInfo> {
    const idamApiPath = resolveIdamApiPath();
    const client = new ApiClient({
      baseUrl: idamApiPath,
      name: 'idam-api-testing-support',
    });
    const payload = {
      email: params.email,
      forename: params.forename,
      surname: params.surname,
      password: params.password,
      roles: params.roleNames.map((code) => ({ code })),
      userGroup: {
        code: firstNonEmpty(process.env.IDAM_TEST_USER_GROUP, 'test'),
      },
    };

    const sidamCreateTargets = [
      {
        endpoint: '/testing-support/accounts',
        payload,
        allowAnonymous: true,
      },
      {
        endpoint: '/test/idam/burner/users',
        payload,
        allowAnonymous: true,
      },
      {
        endpoint: '/api/v2/users',
        payload: {
          password: params.password,
          user: {
            email: params.email,
            forename: params.forename,
            surname: params.surname,
            roleNames: [...params.roleNames],
            accountStatus: 'ACTIVE',
            recordType: 'LIVE',
          },
        },
        allowAnonymous: false,
      },
    ] as const;

    const executeCreate = (target: (typeof sidamCreateTargets)[number], includeAuth: boolean) =>
      client.post<Record<string, unknown>>(target.endpoint, {
        headers: includeAuth
          ? {
              Authorization: withBearerPrefix(params.bearerToken),
              'Content-Type': 'application/json',
            }
          : {
              'Content-Type': 'application/json',
            },
        data: target.payload,
        responseType: 'json',
      });

    try {
      let response: Awaited<ReturnType<typeof executeCreate>> | undefined;
      let lastError: unknown;

      const fallbackStatuses = new Set([404, 500, 502, 503, 504]);
      for (const target of sidamCreateTargets) {
        try {
          if (target.allowAnonymous) {
            response = await executeCreate(target, false);
            break;
          }
        } catch (error) {
          const status = parseStatusCode(error);
          if (target.allowAnonymous && (status === 401 || status === 403) && params.bearerToken.trim().length > 0) {
            try {
              response = await executeCreate(target, true);
              break;
            } catch (authenticatedError) {
              const authenticatedStatus = parseStatusCode(authenticatedError);
              if (authenticatedStatus !== undefined && fallbackStatuses.has(authenticatedStatus)) {
                lastError = authenticatedError;
                continue;
              }
              throw authenticatedError;
            }
          }

          if (status !== undefined && fallbackStatuses.has(status)) {
            lastError = error;
            continue;
          }
          throw error;
        }

        if (params.bearerToken.trim().length > 0) {
          try {
            response = await executeCreate(target, true);
            break;
          } catch (authenticatedError) {
            const authenticatedStatus = parseStatusCode(authenticatedError);
            if (authenticatedStatus !== undefined && fallbackStatuses.has(authenticatedStatus)) {
              lastError = authenticatedError;
              continue;
            }
            throw authenticatedError;
          }
        }
      }

      if (!response) {
        throw lastError ?? new Error('SIDAM user creation failed');
      }

      const account = response.data;
      return {
        id: readStringProperty(account, 'id'),
        email: readStringProperty(account, 'email') ?? params.email,
        password: params.password,
        forename: readStringProperty(account, 'forename') ?? params.forename,
        surname: readStringProperty(account, 'surname') ?? params.surname,
        roleNames: readRoleCodes(account) ?? [...params.roleNames],
      };
    } finally {
      await client.dispose();
    }
  }

  private async ensureUserAccountActive(params: {
    token: string;
    user: ProfessionalUserInfo;
    roleNames: readonly string[];
  }): Promise<ProfessionalUserInfo> {
    const userId =
      params.user.id ??
      (
        await this.idamUtils.getUserInfo({
          bearerToken: params.token,
          email: params.user.email,
        })
      ).id;
    const updated = await this.idamUtils.updateUser({
      id: userId,
      bearerToken: params.token,
      password: params.user.password,
      user: {
        email: params.user.email,
        forename: params.user.forename,
        surname: params.user.surname,
        roleNames: [...params.roleNames],
      },
    });
    return {
      id: updated.id,
      email: updated.email,
      password: params.user.password,
      forename: updated.forename,
      surname: updated.surname,
      roleNames: [...params.roleNames],
    };
  }

  // Propagation polling with degraded-mode fallback and multi-probe strategy; sequential probe state cannot be cleanly split
  private async waitForUserPropagation(
    // NOSONAR typescript:S3776
    user: ProfessionalUserInfo
  ): Promise<UserPropagationOutcome> {
    let lastError: unknown;
    let createUserBearerToken: string | undefined;
    try {
      createUserBearerToken = await this.resolveBearerToken();
    } catch (error) {
      logger.warn('Create-user bearer token unavailable for propagation probe; using password-grant probe only.', {
        email: user.email,
        message: error instanceof Error ? error.message : String(error),
      });
    }
    for (let attempt = 1; attempt <= USER_PROPAGATION_CHECK_MAX_ATTEMPTS; attempt += 1) {
      try {
        if (createUserBearerToken) {
          await this.idamUtils.getUserInfo({
            bearerToken: createUserBearerToken,
            email: user.email,
          });
        }
        const passwordGrantToken = await this.tryGenerateUserPasswordGrantToken(user);
        if (!passwordGrantToken) {
          logger.warn('Password-grant token unavailable for user propagation probe; using IDAM API presence check only.', {
            email: user.email,
          });
          if (createUserBearerToken) {
            return {
              verified: true,
              degraded: true,
              reason: 'idam-api-only',
            };
          }
          logger.warn('Skipping user propagation probes because no probe token could be generated.', { email: user.email });
          return {
            verified: false,
            degraded: true,
            reason: 'no-probe-token',
          };
        }
        const userInfoProbe = await this.probeIdamUserInfo(passwordGrantToken);
        if (userInfoProbe.status === 200) {
          return {
            verified: true,
            degraded: false,
            reason: 'idam-api-and-userinfo-probe',
          };
        }
        throw new Error(
          `IDAM userinfo probe status ${typeof userInfoProbe.status === 'number' ? userInfoProbe.status : 'unknown'}`
        );
      } catch (error) {
        lastError = error;
        if (attempt === USER_PROPAGATION_CHECK_MAX_ATTEMPTS) {
          break;
        }
        await sleep(USER_PROPAGATION_CHECK_RETRY_DELAY_MS);
      }
    }
    throw toError(lastError, 'User propagation checks failed');
  }

  private async tryGenerateUserPasswordGrantToken(user: ProfessionalUserInfo): Promise<string | undefined> {
    const clientSecret = resolveAssignmentClientSecret();
    if (!clientSecret) {
      return undefined;
    }
    const clientId = resolveAssignmentClientId();
    const scopesToTry = uniqueScopes([
      firstNonEmpty(process.env.ORG_USER_ASSIGNMENT_OAUTH2_SCOPE),
      firstNonEmpty(process.env.CREATE_USER_SCOPE),
      DEFAULT_PASSWORD_GRANT_SCOPE,
      firstNonEmpty(process.env.IDAM_OAUTH2_SCOPE),
      'openid profile roles',
      'profile roles',
    ]);
    for (const scope of scopesToTry) {
      try {
        return await this.idamUtils.generateIdamToken({
          grantType: 'password',
          clientId,
          clientSecret,
          scope,
          username: user.email,
          password: user.password,
          redirectUri: firstNonEmpty(process.env.IDAM_RETURN_URL),
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (isInvalidScopeError(message)) {
          continue;
        }
      }
    }
    return undefined;
  }

  private emitCreatedUserData(params: {
    user: ProfessionalUserInfo;
    roleSelection?: SolicitorRoleSelectionResolution;
    createPath: 'idam-testing-support' | 'idam-update-existing' | 'idam-api-testing-support';
    outputCreatedUserData?: boolean;
  }): void {
    if (!shouldOutputCreatedUserData(params.outputCreatedUserData)) {
      return;
    }
    const summary = {
      username: params.user.email,
      password: params.user.password,
      forename: params.user.forename,
      surname: params.user.surname,
      roles: params.user.roleNames,
      createPath: params.createPath,
      roleSource: params.roleSelection?.source,
      roleProfile: params.roleSelection?.roleProfile,
      jurisdiction: params.roleSelection?.context.jurisdiction,
      testType: params.roleSelection?.context.testType,
      caseType: params.roleSelection?.context.caseType,
    };
    // Intentional: plain log keeps credentials visible for AAT debug sessions.
    logger.info('[provisioned-user-data]', { data: summary });
  }

  private async resolveServiceToken(serviceToken: string | undefined, required: boolean): Promise<string | undefined> {
    const fromOptionsOrEnv = firstNonEmpty(serviceToken, process.env.S2S_TOKEN);
    if (fromOptionsOrEnv) {
      return stripBearerPrefix(fromOptionsOrEnv);
    }

    if (!this.serviceAuthUtils) {
      if (required) {
        throw new Error(
          'Service token missing. Provide `serviceToken`, set `S2S_TOKEN`, or construct ProfessionalUserUtils with ServiceAuthUtils.'
        );
      }
      return undefined;
    }

    const microservice = firstNonEmpty(process.env.S2S_MICROSERVICE_NAME, process.env.MICROSERVICE);
    if (!microservice) {
      if (required) {
        throw new Error('Missing S2S microservice name. Set `S2S_MICROSERVICE_NAME` or `MICROSERVICE`.');
      }
      return undefined;
    }

    const token = await this.serviceAuthUtils.retrieveToken({ microservice });
    return stripBearerPrefix(token);
  }

  private async collectAssignmentFailureDiagnostics(params: {
    error: unknown;
    assignmentBearerToken: string;
    serviceToken?: string;
    rdProfessionalApiPath: string;
    endpoint: string;
    mode: OrganisationAssignmentMode;
    requestedMode: OrganisationAssignmentStrategy;
    attemptedModes: OrganisationAssignmentMode[];
    organisationId: string;
    user: ProfessionalUserInfo;
    roles: string[];
    headers: Record<string, string>;
    assignmentUserRoles: AssignmentUserRolesResolution;
  }): Promise<Record<string, unknown>> {
    const tokenClaims = decodeJwtPayload(params.assignmentBearerToken);
    const prdProbe = await this.probePrdUsersView(params);
    const idamUserInfoProbe = await this.probeIdamUserInfo(params.assignmentBearerToken);
    return {
      failure: {
        statusCode: parseStatusCode(params.error),
        message: params.error instanceof Error ? params.error.message : String(params.error),
      },
      assignmentRequest: {
        endpoint: params.endpoint,
        mode: params.mode,
        requestedMode: params.requestedMode,
        attemptedModes: params.attemptedModes,
        organisationId: params.organisationId,
        roles: params.roles,
      },
      createdUser: {
        username: params.user.email,
        roleNames: params.user.roleNames,
      },
      assignmentPrincipalClaims: summarizeTokenPrincipal(tokenClaims),
      assignmentUserRoles: {
        source: params.assignmentUserRoles.source,
        profile: params.assignmentUserRoles.profile,
        roles: params.assignmentUserRoles.roles,
      },
      hasServiceAuthHeader: Boolean(params.serviceToken),
      prdUsersReadProbe: prdProbe,
      idamUserInfoProbe,
    };
  }

  private async probePrdUsersView(params: {
    rdProfessionalApiPath: string;
    organisationId: string;
    headers: Record<string, string>;
  }): Promise<Record<string, unknown>> {
    const probeClient = new ApiClient({
      baseUrl: params.rdProfessionalApiPath,
      name: 'rd-professional-assignment-probe',
    });
    const endpoint = `/refdata/internal/v1/organisations/${encodeURIComponent(params.organisationId)}/users/`;
    try {
      const response = await probeClient.get<unknown>(endpoint, {
        headers: params.headers,
        throwOnError: false,
        responseType: 'json',
      });
      return {
        endpoint,
        status: response.status,
        body: summarisePrdUsersResponse(response.data),
      };
    } catch (error) {
      return {
        endpoint,
        probeError: error instanceof Error ? error.message : String(error),
      };
    } finally {
      await probeClient.dispose();
    }
  }

  private async probeIdamUserInfo(assignmentBearerToken: string): Promise<Record<string, unknown>> {
    const idamWebUrl = resolveIdamWebUrl();
    if (!idamWebUrl) {
      return { skipped: 'IDAM_WEB_URL not configured' };
    }
    const client = new ApiClient({
      baseUrl: idamWebUrl,
      name: 'idam-userinfo-probe',
    });
    try {
      const response = await client.get<unknown>('/o/userinfo', {
        headers: {
          Authorization: withBearerPrefix(assignmentBearerToken),
        },
        throwOnError: false,
        responseType: 'json',
      });
      return {
        status: response.status,
        body: summariseIdamUserInfo(response.data),
      };
    } catch (error) {
      return {
        probeError: error instanceof Error ? error.message : String(error),
      };
    } finally {
      await client.dispose();
    }
  }

  private async reconcileExistingOrganisationAssignment(params: {
    client: ApiClient;
    rdProfessionalApiPath: string;
    organisationId: string;
    user: ProfessionalUserInfo;
    roles: string[];
    headers: Record<string, string>;
  }): Promise<{
    status: number | 'skipped';
    userIdentifier?: string;
  }> {
    const userIdentifier = await this.resolveAssignmentUserIdentifier(params);
    if (!userIdentifier) {
      logger.warn('Unable to resolve user identifier for existing assignment reconciliation.', {
        organisationId: params.organisationId,
        username: params.user.email,
      });
      return {
        status: 'skipped',
      };
    }

    const endpoint = `/refdata/external/v1/organisations/users/${encodeURIComponent(userIdentifier)}`;
    const payload = {
      email: params.user.email,
      firstName: params.user.forename,
      lastName: params.user.surname,
      idamStatus: 'ACTIVE',
      rolesAdd: params.roles.map((name) => ({ name })),
    };

    const response = await params.client.put<Record<string, unknown>>(endpoint, {
      headers: params.headers,
      data: payload,
      throwOnError: false,
      responseType: 'json',
    });
    const responseBody = isRecord(response.data) ? response.data : undefined;
    const errorDescription = readStringProperty(responseBody, 'errorDescription');
    const shouldActivateAndRetry =
      response.status === 403 && errorDescription?.toLowerCase().includes('user status must be active');

    if (shouldActivateAndRetry) {
      try {
        const token = await this.resolveBearerToken();
        const reactivatedUser = await this.ensureUserAccountActive({
          token,
          user: params.user,
          roleNames: params.roles,
        });
        const retryPayload = {
          email: reactivatedUser.email,
          firstName: reactivatedUser.forename,
          lastName: reactivatedUser.surname,
          idamStatus: 'ACTIVE',
          rolesAdd: params.roles.map((name) => ({ name })),
        };
        const retryResponse = await params.client.put<Record<string, unknown>>(endpoint, {
          headers: params.headers,
          data: retryPayload,
          throwOnError: false,
          responseType: 'json',
        });
        return {
          status: retryResponse.status,
          userIdentifier,
        };
      } catch (error) {
        logger.warn('Failed to activate IDAM account before assignment reconciliation retry.', {
          organisationId: params.organisationId,
          username: params.user.email,
          userIdentifier,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }
    if (response.status >= 200 && response.status < 300) {
      return {
        status: response.status,
        userIdentifier,
      };
    }
    logger.warn('Existing assignment reconciliation returned non-2xx response.', {
      organisationId: params.organisationId,
      username: params.user.email,
      userIdentifier,
      status: response.status,
    });
    return {
      status: response.status,
      userIdentifier,
    };
  }

  private async resolveAssignmentUserIdentifier(params: {
    rdProfessionalApiPath: string;
    organisationId: string;
    user: ProfessionalUserInfo;
    headers: Record<string, string>;
  }): Promise<string | undefined> {
    const fromUser = params.user.id?.trim();
    if (fromUser) {
      return fromUser;
    }

    const lookupClient = new ApiClient({
      baseUrl: params.rdProfessionalApiPath,
      name: 'rd-professional-assignment-lookup',
    });
    const endpoint = `/refdata/internal/v1/organisations/${encodeURIComponent(params.organisationId)}/users/`;
    try {
      const response = await lookupClient.get<unknown>(endpoint, {
        headers: params.headers,
        throwOnError: false,
        responseType: 'json',
      });
      if (response.status < 200 || response.status >= 300) {
        return undefined;
      }
      return findUserIdentifierByEmail(response.data, params.user.email);
    } finally {
      await lookupClient.dispose();
    }
  }

  private async isUserVisibleInOrganisationAssignment(params: {
    organisationId: string;
    user: ProfessionalUserInfo;
    assignmentBearerToken?: string;
    serviceToken?: string;
    rdProfessionalApiPath?: string;
    requireServiceAuth?: boolean;
  }): Promise<boolean> {
    let client: ApiClient | undefined;
    try {
      const assignmentBearerToken = await this.resolveAssignmentBearerToken(params.assignmentBearerToken);
      const serviceToken = await this.resolveServiceToken(params.serviceToken, params.requireServiceAuth ?? true);
      const rdProfessionalApiPath = resolveRdProfessionalApiPath(params.rdProfessionalApiPath);
      client = new ApiClient({
        baseUrl: rdProfessionalApiPath,
        name: 'rd-professional-assignment-visibility',
      });
      const assignmentUserRoles = resolveAssignmentUserRolesResolution(assignmentBearerToken);
      const headers = buildHeaders(assignmentBearerToken, serviceToken, assignmentUserRoles.roles);
      const endpoint = `/refdata/internal/v1/organisations/${encodeURIComponent(params.organisationId)}/users/`;
      const response = await client.get<unknown>(endpoint, {
        headers,
        throwOnError: false,
        responseType: 'json',
      });
      if (response.status < 200 || response.status >= 300) {
        return false;
      }
      return Boolean(findUserIdentifierByEmail(response.data, params.user.email));
    } catch (error) {
      logger.warn('Failed to verify user visibility in organisation assignment.', {
        organisationId: params.organisationId,
        email: params.user.email,
        error: error instanceof Error ? error.message : String(error),
      });
      return false;
    } finally {
      if (client) {
        await client.dispose();
      }
    }
  }

  private async resolveAssignmentBearerToken(token?: string): Promise<string> {
    const fromOptionsOrEnv = firstNonEmpty(token, process.env.ORG_USER_ASSIGNMENT_BEARER_TOKEN);
    if (fromOptionsOrEnv) {
      const resolved = stripBearerPrefix(fromOptionsOrEnv);
      await this.assertExpectedAssignmentPrincipal(resolved);
      return resolved;
    }

    const generatedFromPasswordGrant = await this.tryGenerateAssignmentBearerTokenFromCredentials();
    if (generatedFromPasswordGrant) {
      process.env.ORG_USER_ASSIGNMENT_BEARER_TOKEN = generatedFromPasswordGrant;
      const resolved = stripBearerPrefix(generatedFromPasswordGrant);
      await this.assertExpectedAssignmentPrincipal(resolved);
      return resolved;
    }

    const fallbackCreateUserToken = firstNonEmpty(process.env.CREATE_USER_BEARER_TOKEN);
    if (fallbackCreateUserToken) {
      logger.warn(
        'Using CREATE_USER_BEARER_TOKEN for org assignment. Prefer ORG_USER_ASSIGNMENT_BEARER_TOKEN or ORG_USER_ASSIGNMENT_USERNAME/ORG_USER_ASSIGNMENT_PASSWORD.'
      );
      const resolved = stripBearerPrefix(fallbackCreateUserToken);
      await this.assertExpectedAssignmentPrincipal(resolved);
      return resolved;
    }

    throw new Error(
      'Missing assignment bearer token. Set ORG_USER_ASSIGNMENT_BEARER_TOKEN, or provide ORG_USER_ASSIGNMENT_USERNAME/ORG_USER_ASSIGNMENT_PASSWORD with IDAM client credentials.'
    );
  }

  private async tryGenerateAssignmentBearerTokenFromCredentials(): Promise<string | undefined> {
    const configuredAssignmentUsername = process.env.ORG_USER_ASSIGNMENT_USERNAME?.trim();
    const configuredAssignmentPassword = process.env.ORG_USER_ASSIGNMENT_PASSWORD;
    const fallbackUsername = firstAllowedNonEmpty(
      process.env.SOLICITOR_USERNAME,
      process.env.PRL_SOLICITOR_USERNAME,
      process.env.WA_SOLICITOR_USERNAME,
      process.env.NOC_SOLICITOR_USERNAME
    );
    const fallbackPassword = firstNonEmpty(
      process.env.SOLICITOR_PASSWORD,
      process.env.PRL_SOLICITOR_PASSWORD,
      process.env.WA_SOLICITOR_PASSWORD,
      process.env.NOC_SOLICITOR_PASSWORD
    );
    const username = configuredAssignmentUsername ?? fallbackUsername;
    const password = configuredAssignmentPassword ?? fallbackPassword;
    if (!username || !password) {
      return undefined;
    }
    if (!configuredAssignmentUsername || !configuredAssignmentPassword) {
      logger.warn(
        'ORG_USER_ASSIGNMENT_USERNAME/ORG_USER_ASSIGNMENT_PASSWORD not fully configured; falling back to solicitor credentials for assignment token hydration.'
      );
    }

    const clientSecret = resolveAssignmentClientSecret();
    if (!clientSecret) {
      logger.warn('Unable to hydrate assignment bearer token from credentials because no IDAM client secret is configured.');
      return undefined;
    }

    const clientId = resolveAssignmentClientId();
    const scopesToTry = uniqueScopes([
      firstNonEmpty(process.env.ORG_USER_ASSIGNMENT_OAUTH2_SCOPE),
      DEFAULT_ASSIGNMENT_SCOPE,
      firstNonEmpty(process.env.IDAM_OAUTH2_SCOPE),
      firstNonEmpty(process.env.CREATE_USER_SCOPE),
      DEFAULT_PASSWORD_GRANT_SCOPE,
      'profile roles',
    ]);

    for (const scope of scopesToTry) {
      try {
        return await this.idamUtils.generateIdamToken({
          grantType: 'password',
          clientId,
          clientSecret,
          scope,
          username,
          password,
          redirectUri: firstNonEmpty(process.env.IDAM_RETURN_URL),
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (isInvalidScopeError(message)) {
          logger.warn('Assignment bearer-token scope rejected by IDAM; retrying with next scope candidate.', {
            username,
            clientId,
            scope,
          });
          continue;
        }
        logger.warn('Failed to hydrate assignment bearer token from credentials.', {
          username,
          clientId,
          scope,
          message,
        });
        return undefined;
      }
    }

    logger.warn('Failed to hydrate assignment bearer token from credentials after trying all scope candidates.', {
      username,
      clientId,
      attemptedScopes: scopesToTry,
    });
    return undefined;
  }

  private async resolveBearerToken(token?: string): Promise<string> {
    const fromOptionsOrEnv = firstNonEmpty(token, process.env.CREATE_USER_BEARER_TOKEN);
    if (fromOptionsOrEnv) {
      return stripBearerPrefix(fromOptionsOrEnv);
    }

    const clientSecret = resolveClientSecret();
    if (!clientSecret) {
      throw new Error('Missing bearer token. Set CREATE_USER_BEARER_TOKEN or configure IDAM_SECRET for auto-hydration.');
    }

    const clientId = resolveClientId();
    const requestedScope = firstNonEmpty(process.env.CREATE_USER_SCOPE, process.env.IDAM_OAUTH2_SCOPE) ?? 'profile roles';
    const scope = sanitiseClientCredentialsScope(requestedScope);
    const maxAttempts = 3;
    let lastError: unknown;
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        const generated = await this.idamUtils.generateIdamToken({
          grantType: 'client_credentials',
          clientId,
          clientSecret,
          scope,
        });
        process.env.CREATE_USER_BEARER_TOKEN = generated;
        return stripBearerPrefix(generated);
      } catch (error) {
        lastError = error;
        if (attempt === maxAttempts || !shouldRetryTokenHydrationError(error)) {
          throw error;
        }
        const waitMs = Math.min(250 * 2 ** (attempt - 1), 2_000);
        logger.warn('Transient create-user bearer token hydration failure; retrying', {
          attempt,
          maxAttempts,
          clientId,
          scope,
          waitMs,
          message: error instanceof Error ? error.message : String(error),
        });
        await sleep(waitMs);
      }
    }
    throw toError(lastError, 'Failed to hydrate create-user bearer token.');
  }

  private async assertExpectedAssignmentPrincipal(token: string): Promise<void> {
    const expectedEmail = resolveExpectedAssignmentPrincipalEmail();
    if (!expectedEmail) {
      logger.warn(
        'Skipping assignment token principal validation because neither ORG_USER_ASSIGNMENT_EXPECTED_EMAIL nor ORG_USER_ASSIGNMENT_USERNAME is configured.'
      );
      return;
    }
    const claims = decodeJwtPayload(token);
    let username = resolveTokenPrincipalUsername(claims)?.trim().toLowerCase();

    if (!username) {
      const userInfoProbe = await this.probeIdamUserInfo(token);
      if (userInfoProbe.status === 200 && isRecord(userInfoProbe.body)) {
        username = resolveTokenPrincipalUsername(userInfoProbe.body)?.trim().toLowerCase();
      }
    }

    if (!username) {
      throw new Error(
        `Assignment bearer token does not expose a principal email (claims/userinfo). Expected principal: ${expectedEmail}.`
      );
    }

    if (username !== expectedEmail) {
      throw new Error(`Assignment bearer token principal mismatch. Expected ${expectedEmail}, got ${username}.`);
    }
  }
}

function resolveSolicitorRoleSelection(options: {
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

function normaliseSolicitorTestType(value: string | undefined): SolicitorTestType | undefined {
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

function parseStatusCode(error: unknown): number | undefined {
  const message = error instanceof Error ? error.message : String(error);
  const explicit = /Status Code:\s*(\d{3})/i.exec(message);
  if (explicit) {
    const parsed = Number.parseInt(explicit[1], 10);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  const generic = /status(?:\s+code)?\s*(\d{3})/i.exec(message);
  if (!generic) {
    return undefined;
  }
  const parsed = Number.parseInt(generic[1], 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function isRetryableStatus(statusCode: number | undefined): boolean {
  return statusCode !== undefined && IDAM_RETRYABLE_STATUSES.has(statusCode);
}

function shouldRetryTokenHydrationError(error: unknown): boolean {
  const statusCode = parseStatusCode(error);
  if (statusCode !== undefined) {
    return [408, 429, 500, 502, 503, 504].includes(statusCode);
  }
  const message = (error instanceof Error ? error.message : String(error)).toLowerCase();
  return (
    message.includes('timeout') ||
    message.includes('econnreset') ||
    message.includes('socket hang up') ||
    message.includes('temporarily unavailable')
  );
}

function shouldFallbackToSidamAccounts(statusCode: number | undefined, error: unknown): boolean {
  if (statusCode !== undefined && [401, 403, 404, 405].includes(statusCode)) {
    return true;
  }
  const message = error instanceof Error ? error.message : String(error);
  const lower = message.toLowerCase();
  return lower.includes('/test/idam/users') && lower.includes('not found');
}

function resolveClientId(): string {
  return (
    firstNonEmpty(
      process.env.CREATE_USER_CLIENT_ID,
      process.env.CCD_DATA_STORE_CLIENT_ID,
      process.env.IDAM_OAUTH2_CLIENT_ID,
      process.env.IDAM_CLIENT_ID,
      process.env.SERVICES_IDAM_CLIENT_ID,
      process.env.CLIENT_ID
    ) ?? DEFAULT_IDAM_CLIENT_ID
  );
}

function resolveClientSecret(): string | undefined {
  return firstNonEmpty(
    process.env.CREATE_USER_CLIENT_SECRET,
    process.env.CCD_DATA_STORE_SECRET,
    process.env.IDAM_OAUTH2_CLIENT_SECRET,
    process.env.IDAM_SECRET
  );
}

function resolveAssignmentClientId(): string {
  return (
    firstNonEmpty(
      process.env.ORG_USER_ASSIGNMENT_CLIENT_ID,
      process.env.IDAM_CLIENT_ID,
      process.env.SERVICES_IDAM_CLIENT_ID,
      process.env.CLIENT_ID,
      process.env.CREATE_USER_CLIENT_ID,
      process.env.CCD_DATA_STORE_CLIENT_ID,
      process.env.IDAM_OAUTH2_CLIENT_ID
    ) ?? DEFAULT_IDAM_CLIENT_ID
  );
}

function resolveAssignmentClientSecret(): string | undefined {
  return firstNonEmpty(
    process.env.ORG_USER_ASSIGNMENT_CLIENT_SECRET,
    process.env.IDAM_SECRET,
    process.env.CREATE_USER_CLIENT_SECRET,
    process.env.CCD_DATA_STORE_SECRET,
    process.env.IDAM_OAUTH2_CLIENT_SECRET
  );
}

function uniqueScopes(values: Array<string | undefined>): string[] {
  const result: string[] = [];
  for (const value of values) {
    const normalized = value?.trim();
    if (!normalized || result.includes(normalized)) {
      continue;
    }
    result.push(normalized);
  }
  return result;
}

function isInvalidScopeError(message: string): boolean {
  const lower = message.toLowerCase();
  return lower.includes('invalid_scope') || lower.includes('unknown/invalid scope');
}

function resolveIdamApiPath(): string {
  const testingSupportUrl = firstNonEmpty(process.env.IDAM_TESTING_SUPPORT_URL);
  if (testingSupportUrl) {
    return normalizeIdamApiBaseUrl(testingSupportUrl);
  }

  const explicit = firstNonEmpty(process.env.IDAM_API_URL, process.env.SERVICES_IDAM_API_URL);
  if (explicit) {
    return normalizeIdamApiBaseUrl(explicit);
  }

  const idamWebUrl = firstNonEmpty(process.env.IDAM_WEB_URL);
  if (idamWebUrl) {
    try {
      const parsed = new URL(idamWebUrl);
      parsed.hostname = parsed.hostname.replace(/^idam-web-public\./, 'idam-api.');
      parsed.pathname = '';
      parsed.search = '';
      parsed.hash = '';
      return parsed.toString().replace(/\/+$/, '');
    } catch {
      // ignore invalid URL and use environment fallback below
    }
  }

  const env = firstNonEmpty(process.env.TEST_ENV, 'aat');
  return `https://idam-api.${env}.platform.hmcts.net`;
}

function resolveIdamApiPathFromOverride(override: string | undefined): string {
  const trimmed = override?.trim();
  if (trimmed) {
    return normalizeIdamApiBaseUrl(trimmed);
  }
  return resolveIdamApiPath();
}

function normalizeIdamApiBaseUrl(value: string): string {
  const trimmed = value.trim().replace(/\/+$/, '');
  try {
    const parsed = new URL(trimmed);
    parsed.hostname = parsed.hostname.replace(/^idam-testing-support-api\./, 'idam-api.');
    const normalizedPath = parsed.pathname
      .replace(/\/+$/, '')
      .replace(/\/test\/idam\/burner\/users$/i, '')
      .replace(/\/test\/idam\/users$/i, '')
      .replace(/\/testing-support\/accounts$/i, '')
      .replace(/\/o\/token$/i, '')
      .replace(/\/o\/authorize$/i, '')
      .replace(/\/o$/i, '');
    parsed.pathname = normalizedPath || '';
    parsed.search = '';
    parsed.hash = '';
    return parsed.toString().replace(/\/+$/, '');
  } catch {
    return trimmed
      .replace(/^https?:\/\/idam-testing-support-api\./i, (match) => match.replace(/idam-testing-support-api/i, 'idam-api'))
      .replace(/\/o\/token\/?$/i, '')
      .replace(/\/o\/authorize\/?$/i, '')
      .replace(/\/o\/?$/i, '');
  }
}

function resolveIdamWebUrl(): string | undefined {
  const direct = firstNonEmpty(process.env.IDAM_WEB_URL, process.env.SERVICES_IDAM_WEB_URL);
  if (direct) {
    return direct.replace(/\/+$/, '');
  }

  const apiUrl = firstNonEmpty(process.env.IDAM_API_URL, process.env.SERVICES_IDAM_API_URL);
  if (!apiUrl) {
    return undefined;
  }
  try {
    const parsed = new URL(apiUrl);
    parsed.hostname = parsed.hostname.replace(/^idam-api\./, 'idam-web-public.');
    parsed.pathname = '';
    parsed.search = '';
    parsed.hash = '';
    return parsed.toString().replace(/\/+$/, '');
  } catch {
    return undefined;
  }
}

function resolveRdProfessionalApiPath(value?: string): string {
  const resolved = firstNonEmpty(
    value,
    process.env.RD_PROFESSIONAL_API_PATH,
    process.env.RD_PROFESSIONAL_API_SERVICE,
    process.env.SERVICES_RD_PROFESSIONAL_API_PATH
  );
  if (!resolved) {
    throw new Error(
      'Missing RD professional API URL. Set RD_PROFESSIONAL_API_PATH, RD_PROFESSIONAL_API_SERVICE, or SERVICES_RD_PROFESSIONAL_API_PATH.'
    );
  }
  return resolved.replace(/\/+$/, '');
}

function resolveManageOrgApiPath(value?: string): string {
  const resolved = firstNonEmpty(
    value,
    process.env.MANAGE_ORG_API_PATH,
    process.env.MANAGE_ORG_URL,
    process.env.MANAGE_ORG_BASE_URL
  );
  if (resolved) {
    return resolved.replace(/\/+$/, '');
  }
  const env = firstNonEmpty(process.env.TEST_ENV, 'aat');
  return `https://manage-org.${env}.platform.hmcts.net`;
}

function resolveOrganisationAssignmentMode(value?: OrganisationAssignmentStrategy): OrganisationAssignmentStrategy {
  const rawValue = firstNonEmpty(value, process.env.PROFESSIONAL_USER_ASSIGNMENT_MODE);
  switch (rawValue?.toLowerCase()) {
    case 'internal':
      return 'internal';
    case 'external':
      return 'external';
    case 'auto':
      return 'auto';
    default:
      return DEFAULT_ORGANISATION_ASSIGNMENT_MODE;
  }
}

function resolveAssignmentModesToTry(mode: OrganisationAssignmentStrategy): OrganisationAssignmentMode[] {
  if (mode === 'internal' || mode === 'external') {
    return [mode];
  }

  const fromEnv = parseAssignmentModeOrder(process.env.PROFESSIONAL_USER_ASSIGNMENT_FALLBACK_ORDER);
  if (fromEnv.length > 0) {
    return fromEnv;
  }
  return ['external', 'internal'];
}

function parseAssignmentModeOrder(value: string | undefined): OrganisationAssignmentMode[] {
  if (!value?.trim()) {
    return [];
  }
  const modes = value
    .split(',')
    .map((entry) => entry.trim().toLowerCase())
    .filter((entry): entry is OrganisationAssignmentMode => entry === 'external' || entry === 'internal');
  const uniqueModes = [...new Set(modes)];
  return uniqueModes;
}

function resolveExternalAssignmentRetryAttempts(): number {
  const raw = firstNonEmpty(process.env.PROFESSIONAL_USER_EXTERNAL_ASSIGNMENT_MAX_ATTEMPTS);
  if (!raw) {
    return DEFAULT_EXTERNAL_ASSIGNMENT_RETRY_ATTEMPTS;
  }
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return DEFAULT_EXTERNAL_ASSIGNMENT_RETRY_ATTEMPTS;
  }
  return Math.min(parsed, MAX_EXTERNAL_ASSIGNMENT_RETRY_ATTEMPTS);
}

function resolveExternalAssignmentRetryDelayMs(): number {
  const raw = firstNonEmpty(process.env.PROFESSIONAL_USER_EXTERNAL_ASSIGNMENT_RETRY_DELAY_MS);
  if (!raw) {
    return EXTERNAL_ASSIGNMENT_RETRY_DELAY_MS;
  }
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return EXTERNAL_ASSIGNMENT_RETRY_DELAY_MS;
  }
  return parsed;
}

function resolveAssignmentRequestTimeoutMs(): number {
  const raw = firstNonEmpty(process.env.PROFESSIONAL_USER_ASSIGNMENT_REQUEST_TIMEOUT_MS);
  if (!raw) {
    return DEFAULT_ASSIGNMENT_REQUEST_TIMEOUT_MS;
  }
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 1_000) {
    return DEFAULT_ASSIGNMENT_REQUEST_TIMEOUT_MS;
  }
  return parsed;
}

function shouldFallbackToAlternateAssignmentMode(statusCode: number | undefined): boolean {
  if (statusCode === undefined) {
    return false;
  }
  return [401, 403, 404, 405, 500, 502, 503, 504].includes(statusCode);
}

function shouldRetryExternalAssignment(mode: OrganisationAssignmentMode, statusCode: number | undefined): boolean {
  return mode === 'external' && typeof statusCode === 'number' && [404, 429, 500, 502, 503, 504].includes(statusCode);
}

function shouldUseManageOrgInviteFallback(error: unknown): boolean {
  if (!resolveBooleanFlag(process.env.PROFESSIONAL_USER_ENABLE_MANAGE_ORG_FALLBACK)) {
    return false;
  }
  const statusCode = parseStatusCode(error);
  if (statusCode === undefined) {
    const message = error instanceof Error ? error.message : String(error);
    const lowered = message.toLowerCase();
    return (
      lowered.includes('forbidden') ||
      lowered.includes('permission') ||
      lowered.includes('access denied') ||
      lowered.includes('token is expired')
    );
  }
  return statusCode >= 500 || statusCode === 401 || statusCode === 403 || statusCode === 404 || statusCode === 405;
}

function shouldUseManageOrgInvitePrimary(): boolean {
  return resolveBooleanFlag(process.env.PROFESSIONAL_USER_ASSIGNMENT_USE_MANAGE_ORG_PRIMARY);
}

function shouldFallbackToRdAfterManageOrgFailure(): boolean {
  return resolveBooleanFlag(
    firstNonEmpty(
      process.env.PROFESSIONAL_USER_ENABLE_RD_FALLBACK_AFTER_MANAGE_ORG,
      process.env.PROFESSIONAL_USER_ENABLE_MANAGE_ORG_FALLBACK
    )
  );
}

function createFakerIdentity(
  emailPrefix: string,
  jurisdiction?: SolicitorJurisdiction
): {
  email: string;
  forename: string;
  surname: string;
} {
  const fakerFirstName = sanitiseIdentityToken(faker.person.firstName(), 'user');
  const fakerLastName = sanitiseIdentityToken(faker.person.lastName(), 'user');
  const uniqueToken = faker.string.alphanumeric({
    length: 10,
    casing: 'lower',
  });
  const forename = fakerFirstName;
  const surname = fakerLastName;
  const domain = (firstNonEmpty(process.env.PROFESSIONAL_USER_EMAIL_DOMAIN, 'test.local') ?? 'test.local').toLowerCase();
  const accountPrefix = resolveEmailAccountPrefix(jurisdiction);
  const emailLocalPart = [
    accountPrefix,
    emailPrefix.toLowerCase(),
    fakerFirstName.toLowerCase(),
    fakerLastName.toLowerCase(),
    uniqueToken,
  ].join('.');
  const normalizedLocalPart = emailLocalPart
    .replaceAll(/[^a-z0-9._-]/g, '')
    .replaceAll(/\.+/g, '.')
    .replaceAll(/(^\.)|(\.$)/g, '');
  return {
    email: `${normalizedLocalPart}@${domain}`,
    forename,
    surname,
  };
}

function resolveEmailAccountPrefix(jurisdiction?: SolicitorJurisdiction): string {
  switch (jurisdiction) {
    case 'divorce':
      return 'test_divorce_user';
    case 'finrem':
      return 'test_finrem_user';
    case 'probate':
      return 'test_probate_user';
    case 'ia':
      return 'test_ia_user';
    case 'publiclaw':
      return 'test_publiclaw_user';
    case 'civil':
      return 'test_civil_user';
    case 'employment':
      return 'test_employment_user';
    case 'prl':
    default:
      return 'test_prl_user';
  }
}

function sanitiseIdentityToken(value: string, fallback: string): string {
  const normalized = value.replaceAll(/[^a-zA-Z0-9]/g, '');
  if (normalized.length === 0) {
    return fallback;
  }
  return normalized.slice(0, 24);
}

function shouldOutputCreatedUserData(override: boolean | undefined): boolean {
  const enabled =
    typeof override === 'boolean' ? override : resolveBooleanFlag(process.env.PROFESSIONAL_USER_OUTPUT_CREATED_DATA);
  if (!enabled) {
    return false;
  }
  if (isCiEnvironment() && !allowCredentialOutputInCi()) {
    return false;
  }
  return true;
}

function resolveBooleanFlag(value: string | undefined): boolean {
  const rawValue = firstNonEmpty(value);
  if (!rawValue) {
    return false;
  }
  return !['0', 'false', 'no', 'off'].includes(rawValue.toLowerCase());
}

function isCiEnvironment(): boolean {
  const rawValue = firstNonEmpty(process.env.CI, process.env.BUILD_ID);
  if (!rawValue) {
    return false;
  }
  return rawValue.toLowerCase() !== 'false';
}

function allowCredentialOutputInCi(): boolean {
  return resolveBooleanFlag(process.env.ALLOW_CREDENTIAL_OUTPUT_IN_CI);
}

function uniqueStringList(values: readonly string[] | undefined): string[] {
  if (!values) {
    return [];
  }
  const result: string[] = [];
  for (const value of values) {
    const normalized = value.trim();
    if (!normalized || result.includes(normalized)) {
      continue;
    }
    result.push(normalized);
  }
  return result;
}

function buildHeaders(
  assignmentBearerToken: string,
  serviceToken?: string,
  assignmentUserRoles?: readonly string[]
): Record<string, string> {
  const headers: Record<string, string> = {
    Authorization: withBearerPrefix(assignmentBearerToken),
    'Content-Type': 'application/json',
  };
  if (assignmentUserRoles && assignmentUserRoles.length > 0) {
    headers['user-roles'] = assignmentUserRoles.join(',');
  }
  if (serviceToken) {
    headers.ServiceAuthorization = withBearerPrefix(serviceToken);
  }
  return headers;
}

function resolveAssignmentUserRolesResolution(assignmentBearerToken: string): AssignmentUserRolesResolution {
  const profile = resolveAssignmentUserRoleProfile(process.env.ORG_USER_ASSIGNMENT_ROLE_PROFILE);
  if (profile) {
    return {
      roles: [...SOLICITOR_ROLE_AUGMENT_BY_TEST_TYPE[profile]],
      source: 'profile',
      profile,
    };
  }

  const explicit = firstNonEmpty(process.env.ORG_USER_ASSIGNMENT_USER_ROLES);
  if (explicit) {
    const roles = explicit
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);
    if (roles.length > 0) {
      return {
        roles: [...new Set(roles)],
        source: 'explicit',
      };
    }
  }

  const claims = decodeJwtPayload(assignmentBearerToken);
  const claimRoles =
    (claims && readStringArrayFromRecord(claims, 'authorities')) ??
    (claims && readStringArrayFromRecord(claims, 'roles')) ??
    (claims && readStringArrayFromRecord(claims, 'roleNames'));

  if (claimRoles && claimRoles.length > 0) {
    return {
      roles: claimRoles,
      source: 'token-claims',
    };
  }
  return {
    source: 'none',
  };
}

function resolveOrganisationAssignmentRoles(requestedRoles: readonly string[]): string[] {
  const roleFilterEnabled = resolveBooleanFlag(firstNonEmpty(process.env.ORG_ASSIGNMENT_ROLE_FILTER, 'true'));
  if (!roleFilterEnabled) {
    return uniqueStringList(requestedRoles);
  }

  const requested = uniqueStringList(requestedRoles);
  const filtered = requested.filter((role) => ORGANISATION_ASSIGNMENT_ALLOWED_ROLES.has(role));
  return filtered.length > 0 ? filtered : requested;
}

function resolveAssignmentUserRoleProfile(value: string | undefined): AssignmentUserRoleProfile | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = normaliseSolicitorTestType(value);
  if (!normalized) {
    return undefined;
  }

  if (normalized === 'provisioning' || normalized === 'case-create') {
    return undefined;
  }

  return normalized;
}

function readUserIdentifier(data: Record<string, unknown> | undefined): string | undefined {
  const rawValue = data?.userIdentifier;
  if (typeof rawValue === 'string' && rawValue.trim().length > 0) {
    return rawValue;
  }
  return undefined;
}

function readStringProperty(record: Record<string, unknown> | undefined, key: string): string | undefined {
  const value = record?.[key];
  if (typeof value === 'string' && value.trim().length > 0) {
    return value;
  }
  return undefined;
}

function readRoleCodes(record: Record<string, unknown> | undefined): string[] | undefined {
  const rawRoles = record?.roles;
  const rawRoleNames = record?.roleNames;
  let source: unknown[] | undefined;
  if (Array.isArray(rawRoles)) {
    source = rawRoles;
  } else if (Array.isArray(rawRoleNames)) {
    source = rawRoleNames;
  }
  if (!source) {
    return undefined;
  }
  const roleNames = source
    .map((entry) => {
      if (typeof entry === 'string') {
        const value = entry.trim();
        return value.length > 0 ? value : undefined;
      }
      if (!entry || typeof entry !== 'object') {
        return undefined;
      }
      const maybeCode = (entry as { code?: unknown }).code;
      return typeof maybeCode === 'string' ? maybeCode.trim() : undefined;
    })
    .filter((code): code is string => Boolean(code));
  if (roleNames.length === 0) {
    return undefined;
  }
  return [...new Set(roleNames)];
}

function summariseIdamUserInfo(data: unknown): unknown {
  if (!isRecord(data)) {
    return data;
  }
  return {
    uid: readStringFromRecord(data, 'uid'),
    id: readStringFromRecord(data, 'id'),
    email: readStringFromRecord(data, 'email'),
    name: readStringFromRecord(data, 'name'),
    roleNames: readStringArrayFromRecord(data, 'roles'),
  };
}

function summarisePrdUsersResponse(data: unknown): unknown {
  if (Array.isArray(data)) {
    return {
      kind: 'array',
      count: data.length,
      sample: data.slice(0, 3).map(summariseUserLikeRecord),
    };
  }
  if (!isRecord(data)) {
    return data;
  }
  const users = data.users;
  if (Array.isArray(users)) {
    return {
      kind: 'object',
      keys: Object.keys(data),
      usersCount: users.length,
      usersSample: users.slice(0, 3).map(summariseUserLikeRecord),
    };
  }
  return {
    kind: 'object',
    keys: Object.keys(data),
    sample: summariseUserLikeRecord(data),
  };
}

function findUserIdentifierByEmail(data: unknown, email: string): string | undefined {
  const target = email.trim().toLowerCase();
  if (!target) {
    return undefined;
  }
  const users = extractPrdUsers(data);
  for (const user of users) {
    const userEmail = readStringFromRecord(user, 'email')?.toLowerCase();
    if (userEmail !== target) {
      continue;
    }
    return readStringFromRecord(user, 'idamId') ?? readStringFromRecord(user, 'uid') ?? readStringFromRecord(user, 'id');
  }
  return undefined;
}

function extractPrdUsers(data: unknown): Record<string, unknown>[] {
  if (Array.isArray(data)) {
    return data.filter(isRecord);
  }
  if (!isRecord(data)) {
    return [];
  }
  const maybeUsers = data.users;
  if (!Array.isArray(maybeUsers)) {
    return [];
  }
  return maybeUsers.filter(isRecord);
}

function summariseUserLikeRecord(value: unknown): unknown {
  if (!isRecord(value)) {
    return value;
  }
  return {
    idamId: readStringFromRecord(value, 'idamId') ?? readStringFromRecord(value, 'uid') ?? readStringFromRecord(value, 'id'),
    email: readStringFromRecord(value, 'email'),
    firstName: readStringFromRecord(value, 'firstName') ?? readStringFromRecord(value, 'forename'),
    lastName: readStringFromRecord(value, 'lastName') ?? readStringFromRecord(value, 'surname'),
    roles: readStringArrayFromRecord(value, 'roles') ?? readStringArrayFromRecord(value, 'roleNames'),
    status: readStringFromRecord(value, 'status') ?? readStringFromRecord(value, 'idamStatus'),
    organisationIdentifier:
      readStringFromRecord(value, 'organisationIdentifier') ?? readStringFromRecord(value, 'organisationId'),
  };
}

function decodeJwtPayload(token: string): Record<string, unknown> | undefined {
  const parts = token.split('.');
  if (parts.length < 2) {
    return undefined;
  }
  try {
    const base64 = parts[1].replaceAll('-', '+').replaceAll('_', '/');
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
    const decoded = Buffer.from(padded, 'base64').toString('utf8');
    const parsed = JSON.parse(decoded);
    return isRecord(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
}

function summarizeTokenPrincipal(claims: Record<string, unknown> | undefined): Record<string, unknown> {
  if (!claims) {
    return { available: false };
  }
  const scopeClaim = claims.scope;
  let scope: string | undefined;
  if (typeof scopeClaim === 'string') {
    scope = scopeClaim;
  } else if (Array.isArray(scopeClaim)) {
    scope = scopeClaim.map(String).join(' ');
  }
  return {
    available: true,
    principalId: readStringFromRecord(claims, 'uid') ?? readStringFromRecord(claims, 'id') ?? readStringFromRecord(claims, 'sub'),
    username:
      readStringFromRecord(claims, 'email') ??
      readStringFromRecord(claims, 'preferred_username') ??
      readStringFromRecord(claims, 'user_name') ??
      readStringFromRecord(claims, 'subname') ??
      readStringFromRecord(claims, 'sub'),
    clientId: readStringFromRecord(claims, 'client_id') ?? readStringFromRecord(claims, 'azp'),
    roles:
      readStringArrayFromRecord(claims, 'authorities') ??
      readStringArrayFromRecord(claims, 'roles') ??
      readStringArrayFromRecord(claims, 'roleNames'),
    scope,
    audience: claims.aud,
    issuedAt: toIsoDateClaim(claims.iat),
    expiresAt: toIsoDateClaim(claims.exp),
  };
}

function resolveExpectedAssignmentPrincipalEmail(): string | undefined {
  return firstNonEmpty(process.env.ORG_USER_ASSIGNMENT_EXPECTED_EMAIL, process.env.ORG_USER_ASSIGNMENT_USERNAME)
    ?.trim()
    .toLowerCase();
}

function resolveTokenPrincipalUsername(claims: Record<string, unknown> | undefined): string | undefined {
  if (!claims) {
    return undefined;
  }
  return (
    readStringFromRecord(claims, 'email') ??
    readStringFromRecord(claims, 'preferred_username') ??
    readStringFromRecord(claims, 'user_name') ??
    readStringFromRecord(claims, 'subname') ??
    readStringFromRecord(claims, 'sub')
  );
}

function toIsoDateClaim(value: unknown): string | undefined {
  let parsed: number;
  if (typeof value === 'number') {
    parsed = value;
  } else if (typeof value === 'string') {
    parsed = Number.parseInt(value, 10);
  } else {
    parsed = Number.NaN;
  }
  if (!Number.isFinite(parsed)) {
    return undefined;
  }
  return new Date(parsed * 1000).toISOString();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function readStringFromRecord(record: Record<string, unknown>, key: string): string | undefined {
  const value = record[key];
  if (typeof value === 'string' && value.trim().length > 0) {
    return value;
  }
  return undefined;
}

function readStringArrayFromRecord(record: Record<string, unknown>, key: string): string[] | undefined {
  const value = record[key];
  if (!Array.isArray(value)) {
    return undefined;
  }
  const items = value
    .map((entry) => (typeof entry === 'string' ? entry.trim() : undefined))
    .filter((entry): entry is string => Boolean(entry));
  if (items.length === 0) {
    return undefined;
  }
  return [...new Set(items)];
}

function firstNonEmpty(...values: Array<string | undefined>): string | undefined {
  for (const candidate of values) {
    const normalized = candidate?.trim();
    if (normalized) {
      return normalized;
    }
  }
  return undefined;
}

function sanitiseClientCredentialsScope(scopeValue: string): string {
  const scopes = scopeValue
    .split(/\s+/)
    .map((value) => value.trim())
    .filter(Boolean)
    .filter((value) => value.toLowerCase() !== 'openid');
  if (scopes.length === 0) {
    return 'profile roles';
  }
  return [...new Set(scopes)].join(' ');
}

function withBearerPrefix(token: string): string {
  const normalized = token.trim();
  return /^bearer\s+/i.test(normalized) ? normalized : `Bearer ${normalized}`;
}

function stripBearerPrefix(token: string): string {
  return token
    .trim()
    .replace(/^bearer\s+/i, '')
    .trim();
}

function isPlaywrightArtifactIoError(error: unknown): boolean {
  let message: string;
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  } else {
    message = '';
  }
  if (!message.toLowerCase().includes('enoent')) {
    return false;
  }
  return message.includes('.playwright-artifacts') || message.includes('.network') || message.includes('pwnetcopy');
}

async function parseResponseBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) {
    return undefined;
  }
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function toError(error: unknown, fallbackMessage: string): Error {
  if (error instanceof Error) {
    return error;
  }
  return new Error(typeof error === 'string' || typeof error === 'number' ? String(error) : fallbackMessage);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
