import { IdamUtils, ServiceAuthUtils, createLogger } from '@hmcts/playwright-common';
import { request } from '@playwright/test';

import { firstAllowedNonEmpty } from './accountPolicy.js';
import {
  CASEWORKER_DIVORCE_ROLE_NAMES,
  type SolicitorRoleContext,
  type SolicitorRoleProfile,
  type SolicitorRoleSelectionResolution,
  resolveSolicitorRoleStrategy,
} from './professional-user/roleStrategy.js';
import type {
  OrganisationAssignmentResult,
  OrganisationAssignmentStrategy,
  ProfessionalUserInfo,
  ProvisionedProfessionalUser,
  UserPropagationOutcome,
} from './professional-user/types.js';
import { createUserViaSidamFirstFlow, createUserViaTestingSupportFlow } from './professional-user/idamProvisioning.js';
import {
  createUserViaSidamAccountsFlow,
  ensureUserAccountActiveFlow,
  updateExistingUserFlow,
} from './professional-user/idamAccountAdmin.js';
import { assignUserToOrganisationFlow } from './professional-user/organisationAssignment';
import { waitForUserPropagationFlow } from './professional-user/propagationProbe.js';
import {
  collectAssignmentFailureDiagnosticsFlow,
  isUserVisibleInOrganisationAssignmentFlow,
  probeIdamUserInfoFlow,
  probePrdUsersViewFlow,
  reconcileExistingOrganisationAssignmentFlow,
  resolveAssignmentUserIdentifierFlow,
} from './professional-user/assignmentDiagnostics.js';
import {
  assertExpectedAssignmentPrincipalFlow,
  resolveAssignmentBearerTokenFlow,
  resolveCreateUserBearerTokenFlow,
  tryGenerateAssignmentBearerTokenFromCredentialsFlow,
} from './professional-user/tokenHydration.js';
import {
  assertOrganisationAssignmentPreflightFlow,
  cleanupIdamAccountFlow,
  cleanupOrganisationAssignmentFlow,
} from './professional-user/assignmentLifecycle.js';
import {
  DEFAULT_ASSIGNMENT_SCOPE,
  DEFAULT_ORGANISATION_ASSIGNMENT_MODE,
  DEFAULT_PASSWORD_GRANT_SCOPE,
  buildHeaders,
  createFakerIdentity,
  decodeJwtPayload,
  findUserIdentifierByEmail,
  firstNonEmpty,
  getRequiredEnvSecret,
  isInvalidScopeError,
  isPlaywrightArtifactIoError,
  isRecord,
  isRetryableStatus,
  parseStatusCode,
  readStringProperty,
  resolveAssignmentClientId,
  resolveAssignmentClientSecret,
  resolveAssignmentModesToTry,
  resolveAssignmentRequestTimeoutMs,
  resolveAssignmentUserRolesResolution,
  resolveClientId,
  resolveClientSecret,
  resolveExpectedAssignmentPrincipalEmail,
  resolveIdamApiPath,
  resolveIdamApiPathFromOverride,
  resolveIdamWebUrl,
  resolveManageOrgApiPath,
  resolveOrganisationAssignmentMode,
  resolveOrganisationAssignmentRoles,
  resolveRdProfessionalApiPath,
  resolveTokenPrincipalUsername,
  sanitiseClientCredentialsScope,
  shouldFallbackToAlternateAssignmentMode,
  shouldFallbackToSidamAccounts,
  shouldOutputCreatedUserData,
  shouldRetryTokenHydrationError,
  sleep,
  stripBearerPrefix,
  summarizeTokenPrincipal,
  summariseIdamUserInfo,
  summarisePrdUsersResponse,
  toError,
  uniqueScopes,
  withBearerPrefix,
} from './professional-user/runtime.js';
import { ensureUiStorageStateForUser } from './session-storage.utils.js';
import { resolveUiStoragePathForUser } from './storage-state.utils.js';

export {
  CASEWORKER_DIVORCE_ROLE_NAMES,
  DEFAULT_SOLICITOR_ROLE_PROFILE,
  DIVORCE_EXTERNAL_CORE_SOLICITOR_ROLE_NAMES,
  DIVORCE_EXTERNAL_NOC_SOLICITOR_ROLE_NAMES,
  DIVORCE_EXTERNAL_SOLICITOR_ROLE_NAMES,
  EMPLOYMENT_EXTERNAL_CORE_SOLICITOR_ROLE_NAMES,
  EXTENDED_SOLICITOR_ROLE_NAMES,
  MINIMAL_SOLICITOR_ROLE_NAMES,
  ORG_ADMIN_SOLICITOR_ROLE_NAMES,
  SOLICITOR_ROLE_AUGMENT_BY_TEST_TYPE,
  SOLICITOR_ROLE_NAMES,
  SOLICITOR_ROLE_NAMES_BY_JURISDICTION,
  normaliseSolicitorTestType,
  resolveSolicitorRoleStrategy,
} from './professional-user/roleStrategy.js';
export type {
  SolicitorJurisdiction,
  SolicitorRoleContext,
  SolicitorRoleProfile,
  SolicitorRoleSelectionResolution,
  SolicitorRoleSelectionSource,
  SolicitorTestType,
} from './professional-user/roleStrategy.js';
export type {
  OrganisationAssignmentMode,
  OrganisationAssignmentResult,
  OrganisationAssignmentStrategy,
  ProfessionalUserInfo,
  ProvisionedProfessionalUser,
  UserPropagationOutcome,
} from './professional-user/types.js';

export const DEFAULT_IDAM_CREATE_ATTEMPTS = 3;
export {
  DEFAULT_ASSIGNMENT_SCOPE,
  DEFAULT_IDAM_CLIENT_ID,
  DEFAULT_ORGANISATION_ASSIGNMENT_MODE,
  DEFAULT_PASSWORD_GRANT_SCOPE,
} from './professional-user/runtime.js';

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

export class ProfessionalUserUtils {
  constructor(
    private readonly idamUtils: IdamUtils,
    private readonly serviceAuthUtils?: ServiceAuthUtils
  ) {}

  public async createSolicitorUser(options: CreateTypeSpecificOptions = {}): Promise<ProfessionalUserInfo> {
    const password = getRequiredEnvSecret('IDAM_SOLICITOR_USER_PASSWORD');
    const roleSelection = resolveSolicitorRoleStrategy({
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
    const password = getRequiredEnvSecret('IDAM_CASEWORKER_DIVORCE_PASSWORD');
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
    const password = getRequiredEnvSecret('IDAM_SOLICITOR_USER_PASSWORD');
    const roleSelection = resolveSolicitorRoleStrategy({
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
    await assertOrganisationAssignmentPreflightFlow(
      {
        organisationId: options.organisationId,
        requestedMode,
        modesToTry,
        rdProfessionalApiPath,
      },
      {
        resolveAssignmentPrerequisites: async () => {
          const assignmentBearerToken = await this.resolveAssignmentBearerToken(options.assignmentBearerToken);
          const serviceToken = await this.resolveServiceToken(options.serviceToken, options.requireServiceAuth ?? true);
          const assignmentUserRoles = resolveAssignmentUserRolesResolution(assignmentBearerToken);
          return {
            assignmentBearerToken,
            serviceToken,
            headers: buildHeaders(assignmentBearerToken, serviceToken, assignmentUserRoles.roles),
            assignmentUserRoles,
          };
        },
        parseStatusCode,
        shouldFallbackToAlternateAssignmentMode,
      }
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
    const secret = password ?? getRequiredEnvSecret('IDAM_SOLICITOR_USER_PASSWORD');
    const resolvedIdentity = identity ?? createFakerIdentity(emailPrefix, roleSelection?.context.jurisdiction);
    const attempts = maxCreateAttempts ?? DEFAULT_IDAM_CREATE_ATTEMPTS;

    return createUserViaTestingSupportFlow(
      {
        token,
        password: secret,
        identity: resolvedIdentity,
        roleNames,
        attempts,
        roleSelection,
        outputCreatedUserData,
      },
      {
        createUser: async ({ token: createToken, password: createPassword, identity: createIdentity, roleNames: createRoles }) =>
          this.idamUtils.createUser({
            bearerToken: createToken,
            password: createPassword,
            user: {
              email: createIdentity.email,
              forename: createIdentity.forename,
              surname: createIdentity.surname,
              roleNames: [...createRoles],
            },
          }),
        createUserViaSidamAccounts: ({
          token: createToken,
          password: createPassword,
          identity: createIdentity,
          roleNames: createRoles,
        }) =>
          this.createUserViaSidamAccounts({
            bearerToken: createToken ?? '',
            password: createPassword,
            email: createIdentity.email,
            forename: createIdentity.forename,
            surname: createIdentity.surname,
            roleNames: [...createRoles],
          }),
        ensureUserAccountActive: ({ token: activeToken, user, roleNames: activeRoles }) =>
          this.ensureUserAccountActive({
            token: activeToken,
            user,
            roleNames: [...activeRoles],
          }),
        updateExistingUser: ({
          token: updateToken,
          password: updatePassword,
          identity: updateIdentity,
          roleNames: updateRoles,
        }) =>
          this.updateExistingUser({
            token: updateToken,
            secret: updatePassword,
            email: updateIdentity.email,
            forename: updateIdentity.forename,
            surname: updateIdentity.surname,
            roleNames: [...updateRoles],
          }),
        emitCreatedUserData: (params) => this.emitCreatedUserData(params),
        parseStatusCode,
        shouldFallbackToSidamAccounts,
        isRetryableStatus,
        createError: toError,
        sleep,
        warn: (message, meta) => logger.warn(message, meta),
      }
    );
  }

  private async createUserViaSidamFirst({
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
    const secret = password ?? getRequiredEnvSecret('IDAM_SOLICITOR_USER_PASSWORD');
    const attempts = maxCreateAttempts ?? DEFAULT_IDAM_CREATE_ATTEMPTS;
    const resolvedIdentity = identity ?? createFakerIdentity(emailPrefix, roleSelection?.context.jurisdiction);

    return createUserViaSidamFirstFlow(
      {
        token,
        password: secret,
        identity: resolvedIdentity,
        roleNames,
        attempts,
        emailPrefix,
        roleSelection,
        outputCreatedUserData,
      },
      {
        createUserViaSidamAccounts: ({
          token: createToken,
          password: createPassword,
          identity: createIdentity,
          roleNames: createRoles,
        }) =>
          this.createUserViaSidamAccounts({
            bearerToken: createToken ?? '',
            password: createPassword,
            email: createIdentity.email,
            forename: createIdentity.forename,
            surname: createIdentity.surname,
            roleNames: [...createRoles],
          }),
        ensureUserAccountActive: ({ token: activeToken, user, roleNames: activeRoles }) =>
          this.ensureUserAccountActive({
            token: activeToken,
            user,
            roleNames: [...activeRoles],
          }),
        updateExistingUser: ({
          token: updateToken,
          password: updatePassword,
          identity: updateIdentity,
          roleNames: updateRoles,
        }) =>
          this.updateExistingUser({
            token: updateToken,
            secret: updatePassword,
            email: updateIdentity.email,
            forename: updateIdentity.forename,
            surname: updateIdentity.surname,
            roleNames: [...updateRoles],
          }),
        emitCreatedUserData: (params) => this.emitCreatedUserData(params),
        parseStatusCode,
        isRetryableStatus,
        createError: toError,
        createIdentity: createFakerIdentity,
        sleep,
        warn: (message, meta) => logger.warn(message, meta),
      }
    );
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

    return assignUserToOrganisationFlow(
      {
        organisationId: options.organisationId,
        options,
        requestedMode,
        modesToTry,
        roles,
        payload,
        assignmentRequestTimeoutMs: resolveAssignmentRequestTimeoutMs(),
      },
      {
        inviteUserViaManageOrgApi: (params) => this.inviteUserViaManageOrgApi(params),
        isUserVisibleInOrganisationAssignment: (params) =>
          isUserVisibleInOrganisationAssignmentFlow(params, {
            resolveAssignmentBearerToken: (token) => this.resolveAssignmentBearerToken(token),
            resolveServiceToken: (token, required) => this.resolveServiceToken(token, required),
            resolveRdProfessionalApiPath,
            resolveAssignmentUserRolesResolution,
            buildHeaders,
            findUserIdentifierByEmail,
            warn: (message, meta) => logger.warn(message, meta),
          }),
        resolveAssignmentPrerequisites: async () => {
          const assignmentBearerToken = await this.resolveAssignmentBearerToken(options.assignmentBearerToken);
          const serviceToken = await this.resolveServiceToken(options.serviceToken, options.requireServiceAuth ?? true);
          const rdProfessionalApiPath = resolveRdProfessionalApiPath(options.rdProfessionalApiPath);
          const assignmentUserRoles = resolveAssignmentUserRolesResolution(assignmentBearerToken);
          const headers = buildHeaders(assignmentBearerToken, serviceToken, assignmentUserRoles.roles);
          return {
            assignmentBearerToken,
            serviceToken,
            rdProfessionalApiPath,
            headers,
            assignmentUserRoles,
          };
        },
        waitForUserPropagation: (user) => this.waitForUserPropagation(user),
        reconcileExistingOrganisationAssignment: (params) =>
          reconcileExistingOrganisationAssignmentFlow(params, {
            resolveAssignmentUserIdentifier: (lookupParams) =>
              resolveAssignmentUserIdentifierFlow(lookupParams, {
                findUserIdentifierByEmail,
              }),
            resolveBearerToken: () => this.resolveBearerToken(),
            ensureUserAccountActive: (activeParams) => this.ensureUserAccountActive(activeParams),
            readStringProperty,
            isRecord,
            warn: (message, meta) => logger.warn(message, meta),
          }),
        collectAssignmentFailureDiagnostics: (params) =>
          collectAssignmentFailureDiagnosticsFlow(params, {
            parseStatusCode,
            decodeJwtPayload,
            summarizeTokenPrincipal,
            probePrdUsersView: (probeParams) =>
              probePrdUsersViewFlow(probeParams, {
                summarisePrdUsersResponse,
              }),
            probeIdamUserInfo: (assignmentBearerToken) =>
              probeIdamUserInfoFlow(
                {
                  assignmentBearerToken,
                  idamWebUrl: resolveIdamWebUrl(),
                },
                {
                  summariseIdamUserInfo,
                  withBearerPrefix,
                }
              ),
          }),
      }
    );
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

    const assignmentUiUser =
      firstNonEmpty(process.env.ORG_USER_ASSIGNMENT_UI_USER, 'ORG_USER_ASSIGNMENT') ?? 'ORG_USER_ASSIGNMENT';
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
    return cleanupOrganisationAssignmentFlow(
      {
        user: options.user,
        userIdentifier: options.userIdentifier,
        organisationId: options.organisationId,
        rolesToRemove: options.rolesToRemove,
        rdProfessionalApiPath,
      },
      {
        resolveAssignmentPrerequisites: async () => {
          const assignmentBearerToken = await this.resolveAssignmentBearerToken(options.assignmentBearerToken);
          const serviceToken = await this.resolveServiceToken(options.serviceToken, options.requireServiceAuth ?? true);
          const assignmentUserRoles = resolveAssignmentUserRolesResolution(assignmentBearerToken);
          return {
            assignmentBearerToken,
            serviceToken,
            headers: buildHeaders(assignmentBearerToken, serviceToken, assignmentUserRoles.roles),
            assignmentUserRoles,
          };
        },
        resolveAssignmentUserIdentifier: (params) =>
          resolveAssignmentUserIdentifierFlow(params, {
            findUserIdentifierByEmail,
          }),
        resolveBearerToken: () => this.resolveBearerToken(),
        ensureUserAccountActive: (params) => this.ensureUserAccountActive(params),
        isPlaywrightArtifactIoError,
        warn: (message, meta) => logger.warn(message, meta),
      }
    );
  }

  public async cleanupIdamAccount(options: CleanupIdamAccountOptions): Promise<{ status: number; endpoint: string }> {
    const baseUrl = resolveIdamApiPathFromOverride(options.idamApiPath);
    return cleanupIdamAccountFlow(
      {
        baseUrl,
        user: options.user,
      },
      {
        resolveBearerToken: () => this.resolveBearerToken(options.bearerToken),
        isPlaywrightArtifactIoError,
        warn: (message, meta) => logger.warn(message, meta),
      }
    );
  }

  private async updateExistingUser(params: {
    token: string;
    secret: string;
    email: string;
    forename: string;
    surname: string;
    roleNames: string[];
  }): Promise<ProfessionalUserInfo> {
    return updateExistingUserFlow(
      {
        token: params.token,
        secret: params.secret,
        identity: {
          email: params.email,
          forename: params.forename,
          surname: params.surname,
        },
        roleNames: params.roleNames,
      },
      this.idamUtils
    );
  }

  private async createUserViaSidamAccounts(params: {
    bearerToken: string;
    password: string;
    email: string;
    forename: string;
    surname: string;
    roleNames: readonly string[];
  }): Promise<ProfessionalUserInfo> {
    return createUserViaSidamAccountsFlow({
      baseUrl: resolveIdamApiPath(),
      bearerToken: params.bearerToken,
      password: params.password,
      identity: {
        email: params.email,
        forename: params.forename,
        surname: params.surname,
      },
      roleNames: params.roleNames,
    });
  }

  private async ensureUserAccountActive(params: {
    token: string;
    user: ProfessionalUserInfo;
    roleNames: readonly string[];
  }): Promise<ProfessionalUserInfo> {
    return ensureUserAccountActiveFlow(
      {
        token: params.token,
        user: params.user,
        roleNames: params.roleNames,
      },
      this.idamUtils
    );
  }

  private async waitForUserPropagation(user: ProfessionalUserInfo): Promise<UserPropagationOutcome> {
    return waitForUserPropagationFlow(user, {
      resolveCreateUserBearerToken: async () => this.resolveBearerToken(),
      getUserInfoByEmail: ({ bearerToken, email }) =>
        this.idamUtils.getUserInfo({
          bearerToken,
          email,
        }),
      tryGenerateUserPasswordGrantToken: (probeUser) => this.tryGenerateUserPasswordGrantToken(probeUser),
      probeIdamUserInfo: (assignmentBearerToken) =>
        probeIdamUserInfoFlow(
          {
            assignmentBearerToken,
            idamWebUrl: resolveIdamWebUrl(),
          },
          {
            summariseIdamUserInfo,
            withBearerPrefix,
          }
        ),
      createError: toError,
      sleep,
      warn: (message, meta) => logger.warn(message, meta),
    });
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

  private async resolveAssignmentBearerToken(token?: string): Promise<string> {
    return resolveAssignmentBearerTokenFlow(
      {
        providedToken: token,
        envAssignmentBearerToken: process.env.ORG_USER_ASSIGNMENT_BEARER_TOKEN,
        fallbackCreateUserToken: firstNonEmpty(process.env.CREATE_USER_BEARER_TOKEN),
      },
      {
        stripBearerPrefix,
        assertExpectedAssignmentPrincipal: (resolvedToken) => this.assertExpectedAssignmentPrincipal(resolvedToken),
        tryGenerateAssignmentBearerTokenFromCredentials: () => this.tryGenerateAssignmentBearerTokenFromCredentials(),
        persistAssignmentBearerToken: (generatedToken) => {
          process.env.ORG_USER_ASSIGNMENT_BEARER_TOKEN = generatedToken;
        },
        warn: (message, meta) => logger.warn(message, meta),
      }
    );
  }

  private async tryGenerateAssignmentBearerTokenFromCredentials(): Promise<string | undefined> {
    return tryGenerateAssignmentBearerTokenFromCredentialsFlow(
      {
        configuredAssignmentUsername: process.env.ORG_USER_ASSIGNMENT_USERNAME?.trim(),
        configuredAssignmentPassword: process.env.ORG_USER_ASSIGNMENT_PASSWORD,
        fallbackUsername: firstAllowedNonEmpty(
          process.env.SOLICITOR_USERNAME,
          process.env.PRL_SOLICITOR_USERNAME,
          process.env.WA_SOLICITOR_USERNAME,
          process.env.NOC_SOLICITOR_USERNAME
        ),
        fallbackPassword: firstNonEmpty(
          process.env.SOLICITOR_PASSWORD,
          process.env.PRL_SOLICITOR_PASSWORD,
          process.env.WA_SOLICITOR_PASSWORD,
          process.env.NOC_SOLICITOR_PASSWORD
        ),
        clientId: resolveAssignmentClientId(),
        clientSecret: resolveAssignmentClientSecret(),
        redirectUri: firstNonEmpty(process.env.IDAM_RETURN_URL),
        scopesToTry: uniqueScopes([
          firstNonEmpty(process.env.ORG_USER_ASSIGNMENT_OAUTH2_SCOPE),
          DEFAULT_ASSIGNMENT_SCOPE,
          firstNonEmpty(process.env.IDAM_OAUTH2_SCOPE),
          firstNonEmpty(process.env.CREATE_USER_SCOPE),
          DEFAULT_PASSWORD_GRANT_SCOPE,
          'profile roles',
        ]),
      },
      {
        generateIdamToken: (params) => this.idamUtils.generateIdamToken(params),
        isInvalidScopeError,
        warn: (message, meta) => logger.warn(message, meta),
      }
    );
  }

  private async resolveBearerToken(token?: string): Promise<string> {
    return resolveCreateUserBearerTokenFlow(
      {
        providedToken: token,
        envCreateUserBearerToken: process.env.CREATE_USER_BEARER_TOKEN,
        clientId: resolveClientId(),
        clientSecret: resolveClientSecret(),
        requestedScope: firstNonEmpty(process.env.CREATE_USER_SCOPE, process.env.IDAM_OAUTH2_SCOPE) ?? 'profile roles',
      },
      {
        stripBearerPrefix,
        sanitiseClientCredentialsScope,
        generateIdamToken: (params) => this.idamUtils.generateIdamToken(params),
        persistCreateUserBearerToken: (generatedToken) => {
          process.env.CREATE_USER_BEARER_TOKEN = generatedToken;
        },
        shouldRetryTokenHydrationError,
        sleep,
        warn: (message, meta) => logger.warn(message, meta),
        createError: toError,
      }
    );
  }

  private async assertExpectedAssignmentPrincipal(token: string): Promise<void> {
    return assertExpectedAssignmentPrincipalFlow(
      {
        token,
        expectedEmail: resolveExpectedAssignmentPrincipalEmail(),
      },
      {
        decodeJwtPayload,
        resolveTokenPrincipalUsername,
        probeIdamUserInfo: (assignmentBearerToken) =>
          probeIdamUserInfoFlow(
            {
              assignmentBearerToken,
              idamWebUrl: resolveIdamWebUrl(),
            },
            {
              summariseIdamUserInfo,
              withBearerPrefix,
            }
          ),
        isRecord,
        warn: (message) => logger.warn(message),
      }
    );
  }
}
